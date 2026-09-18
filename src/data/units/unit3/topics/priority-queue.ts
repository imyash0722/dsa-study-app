import type { Topic } from '../../../../types';

export const priorityQueue: Topic = {
  id: 'u3-t15',
  unitId: 'unit-3',
  title: 'Priority Queue',
  slug: 'priority-queue',
  description: `A priority queue is a structural variant of the standard queue in which elements bypass the FIFO ordering rule based on an associated priority value — the element with the highest (or lowest) priority is always dequeued first, regardless of insertion order. This data structure models scenarios where not all waiting items are equally urgent: in a hospital emergency room, critical patients are treated before minor injuries regardless of arrival time; in an operating system's CPU scheduler, high-priority system processes preempt lower-priority user tasks.

Priority queues can be implemented using several underlying data structures, each with different performance characteristics. The simplest approach — an unsorted array — provides O(1) insertion but O(n) dequeue (since finding the highest-priority element requires a linear scan). A sorted array reverses this trade-off: O(n) insertion (maintaining sort order) but O(1) dequeue (the highest-priority element is always at a known position). A binary heap provides the optimal balance: O(log n) for both insertion and extraction, making it the standard implementation for production priority queues. This topic focuses on the array-based and linked-list-based implementations that reinforce the data structure concepts covered earlier in the curriculum.

Priority queues are a critical component of many important algorithms: Dijkstra's shortest-path algorithm uses a min-priority queue to greedily select the next closest vertex, Huffman coding uses a min-priority queue to build optimal prefix codes for data compression, and event-driven simulations use priority queues to process events in chronological order. Understanding priority queues also deepens the student's appreciation for the relationship between data structure choice and algorithmic efficiency — the same algorithm can be O(n²) or O(n log n) depending on whether a naive or heap-based priority queue is used.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t14'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u3-t15-s1',
      title: 'Priority Queue Concept',
      slug: 'priority-queue-concept',
      description: `A priority queue is an abstract data type that extends the basic queue concept by associating each element with a numeric priority value. Unlike a standard FIFO queue where elements are processed strictly in the order they were added, a priority queue always extracts the element with the highest (or lowest, depending on the convention) priority, regardless of insertion order. This breaks chronological ordering in favor of importance-based ordering, making priority queues essential for any system where some tasks are more urgent than others.

The simplest implementation uses an unsorted array or linked list: enqueue appends the new element in O(1) time, and dequeue performs a linear scan to find the highest-priority element in O(N) time. Alternatively, a sorted implementation keeps elements ordered by priority at all times, making dequeue O(1) (just remove the first element) but making enqueue O(N) (find the correct insertion position). Neither approach is efficient for large datasets; the optimal implementation uses a binary heap data structure, which achieves O(log N) for both operations. However, at the introductory level, the array-based and linked-list-based implementations are sufficient to understand the concept and its applications.

Priority queues are ubiquitous in systems and application software. Operating system process schedulers use them to decide which process gets CPU time next (higher-priority processes preempt lower-priority ones). Network routers use them to ensure that latency-sensitive packets (voice calls, video streams) are forwarded before bulk data transfers. Dijkstra's shortest-path algorithm and Prim's minimum spanning tree algorithm both depend on priority queues as their core data structure. In hospital emergency departments, triage systems are priority queues: patients are treated not by arrival time but by the severity of their condition. Understanding this data structure means understanding the fundamental principle that not all waiting is equal.`,
      keyPoints: [
        'The Fallback Rule: If two elements possess the exact same priority integer, the data structure must fall back to strict FIFO logic to break the tie.',
        'Ascending vs Descending: In an Ascending PQ, the mathematically LOWEST number is executed first (e.g., Priority 1 executes before Priority 5). In a Descending PQ, the HIGHEST number wins.',
        'Systems Architecture: The Linux Kernel uses Priority Queues to pause your web browser (low priority) so the OS can process a hardware mouse click (high priority).',
        'Algorithmic Backbone: Graph algorithms like Dijkstra\'s Shortest Path absolutely depend on Priority Queues to aggressively evaluate the cheapest paths first.',
      ],
      codeExamples: [
        {
          id: 'u3-t15-s1-ex1',
          title: 'Linked List Priority Queue',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    int priority; /* Lower number = Higher priority */\n    struct Node *next;\n} Node;\n\n/* We only need a head pointer for a Priority Queue */\nNode* enqueue(Node *head, int data, int priority) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = data;\n    newNode->priority = priority;\n    newNode->next = NULL;\n    \n    /* Case 1: Empty list, OR new node has highest priority (lowest number) */\n    if (head == NULL || priority < head->priority) {\n        newNode->next = head;\n        return newNode; /* New node becomes the new head */\n    }\n    \n    /* Case 2: Traverse to find the correct insertion spot */\n    Node *temp = head;\n    while (temp->next != NULL && temp->next->priority <= priority) {\n        temp = temp->next;\n    }\n    \n    /* Insert new node after temp */\n    newNode->next = temp->next;\n    temp->next = newNode;\n    \n    return head;\n}\n\nvoid printQueue(Node *head) {\n    while (head != NULL) {\n        printf("[D:%d, P:%d] -> ", head->data, head->priority);\n        head = head->next;\n    }\n    printf("NULL\\n");\n}\n\nint main(void) {\n    Node *pq = NULL;\n    \n    pq = enqueue(pq, 10, 2); /* Data 10, Priority 2 */\n    pq = enqueue(pq, 20, 3); /* Data 20, Priority 3 */\n    pq = enqueue(pq, 30, 1); /* Data 30, Priority 1 (Should jump to front!) */\n    \n    printQueue(pq);\n    return 0;\n}',
          language: 'c',
          explanation: 'This architecture uses a continuously sorted Linked List. During `enqueue`, we force the CPU to linearly scan the list (O(N) time) to splice the new node into its exact sorted position. The massive architectural benefit? `dequeue` becomes instantaneous (O(1) time) because the most critical element is mathematically guaranteed to be sitting at the `head`.',
          expectedOutput: '[D:30, P:1] -> [D:10, P:2] -> [D:20, P:3] -> NULL',
          lineBreakdown: [
            { lineNumber: 18, code: '    if (head == NULL || priority < head->priority) {', explanation: 'The absolute override condition. If the new node is mathematically more critical than the current apex, it instantly usurps the `head` pointer.' },
            { lineNumber: 25, code: '    while (temp->next != NULL && temp->next->priority <= priority)', explanation: 'The O(N) scan mechanic. We walk the chain strictly until we hit an element with a WORSE (higher number) priority than our payload.' },
          ],
          relatedTopicIds: ['u3-t12'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t15-s1-cm1',
          title: 'Not handling same-priority elements correctly',
          wrongCode: 'while (temp->next != NULL && temp->next->priority < priority)',
          correctCode: 'while (temp->next != NULL && temp->next->priority <= priority)',
          explanation: 'Notice the absolute necessity of the `<=` operator. If a node arrives with Priority 2, and a Priority 2 node already exists, the new node MUST be inserted BEHIND the existing one to strictly preserve FIFO tie-breaking logic. If you mistakenly use `<`, the new node violently cuts in front, destroying chronological fairness for identical priorities.',
          consequence: 'Silent violation of FIFO tie-breaking logic, leading to unpredictable system execution order.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t15-s1-ic1',
          title: 'Priority Queue vs Heap',
          content: 'A brutal technical interview reality check: While a Linked List PQ works, its O(N) insertion time makes it architecturally unviable for millions of records. If an interviewer asks you to build a high-performance Priority Queue, they expect you to construct a "Binary Heap" (Min-Heap or Max-Heap). Heaps use mathematical array manipulation to guarantee O(log N) speeds for BOTH insertion and extraction.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t15-s1-cp1',
          title: 'Priority Logic',
          description: 'Verify your absolute mastery of PQ extraction logic.',
          criteria: [
            'Mechanically deduce the extraction order if Job A (Priority 5) arrives, followed by Job B (Priority 1) in an Ascending PQ.',
            'Explain the precise architectural behavior when Job C (Priority 2) and Job D (Priority 2) are inserted sequentially.',
          ],
          topicId: 'u3-t15',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t15-s1-rc1',
          front: 'What is the primary difference between a Standard Queue and a Priority Queue?',
          back: 'A standard Queue extracts strictly chronologically (FIFO). A Priority Queue mathematically extracts the element with the most critical priority integer, actively skipping older elements to do so.',
          topicId: 'u3-t15',
          tags: ['queue', 'priority', 'theory'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t15-q1',
      type: 'mcq',
      topicId: 'u3-t15',
      difficulty: 'beginner',
      question: 'In an Ascending Priority Queue, which priority value is served first?',
      options: ['The highest number', 'The lowest number', 'The one that arrived first', 'The one that arrived last'],
      correctAnswer: 'The lowest number',
      explanation: 'Ascending means 1 is the highest priority, then 2, then 3. Think of it like finishing 1st place in a race.',
      tags: ['queue', 'priority'],
    },
    {
      id: 'u3-t15-q2',
      type: 'predict-output',
      topicId: 'u3-t15',
      difficulty: 'intermediate',
      question: 'Assume Descending PQ (Higher number = served first). Sequence: enq(A, 50), enq(B, 100), enq(C, 50). What is the exact dequeue order?',
      options: ['B, A, C', 'A, B, C', 'B, C, A', 'C, A, B'],
      correctAnswer: 'B, A, C',
      explanation: 'B has highest priority (100). A and C tie (50), so they fallback to FIFO. A arrived before C. Order is B, A, C.',
      tags: ['queue', 'priority', 'fifo'],
    },
    {
      id: 'u3-t15-q3',
      type: 'spot-bug',
      topicId: 'u3-t15',
      difficulty: 'advanced',
      question: 'Spot the logic flaw in this array-based priority queue dequeue function:',
      code: 'int dequeue(int arr[], int *count) {\n    int val = arr[0];\n    for(int i=0; i<*count; i++) arr[i] = arr[i+1];\n    (*count)--;\n    return val;\n}',
      correctAnswer: 'It assumes the array is already sorted by priority.',
      explanation: 'If the array is NOT kept perfectly sorted during insertion, simply taking `arr[0]` is just a normal Queue. For an unsorted array PQ, you must scan the entire array to find the max priority, remove it, and shift everything.',
      tags: ['queue', 'priority', 'arrays'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t15-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t15',
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
      id: 'u3-t15-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t15',
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
      id: 'u3-t15-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t15',
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
      id: 'u3-t15-p1',
      title: 'Unsorted Array Priority Queue',
      topicId: 'u3-t15',
      difficulty: 'intermediate',
      problemStatement: 'Implement a Descending Priority Queue (highest number served first) using a basic unsorted array. `enqueue` just adds to the end (O(1)). `dequeue` must scan the array to find the highest priority, print it, and then shift all elements left to fill the gap (O(N)).',
      constraints: ['Use an array', 'Descending priority'],
      sampleInput: '',
      sampleOutput: 'Served: 99\nServed: 50',
      hints: ['Find the index `max_idx` of the highest priority.', 'Print `arr[max_idx]`.', 'Loop from `max_idx` to `count-1`, doing `arr[i] = arr[i+1]`.'],
      solution: '/* Conceptual */\n/*\nint dequeue(int pq[], int *count) {\n    if (*count == 0) return -1;\n    \n    // Find highest priority (max value)\n    int max_idx = 0;\n    for (int i = 1; i < *count; i++) {\n        if (pq[i] > pq[max_idx]) {\n            max_idx = i;\n        }\n    }\n    \n    int value = pq[max_idx];\n    \n    // Shift elements left to fill the hole\n    for (int i = max_idx; i < *count - 1; i++) {\n        pq[i] = pq[i + 1];\n    }\n    (*count)--;\n    \n    return value;\n}\n*/',
      solutionExplanation: 'This exposes the brutal Big O trade-off of Priority Queues. By choosing a naive O(1) `enqueue` (just dumping the data at the end of the array), we are mathematically forced to pay a massive O(N) penalty during `dequeue` because we must linearly scan every slot to find the maximum priority, and then physically shift memory to plug the hole.',
      dryRun: [
        { step: 1, line: 11, variables: {}, output: '', explanation: 'Array is [10, 99, 50]. max_idx becomes 1 (value 99).' },
        { step: 2, line: 16, variables: {}, output: '', explanation: 'Shift 50 left into index 1. Array becomes [10, 50].' },
      ],
      tags: ['queue', 'priority', 'arrays'],
    },
  ],
};
