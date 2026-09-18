import type { Topic } from '../../../../types';

export const introDma: Topic = {
  id: 'u1-t1',
  unitId: 'unit-1',
  title: 'Introduction to Data Structures & Dynamic Memory Allocation',
  slug: 'intro-dma',
  description:
    `A data structure is a systematic scheme for organizing, storing, and manipulating data in computer memory so that various operations can be executed with optimal time and space efficiency. Data in modern computing is the foundational raw material for software, databases, network protocols, artificial intelligence, and operating systems; however, the architectural choice of how data is structured in memory dictates the algorithmic complexity of every operation performed upon it. As Niklaus Wirth famously formulated: Programs = Algorithms + Data Structures.

This topic establishes the foundational bedrock of Data Structures and its Applications (UE25CS252A). We begin with the classification of data structures into primitive versus non-primitive, and further into linear structures (arrays, linked lists, stacks, queues) and non-linear structures (trees, graphs, heaps). We investigate the formal concept of Abstract Data Types (ADTs) — separating the logical mathematical specification of an entity and its operations from its concrete physical implementation.

Finally, we undertake an in-depth exploration of memory management in C. We contrast static (compile-time, stack-based) memory allocation with dynamic (run-time, heap-based) memory allocation, uncovering why static structures lead to memory under-utilization or catastrophic buffer overflows. We systematically master the standard memory management library functions defined in <stdlib.h>: malloc(), calloc(), realloc(), and free(), dissecting pointer arithmetic, multi-dimensional dynamic matrix allocation, and the critical pitfalls that plague C systems programmers — including memory leaks, dangling pointers, double freeing, and segmentation faults.`,
  difficulty: 'beginner',
  prerequisites: [],
  estimatedMinutes: 55,

  subtopics: [
    {
      id: 'u1-t1-s1',
      title: 'What is a Data Structure? Need & Classification',
      slug: 'what-is-a-data-structure',
      description:
        `At its core, a data structure is a specialized format for organizing, processing, retrieving, and storing data within a computer's physical memory. In software engineering, data is rarely processed in isolation; it arrives in complex collections — such as sensor telemetry streams, user relationship graphs, priority task queues, and hierarchical directory structures. Simply dumping bytes into memory is inadequate because the layout directly governs how many CPU cycles and memory bus transactions are required to search, insert, delete, or sort that data.

Data structures are broadly partitioned into two major branches:

1. Primitive Data Structures: These are the fundamental atomic data types provided natively by the programming language and directly supported by hardware instruction sets. In C, these include int, char, float, double, and raw memory addresses (pointers).

2. Non-Primitive Data Structures: These are sophisticated structures synthesized by combining primitive types to manage collections of interrelated data items. Non-primitive structures are divided based on how their constituent elements are sequenced:
   - Linear Data Structures: Elements are arranged sequentially in a single line, where every element (except the first and last) has a unique logical predecessor and successor. Examples include Arrays (contiguous fixed-size sequences), Linked Lists (dynamically connected nodes through pointers), Stacks (Last-In, First-Out sequence), and Queues (First-In, First-Out sequence).
   - Non-Linear Data Structures: Elements do not form a simple sequence; instead, an element can connect to multiple adjacent elements forming hierarchical or interconnected networks. Examples include Trees (hierarchical parent-child relationships, such as Binary Search Trees, AVL Trees, and Tries), Graphs (interconnected nodes representing networks, social relationships, and maps), and Heaps (specialized tree-based priority structures).

The choice of data structure directly dictates the algorithmic efficiency of an application. For example, accessing the k-th item in an Array requires O(1) time due to index arithmetic, but inserting an element into the middle requires O(n) element shifts. Conversely, a Linked List allows O(1) insertion once the location pointer is known, but searching or indexing requires O(n) sequential traversal. Understanding these inherent trade-offs is the central goal of data structures.`,
      keyPoints: [
        'A data structure is a scheme for organizing data in computer memory so that various operations (searching, inserting, deleting, updating) can be performed efficiently.',
        'Algorithms and Data Structures go hand in hand: an algorithm cannot be optimized without an appropriate data structure, and a data structure is useless without algorithms to manipulate it.',
        'Linear Data Structures (Arrays, Linked Lists, Stacks, Queues) organize elements in a sequential order where each element has a unique predecessor and successor (except boundaries).',
        'Non-Linear Data Structures (Trees, Graphs, Heaps) organize data hierarchically or as interconnected networks, allowing multi-level relationships and non-sequential traversal paths.',
        'Real-world applications: Stacks power function call recursion and expression evaluation; Queues handle CPU task scheduling and printer buffers; Trees manage hierarchical file systems and auto-complete tries; Graphs model routing networks and social graphs.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s1-ex1',
          title: 'Static Linear Array vs Dynamic Node Structure in C',
          code: `#include <stdio.h>
#include <stdlib.h>

/* Static Linear Data Structure: Contiguous Array */
void demonstrate_array(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    printf("Static Array (Contiguous memory addresses):\n");
    for (int i = 0; i < 5; i++) {
        /* Address arithmetic: each element is separated by sizeof(int) bytes */
        printf("arr[%d] = %d at address %p\n", i, arr[i], (void*)&arr[i]);
    }
}

/* Dynamic Linear Node: Non-contiguous pointer-based storage */
struct Node {
    int data;
    struct Node* next;
};

void demonstrate_linked_pair(void) {
    /* Allocate two independent nodes on the heap */
    struct Node* first = (struct Node*)malloc(sizeof(struct Node));
    struct Node* second = (struct Node*)malloc(sizeof(struct Node));

    if (first == NULL || second == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        exit(EXIT_FAILURE);
    }

    first->data = 100;
    first->next = second; /* Pointer explicitly links first node to second */

    second->data = 200;
    second->next = NULL;   /* End of list */

    printf("\nLinked Nodes (Explicit pointer addresses on Heap):\n");
    printf("Node 1: data = %d, stored at %p, points to %p\n", first->data, (void*)first, (void*)first->next);
    printf("Node 2: data = %d, stored at %p, points to %p\n", second->data, (void*)second, (void*)second->next);

    free(first);
    free(second);
}

int main(void) {
    demonstrate_array();
    demonstrate_linked_pair();
    return 0;
}`,
          language: 'c',
          explanation:
            'This program contrasts the fundamental memory organization of a static array versus dynamically linked nodes. In the array, all 5 integers reside in strictly contiguous memory addresses differing by sizeof(int) (typically 4 bytes). In the linked nodes, each node can reside anywhere on the heap, and sequentiality is maintained solely through explicit pointer references.',
          expectedOutput:
            'Static Array (Contiguous memory addresses):\narr[0] = 10 at address 0x7ffd98...\narr[1] = 20 at address 0x7ffd9c...\narr[2] = 30 at address 0x7ffda0...\narr[3] = 40 at address 0x7ffda4...\narr[4] = 50 at address 0x7ffda8...\n\nLinked Nodes (Explicit pointer addresses on Heap):\nNode 1: data = 100, stored at 0x55f1..., points to 0x55f2...\nNode 2: data = 200, stored at 0x55f2..., points to (nil)',
          lineBreakdown: [
            { lineNumber: 5, code: 'void demonstrate_array(void) {', explanation: 'Defines a function illustrating array memory layout.' },
            { lineNumber: 6, code: '    int arr[5] = {10, 20, 30, 40, 50};', explanation: 'Allocates 5 contiguous integers on the stack frame.' },
            { lineNumber: 10, code: '        printf("arr[%d] = %d at address %p\\n", i, arr[i], (void*)&arr[i]);', explanation: 'Prints both value and address showing constant stride of 4 bytes.' },
            { lineNumber: 15, code: 'struct Node { int data; struct Node* next; };', explanation: 'Defines a self-referential structure representing a linked node.' },
            { lineNumber: 20, code: '    struct Node* first = (struct Node*)malloc(sizeof(struct Node));', explanation: 'Dynamically requests heap memory for node 1.' },
            { lineNumber: 28, code: '    first->next = second;', explanation: 'Establishes the linear connection by storing second node address in first node next pointer.' },
            { lineNumber: 38, code: '    free(first); free(second);', explanation: 'Releases the allocated heap memory back to the operating system.' },
          ],
          relatedTopicIds: ['u1-t2'],
        },
      ],
      commonMistakes: [],
      interviewCallouts: [
        {
          id: 'u1-t1-s1-ic1',
          title: 'Linear vs Non-Linear Traversal and Complexity',
          content:
            'In technical interviews, you will frequently be asked why we need non-linear structures like Binary Search Trees or Graphs if linear arrays and linked lists can store any collection. The key answer is search complexity: in an unsorted linear list of N elements, search is strictly O(N). In a balanced tree, hierarchical partitioning reduces search time to O(log N). For N = 1,000,000, O(N) requires one million comparisons, whereas O(log2 N) requires only ~20 comparisons.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s1-cp1',
          title: 'Classification of Data Structures',
          description: 'Verify your ability to categorize and justify data structure choices.',
          criteria: [
            'Differentiate between primitive and non-primitive data types with C examples.',
            'Explain the definitive distinction between linear and non-linear data structures.',
            'Identify at least two real-world applications for arrays, linked lists, stacks, queues, trees, and graphs.',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s1-rc1',
          front: 'What is a Data Structure? State Niklaus Wirth’s famous formula.',
          back: 'A data structure is a systematic scheme for organizing, storing, and manipulating data in computer memory for efficient operations. Niklaus Wirth formulated: Programs = Algorithms + Data Structures.',
          topicId: 'u1-t1',
          tags: ['definitions', 'foundations'],
        },
        {
          id: 'u1-t1-s1-rc2',
          front: 'What is the structural difference between Linear and Non-Linear Data Structures?',
          back: 'In Linear Data Structures (arrays, lists, stacks, queues), elements form a sequential order with a unique predecessor and successor for each element (except endpoints). In Non-Linear structures (trees, graphs), elements have multi-level or networked relationships with multiple predecessors or successors.',
          topicId: 'u1-t1',
          tags: ['classification', 'linear', 'non-linear'],
        },
      ],
    },

    {
      id: 'u1-t1-s2',
      title: 'Abstract Data Types (ADT)',
      slug: 'abstract-data-types',
      description:
        `An Abstract Data Type (ADT) is a mathematical model for a data type where the type is defined exclusively by its behavior (semantics) from the viewpoint of a user of the data, specifically in terms of possible values and possible operations, without any reference to how those operations are implemented in code.

The core principle of an ADT is the absolute separation of interface from implementation:
- The Interface specifies WHAT the data type does: what operations exist, what arguments they take, what preconditions they expect, and what postconditions or return values they produce.
- The Implementation specifies HOW the data type achieves this: which concrete data structure (arrays, linked nodes, hash tables) is chosen, how memory is laid out, and what specific algorithms are executed.

Consider the real-world analogy of driving an automobile:
The driver interacts strictly with an abstract interface: steering wheel, accelerator, brake pedal, and gear selector. The driver can steer and stop the car perfectly without having the slightest knowledge of whether the engine is a 4-cylinder petrol engine, an electric motor, or a turbo diesel, or how the hydraulic braking lines transmit pressure. If the car manufacturer upgrades the braking system from drum brakes to anti-lock disc brakes, the driver's interface remains completely unchanged.

In software architecture, this abstraction provides critical engineering benefits:
1. Modularity & Information Hiding: Users of an ADT write code that depends only on the interface functions. Internal data structures can be refactored or completely replaced without breaking client code.
2. Reusability: An ADT (like a Stack or Priority Queue) can be implemented once and consumed across dozens of disparate applications.
3. Flexibility: Multiple distinct concrete implementations can satisfy the identical ADT interface. For example, the List ADT can be implemented via an ArrayList (contiguous dynamic array) or via a Singly Linked List (pointer-linked heap nodes). The client interacts only with insert(), delete(), and search(), choosing the implementation whose asymptotic complexity best matches their workload.`,
      keyPoints: [
        'An Abstract Data Type (ADT) specifies a set of data values and allowed operations from the user perspective, completely independent of implementation details.',
        'ADT defines WHAT operations do (the contract/interface), whereas a Data Structure defines HOW those operations are physically stored and executed (the implementation).',
        'Information hiding and encapsulation ensure client code does not depend on internal data members, allowing internal refactoring without breaking external modules.',
        'A single ADT can be implemented by multiple different data structures: for example, the Stack ADT (push, pop, peek) can be implemented using a fixed-size Array or a dynamic Linked List.',
        'In C, ADTs are conventionally modeled by declaring opaque pointers and function prototypes in a public header file (.h), while keeping the actual struct definition inside the implementation file (.c).',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s2-ex1',
          title: 'Implementing an ADT in C: Stack ADT Interface vs Implementation',
          code: `/* =========================================================
 * stack_adt.h - The Public Interface (WHAT the ADT provides)
 * ========================================================= */
#ifndef STACK_ADT_H
#define STACK_ADT_H

#include <stdbool.h>

/* Opaque pointer: client knows Stack exists, but cannot access its fields */
typedef struct StackRep* Stack;

/* ADT Operations */
Stack stack_create(int capacity);
void stack_destroy(Stack s);
bool stack_push(Stack s, int value);
bool stack_pop(Stack s, int* popped_value);
bool stack_peek(Stack s, int* peek_value);
bool stack_is_empty(Stack s);
bool stack_is_full(Stack s);

#endif /* STACK_ADT_H */

/* =========================================================
 * stack_adt.c - The Concrete Implementation (HOW it works)
 * ========================================================= */
#include <stdio.h>
#include <stdlib.h>

/* Internal definition hidden from the user */
struct StackRep {
    int* array;
    int top;
    int capacity;
};

Stack stack_create(int capacity) {
    Stack s = (Stack)malloc(sizeof(struct StackRep));
    if (!s) return NULL;
    s->capacity = capacity;
    s->top = -1;
    s->array = (int*)malloc(capacity * sizeof(int));
    if (!s->array) {
        free(s);
        return NULL;
    }
    return s;
}

void stack_destroy(Stack s) {
    if (s) {
        free(s->array);
        free(s);
    }
}

bool stack_push(Stack s, int value) {
    if (stack_is_full(s)) return false;
    s->array[++(s->top)] = value;
    return true;
}

bool stack_pop(Stack s, int* popped_value) {
    if (stack_is_empty(s)) return false;
    *popped_value = s->array[(s->top)--];
    return true;
}

bool stack_peek(Stack s, int* peek_value) {
    if (stack_is_empty(s)) return false;
    *peek_value = s->array[s->top];
    return true;
}

bool stack_is_empty(Stack s) { return s ? s->top == -1 : true; }
bool stack_is_full(Stack s)  { return s ? s->top == s->capacity - 1 : false; }

/* =========================================================
 * main.c - Client code consuming the ADT strictly via interface
 * ========================================================= */
int main(void) {
    Stack my_stack = stack_create(3);

    stack_push(my_stack, 10);
    stack_push(my_stack, 20);
    stack_push(my_stack, 30);

    int val;
    while (stack_pop(my_stack, &val)) {
        printf("Popped: %d\n", val);
    }

    stack_destroy(my_stack);
    return 0;
}`,
          language: 'c',
          explanation:
            'This example demonstrates industry-grade ADT encapsulation in C. By defining typedef struct StackRep* Stack without providing the struct definition in the header, client code in main() cannot access s->top or s->array directly. If we later replace the array with a linked list, main.c will compile and execute with zero modifications.',
          expectedOutput: 'Popped: 30\nPopped: 20\nPopped: 10',
          lineBreakdown: [
            { lineNumber: 8, code: 'typedef struct StackRep* Stack;', explanation: 'Declares an opaque pointer type for encapsulation.' },
            { lineNumber: 11, code: 'Stack stack_create(int capacity);', explanation: 'Constructor function returning an opaque Stack handle.' },
            { lineNumber: 27, code: 'struct StackRep { int* array; int top; int capacity; };', explanation: 'Internal struct definition hidden inside .c file.' },
            { lineNumber: 47, code: '    s->array[++(s->top)] = value;', explanation: 'Array-based push implementation incrementing top.' },
            { lineNumber: 76, code: '    Stack my_stack = stack_create(3);', explanation: 'Client interacts exclusively through the clean ADT interface.' },
          ],
          relatedTopicIds: ['u1-t7', 'u1-t8'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s2-m1',
          title: 'Confusing ADT with Concrete Data Structure',
          wrongCode: '/* "A stack is an array with a top index." */',
          correctCode: '/* "A Stack is an ADT defined by LIFO push/pop operations, which can be implemented using an array, a linked list, or other structures." */',
          explanation:
            'An ADT is the conceptual specification (the operations and behavioral rules). An array is a physical memory data structure. Confusing the two prevents seeing that a Stack or Queue can have multiple completely different underlying implementations.',
          consequence: 'Rigid architectural design and inability to answer theory/viva exam questions on abstraction.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s2-ic1',
          title: 'Viva Question: What is an Opaque Pointer in C?',
          content:
            'In C examinations and interviews, professors frequently ask how C achieves object-oriented encapsulation without classes. The answer is an Opaque Pointer (often called a handle or Pimpl idiom in C++). A struct is declared in a header file (typedef struct Foo* FooHandle;), but its member variables are defined only inside the .c file. External files cannot inspect or modify internal members directly.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s2-cp1',
          title: 'Understanding ADT Architecture',
          description: 'Assess your conceptual understanding of Abstract Data Types.',
          criteria: [
            'State the formal definition of an ADT.',
            'Explain why separating interface from implementation is critical in large software projects.',
            'Give examples of two different data structures that can implement the same ADT.',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s2-rc1',
          front: 'Define Abstract Data Type (ADT).',
          back: 'An ADT is a mathematical model of a data type defined purely by its set of values and operations from the user perspective, completely independent of physical implementation.',
          topicId: 'u1-t1',
          tags: ['definitions', 'adt'],
        },
        {
          id: 'u1-t1-s2-rc2',
          front: 'How does an ADT differ from a Data Structure?',
          back: 'An ADT specifies WHAT operations are supported (the interface/contract). A Data Structure specifies HOW data is organized in physical memory and how operations are implemented (the concrete realization).',
          topicId: 'u1-t1',
          tags: ['adt', 'comparison'],
        },
      ],
    },

    {
      id: 'u1-t1-s3',
      title: 'Memory Architecture: Static vs Dynamic Allocation',
      slug: 'static-vs-dynamic-memory',
      description:
        `To understand why dynamic data structures like linked lists and dynamic stacks exist, one must understand how a computer process manages its memory space. When a compiled C program is launched, the operating system assigns it a virtual address space partitioned into distinct segments:

1. Text (Code) Segment: Contains the compiled machine instructions fetched and executed by the CPU. This area is typically read-only to prevent self-modifying code.
2. Initialized Data Segment (.data): Stores global, static, and external variables that are explicitly initialized to non-zero values before compile time (e.g., int global_counter = 100;).
3. Uninitialized Data Segment (.bss): Stores global and static variables that are uninitialized or initialized to zero. The operating system zeroes this block before program execution begins.
4. Stack Segment: Used for automatic variable storage, function call activation records, function parameters, and return addresses. The stack grows downward (from high memory addresses toward low memory addresses). Allocation and deallocation on the stack are instantaneous — the CPU merely decrements or increments the Stack Pointer (SP) register.
5. Heap Segment: A large pool of memory managed by the C runtime memory allocator for dynamic allocation at runtime. The heap grows upward (from low memory addresses toward high memory addresses).

Static (Compile-Time) Memory Allocation:
In static allocation, the compiler determines the precise memory size and layout during compilation. Variables allocated on the stack (local variables) or in .data/.bss have fixed sizes.
Limitations of Static Memory Allocation:
- Fixed, Inflexible Size: The size must be known before execution (e.g., int arr[100];). If your program encounters 101 items at runtime, it crashes or overflows buffer boundaries.
- Memory Under-utilization: Programmers often declare overly large arrays to handle worst-case inputs (e.g., char buffer[10000]; to store a 10-character name). If only 10 elements are used, the remaining memory is completely wasted.
- Memory Over-utilization: If data exceeds the allocated bound, it causes stack overflow or out-of-bounds memory writes, creating severe security vulnerabilities.
- Inflexible Lifetime: Local stack variables cease to exist the moment their enclosing function returns. You cannot return a pointer to a local stack array from a function safely.

Dynamic (Run-Time) Memory Allocation:
Dynamic allocation allows a program to request the exact quantity of heap memory needed while the program is actively executing, based on user input or file sizes. Memory remains allocated across function calls until the programmer explicitly releases it.`,
      keyPoints: [
        'A running C program layout consists of five major segments: Text (instructions), Data (initialized globals), BSS (uninitialized globals), Stack (local variables/frames), and Heap (dynamic allocations).',
        'Stack memory is allocated and released automatically by CPU stack pointer adjustments during function call entry and exit.',
        'Heap memory is allocated explicitly at runtime using dynamic memory functions and persists until explicitly freed or the process terminates.',
        'Static allocation requires sizes to be known at compile time, leading to memory wastage (under-utilization) or buffer overflows (over-utilization).',
        'Dynamic allocation enables data structures to grow and shrink elastically at runtime to match exact data demands.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s3-ex1',
          title: 'Demonstrating Process Memory Segments: Addresses of Stack, Heap, Data & BSS',
          code: `#include <stdio.h>
#include <stdlib.h>

/* Global variables */
int initialized_global = 42;  /* Resides in .data segment */
int uninitialized_global;     /* Resides in .bss segment */

void print_addresses(void) {
    int local_stack_var = 10; /* Resides on the Stack */
    int* heap_ptr = (int*)malloc(sizeof(int)); /* Allocated on the Heap */

    if (!heap_ptr) {
        perror("malloc failed");
        return;
    }
    *heap_ptr = 99;

    printf("================ MEMORY SEGMENT ADDRESSES ================\n");
    printf("Code / Text Segment (print_addresses) : %p\n", (void*)print_addresses);
    printf("Initialized Data Segment (.data)       : %p\n", (void*)&initialized_global);
    printf("Uninitialized Data Segment (.bss)     : %p\n", (void*)&uninitialized_global);
    printf("Heap Segment (malloc'd address)       : %p\n", (void*)heap_ptr);
    printf("Stack Segment (local_stack_var)       : %p\n", (void*)&local_stack_var);
    printf("==========================================================\n");

    /* Notice: Stack address is typically very high (e.g. 0x7ffd...),
     * while Heap is lower (e.g. 0x55b...), illustrating Stack grows downward */

    free(heap_ptr);
}

int main(void) {
    print_addresses();
    return 0;
}`,
          language: 'c',
          explanation:
            'This program prints the memory addresses of variables in different segments of the virtual address space. Notice that the stack variable has a high address (near the top of the user space), while code and globals are at lower addresses, and the heap resides between them.',
          expectedOutput:
            '================ MEMORY SEGMENT ADDRESSES ================\nCode / Text Segment (print_addresses) : 0x55...\nInitialized Data Segment (.data)       : 0x55...\nUninitialized Data Segment (.bss)     : 0x55...\nHeap Segment (malloc\'d address)       : 0x55... (heap)\nStack Segment (local_stack_var)       : 0x7ffd... (high stack address)\n==========================================================',
          lineBreakdown: [
            { lineNumber: 5, code: 'int initialized_global = 42;', explanation: 'Stored in the initialized data segment (.data).' },
            { lineNumber: 6, code: 'int uninitialized_global;', explanation: 'Stored in the uninitialized data segment (.bss), zero-initialized by OS.' },
            { lineNumber: 9, code: '    int local_stack_var = 10;', explanation: 'Local variable allocated on the current stack frame.' },
            { lineNumber: 10, code: '    int* heap_ptr = (int*)malloc(sizeof(int));', explanation: 'Allocates 4 bytes on the heap; heap_ptr holds that heap address.' },
            { lineNumber: 27, code: '    free(heap_ptr);', explanation: 'Releases the allocated heap block.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s3-m1',
          title: 'Returning Address of Local Stack Variable',
          wrongCode: `int* create_integer(int val) {
    int x = val;
    return &x; /* WRONG: x is destroyed when function returns! */
}`,
          correctCode: `int* create_integer(int val) {
    int* p = (int*)malloc(sizeof(int));
    if (p != NULL) {
        *p = val;
    }
    return p; /* CORRECT: Heap memory persists until free() */
}`,
          explanation:
            'Stack frame memory is reclaimed as soon as the function returns. Returning a pointer to a stack variable results in a dangling pointer pointing to invalidated stack space, causing silent memory corruption.',
          consequence: 'Undefined behavior, unpredictable values, and segmentation faults when calling other functions.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s3-ic1',
          title: 'Stack vs Heap: Performance and Characteristics',
          content:
            'A quintessential interview question: "Compare Stack and Heap memory allocation."\n- Speed: Stack allocation is virtually zero-cost (single CPU register instruction: sub rsp, size). Heap allocation requires algorithmic search through free-lists (O(1) to O(N)), metadata updates, and potential OS syscalls (brk/sbrk or mmap).\n- Size: Stack size is limited (typically 8MB on Linux; stack overflow if exceeded). Heap is bounded only by physical RAM and swap space.\n- Lifetime: Stack is strictly LIFO tied to function scope. Heap lifetime is manually determined by the programmer.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s3-cp1',
          title: 'Memory Segmentation & Lifetimes',
          description: 'Demonstrate comprehension of process memory segments.',
          criteria: [
            'List the 5 process memory segments and explain the purpose of each.',
            'Explain why stack memory allocation is faster than heap memory allocation.',
            'Describe the two primary limitations of static memory allocation.',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s3-rc1',
          front: 'What are the 5 major memory segments of a C program?',
          back: '1. Text (Machine instructions)\n2. Data (.data, initialized globals)\n3. BSS (.bss, uninitialized globals)\n4. Heap (Dynamic allocations, grows upward)\n5. Stack (Local variables & stack frames, grows downward)',
          topicId: 'u1-t1',
          tags: ['memory', 'segments'],
        },
        {
          id: 'u1-t1-s3-rc2',
          front: 'Why is returning a pointer to a local function variable dangerous in C?',
          back: 'Local variables live on the Stack frame. When the function returns, its stack frame is popped and invalidated. The returned pointer becomes dangling; any future function call will overwrite that memory.',
          topicId: 'u1-t1',
          tags: ['stack', 'dangling-pointer'],
        },
      ],
    },

    {
      id: 'u1-t1-s4',
      title: 'Dynamic Memory Management in C (malloc, calloc, realloc, free)',
      slug: 'c-dma-functions',
      description:
        `Dynamic memory allocation in C is executed via low-level standard library functions declared in <stdlib.h>. Unlike garbage-collected languages, C places complete responsibility for memory management in the hands of the programmer.

1. malloc() - Memory Allocation:
   void* malloc(size_t size);
   - Takes a single argument: the total number of bytes to allocate.
   - Always calculate the byte count using sizeof(type) or sizeof(*ptr) rather than hardcoding numbers, because data type sizes vary across processor architectures (e.g., pointers are 4 bytes on 32-bit systems but 8 bytes on 64-bit systems).
   - Allocates a single contiguous block of memory on the heap.
   - Returns a void* pointer pointing to the first byte of the allocated block. A void* can be assigned to any typed pointer.
   - Critical behavior: malloc DOES NOT initialize the memory; it contains unpredictable garbage values.
   - If insufficient contiguous heap memory is available, malloc returns NULL. You MUST ALWAYS check for NULL before dereferencing.

2. calloc() - Contiguous Allocation with Zero Initialization:
   void* calloc(size_t num_items, size_t size_per_item);
   - Takes two arguments: the number of elements and the size of each element in bytes.
   - Allocates num_items * size_per_item contiguous bytes.
   - Critical difference from malloc: calloc initializes every single bit in the allocated block to zero.
   - Ideal for initializing frequency arrays, lookup tables, and pointer arrays to NULL.

3. realloc() - Re-allocation (Resizing existing blocks):
   void* realloc(void* ptr, size_t new_size);
   - Modifies the size of a previously allocated heap block pointed to by ptr.
   - If new_size is larger, realloc attempts to expand the existing block in place. If contiguous space is blocked, it allocates a new block elsewhere, copies the existing data, automatically frees the old block, and returns the new pointer.
   - If ptr is NULL, realloc behaves exactly like malloc(new_size).
   - If new_size is 0 and ptr is not NULL, behavior is implementation-defined (often equivalent to free(ptr)).
   - CRITICAL TRAP: If realloc fails to find enough memory, it returns NULL, BUT LEAVES THE ORIGINAL BLOCK INTACT. If you write: ptr = realloc(ptr, new_size); and it returns NULL, you have overwritten your only pointer to the original block, causing an immediate, irrecoverable memory leak! Always use a temporary pointer:
     void* temp = realloc(ptr, new_size);
     if (temp != NULL) ptr = temp;

4. free() - Deallocation:
   void free(void* ptr);
   - Releases the block of heap memory pointed to by ptr back to the allocator.
   - Takes a single argument: a pointer returned previously by malloc, calloc, or realloc.
   - Passing a NULL pointer to free() is safe and does nothing.
   - How does free() know how many bytes to release? The memory allocator stores a hidden header (chunk metadata) immediately preceding the address returned to the user, containing the chunk size and allocation flags.

5. Dynamic 2D Arrays / Matrices:
   In C, a dynamic matrix of rows x cols can be allocated in two ways:
   - Method A (Array of Pointers): Allocate an array of row pointers (int** matrix = malloc(rows * sizeof(int*))), then allocate each row (matrix[i] = malloc(cols * sizeof(int))). This allows jagged matrices and conventional matrix[r][c] notation, but requires row-by-row freeing.
   - Method B (Contiguous Flattened Array): Allocate a single block (int* matrix = malloc(rows * cols * sizeof(int))) and index elements via matrix[r * cols + c]. This provides maximum cache locality and requires only a single free() call.`,
      keyPoints: [
        'malloc(size_t size) allocates uninitialized raw bytes on the heap and returns void* (or NULL on failure).',
        'calloc(size_t num, size_t size) allocates memory for num elements of given size and zeroes all bits.',
        'Always check if the returned pointer is NULL before attempting to read or write to allocated memory.',
        'realloc(ptr, new_size) resizes an allocated block, preserving data up to the minimum of old and new sizes.',
        'Never assign the return value of realloc directly to the original pointer (ptr = realloc(ptr, ...)); use a temporary pointer to prevent memory leaks if realloc fails.',
        'free(ptr) returns heap memory to the allocator. Passing NULL to free is safe, but passing an already-freed pointer or non-heap address triggers undefined behavior.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s4-ex1',
          title: 'Dynamic 1D Array Allocation with malloc, calloc & Pointer Arithmetic',
          code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;

    /* Allocate array of 5 integers using malloc (contains garbage values) */
    int* m_arr = (int*)malloc(n * sizeof(int));
    if (m_arr == NULL) {
        fprintf(stderr, "malloc failed to allocate memory!\n");
        return EXIT_FAILURE;
    }

    /* Allocate array of 5 integers using calloc (all elements guaranteed 0) */
    int* c_arr = (int*)calloc(n, sizeof(int));
    if (c_arr == NULL) {
        fprintf(stderr, "calloc failed to allocate memory!\n");
        free(m_arr); /* Clean up previously allocated memory */
        return EXIT_FAILURE;
    }

    printf("Values in calloc'd array (all zeroes):\n");
    for (int i = 0; i < n; i++) {
        /* Array indexing notation c_arr[i] is identical to *(c_arr + i) */
        printf("c_arr[%d] = %d\n", i, c_arr[i]);
    }

    /* Populate malloc array using pointer arithmetic */
    for (int i = 0; i < n; i++) {
        *(m_arr + i) = (i + 1) * 10;
    }

    printf("\nValues in malloc'd array after assignment (pointer arithmetic):\n");
    for (int i = 0; i < n; i++) {
        printf("*(m_arr + %d) = %d (at %p)\n", i, *(m_arr + i), (void*)(m_arr + i));
    }

    /* Clean up allocated heap memory */
    free(m_arr);
    m_arr = NULL; /* Prevent dangling pointer */

    free(c_arr);
    c_arr = NULL;

    return EXIT_SUCCESS;
}`,
          language: 'c',
          explanation:
            'This program illustrates the practical differences between malloc() and calloc(). While calloc zeroes out the allocated memory block, malloc leaves it uninitialized. It also highlights pointer arithmetic *(m_arr + i) as completely interchangeable with array indexing m_arr[i].',
          expectedOutput:
            'Values in calloc\'d array (all zeroes):\nc_arr[0] = 0\nc_arr[1] = 0\nc_arr[2] = 0\nc_arr[3] = 0\nc_arr[4] = 0\n\nValues in malloc\'d array after assignment (pointer arithmetic):\n*(m_arr + 0) = 10 (at 0x...)\n*(m_arr + 1) = 20 (at 0x...)\n*(m_arr + 2) = 30 (at 0x...)\n*(m_arr + 3) = 40 (at 0x...)\n*(m_arr + 4) = 50 (at 0x...)',
          lineBreakdown: [
            { lineNumber: 8, code: '    int* m_arr = (int*)malloc(n * sizeof(int));', explanation: 'Allocates 5 * 4 = 20 contiguous bytes on the heap.' },
            { lineNumber: 9, code: '    if (m_arr == NULL) {', explanation: 'Mandatory defensive check to ensure allocation succeeded.' },
            { lineNumber: 15, code: '    int* c_arr = (int*)calloc(n, sizeof(int));', explanation: 'Allocates 20 bytes and initializes every byte to 0.' },
            { lineNumber: 30, code: '        *(m_arr + i) = (i + 1) * 10;', explanation: 'Pointer arithmetic: advances address by i * sizeof(int) bytes.' },
            { lineNumber: 39, code: '    free(m_arr); m_arr = NULL;', explanation: 'Releases heap memory and sets pointer to NULL to prevent dangling reference.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
        {
          id: 'u1-t1-s4-ex2',
          title: 'Safe Dynamic Resizing Using realloc with Temporary Pointer',
          code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int initial_capacity = 3;
    int* numbers = (int*)malloc(initial_capacity * sizeof(int));
    if (!numbers) {
        perror("Initial malloc failed");
        return EXIT_FAILURE;
    }

    numbers[0] = 100;
    numbers[1] = 200;
    numbers[2] = 300;
    printf("Initial array capacity: %d\n", initial_capacity);

    /* We need to double the capacity to store 6 elements */
    int new_capacity = 6;

    /* SAFE IDIOM: Use temporary pointer to catch potential realloc failure */
    int* temp = (int*)realloc(numbers, new_capacity * sizeof(int));
    if (temp == NULL) {
        /* Allocation failed, but original 'numbers' pointer and its data are still intact! */
        fprintf(stderr, "realloc failed! Original memory preserved.\n");
        free(numbers);
        return EXIT_FAILURE;
    }

    /* Only assign back once success is guaranteed */
    numbers = temp;

    /* Populate the newly expanded elements */
    numbers[3] = 400;
    numbers[4] = 500;
    numbers[5] = 600;

    printf("Resized array capacity: %d\n", new_capacity);
    for (int i = 0; i < new_capacity; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }

    free(numbers);
    numbers = NULL;
    return EXIT_SUCCESS;
}`,
          language: 'c',
          explanation:
            'This program shows the textbook-correct idiom for realloc(). If realloc fails due to out-of-memory, it returns NULL but leaves the original block untouched. By storing the return value in a temporary pointer temp, we prevent destroying the original pointer numbers.',
          expectedOutput:
            'Initial array capacity: 3\nResized array capacity: 6\nnumbers[0] = 100\nnumbers[1] = 200\nnumbers[2] = 300\nnumbers[3] = 400\nnumbers[4] = 500\nnumbers[5] = 600',
          lineBreakdown: [
            { lineNumber: 6, code: '    int* numbers = (int*)malloc(initial_capacity * sizeof(int));', explanation: 'Allocates initial buffer for 3 integers.' },
            { lineNumber: 19, code: '    int* temp = (int*)realloc(numbers, new_capacity * sizeof(int));', explanation: 'Attempts to resize block to hold 6 integers using a temporary pointer.' },
            { lineNumber: 20, code: '    if (temp == NULL) {', explanation: 'Checks for failure without overwriting the existing pointer.' },
            { lineNumber: 28, code: '    numbers = temp;', explanation: 'Safely rebinds pointer to the newly allocated or extended buffer.' },
            { lineNumber: 39, code: '    free(numbers); numbers = NULL;', explanation: 'Deallocates entire resized block.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
        {
          id: 'u1-t1-s4-ex3',
          title: 'Dynamic 2D Matrix Multiplication & Deallocation (PES Slide 34 Challenge)',
          code: `#include <stdio.h>
#include <stdlib.h>

/* Allocate a 2D matrix of dimensions rows x cols dynamically */
int** allocate_matrix(int rows, int cols) {
    int** matrix = (int**)malloc(rows * sizeof(int*));
    if (!matrix) return NULL;

    for (int i = 0; i < rows; i++) {
        matrix[i] = (int*)calloc(cols, sizeof(int));
        if (!matrix[i]) {
            /* If any row fails, free previously allocated rows to prevent memory leak */
            for (int j = 0; j < i; j++) free(matrix[j]);
            free(matrix);
            return NULL;
        }
    }
    return matrix;
}

/* Free a dynamically allocated 2D matrix */
void free_matrix(int** matrix, int rows) {
    if (!matrix) return;
    for (int i = 0; i < rows; i++) {
        free(matrix[i]);
    }
    free(matrix);
}

/* Multiply matrix A (r1 x c1) and matrix B (r2 x c2) into result C (r1 x c2) */
void multiply_matrices(int** A, int** B, int** C, int r1, int c1, int c2) {
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

void print_matrix(int** matrix, int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            printf("%4d ", matrix[i][j]);
        }
        printf("\n");
    }
}

int main(void) {
    int r1 = 2, c1 = 3;
    int r2 = 3, c2 = 2;

    int** A = allocate_matrix(r1, c1);
    int** B = allocate_matrix(r2, c2);
    int** C = allocate_matrix(r1, c2);

    if (!A || !B || !C) {
        fprintf(stderr, "Matrix memory allocation failed!\n");
        free_matrix(A, r1);
        free_matrix(B, r2);
        free_matrix(C, r1);
        return EXIT_FAILURE;
    }

    /* Initialize Matrix A (2x3) */
    A[0][0] = 1; A[0][1] = 2; A[0][2] = 3;
    A[1][0] = 4; A[1][1] = 5; A[1][2] = 6;

    /* Initialize Matrix B (3x2) */
    B[0][0] = 7;  B[0][1] = 8;
    B[1][0] = 9;  B[1][1] = 1;
    B[2][0] = 2;  B[2][1] = 3;

    printf("Matrix A (2x3):\n");
    print_matrix(A, r1, c1);

    printf("\nMatrix B (3x2):\n");
    print_matrix(B, r2, c2);

    multiply_matrices(A, B, C, r1, c1, c2);

    printf("\nProduct Matrix C = A x B (2x2):\n");
    print_matrix(C, r1, c2);

    /* Free all dynamically allocated matrices */
    free_matrix(A, r1);
    free_matrix(B, r2);
    free_matrix(C, r1);

    return EXIT_SUCCESS;
}`,
          language: 'c',
          explanation:
            'This complete implementation solves the exact challenge assigned on Slide 34 of Unit 1 ("Multiply two matrices. Allocate the memory for the matrices dynamically"). It demonstrates defensive row allocation with rollback on failure, proper matrix multiplication, and clean two-level deallocation.',
          expectedOutput:
            'Matrix A (2x3):\n   1    2    3 \n   4    5    6 \n\nMatrix B (3x2):\n   7    8 \n   9    1 \n   2    3 \n\nProduct Matrix C = A x B (2x2):\n  31   19 \n  85   55 ',
          lineBreakdown: [
            { lineNumber: 5, code: 'int** allocate_matrix(int rows, int cols) {', explanation: 'Creates a 2D dynamic array using pointer-to-pointer.' },
            { lineNumber: 6, code: '    int** matrix = (int**)malloc(rows * sizeof(int*));', explanation: 'Allocates array of pointers to rows.' },
            { lineNumber: 10, code: '        matrix[i] = (int*)calloc(cols, sizeof(int));', explanation: 'Allocates memory for each individual row of integers.' },
            { lineNumber: 13, code: '            for (int j = 0; j < i; j++) free(matrix[j]);', explanation: 'Rollback cleanup: frees previous rows if an intermediate allocation fails.' },
            { lineNumber: 22, code: 'void free_matrix(int** matrix, int rows) {', explanation: 'Frees each row buffer before freeing the row pointer array itself.' },
            { lineNumber: 31, code: 'void multiply_matrices(...)', explanation: 'Calculates dot product of rows and columns in O(r1 * c2 * c1) time.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s4-m1',
          title: 'Direct Assignment to realloc Pointer (Memory Leak on Failure)',
          wrongCode: 'ptr = (int*)realloc(ptr, new_size * sizeof(int));',
          correctCode: `int* temp = (int*)realloc(ptr, new_size * sizeof(int));
if (temp != NULL) {
    ptr = temp;
} else {
    /* Handle error; ptr is still valid and must be freed */
    free(ptr);
}`,
          explanation:
            'If realloc fails to allocate the requested size, it returns NULL while leaving the original memory block untouched. By assigning the return value directly to ptr, ptr becomes NULL, losing all references to the original block and causing an unrecoverable memory leak.',
          consequence: 'Silent memory leaks leading to exhaustion of heap space in long-running services.',
        },
        {
          id: 'u1-t1-s4-m2',
          title: 'Incorrect 2D Matrix Deallocation Order',
          wrongCode: `free(matrix); /* WRONG: Frees the pointer array first! */
for (int i = 0; i < rows; i++) {
    free(matrix[i]); /* ILLEGAL: matrix has already been deallocated! */
}`,
          correctCode: `for (int i = 0; i < rows; i++) {
    free(matrix[i]); /* First free each row */
}
free(matrix); /* Then free the array of row pointers */`,
          explanation:
            'If you free the outer array of row pointers first, matrix becomes invalid memory. Accessing matrix[i] in subsequent loop iterations is a Use-After-Free violation.',
          consequence: 'Heap corruption, crash, or undefined behavior.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s4-ic1',
          title: 'malloc() vs calloc(): Performance and Zero Initialization',
          content:
            'Interviewers often ask: "Is calloc just malloc + memset(0)?"\nAt the conceptual level, yes. However, modern operating systems optimize calloc(): when allocating large chunks, the OS provides anonymous memory pages that are already zeroed by the kernel for security. The runtime avoids an explicit CPU memset loop, making large calloc() calls faster than malloc() + memset(). For small allocations, calloc does clear the bytes.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
        {
          id: 'u1-t1-s4-ic2',
          title: 'How does free() know how much memory to deallocate?',
          content:
            'When you call free(p), you only pass the pointer address, not the size. The memory allocator (like glibc ptmalloc) prepends a hidden chunk header (metadata) immediately before the memory block returned to you. The header stores the total chunk size, allocation flags (in-use bit), and neighboring block pointers. free() reads (char*)p - HEADER_SIZE to inspect the metadata.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s4-cp1',
          title: 'Mastery of C DMA Functions',
          description: 'Verify proper usage of dynamic memory allocation and deallocation.',
          criteria: [
            'Differentiate between malloc(), calloc(), and realloc() in terms of parameters and initialization.',
            'Explain the safe idiom for handling realloc() return values.',
            'Write the correct sequence for allocating and freeing a dynamic 2D array.',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s4-rc1',
          front: 'What are the parameter and return value differences between malloc() and calloc()?',
          back: 'malloc(size_t size) takes total bytes and returns uninitialized memory. calloc(size_t num, size_t size) takes number of elements and element size, and zero-initializes all bytes. Both return void* or NULL on failure.',
          topicId: 'u1-t1',
          tags: ['malloc', 'calloc', 'dma'],
        },
        {
          id: 'u1-t1-s4-rc2',
          front: 'What happens if realloc() fails, and why is ptr = realloc(ptr, size) dangerous?',
          back: 'If realloc fails, it returns NULL but leaves the original memory block intact. Assigning directly to ptr destroys the reference to the original block, causing an irrecoverable memory leak.',
          topicId: 'u1-t1',
          tags: ['realloc', 'memory-leak'],
        },
        {
          id: 'u1-t1-s4-rc3',
          front: 'Is calling free(NULL) legal in C?',
          back: 'Yes! The C standard (ISO C99/C11) explicitly specifies that calling free(NULL) is a safe no-op that does nothing.',
          topicId: 'u1-t1',
          tags: ['free', 'standards'],
        },
      ],
    },

    {
      id: 'u1-t1-s5',
      title: 'Memory Pitfalls, Vulnerabilities & Best Practices',
      slug: 'memory-pitfalls-and-bugs',
      description:
        `Because C provides raw direct memory access without automatic runtime bounds-checking or garbage collection, memory-related bugs are the most common source of catastrophic software crashes, security vulnerabilities (CVEs), and performance degradation in production systems. Mastering dynamic data structures requires mastering the diagnostic avoidance of these five critical bugs:

1. Dangling Pointer (Use-After-Free):
A dangling pointer is a pointer that continues to reference a memory address after that memory block has been released by free().
- Hazard: The operating system does not zero or delete pointers when memory is freed; the pointer variable still contains the old memory address. If your code dereferences this pointer, it reads stale data or overwrites new objects that the allocator has assigned to that exact address.
- Best Practice: Always set a pointer to NULL immediately after freeing it:
  free(ptr);
  ptr = NULL;

2. Memory Leak:
A memory leak occurs when heap memory is allocated, but all pointer references to that memory are overwritten, lost, or fall out of scope without calling free().
- Hazard: The unreferenced memory remains marked as "in use" by the allocator. In a long-running system (e.g., web servers, operating systems), progressive memory leaks consume all available RAM, degrading performance and eventually causing the OS Out-Of-Memory (OOM) killer to terminate the process.
- Best Practice: Every malloc(), calloc(), and successful realloc() must have exactly one corresponding free() along every possible execution path (including error exits).

3. Double Free:
A double free occurs when free() is invoked multiple times on the same memory address without an intervening allocation.
- Hazard: The first free() returns the chunk to the allocator's free-list. The second free() corrupts the internal free-list metadata (e.g., creating a cycle in the free-list bin). Attackers exploit double-free bugs to achieve arbitrary code execution.
- Best Practice: Setting ptr = NULL after free prevents double frees, because free(NULL) is guaranteed to be safe.

4. Neglecting NULL Return Check:
If a system runs out of physical memory or swap, malloc/calloc/realloc returns NULL. Dereferencing a NULL pointer immediately triggers an uncatchable hardware exception (Segmentation Fault / SIGSEGV).
- Best Practice: Always check if (ptr == NULL) immediately after every allocation.

5. Sizing Mismatches & Buffer Overruns:
- Allocating sizeof(int*) instead of sizeof(int): On 64-bit systems, a pointer is 8 bytes while an int is 4 bytes. While this wastes space, the reverse (allocating sizeof(char*) when allocating a large struct) causes heap buffer overflow.
- Idiom for safety: Always allocate using the dereferenced pointer syntax:
  p = malloc(n * sizeof(*p));
  This guarantees that even if the type of p is modified during a refactor, the sizeof expression automatically reflects the correct type!`,
      keyPoints: [
        'A Dangling Pointer points to deallocated memory. Protect against Use-After-Free by setting pointers to NULL immediately after calling free().',
        'A Memory Leak occurs when memory is allocated but never freed before references are lost. Every allocation must have an associated free path.',
        'Double Free occurs when free() is called twice on the same pointer, causing heap corruption and severe security vulnerabilities.',
        'Always check the return value of malloc/calloc/realloc against NULL before dereferencing.',
        'Use the idiomatic sizeof(*ptr) pattern (e.g., p = malloc(count * sizeof(*p))) to ensure type-safe allocation that survives future refactors.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s5-ex1',
          title: 'Defensive Memory Management: Avoiding Dangling Pointers & Leaks',
          code: `#include <stdio.h>
#include <stdlib.h>

/* Safe deallocation macro */
#define SAFE_FREE(p) do { free(p); (p) = NULL; } while(0)

struct SensorData {
    int id;
    double reading;
};

void process_data(void) {
    struct SensorData* sensor = (struct SensorData*)malloc(sizeof(*sensor));
    if (sensor == NULL) {
        perror("Allocation failed");
        return;
    }

    sensor->id = 101;
    sensor->reading = 98.6;
    printf("Sensor %d reading: %.2f\n", sensor->id, sensor->reading);

    /* Use safe free idiom: frees memory AND nullifies pointer atomically */
    SAFE_FREE(sensor);

    /* Subsequent checks protect against Use-After-Free */
    if (sensor == NULL) {
        printf("Pointer safely nullified. Cannot accidentally dereference.\n");
    }

    /* Calling free on NULL is standard-compliant and completely harmless */
    SAFE_FREE(sensor);
    printf("Second SAFE_FREE(sensor) safely ignored.\n");
}

int main(void) {
    process_data();
    return 0;
}`,
          language: 'c',
          explanation:
            'This example shows the industry-standard SAFE_FREE macro pattern. By encapsulating free(p) and (p) = NULL within a do-while(0) block, the pointer is guaranteed to be set to NULL immediately upon release, making accidental Use-After-Free impossible to trigger undetected and preventing double-free crashes.',
          expectedOutput:
            'Sensor 101 reading: 98.60\nPointer safely nullified. Cannot accidentally dereference.\nSecond SAFE_FREE(sensor) safely ignored.',
          lineBreakdown: [
            { lineNumber: 5, code: '#define SAFE_FREE(p) do { free(p); (p) = NULL; } while(0)', explanation: 'Robust macro freeing memory and nullifying the pointer.' },
            { lineNumber: 13, code: '    struct SensorData* sensor = (struct SensorData*)malloc(sizeof(*sensor));', explanation: 'Type-safe allocation using sizeof(*sensor).' },
            { lineNumber: 24, code: '    SAFE_FREE(sensor);', explanation: 'Releases heap memory and sets sensor to NULL.' },
            { lineNumber: 32, code: '    SAFE_FREE(sensor);', explanation: 'Safely passes NULL to free without crashing.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s5-m1',
          title: 'Memory Leak via Overwritten Pointer',
          wrongCode: `int* ptr = (int*)malloc(10 * sizeof(int));
/* ... operations ... */
ptr = (int*)malloc(20 * sizeof(int)); /* LEAK: Original 10 ints lost forever! */
free(ptr);`,
          correctCode: `int* ptr = (int*)malloc(10 * sizeof(int));
/* ... operations ... */
free(ptr); /* First release original buffer */
ptr = (int*)malloc(20 * sizeof(int));
free(ptr);`,
          explanation:
            'Assigning a new malloc address to an existing pointer variable without freeing the previous block severs the only link to that heap block, causing an instant memory leak.',
          consequence: 'Permanently leaked heap memory that cannot be reclaimed until process termination.',
        },
        {
          id: 'u1-t1-s5-m2',
          title: 'Dangling Pointer Dereference (Use-After-Free)',
          wrongCode: `int* p = (int*)malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\\n", *p); /* BUG: Accessing freed memory! */`,
          correctCode: `int* p = (int*)malloc(sizeof(int));
*p = 42;
free(p);
p = NULL; /* Neutralize pointer */
if (p != NULL) {
    printf("%d\\n", *p);
}`,
          explanation:
            'Calling free(p) tells the allocator that memory is available for reuse. The memory content may remain temporarily unchanged or be overwritten immediately by other threads/allocations. Accessing it is a Use-After-Free security vulnerability.',
          consequence: 'Intermittent, impossible-to-reproduce crashes, corrupted calculations, and security exploits.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s5-ic1',
          title: 'Valgrind and AddressSanitizer in Systems Debugging',
          content:
            'In modern C/C++ development and PESU labs, memory bugs are detected using tools like Valgrind (Memcheck) or GCC/Clang AddressSanitizer (-fsanitize=address -g). In an interview, mention that you use ASan or Valgrind to automatically verify zero memory leaks and zero invalid reads/writes.',
          relatedTopicIds: ['u1-t1'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s5-cp1',
          title: 'Diagnosing Memory Bugs',
          description: 'Identify and remedy memory leaks, dangling pointers, and double frees.',
          criteria: [
            'Define dangling pointer, memory leak, and double free with minimal code reproductions.',
            'Explain how the SAFE_FREE macro prevents use-after-free and double-free errors.',
            'Explain why defensive NULL checking after malloc is non-negotiable.',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s5-rc1',
          front: 'What is a Dangling Pointer and how is it prevented?',
          back: 'A dangling pointer points to memory that has already been deallocated by free(). It is prevented by setting the pointer to NULL immediately after freeing: `free(p); p = NULL;`.',
          topicId: 'u1-t1',
          tags: ['dangling-pointer', 'uaf', 'best-practices'],
        },
        {
          id: 'u1-t1-s5-rc2',
          front: 'What is a Memory Leak and what is its consequence?',
          back: 'A memory leak occurs when dynamically allocated memory is no longer referenced but never freed. Over time, it exhausts available system RAM, causing application slowdowns or process termination by the OS Out-Of-Memory (OOM) killer.',
          topicId: 'u1-t1',
          tags: ['memory-leak', 'heap'],
        },
        {
          id: 'u1-t1-s5-rc3',
          front: 'Why is `sizeof(*ptr)` preferred over `sizeof(TypeName)` in malloc calls?',
          back: '`p = malloc(n * sizeof(*p))` is self-maintaining. If the variable type of `p` changes later (e.g. from float* to double*), the malloc line automatically adjusts its size correctly without editing.',
          topicId: 'u1-t1',
          tags: ['sizeof', 'idiom', 'safety'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u1-t1-q99',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      question: 'What is the output of the following XOR-swap using pointers?',
      code: 'void swap(int *a, int *b) {\n  *a ^= *b;\n  *b ^= *a;\n  *a ^= *b;\n}\nint main() {\n  int x = 5, y = 10;\n  swap(&x, &y);\n  printf("%d %d", x, y);\n}',
      correctAnswer: '10 5',
      explanation: 'The XOR swap algorithm safely swaps two integers without a temporary variable. Passing pointers ensures the original variables in main are modified.',
      tags: ['pointers', 'bitwise']
    },
    {
      id: 'u1-t1-q100',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'What does sizeof() return for a pointer variable on a typical 64-bit architecture?',
      options: ['4 bytes', '8 bytes', 'Depends on the type it points to', '1 byte'],
      correctAnswer: '8 bytes',
      explanation: 'On a 64-bit architecture, a memory address is 64 bits (8 bytes) long, regardless of whether it points to a char, int, or struct.',
      tags: ['pointers', 'sizeof']
    },
    {
      id: 'u1-t1-q1',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'Which standard library header file must be included to use malloc(), calloc(), realloc(), and free() in C?',
      options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<memory.h>'],
      correctAnswer: '<stdlib.h>',
      explanation:
        'All dynamic memory allocation functions (malloc, calloc, realloc, free) as well as process termination functions (exit) are declared in <stdlib.h>.',
      tags: ['dma', 'headers', 'c-basics'],
    },
    {
      id: 'u1-t1-q2',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'What happens if malloc() is unable to allocate the requested amount of memory on the heap?',
      options: [
        'It throws a bad_alloc runtime exception',
        'It terminates the program with an exit status of -1',
        'It returns a NULL pointer',
        'It wraps around and returns memory from the stack',
      ],
      correctAnswer: 'It returns a NULL pointer',
      explanation:
        'In C, malloc() does not throw exceptions. When insufficient contiguous heap memory is available, it returns a NULL pointer (void* 0). This is why checking for NULL is essential before dereferencing.',
      tags: ['malloc', 'null-check', 'heap'],
    },
    {
      id: 'u1-t1-q3',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'How does calloc(10, sizeof(int)) differ fundamentally from malloc(10 * sizeof(int))?',
      options: [
        'calloc allocates memory on the stack whereas malloc allocates on the heap',
        'calloc initializes every byte of the allocated memory to zero, whereas malloc leaves memory uninitialized',
        'calloc cannot fail whereas malloc can fail',
        'calloc can only be freed using cfree()',
      ],
      correctAnswer: 'calloc initializes every byte of the allocated memory to zero, whereas malloc leaves memory uninitialized',
      explanation:
        'malloc() leaves the allocated bytes untouched, meaning they contain arbitrary residual garbage values. calloc() guarantees that all bits in the allocated block are zeroed.',
      tags: ['malloc', 'calloc', 'initialization'],
    },
    {
      id: 'u1-t1-q4',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'What is the output of the following C program?',
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int* p = (int*)calloc(3, sizeof(int));
    p[0] = 5;
    *(p + 1) = p[0] + 10;
    *(p + 2) = *(p + 1) * 2;
    printf("%d %d %d\n", p[0], p[1], p[2]);
    free(p);
    return 0;
}`,
      options: ['5 15 30', '5 10 20', '0 0 0', 'Garbage values'],
      correctAnswer: '5 15 30',
      explanation:
        'p[0] is assigned 5. *(p + 1) is equivalent to p[1], which receives 5 + 10 = 15. *(p + 2) is equivalent to p[2], which receives 15 * 2 = 30. All values are printed sequentially.',
      tags: ['pointer-arithmetic', 'calloc', 'predict-output'],
    },
    {
      id: 'u1-t1-q5',
      type: 'spot-bug',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      question: 'Identify the critical bug in this reallocation code snippet:',
      code: `int* arr = (int*)malloc(10 * sizeof(int));
/* ... work with arr ... */
arr = (int*)realloc(arr, 50000000000ULL * sizeof(int));
if (arr == NULL) {
    printf("Reallocation failed!\n");
}`,
      options: [
        'realloc cannot increase the size of an array',
        'Directly assigning realloc return value to arr leaks the original 10 ints if realloc fails and returns NULL',
        'sizeof(int) cannot be multiplied with unsigned long long',
        'malloc must use calloc before realloc',
      ],
      correctAnswer: 'Directly assigning realloc return value to arr leaks the original 10 ints if realloc fails and returns NULL',
      explanation:
        'If realloc fails (which is certain for 50 billion integers), it returns NULL. Because the return value is directly stored into `arr`, the pointer to the original 10 integers is overwritten with NULL, making it impossible to free the original block.',
      tags: ['realloc', 'memory-leak', 'spot-bug'],
    },
    {
      id: 'u1-t1-q6',
      type: 'true-false',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'Calling free(NULL) in a C program causes a Segmentation Fault.',
      correctAnswer: false,
      explanation:
        'False. The C standard (ISO/IEC 9899) explicitly specifies that if the argument passed to free() is a NULL pointer, no action occurs and the function safely returns.',
      tags: ['free', 'standards', 'true-false'],
    },
    {
      id: 'u1-t1-q101',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'Comment on the following function when called as: int a[] = {1,2,3,4,5}; disp(a, a+5);',
      code: `void disp(int* f, int* l) {
    while(f != l) {
        printf("%d\\n", *f);
        ++f;
    }
}`,
      options: [
        'Syntax error; size of array not specified',
        'Runtime error; a+5 is a dangling pointer',
        'Perfectly correct; no error',
        'Runtime error; dangling pointer dereferenced'
      ],
      correctAnswer: 'Perfectly correct; no error',
      explanation: 'a+5 is a valid one-past-the-end sentinel pointer. The loop stops before dereferencing it. This is standard C idiom for iterating over an array using pointer arithmetic.',
      tags: ['pointers', 'arrays', 'pointer-arithmetic'],
    },
    {
      id: 'u1-t1-q102',
      type: 'spot-bug',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      question: 'Comment on the following code when called as: int a = 10; int b = 20; what(&a, &a); — what are the values of a and b?',
      code: `void what(int* x, int* y) {
    *x = *x ^ *y;
    *y = *x ^ *y;
    *x = *x ^ *y;
}`,
      options: ['10 20', '20 10', '0 0', 'None of these'],
      correctAnswer: '0 0',
      explanation: 'When x and y alias the same variable (both are &a), the XOR trick self-destructs. After step 1: *x = a^a = 0. After step 2: *y = 0^0 = 0. After step 3: *x = 0^0 = 0. Both a and b are 0. This is the classic aliasing bug with XOR swap.',
      tags: ['pointers', 'bitwise', 'aliasing-bug'],
    },
    {
      id: 'u1-t1-q103',
      type: 'spot-bug',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'Comment on the following code:',
      code: `void what() {
    int *p;
    {
        int a = 10;
        p = &a;
    }
    printf("%d\\n", *p);
}`,
      options: [
        'Prints 10',
        'Creates garbage',
        'Creates a dangling reference and dereferences it',
        'Creates aliases'
      ],
      correctAnswer: 'Creates a dangling reference and dereferences it',
      explanation: 'a is a local variable that goes out of scope when the inner block ends. p now points to deallocated stack memory — a dangling pointer. Dereferencing it is undefined behavior.',
      tags: ['pointers', 'dangling-pointer', 'scope'],
    },
    {
      id: 'u1-t1-q104',
      type: 'spot-bug',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'Comment on the following code — assume malloc succeeds.',
      code: `void what() {
    int *p = (int*)malloc(sizeof(int));
    *p = 111;
}`,
      options: [
        'No error; memory reclaimed when function terminates',
        'Creates garbage and therefore a memory leak',
        'Creates a dangling reference',
        'Creates aliases'
      ],
      correctAnswer: 'Creates garbage and therefore a memory leak',
      explanation: 'malloc allocates from the heap. Unlike stack memory, heap memory is NOT automatically reclaimed when a function returns. Since p is a local variable, the pointer is lost but the memory remains allocated — a classic memory leak.',
      tags: ['malloc', 'memory-leak', 'dma'],
    },
    {
      id: 'u1-t1-q105',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'int a[10]; declared globally (outside main). What can we say about the array a?',
      options: [
        'All elements will be initialized to 0',
        'All elements will have the same garbage value',
        'Each element will have a distinct garbage value',
        'Results in a syntax error'
      ],
      correctAnswer: 'All elements will be initialized to 0',
      explanation: 'Global and static arrays in C are zero-initialized at program startup by the C runtime. Only local (stack) arrays contain garbage if not explicitly initialized.',
      tags: ['arrays', 'initialization', 'globals'],
    },
    {
      id: 'u1-t1-q106',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'What happens in the following code?',
      code: `int a[] = {10,20,30,40,50};
int *p = a+2;
int x = *p++;`,
      options: [
        'x becomes 31; p unchanged',
        'x becomes 30; p points to a[3]',
        'Syntax error',
        'x becomes 40; p points to a[3]'
      ],
      correctAnswer: 'x becomes 30; p points to a[3]',
      explanation: 'Post-increment: *p++ first dereferences p (gets 30 = a[2]), then increments p to point to a[3]. x = 30, p -> a[3].',
      tags: ['arrays', 'pointers', 'pointer-arithmetic'],
    },
    {
      id: 'u1-t1-q107',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'What is the value of a == b in the following code?',
      code: `int a[] = {1,2,3};
int b[] = {1,2,3};`,
      options: [
        'Syntax error; arrays cannot be compared',
        '1, as both contain the same elements',
        '0, as both point to different memory locations',
        'None of these'
      ],
      correctAnswer: '0, as both point to different memory locations',
      explanation: 'In C, array names decay to pointers to their first elements. a and b point to different memory locations, so a == b compares pointers, which are different. Result is 0 (false). This does NOT compare element values.',
      tags: ['arrays', 'pointers', 'equality'],
    },
    {
      id: 'u1-t1-q108',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'sizeof(int) is 4 bytes. What is the value of p-a in the following code?',
      code: `int a[] = {10,20,30,40,50};
int *p = a+5;`,
      options: [
        '20',
        '5',
        'Depends on implementation',
        'Error: pointer minus array not allowed'
      ],
      correctAnswer: '5',
      explanation: 'Pointer subtraction gives the number of ELEMENTS between the two pointers, not bytes. p = a+5, so p-a = 5 regardless of sizeof(int). This is always measured in elements.',
      tags: ['arrays', 'pointers', 'pointer-arithmetic'],
    },
    {
      id: 'u1-t1-q109',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'int a[5][4]; — counting from 0, what is the position (flat index) of a[3][2]?',
      options: ['14', '17', '13', 'None of these'],
      correctAnswer: '14',
      explanation: 'Row-major order: position = row * num_cols + col = 3*4 + 2 = 12 + 2 = 14.',
      tags: ['arrays', '2d-arrays', 'memory-layout'],
    },
    {
      id: 'u1-t1-q110',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'If sizeof(int)=4 and sizeof(char)=1, what is sizeof(struct what)?',
      code: `struct what {
    char ch;
    int n;
};`,
      options: ['5', '8', 'Depends on the compiler', 'None of these'],
      correctAnswer: 'Depends on the compiler',
      explanation: 'Structure padding is implementation-defined and depends on the compiler and architecture. The compiler may add 3 bytes of padding after ch to align n on a 4-byte boundary, giving 8. But this depends on the compiler.',
      tags: ['structures', 'sizeof', 'memory-alignment'],
    },
    {
      id: 'u1-t1-q111',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      question: 'How do you refer to the 5th element of a in the 2nd element of c (counting from 0)?',
      code: `struct what {
    int a[10];
    double b;
} c[5];`,
      options: ['c[1].a[4]', 'c[1]->a[4]', 'c.a[1][4]', 'c[1][4].a'],
      correctAnswer: 'c[1].a[4]',
      explanation: 'c is an array of structs (not a pointer), so use dot notation. c[1] is the 2nd element (index 1). c[1].a[4] is the 5th element (index 4) of its a array.',
      tags: ['structures', 'arrays', 'syntax'],
    }
  ],

  programmingProblems: [
    {
      id: 'u1-t1-p1',
      title: 'Dynamic Array Statistics and Reversal',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that reads an integer N from the user, dynamically allocates an array of N integers using malloc() or calloc(), reads N integers into the array, calculates and prints the Minimum, Maximum, and Average of the elements, reverses the array in-place, prints the reversed array, and properly deallocates all memory.',
      constraints: [
        '1 <= N <= 100,000',
        'Elements are 32-bit signed integers',
        'Memory must be allocated dynamically on the heap and freed with zero leaks',
      ],
      sampleInput: '5\n10 40 20 50 30',
      sampleOutput: 'Min: 10\nMax: 50\nAvg: 30.00\nReversed: 30 50 20 40 10',
      hints: [
        'Check if the pointer returned by malloc() is NULL before using it.',
        'Use two pointers (left and right) moving inward to reverse the array in-place with O(1) auxiliary memory.',
        'Remember to free the array at the end of the program and set the pointer to NULL.',
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

void reverse_array(int* arr, int n) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) {
        return 1;
    }

    int* arr = (int*)malloc(n * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        return 1;
    }

    long long sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }

    int min_val = arr[0];
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min_val) min_val = arr[i];
        if (arr[i] > max_val) max_val = arr[i];
    }

    double avg = (double)sum / n;
    printf("Min: %d\n", min_val);
    printf("Max: %d\n", max_val);
    printf("Avg: %.2f\n", avg);

    reverse_array(arr, n);

    printf("Reversed:");
    for (int i = 0; i < n; i++) {
        printf(" %d", arr[i]);
    }
    printf("\n");

    free(arr);
    arr = NULL;
    return 0;
}`,
      solutionExplanation:
        'Memory is allocated dynamically on the heap via malloc(n * sizeof(int)). Input reading and linear scans compute min, max, and sum in O(n) time. The reverse_array function swaps elements using two pointers in O(n) time and O(1) space. Finally, free(arr) releases the memory block.',
      dryRun: [
        { step: 1, line: 20, variables: { n: '5', arr: '0x1000' }, output: '', explanation: 'Allocates memory for 5 integers.' },
        { step: 2, line: 30, variables: { min_val: '10', max_val: '50', sum: '150' }, output: 'Min: 10\\nMax: 50\\nAvg: 30.00', explanation: 'Computes array statistics.' },
        { step: 3, line: 40, variables: { arr: '[30, 50, 20, 40, 10]' }, output: 'Reversed: 30 50 20 40 10', explanation: 'Array is reversed in-place.' },
        { step: 4, line: 46, variables: { arr: 'NULL' }, output: '', explanation: 'Memory freed and pointer set to NULL.' },
      ],
      tags: ['dynamic-array', 'malloc', 'in-place-reversal'],
    },
    {
      id: 'u1-t1-p2',
      title: 'Dynamic Matrix Multiplication (PES Slide 34 Challenge)',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      problemStatement:
        'Implement a complete C program to multiply two matrices whose dimensions and values are determined at runtime. Allocate memory for Matrix A (r1 x c1) and Matrix B (r2 x c2) dynamically. Check if matrix multiplication is valid (c1 must equal r2). Compute Matrix C = A x B and display the result. Gracefully handle memory allocation failures with rollback, and ensure every allocated block is properly freed before termination.',
      constraints: [
        '1 <= r1, c1, r2, c2 <= 200',
        'c1 must equal r2 for valid multiplication',
        'Zero memory leaks under all execution paths',
      ],
      sampleInput: '2 3\n1 2 3\n4 5 6\n3 2\n7 8\n9 1\n2 3',
      sampleOutput: '31 19\n85 55',
      hints: [
        'Allocate an array of row pointers: int** m = malloc(rows * sizeof(int*)).',
        'Allocate each row: m[i] = calloc(cols, sizeof(int)).',
        'If any row allocation fails, loop backward and free all previously allocated rows before freeing the main pointer array.',
        'To free the matrix, free each row first, then free the top-level pointer array.',
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

int** create_matrix(int r, int c) {
    int** m = (int**)malloc(r * sizeof(int*));
    if (!m) return NULL;
    for (int i = 0; i < r; i++) {
        m[i] = (int*)calloc(c, sizeof(int));
        if (!m[i]) {
            for (int j = 0; j < i; j++) free(m[j]);
            free(m);
            return NULL;
        }
    }
    return m;
}

void destroy_matrix(int** m, int r) {
    if (!m) return;
    for (int i = 0; i < r; i++) {
        free(m[i]);
    }
    free(m);
}

int main(void) {
    int r1, c1, r2, c2;
    if (scanf("%d %d", &r1, &c1) != 2) return 1;

    int** A = create_matrix(r1, c1);
    if (!A) return 1;

    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    if (scanf("%d %d", &r2, &c2) != 2) {
        destroy_matrix(A, r1);
        return 1;
    }

    if (c1 != r2) {
        printf("Multiplication not possible: c1 != r2\n");
        destroy_matrix(A, r1);
        return 1;
    }

    int** B = create_matrix(r2, c2);
    int** C = create_matrix(r1, c2);

    if (!B || !C) {
        destroy_matrix(A, r1);
        destroy_matrix(B, r2);
        destroy_matrix(C, r1);
        return 1;
    }

    for (int i = 0; i < r2; i++) {
        for (int j = 0; j < c2; j++) {
            scanf("%d", &B[i][j]);
        }
    }

    /* Multiply */
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    /* Print result */
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            printf("%d%c", C[i][j], (j == c2 - 1) ? '\n' : ' ');
        }
    }

    destroy_matrix(A, r1);
    destroy_matrix(B, r2);
    destroy_matrix(C, r1);
    return 0;
}`,
      solutionExplanation:
        'This program satisfies the assignment on Slide 34 of Unit 1. It allocates matrices as arrays of integer pointers, checks multiplication compatibility (c1 == r2), performs the standard O(r1 * c1 * c2) multiplication, prints the product, and uses destroy_matrix to free all row blocks and pointer blocks in reverse order.',
      dryRun: [],
      tags: ['dynamic-2d-array', 'matrix-multiplication', 'pes-slide-challenge'],
    },
    {
      id: 'u1-t1-p3',
      title: 'Resizable Dynamic Array (C Vector Implementation)',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      problemStatement:
        'Implement a resizable dynamic array (similar to std::vector in C++ or ArrayList in Java) in C. Define a struct Vector with int* data, size_t size, and size_t capacity. Implement functions: vector_init(Vector* v, size_t initial_cap), vector_push_back(Vector* v, int value) which automatically doubles capacity via realloc when size == capacity, vector_get(Vector* v, size_t index), and vector_free(Vector* v). Demonstrate appending 10 elements into an initially capacity-2 vector without leaks.',
      constraints: [
        'Vector capacity must double (2x) whenever capacity is exhausted',
        'realloc must be handled using safe temporary pointer idiom',
        'Clean deallocation with zero memory leaks',
      ],
      sampleInput: '10',
      sampleOutput: 'Size: 10, Capacity: 16\nElements: 1 2 3 4 5 6 7 8 9 10',
      hints: [
        'Always check if realloc returns NULL into a temporary variable.',
        'Amortized time complexity of push_back with geometric doubling is O(1).',
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int* data;
    size_t size;
    size_t capacity;
} Vector;

bool vector_init(Vector* v, size_t initial_cap) {
    if (initial_cap == 0) initial_cap = 1;
    v->data = (int*)malloc(initial_cap * sizeof(int));
    if (!v->data) return false;
    v->size = 0;
    v->capacity = initial_cap;
    return true;
}

bool vector_push_back(Vector* v, int val) {
    if (v->size == v->capacity) {
        size_t new_cap = v->capacity * 2;
        int* temp = (int*)realloc(v->data, new_cap * sizeof(int));
        if (!temp) return false;
        v->data = temp;
        v->capacity = new_cap;
    }
    v->data[v->size++] = val;
    return true;
}

int vector_get(const Vector* v, size_t index) {
    return v->data[index];
}

void vector_free(Vector* v) {
    if (v->data) {
        free(v->data);
        v->data = NULL;
    }
    v->size = 0;
    v->capacity = 0;
}

int main(void) {
    Vector v;
    if (!vector_init(&v, 2)) {
        fprintf(stderr, "Failed to initialize vector\n");
        return 1;
    }

    for (int i = 1; i <= 10; i++) {
        vector_push_back(&v, i);
    }

    printf("Size: %zu, Capacity: %zu\n", v.size, v.capacity);
    printf("Elements:");
    for (size_t i = 0; i < v.size; i++) {
        printf(" %d", vector_get(&v, i));
    }
    printf("\n");

    vector_free(&v);
    return 0;
}`,
      solutionExplanation:
        'This vector implementation demonstrates geometric resizing via realloc. Starting with capacity 2, it doubles to 4, 8, then 16 when holding 10 elements. The temporary pointer pattern prevents leaks on reallocation failure, and vector_free releases all heap resources.',
      dryRun: [],
      tags: ['realloc', 'vector', 'resizable-array', 'amortized-analysis'],
    },
  ],
};
