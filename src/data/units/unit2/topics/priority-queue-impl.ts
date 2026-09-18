import type { Topic } from '../../../../types';

export const priorityQueueImpl: Topic = {
  id: 'u2-t3',
  unitId: 'unit-2',
  title: 'Priority Queue — 4 Implementations',
  slug: 'priority-queue-impl',
  description: `A Priority Queue is a specialized abstract data type where each element is associated with a priority, and elements are served based on their priorities. Unlike standard queues that follow a strict First-In-First-Out (FIFO) principle, a priority queue serves elements with higher priorities before those with lower priorities. This data structure is vital in scenarios like CPU scheduling, bandwidth management, and algorithms like Dijkstra's shortest path.

In this topic, we will explore four distinct ways to implement a priority queue using arrays and linked lists. Each approach has different time complexity trade-offs for enqueue (insertion) and dequeue (removal) operations. We will analyze unordered arrays, ordered arrays, unordered linked lists, and ordered linked lists.

A crucial aspect of priority queues is handling elements with identical priorities. We typically resolve ties using a FIFO rule: the element that joined the queue earlier is served first. Implementing this efficiently requires careful consideration in ordered structures to maintain stability during insertions and deletions.`,
  difficulty: 'advanced',
  prerequisites: ['u2-t1', 'u1-t2'],
  estimatedMinutes: 65,
  subtopics: [
    {
      id: 'u2-t3-s1',
      title: 'Priority Queue ADT & the Job Abstraction',
      slug: 'pq-adt-job',
      description: `Before diving into the queue implementations, we must define what we are storing. We use a Job abstraction to represent the elements in our priority queue. A job contains a unique identifier (job number) and a priority value. In our convention, a higher numerical value indicates a higher priority.

By separating the job structure and its related functions (like getting priority and displaying) from the queue logic, we adhere to the principles of modularity and Abstract Data Types (ADT). The queue implementations will focus purely on managing collections of jobs, relying on the job ADT to interact with individual elements.

The queue ADT will typically support two primary operations: enqueue to add a job to the queue, and dequeue to remove and return the highest priority job. We also need helper functions like initialization, checking if the queue is empty, and in the case of arrays, checking if it is full.`,
      keyPoints: [
        'A priority queue serves elements based on priority, not arrival time, although arrival time breaks ties.',
        'We use a Job structure containing a job number and a priority value.',
        'A higher numerical priority value means the job should be processed sooner.',
        'The Job ADT hides the internal representation of a job from the queue implementations.',
        'Decoupling the element type from the data structure logic improves code reusability and maintainability.'
      ],
      codeExamples: [
        {
          id: 'u2-t3-s1-ex1',
          title: 'The Job ADT (job.h and job.c)',
          code: `#include <stdio.h>

struct job {
    int job_no_;
    int priority_;
};
typedef struct job job_t;

void set_job(job_t* ptr_job, int job_no, int priority) {
    ptr_job->job_no_ = job_no;
    ptr_job->priority_ = priority;
}

void disp_job(job_t* ptr_job) {
    printf("job # : %d priority : %d\\n", ptr_job->job_no_, ptr_job->priority_);
}

int get_priority(job_t* ptr_job) { 
    return ptr_job->priority_; 
}

int main() {
    job_t j1, j2;
    set_job(&j1, 101, 5);
    set_job(&j2, 102, 2);
    
    printf("Higher priority job: ");
    if(get_priority(&j1) > get_priority(&j2)) {
        disp_job(&j1);
    } else {
        disp_job(&j2);
    }
    return 0;
}`,
          language: 'c',
          explanation: 'This code defines the Job structure and its interface. The functions provide a clean way to interact with a job without directly accessing its fields in the queue logic.',
          expectedOutput: 'Higher priority job: job # : 101 priority : 5',
          lineBreakdown: [
            { lineNumber: 3, code: 'struct job {', explanation: 'Defines the basic structure holding job data.' },
            { lineNumber: 9, code: 'void set_job(...)', explanation: 'Initializes the job fields.' },
            { lineNumber: 18, code: 'int get_priority(...)', explanation: 'Accessor for priority, allowing the queue to compare jobs.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t3-s1-cm1',
          title: 'Direct structure access instead of getters',
          wrongCode: `if (queue->jobs[i].priority_ > max_priority)`,
          correctCode: `if (get_priority(&queue->jobs[i]) > max_priority)`,
          explanation: 'Accessing the struct fields directly breaks the ADT barrier. If the job representation changes, all queue implementations would need updates.',
          consequence: 'Code becomes tightly coupled and harder to maintain.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t3-s1-ic1',
          title: 'Why separate the Job ADT?',
          content: 'In interviews, discussing separation of concerns is crucial. Decoupling the data (Job) from the container (Priority Queue) allows you to swap out implementations without changing the underlying element type, demonstrating good software engineering practices.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t3-s1-cp1',
          title: 'Job ADT Understanding',
          description: 'Verify the purpose of the Job ADT.',
          criteria: ['Understands that Job ADT hides element details.', 'Knows how get_priority is used for comparison.'],
          topicId: 'u2-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t3-s1-rc1',
          front: 'What is the advantage of using a get_priority function over direct access?',
          back: 'It maintains the abstraction barrier. Changes to how priority is calculated or stored in the Job struct won\'t break the priority queue implementations.',
          topicId: 'u2-t3',
          tags: ['design', 'adt']
        }
      ]
    },
    {
      id: 'u2-t3-s2',
      title: 'Implementation 8: Unordered Array',
      slug: 'unordered-array',
      description: `In the unordered array implementation, we focus on making insertion (enqueue) as fast as possible. When a new job arrives, we simply append it to the end of the array. Since we don't care about the order during insertion, the enqueue operation takes O(1) time.

However, the trade-off comes during removal (dequeue). Because the array is unsorted, we must perform a linear scan across all elements to find the job with the highest priority. This scan takes O(n) time. Once found, we must also shift all subsequent elements to the left to fill the gap left by the removed job, which also takes O(n) time. Thus, the overall dequeue time complexity is O(n).

For ties (jobs with the same highest priority), we want to maintain the FIFO rule. By scanning from left to right (index 0 to n-1) and strictly updating the maximum when we find a strictly greater priority (> instead of >=), we naturally pick the first occurrence of the highest priority, which corresponds to the oldest job.`,
      keyPoints: [
        'Enqueue simply appends to the array, achieving O(1) time complexity.',
        'Dequeue requires a linear scan to find the max priority element, taking O(n) time.',
        'After finding the max element in an unordered array, shifting is required to fill the gap.',
        'To maintain FIFO tie-breaking, use strict greater-than (>) when finding the maximum.',
        'This implementation is ideal when insertions are frequent and deletions are rare.'
      ],
      codeExamples: [
        {
          id: 'u2-t3-s2-ex1',
          title: 'Unordered Array Enqueue and Dequeue',
          code: `#include <stdio.h>
#define MAXSIZE 100

struct job { int job_no_; int priority_; };
typedef struct job job_t;
int get_priority(job_t* ptr_job) { return ptr_job->priority_; }
void set_job(job_t* ptr_job, int job_no, int priority) { ptr_job->job_no_ = job_no; ptr_job->priority_ = priority; }

struct queue {
    job_t key_[MAXSIZE];
    int n_;
};
typedef struct queue queue_t;

int is_full(queue_t* ptr_queue) { return ptr_queue->n_ == MAXSIZE; }

void enque(queue_t *ptr_queue, job_t *ptr_job) {
    if(! is_full(ptr_queue))
        ptr_queue->key_[ptr_queue->n_++] = *ptr_job;
}

job_t deque(queue_t *ptr_queue) {
    int max_pos = 0; 
    int n = ptr_queue->n_;
    for(int i = 1; i < n; ++i) {
        if(get_priority(&ptr_queue->key_[i]) > get_priority(&ptr_queue->key_[max_pos]))
            max_pos = i;
    }
    job_t jobx = ptr_queue->key_[max_pos];
    for(int i = max_pos; i < n - 1; ++i) // shift to fill gap
        ptr_queue->key_[i] = ptr_queue->key_[i+1];
    --ptr_queue->n_;
    return jobx;
}

int main() {
    queue_t q = { .n_ = 0 };
    job_t j1, j2;
    set_job(&j1, 1, 10); enque(&q, &j1);
    set_job(&j2, 2, 20); enque(&q, &j2);
    
    job_t removed = deque(&q);
    printf("Dequeued Job: %d, Priority: %d\\n", removed.job_no_, removed.priority_);
    return 0;
}`,
          language: 'c',
          explanation: 'Enque appends at the end. Deque finds the max position, stores the job, shifts the rest of the array to fill the hole, and decrements size.',
          expectedOutput: 'Dequeued Job: 2, Priority: 20',
          lineBreakdown: [
            { lineNumber: 18, code: 'ptr_queue->key_[ptr_queue->n_++] = *ptr_job;', explanation: 'O(1) insertion at the end of the array.' },
            { lineNumber: 25, code: 'if(get_priority(&ptr_queue->key_[i]) > get_priority(&ptr_queue->key_[max_pos]))', explanation: 'Strictly greater than ensures the earliest added job of the max priority is selected.' },
            { lineNumber: 29, code: 'for(int i = max_pos; i < n - 1; ++i)', explanation: 'O(n) shifting to cover the removed element.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t3-s2-cm1',
          title: 'Incorrect tie-breaking condition',
          wrongCode: `if(get_priority(...) >= get_priority(...)) max_pos = i;`,
          correctCode: `if(get_priority(...) > get_priority(...)) max_pos = i;`,
          explanation: 'Using >= will cause the latest arriving job with the same max priority to be chosen, violating the FIFO rule.',
          consequence: 'FIFO tie-breaking is broken; jobs are processed out of arrival order for the same priority.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t3-s2-ic1',
          title: 'When to use Unordered Array?',
          content: 'An unordered array PQ is optimal when you have a massive influx of data (many enqueues) but very few processing phases (few dequeues). It defers the sorting work until removal is absolutely necessary.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t3-s2-cp1',
          title: 'Complexity Check',
          description: 'Identify the time complexity of deque in an unordered array.',
          criteria: ['Understands scan is O(n)', 'Understands shift is O(n)', 'Total is O(n)'],
          topicId: 'u2-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t3-s2-rc1',
          front: 'What is the time complexity of dequeue in an unordered array priority queue?',
          back: 'O(n). It requires an O(n) linear scan to find the maximum priority element, followed by an O(n) shift operation to fill the gap.',
          topicId: 'u2-t3',
          tags: ['complexity', 'array']
        }
      ]
    },
    {
      id: 'u2-t3-s3',
      title: 'Implementation 6: Ordered Array',
      slug: 'ordered-array',
      description: `The ordered array implementation reverses the trade-off seen in the unordered array. Here, we maintain the array in a sorted state at all times. We choose to sort the array in ascending order of priority, meaning the highest priority job will be located at the very end of the array (at index \`n-1\`).

Because the highest priority element is always at the end, the dequeue operation simply removes and returns the last element. This requires no shifting and no searching, resulting in an incredibly fast O(1) time complexity for dequeue.

However, inserting a new element requires us to find its correct sorted position. This is similar to the insertion step of Insertion Sort. We must shift elements with lower or equal priorities to the right to make room. Consequently, the enqueue operation takes O(n) time. To maintain FIFO order for identical priorities, we insert the new job to the *left* of existing same-priority jobs. Since we dequeue from the right end, elements inserted to the left will be dequeued later.`,
      keyPoints: [
        'Maintains elements sorted by priority in ascending order.',
        'Dequeue is O(1) because it simply pops the last element (which has the highest priority).',
        'Enqueue is O(n) as it uses insertion sort logic to find the correct spot and shift elements.',
        'For same-priority FIFO, insert to the LEFT (by using >= during shifting) so the earliest remains on the right.',
        'Ideal when removals are frequent and need to be instantaneous, and insertions can be slower.'
      ],
      codeExamples: [
        {
          id: 'u2-t3-s3-ex1',
          title: 'Ordered Array Enqueue and Dequeue',
          code: `#include <stdio.h>
#define MAXSIZE 100

struct job { int job_no_; int priority_; };
typedef struct job job_t;
int get_priority(job_t* ptr_job) { return ptr_job->priority_; }
void set_job(job_t* ptr_job, int job_no, int priority) { ptr_job->job_no_ = job_no; ptr_job->priority_ = priority; }

struct queue { job_t key_[MAXSIZE]; int n_; };
typedef struct queue queue_t;
int is_full(queue_t* ptr_queue) { return ptr_queue->n_ == MAXSIZE; }

void enque(queue_t *ptr_queue, job_t *ptr_job) {
    if(! is_full(ptr_queue)) {
        int n = ptr_queue->n_; 
        int i = n - 1;
        int priority = get_priority(ptr_job);
        // Using >= ensures new same-priority item goes to the left of existing ones
        while(i >= 0 && get_priority(&ptr_queue->key_[i]) >= priority) {
            ptr_queue->key_[i + 1] = ptr_queue->key_[i]; 
            --i;
        }
        ptr_queue->key_[i + 1] = *ptr_job;
        ++ptr_queue->n_;
    }
}

job_t deque(queue_t *ptr_queue) {
    // always the last one (highest priority)
    job_t jobx = ptr_queue->key_[--ptr_queue->n_];
    return jobx;
}

int main() {
    queue_t q = { .n_ = 0 };
    job_t j1, j2;
    set_job(&j1, 1, 10); enque(&q, &j1);
    set_job(&j2, 2, 20); enque(&q, &j2);
    
    job_t removed = deque(&q);
    printf("Dequeued Job: %d, Priority: %d\\n", removed.job_no_, removed.priority_);
    return 0;
}`,
          language: 'c',
          explanation: 'Enque shifts elements > (and ==) to make room, ensuring ascending order. Deque just drops the count and returns the last item.',
          expectedOutput: 'Dequeued Job: 2, Priority: 20',
          lineBreakdown: [
            { lineNumber: 19, code: 'while(i >= 0 && get_priority(&ptr_queue->key_[i]) >= priority)', explanation: 'The >= condition shifts same-priority elements to the right. The newly inserted item ends up on the left.' },
            { lineNumber: 30, code: 'job_t jobx = ptr_queue->key_[--ptr_queue->n_];', explanation: 'O(1) removal from the end.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t3-s3-cm1',
          title: 'Wrong inequality for FIFO ties',
          wrongCode: `while(i >= 0 && get_priority(&ptr_queue->key_[i]) > priority)`,
          correctCode: `while(i >= 0 && get_priority(&ptr_queue->key_[i]) >= priority)`,
          explanation: 'Using strict > means we don\'t shift same-priority items. The new item is placed to the right of old ones. Since we pop from the right, the new item gets processed before the old one, breaking FIFO.',
          consequence: 'LIFO order is applied to elements with the same priority.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t3-s3-ic1',
          title: 'Why ascend vs descend?',
          content: 'You could maintain the array in descending order (highest priority at index 0). However, dequeuing would then require shifting all remaining n-1 elements to the left, making dequeue O(n). Ascending order puts the highest priority at the end, allowing O(1) popping.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t3-s3-cp1',
          title: 'Ordered Array Dequeue',
          description: 'Determine which end of the ordered array represents the highest priority.',
          criteria: ['Understands it must be the end (index n-1)', 'Understands this achieves O(1) pop'],
          topicId: 'u2-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t3-s3-rc1',
          front: 'In an ordered array PQ, why do we store elements in ascending order instead of descending?',
          back: 'So the highest priority element is at the very end of the array. This allows us to dequeue by simply decrementing the size in O(1) time, avoiding O(n) shifts.',
          topicId: 'u2-t3',
          tags: ['optimization', 'array']
        }
      ]
    },
    {
      id: 'u2-t3-s4',
      title: 'Implementation 5: Unordered Linked List',
      slug: 'unordered-linked-list',
      description: `The unordered linked list implementation is the dynamic memory equivalent of the unordered array. New jobs are simply appended to the rear of the linked list. To make this O(1), we maintain a \`rear_\` pointer in addition to the \`front_\` pointer of the queue.

Dequeuing from an unordered linked list involves traversing the entire list to find the node with the maximum priority. Because lists do not allow random access, we must maintain two sets of pointers during our scan: one pair (\`pres\`, \`prev\`) to iterate through the list, and another pair (\`max_pres\`, \`max_prev\`) to remember the exact location and preceding node of the maximum priority element.

Once the maximum element is identified (O(n) time), we perform pointer surgery to bypass it and then \`free\` its memory. Handling edge cases is critical here: the max node might be at the front, at the rear, or the only node in the list. The actual pointer update is O(1), but the search makes the overall dequeue O(n).`,
      keyPoints: [
        'Enqueue is O(1) by maintaining a rear pointer and appending to the end.',
        'Dequeue is O(n) because a full traversal is needed to find the maximum priority node.',
        'Pointer surgery is required to remove the max node, needing references to its predecessor.',
        'FIFO tie-breaking is achieved using strict greater-than (>) during the linear scan.',
        'Dynamic memory allocation prevents overflow issues present in array implementations.'
      ],
      codeExamples: [
        {
          id: 'u2-t3-s4-ex1',
          title: 'Unordered Linked List Enqueue and Dequeue',
          code: `#include <stdio.h>
#include <stdlib.h>

struct job { int job_no_; int priority_; };
typedef struct job job_t;
int get_priority(job_t* ptr_job) { return ptr_job->priority_; }
void set_job(job_t* ptr_job, int job_no, int priority) { ptr_job->job_no_ = job_no; ptr_job->priority_ = priority; }

struct node { job_t jobx_; struct node* next_; };
typedef struct node node_t;

struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

node_t* create_node(job_t* ptr_job) {
    node_t* new_node = (node_t*)malloc(sizeof(node_t));
    new_node->jobx_ = *ptr_job;
    new_node->next_ = NULL;
    return new_node;
}

void enque(queue_t *ptr_queue, job_t *ptr_job) {
    node_t* temp = create_node(ptr_job);
    if(ptr_queue->rear_ == NULL) ptr_queue->front_ = temp;
    else ptr_queue->rear_->next_ = temp;
    ptr_queue->rear_ = temp;
}

job_t deque(queue_t *ptr_queue) {
    node_t *prev = NULL; node_t *pres = ptr_queue->front_;
    int max_priority = get_priority(&pres->jobx_);
    node_t *max_prev = NULL; node_t *max_pres = pres;
    
    while(pres != NULL) {
        if(get_priority(&pres->jobx_) > max_priority) {
            max_priority = get_priority(&pres->jobx_);
            max_prev = prev; max_pres = pres;
        }
        prev = pres; pres = pres->next_;
    }
    
    job_t jobx = max_pres->jobx_;
    
    // Pointer surgery
    if(max_prev == NULL) { // max is at the front
        ptr_queue->front_ = max_pres->next_;
        if(ptr_queue->front_ == NULL) ptr_queue->rear_ = NULL;
    } else { // max is in middle or end
        max_prev->next_ = max_pres->next_;
        if(max_pres->next_ == NULL) ptr_queue->rear_ = max_prev;
    }
    
    free(max_pres);
    return jobx;
}`,
          language: 'c',
          explanation: 'Enque appends at the rear in O(1). Deque scans the list maintaining prev pointers. Special care is taken if the max element is the front node or the rear node.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 25, code: 'ptr_queue->rear_->next_ = temp; ptr_queue->rear_ = temp;', explanation: 'O(1) insertion at the rear.' },
            { lineNumber: 35, code: 'if(get_priority(&pres->jobx_) > max_priority)', explanation: 'Strictly greater ensures first instance of max priority is saved.' },
            { lineNumber: 44, code: 'if(max_prev == NULL) { ... } else { ... }', explanation: 'Condition handles deletion of the first node versus other nodes.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t3-s4-cm1',
          title: 'Forgetting to update rear pointer on deletion',
          wrongCode: `max_prev->next_ = max_pres->next_; \n// missing rear check`,
          correctCode: `max_prev->next_ = max_pres->next_;\nif(max_pres->next_ == NULL) ptr_queue->rear_ = max_prev;`,
          explanation: 'If the node being deleted is the last node in the list, the rear pointer must be updated to point to max_prev. Forgetting this causes the rear pointer to dangle, leading to segfaults on the next enqueue.',
          consequence: 'Segmentation fault during subsequent insertions.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t3-s4-ic1',
          title: 'Tracking Predecessors',
          content: 'In singly linked lists, deleting a node requires a pointer to its predecessor. A very common interview question is to implement deletion without a predecessor pointer (by copying the next node\'s data and deleting the next node). However, that trick fails if the node to delete is the last node, which is why tracking `prev` is necessary here.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t3-s4-cp1',
          title: 'Pointers in Unordered List Dequeue',
          description: 'Identify why four pointers are used during scan.',
          criteria: ['pres and prev are for current traversal', 'max_pres and max_prev store the target for deletion'],
          topicId: 'u2-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t3-s4-rc1',
          front: 'In an unordered linked list PQ, what happens if we delete the node at the very end?',
          back: 'We must update the `rear_` pointer of the queue to point to `max_prev`. Otherwise, `rear_` becomes a dangling pointer.',
          topicId: 'u2-t3',
          tags: ['linked-list', 'edge-case']
        }
      ]
    },
    {
      id: 'u2-t3-s5',
      title: 'Ordered Linked List Implementation & Comparison',
      slug: 'ordered-linked-list',
      description: `The ordered linked list strikes a balance that makes it highly popular for priority queues where list structures are preferred. We maintain the list sorted in descending order of priority, meaning the highest priority job is always precisely at the \`front_\` of the linked list.

Because the maximum element is at the front, dequeue is extremely simple: we just remove the head of the list, an O(1) operation. We don't need a linear scan.

Enqueue, however, requires finding the correct sorted position for the new job, which takes O(n) time. We traverse the list and stop when we find a node with a priority strictly less than the new job's priority. We then insert the new node just before it. For FIFO ties, we continue traversing past elements with the *same* priority, inserting strictly after them.

Let's look at a summary of all four implementations:
- Unordered Array: Enqueue O(1), Dequeue O(n)
- Ordered Array: Enqueue O(n), Dequeue O(1)
- Unordered List: Enqueue O(1), Dequeue O(n)
- Ordered List: Enqueue O(n), Dequeue O(1)`,
      keyPoints: [
        'Maintains elements sorted descending; highest priority is at the head of the list.',
        'Dequeue is O(1) by simply removing the head node.',
        'Enqueue is O(n) by traversing to find the sorted insertion point.',
        'FIFO ties: insert after existing nodes of the same priority (using >= in the traversal loop).',
        'Ordered list is generally the most elegant basic implementation as dequeue requires no array shifts or complex pointer surgery.'
      ],
      codeExamples: [
        {
          id: 'u2-t3-s5-ex1',
          title: 'Ordered Linked List Enqueue and Dequeue',
          code: `#include <stdio.h>
#include <stdlib.h>

struct job { int job_no_; int priority_; };
typedef struct job job_t;
int get_priority(job_t* ptr_job) { return ptr_job->priority_; }
void set_job(job_t* ptr_job, int job_no, int priority) { ptr_job->job_no_ = job_no; ptr_job->priority_ = priority; }
struct node { job_t jobx_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

node_t* create_node(job_t* ptr_job) {
    node_t* new_node = (node_t*)malloc(sizeof(node_t));
    new_node->jobx_ = *ptr_job;
    new_node->next_ = NULL;
    return new_node;
}

void enque(queue_t *ptr_queue, job_t *ptr_job) {
    node_t* temp = create_node(ptr_job);
    if(ptr_queue->rear_ == NULL) { // empty
        ptr_queue->front_ = temp; ptr_queue->rear_ = temp; temp->next_ = NULL;
    } else {
        // sorted descending (highest priority at front)
        node_t* prev = NULL; node_t* pres = ptr_queue->front_;
        while(pres != NULL && get_priority(&pres->jobx_) >= get_priority(&temp->jobx_)) {
            prev = pres; pres = pres->next_;
        }
        if(prev == NULL) ptr_queue->front_ = temp;
        else { prev->next_ = temp; if(pres == NULL) ptr_queue->rear_ = temp; }
        temp->next_ = pres;
    }
}

job_t deque(queue_t *ptr_queue) {
    // always the first (highest priority at front)
    job_t jobx; 
    node_t* temp = ptr_queue->front_;
    jobx = temp->jobx_;
    ptr_queue->front_ = temp->next_;
    if(ptr_queue->front_ == NULL) ptr_queue->rear_ = NULL;
    free(temp);
    return jobx;
}`,
          language: 'c',
          explanation: 'Enqueue sorts on the fly. Dequeue pops the front node. The >= check in enqueue guarantees FIFO stability.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 27, code: 'while(pres != NULL && get_priority(&pres->jobx_) >= get_priority(&temp->jobx_))', explanation: 'The >= condition skips over elements with equal or greater priority, placing the new element AFTER them.' },
            { lineNumber: 39, code: 'ptr_queue->front_ = temp->next_;', explanation: 'O(1) removal of the head.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t3-s5-cm1',
          title: 'Incorrect FIFO condition in Ordered List',
          wrongCode: `while(pres != NULL && get_priority(...) > get_priority(...))`,
          correctCode: `while(pres != NULL && get_priority(...) >= get_priority(...))`,
          explanation: 'Using strict > means the loop stops at the first element with the same priority. We would insert BEFORE it. Since we dequeue from the front, the newer element is dequeued first, violating FIFO.',
          consequence: 'LIFO order for equal priority elements.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t3-s5-ic1',
          title: 'Ordered Array vs Ordered List',
          content: 'Why does Ordered Array sort ascending while Ordered List sorts descending? Arrays pop from the end (O(1) pop, no shift). Linked lists pop from the front (O(1) pop, head update). Thus, we place the max element at the end of the array, but at the front of the list.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t3-s5-cp1',
          title: 'Best Implementation',
          description: 'Match implementations to their ideal use cases.',
          criteria: ['Knows unordered is O(1) enq', 'Knows ordered is O(1) deq'],
          topicId: 'u2-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t3-s5-rc1',
          front: 'What are the time complexities for Enqueue and Dequeue in an Ordered Linked List PQ?',
          back: 'Enqueue is O(n) due to finding the correct sorted position. Dequeue is O(1) as it just removes the head node.',
          topicId: 'u2-t3',
          tags: ['complexity', 'linked-list']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t3-q1',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'Which representation maintains elements in priority order so deletion from one end is efficient?',
      options: ['Unordered array', 'Unordered list', 'Ordered list', 'None of the above'],
      correctAnswer: 'Ordered list',
      explanation: 'Ordered list and ordered array maintain order. Since ordered array was not an option, ordered list is the correct choice.',
      tags: ['concept', 'ordered']
    },
    {
      id: 'u2-t3-q2',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Using an unordered list priority queue, which operation is NOT efficient and why?',
      options: ['Enqueue - requires shifting elements', 'Enqueue - requires O(n) memory allocation', 'Dequeue - requires O(n) operations proportional to number of elements', 'Dequeue - requires binary search'],
      correctAnswer: 'Dequeue - requires O(n) operations proportional to number of elements',
      explanation: 'In an unordered list, we must linearly scan all n elements to find the maximum priority element.',
      tags: ['complexity', 'unordered-list']
    },
    {
      id: 'u2-t3-q3',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'For an ordered array PQ, deque is at the END (not beginning) for efficiency. To maintain same-priority FIFO, where should a new job be inserted relative to existing same-priority jobs?',
      options: ['To the right of them', 'To the left of them', 'Anywhere adjacent to them', 'It does not matter'],
      correctAnswer: 'To the left of them',
      explanation: 'Since we dequeue from the right end, elements closer to the right are removed first. New elements should be placed to the left so older elements remain closer to the right.',
      tags: ['fifo', 'ordered-array']
    },
    {
      id: 'u2-t3-q4',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'In an ordered list PQ, to maintain same-priority FIFO, which job of a given priority group is dequeued first?',
      options: ['The one nearest to front', 'The one nearest to rear', 'The one with smallest job number', 'A random one'],
      correctAnswer: 'The one nearest to front',
      explanation: 'Since we dequeue from the front, the element closest to the head of the list will be dequeued first. We insert new same-priority items behind the existing ones.',
      tags: ['fifo', 'ordered-list']
    },
    {
      id: 'u2-t3-q5',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'In both ordered implementations (array and list), which operation is strictly O(1)?',
      options: ['Enqueue', 'Dequeue', 'Both', 'Neither'],
      correctAnswer: 'Dequeue',
      explanation: 'Because the data is kept sorted, the highest priority item is always at the removal end. Enqueue is O(n) because it must insert in sorted order.',
      tags: ['complexity', 'ordered']
    },
    {
      id: 'u2-t3-q6',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'In an unordered array priority queue, how is the max priority element found?',
      options: ['Binary search', 'Sorting the array first', 'Linear scan O(n)', 'Checking the first element'],
      correctAnswer: 'Linear scan O(n)',
      explanation: 'Since the array is not sorted, every element must be inspected to guarantee finding the maximum.',
      tags: ['concept', 'unordered-array']
    },
    {
      id: 'u2-t3-q7',
      type: 'true-false',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'In a priority queue, an element with priority 5 is processed before an element with priority 10 (assuming higher value = higher priority).',
      correctAnswer: false,
      explanation: 'Higher priority value means it gets processed first.',
      tags: ['concept']
    },
    {
      id: 'u2-t3-q8',
      type: 'true-false',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'The Unordered List implementation requires less memory overall than the Unordered Array implementation when the queue is nearly empty.',
      correctAnswer: true,
      explanation: 'The array implementation allocates a fixed MAXSIZE upfront, whereas the list only allocates memory for elements actually present.',
      tags: ['memory', 'linked-list']
    },
    {
      id: 'u2-t3-q9',
      type: 'fill-blank',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'To remove an element from an Unordered Array Priority Queue, you first find the maximum element, and then you must _____ the remaining elements to fill the gap.',
      correctAnswer: 'shift',
      explanation: 'Shifting the elements left by one position fills the hole left by the removed element, maintaining a contiguous array.',
      tags: ['unordered-array']
    },
    {
      id: 'u2-t3-q10',
      type: 'fill-blank',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'In the Unordered List implementation, you must maintain a reference to the ________ of the maximum node in order to bypass it during deletion.',
      correctAnswer: 'predecessor',
      explanation: 'Pointer surgery for deletion in a singly linked list requires the predecessor (prev) node to update its next pointer.',
      tags: ['unordered-list']
    },
    {
      id: 'u2-t3-q11',
      type: 'spot-bug',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'Identify the bug in this tie-breaking logic for an ordered array enqueue.',
      code: `while(i >= 0 && get_priority(&ptr_queue->key_[i]) > priority) {
    ptr_queue->key_[i + 1] = ptr_queue->key_[i]; 
    --i;
}`,
      options: ['Loop bound is wrong', 'Should use < instead of >', 'Should use >= instead of > to maintain FIFO', 'priority should be passed by reference'],
      correctAnswer: 'Should use >= instead of > to maintain FIFO',
      explanation: 'Using strict > leaves equal priority items in place, putting the new item to their right. It breaks FIFO since dequeue happens from the right.',
      tags: ['bug', 'fifo']
    },
    {
      id: 'u2-t3-q12',
      type: 'predict-output',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Trace the Unordered Array PQ. Enqueue (A, 5), Enqueue (B, 5), Enqueue (C, 10). What is the output of the first two Dequeues?',
      options: ['C then A', 'C then B', 'A then B', 'B then A'],
      correctAnswer: 'C then A',
      explanation: 'C has highest priority (10) so it is first. A and B tie at 5, but A joined earlier, so FIFO rules prioritize A over B.',
      tags: ['trace']
    },
    {
      id: 'u2-t3-q13',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Unordered list PQ (lower value = higher priority). Insert (priority=5,A), (priority=2,B), (priority=8,C), (priority=2,D) in that order. Ties broken by FIFO. removeMin() called twice. Which labels are removed in order?',
      options: ['A then C', 'B then D', 'D then B', 'B then A'],
      correctAnswer: 'B then D',
      explanation: 'B and D both have the lowest priority value (2). B was inserted before D, so FIFO gives B first, then D. Answer: B then D.',
      tags: ['Priority-Queue', 'FIFO-Ties']
    },
    {
      id: 'u2-t3-q14',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Unordered list PQ with both head and tail. If jobs have the same priority, the one that joined earlier dequeues first. Which job should be dequeued?',
      options: ['The one nearest to the front with the highest priority', 'The one farthest from the front with the highest priority', 'Any node with the highest priority', 'No two jobs can have the same priority'],
      correctAnswer: 'The one nearest to the front with the highest priority',
      explanation: 'In an unordered list, scanning from front (head) to back finds the earliest-inserted highest-priority job first. This correctly implements FIFO tie-breaking.',
      tags: ['Priority-Queue', 'FIFO-Ties']
    },
    {
      id: 'u2-t3-q15',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'Ordered array PQ: dequeue from the end (not beginning) for efficiency. Jobs with same priority must dequeue in FIFO order. Where should a new job be enqueued?',
      options: ['At the end; requires only a few operations', 'At the beginning; may require shifting', 'To the RIGHT of jobs with the same priority', 'To the LEFT of jobs with the same priority'],
      correctAnswer: 'To the RIGHT of jobs with the same priority',
      explanation: 'If we dequeue from the right end (highest priority), then among equal-priority jobs the one to the RIGHT dequeues first. To maintain FIFO, a new job with priority P must go to the RIGHT of existing priority-P jobs (so older jobs dequeue before it).',
      tags: ['Ordered-Array-PQ', 'FIFO-Ties']
    },
    {
      id: 'u2-t3-q16',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'When two elements in a priority queue have the same priority, which principle is used to decide the order?',
      options: ['LIFO', 'FIFO', 'Random', 'Reverse ordering'],
      correctAnswer: 'FIFO',
      explanation: 'FIFO (First In, First Out): among equal-priority elements, the one that was inserted earlier is served first. This is the standard tie-breaking convention for priority queues.',
      tags: ['Priority-Queue', 'FIFO']
    },
    {
      id: 'u2-t3-q17',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'When implementing a priority queue using an UNORDERED list, which operation is inefficient?',
      options: ['Enqueue — requires traversal to find the end', 'Dequeue — must scan all elements to find highest priority', 'Initialize — must allocate memory for all priorities', 'is_empty — must scan all elements'],
      correctAnswer: 'Dequeue — must scan all elements to find highest priority',
      explanation: 'In an unordered list, enqueue is O(1) (insert at front or rear). But dequeue must scan all n elements to find the highest-priority element: O(n). This is the trade-off of unordered implementation.',
      tags: ['Unordered-List-PQ', 'Complexity']
    },
    {
      id: 'u2-t3-q18',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Higher value = higher priority. 4 jobs were serviced in order: A, D, B, C. Each has a distinct priority (1 to 4). What are their priorities?',
      options: ['A=4, B=2, C=1, D=3', 'A=1, B=3, C=4, D=2', 'A=1, B=2, C=3, D=4', 'Cannot be determined'],
      correctAnswer: 'A=4, B=2, C=1, D=3',
      explanation: 'Serviced order = descending priority order. A first = highest priority = 4. D second = 3. B third = 2. C last = lowest = 1. So A=4, D=3, B=2, C=1.',
      tags: ['Priority-Queue', 'Reasoning']
    },
    {
      id: 'u2-t3-q19',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Which representation maintains elements by priority such that deletion of the highest-priority element is O(1) from one end?',
      options: ['Unordered list', 'Ordered list', 'Unordered array', 'Simple FIFO queue'],
      correctAnswer: 'Ordered list',
      explanation: 'In an ordered list, elements are kept sorted by priority. The highest-priority element is always at one end (front or rear), so deletion is O(1). The cost is paid at insertion: O(n) to find the correct position.',
      tags: ['Ordered-List-PQ', 'Complexity']
    },
    {
      id: 'u2-t3-q20',
      type: 'predict-output',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'PQ elements: A(priority=2), B(priority=4), C(priority=1), D(priority=4). Inserted in order A, B, C, D. Higher value = higher priority. FIFO for ties. What is the deletion order?',
      options: ['B, D, A, C', 'D, B, A, C', 'B, A, D, C', 'D, A, B, C'],
      correctAnswer: 'B, D, A, C',
      explanation: 'B and D both have priority 4. B was inserted first, so FIFO gives B before D. After removing B and D, A has priority 2, C has priority 1. So order is B, D, A, C.',
      tags: ['Priority-Queue', 'FIFO-Ties', 'Trace']
    },
    {
      id: 'u2-t3-q21',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'Which statement correctly distinguishes a priority queue from an ordinary queue?',
      options: ['A priority queue allows insertion but not deletion', 'An ordinary queue always uses priorities', 'A priority queue determines deletion primarily by priority, not insertion order', 'An ordinary queue cannot be implemented using an array'],
      correctAnswer: 'A priority queue determines deletion primarily by priority, not insertion order',
      explanation: 'An ordinary queue follows strict FIFO — removal is always from the front in insertion order. A priority queue overrides this: the element with the highest priority is removed regardless of when it was inserted. This is the defining difference.',
      tags: ['Priority-Queue', 'vs-Queue']
    },
    {
      id: 'u2-t3-q22',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'Which of the following does NOT typically use a priority queue?',
      options: ['Patient management (triage)', 'Scheduling processes in an operating system', 'Managing function calls (call stack)', 'Selecting the next print job from the spool based on priority'],
      correctAnswer: 'Managing function calls (call stack)',
      explanation: 'Function calls use a STACK (LIFO), not a priority queue. Patient triage (urgent patients first), OS scheduling (higher-priority processes first), and priority-based print spooling all use priority queues. The call stack manages returns in LIFO order, which is unrelated to priority.',
      tags: ['Priority-Queue', 'Applications']
    },
    {
      id: 'u2-t3-q23',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Which statement best describes enqueue in a priority queue implemented using an UNORDERED array?',
      options: ['Can add at the beginning; requires few operations independent of size', 'Can add at the end; requires few operations independent of number of elements', 'Should insert in the middle', 'Should depend on the priority'],
      correctAnswer: 'Can add at the end; requires few operations independent of number of elements',
      explanation: 'In an unordered array PQ, elements are inserted at the end (or anywhere) without maintaining order. This is O(1). The cost is paid at dequeue: O(n) scan to find the highest-priority element. Enqueue is fast precisely because we do not sort on insert.',
      tags: ['Unordered-Array-PQ', 'Enqueue-Complexity']
    },
    {
      id: 'u2-t3-q24',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Which statement best describes enqueue in a priority queue implemented using an ORDERED array?',
      options: ['Can add at the beginning; requires few operations', 'Can add at the end; requires few operations', 'Should insert in the correct sorted position (depends on priority)', 'None of these'],
      correctAnswer: 'Should insert in the correct sorted position (depends on priority)',
      explanation: 'In an ordered array PQ, elements are maintained in sorted order by priority. Inserting requires finding the correct position (O(n) scan) and shifting elements. The benefit is O(1) dequeue (just remove from the end or beginning). Enqueue is expensive but dequeue is cheap.',
      tags: ['Ordered-Array-PQ', 'Enqueue-Complexity']
    },
    {
      id: 'u2-t3-q25',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'In a priority queue implemented using an ORDERED list, which is correct?',
      options: ['Both enqueue and dequeue require O(n) operations', 'Both require O(1) operations', 'Enqueue requires more operations than dequeue', 'Dequeue requires more operations than enqueue'],
      correctAnswer: 'Enqueue requires more operations than dequeue',
      explanation: 'Ordered list PQ: enqueue must find the correct sorted position (O(n) traversal to find where to insert). Dequeue removes from the front/end where the highest-priority element always sits (O(1)). So enqueue is O(n) and dequeue is O(1) — enqueue costs more.',
      tags: ['Ordered-List-PQ', 'Complexity-Trade-off']
    },
    {
      id: 'u2-t3-q26',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Deinitializing (destroying) a priority queue requires:',
      options: ['A few operations in an array implementation', 'A few operations in a list implementation', 'Operations proportional to number of elements in an array implementation', 'Freeing resources in an array implementation'],
      correctAnswer: 'A few operations in an array implementation',
      explanation: 'Array-based PQ: deinit just frees the array (one free call) — O(1). List-based PQ: each node was individually malloc-ed, so deinit must traverse the list and free each node individually — O(n). Arrays are cheaper to destroy.',
      tags: ['Deinitialize', 'Array-vs-List']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t3-p1',
      title: 'Trace Dequeue Operations on Unordered Array',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      problemStatement: 'Trace the state of an unordered array PQ with maximum size 5. The following jobs are currently in the array from index 0 to 4: [(A,3), (B,1), (C,4), (D,1), (E,5)]. Show the array contents and size after two `deque()` operations.',
      constraints: ['Use the standard > comparison for finding maximums'],
      sampleInput: '[(A,3), (B,1), (C,4), (D,1), (E,5)]',
      sampleOutput: 'After 1st deque (E,5): [(A,3), (B,1), (C,4), (D,1)]\\nAfter 2nd deque (C,4): [(A,3), (B,1), (D,1)]',
      hints: [
        'Find the highest priority value first.',
        'If it is at the end of the array, shifting is minimal.',
        'If it is in the middle, shift all elements to its right one position left.'
      ],
      solution: `// Pen and paper trace:
// Initial: [(A,3), (B,1), (C,4), (D,1), (E,5)] , n = 5
// 1st Deque: Max priority is 5 at index 4 (E).
// Shift: None needed since it's at the end.
// Array becomes [(A,3), (B,1), (C,4), (D,1)] , n = 4

// 2nd Deque: Max priority is 4 at index 2 (C).
// Shift: Shift index 3 (D) to index 2.
// Array becomes [(A,3), (B,1), (D,1)] , n = 3`,
      solutionExplanation: 'The highest element is removed, and elements to its right shift left to close the gap.',
      dryRun: [
        { step: 1, line: 1, variables: { n: '5', array: 'A3,B1,C4,D1,E5' }, output: '', explanation: 'Initial state' },
        { step: 2, line: 2, variables: { max_pos: '4', max_val: '5' }, output: 'Dequeued E,5', explanation: 'E has max priority' },
        { step: 3, line: 3, variables: { n: '4', array: 'A3,B1,C4,D1' }, output: '', explanation: 'After removal of E' },
        { step: 4, line: 4, variables: { max_pos: '2', max_val: '4' }, output: 'Dequeued C,4', explanation: 'C has max priority' },
        { step: 5, line: 5, variables: { n: '3', array: 'A3,B1,D1' }, output: '', explanation: 'D shifted left over C' }
      ],
      tags: ['trace', 'unordered-array']
    },
    {
      id: 'u2-t3-p2',
      title: 'Print Job Scheduler Simulation',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      problemStatement: 'Using the Unordered Array Implementation (Implementation 8), write a complete C program to simulate a printer queue. Enqueue the following documents with their page counts acting as priority (fewer pages = higher priority, so priority = 1000 - pages): Doc 1: 50 pages, Doc 2: 10 pages, Doc 3: 100 pages, Doc 4: 10 pages. Print the order in which documents are printed.',
      constraints: ['Priority = 1000 - pages', 'Use Unordered Array'],
      sampleInput: 'Doc 1: 50, Doc 2: 10, Doc 3: 100, Doc 4: 10',
      sampleOutput: 'Doc 2\\nDoc 4\\nDoc 1\\nDoc 3',
      hints: [
        'Initialize the queue to empty.',
        'Enqueue all jobs using set_job and enque.',
        'Dequeue and print until the queue is empty.'
      ],
      solution: `#include <stdio.h>
#define MAXSIZE 100

struct job { int job_no_; int priority_; };
typedef struct job job_t;
int get_priority(job_t* ptr_job) { return ptr_job->priority_; }
void set_job(job_t* ptr_job, int job_no, int priority) { ptr_job->job_no_ = job_no; ptr_job->priority_ = priority; }
struct queue { job_t key_[MAXSIZE]; int n_; };
typedef struct queue queue_t;
int is_full(queue_t* ptr_queue) { return ptr_queue->n_ == MAXSIZE; }
int is_empty(queue_t* ptr_queue) { return ptr_queue->n_ == 0; }

void enque(queue_t *ptr_queue, job_t *ptr_job) {
    if(! is_full(ptr_queue))
        ptr_queue->key_[ptr_queue->n_++] = *ptr_job;
}

job_t deque(queue_t *ptr_queue) {
    int max_pos = 0; int n = ptr_queue->n_;
    for(int i = 1; i < n; ++i) {
        if(get_priority(&ptr_queue->key_[i]) > get_priority(&ptr_queue->key_[max_pos]))
            max_pos = i;
    }
    job_t jobx = ptr_queue->key_[max_pos];
    for(int i = max_pos; i < n - 1; ++i)
        ptr_queue->key_[i] = ptr_queue->key_[i+1];
    --ptr_queue->n_;
    return jobx;
}

int main() {
    queue_t q = { .n_ = 0 };
    job_t j1, j2, j3, j4;
    set_job(&j1, 1, 1000 - 50); enque(&q, &j1);
    set_job(&j2, 2, 1000 - 10); enque(&q, &j2);
    set_job(&j3, 3, 1000 - 100); enque(&q, &j3);
    set_job(&j4, 4, 1000 - 10); enque(&q, &j4);
    
    while(!is_empty(&q)) {
        job_t j = deque(&q);
        printf("Doc %d\\n", j.job_no_);
    }
    return 0;
}`,
      solutionExplanation: 'Doc 2 and Doc 4 have the same priority (990). Doc 2 was added first, so the strict > in unordered array dequeue selects Doc 2 first.',
      dryRun: [
        { step: 1, line: 36, variables: { q: '[(1,950),(2,990),(3,900),(4,990)]' }, output: '', explanation: 'Queue loaded with 4 print jobs' },
        { step: 2, line: 40, variables: { max: '(2,990)' }, output: 'Doc 2', explanation: 'Doc 2 found as max priority (990), added first so selected first' },
        { step: 3, line: 40, variables: { max: '(4,990)' }, output: 'Doc 4', explanation: 'Doc 4 is next max (990), added after Doc 2' },
        { step: 4, line: 40, variables: { max: '(1,950)' }, output: 'Doc 1', explanation: 'Doc 1 is next at priority 950' }
      ],
      tags: ['simulation', 'unordered-array']
    },
    {
      id: 'u2-t3-p3',
      title: 'Min-Priority Queue via Ordered List',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      problemStatement: 'Modify the Ordered Linked List PQ (Implementation 7) so that a LOWER priority value is dequeued first. Maintain FIFO for ties.',
      constraints: ['Ordered Linked List only', 'Lowest value = highest priority'],
      sampleInput: 'Enque(10), Enque(5), Enque(5)',
      sampleOutput: 'Dequeued 5 (first), Dequeued 5 (second), Dequeued 10',
      hints: [
        'The list should be sorted ascending instead of descending.',
        'Change >= to <= when traversing.'
      ],
      solution: `// Only the enque function logic needs to change.
void enque(queue_t *ptr_queue, job_t *ptr_job) {
    node_t* temp = create_node(ptr_job);
    if(ptr_queue->rear_ == NULL) { 
        ptr_queue->front_ = temp; ptr_queue->rear_ = temp; temp->next_ = NULL;
    } else {
        node_t* prev = NULL; node_t* pres = ptr_queue->front_;
        // Changed >= to <= to sort ascending (lower value is higher priority)
        while(pres != NULL && get_priority(&pres->jobx_) <= get_priority(&temp->jobx_)) {
            prev = pres; pres = pres->next_;
        }
        if(prev == NULL) ptr_queue->front_ = temp;
        else { prev->next_ = temp; if(pres == NULL) ptr_queue->rear_ = temp; }
        temp->next_ = pres;
    }
}`,
      solutionExplanation: 'By changing the traversal condition to `<=`, we ensure that lower numbers stay at the front of the list, and new items equal to existing ones are placed after them to maintain FIFO.',
      dryRun: [
        { step: 1, line: 9, variables: { pres: '5', temp: '5' }, output: '', explanation: 'pres (5) <= temp (5) is true, loop advances' },
        { step: 2, line: 12, variables: { prev: 'node with 5', temp: 'new node with 5' }, output: '', explanation: 'Inserted after existing 5' }
      ],
      tags: ['modification', 'ordered-list']
    },
    {
      id: 'u2-t3-p4',
      title: 'Complexity Comparison',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      problemStatement: 'Which combination of operations would run FASTER on an Ordered Array compared to an Unordered Array? A) 100 enqueues followed by 100 dequeues. B) 1 enqueue followed by 1 dequeue, repeated 100 times.',
      constraints: ['Theoretical analysis'],
      sampleInput: 'N/A',
      sampleOutput: 'N/A',
      hints: [
        'Calculate total operations for Unordered Array in case A.',
        'Compare with total operations for Ordered Array in case A.'
      ],
      solution: `/*
Scenario A: 100 enqueues, 100 dequeues
Unordered Array:
- 100 Enqueues: 100 * O(1) = 100 operations.
- 100 Dequeues: Dequeue i takes i operations to scan. Sum(1 to 100) ≈ 5000 operations. Total ≈ 5100.
Ordered Array:
- 100 Enqueues: Enqueue i takes i operations to shift. Sum(1 to 100) ≈ 5000.
- 100 Dequeues: 100 * O(1) = 100. Total ≈ 5100.
(They are roughly the same).

Scenario B: 1 Enqueue, 1 Dequeue, repeated 100 times.
Unordered Array: 
- Enqueue: O(1). 
- Dequeue: Array size is always 1, so O(1) scan.
- Total per pair: O(1) + O(1) = 2. Total for 100 loops = 200.
Ordered Array:
- Enqueue: Array size is 0, so O(1).
- Dequeue: O(1).
- Total = 200.

The performance depends heavily on the ratio of enqueues vs dequeues happening concurrently. If data is mostly ingested in bulk and then retrieved, they behave similarly in total work, but unordered array ingest is instant.
*/`,
      solutionExplanation: 'Both structures perform the same amount of total theoretical work for bulk loads. The choice depends on latency requirements for specific operations (e.g., must dequeue be instant?).',
      dryRun: [
        { step: 1, line: 1, variables: {}, output: '', explanation: 'Mathematical analysis' }
      ],
      tags: ['analysis']
    }
  ]
};
