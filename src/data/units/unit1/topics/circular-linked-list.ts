import type { Topic } from '../../../../types';

export const circularLinkedList: Topic = {
  id: 'u1-t4',
  unitId: 'unit-1',
  title: 'Circular Linked Lists',
  slug: 'circular-linked-list',
  description: `A Circular Linked List is a variation of a linked list where the last node points back to the first node, instead of pointing to NULL. This creates a circular structure, allowing traversal to continue indefinitely without encountering an end. This topology is extremely useful in applications where elements need to be accessed in a continuous loop, such as round-robin scheduling, multiplayer board games, and buffering data streams.

There are different ways to maintain a circular linked list. The standard approach utilizes a single 'tail' pointer (instead of a 'head' pointer), which provides O(1) time complexity for inserting at both the beginning and the end. Another approach, taught by Dinesh Singh, employs a specialized 'header node' whose data field maintains the count of nodes, providing a consistent structural anchor.

In this topic, we will comprehensively cover Circular Singly Linked Lists (CSLL) using the tail pointer method, the header-node method, and extend these concepts to Circular Doubly Linked Lists (CDLL). Understanding these variations will empower you to choose the most efficient data structure for cyclic problems in software engineering.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t1', 'u1-t2', 'u1-t3'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u1-t4-s1',
      title: 'Circular SLL: Structure & Invariant',
      slug: 'circular-sll-structure',
      description: `In a standard Singly Linked List, the last node points to NULL, marking the end of the list. In a Circular Singly Linked List (CSLL), the last node's \`next\` pointer holds the address of the first node. This single modification transforms the linear structure into a ring. Consequently, any node can be a starting point to traverse the entire list.

A critical design choice in implementing a CSLL is keeping track of the list using a \`tail\` pointer rather than a \`head\` pointer. If we only maintain a \`head\` pointer, inserting an element at the end of the list would require O(N) time because we must traverse the entire ring to locate the last node. 

By maintaining a \`tail\` pointer, we immediately know the last node. More importantly, because \`tail->next\` points to the first node, we also have O(1) access to the head. This elegant invariant (\`tail->next == head\`) allows both insertion at the beginning and insertion at the end to be executed in constant O(1) time.`,
      keyPoints: [
        'The last node in a Circular Singly Linked List points to the first node, not NULL.',
        'Traversal can begin from any node and cover the entire list until the starting node is reached again.',
        'Maintaining a tail pointer instead of a head pointer allows O(1) access to both ends of the list.',
        'The fundamental invariant is that tail->next always points to the first node of the list.',
        'An empty CSLL is typically represented by a tail pointer set to NULL.'
      ],
      codeExamples: [
        {
          id: 'u1-t4-s1-ex1',
          title: 'Defining and Traversing a Circular SLL using Tail Pointer',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Function to traverse and print the circular list\nvoid traverse(struct Node* tail) {\n    if (tail == NULL) {\n        printf("List is empty.\\n");\n        return;\n    }\n    \n    struct Node* current = tail->next; // Start from head\n    do {\n        printf("%d -> ", current->data);\n        current = current->next;\n    } while (current != tail->next);\n    printf("(back to head)\\n");\n}\n\nint main() {\n    // Manually constructing a circular list with 3 nodes\n    struct Node* n1 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n2 = (struct Node*)malloc(sizeof(struct Node));\n    struct Node* n3 = (struct Node*)malloc(sizeof(struct Node));\n    \n    n1->data = 10;\n    n2->data = 20;\n    n3->data = 30;\n    \n    n1->next = n2;\n    n2->next = n3;\n    n3->next = n1; // Circular link\n    \n    struct Node* tail = n3; // Tail points to the last node\n    \n    traverse(tail);\n    \n    free(n1); free(n2); free(n3);\n    return 0;\n}`,
          language: 'c',
          explanation: 'This example demonstrates the basic structure of a CSLL and how to traverse it. Notice the use of a do-while loop for traversal, which ensures the loop executes at least once before checking if we have returned to the starting point.',
          expectedOutput: '10 -> 20 -> 30 -> (back to head)',
          lineBreakdown: [
            { lineNumber: 18, code: 'do { ... } while (current != tail->next);', explanation: 'A do-while loop is perfect here because we start at tail->next (head) and want to stop when we reach it again.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s1-cm1',
          title: 'Infinite loops during traversal',
          wrongCode: `struct Node* temp = tail->next;\nwhile (temp != NULL) {\n    printf("%d ", temp->data);\n    temp = temp->next;\n}`,
          correctCode: `struct Node* temp = tail->next;\ndo {\n    printf("%d ", temp->data);\n    temp = temp->next;\n} while (temp != tail->next);`,
          explanation: 'Using a standard linear linked list traversal loop (checking for NULL) in a circular list causes an infinite loop because there is no NULL pointer.',
          consequence: 'The program will print elements indefinitely and eventually crash or hang.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s1-ic1',
          title: 'Why tail pointer instead of head pointer?',
          content: 'In interviews, you might be asked why we prefer a tail pointer for CSLLs. Explain that with a tail pointer, `tail` gives you the last node, and `tail->next` gives you the first node. This allows O(1) insertions at both ends. If you only had a head pointer, inserting at the end would take O(N) because you must traverse the list to find the last node to update its next pointer.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t4-s1-cp1',
          title: 'CSLL Traversal Condition',
          description: 'Ensure you understand the stopping condition for a CSLL traversal.',
          criteria: ['Use a do-while loop', 'Stop when current node equals the starting node (tail->next)', 'Handle empty list separately'],
          topicId: 'u1-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t4-s1-rc1',
          front: 'What is the primary structural difference between a linear SLL and a circular SLL?',
          back: 'In a circular SLL, the last node points to the first node instead of NULL.',
          topicId: 'u1-t4',
          tags: ['structure', 'concept']
        }
      ]
    },
    {
      id: 'u1-t4-s2',
      title: 'CSLL Operations: Insertion & Deletion',
      slug: 'csll-operations',
      description: `Performing insertions and deletions in a Circular Singly Linked List with a tail pointer requires careful pointer manipulation to maintain the circular invariant. 

For insertion at the head, the new node's \`next\` must point to the current head (\`tail->next\`), and the tail must be updated to point to the new node (\`tail->next = New\`). For insertion at the tail, the process is identical, with one additional step: the \`tail\` pointer itself moves to the newly inserted node (\`tail = New\`).

Deletion requires distinguishing between deleting a node from a single-node list (where \`tail\` becomes NULL) and deleting from a multi-node list. To delete the head, we bypass it (\`tail->next = Cur->next\`) and free the memory. To delete any other node, we maintain a \`prev\` pointer and adjust it to bypass the target node (\`prev->next = Cur->next\`).`,
      keyPoints: [
        'Insert at head: New->next = Tail->next; Tail->next = New;',
        'Insert at end: New->next = Tail->next; Tail->next = New; Tail = New;',
        'Insert at middle: New->next = Cur; Prev->next = New;',
        'Delete from single-node list: Tail = NULL; free(Cur);',
        'Delete head node: Tail->next = Cur->next; free(Cur);',
        'Delete middle node: Prev->next = Cur->next; free(Cur);'
      ],
      codeExamples: [
        {
          id: 'u1-t4-s2-ex1',
          title: 'CSLL Insertion Operations (Tail Pointer)',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Insert at head\nstruct Node* insertHead(struct Node* tail, int data) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = data;\n    \n    if (tail == NULL) {\n        tail = newNode;\n        tail->next = tail; // Points to itself\n    } else {\n        newNode->next = tail->next;\n        tail->next = newNode;\n    }\n    return tail;\n}\n\n// Insert at end\nstruct Node* insertEnd(struct Node* tail, int data) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = data;\n    \n    if (tail == NULL) {\n        tail = newNode;\n        tail->next = tail;\n    } else {\n        newNode->next = tail->next;\n        tail->next = newNode;\n        tail = newNode; // Tail moves to the new node\n    }\n    return tail;\n}\n\nvoid traverse(struct Node* tail) {\n    if (tail == NULL) return;\n    struct Node* temp = tail->next;\n    do {\n        printf("%d ", temp->data);\n        temp = temp->next;\n    } while(temp != tail->next);\n    printf("\\n");\n}\n\nint main() {\n    struct Node* tail = NULL;\n    tail = insertEnd(tail, 20);\n    tail = insertHead(tail, 10);\n    tail = insertEnd(tail, 30);\n    \n    printf("List: ");\n    traverse(tail);\n    \n    return 0;\n}`,
          language: 'c',
          explanation: 'This code shows how O(1) insertions work. Notice how insertEnd is nearly identical to insertHead, except for updating the tail pointer to the newly inserted node.',
          expectedOutput: 'List: 10 20 30',
          lineBreakdown: [
            { lineNumber: 35, code: 'tail = newNode;', explanation: 'This single line transforms an insert-at-head operation into an insert-at-end operation.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s2-cm1',
          title: 'Incorrect initialization of the first node',
          wrongCode: `if (tail == NULL) {\n    tail = newNode;\n    tail->next = NULL; \n}`,
          correctCode: `if (tail == NULL) {\n    tail = newNode;\n    tail->next = tail;\n}`,
          explanation: 'When inserting the first node into an empty CSLL, its next pointer must point to itself to establish the circular invariant.',
          consequence: 'Segmentation fault during traversal because the code expects a circular loop, not NULL.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s2-ic1',
          title: 'Complexity of CSLL Operations',
          content: 'Be ready to articulate the time complexity: Insert/Delete at head is O(1). Insert at tail is O(1). Delete at tail is O(N) because you need to traverse the list to find the second-to-last node to update the tail pointer.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t4-s2-cp1',
          title: 'Insertion Logic',
          description: 'Verify the difference between head and tail insertion.',
          criteria: ['Both link newNode to tail->next', 'Both make tail point to newNode', 'Only insertEnd updates the tail pointer to newNode'],
          topicId: 'u1-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t4-s2-rc1',
          front: 'What is the time complexity of inserting a node at the end of a CSLL maintained with a tail pointer?',
          back: 'O(1) constant time.',
          topicId: 'u1-t4',
          tags: ['complexity', 'insertion']
        }
      ]
    },
    {
      id: 'u1-t4-s3',
      title: 'Header-Node-Based Circular List',
      slug: 'header-node-csll',
      description: `An alternative paradigm for implementing Circular Linked Lists involves using a Header Node. As taught by Dinesh Singh, this approach uses an explicit, dummy 'header node' at the very beginning of the list. The external pointer (\`p\`) points to this header node. The node following the header is considered the first actual data node, and the last node's address part points back to the header node.

The primary advantage of the header node is that it eliminates the need to handle the 'empty list' as a special case during insertions and deletions. The header node always exists. Furthermore, the \`data\` field of the header node is cleverly repurposed to keep track of the total number of nodes in the list, allowing O(1) retrieval of the list's size.

In this model, \`create_head()\` allocates the header and sets it to point to itself. \`insert_head(p, x)\` inserts after the header, while \`insert_tail(p, x)\` traverses to the node before the header to insert at the end. After any insertion, \`p->data++\` increments the node count.`,
      keyPoints: [
        'The external pointer points to a dummy header node, not the first data node.',
        'The last node in the list points back to the header node.',
        'The header node’s data field stores the total node count.',
        'create_head(): temp->data=0; temp->next=temp;',
        'insert_head(): temp->next=p->next; p->next=temp; p->data++;',
        'Reduces edge-case handling for empty lists.'
      ],
      codeExamples: [
        {
          id: 'u1-t4-s3-ex1',
          title: 'Header-Node Circular List Operations',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\n// Create the header node\nstruct Node* create_head() {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = 0; // Number of nodes is 0\n    temp->next = temp; // Points to itself\n    return temp;\n}\n\n// Insert at the beginning (right after header)\nvoid insert_head(struct Node* p, int x) {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = x;\n    temp->next = p->next;\n    p->next = temp;\n    p->data++; // Increment node count\n}\n\n// Insert at the end\nvoid insert_tail(struct Node* p, int x) {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = x;\n    struct Node* q = p;\n    \n    // Traverse until we find the last node (whose next is the header)\n    while (q->next != p) {\n        q = q->next;\n    }\n    \n    temp->next = p;\n    q->next = temp;\n    p->data++; // Increment node count\n}\n\n// Display list and node count\nvoid display(struct Node* p) {\n    printf("Total Nodes: %d\\n", p->data);\n    struct Node* q = p->next;\n    while (q != p) { // Stop when we wrap back to the header\n        printf("%d ", q->data);\n        q = q->next;\n    }\n    printf("\\n");\n}\n\nint main() {\n    struct Node* head = create_head();\n    \n    insert_head(head, 10);\n    insert_tail(head, 20);\n    insert_head(head, 5);\n    \n    display(head);\n    \n    return 0;\n}`,
          language: 'c',
          explanation: 'This code illustrates the Header-Node approach. Notice that the external pointer `p` never changes after the list is created, and we do not need special `if (head == NULL)` checks for insertions.',
          expectedOutput: 'Total Nodes: 3\n5 10 20 ',
          lineBreakdown: [
            { lineNumber: 24, code: 'p->data++;', explanation: 'Using the header node\'s data field to store the count of nodes.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s3-cm1',
          title: 'Printing the header node',
          wrongCode: `struct Node* q = p;\nwhile(q->next != p) {\n    printf("%d ", q->data);\n    q = q->next;\n}`,
          correctCode: `struct Node* q = p->next;\nwhile(q != p) {\n    printf("%d ", q->data);\n    q = q->next;\n}`,
          explanation: 'The header node is a dummy node containing metadata (count), not list data. Traversal for printing must start at `p->next` and stop before printing `p` again.',
          consequence: 'The node count will be printed as if it were a data element in the list.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s3-ic1',
          title: 'Trade-offs of dummy header nodes',
          content: 'Using a dummy header simplifies code logic by removing NULL edge cases. However, it uses an extra node\'s worth of memory. In systems programming (like the Linux kernel), dummy headers are extensively used to simplify list manipulation macros.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t4-s3-cp1',
          title: 'Header Metadata',
          description: 'Identify the role of the header node.',
          criteria: ['Holds total count in data field', 'Simplifies insertion logic', 'Is never deleted during normal operations'],
          topicId: 'u1-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t4-s3-rc1',
          front: 'In Dinesh Singh\'s Header-Node Circular List, what does the external pointer point to?',
          back: 'It points to the dummy header node, not the first data node.',
          topicId: 'u1-t4',
          tags: ['header-node']
        }
      ]
    },
    {
      id: 'u1-t4-s4',
      title: 'Circular DLL & Applications',
      slug: 'circular-dll',
      description: `A Circular Doubly Linked List (CDLL) combines the features of both circular and doubly linked lists. Each node contains a data part and two pointers: \`llink\` (left link/prev) and \`rlink\` (right link/next). In this structure, the last node's \`rlink\` points back to the head, and the first node's \`llink\` points to the last node. For an empty list represented by a header node, \`head->llink = head->rlink = head\`.

The CDLL provides maximum flexibility: O(1) insertions/deletions at both ends, and bidirectional traversal. While it requires more memory per node (due to the extra pointer), the ease of node deletion (when given a pointer to the node) without needing a prior traversal is a massive advantage.

Circular Linked Lists are not just theoretical constructs; they map directly to real-world software patterns. A classic application is Round Robin Scheduling in Operating Systems, where the CPU time is shared equally among active processes arranged in a circular list. Another ubiquitous application is the Circular Buffer (Ring Buffer), widely used in networking, audio streaming, and producer-consumer problems.`,
      keyPoints: [
        'CDLL structure: struct node { int data; struct node *llink; struct node *rlink; }',
        'First node’s llink points to the last node.',
        'Last node’s rlink points to the first node.',
        'Empty CDLL with header: head->llink = head->rlink = head.',
        'Applications include Round Robin CPU Scheduling and Ring Buffers for streaming data.'
      ],
      codeExamples: [
        {
          id: 'u1-t4-s4-ex1',
          title: 'Empty CDLL Initialization',
          code: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct node {\n    int data;\n    struct node* llink;\n    struct node* rlink;\n};\n\n// Initialize an empty CDLL header node\nstruct node* init_cdll() {\n    struct node* head = (struct node*)malloc(sizeof(struct node));\n    head->data = 0; // Or dummy value\n    head->llink = head;\n    head->rlink = head;\n    return head;\n}\n\nint main() {\n    struct node* list_head = init_cdll();\n    if (list_head->llink == list_head && list_head->rlink == list_head) {\n        printf("Empty CDLL initialized correctly.\\n");\n    }\n    free(list_head);\n    return 0;\n}`,
          language: 'c',
          explanation: 'An empty Circular Doubly Linked List is characterized by the head node pointing to itself in both directions (llink and rlink). This eliminates NULL pointers entirely.',
          expectedOutput: 'Empty CDLL initialized correctly.',
          lineBreakdown: [],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s4-cm1',
          title: 'Forgetting to update the previous pointer in circular links',
          wrongCode: `// Inserting new node at end of CDLL\nnewNode->rlink = head;\nnewNode->llink = last;\nlast->rlink = newNode;\n// Missing head update!`,
          correctCode: `// Inserting new node at end of CDLL\nnewNode->rlink = head;\nnewNode->llink = last;\nlast->rlink = newNode;\nhead->llink = newNode; // Crucial step`,
          explanation: 'In a CDLL, when modifying the last node, you must also update the head node\'s llink (prev) to point to the new last node.',
          consequence: 'Backward traversal from the head will fail or skip the newly inserted node.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s4-ic1',
          title: 'When to choose CDLL over CSLL?',
          content: 'Choose CDLL when you need frequent deletions of arbitrary nodes given only a pointer to the node (O(1) time), or when bidirectional traversal is required. Choose CSLL when memory is tight and you only traverse forward.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t4-s4-cp1',
          title: 'CDLL Pointers',
          description: 'Identify the pointer assignments for the ends of a CDLL.',
          criteria: ['first_node->llink == last_node', 'last_node->rlink == first_node'],
          topicId: 'u1-t4'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t4-s4-rc1',
          front: 'What is a common Operating System application for a Circular Linked List?',
          back: 'Round Robin CPU Scheduling, where processes are given time slices in a cyclic order.',
          topicId: 'u1-t4',
          tags: ['application', 'os']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t4-q1',
      type: 'mcq',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'In a Circular Singly Linked List, what does the next pointer of the last node point to?',
      options: ['NULL', 'The second node', 'The first node', 'A random memory address'],
      correctAnswer: 'The first node',
      explanation: 'To make the list circular, the last node points back to the first node.',
      tags: ['structure']
    },
    {
      id: 'u1-t4-q2',
      type: 'mcq',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      question: 'When maintaining a CSLL with a single pointer, why is a tail pointer preferred over a head pointer?',
      options: [
        'It saves memory.',
        'It allows O(1) insertion at both the head and the tail.',
        'It makes traversal faster.',
        'It simplifies node deletion in the middle.'
      ],
      correctAnswer: 'It allows O(1) insertion at both the head and the tail.',
      explanation: 'With a tail pointer, tail->next gives the head. Thus we have immediate access to both ends, allowing O(1) insertions.',
      tags: ['complexity', 'tail-pointer']
    },
    {
      id: 'u1-t4-q3',
      type: 'true-false',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'In Dinesh Singh\'s Header-Node-Based Circular List, the header node stores the first element of the actual data.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'The header node is a dummy node; its data field is typically used to store the count of nodes, not actual list data.',
      tags: ['header-node']
    },
    {
      id: 'u1-t4-q4',
      type: 'fill-blank',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      question: 'To delete a single node in a tail-pointer CSLL (where the node points to itself), the tail pointer must be set to ______.',
      options: [],
      correctAnswer: 'NULL',
      explanation: 'When the last remaining node is deleted, the list becomes empty, so the tail pointer must be updated to NULL.',
      tags: ['deletion']
    },
    {
      id: 'u1-t4-q5',
      type: 'spot-bug',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      question: 'Identify the bug in this CDLL initialization loop: `head->llink = NULL; head->rlink = NULL;`',
      options: [
        'It should allocate memory.',
        'It uses NULL instead of pointing to itself (head).',
        'llink and rlink should be swapped.',
        'There is no bug.'
      ],
      correctAnswer: 'It uses NULL instead of pointing to itself (head).',
      explanation: 'An empty CDLL with a header node should have its links point back to itself to maintain the circular doubly linked invariant.',
      tags: ['cdll', 'initialization']
    },
    {
      id: 'u1-t4-q6',
      type: 'mcq',
      topicId: 'u1-t4',
      difficulty: 'advanced',
      question: 'What is the time complexity to delete the last node in a Circular Singly Linked List maintained with a tail pointer?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctAnswer: 'O(N)',
      explanation: 'Even with a tail pointer, to delete the last node and update the tail pointer, you must find the second-to-last node. Finding it in a singly linked list requires an O(N) traversal.',
      tags: ['complexity', 'deletion']
    },
    {
      id: 'u1-t4-q7',
      type: 'true-false',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'Round Robin CPU Scheduling is a common real-world application of Circular Linked Lists.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Yes, CPU schedulers use circular lists to cycle through processes repeatedly, giving each a time slice.',
      tags: ['applications']
    },
    {
      id: 'u1-t4-q8',
      type: 'predict-output',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      question: 'What happens if you use a standard linear linked list traversal (`while(curr != NULL)`) on a Circular Linked List?',
      code: `struct Node* curr = tail->next;\nwhile(curr != NULL) {\n    printf("%d", curr->data);\n    curr = curr->next;\n}`,
      options: [
        'It prints the list once.',
        'It causes a compilation error.',
        'It causes an infinite loop.',
        'It skips the last element.'
      ],
      correctAnswer: 'It causes an infinite loop.',
      explanation: 'Because the last node points back to the first node (not NULL), the condition `curr != NULL` will always be true, resulting in an infinite loop.',
      tags: ['traversal', 'bugs']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t4-p1',
      title: 'Implement CSLL with Tail Pointer',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      problemStatement: 'Implement a Circular Singly Linked List using only a tail pointer. Provide functions to insert a node at the front (`insertFront`), insert a node at the end (`insertEnd`), delete a node by its value (`deleteByValue`), and display the list.',
      constraints: [
        'The list will contain at most 1000 nodes.',
        'Nodes contain integer data.'
      ],
      sampleInput: 'insertFront(10), insertEnd(20), insertFront(5), deleteByValue(10), display()',
      sampleOutput: '5 20',
      hints: [
        'For insertFront, ensure the new node points to tail->next, and tail->next points to the new node.',
        'For insertEnd, do the same as insertFront, but also update tail = newNode.',
        'For deletion, handle the case where the deleted node is the tail node, or the only node in the list.'
      ],
      solution: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* insertFront(struct Node* tail, int data) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = data;\n    if (!tail) {\n        tail = newNode;\n        tail->next = tail;\n    } else {\n        newNode->next = tail->next;\n        tail->next = newNode;\n    }\n    return tail;\n}\n\nstruct Node* insertEnd(struct Node* tail, int data) {\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = data;\n    if (!tail) {\n        tail = newNode;\n        tail->next = tail;\n    } else {\n        newNode->next = tail->next;\n        tail->next = newNode;\n        tail = newNode;\n    }\n    return tail;\n}\n\nstruct Node* deleteByValue(struct Node* tail, int data) {\n    if (!tail) return NULL;\n    \n    struct Node *curr = tail->next, *prev = tail;\n    \n    // Single node case\n    if (curr == tail && curr->data == data) {\n        free(curr);\n        return NULL;\n    }\n    \n    do {\n        if (curr->data == data) {\n            prev->next = curr->next;\n            if (curr == tail) {\n                tail = prev; // Update tail if last node deleted\n            }\n            free(curr);\n            return tail;\n        }\n        prev = curr;\n        curr = curr->next;\n    } while (curr != tail->next);\n    \n    return tail;\n}\n\nvoid display(struct Node* tail) {\n    if (!tail) return;\n    struct Node* curr = tail->next;\n    do {\n        printf("%d ", curr->data);\n        curr = curr->next;\n    } while (curr != tail->next);\n    printf("\\n");\n}`,
      solutionExplanation: 'The solution relies entirely on the tail pointer. Insertion at both ends is O(1). The deletion algorithm requires traversal to find the node and its predecessor. Special attention is given to updating the tail pointer if the node to be deleted happens to be the tail itself, or if it is the only node in the list.',
      dryRun: [
        { step: 1, line: 12, variables: { data: '5', tail: 'Node(20)' }, output: '', explanation: 'Inserting 5 at the front. newNode->next points to 20, tail->next points to 5.' }
      ],
      tags: ['csll', 'tail-pointer']
    },
    {
      id: 'u1-t4-p2',
      title: 'Header-Node CSLL Operations',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      problemStatement: 'Implement a Circular Singly Linked List using a Header Node (as described by Dinesh Singh). Write functions for `create_head`, `insert_head`, `insert_tail`, and `delete_node`. The header\'s data field should track the node count.',
      constraints: [
        'External pointer always points to the header node.',
        'Empty list has count 0.'
      ],
      sampleInput: 'head = create_head(); insert_head(head, 1); insert_tail(head, 2); delete_node(head, 1); display(head);',
      sampleOutput: 'Total Nodes: 1\n2',
      hints: [
        'Never delete the header node.',
        'Update p->data (where p is header) upon insertion and deletion.'
      ],
      solution: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* create_head() {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = 0;\n    temp->next = temp;\n    return temp;\n}\n\nvoid insert_head(struct Node* p, int x) {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = x;\n    temp->next = p->next;\n    p->next = temp;\n    p->data++;\n}\n\nvoid insert_tail(struct Node* p, int x) {\n    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));\n    temp->data = x;\n    struct Node* q = p;\n    while (q->next != p) {\n        q = q->next;\n    }\n    temp->next = p;\n    q->next = temp;\n    p->data++;\n}\n\nvoid delete_node(struct Node* p, int x) {\n    struct Node *q = p, *temp;\n    while (q->next != p && q->next->data != x) {\n        q = q->next;\n    }\n    if (q->next != p) {\n        temp = q->next;\n        q->next = temp->next;\n        free(temp);\n        p->data--;\n    }\n}\n\nvoid display(struct Node* p) {\n    printf("Total Nodes: %d\\n", p->data);\n    struct Node* q = p->next;\n    while (q != p) {\n        printf("%d ", q->data);\n        q = q->next;\n    }\n    printf("\\n");\n}`,
      solutionExplanation: 'Using the header node simplifies code significantly. Notice there are no edge cases checking for an empty list (`head == NULL`) during insertion or deletion, because the header node always exists.',
      dryRun: [],
      tags: ['csll', 'header-node']
    },
    {
      id: 'u1-t4-p3',
      title: 'Round Robin CPU Scheduling Simulation',
      topicId: 'u1-t4',
      difficulty: 'advanced',
      problemStatement: 'Simulate a Round Robin CPU Scheduling algorithm using a Circular Linked List. Given N processes with specific burst times and a fixed time quantum Q, output the order of execution and the remaining time after each slice. Remove a process from the circular list when its burst time becomes 0.',
      constraints: [
        'N <= 10',
        'Burst time > 0',
        'Time Quantum Q > 0'
      ],
      sampleInput: 'Processes P1(5), P2(3), P3(8); Quantum = 2',
      sampleOutput: 'P1(3) -> P2(1) -> P3(6) -> P1(1) -> P2(Finished) -> P3(4) -> P1(Finished) -> P3(2) -> P3(Finished)',
      hints: [
        'Store Process ID and Remaining Burst Time in the nodes.',
        'Traverse the circular list. For each node, subtract Q from burst time. If burst time <= 0, delete the node from the list.',
        'Stop the simulation when the list becomes empty.'
      ],
      solution: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Process {\n    int pid;\n    int burst_time;\n    struct Process* next;\n};\n\nstruct Process* addProcess(struct Process* tail, int pid, int burst_time) {\n    struct Process* newP = (struct Process*)malloc(sizeof(struct Process));\n    newP->pid = pid;\n    newP->burst_time = burst_time;\n    if (!tail) {\n        tail = newP;\n        tail->next = tail;\n    } else {\n        newP->next = tail->next;\n        tail->next = newP;\n        tail = newP;\n    }\n    return tail;\n}\n\nvoid simulateRoundRobin(struct Process* tail, int quantum) {\n    if (!tail) return;\n    \n    struct Process *curr = tail->next, *prev = tail;\n    \n    while (curr != NULL) {\n        if (curr->burst_time > quantum) {\n            curr->burst_time -= quantum;\n            printf("P%d(%d) -> ", curr->pid, curr->burst_time);\n            prev = curr;\n            curr = curr->next;\n        } else {\n            printf("P%d(Finished) -> ", curr->pid);\n            if (curr == curr->next) { // Last process\n                free(curr);\n                curr = NULL;\n            } else {\n                prev->next = curr->next;\n                if (curr == tail) {\n                    tail = prev; // Update tail if needed\n                }\n                struct Process* temp = curr;\n                curr = curr->next;\n                free(temp);\n            }\n        }\n    }\n    printf("Done\\n");\n}\n\nint main() {\n    struct Process* tail = NULL;\n    tail = addProcess(tail, 1, 5);\n    tail = addProcess(tail, 2, 3);\n    tail = addProcess(tail, 3, 8);\n    \n    simulateRoundRobin(tail, 2);\n    return 0;\n}`,
      solutionExplanation: 'This simulates round robin by continuously traversing a CSLL. Processes are nodes. If a process completes, it is deleted from the ring. The loop stops when the last node is deleted (curr becomes NULL).',
      dryRun: [],
      tags: ['applications', 'scheduling', 'simulation']
    }
  ]
};
