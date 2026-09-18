import type { Topic } from '../../../../types';

export const queue: Topic = {
  id: 'u3-t14',
  unitId: 'unit-3',
  title: 'Queue',
  slug: 'queue',
  description: `A queue is a linear data structure that enforces the First-In, First-Out (FIFO) access discipline: elements are added at the rear (enqueue) and removed from the front (dequeue), ensuring that the element that has waited the longest is always served next. This ordering discipline mirrors real-world queues — customers in a checkout line, print jobs in a printer queue, network packets awaiting transmission — and is fundamentally different from a stack's LIFO policy.

Queues are the backbone of asynchronous processing, buffering, and scheduling systems throughout computing. The operating system's CPU scheduler uses a ready queue to determine which process runs next. Network routers buffer incoming packets in queues when the outgoing link is temporarily busy. Message-passing systems (like producer-consumer architectures) use queues to decouple the rate of data production from the rate of data consumption. Breadth-first search (BFS) — one of the two fundamental graph traversal algorithms — uses a queue to explore nodes level by level, ensuring the shortest path is found in unweighted graphs.

This topic covers array-based implementations (both linear and circular, where the circular variant reuses freed array slots by wrapping the front and rear indices around using modular arithmetic) and linked-list-based implementations (where enqueue appends a new node at the tail and dequeue removes the node at the head). The circular array implementation is particularly important because it solves the "false overflow" problem of linear arrays — where the array appears full because the rear index has reached the end, even though front slots have been freed by previous dequeue operations.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t12'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u3-t14-s1',
      title: 'The Queue Concept and FIFO',
      slug: 'queue-fifo',
      description: `A queue is an abstract data type that enforces a First-In, First-Out (FIFO) access discipline: elements are added at one end (the rear) and removed from the other end (the front), guaranteeing that the element that has been waiting the longest is always the next one to be processed. This is the complement of a stack's LIFO behavior, and it models every real-world waiting line: customers at a checkout counter, print jobs waiting for a printer, network packets waiting for transmission, and processes waiting for CPU time in an operating system's scheduler.

The FIFO property requires maintaining two access points rather than one. A stack needs only a single pointer (top) because both additions and removals occur at the same end. A queue needs a front pointer (where elements are removed) and a rear pointer (where elements are added). When you enqueue an element, it is placed at the rear; when you dequeue, the element at the front is removed and returned. These two operations, along with peek (examine the front without removing it) and isEmpty, constitute the complete interface of the queue ADT.

The simplest linked-list-based queue implementation uses a singly linked list with both a head (front) and a tail (rear) pointer. Enqueue allocates a new node, sets the current tail's next to the new node, and updates tail. Dequeue reads the data from the head node, advances head to head->next, and frees the old head node. Both operations are O(1). The linked-list implementation has no fixed capacity and grows dynamically, making it the natural choice when the queue size is unpredictable. However, each node incurs pointer overhead and requires individual heap allocations, which can be slower than array-based alternatives for high-throughput scenarios.`,
      keyPoints: [
        'FIFO Architecture: Information flows in exactly one direction. Data enters at the Back, and is retrieved from the Front.',
        '`enqueue(item)`: The O(1) operation of allocating a new node and attaching it to the BACK (rear/tail) of the queue.',
        '`dequeue()`: The O(1) operation of extracting the data from the FRONT (head) node, safely destroying the node, and advancing the front pointer.',
        'Systems Applications: Operating System thread scheduling (Round Robin), Network Router packet buffering, and Printer Spooling all rely heavily on Queues to maintain absolute fairness.',
      ],
      codeExamples: [
        {
          id: 'u3-t14-s1-ex1',
          title: 'Linked List Based Queue',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\n/* A Queue needs TWO pointers to be efficient */\ntypedef struct {\n    Node *front;\n    Node *rear;\n} Queue;\n\nvoid enqueue(Queue *q, int value) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = value;\n    newNode->next = NULL;\n    \n    if (q->rear == NULL) {\n        /* If queue is empty, new node is both front and rear */\n        q->front = q->rear = newNode;\n        return;\n    }\n    \n    /* Attach to the end, then move rear pointer */\n    q->rear->next = newNode;\n    q->rear = newNode;\n}\n\nint dequeue(Queue *q) {\n    if (q->front == NULL) return -1; /* Underflow */\n    \n    Node *temp = q->front;\n    int value = temp->data;\n    \n    q->front = q->front->next; /* Move front forward */\n    \n    /* If we just dequeued the last element, reset rear to NULL */\n    if (q->front == NULL) q->rear = NULL;\n    \n    free(temp);\n    return value;\n}\n\nint main(void) {\n    Queue q = {NULL, NULL}; /* Initialize empty */\n    \n    enqueue(&q, 10);\n    enqueue(&q, 20);\n    enqueue(&q, 30);\n    \n    printf("Served: %d\\n", dequeue(&q)); /* 10 */\n    printf("Served: %d\\n", dequeue(&q)); /* 20 */\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'Architecturally, a Linked-List Queue absolutely mandates TWO pointers (`front` and `rear`). If we only tracked the `front`, every single `enqueue` operation would suffer an abysmal O(N) traversal to find the end of the line. The `rear` pointer guarantees that inserting a new node takes instantaneous O(1) time, regardless of whether the queue has 10 or 10,000,000 elements.',
          expectedOutput: 'Served: 10\nServed: 20',
          lineBreakdown: [
            { lineNumber: 10, code: 'typedef struct { Node *front; Node *rear; } Queue;', explanation: 'Encapsulating the two structural anchors into a single manager struct prevents pointer chaos when passing the queue between functions.' },
            { lineNumber: 27, code: '    q->rear->next = newNode; q->rear = newNode;', explanation: 'The O(1) enqueue mechanic: Link the new node to the current back of the line, then formally redefine the back of the line.' },
            { lineNumber: 37, code: '    q->front = q->front->next;', explanation: 'The O(1) dequeue mechanic: Slide the front anchor backward, permanently severing the old node from the chain.' },
          ],
          relatedTopicIds: ['u3-t12'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t14-s1-cm1',
          title: 'Forgetting to update rear on last dequeue',
          wrongCode: 'q->front = q->front->next;\nfree(temp);\n/* Done */',
          correctCode: 'q->front = q->front->next;\nif (q->front == NULL) q->rear = NULL;\nfree(temp);',
          explanation: 'A critical edge case in Queue teardown. If the queue contains precisely 1 item, both `front` and `rear` point to it. When you dequeue it, `front` advances to `NULL`. If you neglect to also update `rear` to `NULL`, the `rear` pointer continues to aim at the memory you just `free()`d! The very next `enqueue` operation will trigger a catastrophic Use-After-Free Segmentation Fault.',
          consequence: 'Violent Use-After-Free Segmentation Fault on the subsequent enqueue operation.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t14-s1-ic1',
          title: 'Queue Implementations',
          content: 'A classic systems design question: "Why not just use a standard Array for a Queue?" The answer is the "Shifting Problem". If you implement a Queue in a standard array, every `dequeue` from `arr[0]` forces the CPU to physically shift every other element left by 1 (O(N) catastrophe). The industry solution for array-based queues is the Circular Buffer (Ring Buffer).',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t14-s1-cp1',
          title: 'FIFO Mechanics',
          description: 'Verify your understanding of FIFO mechanics and dual-pointer architecture.',
          criteria: [
            'Mechanically explain the exact order of extraction for items A, B, and C pushed into a Queue.',
            'Architecturally defend why a Linked List Queue absolutely requires a `rear` pointer to maintain O(1) performance.',
          ],
          topicId: 'u3-t14',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t14-s1-rc1',
          front: 'What does FIFO stand for?',
          back: 'First-In, First-Out. The data structure guarantees absolute fairness: the oldest element stored is mathematically guaranteed to be the first one retrieved.',
          topicId: 'u3-t14',
          tags: ['queue', 'theory'],
        },
      ],
    },
    {
      id: 'u3-t14-s2',
      title: 'Circular Queue (Array Based)',
      slug: 'circular-queue',
      description: `In performance-critical systems such as operating system kernel buffers, network packet queues, and real-time audio processing, the overhead of individual malloc and free calls for each enqueue/dequeue operation is unacceptable. The solution is to implement the queue using a pre-allocated, fixed-size array. However, a naive array-based queue has a fatal flaw: as elements are dequeued from the front and enqueued at the rear, the "active" portion of the array migrates steadily to the right, eventually reaching the end of the array even though the front positions are now empty. The circular queue (also called a ring buffer) solves this problem by treating the array as if its ends were connected in a loop, using the modulo operator (%) to wrap indices back to the beginning when they reach the array's boundary.

The implementation uses two index variables: front (where the next dequeue will read from) and rear (where the next enqueue will write to). Both indices advance by one after each operation, but instead of simple incrementing, they use modular arithmetic: front = (front + 1) % MAX_SIZE and rear = (rear + 1) % MAX_SIZE. When an index reaches MAX_SIZE - 1 (the last valid array position) and needs to advance, the modulo operation wraps it back to 0, the first position in the array. This wrapping creates the illusion of an infinite buffer from a finite array, reusing slots that have been dequeued.

The critical implementation detail is distinguishing between a full queue and an empty queue, because in both cases front equals rear if you use the naive approach. The standard solution is to sacrifice one array slot: the queue is considered full when (rear + 1) % MAX_SIZE == front, meaning the rear has wrapped around and is one position behind the front. This wastes one slot but provides an unambiguous, O(1) fullness check without needing a separate count variable. Some implementations use a separate count variable instead, which avoids wasting a slot but adds an extra variable to maintain. Circular queues are ubiquitous in systems programming and are the standard implementation behind POSIX pipe buffers, keyboard input buffers, and producer-consumer patterns in concurrent programming.`,
      keyPoints: [
        'The Shifting Disaster: In a linear array, dequeueing from index 0 wastes space. If you enqueue and dequeue 5 items, indices 0-4 are marked empty but cannot be reused because `rear` is stuck at the end of the array.',
        'The Ring Topology: A Circular Queue maps a flat array into an infinite ring. If the array size is 5, and the `rear` pointer is at index 4, the very next `enqueue` mathematically wraps `rear` completely around to index 0.',
        'Modulo Magic: Wrapping is achieved securely via `rear = (rear + 1) % MAX;`.',
        'Collision Detection: The Queue is mathematically full if moving the `rear` pointer forward by exactly one step collides with the `front` pointer: `(rear + 1) % MAX == front`.',
      ],
      codeExamples: [
        {
          id: 'u3-t14-s2-ex1',
          title: 'Circular Queue Implementation',
          code: '#include <stdio.h>\n\n#define MAX 5\n\ntypedef struct {\n    int data[MAX];\n    int front;\n    int rear;\n} CircularQueue;\n\nvoid init(CircularQueue *q) {\n    q->front = -1;\n    q->rear = -1;\n}\n\nvoid enqueue(CircularQueue *q, int value) {\n    /* Check if full */\n    if ((q->rear + 1) % MAX == q->front) {\n        printf("Queue Full!\\n");\n        return;\n    }\n    \n    /* First element edge case */\n    if (q->front == -1) q->front = 0;\n    \n    /* Wrap rear pointer */\n    q->rear = (q->rear + 1) % MAX;\n    q->data[q->rear] = value;\n}\n\nint dequeue(CircularQueue *q) {\n    if (q->front == -1) {\n        printf("Queue Empty!\\n");\n        return -1;\n    }\n    \n    int value = q->data[q->front];\n    \n    /* Was it the last element? Reset to empty state */\n    if (q->front == q->rear) {\n        q->front = -1;\n        q->rear = -1;\n    } else {\n        /* Wrap front pointer */\n        q->front = (q->front + 1) % MAX;\n    }\n    \n    return value;\n}\n\nint main(void) {\n    CircularQueue q;\n    init(&q);\n    \n    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3);\n    enqueue(&q, 4); enqueue(&q, 5);\n    \n    dequeue(&q); /* Removes 1, index 0 is now free */\n    \n    enqueue(&q, 6); /* Wraps around to index 0! */\n    \n    printf("Front is %d, Rear is %d\\n", q.front, q.rear);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This Ring Buffer architecture is the exact implementation used by the Linux Kernel to manage incoming TCP/IP packets from your Network Interface Card. It achieves lightning-fast O(1) operations using zero dynamic memory allocation.',
          expectedOutput: 'Front is 1, Rear is 0',
          lineBreakdown: [
            { lineNumber: 18, code: '    if ((q->rear + 1) % MAX == q->front) {', explanation: 'The absolute collision rule. If stepping the rear forward causes it to land exactly on the front, the ring is 100% packed.' },
            { lineNumber: 27, code: '    q->rear = (q->rear + 1) % MAX;', explanation: 'The wrapping engine. If `rear` is 4, (4+1)%5 evaluates to 0, smoothly warping the pointer to the start of the array.' },
          ],
          relatedTopicIds: ['u1-t5'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t14-s2-cm1',
          title: 'Incorrect Full Condition',
          wrongCode: 'if (q->rear == MAX - 1) return FULL;',
          correctCode: 'if ((q->rear + 1) % MAX == q->front) return FULL;',
          explanation: '`rear == MAX - 1` is an obsolete check that only functions for a straight, Linear queue. In a Circular topology, `rear` can absolutely reside at `MAX - 1` while `front` resides at index `2` (meaning indexes 0 and 1 are ripe for data). You MUST use modulo arithmetic to detect physical pointer collisions.',
          consequence: 'Systematic resource starvation. The Queue falsely refuses to ingest incoming data despite having empty memory slots.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t14-s2-ic1',
          title: 'The Modulo Operator',
          content: 'A fundamental hardware math trick. You must flawlessly explain how the modulo operator `%` simulates circular geometry in flat RAM. `x % N` mathematically restricts the output to a strict domain between `0` and `N-1`. It perfectly models a clock face rolling past 12.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t14-s2-cp1',
          title: 'Circular Array Math',
          description: 'Verify your absolute mastery of modulo arithmetic and ring boundaries.',
          criteria: [
            'Mechanically compute the exact result of `(rear + 1) % MAX` if MAX is 5 and rear is 4.',
            'State the precise mathematical condition that proves a Circular Queue is 100% full.',
          ],
          topicId: 'u3-t14',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t14-s2-rc1',
          front: 'What is the exact mathematical equation used to smoothly wrap an `index` pointer forward within an array of size `MAX`?',
          back: '`index = (index + 1) % MAX;`',
          topicId: 'u3-t14',
          tags: ['queue', 'math', 'modulo'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t14-q1',
      type: 'mcq',
      topicId: 'u3-t14',
      difficulty: 'beginner',
      question: 'Which operation is associated with adding an element to a Queue?',
      options: ['Push', 'Pop', 'Enqueue', 'Dequeue'],
      correctAnswer: 'Enqueue',
      explanation: 'Enqueue adds to the back of the line. Push is for Stacks.',
      tags: ['queue', 'terminology'],
    },
    {
      id: 'u3-t14-q2',
      type: 'predict-output',
      topicId: 'u3-t14',
      difficulty: 'intermediate',
      question: 'Queue sequence: enqueue(10), enqueue(20), dequeue(), enqueue(30). What is the next dequeue()?',
      options: ['10', '20', '30', 'Error'],
      correctAnswer: '20',
      explanation: 'Queue state: [10]. [10, 20]. Dequeue removes front -> 10, queue is [20]. Enqueue(30) -> [20, 30]. Next dequeue removes 20.',
      tags: ['queue', 'operations'],
    },
    {
      id: 'u3-t14-q3',
      type: 'true-false',
      topicId: 'u3-t14',
      difficulty: 'advanced',
      question: 'In a Circular Queue of size 5, if front is at index 2 and rear is at index 1, the queue is completely full.',
      correctAnswer: true,
      explanation: 'Let\'s check the math: `(rear + 1) % 5 == front`. `(1 + 1) % 5 = 2`. 2 == 2. Yes, the rear has wrapped around and caught up to immediately behind the front. It is full.',
      tags: ['queue', 'math', 'circular'],
    },
    {
      id: 'u3-t14-q4',
      type: 'spot-bug',
      topicId: 'u3-t14',
      difficulty: 'intermediate',
      question: 'Spot the issue in this Linked List enqueue:',
      code: 'void enqueue(Queue *q, int val) {\n    Node *n = malloc(sizeof(Node)); n->data = val; n->next = NULL;\n    q->rear->next = n;\n    q->rear = n;\n}',
      correctAnswer: 'No check for empty queue.',
      explanation: 'If the queue is empty, `q->rear` is NULL. `q->rear->next` will cause an instant Segmentation Fault. Must check `if (q->rear == NULL)` first and set `front` and `rear` to the new node.',
      tags: ['queue', 'lists', 'segfault'],
    },
    {
      id: 'u3-t14-q5',
      type: 'mcq',
      topicId: 'u3-t14',
      difficulty: 'beginner',
      question: 'Which real-world scenario is best modeled by a Queue?',
      options: [
        'The Undo button in a text editor',
        'A stack of cafeteria trays',
        'A printer receiving documents from multiple computers',
        'Navigating back pages in a web browser'
      ],
      correctAnswer: 'A printer receiving documents from multiple computers',
      explanation: 'Printers use a "Print Spooler" (a Queue) to print documents in the exact order they were received (FIFO). Undo and Back buttons use Stacks (LIFO).',
      tags: ['queue', 'theory'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t14-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t14',
      difficulty: 'beginner',
      problemStatement: 'Find the length of a string without using strlen().',
      constraints: ['No string.h allowed'],
      sampleInput: 'hello',
      sampleOutput: '5',
      hints: ['Iterate until the null terminator is found'],
      solution: '/* String length implementation */',
      solutionExplanation: 'Loops through char array until \\0.',
      dryRun: [],
      tags: ['strings']
    },
    {
      id: 'u3-t14-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t14',
      difficulty: 'intermediate',
      problemStatement: 'Define a BankAccount struct and write a function to deposit money.',
      constraints: ['Pass struct by pointer'],
      sampleInput: 'Deposit 50 to Balance 100',
      sampleOutput: 'Balance: 150',
      hints: ['Use the arrow operator to modify balance'],
      solution: '/* Bank account implementation */',
      solutionExplanation: 'Uses pointers to modify structural state.',
      dryRun: [],
      tags: ['structs']
    },
    {
      id: 'u3-t14-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t14',
      difficulty: 'advanced',
      problemStatement: 'Find the middle element of a linked list in one pass.',
      constraints: ['Use slow and fast pointers'],
      sampleInput: '1->2->3->4->5',
      sampleOutput: '3',
      hints: ['Fast pointer moves 2 steps, slow moves 1'],
      solution: '/* Linked List middle implementation */',
      solutionExplanation: 'Tortoise and hare algorithm.',
      dryRun: [],
      tags: ['linked-lists']
    },
    {
      id: 'u3-t14-p1',
      title: 'Ticket System',
      topicId: 'u3-t14',
      difficulty: 'beginner',
      problemStatement: 'You are building a ticketing system. Use a linked list queue to enqueue customers IDs 101, 102, 103. Then serve (dequeue) two of them and print their IDs. Finally, print the ID of the customer still waiting at the front.',
      constraints: ['Use Linked List Queue'],
      sampleInput: '',
      sampleOutput: 'Served: 101\nServed: 102\nNext in line: 103',
      hints: ['Queue struct needs front and rear', 'peek() is just return q->front->data;'],
      solution: '/* Omitted standard Queue structure definitions for brevity */\n#include <stdio.h>\n#include <stdlib.h>\ntypedef struct Node { int id; struct Node *next; } Node;\ntypedef struct { Node *front; Node *rear; } Queue;\nvoid enqueue(Queue *q, int id) {\n    Node *n = malloc(sizeof(Node)); n->id = id; n->next = NULL;\n    if(!q->rear) { q->front = q->rear = n; return; }\n    q->rear->next = n; q->rear = n;\n}\nint dequeue(Queue *q) {\n    if(!q->front) return -1;\n    Node *temp = q->front; int val = temp->id;\n    q->front = q->front->next;\n    if(!q->front) q->rear = NULL;\n    free(temp); return val;\n}\n\nint main(void) {\n    Queue q = {NULL, NULL};\n    enqueue(&q, 101); enqueue(&q, 102); enqueue(&q, 103);\n    \n    printf("Served: %d\\n", dequeue(&q));\n    printf("Served: %d\\n", dequeue(&q));\n    printf("Next in line: %d\\n", q.front->id);\n    return 0;\n}',
      solutionExplanation: 'Standard application of the FIFO principle. 101 goes in first, 101 comes out first.',
      dryRun: [
        { step: 1, line: 20, variables: {}, output: '', explanation: 'Queue is [101, 102, 103].' },
        { step: 2, line: 22, variables: {}, output: 'Served: 101\\n', explanation: 'Dequeue removes front (101). Queue is [102, 103].' },
        { step: 3, line: 24, variables: {}, output: 'Next in line: 103\\n', explanation: 'Front is 103.' },
      ],
      tags: ['queue', 'lists', 'fifo'],
    },
    {
      id: 'u3-t14-p2',
      title: 'Implement Queue using Two Stacks',
      topicId: 'u3-t14',
      difficulty: 'advanced',
      problemStatement: 'A famous interview question. You are only allowed to use standard Stack functions (`push` and `pop`). Implement a FIFO Queue using exactly two Stacks (`stack1` and `stack2`).',
      constraints: ['Do not use arrays/linked lists directly, only Stack structs'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['To enqueue: just push onto stack1.', 'To dequeue: if stack2 is empty, pop EVERYTHING from stack1 and push it onto stack2. Then pop from stack2.'],
      solution: '/* Conceptual solution. Assume Stack struct and push/pop exist */\n/*\nvoid enqueue(Queue *q, int value) {\n    push(&q->stack1, value);\n}\n\nint dequeue(Queue *q) {\n    // If stack2 is empty, pour stack1 into it\n    if (isEmpty(&q->stack2)) {\n        while (!isEmpty(&q->stack1)) {\n            push(&q->stack2, pop(&q->stack1));\n        }\n    }\n    // Pop from stack2\n    return pop(&q->stack2);\n}\n*/',
      solutionExplanation: 'By pouring `stack1` into `stack2`, the LIFO order reverses completely into FIFO order. If you push 1, 2, 3 into s1, they sit [1,2,3]. Pouring them into s2 puts them in as [3,2,1]. Popping from s2 yields 1! This is amortized O(1) time.',
      dryRun: [
        { step: 1, line: 4, variables: {}, output: '', explanation: 'Enqueue 1, 2. s1=[1,2]. s2=[]' },
        { step: 2, line: 12, variables: {}, output: '', explanation: 'Dequeue called. s2 is empty. Pop 2 from s1, push to s2. Pop 1 from s1, push to s2. s1=[]. s2=[2,1].' },
        { step: 3, line: 15, variables: {}, output: '', explanation: 'Pop from s2. Yields 1. Correct FIFO behavior!' },
      ],
      tags: ['queue', 'stack', 'algorithms', 'leetcode'],
    },
  ],
};
