import type { Topic } from '../../../../types';

export const dequeStackDll: Topic = {
  id: 'u2-t5',
  unitId: 'unit-2',
  title: 'Deque and Stack via DLL Composition',
  slug: 'deque-stack-dll',
  description: 'A Deque (Double-Ended Queue) is a generalized queue that allows insertion and deletion at both ends. Because a Doubly Linked List (DLL) maintains pointers to both the head and the tail and allows traversal in both directions, it naturally models a Deque with O(1) time complexity for all fundamental operations.\n\nBeyond just implementing a Deque, this topic explores the powerful software design principle of Composition (also known as layering, embedding, or containment). Instead of writing a Stack or Queue from scratch, we can build them by embedding a DLL structure inside them and delegating the operations. For instance, a Stack push simply calls the DLL\'s insert-front function.\n\nBy mastering composition, you write less code, reuse thoroughly tested components, and understand how higher-level Abstract Data Types are cleanly mapped onto lower-level concrete data structures in modern software engineering.',
  difficulty: 'advanced',
  prerequisites: ['u1-t3', 'u1-t6', 'u2-t1'],
  estimatedMinutes: 50,
  subtopics: [
    {
      id: 'u2-t5-s1',
      title: 'Deque ADT',
      slug: 'deque-adt',
      description: 'The Deque (pronounced "deck") is an Abstract Data Type that generalizes both the Stack and the Queue. It supports four primary operations: inserting at the front, inserting at the rear, deleting from the front, and deleting from the rear.\n\nBecause a Deque requires fast operations at both ends, an array-based implementation often requires shifting elements or using a complex circular buffer. However, a Doubly Linked List (DLL) is the perfect concrete data structure for a Deque. By maintaining a head and a tail pointer, a DLL can perform all four Deque operations in strict O(1) time, without any memory shifting or capacity limits.\n\nUnderstanding the Deque is crucial because it can be restricted to behave as a Stack (by only using front operations) or as a Queue (by inserting at the rear and deleting at the front).',
      keyPoints: [
        'Deque stands for Double-Ended Queue.',
        'It supports four main operations: insertFront, insertRear, deleteFront, and deleteRear.',
        'A Doubly Linked List (DLL) is the ideal data structure to implement a Deque.',
        'All four Deque operations can be performed in O(1) time using a DLL.',
        'A Deque can simulate a Stack by restricting operations to one end.',
        'A Deque can simulate a Queue by restricting insertions to one end and deletions to the other.'
      ],
      codeExamples: [
        {
          id: 'u2-t5-s1-ex1',
          title: 'Deque Operations Concept',
          code: `#include <stdio.h>
#include <stdlib.h>

// A conceptual representation of Deque operations using a simple array for demonstration.
// In practice, DLL is preferred for O(1) operations.
#define MAX 5
int deque[MAX];
int front = -1, rear = -1;

void insertFront(int key) {
    if ((front == 0 && rear == MAX - 1) || (front == rear + 1)) {
        printf("Deque Overflow\\n");
        return;
    }
    if (front == -1) {
        front = 0;
        rear = 0;
    } else if (front == 0) {
        front = MAX - 1;
    } else {
        front = front - 1;
    }
    deque[front] = key;
    printf("Inserted %d at front\\n", key);
}

void insertRear(int key) {
    if ((front == 0 && rear == MAX - 1) || (front == rear + 1)) {
        printf("Deque Overflow\\n");
        return;
    }
    if (front == -1) {
        front = 0;
        rear = 0;
    } else if (rear == MAX - 1) {
        rear = 0;
    } else {
        rear = rear + 1;
    }
    deque[rear] = key;
    printf("Inserted %d at rear\\n", key);
}

int main() {
    insertRear(10);
    insertRear(20);
    insertFront(30);
    return 0;
}`,
          language: 'c',
          explanation: 'This code demonstrates the conceptual logic of a Deque using a circular array. While it works, handling the wrap-around logic for both front and rear is error-prone. This motivates the use of a Doubly Linked List for a cleaner Deque implementation.',
          expectedOutput: 'Inserted 10 at rear\nInserted 20 at rear\nInserted 30 at front',
          lineBreakdown: [
            { lineNumber: 10, code: 'if ((front == 0 && rear == MAX - 1) || (front == rear + 1))', explanation: 'Condition to check if the circular array-based deque is full.' },
            { lineNumber: 27, code: 'if (front == -1)', explanation: 'Initialization of both front and rear when inserting the first element.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t5-s1-cm1',
          title: 'Array Shifting for Deque',
          wrongCode: `void insertFront(int arr[], int *n, int key) {
    for (int i = *n; i > 0; i--) {
        arr[i] = arr[i - 1]; // O(N) shift
    }
    arr[0] = key;
    (*n)++;
}`,
          correctCode: `// Use a DLL or Circular Array to achieve O(1)
void add_in_begin(dll_t* ptr_dlist, int key) {
    // DLL insertion logic in O(1)
}`,
          explanation: 'Using a standard linear array for a Deque is a bad design because inserting or deleting at the front requires shifting all existing elements, turning an expected O(1) operation into an O(N) operation.',
          consequence: 'Severe performance degradation when the Deque scales to thousands of elements.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t5-s1-ic1',
          title: 'Deque vs Queue vs Stack',
          content: 'Interviewers often ask to implement a Queue using Stacks, or a Stack using Queues. Knowing that a Deque generalizes both can help you quickly prototype or explain the upper bounds of linear data structure operations.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t5-s1-cp1',
          title: 'Deque Fundamentals',
          description: 'Identify the time complexities of Deque operations.',
          criteria: [
            'Recognize that Deque operations should ideally be O(1).',
            'Understand that array shifting makes front operations O(N).',
            'Identify DLL as the optimal backing structure for a Deque.'
          ],
          topicId: 'u2-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t5-s1-rc1',
          front: 'What are the four primary operations of a Deque ADT?',
          back: 'insertFront, insertRear, deleteFront, deleteRear.',
          topicId: 'u2-t5',
          tags: ['ADT', 'Operations']
        }
      ]
    },
    {
      id: 'u2-t5-s2',
      title: 'DLL as Natural Deque',
      slug: 'dll-as-deque',
      description: 'A Doubly Linked List (DLL) provides the perfect foundation for a Deque. By maintaining pointers to both the `head` and the `tail` of the list, we can access both ends in constant time. The `prev` and `next` pointers in each node allow us to smoothly detach nodes from either end without needing to traverse the entire list.\n\nWe map the Deque operations directly to DLL operations: `insertFront` becomes `add_in_begin`, `insertRear` becomes `add_at_end`, `deleteFront` becomes `remove_in_begin`, and `deleteRear` becomes `remove_at_end`. \n\nEncapsulating the `head` and `tail` pointers inside a `dll_t` struct ensures that the state of the Deque is self-contained. Functions take a pointer to this struct (`dll_t*`), making it easy to create and manage multiple Deques in the same program.',
      keyPoints: [
        'A DLL struct naturally maps to a Deque by holding head and tail pointers.',
        'add_in_begin handles insertFront in O(1) time.',
        'add_at_end handles insertRear in O(1) time.',
        'remove_in_begin handles deleteFront in O(1) time.',
        'remove_at_end handles deleteRear in O(1) time.',
        'Using a struct to hold the head and tail prevents the need for global variables.'
      ],
      codeExamples: [
        {
          id: 'u2-t5-s2-ex1',
          title: 'DLL Implementation of Deque',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int key_;
    struct node* prev_;
    struct node* next_;
};
typedef struct node node_t;

struct dll {
    node_t* head_;
    node_t* tail_;
};
typedef struct dll dll_t;

void init(dll_t* ptr_dlist) {
    ptr_dlist->head_ = NULL;
    ptr_dlist->tail_ = NULL;
}

int is_empty(dll_t *ptr_dlist) {
    return ptr_dlist->head_ == NULL;
}

void add_in_begin(dll_t* ptr_dlist, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key;
    temp->prev_ = NULL;
    temp->next_ = ptr_dlist->head_;

    if (is_empty(ptr_dlist)) {
        ptr_dlist->tail_ = temp;
    } else {
        ptr_dlist->head_->prev_ = temp;
    }
    ptr_dlist->head_ = temp;
}

void add_at_end(dll_t* ptr_dlist, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key;
    temp->next_ = NULL;
    temp->prev_ = ptr_dlist->tail_;

    if (is_empty(ptr_dlist)) {
        ptr_dlist->head_ = temp;
    } else {
        ptr_dlist->tail_->next_ = temp;
    }
    ptr_dlist->tail_ = temp;
}

int remove_in_begin(dll_t* ptr_dlist) {
    if (is_empty(ptr_dlist)) return -1;
    node_t* temp = ptr_dlist->head_;
    int key = temp->key_;
    
    ptr_dlist->head_ = ptr_dlist->head_->next_;
    if (ptr_dlist->head_ == NULL) {
        ptr_dlist->tail_ = NULL;
    } else {
        ptr_dlist->head_->prev_ = NULL;
    }
    free(temp);
    return key;
}

int remove_at_end(dll_t* ptr_dlist) {
    if (is_empty(ptr_dlist)) return -1;
    node_t* temp = ptr_dlist->tail_;
    int key = temp->key_;
    
    ptr_dlist->tail_ = ptr_dlist->tail_->prev_;
    if (ptr_dlist->tail_ == NULL) {
        ptr_dlist->head_ = NULL;
    } else {
        ptr_dlist->tail_->next_ = NULL;
    }
    free(temp);
    return key;
}

int main() {
    dll_t deque;
    init(&deque);
    
    add_in_begin(&deque, 10);
    add_at_end(&deque, 20);
    add_in_begin(&deque, 5);
    
    printf("Removed from front: %d\\n", remove_in_begin(&deque));
    printf("Removed from rear: %d\\n", remove_at_end(&deque));
    
    return 0;
}`,
          language: 'c',
          explanation: 'This program implements a robust DLL. The structural design cleanly handles the empty list conditions (e.g., setting tail to temp when inserting into an empty list, and setting tail to NULL when removing the last element).',
          expectedOutput: 'Removed from front: 5\nRemoved from rear: 20',
          lineBreakdown: [
            { lineNumber: 32, code: 'if (is_empty(ptr_dlist)) { ptr_dlist->tail_ = temp; }', explanation: 'If the list was empty, the new node becomes both head and tail.' },
            { lineNumber: 58, code: 'if (ptr_dlist->head_ == NULL) { ptr_dlist->tail_ = NULL; }', explanation: 'If removing the node made the list empty, we must also reset the tail pointer to NULL.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t5-s2-cm1',
          title: 'Forgetting to update the tail pointer',
          wrongCode: `void add_in_begin(dll_t* ptr_dlist, int key) {
    node_t* temp = malloc(sizeof(node_t));
    temp->key_ = key;
    temp->prev_ = NULL;
    temp->next_ = ptr_dlist->head_;
    if (ptr_dlist->head_ != NULL) ptr_dlist->head_->prev_ = temp;
    ptr_dlist->head_ = temp;
    // Missing tail update for empty list
}`,
          correctCode: `void add_in_begin(dll_t* ptr_dlist, int key) {
    // ...
    if (ptr_dlist->head_ == NULL) {
        ptr_dlist->tail_ = temp;
    } else {
        ptr_dlist->head_->prev_ = temp;
    }
    ptr_dlist->head_ = temp;
}`,
          explanation: 'When inserting the first element into an empty DLL, both the head and tail pointers must be updated to point to the new node. Failing to update the tail will leave it as NULL, causing segmentation faults during rear operations.',
          consequence: 'Operations like `remove_at_end` will trigger a Segmentation Fault by dereferencing a NULL tail pointer.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t5-s2-ic1',
          title: 'Why a Struct for the List?',
          content: 'In interviews, wrapping head and tail inside a `dll_t` struct shows strong software engineering practices. It avoids global variables and allows the user to instantiate multiple independent lists easily (e.g., `dll_t list1, list2;`).',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t5-s2-cp1',
          title: 'DLL Edge Cases',
          description: 'Identify the pointer updates needed when transitioning to/from an empty list.',
          criteria: [
            'Know that adding the first node updates BOTH head and tail.',
            'Know that removing the last node sets BOTH head and tail to NULL.',
            'Understand the role of the `prev` pointer in `remove_at_end`.'
          ],
          topicId: 'u2-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t5-s2-rc1',
          front: 'In a DLL struct with `head` and `tail`, what condition must be met if the list has exactly one node?',
          back: '`head` and `tail` must point to the exact same node, and both the `next` and `prev` of that node must be `NULL`.',
          topicId: 'u2-t5',
          tags: ['Pointers', 'Edge Cases']
        }
      ]
    },
    {
      id: 'u2-t5-s3',
      title: 'Stack using DLL Composition',
      slug: 'stack-using-dll',
      description: 'Composition (also known as "has-a" relationship, embedding, layering, or containment) is a fundamental design principle. Instead of rewriting pointer manipulation logic for a Stack, we can embed a `dll_t` inside a `stack_t` structure.\n\nA Stack operates on a Last-In-First-Out (LIFO) principle. We can fulfill this by delegating the Stack\'s `push` operation to the DLL\'s `add_in_begin` and the Stack\'s `pop` operation to the DLL\'s `remove_in_begin`. The Stack ADT is purely a restricted view over the underlying DLL.\n\nThis approach drastically reduces code duplication, minimizes bugs (since the DLL logic is already tested), and creates a clean abstraction boundary. The user of the `stack_t` does not know or care that a DLL is powering it under the hood.',
      keyPoints: [
        'Composition embeds one struct inside another to reuse its functionality.',
        'A `stack_t` struct contains a `dll_t` member (e.g., `struct stack { dll_t list_; };`).',
        'Stack `push(key)` delegates to `add_in_begin(key)`.',
        'Stack `pop()` delegates to `remove_in_begin()`.',
        'This pattern provides code reuse and enforces clean abstraction boundaries.',
        'The underlying DLL logic handles all memory management and edge cases.'
      ],
      codeExamples: [
        {
          id: 'u2-t5-s3-ex1',
          title: 'Stack via DLL Composition',
          code: `#include <stdio.h>
#include <stdlib.h>

// --- DLL Implementation (Reused) ---
struct node { int key_; struct node* prev_; struct node* next_; };
typedef struct node node_t;
struct dll { node_t* head_; node_t* tail_; };
typedef struct dll dll_t;

void init(dll_t* dlist) { dlist->head_ = dlist->tail_ = NULL; }
int is_empty(dll_t *dlist) { return dlist->head_ == NULL; }

void add_in_begin(dll_t* dlist, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->prev_ = NULL; temp->next_ = dlist->head_;
    if (is_empty(dlist)) dlist->tail_ = temp;
    else dlist->head_->prev_ = temp;
    dlist->head_ = temp;
}

int remove_in_begin(dll_t* dlist) {
    if (is_empty(dlist)) return -1;
    node_t* temp = dlist->head_; int key = temp->key_;
    dlist->head_ = dlist->head_->next_;
    if (dlist->head_ == NULL) dlist->tail_ = NULL;
    else dlist->head_->prev_ = NULL;
    free(temp); return key;
}
// -----------------------------------

// --- Stack Composition ---
struct stack {
    dll_t list_; // Composition: Stack "has a" DLL
};
typedef struct stack stack_t;

void init_stack(stack_t* s) { init(&s->list_); }
void push(stack_t* s, int key) { add_in_begin(&s->list_, key); }
int pop(stack_t* s) { return remove_in_begin(&s->list_); }
int is_empty_stack(stack_t* s) { return is_empty(&s->list_); }
// -------------------------

int main() {
    int a[] = {10, 20, 30, 40};
    int n = 4;
    stack_t s;
    init_stack(&s);
    
    for (int i = 0; i < n; ++i) {
        push(&s, a[i]);
    }
    
    printf("Popping stack elements:\\n");
    while (!is_empty_stack(&s)) {
        printf("%d ", pop(&s));
    }
    printf("\\n");
    
    return 0;
}`,
          language: 'c',
          explanation: 'The `stack_t` struct encapsulates the `dll_t`. The stack functions are simply thin wrappers that pass the internal `list_` member to the DLL functions. This demonstrates the layering principle perfectly.',
          expectedOutput: 'Popping stack elements:\n40 30 20 10 ',
          lineBreakdown: [
            { lineNumber: 32, code: 'struct stack { dll_t list_; };', explanation: 'This is the composition. The stack physically contains a DLL struct, not just a pointer to one.' },
            { lineNumber: 37, code: 'void push(stack_t* s, int key) { add_in_begin(&s->list_, key); }', explanation: 'Delegation: The push operation delegates the actual work to the DLL.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t5-s3-cm1',
          title: 'Incorrect Pointer Passing in Delegation',
          wrongCode: `void push(stack_t* s, int key) {
    add_in_begin(s->list_, key); // Error: list_ is a struct, not a pointer
}`,
          correctCode: `void push(stack_t* s, int key) {
    add_in_begin(&s->list_, key); // Correct: Pass address of the embedded struct
}`,
          explanation: 'Since `list_` is embedded directly as a value (not a pointer) inside `stack_t`, you must use the address-of operator `&` when passing it to the DLL functions, which expect a `dll_t*`.',
          consequence: 'Compilation error due to type mismatch between `dll_t` and `dll_t*`.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t5-s3-ic1',
          title: 'Inheritance vs Composition in C',
          content: 'Since C does not have native object-oriented inheritance, Composition (embedding structs) is the standard way to achieve code reuse. You may be asked how to simulate OOP in C, and this layering technique is the primary answer.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t5-s3-cp1',
          title: 'Delegation Mechanism',
          description: 'Ensure correct mapping of Stack operations to DLL operations.',
          criteria: [
            'Push maps to add_in_begin.',
            'Pop maps to remove_in_begin.',
            'The address of the embedded list must be passed to DLL functions.'
          ],
          topicId: 'u2-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t5-s3-rc1',
          front: 'When composing a Stack using a DLL, which DLL function does the Stack `pop` operation delegate to?',
          back: '`remove_in_begin` (or `remove_at_end`, as long as `push` uses the same end).',
          topicId: 'u2-t5',
          tags: ['Stack', 'Delegation']
        }
      ]
    },
    {
      id: 'u2-t5-s4',
      title: 'Queue using DLL Composition',
      slug: 'queue-using-dll',
      description: 'Following the same composition principle, a Queue can also be trivially implemented using a DLL.\n\nA Queue operates on a First-In-First-Out (FIFO) principle. This means elements are inserted at one end and removed from the other. Using our DLL Deque operations, we can delegate the Queue\'s `enqueue` operation to `add_at_end`, and the `dequeue` operation to `remove_in_begin`.\n\nThe beauty of this design is that the concrete memory manipulation (malloc, free, linking pointers) is entirely abstracted away. The DLL layer acts as a reliable foundation, and the Stack or Queue layers just define the specific access policies. This layered architecture is extensively used in modern system libraries and frameworks.',
      keyPoints: [
        'A `queue_t` struct embeds a `dll_t` struct just like the stack.',
        'Queue `enqueue(key)` delegates to `add_at_end(key)`.',
        'Queue `dequeue()` delegates to `remove_in_begin()`.',
        'This provides strict FIFO behavior in O(1) time.',
        'Layering restricts the general-purpose Deque to a specific use-case ADT.',
        'Abstraction boundaries prevent the client from breaking the FIFO rule.'
      ],
      codeExamples: [
        {
          id: 'u2-t5-s4-ex1',
          title: 'Queue via DLL Composition',
          code: `#include <stdio.h>
#include <stdlib.h>

// --- Minimal DLL Implementation ---
struct node { int key_; struct node* prev_; struct node* next_; };
typedef struct node node_t;
struct dll { node_t* head_; node_t* tail_; };
typedef struct dll dll_t;

void init(dll_t* d) { d->head_ = d->tail_ = NULL; }
int is_empty(dll_t *d) { return d->head_ == NULL; }

void add_at_end(dll_t* d, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->next_ = NULL; temp->prev_ = d->tail_;
    if (is_empty(d)) d->head_ = temp;
    else d->tail_->next_ = temp;
    d->tail_ = temp;
}

int remove_in_begin(dll_t* d) {
    if (is_empty(d)) return -1;
    node_t* temp = d->head_; int key = temp->key_;
    d->head_ = d->head_->next_;
    if (d->head_ == NULL) d->tail_ = NULL;
    else d->head_->prev_ = NULL;
    free(temp); return key;
}
// ----------------------------------

// --- Queue Composition ---
struct queue {
    dll_t list_; // Composition
};
typedef struct queue queue_t;

void init_queue(queue_t* q) { init(&q->list_); }
void enqueue(queue_t* q, int key) { add_at_end(&q->list_, key); }
int dequeue(queue_t* q) { return remove_in_begin(&q->list_); }
int is_empty_queue(queue_t* q) { return is_empty(&q->list_); }
// -------------------------

int main() {
    queue_t q;
    init_queue(&q);
    
    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    
    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Dequeued: %d\\n", dequeue(&q));
    
    enqueue(&q, 40);
    
    printf("Dequeued: %d\\n", dequeue(&q));
    printf("Dequeued: %d\\n", dequeue(&q));
    
    return 0;
}`,
          language: 'c',
          explanation: 'The Queue implementation looks identical structurally to the Stack implementation. The only difference is the policy: `enqueue` maps to `add_at_end` instead of `add_in_begin`, yielding FIFO behavior.',
          expectedOutput: 'Dequeued: 10\nDequeued: 20\nDequeued: 30\nDequeued: 40',
          lineBreakdown: [
            { lineNumber: 36, code: 'void enqueue(queue_t* q, int key) { add_at_end(&q->list_, key); }', explanation: 'Delegates enqueue to insert-rear of the DLL.' },
            { lineNumber: 37, code: 'int dequeue(queue_t* q) { return remove_in_begin(&q->list_); }', explanation: 'Delegates dequeue to remove-front of the DLL, establishing FIFO.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t5-s4-cm1',
          title: 'Mapping Dequeue to remove_at_end',
          wrongCode: `int dequeue(queue_t* q) {
    return remove_at_end(&q->list_); // LIFO behavior
}`,
          correctCode: `int dequeue(queue_t* q) {
    return remove_in_begin(&q->list_); // FIFO behavior
}`,
          explanation: 'If `enqueue` uses `add_at_end` and `dequeue` uses `remove_at_end`, you have accidentally built a Stack (LIFO) instead of a Queue (FIFO). You must operate on opposite ends for a Queue.',
          consequence: 'The Queue will incorrectly return the most recently added items first.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t5-s4-ic1',
          title: 'Adapter Pattern',
          content: 'In design pattern terminology, this is a classic example of the Adapter Pattern. The Stack and Queue structs adapt the interface of the DLL to provide a specialized set of functions expected by the client.',
          relatedTopicIds: [],
          frequency: 'rare'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t5-s4-cp1',
          title: 'Queue Delegation Mapping',
          description: 'Identify the correct mapping of Queue functions to DLL functions.',
          criteria: [
            'Enqueue requires adding to the rear.',
            'Dequeue requires removing from the front.',
            'Alternatively, enqueue front and dequeue rear also works for FIFO.'
          ],
          topicId: 'u2-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t5-s4-rc1',
          front: 'To implement a Queue using a Deque (DLL), if you map `enqueue` to `insertRear`, what must `dequeue` be mapped to?',
          back: '`deleteFront` (or `remove_in_begin`).',
          topicId: 'u2-t5',
          tags: ['Queue', 'Delegation']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t5-q1',
      type: 'mcq',
      topicId: 'u2-t5',
      difficulty: 'beginner',
      question: 'Which underlying data structure is best suited to implement a Deque in O(1) time complexity for all operations?',
      options: [
        'Singly Linked List',
        'Standard Array',
        'Doubly Linked List',
        'Stack'
      ],
      correctAnswer: 'Doubly Linked List',
      explanation: 'A Doubly Linked List with head and tail pointers allows insertion and deletion at both ends in O(1) time without shifting elements.',
      tags: ['Deque', 'Complexity']
    },
    {
      id: 'u2-t5-q2',
      type: 'true-false',
      topicId: 'u2-t5',
      difficulty: 'beginner',
      question: 'A Stack can be implemented by delegating operations to a Deque.',
      correctAnswer: true,
      explanation: 'Yes, by restricting the Deque operations to only one end (e.g., using only insertFront and deleteFront), it perfectly emulates a Stack.',
      tags: ['Stack', 'Composition']
    },
    {
      id: 'u2-t5-q3',
      type: 'fill-blank',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      question: 'In C, placing a `dll_t` struct inside a `stack_t` struct to reuse its functions is an example of the design principle called __________.',
      correctAnswer: 'Composition',
      explanation: 'Composition (or embedding/layering) is the principle of building complex types by combining simpler, pre-tested types.',
      tags: ['Design', 'Composition']
    },
    {
      id: 'u2-t5-q4',
      type: 'mcq',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      question: 'If a Queue delegates its `enqueue` operation to a DLL\'s `add_at_end`, which DLL function should `dequeue` delegate to?',
      options: [
        'add_in_begin',
        'remove_in_begin',
        'remove_at_end',
        'is_empty'
      ],
      correctAnswer: 'remove_in_begin',
      explanation: 'A Queue requires FIFO behavior. If elements enter at the rear, they must leave from the front.',
      tags: ['Queue', 'Delegation']
    },
    {
      id: 'u2-t5-q5',
      type: 'spot-bug',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      question: 'Spot the issue in this Queue composition delegation function.',
      code: `void enqueue(queue_t* q, int key) {
    add_at_end(q->list_, key);
}`,
      options: [
        'q->list_ should be q->list_->next',
        'Missing the address-of operator (&) before q->list_',
        'add_at_end is the wrong function for enqueue',
        'The key parameter should be passed by reference'
      ],
      correctAnswer: 'Missing the address-of operator (&) before q->list_',
      explanation: 'Because `list_` is embedded as a value struct, `add_at_end` requires a pointer (`dll_t*`), so you must pass `&q->list_`.',
      tags: ['Pointers', 'C']
    },
    {
      id: 'u2-t5-q6',
      type: 'mcq',
      topicId: 'u2-t5',
      difficulty: 'advanced',
      question: 'Why does removing from the rear of a Singly Linked List (SLL) take O(N) time, making it unsuitable for a Deque?',
      options: [
        'Because memory must be shifted left.',
        'Because updating the tail pointer requires traversing to find the new second-to-last node.',
        'Because freeing memory takes O(N) time.',
        'Because an SLL lacks a tail pointer entirely.'
      ],
      correctAnswer: 'Because updating the tail pointer requires traversing to find the new second-to-last node.',
      explanation: 'Even if an SLL has a tail pointer, removing the tail requires updating the tail to point to the previous node. Since nodes only point forward, finding the previous node requires an O(N) traversal from the head.',
      tags: ['SLL', 'Time Complexity']
    },
    {
      id: 'u2-t5-q7',
      type: 'true-false',
      topicId: 'u2-t5',
      difficulty: 'beginner',
      question: 'A Deque allows insertion and deletion at both ends.',
      correctAnswer: true,
      explanation: 'That is the definition of a Double-Ended Queue (Deque).',
      tags: ['Deque', 'Definition']
    },
    {
      id: 'u2-t5-q8',
      type: 'predict-output',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      question: 'Predict the output of the following sequence of operations on a Deque (initially empty): insertFront(1), insertRear(2), insertFront(3), deleteRear(), deleteFront().',
      options: [
        '2, 3',
        '2, 1',
        '3, 2',
        '1, 2'
      ],
      correctAnswer: '2, 3',
      explanation: 'State: empty. insertFront(1) -> [1]. insertRear(2) -> [1, 2]. insertFront(3) -> [3, 1, 2]. deleteRear() removes 2. deleteFront() removes 3. Output is 2, 3.',
      tags: ['Deque', 'Tracing']
    },
    {
      id: 'u2-t5-q9',
      type: 'mcq',
      topicId: 'u2-t5',
      difficulty: 'advanced',
      question: 'Which of the following describes the Adapter Pattern as used in our implementation?',
      options: [
        'Writing a completely new algorithm for Queue.',
        'Using an array to simulate a Linked List.',
        'Creating a new interface (Stack/Queue) that internally uses the methods of an existing class/struct (DLL).',
        'Allocating memory dynamically using malloc.'
      ],
      correctAnswer: 'Creating a new interface (Stack/Queue) that internally uses the methods of an existing class/struct (DLL).',
      explanation: 'The Stack and Queue act as adapters, restricting and renaming the generalized interface of the DLL to match specific ADT semantics.',
      tags: ['Design Pattern', 'Adapter']
    },
    {
      id: 'u2-t5-q10',
      type: 'fill-blank',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      question: 'When a struct `A` contains a struct `B` as a member, it is called a "has-a" relationship, or __________.',
      correctAnswer: 'Composition',
      explanation: 'Composition physically embeds the member struct within the parent struct\'s memory layout.',
      tags: ['Structs', 'C']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t5-p1',
      title: 'Implement Stack using DLL Composition',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      problemStatement: 'Given a partially completed Doubly Linked List API, implement a Stack using the Composition principle. You need to define the `stack_t` struct containing the `dll_t` and implement the `push` and `pop` functions by delegating them to `add_in_begin` and `remove_in_begin`.',
      constraints: [
        'You must not use malloc inside the stack functions directly.',
        'You must call the provided DLL functions.'
      ],
      sampleInput: 'push(10), push(20), pop(), pop()',
      sampleOutput: '20 10',
      hints: [
        'Embed `dll_t list_;` inside your stack struct.',
        'Pass `&s->list_` to the DLL functions.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* prev_; struct node* next_; };
typedef struct node node_t;
struct dll { node_t* head_; node_t* tail_; };
typedef struct dll dll_t;

void init(dll_t* dlist) { dlist->head_ = dlist->tail_ = NULL; }
int is_empty(dll_t *dlist) { return dlist->head_ == NULL; }

void add_in_begin(dll_t* dlist, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->prev_ = NULL; temp->next_ = dlist->head_;
    if (is_empty(dlist)) dlist->tail_ = temp;
    else dlist->head_->prev_ = temp;
    dlist->head_ = temp;
}

int remove_in_begin(dll_t* dlist) {
    if (is_empty(dlist)) return -1;
    node_t* temp = dlist->head_; int key = temp->key_;
    dlist->head_ = dlist->head_->next_;
    if (dlist->head_ == NULL) dlist->tail_ = NULL;
    else dlist->head_->prev_ = NULL;
    free(temp); return key;
}

// Implement Stack here
struct stack {
    dll_t list_;
};
typedef struct stack stack_t;

void init_stack(stack_t* s) {
    init(&s->list_);
}

void push(stack_t* s, int key) {
    add_in_begin(&s->list_, key);
}

int pop(stack_t* s) {
    return remove_in_begin(&s->list_);
}

int main() {
    stack_t s;
    init_stack(&s);
    push(&s, 10);
    push(&s, 20);
    printf("%d ", pop(&s));
    printf("%d\\n", pop(&s));
    return 0;
}`,
      solutionExplanation: 'The `stack_t` struct embeds `dll_t`. `push` maps to `add_in_begin` and `pop` maps to `remove_in_begin`. We pass `&s->list_` because the DLL functions expect a pointer to the list struct.',
      dryRun: [
        { step: 1, line: 43, variables: { key: '10' }, output: '', explanation: 'Push 10 delegates to add_in_begin' },
        { step: 2, line: 43, variables: { key: '20' }, output: '', explanation: 'Push 20 delegates to add_in_begin' },
        { step: 3, line: 47, variables: {}, output: '20', explanation: 'Pop removes front element (20)' },
        { step: 4, line: 47, variables: {}, output: '10', explanation: 'Pop removes front element (10)' }
      ],
      tags: ['Stack', 'Delegation']
    },
    {
      id: 'u2-t5-p2',
      title: 'Queue Implementation via Composition',
      topicId: 'u2-t5',
      difficulty: 'intermediate',
      problemStatement: 'Implement a Queue ADT using DLL composition. The DLL functions `add_at_end` and `remove_in_begin` are provided. Define the `queue_t` struct and the `enqueue` and `dequeue` functions.',
      constraints: [
        'Queue must demonstrate FIFO behavior.',
        'Use the provided DLL functions exclusively.'
      ],
      sampleInput: 'enqueue(10), enqueue(20), dequeue(), dequeue()',
      sampleOutput: '10 20',
      hints: [
        'FIFO means insert at rear, remove at front.',
        'Use add_at_end for enqueue and remove_in_begin for dequeue.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* prev_; struct node* next_; };
typedef struct node node_t;
struct dll { node_t* head_; node_t* tail_; };
typedef struct dll dll_t;

void init(dll_t* d) { d->head_ = d->tail_ = NULL; }
int is_empty(dll_t *d) { return d->head_ == NULL; }

void add_at_end(dll_t* d, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->next_ = NULL; temp->prev_ = d->tail_;
    if (is_empty(d)) d->head_ = temp;
    else d->tail_->next_ = temp;
    d->tail_ = temp;
}

int remove_in_begin(dll_t* d) {
    if (is_empty(d)) return -1;
    node_t* temp = d->head_; int key = temp->key_;
    d->head_ = d->head_->next_;
    if (d->head_ == NULL) d->tail_ = NULL;
    else d->head_->prev_ = NULL;
    free(temp); return key;
}

struct queue {
    dll_t list_;
};
typedef struct queue queue_t;

void init_queue(queue_t* q) {
    init(&q->list_);
}

void enqueue(queue_t* q, int key) {
    add_at_end(&q->list_, key);
}

int dequeue(queue_t* q) {
    return remove_in_begin(&q->list_);
}

int main() {
    queue_t q;
    init_queue(&q);
    enqueue(&q, 10);
    enqueue(&q, 20);
    printf("%d ", dequeue(&q));
    printf("%d\\n", dequeue(&q));
    return 0;
}`,
      solutionExplanation: 'For FIFO behavior, `enqueue` must append to the back (`add_at_end`), and `dequeue` must remove from the front (`remove_in_begin`). The composition avoids rewriting pointer logic.',
      dryRun: [
        { step: 1, line: 40, variables: { key: '10' }, output: '', explanation: 'Enqueue 10 at rear' },
        { step: 2, line: 40, variables: { key: '20' }, output: '', explanation: 'Enqueue 20 at rear' },
        { step: 3, line: 44, variables: {}, output: '10', explanation: 'Dequeue removes from front (10)' },
        { step: 4, line: 44, variables: {}, output: '20', explanation: 'Dequeue removes from front (20)' }
      ],
      tags: ['Queue', 'Composition']
    },
    {
      id: 'u2-t5-p3',
      title: 'Deque Implementation via DLL',
      topicId: 'u2-t5',
      difficulty: 'advanced',
      problemStatement: 'Complete the DLL functions `remove_at_end` and `add_in_begin` to fully support a Deque. These functions require careful management of the `prev` and `next` pointers, as well as updating `head_` and `tail_`.',
      constraints: [
        'Time complexity must be O(1).',
        'Handle empty list edge cases correctly.'
      ],
      sampleInput: 'add_in_begin(5), remove_at_end()',
      sampleOutput: 'Removed: 5',
      hints: [
        'For add_in_begin, if list is empty, tail_ must point to the new node.',
        'For remove_at_end, if list becomes empty, head_ must be set to NULL.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { int key_; struct node* prev_; struct node* next_; };
typedef struct node node_t;
struct dll { node_t* head_; node_t* tail_; };
typedef struct dll dll_t;

void init(dll_t* dlist) { dlist->head_ = dlist->tail_ = NULL; }
int is_empty(dll_t *dlist) { return dlist->head_ == NULL; }

void add_in_begin(dll_t* dlist, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key;
    temp->prev_ = NULL;
    temp->next_ = dlist->head_;

    if (is_empty(dlist)) {
        dlist->tail_ = temp;
    } else {
        dlist->head_->prev_ = temp;
    }
    dlist->head_ = temp;
}

int remove_at_end(dll_t* dlist) {
    if (is_empty(dlist)) return -1;
    node_t* temp = dlist->tail_;
    int key = temp->key_;
    
    dlist->tail_ = dlist->tail_->prev_;
    if (dlist->tail_ == NULL) {
        dlist->head_ = NULL;
    } else {
        dlist->tail_->next_ = NULL;
    }
    free(temp);
    return key;
}

int main() {
    dll_t deque;
    init(&deque);
    add_in_begin(&deque, 5);
    printf("Removed: %d\\n", remove_at_end(&deque));
    return 0;
}`,
      solutionExplanation: 'The code perfectly manages the pointers. When adding the first node, `tail_` is initialized. When removing the last node, `head_` is reset to NULL, preventing dangling pointers.',
      dryRun: [
        { step: 1, line: 12, variables: { key: '5' }, output: '', explanation: 'Adding 5 to empty list. Head and Tail point to 5.' },
        { step: 2, line: 27, variables: { key: '5' }, output: 'Removed: 5', explanation: 'Removing tail node 5. List becomes empty, head and tail set to NULL.' }
      ],
      tags: ['Deque', 'DLL']
    }
  ]
};
