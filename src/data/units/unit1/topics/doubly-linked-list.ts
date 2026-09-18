import type { Topic } from '../../../../types';

export const doublyLinkedList: Topic = {
  id: 'u1-t3',
  unitId: 'unit-1',
  title: 'Doubly Linked Lists',
  slug: 'doubly-linked-list',
  description: `A Doubly Linked List (DLL) is a complex type of linked list in which a node contains a pointer to the previous as well as the next node in the sequence. Therefore, in a doubly linked list, a node consists of three parts: node data, pointer to the next node in sequence (next pointer or rlink), and pointer to the previous node (previous pointer or llink).

Unlike a Singly Linked List (SLL), which only allows forward traversal, a DLL allows traversal in both directions—forward and backward. This bidirectional navigation capability comes at the cost of increased memory usage per node (an extra pointer) and slightly more complex insert and delete operations, as both previous and next pointers must be correctly maintained.

Doubly linked lists are highly versatile and form the foundation for advanced data structures like Deques (Double-Ended Queues) and complex memory management systems in operating systems. Furthermore, operations like deleting a specific node when the pointer to that node is given can be performed in O(1) time, compared to O(N) in a singly linked list.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t1', 'u1-t2'],
  estimatedMinutes: 55,
  subtopics: [
    {
      id: 'u1-t3-s1',
      title: 'DLL Node Structure',
      slug: 'dll-node-structure',
      description: `The basic building block of a Doubly Linked List is its node. Each node contains three fields: a data field to store the actual value, a pointer to the next node in the sequence (often called \`next\` or \`rlink\`), and a pointer to the previous node (often called \`prev\` or \`llink\`).

The presence of the previous pointer is what differentiates a DLL from a Singly Linked List. When creating a new node dynamically using \`malloc\`, it is essential to initialize both pointers to \`NULL\` to prevent undefined behavior from dangling pointers. The first node's previous pointer and the last node's next pointer are typically set to \`NULL\`, signifying the boundaries of the list.

Memory overhead is an important consideration. On a typical 64-bit system, a DLL node storing a 4-byte integer requires at least 24 bytes (4 bytes for data + 4 bytes padding + 8 bytes next pointer + 8 bytes prev pointer), which is significantly more than an SLL node.`,
      keyPoints: [
        'A DLL node has three fields: data, left link (previous), and right link (next).',
        'The previous pointer allows backward traversal of the list.',
        'The head node\'s previous pointer is always NULL in a standard DLL.',
        'The last node\'s next pointer is always NULL.',
        'Node creation involves allocating memory and initializing both pointer fields to NULL.'
      ],
      codeExamples: [
        {
          id: 'u1-t3-s1-ex1',
          title: 'Creating a DLL Node',
          code: `#include <stdio.h>
#include <stdlib.h>

// Definition of the doubly linked list node
struct node {
    int data;
    struct node* llink; // Pointer to previous node
    struct node* rlink; // Pointer to next node
};

// Function to create a new node
struct node* createNode(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    if (newNode == NULL) {
        printf("Memory allocation failed\\n");
        exit(1);
    }
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;
    return newNode;
}

int main() {
    struct node* myNode = createNode(42);
    
    printf("Node data: %d\\n", myNode->data);
    printf("Left link (prev): %p\\n", (void*)myNode->llink);
    printf("Right link (next): %p\\n", (void*)myNode->rlink);
    
    // Free allocated memory
    free(myNode);
    return 0;
}`,
          language: 'c',
          explanation: 'This program demonstrates how to define a node structure for a doubly linked list and dynamically allocate memory for it. Notice how both llink and rlink are explicitly initialized to NULL.',
          expectedOutput: `Node data: 42
Left link (prev): (nil)
Right link (next): (nil)`,
          lineBreakdown: [
            { lineNumber: 5, code: 'struct node {', explanation: 'Defines a node structure for the DLL.' },
            { lineNumber: 7, code: 'struct node* llink;', explanation: 'Pointer to the previous node (left link).' },
            { lineNumber: 8, code: 'struct node* rlink;', explanation: 'Pointer to the next node (right link).' },
            { lineNumber: 13, code: 'struct node* newNode = (struct node*)malloc(sizeof(struct node));', explanation: 'Dynamically allocates memory for the new node.' },
            { lineNumber: 19, code: 'newNode->llink = NULL;', explanation: 'Initializes the left link to NULL.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s1-cm1',
          title: 'Forgetting to Initialize Pointers',
          wrongCode: `struct node* createNode(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    return newNode; // llink and rlink are uninitialized garbage!
}`,
          correctCode: `struct node* createNode(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;
    return newNode;
}`,
          explanation: 'Failing to initialize `llink` and `rlink` to `NULL` means they contain garbage values. If you try to traverse the list, the program will likely crash with a segmentation fault when it attempts to dereference these garbage pointers.',
          consequence: 'Segmentation fault during traversal or undefined behavior.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s1-ic1',
          title: 'Memory Overhead Trade-off',
          content: 'Interviewers often ask about the trade-offs between SLL and DLL. While DLL allows O(1) deletion if the node pointer is known and permits backward traversal, it incurs a memory overhead of one extra pointer per node. For a list of 1 million nodes on a 64-bit system, this is an extra 8MB of memory.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t3-s1-cp1',
          title: 'Node Structure Verification',
          description: 'Verify understanding of the DLL node fields.',
          criteria: ['Node contains data field.', 'Node contains previous pointer.', 'Node contains next pointer.'],
          topicId: 'u1-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t3-s1-rc1',
          front: 'What are the three fields in a Doubly Linked List node?',
          back: '1. Data: The value stored. 2. llink (prev): Pointer to the previous node. 3. rlink (next): Pointer to the next node.',
          topicId: 'u1-t3',
          tags: ['structure', 'basics']
        },
        {
          id: 'u1-t3-s1-rc2',
          front: 'Why must we explicitly set llink and rlink to NULL in a new node?',
          back: 'Because malloc does not initialize memory. Without explicit initialization, the pointers will hold garbage values, leading to segmentation faults during traversal.',
          topicId: 'u1-t3',
          tags: ['pointers', 'memory']
        }
      ]
    },
    {
      id: 'u1-t3-s2',
      title: 'Insertion in DLL',
      slug: 'insertion-in-dll',
      description: `Inserting a node into a Doubly Linked List requires careful pointer rewiring to ensure the list remains contiguous in both directions. There are three main cases for insertion: at the beginning (front), at the end (rear), and at a specific position.

When inserting at the beginning, we must handle two scenarios: inserting into an empty list and inserting into a non-empty list. If the list is empty, the new node becomes the head, and its \`llink\` and \`rlink\` remain \`NULL\`. If non-empty, the new node's \`rlink\` points to the current head, the current head's \`llink\` points to the new node, and finally, the head pointer is updated to the new node.

Inserting at the end requires traversing to the last node. The last node's \`rlink\` is set to the new node, and the new node's \`llink\` is set to the old last node. Inserting at a specific position involves adjusting the \`rlink\` of the previous node, the \`llink\` of the next node, and both pointers of the new node. Order of operations is critical to avoid losing the rest of the list.`,
      keyPoints: [
        'Insertion at the beginning updates the head pointer and the old head\'s left link.',
        'Inserting into an empty list is a special case that must be handled explicitly.',
        'Insertion at the end requires traversing the list in O(N) time unless a tail pointer is maintained.',
        'Pointer updates must be sequenced correctly so that access to subsequent nodes is not lost.',
        'Both left and right links of neighboring nodes must be updated to maintain bidirectionality.'
      ],
      codeExamples: [
        {
          id: 'u1-t3-s2-ex1',
          title: 'Insertion at the Beginning',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

struct node* insertFront(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (head == NULL) {
        return newNode; // List was empty
    }

    newNode->rlink = head;
    head->llink = newNode;
    return newNode; // New node is the new head
}

void printList(struct node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    head = insertFront(head, 10);
    head = insertFront(head, 20);
    head = insertFront(head, 30);
    
    printf("List after front insertions: ");
    printList(head);
    
    return 0;
}`,
          language: 'c',
          explanation: 'Demonstrates inserting elements at the front of a DLL. The new node becomes the head, and pointers are adjusted accordingly.',
          expectedOutput: `List after front insertions: 30 20 10 `,
          lineBreakdown: [
            { lineNumber: 16, code: 'if (head == NULL) return newNode;', explanation: 'Handles insertion into an empty list.' },
            { lineNumber: 20, code: 'newNode->rlink = head;', explanation: 'Links the new node to the old head.' },
            { lineNumber: 21, code: 'head->llink = newNode;', explanation: 'Links the old head back to the new node.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t3-s2-ex2',
          title: 'Insertion at the End',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

struct node* insertEnd(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (head == NULL) {
        return newNode;
    }

    struct node* temp = head;
    while (temp->rlink != NULL) {
        temp = temp->rlink;
    }

    temp->rlink = newNode;
    newNode->llink = temp;
    return head;
}

void printList(struct node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    head = insertEnd(head, 10);
    head = insertEnd(head, 20);
    head = insertEnd(head, 30);
    
    printf("List after end insertions: ");
    printList(head);
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code shows how to append nodes to the end of a DLL. It requires a traversal to find the last node.',
          expectedOutput: `List after end insertions: 10 20 30 `,
          lineBreakdown: [
            { lineNumber: 20, code: 'while (temp->rlink != NULL)', explanation: 'Traverses to the very last node.' },
            { lineNumber: 24, code: 'temp->rlink = newNode;', explanation: 'Connects the old last node to the new node.' },
            { lineNumber: 25, code: 'newNode->llink = temp;', explanation: 'Sets the new node\'s previous pointer.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s2-cm1',
          title: 'Incorrect Pointer Update Order',
          wrongCode: `// Inserting 'newNode' after 'current' node
current->rlink = newNode;
newNode->llink = current;
newNode->rlink = current->rlink; // ERROR: current->rlink is now newNode!
current->rlink->llink = newNode; // ERROR`,
          correctCode: `// Inserting 'newNode' after 'current' node
newNode->rlink = current->rlink;
newNode->llink = current;
if (current->rlink != NULL) {
    current->rlink->llink = newNode;
}
current->rlink = newNode;`,
          explanation: 'If you overwrite `current->rlink` first, you lose the reference to the node that originally followed `current`. Always update the new node\'s pointers first before breaking the existing links in the list.',
          consequence: 'Losing access to the rest of the list and creating cyclic or dangling pointers.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s2-ic1',
          title: 'O(1) Insertion at Tail',
          content: 'In standard DLL implementations shown, inserting at the end takes O(N) time because we must traverse from the head. However, if we maintain a `tail` pointer along with the `head` pointer, insertion at the end can be optimized to O(1) time.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t3-s2-cp1',
          title: 'Order of Rewiring',
          description: 'Ensure correct sequence when inserting a node in the middle.',
          criteria: ['Set newNode pointers first', 'Update next node\'s llink', 'Update previous node\'s rlink'],
          topicId: 'u1-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t3-s2-rc1',
          front: 'What pointers are updated when inserting a node at the front of a non-empty DLL?',
          back: '1. newNode->rlink = head\n2. head->llink = newNode\n3. head = newNode',
          topicId: 'u1-t3',
          tags: ['insertion', 'pointers']
        }
      ]
    },
    {
      id: 'u1-t3-s3',
      title: 'Deletion in DLL',
      slug: 'deletion-in-dll',
      description: `Deleting a node from a Doubly Linked List is generally simpler than in a Singly Linked List if you already have a pointer to the node to be deleted, because you don't need a separate loop to find the previous node—it is directly accessible via the \`llink\`.

When deleting the first node, the head pointer is updated to \`head->rlink\`. If the new head is not \`NULL\`, its \`llink\` must be set to \`NULL\`. The old head's memory is then freed. Deleting the last node involves finding the last node, updating its predecessor's \`rlink\` to \`NULL\`, and freeing the last node. 

Deleting a node from the middle involves directly updating the neighbors. The predecessor's \`rlink\` skips the node to be deleted and points to the successor. The successor's \`llink\` skips the node and points to the predecessor. Special care must be taken to check for \`NULL\` bounds to avoid segmentation faults.`,
      keyPoints: [
        'Deleting the head node requires updating the new head\'s llink to NULL.',
        'When deleting a middle node, both the predecessor\'s rlink and successor\'s llink must be updated.',
        'DLLs allow O(1) deletion of a node if its pointer is known, unlike O(N) in SLLs.',
        'Memory must always be explicitly freed using free() to prevent memory leaks.',
        'Special case: Deleting the only node in the list results in an empty list (head = NULL).'
      ],
      codeExamples: [
        {
          id: 'u1-t3-s3-ex1',
          title: 'Deleting Nodes from a DLL',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

// Helper function to create and insert at end
struct node* insertEnd(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;
    if (head == NULL) return newNode;
    struct node* temp = head;
    while (temp->rlink != NULL) temp = temp->rlink;
    temp->rlink = newNode;
    newNode->llink = temp;
    return head;
}

struct node* deleteFront(struct node* head) {
    if (head == NULL) {
        printf("List is empty\\n");
        return NULL;
    }
    struct node* temp = head;
    head = head->rlink;
    
    if (head != NULL) {
        head->llink = NULL;
    }
    
    free(temp);
    return head;
}

struct node* deleteEnd(struct node* head) {
    if (head == NULL) return NULL;
    
    // If only one node exists
    if (head->rlink == NULL) {
        free(head);
        return NULL;
    }
    
    struct node* temp = head;
    while (temp->rlink != NULL) {
        temp = temp->rlink;
    }
    
    temp->llink->rlink = NULL;
    free(temp);
    return head;
}

void printList(struct node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    head = insertEnd(head, 10);
    head = insertEnd(head, 20);
    head = insertEnd(head, 30);
    
    printf("Initial list: ");
    printList(head);
    
    head = deleteFront(head);
    printf("After deleting front: ");
    printList(head);
    
    head = deleteEnd(head);
    printf("After deleting end: ");
    printList(head);
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code implements and tests deletion at both the front and the end of a DLL. Notice the bounds checking when deleting.',
          expectedOutput: `Initial list: 10 20 30 
After deleting front: 20 30 
After deleting end: 20 `,
          lineBreakdown: [
            { lineNumber: 32, code: 'if (head != NULL) head->llink = NULL;', explanation: 'If the list is not empty after deleting head, ensure the new head\'s left link is NULL.' },
            { lineNumber: 52, code: 'temp->llink->rlink = NULL;', explanation: 'Finds the second-to-last node using temp->llink, and sets its right link to NULL.' },
            { lineNumber: 53, code: 'free(temp);', explanation: 'Releases the memory of the deleted node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s3-cm1',
          title: 'Not Handling the Single Node Case',
          wrongCode: `struct node* deleteEnd(struct node* head) {
    struct node* temp = head;
    while (temp->rlink != NULL) {
        temp = temp->rlink;
    }
    temp->llink->rlink = NULL; // CRASH if temp is the only node!
    free(temp);
    return head;
}`,
          correctCode: `struct node* deleteEnd(struct node* head) {
    if (head->rlink == NULL) {
        free(head);
        return NULL;
    }
    // ... traversal
    temp->llink->rlink = NULL;
    free(temp);
    return head;
}`,
          explanation: 'If a list has only one node, `temp->llink` is `NULL`. Dereferencing it with `temp->llink->rlink = NULL` causes a segmentation fault. The single-node case must be handled separately.',
          consequence: 'Segmentation fault when trying to delete the only element.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s3-ic1',
          title: 'Why is DLL Deletion O(1)?',
          content: 'In a singly linked list, to delete node X (given a pointer to X), you must traverse from the head to find the node BEFORE X to update its pointer. This is O(N). In a DLL, you can simply do `X->llink->rlink = X->rlink`, achieving deletion in O(1) time without traversal.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t3-s3-cp1',
          title: 'Memory Management',
          description: 'Always free() nodes that are removed from the list.',
          criteria: ['Use free()', 'Do not use pointer after free()'],
          topicId: 'u1-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t3-s3-rc1',
          front: 'How do you delete a middle node "curr" given a pointer to it?',
          back: 'curr->llink->rlink = curr->rlink;\ncurr->rlink->llink = curr->llink;\nfree(curr);',
          topicId: 'u1-t3',
          tags: ['deletion', 'O(1)']
        }
      ]
    },
    {
      id: 'u1-t3-s4',
      title: 'Backward Traversal & SLL vs DLL',
      slug: 'backward-traversal-comparison',
      description: `The most significant advantage of a Doubly Linked List is the ability to traverse it in reverse order. Backward traversal is extremely useful in applications like implementing undo functionality in software, navigating web browser history (back/forward buttons), or processing queues from both ends.

To traverse backward, one typically navigates to the very end of the list (or uses a maintained tail pointer), and then follows the \`llink\` (previous pointer) iteratively until \`NULL\` is reached. The logic is a perfect mirror of forward traversal.

When comparing SLL and DLL, it is a classic trade-off between time complexity and space complexity. DLLs consume more memory and require more complex pointer assignments, but they offer O(1) time complexity for operations like backward traversal and targeted deletion, which would take O(N) time in an SLL.`,
      keyPoints: [
        'Backward traversal uses the llink (previous pointer).',
        'You must start at the last node to traverse the entire list backwards.',
        'DLL consumes extra memory per node compared to SLL.',
        'DLL allows O(1) deletion given a node pointer; SLL is O(N).',
        'DLL insertion logic is more error-prone due to maintaining two pointers per node.'
      ],
      codeExamples: [
        {
          id: 'u1-t3-s4-ex1',
          title: 'Forward and Backward Traversal',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

// ... assume insertEnd is defined ...
struct node* insertEnd(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;
    if (head == NULL) return newNode;
    struct node* temp = head;
    while (temp->rlink != NULL) temp = temp->rlink;
    temp->rlink = newNode;
    newNode->llink = temp;
    return head;
}

void printForward(struct node* head) {
    printf("Forward: ");
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

void printBackward(struct node* head) {
    if (head == NULL) return;
    
    // 1. Go to the last node
    struct node* tail = head;
    while (tail->rlink != NULL) {
        tail = tail->rlink;
    }
    
    // 2. Traverse backwards using llink
    printf("Backward: ");
    while (tail != NULL) {
        printf("%d ", tail->data);
        tail = tail->llink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    head = insertEnd(head, 1);
    head = insertEnd(head, 2);
    head = insertEnd(head, 3);
    head = insertEnd(head, 4);
    
    printForward(head);
    printBackward(head);
    
    return 0;
}`,
          language: 'c',
          explanation: 'Shows how to iterate through the DLL using rlink for forward traversal and llink for backward traversal.',
          expectedOutput: `Forward: 1 2 3 4 
Backward: 4 3 2 1 `,
          lineBreakdown: [
            { lineNumber: 39, code: 'while (tail->rlink != NULL) { tail = tail->rlink; }', explanation: 'Finds the tail node.' },
            { lineNumber: 45, code: 'while (tail != NULL)', explanation: 'Loops backwards until the beginning (NULL) is reached.' },
            { lineNumber: 47, code: 'tail = tail->llink;', explanation: 'Moves the pointer to the previous node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s4-cm1',
          title: 'Incorrect Loop Termination Condition',
          wrongCode: `while (tail->llink != NULL) {
    printf("%d ", tail->data);
    tail = tail->llink;
}`,
          correctCode: `while (tail != NULL) {
    printf("%d ", tail->data);
    tail = tail->llink;
}`,
          explanation: 'Using `tail->llink != NULL` will print all elements EXCEPT the first one (head), because the loop stops before processing the head node whose `llink` is `NULL`.',
          consequence: 'The first element of the list is not printed during backward traversal.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s4-ic1',
          title: 'Browser History Implementation',
          content: 'If asked how to implement the Back/Forward buttons in a web browser, a Doubly Linked List is the perfect answer. Each node represents a URL. Moving forward traverses the `rlink`, moving back traverses the `llink`. Visiting a new page deletes the forward list from that point.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t3-s4-cp1',
          title: 'Traversal directions',
          description: 'Identify the pointers used for different directions.',
          criteria: ['Forward uses rlink', 'Backward uses llink'],
          topicId: 'u1-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t3-s4-rc1',
          front: 'What is the space complexity disadvantage of DLL over SLL?',
          back: 'A DLL requires O(N) extra space overall because each node requires an additional pointer (llink) compared to an SLL.',
          topicId: 'u1-t3',
          tags: ['complexity', 'comparison']
        }
      ]
    },
    {
      id: 'u1-t3-s5',
      title: 'Deque using DLL',
      slug: 'deque-using-dll',
      description: `A Deque (Double-Ended Queue) is an abstract data type that generalizes a queue, allowing elements to be added to or removed from either the front or the back. A Doubly Linked List is the most natural and efficient underlying data structure for implementing a Deque.

To achieve O(1) time complexity for all Deque operations (insertFront, insertRear, deleteFront, deleteRear), we must maintain two pointers: \`head\` (or front) and \`tail\` (or rear). 

Inserting at the front adjusts the head, inserting at the rear adjusts the tail. Deletions work symmetrically. Because the DLL provides backward links, \`deleteRear\` can efficiently update the tail pointer to \`tail->llink\` and detach the last node, an operation that would be O(N) in a Singly Linked List without O(1) backward traversal capabilities.`,
      keyPoints: [
        'A Deque allows insertion and deletion at both ends.',
        'Implementing a Deque with a DLL requires maintaining head and tail pointers.',
        'All four Deque operations run in O(1) time using a DLL.',
        'The tail pointer avoids O(N) traversal when modifying the rear of the Deque.',
        'Edge cases, like a single remaining element, require updating both head and tail pointers.'
      ],
      codeExamples: [
        {
          id: 'u1-t3-s5-ex1',
          title: 'Deque Operations (Insert Rear & Delete Front)',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

struct node *front = NULL, *rear = NULL;

void insertRear(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (front == NULL) { // Deque is empty
        front = rear = newNode;
        return;
    }
    
    rear->rlink = newNode;
    newNode->llink = rear;
    rear = newNode; // Update rear pointer
}

void deleteFront() {
    if (front == NULL) {
        printf("Deque Underflow\\n");
        return;
    }
    
    struct node* temp = front;
    front = front->rlink;
    
    if (front == NULL) { // Deque became empty
        rear = NULL;
    } else {
        front->llink = NULL;
    }
    
    printf("Deleted: %d\\n", temp->data);
    free(temp);
}

void display() {
    struct node* temp = front;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->rlink;
    }
    printf("\\n");
}

int main() {
    insertRear(10);
    insertRear(20);
    insertRear(30);
    
    printf("Deque: ");
    display();
    
    deleteFront();
    printf("Deque after deleteFront: ");
    display();
    
    return 0;
}`,
          language: 'c',
          explanation: 'Partial implementation of a Deque using global front and rear pointers, showing O(1) insertion at the rear and deletion at the front.',
          expectedOutput: `Deque: 10 20 30 
Deleted: 10
Deque after deleteFront: 20 30 `,
          lineBreakdown: [
            { lineNumber: 11, code: 'struct node *front = NULL, *rear = NULL;', explanation: 'Global pointers maintaining O(1) access to both ends.' },
            { lineNumber: 26, code: 'rear = newNode;', explanation: 'Updates the rear pointer immediately, avoiding O(N) traversal.' },
            { lineNumber: 39, code: 'if (front == NULL) { rear = NULL; }', explanation: 'Crucial edge case: if the last element is deleted, rear must also be NULL.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s5-cm1',
          title: 'Not Updating Rear Pointer on Empty',
          wrongCode: `void deleteFront() {
    struct node* temp = front;
    front = front->rlink;
    if (front != NULL) front->llink = NULL;
    free(temp);
    // If list is empty, rear is still pointing to freed memory!
}`,
          correctCode: `void deleteFront() {
    struct node* temp = front;
    front = front->rlink;
    if (front != NULL) {
        front->llink = NULL;
    } else {
        rear = NULL; // Proper cleanup
    }
    free(temp);
}`,
          explanation: 'When the last node is deleted from the front, `front` becomes `NULL`, but if `rear` is not also explicitly set to `NULL`, it becomes a dangling pointer.',
          consequence: 'Dangling pointers leading to memory corruption or crashes on subsequent inserts.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s5-ic1',
          title: 'Why use DLL for Deque?',
          content: 'If asked to implement a Deque, an array is an option but requires shifting elements or using a circular buffer array logic. A DLL is structurally simpler, guarantees O(1) for all 4 operations, and dynamically grows without reallocation overhead.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t3-s5-cp1',
          title: 'Pointer Maintenance',
          description: 'Ensure both front and rear pointers are maintained correctly.',
          criteria: ['front is updated on insertFront/deleteFront', 'rear is updated on insertRear/deleteRear'],
          topicId: 'u1-t3'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t3-s5-rc1',
          front: 'Which two pointers are maintained to achieve O(1) operations in a DLL-based Deque?',
          back: 'A front (or head) pointer and a rear (or tail) pointer.',
          topicId: 'u1-t3',
          tags: ['deque', 'pointers']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t3-q1',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'What are the three fields present in a standard Doubly Linked List node?',
      options: [
        'data, head, tail',
        'data, llink, rlink',
        'data, next, index',
        'value, pointer, array'
      ],
      correctAnswer: 'data, llink, rlink',
      explanation: 'A DLL node stores the data, a pointer to the previous node (llink/prev), and a pointer to the next node (rlink/next).',
      tags: ['node structure']
    },
    {
      id: 'u1-t3-q2',
      type: 'true-false',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'In a Doubly Linked List, it is possible to traverse the list from the last node back to the first node.',
      correctAnswer: true,
      explanation: 'Yes, this is the primary advantage of a DLL. By using the previous pointers (llink), you can traverse backward.',
      tags: ['traversal']
    },
    {
      id: 'u1-t3-q3',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Given a pointer `p` to a node in the middle of a DLL, what is the time complexity to delete node `p`?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
      correctAnswer: 'O(1)',
      explanation: 'Since `p` has a pointer to its predecessor (`p->llink`), we can directly access and modify the surrounding nodes without traversing from the head. This takes O(1) time.',
      tags: ['complexity', 'deletion']
    },
    {
      id: 'u1-t3-q4',
      type: 'fill-blank',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'For the first node in a standard Doubly Linked List, the `llink` pointer is always set to _____.',
      correctAnswer: 'NULL',
      explanation: 'The head node has no predecessor, so its left link is NULL.',
      tags: ['pointers', 'boundaries']
    },
    {
      id: 'u1-t3-q5',
      type: 'spot-bug',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Identify the bug in this insertion code (inserting newNode after current):',
      code: `newNode->llink = current;
current->rlink = newNode;
newNode->rlink = current->rlink;
current->rlink->llink = newNode;`,
      options: [
        'Memory leak',
        'newNode->rlink points to itself',
        'Syntax error',
        'current->rlink->llink is NULL'
      ],
      correctAnswer: 'newNode->rlink points to itself',
      explanation: 'By setting `current->rlink = newNode;` BEFORE `newNode->rlink = current->rlink;`, the value of `current->rlink` becomes `newNode`. Thus, `newNode->rlink` points back to `newNode`, losing the rest of the list.',
      tags: ['insertion', 'pointers']
    },
    {
      id: 'u1-t3-q6',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Which of the following is a disadvantage of a Doubly Linked List compared to a Singly Linked List?',
      options: [
        'Slower insertion at the beginning',
        'Inability to traverse backwards',
        'Higher memory consumption per node',
        'Slower deletion when pointer is known'
      ],
      correctAnswer: 'Higher memory consumption per node',
      explanation: 'A DLL requires an extra pointer (llink) for every node, increasing the memory footprint.',
      tags: ['comparison']
    },
    {
      id: 'u1-t3-q7',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'When a Deque is implemented using a DLL, what pointers are necessary to ensure O(1) operations at both ends?',
      options: [
        'Only a head pointer',
        'Only a tail pointer',
        'Both head and tail pointers',
        'A middle pointer'
      ],
      correctAnswer: 'Both head and tail pointers',
      explanation: 'A head pointer allows O(1) front operations, and a tail pointer allows O(1) rear operations.',
      tags: ['deque']
    },
    {
      id: 'u1-t3-q8',
      type: 'true-false',
      topicId: 'u1-t3',
      difficulty: 'advanced',
      question: 'If `p` is a pointer to the last node in a DLL, the operation `p->llink->rlink = NULL` is sufficient to fully delete `p`.',
      correctAnswer: false,
      explanation: 'While this detaches the node from the list, the memory for node `p` has not been freed using `free(p)`, leading to a memory leak.',
      tags: ['deletion', 'memory']
    },
    {
      id: 'u1-t3-q9',
      type: 'predict-output',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'What happens if you try to traverse backward using `while(temp->llink != NULL)` starting from the tail node?',
      options: [
        'It prints all elements correctly',
        'It skips the last element',
        'It skips the first element (head)',
        'It causes a segmentation fault'
      ],
      correctAnswer: 'It skips the first element (head)',
      explanation: 'The loop terminates as soon as it reaches the head node (where `llink` is NULL) BEFORE processing the head node\'s data.',
      tags: ['traversal']
    },
    {
      id: 'u1-t3-q10',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'In C, what is used to allocate memory for a new DLL node dynamically?',
      options: ['new', 'malloc', 'alloc', 'create'],
      correctAnswer: 'malloc',
      explanation: 'In C, `malloc` (or `calloc`) is used for dynamic memory allocation.',
      tags: ['c-programming', 'memory']
    },
    {
      id: 'u1-t3-q11',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'In a non-circular doubly linked list, the prev pointer of the FIRST node contains:',
      options: ['Pointer to the last node', 'Pointer to the second node', 'NULL', 'Pointer to itself'],
      correctAnswer: 'NULL',
      explanation: 'In a non-circular DLL, the first node has no predecessor. Its llink (prev) is NULL. Only in a circular DLL would the first node\'s prev point to the last node.',
      tags: ['DLL-Structure', 'First-Node']
    },
    {
      id: 'u1-t3-q12',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Pointer p is in the middle of a DLL. To insert new node temp IMMEDIATELY AFTER p, which sequence is correct?',
      options: ['p->next_ = temp->next_; p->prev_ = temp->prev_', 'temp->next_ = p->next_; temp->prev_ = p->prev_', 'temp->next_ = p->next_; temp->prev_ = p', 'temp->next_ = p; temp->prev_ = p->prev_'],
      correctAnswer: 'temp->next_ = p->next_; temp->prev_ = p',
      explanation: 'To insert temp after p: temp->next_ = p->next_ (new node points forward to old successor) and temp->prev_ = p (new node points back to p). Then also update p->next_ = temp and temp->next_->prev_ = temp to complete all 4 links.',
      tags: ['Insertion', 'Pointer-Wiring']
    },
    {
      id: 'u1-t3-q13',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'When a new node is added to an EMPTY doubly linked list:',
      options: ['Neither head_ nor tail_ will change', 'Both head_ and tail_ could change', 'Only head_ would change', 'Only tail_ would change'],
      correctAnswer: 'Both head_ and tail_ could change',
      explanation: 'When inserting into an empty DLL, the new node becomes both the first and last element. Both head_ (pointing to the start) and tail_ (pointing to the end) must be updated to point to this single new node.',
      tags: ['Insertion', 'Empty-List']
    },
    {
      id: 'u1-t3-q14',
      type: 'spot-bug',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Sequence: `temp->next_ = p->next_; temp->prev_ = p; p->next_ = temp;` inserts temp after p (not at the end). Which statement is MISSING?',
      options: ['p->next_->prev_ = temp', 'temp->next_->prev_ = p', 'p->prev_->next_ = temp', 'temp->prev_->next_ = temp'],
      correctAnswer: 'p->next_->prev_ = temp',
      explanation: 'After the 3 given assignments, the old successor (now temp->next_) still has its prev_ pointing to p. This backward link must be updated: p->next_->prev_ = temp (but since p->next_ is now temp, it is temp->next_->prev_ = temp). Without this, backward traversal is broken.',
      tags: ['Insertion', 'Missing-Step', 'Backward-Links']
    },
    {
      id: 'u1-t3-q15',
      type: 'spot-bug',
      topicId: 'u1-t3',
      difficulty: 'advanced',
      question: 'DLL: 5 <-> 10 <-> 15 <-> 20. p points to 15. Insert new node 12 BEFORE 15. Which sequence correctly updates ALL pointers?',
      options: ['new->next = p; new->prev = p->prev; p->prev = new', 'new->next = p; new->prev = p->prev; p->prev->next = new; p->prev = new', 'new->prev = p; new->next = p->next; p->next = new', 'None of these'],
      correctAnswer: 'new->next = p; new->prev = p->prev; p->prev->next = new; p->prev = new',
      explanation: 'Four assignments needed: new->next = p (forward to 15); new->prev = p->prev (backward to 10); p->prev->next = new (10\'s forward link updated to 12); p->prev = new (15\'s backward link updated to 12). Option A is missing the crucial p->prev->next = new step.',
      tags: ['Insertion-Before', 'All-Pointers']
    },
    {
      id: 'u1-t3-q16',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'struct dll { node_t* head_; node_t* tail_; }; No header/tailer node. head_ == tail_ implies:',
      options: ['Either the list is empty or has exactly one node', 'The list is definitely empty', 'The list has exactly one node', 'None of these'],
      correctAnswer: 'Either the list is empty or has exactly one node',
      explanation: 'When head_ == tail_: if both are NULL the list is empty; if both point to the same node the list has exactly one element. Both cases satisfy head_ == tail_, so it covers two possibilities.',
      tags: ['DLL-State', 'Edge-Case']
    },
    {
      id: 'u1-t3-q17',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'A DLL has n nodes. Pointer p points directly to the middle node. Which operation requires a loop?',
      options: ['Deleting the node p points to', 'Adding p->data to the next node\'s data', 'Inserting a node before p', 'Adding p->data to EVERY node in the list'],
      correctAnswer: 'Adding p->data to EVERY node in the list',
      explanation: 'With a direct pointer p: deletion is O(1) (adjust prev and next). Accessing p->next is O(1). Inserting before p uses p->prev (O(1)). Only adding to every node requires traversing all n nodes \u2014 that needs a loop.',
      tags: ['DLL-O1-Operations', 'Complexity']
    },
    {
      id: 'u1-t3-q18',
      type: 'predict-output',
      topicId: 'u1-t3',
      difficulty: 'advanced',
      question: 'DLL: 10 <-> 20 <-> 30 <-> 40 <-> 50. p starts at 30. Perform: `p = p->next; p->prev->next = p->next; p->next->prev = p->prev;` What is the resulting list?',
      options: ['10 <-> 20 <-> 30 <-> 40 <-> 50', '10 <-> 20 <-> 30 <-> 50', '10 <-> 20 <-> 40 <-> 50', '10 <-> 30 <-> 40 <-> 50'],
      correctAnswer: '10 <-> 20 <-> 30 <-> 50',
      explanation: 'p starts at 30. After p = p->next, p points to 40. Then p->prev->next = p->next unlinks 40 (30->next = 50). And p->next->prev = p->prev (50->prev = 30). Node 40 is removed. Result: 10 <-> 20 <-> 30 <-> 50.',
      tags: ['Deletion-Trace', 'Pointer-Arithmetic']
    },
    {
      id: 'u1-t3-q19',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'When we delete an element from a doubly linked list:',
      options: ['head_ and tail_ will never change', 'head_ could change, tail_ will never change', 'tail_ could change, head_ will never change', 'None of these'],
      correctAnswer: 'None of these',
      explanation: 'Both head_ and tail_ can change during deletion. Deleting the first node changes head_. Deleting the last node changes tail_. So options A, B, and C are all incorrect \u2014 none of them is always true.',
      tags: ['Deletion', 'Head-Tail']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t3-p1',
      title: 'Complete DLL Implementation',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      problemStatement: 'Write a complete C program to implement a Doubly Linked List. It must support: `insertFront`, `insertEnd`, `displayForward`, and `displayBackward`. The `main` function should create a list with elements [10, 20, 30] appended to the end, then insert 5 at the front. Finally, display it forwards and backwards.',
      constraints: ['Use malloc for node creation', 'Maintain only a head pointer (O(N) insertEnd is acceptable)'],
      sampleInput: 'No dynamic input, hardcode sequence: insertEnd(10), insertEnd(20), insertEnd(30), insertFront(5)',
      sampleOutput: 'Forward: 5 10 20 30 \\nBackward: 30 20 10 5',
      hints: [
        'For backward traversal, first write a loop to find the node where rlink is NULL.',
        'Remember to handle the empty list case in your insertion functions.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

struct node* insertFront(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (head == NULL) return newNode;

    newNode->rlink = head;
    head->llink = newNode;
    return newNode;
}

struct node* insertEnd(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (head == NULL) return newNode;

    struct node* temp = head;
    while (temp->rlink != NULL) {
        temp = temp->rlink;
    }

    temp->rlink = newNode;
    newNode->llink = temp;
    return head;
}

void displayForward(struct node* head) {
    printf("Forward: ");
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

void displayBackward(struct node* head) {
    if (head == NULL) return;
    
    struct node* temp = head;
    while (temp->rlink != NULL) {
        temp = temp->rlink;
    }
    
    printf("Backward: ");
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->llink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    
    head = insertEnd(head, 10);
    head = insertEnd(head, 20);
    head = insertEnd(head, 30);
    head = insertFront(head, 5);
    
    displayForward(head);
    displayBackward(head);
    
    return 0;
}`,
      solutionExplanation: 'This solution builds the basic operations of a DLL. `insertEnd` loops to find the tail to append. `displayBackward` first finds the tail, then iterates using `llink`.',
      dryRun: [
        { step: 1, line: 64, variables: { head: 'NULL' }, output: '', explanation: 'Initialize head pointer.' },
        { step: 2, line: 66, variables: { head: 'Node(10)' }, output: '', explanation: 'insertEnd(10) creates head.' },
        { step: 3, line: 67, variables: { head: 'Node(10)->Node(20)' }, output: '', explanation: 'insertEnd(20) appends 20.' },
        { step: 4, line: 69, variables: { head: 'Node(5)->Node(10)...' }, output: '', explanation: 'insertFront(5) shifts head.' },
        { step: 5, line: 71, variables: { head: 'Node(5)' }, output: 'Forward: 5 10 20 30 ', explanation: 'Traverse and print.' }
      ],
      tags: ['implementation', 'basics']
    },
    {
      id: 'u1-t3-p2',
      title: 'Reverse a Doubly Linked List',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      problemStatement: 'Write a function `struct node* reverseDLL(struct node* head)` that reverses a given doubly linked list by swapping the `llink` and `rlink` pointers of every node. The function should return the new head of the reversed list.',
      constraints: ['Do not just print backwards, modify the actual pointers in-place.', 'O(N) time complexity, O(1) space complexity.'],
      sampleInput: 'List: 1 <-> 2 <-> 3 <-> 4',
      sampleOutput: 'Reversed List: 4 <-> 3 <-> 2 <-> 1',
      hints: [
        'Traverse the list. For each node, use a temporary pointer to swap its llink and rlink.',
        'Be careful with the loop continuation. After swapping, what used to be `rlink` is now `llink`, so you move to `node->llink` to continue.',
        'The new head will be the last non-NULL node you processed.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

// ... insertEnd helper omitted for brevity ...
struct node* insertEnd(struct node* head, int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;
    if (head == NULL) return newNode;
    struct node* temp = head;
    while (temp->rlink != NULL) temp = temp->rlink;
    temp->rlink = newNode;
    newNode->llink = temp;
    return head;
}

struct node* reverseDLL(struct node* head) {
    struct node* temp = NULL;
    struct node* current = head;
    
    // Swap llink and rlink for all nodes
    while (current != NULL) {
        temp = current->llink;
        current->llink = current->rlink;
        current->rlink = temp;
        
        // Move to the next node (which is now in llink after swapping)
        current = current->llink;
    }
    
    // Check if list was empty or had only one node
    if (temp != NULL) {
        // temp currently points to the OLD previous node of the last node
        // so temp->llink will point to the new head.
        head = temp->llink;
    }
    
    return head;
}

void display(struct node* head) {
    while (head != NULL) {
        printf("%d ", head->data);
        head = head->rlink;
    }
    printf("\\n");
}

int main() {
    struct node* head = NULL;
    head = insertEnd(head, 1);
    head = insertEnd(head, 2);
    head = insertEnd(head, 3);
    head = insertEnd(head, 4);
    
    printf("Original: ");
    display(head);
    
    head = reverseDLL(head);
    
    printf("Reversed: ");
    display(head);
    
    return 0;
}`,
      solutionExplanation: 'To reverse the DLL, we visit each node and simply swap its `llink` and `rlink`. Because the links are swapped, advancing to the "next" node in the original sequence means traversing the newly set `llink`. Finally, the head pointer is updated to the last node processed.',
      dryRun: [
        { step: 1, line: 31, variables: { current: 'Node(1)', temp: 'NULL' }, output: '', explanation: 'Start at head.' },
        { step: 2, line: 34, variables: { current: 'Node(1)', 'Node(1).rlink': 'NULL', 'Node(1).llink': 'Node(2)' }, output: '', explanation: 'Swap pointers of Node 1.' },
        { step: 3, line: 37, variables: { current: 'Node(2)' }, output: '', explanation: 'Move current to next original node (now current->llink).' }
      ],
      tags: ['reversal', 'pointers']
    },
    {
      id: 'u1-t3-p3',
      title: 'Deque Implementation',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      problemStatement: 'Implement a Deque (Double-Ended Queue) using a Doubly Linked List. Support the following operations in O(1) time: `insertFront`, `insertRear`, `deleteFront`, `deleteRear`. Use global pointers `front` and `rear`.',
      constraints: ['All operations must be O(1)', 'Handle edge cases when deque becomes empty'],
      sampleInput: 'insertRear(10), insertFront(5), deleteRear(), deleteFront()',
      sampleOutput: 'Inserted Rear: 10\\nInserted Front: 5\\nDeleted Rear: 10\\nDeleted Front: 5',
      hints: [
        'Since you need O(1) time, you MUST use the global `rear` pointer for rear operations instead of traversing.',
        'When deleting the last element, ensure both `front` and `rear` become NULL.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node* llink;
    struct node* rlink;
};

struct node *front = NULL, *rear = NULL;

void insertFront(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (front == NULL) {
        front = rear = newNode;
    } else {
        newNode->rlink = front;
        front->llink = newNode;
        front = newNode;
    }
    printf("Inserted Front: %d\\n", value);
}

void insertRear(int value) {
    struct node* newNode = (struct node*)malloc(sizeof(struct node));
    newNode->data = value;
    newNode->llink = NULL;
    newNode->rlink = NULL;

    if (rear == NULL) {
        front = rear = newNode;
    } else {
        rear->rlink = newNode;
        newNode->llink = rear;
        rear = newNode;
    }
    printf("Inserted Rear: %d\\n", value);
}

void deleteFront() {
    if (front == NULL) {
        printf("Deque Underflow\\n");
        return;
    }
    struct node* temp = front;
    printf("Deleted Front: %d\\n", temp->data);
    
    front = front->rlink;
    if (front == NULL) {
        rear = NULL; // Deque is now empty
    } else {
        front->llink = NULL;
    }
    free(temp);
}

void deleteRear() {
    if (rear == NULL) {
        printf("Deque Underflow\\n");
        return;
    }
    struct node* temp = rear;
    printf("Deleted Rear: %d\\n", temp->data);
    
    rear = rear->llink;
    if (rear == NULL) {
        front = NULL; // Deque is now empty
    } else {
        rear->rlink = NULL;
    }
    free(temp);
}

int main() {
    insertRear(10);
    insertFront(5);
    deleteRear();
    deleteFront();
    
    return 0;
}`,
      solutionExplanation: 'This implements a full Deque. `front` and `rear` pointers are maintained for O(1) access. Special care is taken in deletion functions: if deleting the only node, both `front` and `rear` are set to `NULL`.',
      dryRun: [
        { step: 1, line: 81, variables: { front: 'Node(10)', rear: 'Node(10)' }, output: 'Inserted Rear: 10\\n', explanation: 'List was empty, both pointers point to new node.' },
        { step: 2, line: 82, variables: { front: 'Node(5)', rear: 'Node(10)' }, output: 'Inserted Front: 5\\n', explanation: 'Insert front updates head.' },
        { step: 3, line: 83, variables: { rear: 'Node(5)' }, output: 'Deleted Rear: 10\\n', explanation: 'Delete rear moves rear pointer back.' },
        { step: 4, line: 84, variables: { front: 'NULL', rear: 'NULL' }, output: 'Deleted Front: 5\\n', explanation: 'Delete front makes list empty.' }
      ],
      tags: ['deque', 'advanced']
    }
  ]
};
