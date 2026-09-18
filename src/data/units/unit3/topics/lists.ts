import type { Topic } from '../../../../types';

export const lists: Topic = {
  id: 'u3-t12',
  unitId: 'unit-3',
  title: 'Linked Lists',
  slug: 'lists',
  description: `Linked lists are the first truly dynamic data structure in the C curriculum — a collection of individually heap-allocated nodes connected by pointers, where each node contains both a data payload and a pointer to the next node in the sequence. Unlike arrays, which allocate a fixed, contiguous block of memory at declaration time, linked lists grow and shrink one node at a time through malloc and free, with no upper bound on capacity other than available system memory.

This pointer-based architecture provides two fundamental advantages over arrays: O(1) insertion and deletion at any known position (since no elements need to be shifted), and the elimination of the resize-and-copy overhead that dynamic arrays incur when they outgrow their allocated capacity. The trade-off is the loss of O(1) random access — accessing the k-th element of a linked list requires traversing k pointers from the head, giving O(k) access time — and worse cache performance, because nodes are scattered across the heap rather than stored contiguously.

This topic covers the three primary linked list variants: singly linked lists (each node points to its successor), doubly linked lists (each node points to both its successor and predecessor, enabling bidirectional traversal), and circular linked lists (the last node's next pointer points back to the head, forming a ring). Mastering linked lists requires fluency with pointer manipulation, dynamic memory allocation, and defensive programming against NULL pointer dereferences — skills that transfer directly to every pointer-based data structure (trees, graphs, hash tables) in the remainder of the curriculum.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t4', 'u3-t8'],
  estimatedMinutes: 120,
  subtopics: [
    {
      id: 'u3-t12-s1',
      title: 'Arrays vs Linked Lists',
      slug: 'arrays-vs-lists',
      description: `A linked list is a dynamic data structure in which each element (called a node) is a separately allocated structure on the heap, connected to the next element through a pointer. Unlike an array, whose elements occupy a single contiguous block of memory, the nodes of a linked list can be scattered anywhere in the heap — node 1 might reside at address 0x1000 while node 2 sits at 0x9000. The chain is held together not by physical adjacency but by logical connections: each node contains a next pointer that stores the address of the following node, and the last node's next pointer is set to NULL to mark the end of the list.

This architecture solves two fundamental limitations of arrays. First, arrays have a fixed size determined at allocation time; once you declare int arr[100], you cannot expand it to hold 101 elements without allocating an entirely new block and copying all existing data. A linked list has no pre-set capacity — you simply allocate a new node with malloc whenever you need one, connect it to the chain, and the list grows. Second, inserting or deleting an element at the beginning or middle of an array requires shifting all subsequent elements in memory, an O(N) operation that becomes prohibitively expensive for large datasets. In a linked list, insertion at the head is O(1): allocate a new node, point its next pointer to the current head, and update the head pointer. No elements are moved.

The tradeoff is the loss of random access. In an array, accessing element i is a single arithmetic operation (base + i * sizeof(element)) that executes in O(1) time regardless of the array's size. In a linked list, reaching the i-th element requires starting at the head and following i pointers, one by one, which is O(i) in the worst case. Additionally, each node carries the overhead of a pointer (typically 8 bytes on a 64-bit system), which means a linked list of integers uses roughly three times more memory than an array of the same integers. These tradeoffs make linked lists ideal for scenarios where frequent insertions and deletions at arbitrary positions dominate, and arrays ideal for scenarios where random access and memory efficiency dominate.`,
      keyPoints: [
        'The Node Architecture: A Linked List is a dynamic chain where every element (a "Node") is an entirely separate, isolated struct allocated anywhere on the vast ocean of the Heap.',
        'Shattering Contiguity: Nodes do NOT live next to each other. Node 1 might reside at address 0x1000, while Node 2 floats millions of bytes away at 0x9000.',
        'The Chain Mechanic: Because they are not physically adjacent, every Node MUST contain an embedded pointer (`struct Node *next`) that explicitly holds the memory address of the subsequent Node.',
        'The Anchor: The entire data structure is sustained by a single, solitary pointer named `head`, which simply points to the first Node. If the `head` pointer is overwritten or lost, the entire list vanishes into the Heap, causing a catastrophic memory leak.',
        'The Terminus: The final Node in the chain explicitly sets its `next` pointer to `NULL`, mathematically signaling the end of the data structure.',
      ],
      codeExamples: [
        {
          id: 'u3-t12-s1-ex1',
          title: 'The Node Structure',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\n/* Self-referential structure */\ntypedef struct Node {\n    int data;\n    struct Node *next; /* Pointer to the same type */\n} Node;\n\nint main(void) {\n    /* 1. Track the start of the list */\n    Node *head = NULL; /* Empty list */\n    \n    /* 2. Create the first node on the heap */\n    head = (Node*)malloc(sizeof(Node));\n    head->data = 10;\n    head->next = NULL; /* End of list */\n    \n    /* 3. Create a second node */\n    Node *second = (Node*)malloc(sizeof(Node));\n    second->data = 20;\n    second->next = NULL;\n    \n    /* 4. Link them together! */\n    head->next = second;\n    \n    /* Print by following the chain */\n    printf("%d -> %d -> NULL\\n", head->data, head->next->data);\n    \n    /* Memory leak if we don\'t free them, but omitted for brevity */\n    return 0;\n}',
          language: 'c',
          explanation: 'This code manually constructs a minimalist chain of two nodes. The `head` pointer anchors the first block of Heap memory. Crucially, the `next` pointer embedded *inside* that first block holds the exact memory address of the second block, bridging the gap across RAM.',
          expectedOutput: '10 -> 20 -> NULL',
          lineBreakdown: [
            { lineNumber: 6, code: '    struct Node *next;', explanation: 'The self-referential paradox. It must be `struct Node *` because the `Node` alias is not yet fully compiled.' },
            { lineNumber: 15, code: '    head = (Node*)malloc(sizeof(Node));', explanation: 'Carves out physical Heap memory for the very first node.' },
            { lineNumber: 25, code: '    head->next = second;', explanation: 'The structural link. The first node\'s `next` pointer is injected with the memory address of the second node.' },
          ],
          relatedTopicIds: ['u3-t8'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t12-s1-cm1',
          title: 'Not setting the last pointer to NULL',
          wrongCode: 'Node *n = malloc(sizeof(Node));\nn->data = 5;\n/* Forgot n->next = NULL; */',
          correctCode: 'Node *n = malloc(sizeof(Node));\nn->data = 5;\nn->next = NULL;',
          explanation: 'The `malloc` function does not clean memory; it grants you a block filled with leftover, unpredictable garbage data. If you fail to explicitly set `next = NULL`, the pointer will aim at a random, potentially restricted memory address. When your traversal loop attempts to read from that phantom address, the OS instantly triggers a Segmentation Fault.',
          consequence: 'Violent Segmentation Fault during list traversal.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t12-s1-ic1',
          title: 'Arrays vs Linked Lists (Time Complexity)',
          content: 'The definitive architectural trade-off interview question: Arrays grant O(1) instantaneous access via index math (`base_addr + offset`), but suffer O(N) catastrophic shifting when inserting at the front. Linked Lists suffer O(N) abysmal traversal times (you must walk pointer-by-pointer), but guarantee O(1) instantaneous insertion at the `head` by simply rewiring two pointers.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t12-s1-cp1',
          title: 'Linked List Theory',
          description: 'Verify your architectural intuition of dynamic chaining.',
          criteria: [
            'Architecturally explain why a Node strictly requires a `next` pointer, but an array element natively does not.',
            'Mechanically detail what happens to the underlying Heap memory if the `head` pointer variable is accidentally overwritten.',
            'Explain why performing a Binary Search on a Linked List is mathematically impossible.',
          ],
          topicId: 'u3-t12',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t12-s1-rc1',
          front: 'What are the two mandatory components of a Linked List Node?',
          back: '1. The Data payload (the actual information).\n2. A struct Pointer (`next`) storing the exact memory address of the subsequent Node.',
          topicId: 'u3-t12',
          tags: ['lists', 'nodes'],
        },
        {
          id: 'u3-t12-s1-rc2',
          front: 'What does a `NULL` pointer indicate in a Linked List?',
          back: 'It acts as the strict mathematical terminator, definitively signaling the absolute end of the chain.',
          topicId: 'u3-t12',
          tags: ['lists', 'pointers'],
        },
      ],
    },
    {
      id: 'u3-t12-s2',
      title: 'List Operations: Traversal and Insertion',
      slug: 'list-operations',
      description: `Traversing a linked list requires following the chain of next pointers from the head node to the NULL terminator, visiting each node exactly once. The critical rule is to never move the head pointer itself during traversal — if you advance head to the next node, the address of the first node is lost permanently, and all preceding nodes become unreachable memory leaks. Instead, you declare a temporary traversal pointer (Node *current = head) and advance it (current = current->next) inside a while (current != NULL) loop. The head pointer remains anchored at the start of the list, preserving the entry point for all future operations.

Insertion into a linked list is fundamentally a pointer-rewiring operation, and its complexity depends on the position. Inserting at the head is the simplest and fastest case (O(1)): allocate a new node, set its next pointer to the current head, and update head to point to the new node. Inserting at the tail requires traversing the entire list to find the last node (the one whose next is NULL), then setting that node's next pointer to the new node and setting the new node's next to NULL. This traversal makes tail insertion O(N) for a basic singly linked list, though maintaining a separate tail pointer can reduce it to O(1). Inserting at a specific position in the middle requires traversing to the node just before the desired position, then splicing the new node into the chain: the new node's next is set to the predecessor's next, and the predecessor's next is updated to point to the new node.

The order of pointer assignments during insertion is critical and is the most common source of linked list bugs. If you update the predecessor's next pointer before setting the new node's next pointer, the rest of the list becomes unreachable — you have severed the chain. The safe pattern is always: first connect the new node to the rest of the list (newNode->next = predecessor->next), then connect the predecessor to the new node (predecessor->next = newNode). This order guarantees that the existing chain is never broken, even momentarily.`,
      keyPoints: [
        'The Golden Rule of Traversal: NEVER move the `head` pointer to walk the list. If `head` moves, the start of the list is permanently orphaned. ALWAYS declare a sacrificial `Node *temp = head;` pointer to perform the walking.',
        'The Walk: Traversal is achieved via `while (temp != NULL)`. To step forward, you execute `temp = temp->next;`, effectively overwriting your current address with the address of the next node.',
        'O(1) Head Insertion: To insert at the front, create a new node, point its `next` to the current `head`, and immediately redefine `head` to point to the new node.',
        'O(N) Tail Insertion: To insert at the back, you must suffer an O(N) traversal all the way to the node whose `next` is `NULL`, then overwrite that `NULL` with the new node\'s address.',
      ],
      codeExamples: [
        {
          id: 'u3-t12-s2-ex1',
          title: 'Insert at Head and Print',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\n/* Pass address of head (&head) so we can modify the main head pointer */\nvoid insertHead(Node **headRef, int newData) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = newData;\n    \n    /* Point new node to the old head */\n    newNode->next = *headRef;\n    \n    /* Update head to point to the new node */\n    *headRef = newNode;\n}\n\nvoid printList(Node *head) {\n    Node *temp = head;\n    while (temp != NULL) {\n        printf("%d -> ", temp->data);\n        temp = temp->next; /* Move forward */\n    }\n    printf("NULL\\n");\n}\n\nint main(void) {\n    Node *head = NULL;\n    insertHead(&head, 10);\n    insertHead(&head, 20);\n    insertHead(&head, 30);\n    \n    printList(head);\n    return 0;\n}',
          language: 'c',
          explanation: 'We seamlessly insert 10, then 20, then 30 at the absolute front, yielding a 30 -> 20 -> 10 chain. Pay critical attention to the `Node **headRef` argument. Because C functions use pass-by-value, if we passed the `head` pointer directly, we would only modify a local copy. To permanently alter the true `head` pointer residing in `main`, we are forced to pass a Pointer-to-a-Pointer (Double Pointer).',
          expectedOutput: '30 -> 20 -> 10 -> NULL',
          lineBreakdown: [
            { lineNumber: 10, code: 'void insertHead(Node **headRef, int newData) {', explanation: 'A double pointer (`**`). It stores the memory address of the `head` pointer variable itself.' },
            { lineNumber: 15, code: '    newNode->next = *headRef;', explanation: 'Dereferences the double pointer to read the current start of the list, hooking the new node to it.' },
            { lineNumber: 18, code: '    *headRef = newNode;', explanation: 'Dereferences the double pointer to forcefully update `main`\'s `head` variable to point to the new node.' },
            { lineNumber: 25, code: '        temp = temp->next;', explanation: 'The indispensable traversal mechanic. Reads the pointer stored inside the current node and steps forward to it.' },
          ],
          relatedTopicIds: ['u2-t3'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t12-s2-cm1',
          title: 'Traversing with the head pointer',
          wrongCode: 'while(head != NULL) {\n    printf("%d", head->data);\n    head = head->next;\n}',
          correctCode: 'Node *temp = head;\nwhile(temp != NULL) {\n    printf("%d", temp->data);\n    temp = temp->next;\n}',
          explanation: 'If you use the `head` pointer to iterate the list (`head = head->next`), you are systematically overwriting the only variable that knows where the list begins. When the loop hits `NULL`, `head` becomes `NULL`. The entire list of data still exists perfectly intact on the Heap, but you have mathematically lost the ability to ever locate it again. This is a severe, unrecoverable Memory Leak.',
          consequence: 'Catastrophic, unrecoverable Memory Leak.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t12-s2-ic1',
          title: 'Reversing a Linked List',
          content: 'The ultimate rite of passage in systems interviews: "Reverse a singly linked list in place in O(N) time and O(1) space." You must juggle three pointers simultaneously: `prev`, `curr`, and `next`. You meticulously traverse the list, temporarily saving `curr->next`, violently reversing `curr->next` to aim at `prev`, and then sliding the entire three-pointer window one step forward.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t12-s2-cp1',
          title: 'List Mechanics',
          description: 'Verify your mastery of pointer rewiring and traversal loops.',
          criteria: [
            'Write the exact `while` loop condition required to safely traverse a list until the end.',
            'Write the specific line of code that mechanically advances a pointer to the next node.',
            'Architecturally defend why `insertHead` strictly demands a double pointer `Node **`.',
          ],
          topicId: 'u3-t12',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t12-s2-rc1',
          front: 'What code is used to move a traversal pointer `temp` forward to the next node?',
          back: '`temp = temp->next;`',
          topicId: 'u3-t12',
          tags: ['lists', 'traversal'],
        },
        {
          id: 'u3-t12-s2-rc2',
          front: 'What is the Time Complexity (Big O) of inserting a node at the HEAD of a list?',
          back: 'O(1) - Constant Time. Because we have direct access to the `head` pointer, the CPU executes exactly two pointer re-assignments, taking the exact same microsecond whether the list has 5 nodes or 5 billion nodes.',
          topicId: 'u3-t12',
          tags: ['lists', 'complexity'],
        },
      ],
    },
    {
      id: 'u3-t12-s3',
      title: 'Deleting Nodes and Memory Cleanup',
      slug: 'list-deletion',
      description: `Deleting a node from a linked list involves three steps that must be performed in the correct order: locate the target node, bypass it by rewiring the pointers of its neighbors, and free the memory it occupies. The bypassing step is the core of the operation: you set the predecessor node's next pointer to the target node's next pointer (prev->next = target->next), effectively splicing the target out of the chain. After this pointer update, the target node is no longer reachable through the list, but it still occupies heap memory until you explicitly call free(target).

Deleting the head node is a special case because there is no predecessor to update \u2014 instead, you must update the head pointer itself. The safe sequence is: save the current head in a temporary pointer, advance head to head->next, then free the temporary pointer. If you free head before advancing it, you lose access to the next node's address, severing the entire list. Deleting a middle or tail node requires traversing the list with two pointers (prev and current) until current reaches the target node. At that point, prev->next is set to current->next, and current is freed. Maintaining the prev pointer throughout the traversal is essential; without it, you cannot modify the predecessor's next field to skip over the deleted node.

The memory management discipline for deletion is absolute: every node that is removed from the list must be freed, and every freed pointer should be set to NULL to prevent dangling pointer access. Forgetting to free a removed node creates a memory leak \u2014 the node's heap memory is permanently lost because no pointer in the program references it. Conversely, freeing a node and then continuing to access it through a stale pointer (use-after-free) is one of the most dangerous bugs in C, because the freed memory may be reallocated to a completely different data structure, and writing through the stale pointer silently corrupts that structure's data. The combination of linked list manipulation and manual memory management makes this topic the definitive test of a C programmer's ability to reason about pointer ownership and lifecycle.`,
      keyPoints: [
        'The Middle Deletion: To delete a node in the center, you must simultaneously track the `prev` (previous) node. By executing `prev->next = targetNode->next`, you "snap" the chain, perfectly bypassing the target.',
        'The Destruction Mandate: Once bypassed, the target node is no longer part of the list, but it still consumes physical Heap memory. You MUST execute `free(targetNode)` immediately to prevent a memory leak.',
        'The Head Deletion: A special architectural case. You bypass it by writing `head = head->next`, completely dropping the first node from the chain, followed immediately by `free(oldHead)`.',
        'Global Teardown: Before your program safely terminates, you are strictly required to write a loop that traverses the entire list, deliberately `free()`ing every single node.',
      ],
      codeExamples: [
        {
          id: 'u3-t12-s3-ex1',
          title: 'Freeing the Entire List',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nvoid freeList(Node *head) {\n    Node *temp;\n    \n    while (head != NULL) {\n        temp = head;         /* Save the current node to be freed */\n        head = head->next;   /* Move head to the next safe node */\n        free(temp);          /* Destroy the saved node */\n    }\n    printf("List fully deleted from memory.\\n");\n}\n\nint main(void) {\n    /* (Assume list was built here) */\n    return 0;\n}',
          language: 'c',
          explanation: 'It is a fatal error to blindly execute `free(head)`. This instantly vaporizes the first node, completely orphaning the rest of the chain in RAM. Worse, you cannot execute `free(head)` and subsequently rely on `head = head->next`, because you are attempting to read the `next` pointer from memory you just returned to the OS. You are forced to save a temporary copy, safely advance the head, and then trigger the execution.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 13, code: '        temp = head;', explanation: 'Locks onto the exact memory address of the node marked for destruction.' },
            { lineNumber: 14, code: '        head = head->next;', explanation: 'Safely slides the anchor forward. We can do this because `temp` is holding the target.' },
            { lineNumber: 15, code: '        free(temp);', explanation: 'Sends the execution order to the OS, reclaiming the Heap memory.' },
          ],
          relatedTopicIds: ['u3-t4'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t12-s3-cm1',
          title: 'Freeing before advancing',
          wrongCode: 'while(head != NULL) {\n    free(head);\n    head = head->next; /* CRASH! */\n}',
          correctCode: 'while(head != NULL) {\n    Node *temp = head;\n    head = head->next;\n    free(temp);\n}',
          explanation: 'When `free(head)` runs, that block of Heap memory is officially revoked and marked as garbage by the OS. On the exact next line, `head = head->next` physically attempts to read the `next` pointer from that revoked, dead memory block. This is the definition of a Use-After-Free vulnerability, guaranteed to trigger a violent Segmentation Fault.',
          consequence: 'Violent Segmentation Fault (Use-After-Free Vulnerability).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t12-s3-ic1',
          title: 'Cycle Detection (Floyd\'s Tortoise and Hare)',
          content: 'A masterpiece algorithmic interview question: "How do you detect if a Linked List loops infinitely (a cycle)?" The definitive answer is Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare). You initialize a `slow` pointer moving 1 step, and a `fast` pointer moving 2 steps. If a loop exists, the fast pointer is mathematically guaranteed to lap the slow pointer, and their addresses will become identical. If `fast` safely hits `NULL`, no cycle exists.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t12-s3-cp1',
          title: 'List Cleanup',
          description: 'Verify your memory cleanup logic and understanding of use-after-free bugs.',
          criteria: [
            'Architecturally explain why simply calling `free(head)` does not safely delete a linked list.',
            'Mechanically detail why a temporary pointer is strictly necessary when writing a node deletion loop.',
          ],
          topicId: 'u3-t12',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t12-s3-rc1',
          front: 'What happens if you `free(node)` and then try to read `node->next`?',
          back: 'You trigger a catastrophic Use-After-Free vulnerability. Attempting to dereference memory that has already been returned to the OS guarantees an immediate Segmentation Fault.',
          topicId: 'u3-t12',
          tags: ['lists', 'memory', 'segfault'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t12-q1',
      type: 'mcq',
      topicId: 'u3-t12',
      difficulty: 'beginner',
      question: 'Which of the following is true about Linked Lists compared to Arrays?',
      options: [
        'Linked Lists allow instant O(1) access to the 50th element.',
        'Linked Lists store all their elements contiguously in memory.',
        'Linked Lists can easily grow and shrink in size during runtime.',
        'Linked Lists use less memory overall than Arrays.'
      ],
      correctAnswer: 'Linked Lists can easily grow and shrink in size during runtime.',
      explanation: 'Arrays are fixed size. Lists can grow infinitely by calling malloc for new nodes. (Lists use MORE memory than arrays because of the next pointers, and do NOT have O(1) indexing).',
      tags: ['lists', 'arrays'],
    },
    {
      id: 'u3-t12-q2',
      type: 'predict-output',
      topicId: 'u3-t12',
      difficulty: 'intermediate',
      question: 'Assume a list 10 -> 20 -> 30 -> NULL. `temp` points to 10. What is the output of `printf("%d", temp->next->next->data);`?',
      options: ['10', '20', '30', 'Crash'],
      correctAnswer: '30',
      explanation: '`temp` is 10. `temp->next` is the node 20. `temp->next->next` is the node 30. We print its data.',
      tags: ['lists', 'pointers', 'traversal'],
    },
    {
      id: 'u3-t12-q3',
      type: 'spot-bug',
      topicId: 'u3-t12',
      difficulty: 'advanced',
      question: 'Spot the bug in this list traversal code intended to print all nodes:',
      code: 'while (head->next != NULL) {\n    printf("%d", head->data);\n    head = head->next;\n}',
      correctAnswer: 'It skips the last node, and ruins the head pointer.',
      explanation: 'First, it destroys the `head` pointer. Second, when it reaches the last node, `head->next` IS NULL, so the loop stops BEFORE printing the last node\'s data. It should be `while(temp != NULL)`.',
      tags: ['lists', 'traversal', 'bugs'],
    },
    {
      id: 'u3-t12-q4',
      type: 'true-false',
      topicId: 'u3-t12',
      difficulty: 'beginner',
      question: 'The `head` pointer contains the data of the first element.',
      correctAnswer: false,
      explanation: 'The `head` pointer is just a memory address. It POINTS to the first node. You must dereference it (`head->data`) to see the actual data.',
      tags: ['lists', 'pointers'],
    },
    {
      id: 'u3-t12-q5',
      type: 'mcq',
      topicId: 'u3-t12',
      difficulty: 'intermediate',
      question: 'Why does a function that inserts at the head (e.g., `insert(Node **head, int x)`) need a double pointer?',
      options: [
        'Because Linked Lists are 2-dimensional structures.',
        'Because `malloc` returns a double pointer.',
        'So the function can modify the caller\'s original `head` pointer variable to point to the new node.',
        'To improve speed by avoiding cache misses.'
      ],
      correctAnswer: 'So the function can modify the caller\'s original `head` pointer variable to point to the new node.',
      explanation: 'In C, everything is passed by value. If you pass `Node *head`, the function gets a COPY of the address. Modifying the copy doesn\'t change the real `head` in main. Passing `Node **` passes the address of the `head` variable itself.',
      tags: ['lists', 'pointers', 'functions'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t12-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t12',
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
      id: 'u3-t12-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t12',
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
      id: 'u3-t12-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t12',
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
      id: 'u3-t12-p1',
      title: 'Search Linked List',
      topicId: 'u3-t12',
      difficulty: 'beginner',
      problemStatement: 'Write a function `int search(Node *head, int target)` that traverses a linked list. It should return 1 if the target integer is found, and 0 if it is not found.',
      constraints: ['Use a while loop'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['Node *temp = head;', 'while (temp != NULL)', 'if (temp->data == target) return 1;'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nint search(Node *head, int target) {\n    Node *temp = head;\n    while (temp != NULL) {\n        if (temp->data == target) {\n            return 1; /* Found! */\n        }\n        temp = temp->next; /* Move forward */\n    }\n    return 0; /* Not found */\n}\n\nint main(void) {\n    /* Setup list 10 -> 20 -> NULL manually for testing */\n    Node *n1 = malloc(sizeof(Node));\n    Node *n2 = malloc(sizeof(Node));\n    n1->data = 10; n1->next = n2;\n    n2->data = 20; n2->next = NULL;\n    \n    printf("Search 20: %d\\n", search(n1, 20));\n    printf("Search 99: %d\\n", search(n1, 99));\n    return 0;\n}',
      solutionExplanation: 'The most basic traversal algorithm. Notice that because we are only READING the list, we can pass `Node *head` (single pointer) safely, and we don\'t even strictly need `temp` (we could just advance `head` locally since it\'s a copy), but using `temp` is best practice.',
      dryRun: [
        { step: 1, line: 10, variables: { target: '20' }, output: '', explanation: 'temp points to n1 (10).' },
        { step: 2, line: 15, variables: {}, output: '', explanation: '10 != 20. temp moves to n2 (20).' },
        { step: 3, line: 13, variables: {}, output: '', explanation: '20 == 20. Returns 1.' },
      ],
      tags: ['lists', 'traversal', 'searching'],
    },
    {
      id: 'u3-t12-p2',
      title: 'Insert at Tail',
      topicId: 'u3-t12',
      difficulty: 'intermediate',
      problemStatement: 'Write a function `void insertTail(Node **head, int data)` that adds a new node to the VERY END of the list. Handle the edge case where the list is currently empty (`*head == NULL`).',
      constraints: ['Use double pointer', 'Traverse to the end'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['If *head is NULL, just make *head = newNode.', 'Otherwise, temp = *head; while (temp->next != NULL) { temp = temp->next; }', 'temp->next = newNode;'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nvoid insertTail(Node **head, int data) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    newNode->data = data;\n    newNode->next = NULL; /* New tail must point to NULL */\n    \n    /* Case 1: Empty list */\n    if (*head == NULL) {\n        *head = newNode;\n        return;\n    }\n    \n    /* Case 2: Traverse to the last node */\n    Node *temp = *head;\n    while (temp->next != NULL) {\n        temp = temp->next;\n    }\n    \n    /* Attach the new node */\n    temp->next = newNode;\n}\n\nint main(void) {\n    Node *head = NULL;\n    insertTail(&head, 5);\n    insertTail(&head, 10);\n    \n    printf("%d -> %d\\n", head->data, head->next->data);\n    return 0;\n}',
      solutionExplanation: 'Notice the while loop condition: `temp->next != NULL`. We want to STOP on the very last node. If we used `temp != NULL`, we would fall off the edge of the list and have no way to attach the new node to the chain!',
      dryRun: [
        { step: 1, line: 16, variables: {}, output: '', explanation: 'insertTail(5): List empty. *head set to new node 5.' },
        { step: 2, line: 22, variables: {}, output: '', explanation: 'insertTail(10): List not empty. temp->next IS NULL (since it\'s the only node). Loop skipped.' },
        { step: 3, line: 27, variables: {}, output: '', explanation: 'temp->next (Node 5\'s next) is pointed to Node 10.' },
      ],
      tags: ['lists', 'insertion'],
    },
    {
      id: 'u3-t12-p3',
      title: 'Find Middle Element (Tortoise and Hare)',
      topicId: 'u3-t12',
      difficulty: 'advanced',
      problemStatement: 'Write a function `int getMiddle(Node *head)` that returns the data of the middle node of a list in a SINGLE pass. Do not calculate the length of the list first. Use the two-pointer technique.',
      constraints: ['Single pass O(N)', 'Slow/Fast pointers'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['Node *slow = head; Node *fast = head;', 'while (fast != NULL && fast->next != NULL)', 'slow moves 1 step, fast moves 2 steps.'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nint getMiddle(Node *head) {\n    if (head == NULL) return -1;\n    \n    Node *slow = head;\n    Node *fast = head;\n    \n    /* Fast moves 2x as fast. When fast hits the end, slow is exactly in the middle. */\n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    \n    return slow->data;\n}\n\nint main(void) {\n    Node *n1 = malloc(sizeof(Node));\n    Node *n2 = malloc(sizeof(Node));\n    Node *n3 = malloc(sizeof(Node));\n    n1->data=10; n1->next=n2;\n    n2->data=20; n2->next=n3;\n    n3->data=30; n3->next=NULL;\n    \n    printf("Middle: %d\\n", getMiddle(n1));\n    return 0;\n}',
      solutionExplanation: 'A masterful algorithm. The "fast" pointer moves two jumps per loop, the "slow" pointer moves one. By the time the fast pointer reaches the end of the road, the slow pointer has traversed exactly half the distance! No length pre-calculation needed.',
      dryRun: [
        { step: 1, line: 12, variables: {}, output: '', explanation: 'slow is 10, fast is 10.' },
        { step: 2, line: 17, variables: {}, output: '', explanation: 'Loop 1: slow moves to 20. fast jumps to 30.' },
        { step: 3, line: 16, variables: {}, output: '', explanation: 'Loop 2 condition: fast->next is NULL. Loop terminates.' },
        { step: 4, line: 21, variables: {}, output: '', explanation: 'Returns slow->data (20).' },
      ],
      tags: ['lists', 'algorithms', 'two-pointers'],
    },
  ],
};
