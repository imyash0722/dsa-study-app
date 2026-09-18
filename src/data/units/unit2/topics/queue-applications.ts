import type { Topic } from '../../../../types';

export const queueApplications: Topic = {
  id: 'u2-t4',
  unitId: 'unit-2',
  title: 'Queue Applications: Josephus Problem & CPU Scheduling',
  slug: 'queue-applications',
  description: `The abstract concept of a Queue is fundamentally a mechanism for sequencing and scheduling. When extended to forms like Circular Linked Lists and Priority Queues, queues become capable of modeling complex real-world systems. Two classical applications that demonstrate the versatility of queues are the Josephus Problem and CPU Scheduling.

The Josephus Problem is a theoretical counting-out game that perfectly illustrates the utility of Circular Linked Lists. By connecting the tail of a list back to its head, we can continuously cycle through elements without complex boundary checks. This models scenarios where resources or participants are arranged in a ring and processed repeatedly.

CPU Scheduling introduces the Priority Queue, where strict First-In-First-Out (FIFO) ordering is relaxed in favor of processing based on urgency or importance. Modern operating systems rely heavily on priority queues to determine which processes get CPU time, balancing fairness (FIFO tiebreaking) with responsiveness (priority preemption). Understanding these applications bridges the gap between abstract data structures and practical system design.`,
  difficulty: 'advanced',
  prerequisites: ['u2-t1', 'u2-t2', 'u2-t3'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u2-t4-s1',
      title: 'Circular Linked List for Applications',
      slug: 'circular-linked-list',
      description: `A Circular Linked List is a variation of the standard linked list where the last node points back to the first node instead of pointing to NULL. This creates a continuous loop, making it ideal for applications that require repetitive cycling through data, such as turn-based games, round-robin scheduling, or the Josephus Problem.

In the implementation provided below, we utilize a special feature: the \`insert\` function always inserts the new node **after the head**, rather than traversing to the end of the list. This O(1) insertion strategy is highly efficient but reverses the order of elements inserted after the first. For example, inserting 10, then 20, then 30 results in the sequence 10 -> 30 -> 20 -> 10. The head pointer remains fixed at the first inserted element.

To traverse and display a circular list, a \`do-while\` loop is heavily preferred over a standard \`while\` loop. Since the traversal starts at the head and must stop when it reaches the head again, a \`while (temp != head)\` loop would instantly terminate if not primed correctly. The \`do-while\` guarantees at least one execution before checking the exit condition.`,
      keyPoints: [
        'A circular linked list connects the last node back to the head node, forming a closed loop.',
        'An empty list is represented by a NULL head pointer, while a single-element list points to itself (self-loop).',
        'Inserting immediately after the head node achieves O(1) time complexity, avoiding full list traversal.',
        'Because new nodes are placed in the second position (after head), the logical order of subsequent insertions is reversed.',
        'A do-while loop is the standard pattern for traversing circular lists to ensure the head node is processed before the loop condition is evaluated.'
      ],
      codeExamples: [
        {
          id: 'u2-t4-s1-ex1',
          title: 'Circular Linked List Implementation (O(1) Insert After Head)',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { 
    int key_; 
    struct node *next_; 
};
typedef struct node node_t;

struct clist { 
    node_t *head_; 
};
typedef struct clist clist_t;

void init_clist(clist_t* ptr_clist) { 
    ptr_clist->head_ = NULL; 
}

static node_t *create_node(int key) {
    node_t *temp = (node_t *)malloc(sizeof(node_t));
    if (temp == NULL) { 
        printf("Memory allocation failed\\n"); 
        exit(1); 
    }
    temp->key_ = key; 
    temp->next_ = NULL; 
    return temp;
}

void insert(clist_t* ptr_clist, int key) {
    node_t *temp = create_node(key);
    if (ptr_clist->head_ == NULL) {
        temp->next_ = temp;  // self-loop for first node
        ptr_clist->head_ = temp;
    } else {
        temp->next_ = ptr_clist->head_->next_;  // new node points to what head pointed to
        ptr_clist->head_->next_ = temp;         // head now points to new node
    }
}

void disp_list(clist_t* ptr_clist) {
    if (ptr_clist->head_ == NULL) { 
        printf("List is empty\\n"); 
        return; 
    }
    node_t* temp = ptr_clist->head_;
    printf("Circular List: ");
    do { 
        printf("%d ", temp->key_); 
        temp = temp->next_; 
    } while (temp != ptr_clist->head_);
    printf("\\n");
}

int main() {
    clist_t myclist; 
    init_clist(&myclist);
    
    insert(&myclist, 10); disp_list(&myclist);
    insert(&myclist, 20); disp_list(&myclist);
    insert(&myclist, 30); disp_list(&myclist);
    insert(&myclist, 5);
    
    printf("After inserting 5 at beginning:\\n");
    disp_list(&myclist);
    return 0;
}`,
          explanation: 'This program demonstrates a specialized circular list where new nodes are inserted immediately after the head. Because the head does not change after the first insertion, subsequent insertions push previously added nodes further down the loop.',
          expectedOutput: `Circular List: 10 \nCircular List: 10 20 \nCircular List: 10 30 20 \nCircular List: 10 5 30 20 \nAfter inserting 5 at beginning:\nCircular List: 10 5 30 20 `,
          lineBreakdown: [
            { lineNumber: 32, code: 'temp->next_ = temp;', explanation: 'Creates a self-loop for the first node, establishing the circular property immediately.' },
            { lineNumber: 35, code: 'temp->next_ = ptr_clist->head_->next_;', explanation: 'The new node adopts the rest of the list as its follower.' },
            { lineNumber: 36, code: 'ptr_clist->head_->next_ = temp;', explanation: 'The head node points to the newly inserted node, placing it in the second position.' },
            { lineNumber: 46, code: '} while (temp != ptr_clist->head_);', explanation: 'Ensures the loop continues until we wrap around and see the head node again.' }
          ],
          relatedTopicIds: ['u2-t2']
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t4-s1-cm1',
          title: 'Infinite Loop in Traversal',
          wrongCode: `node_t* temp = ptr_clist->head_;
while (temp != NULL) {
    printf("%d ", temp->key_);
    temp = temp->next_;
}`,
          correctCode: `node_t* temp = ptr_clist->head_;
do {
    printf("%d ", temp->key_);
    temp = temp->next_;
} while (temp != ptr_clist->head_);`,
          explanation: 'Using `temp != NULL` in a circular list causes an infinite loop because the last node points back to the head, not NULL. The traversal must check if `temp` has wrapped around back to the starting node.',
          consequence: 'The program will print elements forever (or crash due to buffer limitations) because a circular list never reaches a NULL pointer.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t4-s1-ic1',
          title: 'Insert at Head vs Insert at Tail',
          content: 'In standard Circular Linked Lists, keeping a pointer to the TAIL instead of the HEAD allows O(1) insertions at both the front and back. If you only track the HEAD, inserting at the true back requires O(N) traversal. The implementation provided here sidesteps this by inserting AFTER the head, which is O(1) but alters logical ordering.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t4-s1-cp1',
          title: 'Understanding Circular Pointers',
          description: 'Verify comprehension of circular list properties.',
          criteria: [
            'Know that the last node points to the head node.',
            'Understand how to create a self-loop for a single-node list.',
            'Identify why a do-while loop is preferred for traversal.'
          ],
          topicId: 'u2-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t4-s1-rc1',
          front: 'In the provided clist implementation, what is the time complexity of the `insert` operation?',
          back: 'O(1). It inserts the new node immediately after the head without traversing the list.',
          topicId: 'u2-t4',
          tags: ['complexity', 'clist']
        }
      ]
    },
    {
      id: 'u2-t4-s2',
      title: 'Josephus Problem: Statement & Algorithm',
      slug: 'josephus-problem-algorithm',
      description: `The Josephus Problem is a famous theoretical puzzle related to counting out. The scenario involves \`n\` people standing in a circle waiting to be executed. Counting begins at a specific person and proceeds in a fixed direction. In each step, \`k-1\` people are skipped, and the \`k\`-th person is executed (eliminated). The circle shrinks, and the process repeats with the remaining people, starting from the next person going in the same direction. The algorithm stops when only one survivor remains.

A circular linked list is the perfect data structure to model this problem. Since the people stand in a circle and the counting wraps around seamlessly, a circular linked list naturally mimics the geometry of the problem without needing modulo arithmetic for array index wrapping. We populate the list with \`n\` nodes numbered 1 to \`n\`, and repeatedly traverse \`k-1\` steps to delete the \`k\`-th node.

Let's trace an example with **n = 5** and **k = 2** (eliminate every 2nd person, starting from person 1):
1. Initial Circle: 1 -> 2 -> 3 -> 4 -> 5 -> 1
2. Count 2 from 1 (1 is first, 2 is second): eliminate 2. Circle becomes: 1 -> 3 -> 4 -> 5 -> 1
3. Count 2 from 3 (3 is first, 4 is second): eliminate 4. Circle becomes: 1 -> 3 -> 5 -> 1
4. Count 2 from 5 (5 is first, 1 is second): eliminate 1. Circle becomes: 3 -> 5 -> 3
5. Count 2 from 3 (3 is first, 5 is second): eliminate 5. Survivor is: 3.`,
      keyPoints: [
        'The Josephus Problem eliminates every k-th person in a circle of n people until one remains.',
        'A circular linked list inherently models the wrap-around behavior required by the problem.',
        'Each elimination step involves traversing k-1 nodes to locate the k-th node for deletion.',
        'After an elimination, the counting resumes starting from the node immediately following the deleted node.',
        'The loop continues until a node points to itself, signifying it is the only remaining node (the survivor).'
      ],
      codeExamples: [],
      commonMistakes: [
        {
          id: 'u2-t4-s2-cm1',
          title: 'Incorrect Traversal Count',
          wrongCode: `// Trying to find the k-th node
for(int i = 0; i < k; i++) {
    prev = curr;
    curr = curr->next;
}`,
          correctCode: `// Stop at the k-th node
for(int i = 1; i < k; i++) {
    prev = curr;
    curr = curr->next;
}`,
          explanation: 'To eliminate the k-th node, you must take k-1 steps from the starting node. If `curr` starts at the 1st node, stepping `k-1` times lands you exactly on the `k`-th node.',
          consequence: 'You will eliminate the (k+1)-th person instead of the k-th person, resulting in an incorrect survivor.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t4-s2-ic1',
          title: 'Recursive Mathematical Solution vs Simulation',
          content: 'While the Circular Linked List simulation runs in O(n * k) time, there is a recursive mathematical solution (Josephus recurrence: J(n, k) = (J(n-1, k) + k - 1) % n + 1) that runs in O(n) time. Interviewers often want to see the simulation first to test your linked list manipulation skills before asking for the mathematical optimization.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t4-s2-cp1',
          title: 'Tracing Josephus Execution',
          description: 'Ensure you can manually trace the elimination steps.',
          criteria: [
            'Correctly identify the node to be eliminated in the first round.',
            'Properly update the list structure after a node is removed.',
            'Correctly identify the final survivor for small n and k values.'
          ],
          topicId: 'u2-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t4-s2-rc1',
          front: 'Why is a circular linked list preferred over an array for the Josephus simulation?',
          back: 'An array requires shifting elements after every deletion (O(n) per deletion) and complex index modulo arithmetic. A circular list allows O(1) deletion once the node is found and wraps around naturally.',
          topicId: 'u2-t4',
          tags: ['josephus', 'data structures']
        }
      ]
    },
    {
      id: 'u2-t4-s3',
      title: 'Josephus Problem: C Implementation',
      slug: 'josephus-problem-c-implementation',
      description: `Implementing the Josephus algorithm in C requires careful pointer manipulation to build the initial circular list and safely remove nodes without breaking the circle. We first create \`n\` nodes linked sequentially, and set the \`next_\` pointer of the \`n\`-th node to point back to the 1st node.

During the elimination phase, we maintain two pointers: \`curr\` (the node currently being evaluated) and \`prev\` (the node immediately behind \`curr\`). Traversing \`k-1\` steps places \`curr\` on the exact node to be eliminated, and \`prev\` on the node just before it. We then bridge the gap by setting \`prev->next_ = curr->next_\`, print the eliminated node, free its memory, and update \`curr\` to the next person in line.

The termination condition for the loop is when the list shrinks to a single node. In a circular linked list, a single node points to itself (\`curr->next_ == curr\`). When this condition is met, the loop terminates, and the remaining node holds the survivor's position.`,
      keyPoints: [
        'Building the list involves creating a sequential list and linking the tail back to the head.',
        'Two pointers (prev and curr) are required to safely delete a node from the linked list.',
        'The loop condition `while (curr->next_ != curr)` correctly detects when only one node remains.',
        'Memory must be freed using `free()` after each elimination to prevent memory leaks.',
        'After deletion, the `curr` pointer must be updated to `prev->next_` to restart the count from the next valid node.'
      ],
      codeExamples: [
        {
          id: 'u2-t4-s3-ex1',
          title: 'Josephus Problem Implementation',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { 
    int key_; 
    struct node *next_; 
};
typedef struct node node_t;

node_t *create_node(int key) {
    node_t *temp = (node_t *)malloc(sizeof(node_t));
    if (temp == NULL) { 
        printf("Memory allocation failed\\n"); 
        exit(1); 
    }
    temp->key_ = key; 
    temp->next_ = NULL; 
    return temp;
}

int josephus(int n, int k) {
    if (n <= 0 || k <= 0) return -1;
    
    // Step 1: Create the circular linked list of n people
    node_t *head = create_node(1);
    node_t *prev = head;
    for (int i = 2; i <= n; i++) {
        prev->next_ = create_node(i);
        prev = prev->next_;
    }
    prev->next_ = head; // Close the circle

    node_t *curr = head;
    
    // Step 2: Eliminate until 1 person remains
    while (curr->next_ != curr) {
        // Move k-1 steps to find the k-th person
        for (int i = 1; i < k; i++) {
            prev = curr;
            curr = curr->next_;
        }
        
        // curr is the person to be eliminated, prev is the person before
        prev->next_ = curr->next_; // Remove curr from the circle
        printf("Eliminated: %d\\n", curr->key_);
        
        node_t *temp = curr;
        curr = curr->next_; // Move curr to the next person for the next round
        free(temp);         // Free the eliminated person's memory
    }
    
    int survivor = curr->key_;
    free(curr); // Free the survivor node
    return survivor;
}

int main() {
    int n = 5, k = 2;
    printf("Survivor for n=%d, k=%d is: %d\\n", n, k, josephus(n, k));
    return 0;
}`,
          explanation: 'This complete C program constructs the circular list, executes the elimination logic by unlinking and freeing the k-th node, and finally returns and frees the last remaining survivor.',
          expectedOutput: `Eliminated: 2\nEliminated: 4\nEliminated: 1\nEliminated: 5\nSurvivor for n=5, k=2 is: 3`,
          lineBreakdown: [
            { lineNumber: 29, code: 'prev->next_ = head;', explanation: 'Links the last created node back to the head, finalizing the circular structure.' },
            { lineNumber: 34, code: 'while (curr->next_ != curr)', explanation: 'The loop continues as long as there is more than one node in the circle (a single node points to itself).' },
            { lineNumber: 36, code: 'for (int i = 1; i < k; i++)', explanation: 'Advances the prev and curr pointers k-1 times so curr lands on the target to be deleted.' },
            { lineNumber: 42, code: 'prev->next_ = curr->next_;', explanation: 'Bridges over the curr node, effectively removing it from the sequence.' }
          ],
          relatedTopicIds: ['u2-t2']
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t4-s3-cm1',
          title: 'Freeing Memory Before Advancing Pointers',
          wrongCode: `free(curr);
curr = curr->next_; // Error: accessing freed memory`,
          correctCode: `node_t *temp = curr;
curr = curr->next_;
free(temp);`,
          explanation: 'Once a node is freed, its memory is returned to the OS. You cannot access `curr->next_` after calling `free(curr)`. You must either save the next pointer first or use a temporary pointer for freeing.',
          consequence: 'Undefined behavior, often manifesting as a segmentation fault or corrupted data.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t4-s3-ic1',
          title: 'Handling k=1 Edge Case',
          content: 'If k=1, the inner loop `for(int i=1; i<k; i++)` does not execute. However, our logic assumes `prev` is correctly placed right before `curr`. If `k=1`, `prev` will still be pointing to the tail from the initialization, which correctly allows us to delete `curr` (the head). But if you do not track `prev` correctly around the circle, k=1 will fail.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t4-s3-cp1',
          title: 'List Manipulation Safety',
          description: 'Ensure memory and pointers are handled safely.',
          criteria: [
            'Properly utilize a temporary pointer to free memory.',
            'Verify the loop termination condition `curr->next_ == curr`.',
            'Ensure all dynamically allocated memory is freed by the end.'
          ],
          topicId: 'u2-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t4-s3-rc1',
          front: 'What is the termination condition for the Josephus elimination loop using a circular linked list?',
          back: '`while (curr->next_ != curr)`. The loop terminates when a node points to itself, meaning it is the only node left.',
          topicId: 'u2-t4',
          tags: ['josephus', 'c programming']
        }
      ]
    },
    {
      id: 'u2-t4-s4',
      title: 'CPU Scheduling with Priority Queue',
      slug: 'cpu-scheduling-priority-queue',
      description: `CPU Scheduling is a fundamental operating system function that decides which process runs next when the CPU becomes idle. While simple systems might use a standard Queue for First-Come, First-Served (FCFS) scheduling, modern systems use Priority Queues. In Priority Scheduling, jobs arrive at different times with assigned priorities, and the CPU always selects the highest-priority ready job to execute next.

The Priority Queue manages the "ready queue." When the CPU is free, it dequeues the job with the highest priority. If multiple jobs share the same highest priority, standard FIFO ordering (first arrived, first served) acts as a tiebreaker. This concept isn't limited to OS design; it is broadly used in network packet prioritization and event-driven simulations.

A Priority Queue can be implemented in several ways, each with trade-offs. An unordered array/list offers O(1) insertions but O(n) deletions (requires searching for the max). An ordered array/list requires O(n) insertions (to maintain sorted order) but provides O(1) deletions. Heaps (typically used in practice) offer O(log n) for both. Below, we demonstrate a simulation using an ordered array approach, ensuring that the highest priority job is always at the end of the array for an O(1) dequeue.`,
      keyPoints: [
        'CPU Scheduling uses Priority Queues to process critical tasks before less important ones.',
        'The highest-priority job in the ready queue is always selected for execution next.',
        'When priorities are equal, systems typically fall back to FIFO ordering to break ties.',
        'Priority Queues can be implemented using ordered/unordered lists or arrays, altering the time complexities for enqueue/dequeue.',
        'In an ordered array implementation (sorted by priority), dequeuing is an O(1) operation, but enqueuing takes O(n).'
      ],
      codeExamples: [
        {
          id: 'u2-t4-s4-ex1',
          title: 'CPU Scheduling Simulation (Ordered Array PQ)',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

// For this example: higher number = higher priority
typedef struct {
    int id;
    int priority;
    int arrival; // used for FIFO tiebreaking
} job_t;

typedef struct {
    job_t jobs[100];
    int size;
} pq_t;

void init_pq(pq_t *pq) { 
    pq->size = 0; 
}

// Enqueue maintaining order (highest priority at the end)
void enqueue(pq_t *pq, int id, int priority, int arrival) {
    int i = pq->size - 1;
    
    // Shift elements to the right to make space for the new job
    // We want the array sorted ascending by priority.
    // If priorities are equal, the job that arrived EARLIER should be dequeued FIRST.
    // Since we dequeue from the end, the earlier arrival needs to be placed after the later arrival.
    while (i >= 0) {
        if (pq->jobs[i].priority > priority) {
            pq->jobs[i+1] = pq->jobs[i];
            i--;
        } else if (pq->jobs[i].priority == priority && pq->jobs[i].arrival < arrival) {
            // Tiebreaker: keep earlier arrivals closer to the end (higher index)
            pq->jobs[i+1] = pq->jobs[i];
            i--;
        } else {
            break;
        }
    }
    
    pq->jobs[i+1].id = id;
    pq->jobs[i+1].priority = priority;
    pq->jobs[i+1].arrival = arrival;
    pq->size++;
}

job_t dequeue(pq_t *pq) {
    if (pq->size == 0) { 
        printf("Priority Queue empty\\n"); 
        exit(1); 
    }
    return pq->jobs[--(pq->size)]; // O(1) dequeue from the end
}

int main() {
    pq_t ready_queue;
    init_pq(&ready_queue);
    
    // Arrival sequence determines the 'arrival' tiebreaker
    enqueue(&ready_queue, 1, 3, 1); // Job 1: Prio 3, Arr 1
    enqueue(&ready_queue, 2, 1, 2); // Job 2: Prio 1, Arr 2
    enqueue(&ready_queue, 3, 4, 3); // Job 3: Prio 4, Arr 3
    enqueue(&ready_queue, 4, 2, 4); // Job 4: Prio 2, Arr 4
    enqueue(&ready_queue, 5, 3, 5); // Job 5: Prio 3, Arr 5
    
    printf("CPU Execution Order:\\n");
    while (ready_queue.size > 0) {
        job_t j = dequeue(&ready_queue);
        printf("Job %d (Priority: %d, Arrival: %d)\\n", j.id, j.priority, j.arrival);
    }
    return 0;
}`,
          explanation: 'This simulation uses an ordered array where jobs are inserted such that the highest priority elements sit at the end. The `dequeue` operation simply pops the last element in O(1) time. We also implement a tiebreaker for equal priorities based on arrival time.',
          expectedOutput: `CPU Execution Order:\nJob 3 (Priority: 4, Arrival: 3)\nJob 1 (Priority: 3, Arrival: 1)\nJob 5 (Priority: 3, Arrival: 5)\nJob 4 (Priority: 2, Arrival: 4)\nJob 2 (Priority: 1, Arrival: 2)`,
          lineBreakdown: [
            { lineNumber: 27, code: 'else if (pq->jobs[i].priority == priority && pq->jobs[i].arrival < arrival)', explanation: 'Handles the FIFO tiebreaker. Ensures jobs with the same priority that arrived earlier are pushed further to the right, so they are dequeued first.' },
            { lineNumber: 44, code: 'return pq->jobs[--(pq->size)];', explanation: 'Removes and returns the last element of the array in O(1) time, representing the CPU selecting the highest priority job.' }
          ],
          relatedTopicIds: ['u2-t3']
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t4-s4-cm1',
          title: 'Ignoring FIFO Tiebreaking',
          wrongCode: `while (i >= 0 && pq->jobs[i].priority > priority) {
    pq->jobs[i+1] = pq->jobs[i];
    i--;
}`,
          correctCode: `// Must also account for arrival time to maintain stable sorting`,
          explanation: 'If equal priorities are not handled with an arrival tiebreaker, jobs with the same priority might execute in Last-In-First-Out (LIFO) order depending on the sorting implementation, violating scheduling fairness.',
          consequence: 'Older jobs might starve while newer jobs of the same priority execute first.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t4-s4-ic1',
          title: 'Implementation Choice for Priority Queues',
          content: 'In interviews, you might be asked which underlying data structure is best for a Priority Queue. An Unordered Array has O(1) insert but O(N) dequeue. An Ordered Array has O(N) insert but O(1) dequeue. A Binary Heap provides O(log N) for both, making it the most balanced and common choice for production Priority Queues.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t4-s4-cp1',
          title: 'Evaluating Scheduling Logic',
          description: 'Test understanding of Priority Queues in scheduling.',
          criteria: [
            'Identify which job runs next given a set of priorities.',
            'Explain the FIFO tiebreaker mechanism.',
            'Contrast the time complexities of ordered vs unordered list implementations.'
          ],
          topicId: 'u2-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t4-s4-rc1',
          front: 'In CPU scheduling, what rule determines execution when two jobs have the exact same priority?',
          back: 'FIFO (First-In, First-Out). The job that arrived in the ready queue earlier is executed first.',
          topicId: 'u2-t4',
          tags: ['scheduling', 'priority queue']
        },
        {
          id: 'u2-t4-s4-rc2',
          front: 'If a Priority Queue is implemented using an Ordered Array, what is the time complexity of dequeuing?',
          back: 'O(1). Since the array is already sorted, the highest priority element is simply removed from the end of the array.',
          topicId: 'u2-t4',
          tags: ['complexity', 'priority queue']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t4-q1',
      type: 'predict-output',
      topicId: 'u2-t4',
      difficulty: 'intermediate',
      question: 'What happens to the head_ pointer when you call insert() twice on the provided circular list implementation?',
      code: `clist_t myclist; 
init_clist(&myclist);
insert(&myclist, 10);
insert(&myclist, 20);`,
      correctAnswer: 'The head_ pointer remains pointing to the node with key 10.',
      explanation: 'In this specific implementation, `insert` always places the new node *after* the head. The first insertion sets the head. Subsequent insertions just modify `head_->next_`, leaving the `head_` pointer itself anchored to the first node (10).',
      tags: ['clist', 'pointers']
    },
    {
      id: 'u2-t4-q2',
      type: 'mcq',
      topicId: 'u2-t4',
      difficulty: 'intermediate',
      question: 'In the Josephus problem with n=6 and k=3, what is the position of the last survivor?',
      options: ['1', '2', '4', '6'],
      correctAnswer: '1',
      explanation: 'Eliminations step by step: (start at 1) -> eliminate 3. Circle: 1,2,4,5,6. Count 3 from 4 -> eliminate 6. Circle: 1,2,4,5. Count 3 from 1 -> eliminate 4. Circle: 1,2,5. Count 3 from 5 -> eliminate 2. Circle: 1,5. Count 3 from 5 -> eliminate 5. Survivor is 1.',
      tags: ['josephus', 'tracing']
    },
    {
      id: 'u2-t4-q3',
      type: 'mcq',
      topicId: 'u2-t4',
      difficulty: 'beginner',
      question: 'Why is a circular linked list considered ideal for the Josephus Problem but not a regular singly linked list?',
      options: [
        'It requires less memory for pointers.',
        'It naturally wraps around from the last person back to the first without boundary checks.',
        'It allows O(1) deletion of any node.',
        'It automatically sorts the participants.'
      ],
      correctAnswer: 'It naturally wraps around from the last person back to the first without boundary checks.',
      explanation: 'The Josephus Problem operates in a circle. A standard singly linked list hits a NULL pointer at the end, requiring extra code to manually jump back to the head. A circular list does this implicitly.',
      tags: ['data structures', 'josephus']
    },
    {
      id: 'u2-t4-q4',
      type: 'true-false',
      topicId: 'u2-t4',
      difficulty: 'beginner',
      question: 'True or False: The `insert()` function in the provided `clist.c` program places the new node at the very end (tail) of the list.',
      correctAnswer: false,
      explanation: 'False. The provided `insert()` function is a specialized O(1) insert that places the new node immediately *after the head*, which is the second position in the list.',
      tags: ['clist']
    },
    {
      id: 'u2-t4-q5',
      type: 'spot-bug',
      topicId: 'u2-t4',
      difficulty: 'advanced',
      question: 'Spot the logical flaw in this Josephus elimination loop condition.',
      code: `node_t *curr = head;
while (curr != NULL) {
    // move k-1 steps
    // delete curr
}`,
      correctAnswer: 'The loop will run infinitely because a circular linked list never contains a NULL pointer.',
      explanation: 'In a circular linked list, `curr` will never be `NULL`. The correct termination condition for finding the last survivor is `while (curr->next_ != curr)`, which detects when only one node remains pointing to itself.',
      tags: ['josephus', 'debugging']
    },
    {
      id: 'u2-t4-q6',
      type: 'mcq',
      topicId: 'u2-t4',
      difficulty: 'intermediate',
      question: 'Which Priority Queue implementation offers O(1) dequeue operations for CPU scheduling?',
      options: [
        'Unordered Array',
        'Ordered Array',
        'Standard Queue',
        'Singly Linked List without sorting'
      ],
      correctAnswer: 'Ordered Array',
      explanation: 'An Ordered Array keeps the highest priority element at the end (or beginning), allowing it to be popped in O(1) time. Unordered structures require O(N) time to scan for the highest priority.',
      tags: ['scheduling', 'priority queue']
    },
    {
      id: 'u2-t4-q7',
      type: 'mcq',
      topicId: 'u2-t4',
      difficulty: 'beginner',
      question: 'In priority queue CPU scheduling, what principle handles jobs that have the exact same priority?',
      options: [
        'LIFO (Last-In, First-Out)',
        'SJF (Shortest Job First)',
        'FIFO (First-In, First-Out)',
        'Random Selection'
      ],
      correctAnswer: 'FIFO (First-In, First-Out)',
      explanation: 'When priorities are equal, a stable priority queue falls back to FIFO ordering based on the jobs\' arrival times.',
      tags: ['scheduling', 'theory']
    },
    {
      id: 'u2-t4-q8',
      type: 'fill-blank',
      topicId: 'u2-t4',
      difficulty: 'intermediate',
      question: 'When creating a self-loop for the first node in a circular list, the pointer assignment is: `temp->next_ = ___ ;`',
      correctAnswer: 'temp',
      explanation: 'To create a circular loop with only one node, the node\'s next pointer must point directly back to itself, hence `temp->next_ = temp;`.',
      tags: ['clist', 'pointers']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t4-p1',
      title: 'Implement the Josephus Problem',
      topicId: 'u2-t4',
      difficulty: 'intermediate',
      problemStatement: 'Write a C function `josephus(int n, int k)` that uses a circular linked list to simulate the Josephus problem. The function should build a circle of `n` people (numbered 1 to n), eliminate every `k`-th person, print the elimination order, and return the integer value of the final survivor.',
      constraints: [
        'n >= 1',
        'k >= 1'
      ],
      sampleInput: 'n = 5, k = 2',
      sampleOutput: `Eliminated: 2\nEliminated: 4\nEliminated: 1\nEliminated: 5\nSurvivor: 3`,
      hints: [
        'Don\'t forget to link the n-th node back to the 1st node to close the circle.',
        'Use a `prev` and `curr` pointer. Move them k-1 times to find the k-th node.',
        'Make sure to `free()` the memory of the eliminated nodes.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { 
    int key; 
    struct node *next; 
};

struct node* create(int k) {
    struct node *temp = malloc(sizeof(struct node));
    temp->key = k;
    temp->next = NULL;
    return temp;
}

int josephus(int n, int k) {
    if (n == 1) return 1;
    
    struct node *head = create(1);
    struct node *prev = head;
    
    for (int i = 2; i <= n; i++) {
        prev->next = create(i);
        prev = prev->next;
    }
    prev->next = head; // make circular
    
    struct node *curr = head;
    while (curr->next != curr) {
        // move k-1 times
        for (int i = 1; i < k; i++) {
            prev = curr;
            curr = curr->next;
        }
        
        prev->next = curr->next;
        printf("Eliminated: %d\\n", curr->key);
        
        struct node *temp = curr;
        curr = curr->next;
        free(temp);
    }
    
    int survivor = curr->key;
    free(curr);
    return survivor;
}

int main() {
    int s = josephus(5, 2);
    printf("Survivor: %d\\n", s);
    return 0;
}`,
      solutionExplanation: 'The circular linked list is constructed sequentially. To eliminate a node, we traverse `k-1` nodes. The `prev` pointer lets us bypass `curr`, maintaining the circle. The freed `curr` is then advanced to the next un-eliminated node.',
      dryRun: [
        { step: 1, line: 32, variables: { n: '5', k: '2', curr: '1', prev: '5' }, output: '', explanation: 'Initial circle constructed.' },
        { step: 2, line: 36, variables: { curr: '2', prev: '1' }, output: 'Eliminated: 2', explanation: 'Advanced 1 step. Node 2 deleted.' },
        { step: 3, line: 36, variables: { curr: '4', prev: '3' }, output: 'Eliminated: 4', explanation: 'Advanced 1 step. Node 4 deleted.' },
        { step: 4, line: 43, variables: { curr: '3' }, output: 'Survivor: 3', explanation: 'Loop terminates, node 3 points to itself.' }
      ],
      tags: ['josephus', 'linked list']
    },
    {
      id: 'u2-t4-p2',
      title: 'Simulate CPU Scheduling (Ordered PQ)',
      topicId: 'u2-t4',
      difficulty: 'advanced',
      problemStatement: 'Given a sequence of jobs with an ID, priority (higher integer = higher priority), and arrival time, write a C program that simulates a priority queue using an ordered array. Jobs should be executed in order of priority. If priorities tie, execute the one that arrived earlier (FIFO). Print the execution order.',
      constraints: [
        'Max 100 jobs',
        'Priority > 0'
      ],
      sampleInput: `Job 1: Prio 3, Arr 1\nJob 2: Prio 1, Arr 2\nJob 3: Prio 4, Arr 3`,
      sampleOutput: `Job 3 (Priority: 4)\nJob 1 (Priority: 3)\nJob 2 (Priority: 1)`,
      hints: [
        'Sort the array during insertion (enqueue).',
        'For O(1) dequeue, ensure the highest priority element is placed at the highest index.',
        'For ties, place the earlier arrival time at the higher index so it gets dequeued first.'
      ],
      solution: `#include <stdio.h>

typedef struct {
    int id;
    int priority;
    int arrival;
} job_t;

typedef struct {
    job_t jobs[100];
    int size;
} pq_t;

void enqueue(pq_t *pq, int id, int priority, int arrival) {
    int i = pq->size - 1;
    while (i >= 0) {
        if (pq->jobs[i].priority > priority) {
            pq->jobs[i+1] = pq->jobs[i];
            i--;
        } else if (pq->jobs[i].priority == priority && pq->jobs[i].arrival < arrival) {
            pq->jobs[i+1] = pq->jobs[i];
            i--;
        } else {
            break;
        }
    }
    pq->jobs[i+1].id = id;
    pq->jobs[i+1].priority = priority;
    pq->jobs[i+1].arrival = arrival;
    pq->size++;
}

job_t dequeue(pq_t *pq) {
    return pq->jobs[--(pq->size)];
}

int main() {
    pq_t q = { .size = 0 };
    enqueue(&q, 1, 3, 1);
    enqueue(&q, 2, 1, 2);
    enqueue(&q, 3, 4, 3);
    
    while(q.size > 0) {
        job_t j = dequeue(&q);
        printf("Job %d (Priority: %d)\\n", j.id, j.priority);
    }
    return 0;
}`,
      solutionExplanation: 'This ordered array approach pushes the lowest priority (and latest arrival among ties) to the front of the array (index 0). The highest priority job is pushed to the back. Dequeuing simply shrinks the size and returns the element at the back, giving O(1) performance.',
      dryRun: [
        { step: 1, line: 15, variables: { id: '1', size: '1' }, output: '', explanation: 'Job 1 inserted at index 0.' },
        { step: 2, line: 15, variables: { id: '2', size: '2' }, output: '', explanation: 'Job 2 has lower priority, placed at index 0, Job 1 shifted to index 1.' },
        { step: 3, line: 15, variables: { id: '3', size: '3' }, output: '', explanation: 'Job 3 has higher priority, inserted at index 2 without shifting.' },
        { step: 4, line: 40, variables: { 'q.size': '2' }, output: 'Job 3 (Priority: 4)', explanation: 'Popped index 2.' }
      ],
      tags: ['priority queue', 'scheduling']
    },
    {
      id: 'u2-t4-p3',
      title: 'Trace Insert-After-Head Circular List',
      topicId: 'u2-t4',
      difficulty: 'beginner',
      problemStatement: 'Using the specific Circular Linked List logic where `insert()` places the new node immediately AFTER the head, predict and print the output of the list after each insertion of the sequence: 10, 20, 30, 5.',
      constraints: [
        'Use the exact logic: temp->next = head->next; head->next = temp'
      ],
      sampleInput: 'Inserts: 10, 20, 30, 5',
      sampleOutput: `Circular List: 10 \nCircular List: 10 20 \nCircular List: 10 30 20 \nCircular List: 10 5 30 20 `,
      hints: [
        'The head pointer NEVER changes after the first insert.',
        'Every new node is placed exactly in the second slot.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key; struct node *next; };
struct clist { struct node *head; };

void insert(struct clist* ptr, int key) {
    struct node *temp = malloc(sizeof(struct node));
    temp->key = key;
    if (ptr->head == NULL) {
        temp->next = temp;
        ptr->head = temp;
    } else {
        temp->next = ptr->head->next;
        ptr->head->next = temp;
    }
}

void disp(struct clist* ptr) {
    if (ptr->head == NULL) return;
    struct node* temp = ptr->head;
    printf("Circular List: ");
    do {
        printf("%d ", temp->key);
        temp = temp->next;
    } while (temp != ptr->head);
    printf("\\n");
}

int main() {
    struct clist mylist = {NULL};
    insert(&mylist, 10); disp(&mylist);
    insert(&mylist, 20); disp(&mylist);
    insert(&mylist, 30); disp(&mylist);
    insert(&mylist, 5);  disp(&mylist);
    return 0;
}`,
      solutionExplanation: 'Because `insert()` places nodes right after the head, the order of elements inserted after the head becomes reversed. 20 is pushed down by 30, and 30 is pushed down by 5.',
      dryRun: [
        { step: 1, line: 33, variables: { key: '10' }, output: 'Circular List: 10', explanation: 'First node points to itself.' },
        { step: 2, line: 34, variables: { key: '20' }, output: 'Circular List: 10 20', explanation: '20 placed after 10.' },
        { step: 3, line: 35, variables: { key: '30' }, output: 'Circular List: 10 30 20', explanation: '30 placed after 10, pushing 20.' },
        { step: 4, line: 36, variables: { key: '5' }, output: 'Circular List: 10 5 30 20', explanation: '5 placed after 10, pushing 30.' }
      ],
      tags: ['clist', 'tracing']
    }
  ]
};
