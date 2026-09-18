import type { Topic } from '../../../../types';

export const queueUsingList: Topic = {
  id: 'u2-t1',
  unitId: 'unit-2',
  title: 'Queue using a Linked List',
  slug: 'queue-using-list',
  description: `A Queue is a linear data structure that operates on the First-In-First-Out (FIFO) principle. Elements are inserted at one end, called the "rear", and removed from the other end, called the "front". This is analogous to a real-world queue or line of people waiting for a service, or a printer queue where the first print job submitted is the first one printed.

When implementing a queue using an array, we face limitations such as a fixed maximum capacity (unless dynamically resized) and potential shifting of elements or modular arithmetic overhead. A linked list implementation elegantly solves these problems. By using nodes dynamically allocated on the heap, the queue can grow as large as the system memory permits.

In a linked list queue, we maintain two pointers: \`front_\` and \`rear_\`. The \`front_\` pointer points to the node containing the first element inserted, from which we will dequeue. The \`rear_\` pointer points to the last node inserted, where new elements will be enqueued. This structure allows both enqueue and dequeue operations to run in O(1) constant time, making it highly efficient.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t2'],
  estimatedMinutes: 55,
  subtopics: [
    {
      id: 'u2-t1-s1',
      title: 'Queue ADT: FIFO Concept & Interface',
      slug: 'queue-adt-concept',
      description: `The Abstract Data Type (ADT) of a queue defines the operations that can be performed on it, hiding the internal implementation details. A queue enforces a strict First-In-First-Out (FIFO) access pattern. New elements always join the back of the queue, while elements are always serviced from the front.

Think of a printer handling multiple print requests from different computers. The requests are queued up; the first request received is the first one to be printed. This ensures fairness and order. To support this, our ADT provides standard operations: \`enqueue\` to add an element, \`dequeue\` to remove an element, and functions to check the queue's state like \`is_empty\` and \`is_full\`. 

In our C implementation, we define this interface in a header file (\`queue.h\`). This header file acts as a contract between the queue implementation and the client code, exposing the structures and function prototypes necessary to interact with the queue without exposing how they are internally handled.`,
      keyPoints: [
        'A Queue strictly follows the First-In-First-Out (FIFO) principle.',
        'Enqueue adds an element to the rear of the queue.',
        'Dequeue removes and returns an element from the front of the queue.',
        'The ADT separates the interface (header file) from the implementation details.',
        'Real-world analogies include printer task scheduling and customer service lines.'
      ],
      codeExamples: [
        {
          id: 'u2-t1-s1-ex1',
          title: 'Queue Header File (queue.h)',
          code: `#ifndef queue_H
#define queue_H 

struct node
{
	int key_;
	struct node* next_;
};
typedef struct node node_t;

struct queue 
{
	node_t* front_;
	node_t* rear_;
};
typedef struct queue queue_t;

void init_queue(queue_t *ptr_queue);
void deinit_queue(queue_t *ptr_queue);
void enqueue(queue_t *ptr_queue, int key);
int dequeue(queue_t *ptr_queue);
int is_empty(queue_t *ptr_queue);
int is_full(queue_t *ptr_queue);

#endif`,
          language: 'c',
          explanation: 'The header file defines the `node_t` for the linked list and the `queue_t` wrapper structure containing `front_` and `rear_` pointers. It also declares the prototypes for all ADT operations.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 5, code: 'struct node', explanation: 'Defines the basic building block of the linked list.' },
            { lineNumber: 11, code: 'struct queue', explanation: 'The main queue structure that manages the linked list by keeping track of its ends.' },
            { lineNumber: 13, code: 'node_t* front_;', explanation: 'Pointer to the first element in the queue (from where we dequeue).' },
            { lineNumber: 14, code: 'node_t* rear_;', explanation: 'Pointer to the last element in the queue (where we enqueue).' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u2-t1-s1-ex2',
          title: 'Basic Queue Skeleton',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
	int key_;
	struct node* next_;
};
typedef struct node node_t;

struct queue {
	node_t* front_;
	node_t* rear_;
};
typedef struct queue queue_t;

int main() {
    queue_t q;
    q.front_ = NULL;
    q.rear_ = NULL;
    printf("Queue initialized with front and rear as NULL.\\n");
    return 0;
}`,
          language: 'c',
          explanation: 'A minimal compilable program demonstrating the structure definitions and initial manual setup before implementing the ADT functions.',
          expectedOutput: 'Queue initialized with front and rear as NULL.',
          lineBreakdown: [
            { lineNumber: 18, code: 'q.front_ = NULL;', explanation: 'An empty queue has no front element.' },
            { lineNumber: 19, code: 'q.rear_ = NULL;', explanation: 'An empty queue has no rear element either.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t1-s1-cm1',
          title: 'Missing header guards',
          wrongCode: `struct node {
    int key_;
    struct node* next_;
};`,
          correctCode: `#ifndef queue_H
#define queue_H
struct node {
    int key_;
    struct node* next_;
};
#endif`,
          explanation: 'Failing to include `#ifndef`, `#define`, and `#endif` in a header file can lead to multiple inclusion errors during compilation if the header is included in multiple C files.',
          consequence: 'The compiler will throw redefinition errors for the structures and typedefs.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t1-s1-ic1',
          title: 'Why use a wrapper structure?',
          content: 'Using a wrapper structure `queue_t` that contains both `front_` and `rear_` pointers instead of just passing a head pointer around allows functions to cleanly modify both the front and rear of the queue without needing double pointers (`node_t**`). It also conceptually groups the state of the queue together.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t1-s1-cp1',
          title: 'Header Definitions',
          description: 'Verify the understanding of the queue_t structure.',
          criteria: ['Understands that queue_t contains two pointers.', 'Knows that front_ is used for dequeue and rear_ is used for enqueue.'],
          topicId: 'u2-t1'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t1-s1-rc1',
          front: 'What does the wrapper structure `queue_t` contain in a linked list queue implementation?',
          back: 'It contains two pointers: `front_` (pointing to the head of the list for dequeue) and `rear_` (pointing to the tail of the list for enqueue).',
          topicId: 'u2-t1',
          tags: ['ADT', 'Structure']
        }
      ]
    },
    {
      id: 'u2-t1-s2',
      title: 'Node Structure & Design Rationale',
      slug: 'node-structure-design',
      description: `When designing a queue using a singly linked list, the direction of the pointers is a crucial design decision that affects time complexity. 

Consider "Design 1": The \`rear\` pointer points to the first node inserted (head of the list), and the \`front\` pointer points to the last node inserted (tail of the list). In this design, enqueuing is O(1) as we add to the tail. However, dequeuing requires removing from the tail. In a singly linked list, removing the tail requires traversing from the head to find the second-to-last node, making dequeue an O(n) operation.

Therefore, we use "Design 2": Each node points to the node that joined the queue later. The \`front_\` pointer points to the oldest node (head), and the \`rear_\` pointer points to the newest node (tail). With this design, dequeue removes the head node, which is O(1). Enqueue adds a node after the tail and updates the \`rear_\` pointer, which is also O(1). This design guarantees maximum efficiency for both core operations.`,
      keyPoints: [
        'Design choice dictates the time complexity of enqueue and dequeue operations.',
        'In Design 2, each node points to the node that joined the queue later.',
        'front_ points to the head of the linked list (first in).',
        'rear_ points to the tail of the linked list (last in).',
        'This specific arrangement ensures both enqueue and dequeue operate in O(1) constant time.'
      ],
      codeExamples: [
        {
          id: 'u2-t1-s2-ex1',
          title: 'Node Creation (create_node)',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
	int key_;
	struct node* next_;
};
typedef struct node node_t;

static node_t* create_node(int key)
{
	node_t* temp = (node_t*)malloc(sizeof(node_t));
	temp->key_ = key;
    temp->next_ = NULL;
	return temp;
}

int main() {
    node_t* myNode = create_node(42);
    printf("Node created with key: %d\\n", myNode->key_);
    free(myNode);
    return 0;
}`,
          language: 'c',
          explanation: 'The `create_node` function dynamically allocates memory for a new node on the heap, initializes its data, and prepares its `next_` pointer. Making it `static` means it is a helper function restricted to the implementation file.',
          expectedOutput: 'Node created with key: 42',
          lineBreakdown: [
            { lineNumber: 10, code: 'static node_t* create_node(int key)', explanation: 'Static function scoped only to this C file.' },
            { lineNumber: 12, code: 'node_t* temp = (node_t*)malloc(sizeof(node_t));', explanation: 'Allocates heap memory for one node.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u2-t1-s2-ex2',
          title: 'Design Simulation',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
	int key_;
	struct node* next_;
};
typedef struct node node_t;

struct queue {
	node_t* front_;
	node_t* rear_;
};
typedef struct queue queue_t;

int main() {
    queue_t q;
    node_t* n1 = (node_t*)malloc(sizeof(node_t)); n1->key_ = 10;
    node_t* n2 = (node_t*)malloc(sizeof(node_t)); n2->key_ = 20;
    n1->next_ = n2;
    n2->next_ = NULL;
    
    q.front_ = n1; // front points to oldest
    q.rear_ = n2;  // rear points to newest
    
    printf("Front: %d, Rear: %d\\n", q.front_->key_, q.rear_->key_);
    free(n1); free(n2);
    return 0;
}`,
          language: 'c',
          explanation: 'Demonstrates the structure of the queue in memory under "Design 2", where nodes point to those joining later, and front/rear point to the respective ends.',
          expectedOutput: 'Front: 10, Rear: 20',
          lineBreakdown: [
            { lineNumber: 21, code: 'n1->next_ = n2;', explanation: 'The older node (n1) points to the newer node (n2).' },
            { lineNumber: 24, code: 'q.front_ = n1;', explanation: 'front points to the oldest node.' },
            { lineNumber: 25, code: 'q.rear_ = n2;', explanation: 'rear points to the newest node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t1-s2-cm1',
          title: 'Incorrect node pointing direction',
          wrongCode: `// Attempting Design 1
n2->next_ = n1; // New node points to old node
q.front_ = n2;
q.rear_ = n1;`,
          correctCode: `// Design 2
n1->next_ = n2; // Old node points to new node
q.front_ = n1;
q.rear_ = n2;`,
          explanation: 'If new nodes point to older nodes, enqueuing is fast, but dequeuing requires traversing the entire list to find the element before the rear, taking O(n) time.',
          consequence: 'Performance degradation of the queue, losing the expected O(1) time complexity for dequeue.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t1-s2-ic1',
          title: 'Singly Linked List vs Doubly Linked List for Queues',
          content: 'A candidate might suggest using a Doubly Linked List to make "Design 1" work in O(1) time. While true (you can traverse backward), it requires extra memory for the `prev` pointer in every node. Design 2 achieves O(1) for both operations using only a Singly Linked List, making it more space-efficient.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t1-s2-cp1',
          title: 'Design Rationale',
          description: 'Ensure the student understands why nodes point in a specific direction.',
          criteria: ['Understands that removing from the tail of a singly linked list is O(n).', 'Recognizes that pointing from front to rear makes both operations O(1).'],
          topicId: 'u2-t1'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t1-s2-rc1',
          front: 'To make both enqueue and dequeue efficient (O(1)), the pointer of each node should point to which node?',
          back: 'The node which joined the queue later. This allows dequeue to remove from the head and enqueue to add at the tail efficiently.',
          topicId: 'u2-t1',
          tags: ['Design', 'Complexity']
        }
      ]
    },
    {
      id: 'u2-t1-s3',
      title: 'Init, Deinit & is_empty/is_full',
      slug: 'init-deinit-status',
      description: `Initializing the queue is a straightforward O(1) operation: we simply set both \`front_\` and \`rear_\` pointers to \`NULL\`, indicating an empty state. Similarly, checking if the queue is empty (\`is_empty\`) just requires checking if \`front_\` is \`NULL\`.

Checking if a linked list queue is full (\`is_full\`) is unique. Unlike arrays, linked lists have no fixed capacity limit other than available system memory. Therefore, we use a clever "test malloc" trick. We attempt to allocate memory for a dummy node. If \`malloc\` returns \`NULL\`, it means the system is out of memory, and the queue is functionally "full". If allocation succeeds, we immediately \`free\` the node and return false.

Deinitializing the queue (\`deinit_queue\`) requires more work than an array queue. Because every node was dynamically allocated, we must free every single node to prevent memory leaks. This is done using a \`while\` loop that repeatedly calls \`dequeue\` until the queue is empty. Thus, deinitialization operates in O(n) time.`,
      keyPoints: [
        'init_queue sets front_ and rear_ to NULL in O(1) time.',
        'is_empty checks if front_ is NULL in O(1) time.',
        'is_full uses a test malloc to check if system memory is exhausted.',
        'deinit_queue must traverse and free all nodes, making it an O(n) operation.',
        'Failing to deinitialize a linked list queue results in a memory leak.'
      ],
      codeExamples: [
        {
          id: 'u2-t1-s3-ex1',
          title: 'Init and Status Functions',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

void init_queue(queue_t *ptr_queue)
{
	ptr_queue->rear_ = ptr_queue->front_ = NULL;
}

int is_empty(queue_t *ptr_queue)
{
	return ptr_queue->front_ == NULL;
}

int is_full(queue_t *ptr_queue)
{
    node_t* temp;
	temp = (node_t*)malloc(sizeof(node_t));
    if (temp == NULL) {
        return 1; 
    }
    free(temp);   
    return 0;
}

int main() {
    queue_t q;
    init_queue(&q);
    printf("Is empty? %d\\n", is_empty(&q));
    printf("Is full? %d\\n", is_full(&q));
    return 0;
}`,
          language: 'c',
          explanation: 'Demonstrates the initialization and status checking functions. Notice the test malloc trick in `is_full`.',
          expectedOutput: `Is empty? 1\nIs full? 0`,
          lineBreakdown: [
            { lineNumber: 11, code: 'ptr_queue->rear_ = ptr_queue->front_ = NULL;', explanation: 'Sets both pointers to NULL simultaneously.' },
            { lineNumber: 21, code: 'temp = (node_t*)malloc(sizeof(node_t));', explanation: 'Attempts to allocate a test node.' },
            { lineNumber: 22, code: 'if (temp == NULL)', explanation: 'If malloc fails, system is out of memory, queue is "full".' },
            { lineNumber: 25, code: 'free(temp);', explanation: 'Memory is available, so free the test node immediately to avoid a leak.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u2-t1-s3-ex2',
          title: 'Deinitialization (deinit_queue)',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

int is_empty(queue_t *ptr_queue) { return ptr_queue->front_ == NULL; }

// Dummy dequeue for demonstration
int dequeue(queue_t *ptr_queue) {
    if(!is_empty(ptr_queue)) {
        node_t* temp = ptr_queue->front_;
        ptr_queue->front_ = temp->next_;
        free(temp);
        return 1;
    }
    return 0;
}

void deinit_queue(queue_t *ptr_queue)
{
	while(! is_empty(ptr_queue))
	{
		dequeue(ptr_queue);
	}
	ptr_queue->rear_ = ptr_queue->front_ = NULL;
}

int main() {
    queue_t q;
    q.front_ = (node_t*)malloc(sizeof(node_t));
    q.front_->next_ = NULL;
    q.rear_ = q.front_; // Queue with 1 element
    
    printf("Queue empty before deinit? %d\\n", is_empty(&q));
    deinit_queue(&q);
    printf("Queue empty after deinit? %d\\n", is_empty(&q));
    return 0;
}`,
          language: 'c',
          explanation: 'The `deinit_queue` function leverages the `is_empty` and `dequeue` functions to safely free all nodes in the queue, regardless of how many elements are present.',
          expectedOutput: `Queue empty before deinit? 0\nQueue empty after deinit? 1`,
          lineBreakdown: [
            { lineNumber: 24, code: 'while(! is_empty(ptr_queue))', explanation: 'Loops as long as there are elements.' },
            { lineNumber: 26, code: 'dequeue(ptr_queue);', explanation: 'Removes the front element and frees its memory.' },
            { lineNumber: 28, code: 'ptr_queue->rear_ = ptr_queue->front_ = NULL;', explanation: 'Ensures pointers are reset after deinitialization.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t1-s3-cm1',
          title: 'Forgetting to free in is_full',
          wrongCode: `int is_full(queue_t *ptr_queue) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    if (temp == NULL) return 1;
    return 0; // memory leak!
}`,
          correctCode: `int is_full(queue_t *ptr_queue) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    if (temp == NULL) return 1;
    free(temp);
    return 0;
}`,
          explanation: 'If you use the test malloc trick but forget to call `free` on success, every call to `is_full` will leak memory, eventually causing the queue to actually become full.',
          consequence: 'Severe memory leak in the program.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t1-s3-ic1',
          title: 'Deinitialization Complexity',
          content: 'In interviews, clearly state why deinitializing an array queue is O(1) (just change top/rear index), while deinitializing a linked list queue is O(n). The interviewer is looking for your understanding of memory management and heap allocations.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t1-s3-cp1',
          title: 'Test Malloc',
          description: 'Identify the unique trick used in linked list queues.',
          criteria: ['Understands that linked lists do not have fixed capacities.', 'Can explain how allocating and freeing a dummy node checks system memory.'],
          topicId: 'u2-t1'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t1-s3-rc1',
          front: 'What is the time complexity to deinitialize a queue implemented with a linked list?',
          back: 'O(n). It requires a loop where the number of operations is proportional to the number of elements in the queue, because every node must be individually freed.',
          topicId: 'u2-t1',
          tags: ['Deinit', 'Complexity']
        }
      ]
    },
    {
      id: 'u2-t1-s4',
      title: 'Enqueue & Dequeue Implementation',
      slug: 'enqueue-dequeue',
      description: `The \`enqueue\` operation handles adding a node to the \`rear_\` of the queue. We first create the node. The crucial step is checking if the queue is empty (\`ptr_queue->rear_ == NULL\`). If it is, the new node becomes BOTH the \`front_\` and the \`rear_\`. If it isn't empty, we link the old rear to the new node and then update the \`rear_\` pointer.

The \`dequeue\` operation removes a node from the \`front_\` of the queue. We extract the key, move the \`front_\` pointer to the next node, and then \`free\` the original front node. We must handle a special case here as well: if removing the node made the queue empty (\`ptr_queue->front_ == NULL\`), we must also explicitly set the \`rear_\` pointer to \`NULL\`.

Both operations require careful pointer surgery to ensure the list remains contiguous and both \`front_\` and \`rear_\` accurately reflect the state of the list at all times. Specifically, both \`head\` and \`tail\` (front and rear) pointers can change simultaneously during enqueue (into an empty queue) and dequeue (of the last element).`,
      keyPoints: [
        'Enqueue creates a node and attaches it after rear_, updating rear_.',
        'Dequeue extracts data from front_, updates front_ to front_->next, and frees the old front_.',
        'Enqueueing into an empty queue requires updating both front_ and rear_.',
        'Dequeueing the last element requires updating rear_ to NULL.',
        'Proper memory freeing in dequeue is critical to prevent leaks.'
      ],
      codeExamples: [
        {
          id: 'u2-t1-s4-ex1',
          title: 'Enqueue Function',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

int is_full(queue_t *ptr_queue) { return 0; }
static node_t* create_node(int key) {
	node_t* temp = (node_t*)malloc(sizeof(node_t));
	temp->key_ = key; temp->next_ = NULL;
	return temp;
}

void enqueue(queue_t *ptr_queue, int key)
{
	if(! is_full(ptr_queue))
	{
		node_t* temp = create_node(key);
		temp->next_ = NULL;
		if(ptr_queue->rear_ == NULL)
		{
			ptr_queue->front_ = temp;
		}
		else 
		{
			ptr_queue->rear_->next_ = temp;
		}
		ptr_queue->rear_ = temp;
	}	
	else 
	{
		printf("queue full; cannot push\\n");
	}
}

int main() {
    queue_t q; q.front_ = q.rear_ = NULL;
    enqueue(&q, 100);
    printf("Front: %d, Rear: %d\\n", q.front_->key_, q.rear_->key_);
    enqueue(&q, 200);
    printf("Front: %d, Rear: %d\\n", q.front_->key_, q.rear_->key_);
    return 0;
}`,
          language: 'c',
          explanation: 'Demonstrates the `enqueue` logic. Pay attention to how it handles the empty queue as a special case where `front_` is assigned.',
          expectedOutput: `Front: 100, Rear: 100\nFront: 100, Rear: 200`,
          lineBreakdown: [
            { lineNumber: 22, code: 'if(ptr_queue->rear_ == NULL)', explanation: 'Special case: the queue is completely empty.' },
            { lineNumber: 24, code: 'ptr_queue->front_ = temp;', explanation: 'Because it was empty, the front pointer must also point to this first node.' },
            { lineNumber: 28, code: 'ptr_queue->rear_->next_ = temp;', explanation: 'Normal case: append the new node after the existing rear node.' },
            { lineNumber: 30, code: 'ptr_queue->rear_ = temp;', explanation: 'Update rear to point to the newly added node.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u2-t1-s4-ex2',
          title: 'Dequeue Function',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

int is_empty(queue_t *ptr_queue) { return ptr_queue->front_ == NULL; }

int dequeue(queue_t *ptr_queue)
{
	if(! is_empty(ptr_queue))
	{
		int key;  node_t* temp = ptr_queue->front_;
		key = temp->key_;
		
		ptr_queue->front_ = temp->next_;
		if(ptr_queue->front_ == NULL)
		{
			ptr_queue->rear_ = NULL;
		}
		free(temp);
		return key;
	}
	else 
	{
		printf("queue empty; cannot pop\\n");
		return '\\0';
	}
}

int main() {
    queue_t q; 
    node_t* n = (node_t*)malloc(sizeof(node_t)); n->key_ = 50; n->next_ = NULL;
    q.front_ = q.rear_ = n; // Queue with 1 item
    
    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Is empty now? %d\\n", is_empty(&q));
    return 0;
}`,
          language: 'c',
          explanation: 'Demonstrates the `dequeue` logic. Observe the explicit handling of `rear_` when the last element is removed.',
          expectedOutput: `Dequeued: 50\nIs empty now? 1`,
          lineBreakdown: [
            { lineNumber: 18, code: 'ptr_queue->front_ = temp->next_;', explanation: 'Advance the front pointer to the next element.' },
            { lineNumber: 19, code: 'if(ptr_queue->front_ == NULL)', explanation: 'Check if removing the element emptied the queue.' },
            { lineNumber: 21, code: 'ptr_queue->rear_ = NULL;', explanation: 'If it did, rear must also be set to NULL.' },
            { lineNumber: 23, code: 'free(temp);', explanation: 'Free the dynamically allocated node to prevent memory leaks.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t1-s4-cm1',
          title: 'Failing to reset rear on empty',
          wrongCode: `int dequeue(queue_t *ptr_queue) {
    node_t* temp = ptr_queue->front_;
    int key = temp->key_;
    ptr_queue->front_ = temp->next_;
    free(temp);
    return key;
}`,
          correctCode: `int dequeue(queue_t *ptr_queue) {
    node_t* temp = ptr_queue->front_;
    int key = temp->key_;
    ptr_queue->front_ = temp->next_;
    if(ptr_queue->front_ == NULL) {
        ptr_queue->rear_ = NULL;
    }
    free(temp);
    return key;
}`,
          explanation: 'If you dequeue the last element and `front_` becomes NULL, but you forget to set `rear_` to NULL, `rear_` becomes a dangling pointer pointing to freed memory. The next `enqueue` operation will crash when trying to access `ptr_queue->rear_->next_`.',
          consequence: 'Dangling pointer leading to Segmentation Fault on the next enqueue.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t1-s4-ic1',
          title: 'Empty condition edge cases',
          content: 'Interviewers often look specifically for how you handle boundary cases. In queue implementations, the boundaries are inserting into an empty queue (head and tail both change) and deleting the last element (head and tail both change). Always double-check logic when queue length is 0 or 1.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t1-s4-cp1',
          title: 'Pointer Updates',
          description: 'Identify which pointers change during different operations.',
          criteria: ['Understands enqueueing the first element changes both front and rear.', 'Understands dequeueing the last element changes both front and rear.'],
          topicId: 'u2-t1'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t1-s4-rc1',
          front: 'On dequeue, which pointer(s) change?',
          back: 'Usually just the front pointer changes. However, if the last element is removed, BOTH front and rear pointers change (front becomes next which is NULL, and rear must explicitly be set to NULL).',
          topicId: 'u2-t1',
          tags: ['Dequeue', 'Pointers']
        }
      ]
    },
    {
      id: 'u2-t1-s5',
      title: 'Client Usage & Complete Program',
      slug: 'client-usage',
      description: `To utilize our queue ADT, we write a client program (\`client.c\`). This program includes the \`queue.h\` header file but does not include \`queue.c\`. It only knows about the structures and function prototypes exposed by the header.

The client initializes the queue, provides a menu-driven interface to perform enqueue and dequeue operations based on user input, and importantly, ensures the queue is deinitialized before the program exits. This guarantees that all dynamically allocated memory is cleanly released back to the operating system.

When compiling, we link the client program and the implementation file together (e.g., \`gcc client.c queue.c\`). This separation of concerns allows the queue implementation to be modified or optimized without changing a single line of the client code, as long as the interface remains identical.`,
      keyPoints: [
        'Client code interacts with the queue only through the functions defined in the header.',
        'A queue instance must be declared and explicitly initialized using init_queue.',
        'A menu-driven loop (using switch-case) is a common pattern to test data structures.',
        'Deinitialization must be called before the program terminates.',
        'The complete program consists of header, implementation, and client files compiled together.'
      ],
      codeExamples: [
        {
          id: 'u2-t1-s5-ex1',
          title: 'Client Program (client.c)',
          code: `#include <stdio.h>
#include "queue.h" 

int main()
{
	queue_t q;
	init_queue(&q);
	int opt;
	int val;
	printf("opt : 1 : enqueue; 2 : dequeue ; 0 : quit\\n");
	scanf("%d", &opt);
	while(opt)
	{
		switch(opt)
		{
			case 1 : scanf("%d", &val);
					 enqueue(&q, val);
					 break;
			case 2 : val = dequeue(&q);
					 if(val != '\\0')
						 printf("dequeue %d\\n", val);
					 break;
		}
		printf("opt : 1 : enqueue; 2 : dequeue ; 0 : quit\\n");
		scanf("%d", &opt);
	}
	deinit_queue(&q);
}`,
          language: 'c',
          explanation: 'The client program drives the queue. It allocates the `queue_t` object on the stack and passes its address to the ADT functions.',
          expectedOutput: '', 
          lineBreakdown: [
            { lineNumber: 2, code: '#include "queue.h"', explanation: 'Includes the header to access the queue interface.' },
            { lineNumber: 6, code: 'queue_t q;', explanation: 'Allocates the queue structure on the stack.' },
            { lineNumber: 7, code: 'init_queue(&q);', explanation: 'Initializes the pointers inside the queue.' },
            { lineNumber: 28, code: 'deinit_queue(&q);', explanation: 'Cleans up memory before exiting.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u2-t1-s5-ex2',
          title: 'Supporting Different Types',
          code: `#include <stdio.h>
#include <stdlib.h>

// If we wanted to support floats instead of ints:
struct node {
	float key_; // Changed from int
	struct node* next_;
};
typedef struct node node_t;

struct queue {
	node_t* front_;
	node_t* rear_;
};
typedef struct queue queue_t;

int main() {
    printf("To support a different type of component, the type of key_ should change.\\n");
    return 0;
}`,
          language: 'c',
          explanation: 'In C, to make the queue hold a different data type (like a float, string, or complex struct), we must physically change the type of the `key_` field in the node structure.',
          expectedOutput: 'To support a different type of component, the type of key_ should change.',
          lineBreakdown: [
            { lineNumber: 6, code: 'float key_;', explanation: 'Changing the data payload type of the node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t1-s5-cm1',
          title: 'Forgetting to pass by address',
          wrongCode: `queue_t q;
init_queue(q); // Error!
enqueue(q, 10); // Error!`,
          correctCode: `queue_t q;
init_queue(&q); // Pass address
enqueue(&q, 10); // Pass address`,
          explanation: 'The ADT functions expect a pointer to `queue_t` (`queue_t*`). Passing the struct by value prevents the functions from modifying the actual queue structure and causes compilation errors.',
          consequence: 'Compilation errors due to type mismatch, or failure to update the queue pointers if somehow forced to compile.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t1-s5-ic1',
          title: 'Generics in C',
          content: 'An interviewer might ask how to make this queue generic in C (since C lacks templates). You would explain using `void*` for the data pointer, allowing the queue to store pointers to any data type, while the client code handles type casting.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t1-s5-cp1',
          title: 'Memory Cleanup',
          description: 'Identify the crucial final step in the client program.',
          criteria: ['Understands that deinit_queue must be called.', 'Recognizes that this prevents memory leaks when the program finishes.'],
          topicId: 'u2-t1'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t1-s5-rc1',
          front: 'To support a different type of component in the queue (e.g., char instead of int), what must be changed?',
          back: 'The data type of the `key_` variable inside the `node` structure must change.',
          topicId: 'u2-t1',
          tags: ['ADT', 'Types']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t1-q99',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'In a linked list queue, what happens when a dequeue operation makes the queue empty?',
      options: ['Only the front pointer becomes NULL', 'Only the rear pointer becomes NULL', 'Both front and rear pointers must be updated to NULL', 'Neither pointer is updated'],
      correctAnswer: 'Both front and rear pointers must be updated to NULL',
      explanation: 'When the last element is dequeued, front naturally becomes NULL, but rear must also be manually set to NULL to prevent a dangling pointer.',
      tags: ['pointers', 'boundary-case']
    },
    {
      id: 'u2-t1-q1',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'On dequeue, which pointer changes?',
      options: [
        'Only the head pointer changes',
        'Only the tail pointer changes',
        'Both head and tail could change',
        'Neither pointer changes'
      ],
      correctAnswer: 'Both head and tail could change',
      explanation: 'Normally just the head pointer changes. However, if you are dequeuing the very last element in the queue, both the head and tail pointers change (tail is set to NULL).',
      tags: ['Dequeue', 'Pointers']
    },
    {
      id: 'u2-t1-q2',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'To make both enqueue and dequeue efficient (O(1)), the pointer of each node will point to:',
      options: [
        'the node which joined the queue earlier',
        'the node which joined the queue later',
        'the rear of the queue',
        'NULL in all cases'
      ],
      correctAnswer: 'the node which joined the queue later',
      explanation: 'By having each node point to the node that joined later, dequeue removes the head (O(1)) and enqueue appends to the tail (O(1)).',
      tags: ['Design', 'Complexity']
    },
    {
      id: 'u2-t1-q3',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'Enqueue operation will change:',
      options: [
        'Only the head pointer',
        'Only the tail pointer',
        'Could change both the head and the tail',
        'Will change the size of the array'
      ],
      correctAnswer: 'Could change both the head and the tail',
      explanation: 'When enqueueing into an empty queue, the new node becomes both the front and the rear, meaning both pointers change.',
      tags: ['Enqueue', 'Pointers']
    },
    {
      id: 'u2-t1-q4',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      question: 'If both front and rear are equal (in a linked list queue):',
      options: [
        'Implies the queue is completely full',
        'Implies either an empty queue or one node queue',
        'Implies a minimum of two nodes',
        'This state is impossible'
      ],
      correctAnswer: 'Implies either an empty queue or one node queue',
      explanation: 'If front and rear are both NULL, the queue is empty. If they both point to the same valid memory address, there is exactly one node in the queue.',
      tags: ['Status', 'Pointers']
    },
    {
      id: 'u2-t1-q5',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'Deinitialize the queue:',
      options: [
        'Is an O(1) operation',
        'Requires number of operations as the number of components in the queue',
        'Can be done by just setting front and rear to NULL',
        'Frees only the wrapper structure'
      ],
      correctAnswer: 'Requires number of operations as the number of components in the queue',
      explanation: 'Every node was dynamically allocated, so every node must be explicitly freed in a loop, making it O(n).',
      tags: ['Deinit', 'Complexity']
    },
    {
      id: 'u2-t1-q6',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      question: 'To support a different type of component in the queue:',
      options: [
        'The name of the structure should change',
        'The type of key should change',
        'The next pointer should change type',
        'The entire logic must be rewritten'
      ],
      correctAnswer: 'The type of key should change',
      explanation: 'Only the data payload (`key_`) needs its type changed to store different components like floats or strings.',
      tags: ['Types', 'ADT']
    },
    {
      id: 'u2-t1-q7',
      type: 'true-false',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      question: 'A linked list queue has a fixed maximum capacity.',
      correctAnswer: false,
      explanation: 'Unlike arrays, linked lists can dynamically grow as long as there is available system memory on the heap.',
      tags: ['Capacity']
    },
    {
      id: 'u2-t1-q8',
      type: 'fill-blank',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'To check if memory is exhausted in `is_full`, we temporarily allocate a dummy node using `______`.',
      correctAnswer: 'malloc',
      explanation: 'malloc is used to allocate memory on the heap. If it returns NULL, the system is out of memory.',
      tags: ['Memory', 'is_full']
    },
    {
      id: 'u2-t1-q9',
      type: 'predict-output',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'What happens when this code is executed?',
      code: `queue_t q;
init_queue(&q);
enqueue(&q, 5);
dequeue(&q);
dequeue(&q);`,
      correctAnswer: 'queue empty; cannot pop',
      explanation: 'The second dequeue operation tries to pop from an empty queue, triggering the underflow check and printing the error message.',
      tags: ['Dequeue', 'Underflow']
    },
    {
      id: 'u2-t1-q10',
      type: 'spot-bug',
      topicId: 'u2-t1',
      difficulty: 'advanced',
      question: 'Find the bug in this enqueue implementation.',
      code: `void enqueue(queue_t *q, int key) {
    node_t* temp = create_node(key);
    temp->next_ = NULL;
    q->rear_->next_ = temp;
    q->rear_ = temp;
}`,
      correctAnswer: 'Does not handle the empty queue case',
      explanation: 'If the queue is empty, `q->rear_` is NULL, so `q->rear_->next_` will cause a Segmentation Fault. It misses the `if(q->rear_ == NULL)` check.',
      tags: ['Enqueue', 'Bug']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t1-p1',
      title: 'String Queue',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      problemStatement: 'Modify the standard linked list queue structure to store strings (up to 50 characters) instead of integers. Write the struct definitions and the modified `enqueue` function.',
      constraints: ['Strings have a maximum length of 50 characters.', 'Include `<string.h>` for string copying.'],
      sampleInput: 'enqueue("Hello")',
      sampleOutput: 'Queue front points to node with "Hello"',
      hints: ['Change `int key_;` to `char key_[50];` in the node structure.', 'Use `strcpy` to assign the string to the node in `enqueue`.'],
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct node {
    char key_[50];
    struct node* next_;
};
typedef struct node node_t;

struct queue {
    node_t* front_;
    node_t* rear_;
};
typedef struct queue queue_t;

void enqueue(queue_t *ptr_queue, char* str) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    strcpy(temp->key_, str);
    temp->next_ = NULL;
    
    if(ptr_queue->rear_ == NULL) {
        ptr_queue->front_ = temp;
    } else {
        ptr_queue->rear_->next_ = temp;
    }
    ptr_queue->rear_ = temp;
}`,
      solutionExplanation: 'We changed the data type of `key_` to a character array. Since arrays cannot be directly assigned in C, we use `strcpy` inside the enqueue function to copy the string data into the newly allocated node.',
      dryRun: [
        { step: 1, line: 19, variables: { str: '"Hello"' }, output: '', explanation: 'Allocate new node.' },
        { step: 2, line: 20, variables: { temp_key: '"Hello"' }, output: '', explanation: 'Copy string into node.' },
        { step: 3, line: 24, variables: {}, output: '', explanation: 'Queue was empty, set front to temp.' }
      ],
      tags: ['Types', 'Strings']
    },
    {
      id: 'u2-t1-p2',
      title: 'Implement Peek',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      problemStatement: 'Implement a `peek` function for the linked list queue. The function should return the value of the front element without removing it from the queue. If the queue is empty, print "Queue empty" and return -1.',
      constraints: ['Do not modify the `front_` or `rear_` pointers.', 'Time complexity must be O(1).'],
      sampleInput: 'enqueue(10), enqueue(20), peek()',
      sampleOutput: '10',
      hints: ['Check if the queue is empty first.', 'Simply return the `key_` of the `front_` node without calling `free`.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

int is_empty(queue_t *ptr_queue) {
    return ptr_queue->front_ == NULL;
}

int peek(queue_t *ptr_queue) {
    if(!is_empty(ptr_queue)) {
        return ptr_queue->front_->key_;
    } else {
        printf("Queue empty\\n");
        return -1;
    }
}`,
      solutionExplanation: 'Peek is simply looking at the data in the front node. It is identical to the beginning of the dequeue function, but it halts before moving the front pointer or freeing any memory.',
      dryRun: [
        { step: 1, line: 15, variables: { front_val: '10' }, output: '', explanation: 'Check if empty. It is not.' },
        { step: 2, line: 16, variables: { return_val: '10' }, output: '', explanation: 'Return the key of the front node.' }
      ],
      tags: ['Peek', 'Operations']
    },
    {
      id: 'u2-t1-p3',
      title: 'Calculate Queue Length',
      topicId: 'u2-t1',
      difficulty: 'advanced',
      problemStatement: 'Write a function `get_length(queue_t* ptr_queue)` that returns the number of elements currently in the linked list queue. Can you analyze its time complexity?',
      constraints: ['Do not modify the queue structure to add a size counter.', 'Iterate through the list to count nodes.'],
      sampleInput: 'Queue contains [10, 20, 30]',
      sampleOutput: '3',
      hints: ['Use a temporary pointer to traverse starting from `front_`.', 'Loop until the temporary pointer reaches `NULL`.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* next_; };
typedef struct node node_t;
struct queue { node_t* front_; node_t* rear_; };
typedef struct queue queue_t;

int get_length(queue_t *ptr_queue) {
    int count = 0;
    node_t* current = ptr_queue->front_;
    
    while(current != NULL) {
        count++;
        current = current->next_;
    }
    
    return count;
}`,
      solutionExplanation: 'Because the queue wrapper does not maintain a running size count, finding the length requires traversing the entire linked list from `front_` to the end (NULL). Therefore, this operation takes O(n) time.',
      dryRun: [
        { step: 1, line: 10, variables: { count: '0' }, output: '', explanation: 'Initialize count.' },
        { step: 2, line: 11, variables: { current: 'Node(10)' }, output: '', explanation: 'Start at front.' },
        { step: 3, line: 13, variables: { count: '1', current: 'Node(20)' }, output: '', explanation: 'First iteration.' },
        { step: 4, line: 13, variables: { count: '2', current: 'Node(30)' }, output: '', explanation: 'Second iteration.' },
        { step: 5, line: 13, variables: { count: '3', current: 'NULL' }, output: '', explanation: 'Third iteration. Loop ends.' }
      ],
      tags: ['Traversal', 'Complexity']
    }
  ]
};
