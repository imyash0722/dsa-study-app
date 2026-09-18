import type { Topic } from '../../../../types';

export const singlyLinkedList: Topic = {
  id: 'u1-t2',
  unitId: 'unit-1',
  title: 'Singly Linked Lists',
  slug: 'singly-linked-list',
  description: `A linked list is a foundational linear data structure used to store collections of data. Unlike arrays, which store elements in contiguous memory locations, linked lists consist of independent entities called **nodes** that are scattered throughout memory. These nodes are linked together using pointers, creating a flexible and dynamic chain of data.

In a Singly Linked List (SLL), each node is composed of two primary parts: the **data** (which holds the actual information) and a **link** (a pointer containing the memory address of the next node in the sequence). The list is accessed via a special pointer typically called the **head**, which points to the first node. The very last node in the list points to \`NULL\`, indicating the end of the chain.

Because nodes are allocated dynamically at runtime, linked lists excel in situations where the total number of elements is unpredictable or frequently changing. Insertions and deletions do not require shifting elements, making them highly efficient compared to array operations. However, this dynamic structure comes at the cost of slow random access, as traversing the list sequentially is the only way to reach a specific element.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t1'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u1-t2-s1',
      title: 'List Data Structure & Node Structure',
      slug: 'list-and-node-structure',
      description: `A linked list is built using a self-referential structure known as a **node**. In C, a node is implemented using a \`struct\` that contains data members and a pointer to a struct of the same type. This pointer is what creates the "link" to the next element. The starting point of the list is managed by a pointer called the **head**, and the termination of the list is marked by a node whose link part is \`NULL\`.

When comparing a Linked List to an ArrayList (or dynamic array), several trade-offs emerge. ArrayLists have a fixed size (or require expensive reallocations when full), but offer extremely fast random access (O(1)). They store elements in contiguous memory, which is cache-friendly. Linked Lists, on the other hand, dynamically allocate each node as needed, never wasting unused space. They allow for very efficient insertions and deletions if the pointer location is known. However, because nodes are scattered in the heap memory, sequential and random access is slow (O(N)), as you must follow pointers from the head.`,
      keyPoints: [
        'A linked list is a linear data structure consisting of nodes.',
        'Each node has two parts: the data and a link (pointer) to the next node.',
        'The last node\'s link always points to NULL to signify the end of the list.',
        'Nodes are defined using a self-referential C struct, e.g., struct node { int data; struct node *link; };.',
        'ArrayLists provide fast O(1) random access but O(N) insertion/deletion due to shifting.',
        'Linked Lists provide dynamic sizing and efficient insertions/deletions without shifting elements.'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s1-ex1',
          title: 'Defining and Initializing a Node in C',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

// Node structure definition
struct node {
    int data;
    struct node *link;
};

// Typedef for easier usage (optional but standard practice)
typedef struct node Node;

int main() {
    // Declaring the head pointer and initializing it to NULL (empty list)
    Node *head = NULL;
    
    // Dynamically allocating memory for a new node
    head = (Node *)malloc(sizeof(Node));
    
    if (head == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    // Assigning data and setting link to NULL
    head->data = 10;
    head->link = NULL;
    
    printf("Node created successfully!\\n");
    printf("Data: %d\\n", head->data);
    printf("Link points to: %p\\n", (void*)head->link);
    
    // Free the allocated memory
    free(head);
    
    return 0;
}`,
          explanation: 'This program demonstrates the basic definition of a Singly Linked List node using a C struct. It dynamically allocates memory for one node, initializes its data to 10 and link to NULL, and then frees the memory.',
          expectedOutput: "Node created successfully!\nData: 10\nLink points to: (nil)",
          lineBreakdown: [
            { lineNumber: 5, code: 'struct node {', explanation: 'Begins the definition of the self-referential node structure.' },
            { lineNumber: 7, code: 'struct node *link;', explanation: 'The pointer that will store the address of the next node.' },
            { lineNumber: 18, code: 'head = (Node *)malloc(sizeof(Node));', explanation: 'Dynamically allocates memory on the heap for one Node.' },
            { lineNumber: 26, code: 'head->link = NULL;', explanation: 'Sets the link of the last (and only) node to NULL, marking the end of the list.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s1-ex2',
          title: 'Linking Two Nodes',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

int main() {
    // Allocate memory for two nodes
    Node *head = (Node *)malloc(sizeof(Node));
    Node *second = (Node *)malloc(sizeof(Node));
    
    if (head == NULL || second == NULL) return 1;
    
    // Initialize first node
    head->data = 1;
    head->link = second; // Link first node to second node
    
    // Initialize second node
    second->data = 2;
    second->link = NULL; // Mark the end of the list
    
    printf("First node data: %d\\n", head->data);
    printf("Second node data: %d\\n", head->link->data);
    
    // Clean up memory
    free(second);
    free(head);
    
    return 0;
}`,
          explanation: 'This code shows how two independently allocated nodes are connected by storing the address of the second node in the link part of the first node.',
          expectedOutput: "First node data: 1\nSecond node data: 2",
          lineBreakdown: [
            { lineNumber: 18, code: 'head->link = second;', explanation: 'Crucial step: connects the first node to the second node.' },
            { lineNumber: 25, code: 'printf("Second node data: %d\\n", head->link->data);', explanation: 'Accesses the second node\'s data by traversing through the head\'s link pointer.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s1-cm1',
          title: 'Forgetting to include stdlib.h for malloc',
          wrongCode: `#include <stdio.h>
struct node { int data; struct node *link; };
int main() {
    struct node *head = malloc(sizeof(struct node));
    return 0;
}`,
          correctCode: `#include <stdio.h>
#include <stdlib.h> // Required for malloc and free
struct node { int data; struct node *link; };
int main() {
    struct node *head = (struct node*)malloc(sizeof(struct node));
    free(head);
    return 0;
}`,
          explanation: 'In C, malloc is declared in stdlib.h. Omitting this header causes the compiler to assume malloc returns an int by default, leading to dangerous implicit declarations and potential segmentation faults on 64-bit systems where pointer sizes differ from int.',
          consequence: 'Undefined behavior or compilation errors/warnings.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s1-ic1',
          title: 'Memory Overhead of Linked Lists',
          content: 'Be prepared to discuss memory overhead. While linked lists save memory by avoiding unused pre-allocated space (like ArrayList capacity), they introduce an overhead for every element: the pointer itself. On a 64-bit system, an int data node (4 bytes) requires an 8-byte pointer, plus potential struct padding, meaning >66% of the node\'s memory is overhead!',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s1-cp1',
          title: 'Node Construction Check',
          description: 'Verify your understanding of creating and linking basic nodes.',
          criteria: [
            'Can successfully write a struct definition for a node.',
            'Knows how to use malloc to instantiate a node.',
            'Understands that the last node must always have its link pointer set to NULL.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s1-rc1',
          front: 'What are the two components of a Singly Linked List node?',
          back: 'The `data` (which stores the actual information) and the `link` (a pointer to the next node).',
          topicId: 'u1-t2',
          tags: ['definitions', 'nodes']
        },
        {
          id: 'u1-t2-s1-rc2',
          front: 'What is the primary advantage of a Linked List over an ArrayList?',
          back: 'Dynamic sizing with no wasted capacity, and efficient O(1) insertions/deletions if the target pointer location is already known (no need to shift elements).',
          topicId: 'u1-t2',
          tags: ['comparison']
        }
      ]
    },
    {
      id: 'u1-t2-s2',
      title: 'Creating Nodes & Traversal',
      slug: 'creating-nodes-and-traversal',
      description: `Once a linked list is constructed, the most common operation is traversing it. Traversal means visiting every node in the list from the head down to the last node. Because we cannot randomly access a node at index \`i\`, we must start at the \`head\` and follow the \`link\` pointers sequentially until we encounter \`NULL\`.

To perform a traversal, we create a temporary pointer (often named \`temp\` or \`current\`) and initialize it to point to the \`head\`. We use a \`while\` loop that continues as long as \`temp\` is not \`NULL\`. Inside the loop, we process the node (e.g., printing its data) and then advance the pointer using \`temp = temp->link\`. It is absolutely critical to use a temporary pointer rather than modifying the \`head\` pointer itself; if we move the \`head\`, we permanently lose the reference to the start of our list!`,
      keyPoints: [
        'Traversal requires starting at the head and moving sequentially to the end.',
        'Never modify the head pointer during traversal; always use a temporary pointer.',
        'The loop condition for full traversal is `while (temp != NULL)`.',
        'To advance to the next node, use `temp = temp->link`.',
        'Traversal time complexity is O(n), where n is the number of nodes.',
        'If the head is NULL, the list is empty, and the loop safely bypasses execution.'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s2-ex1',
          title: 'List Traversal Function',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

// Function to traverse and print the list
void traverseList(Node *head) {
    Node *temp = head; // Step 1: Use a temporary pointer
    
    if (temp == NULL) {
        printf("List is empty.\\n");
        return;
    }
    
    printf("List elements: ");
    while (temp != NULL) { // Step 2: Loop until NULL
        printf("%d -> ", temp->data); // Process data
        temp = temp->link; // Step 3: Advance to next node
    }
    printf("NULL\\n");
}

int main() {
    // Manually creating a 3-node list for demonstration
    Node *head = (Node *)malloc(sizeof(Node));
    Node *second = (Node *)malloc(sizeof(Node));
    Node *third = (Node *)malloc(sizeof(Node));
    
    head->data = 10; head->link = second;
    second->data = 20; second->link = third;
    third->data = 30; third->link = NULL;
    
    traverseList(head);
    
    free(head); free(second); free(third);
    return 0;
}`,
          explanation: 'This code defines a traverseList function that takes the head of the list, assigns it to a temp pointer, and walks through the list printing each element. The temporary pointer ensures the original head remains untouched.',
          expectedOutput: "List elements: 10 -> 20 -> 30 -> NULL",
          lineBreakdown: [
            { lineNumber: 11, code: 'Node *temp = head;', explanation: 'Creates a temporary pointer initialized to the start of the list.' },
            { lineNumber: 19, code: 'while (temp != NULL) {', explanation: 'Loop condition that stops when it moves past the last node.' },
            { lineNumber: 21, code: 'temp = temp->link;', explanation: 'Updates the pointer to hold the address of the next node, moving it forward.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s2-ex2',
          title: 'Counting the Number of Nodes',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

int countNodes(Node *head) {
    int count = 0;
    Node *temp = head;
    
    while (temp != NULL) {
        count++;
        temp = temp->link;
    }
    return count;
}

int main() {
    Node *n1 = (Node *)malloc(sizeof(Node));
    Node *n2 = (Node *)malloc(sizeof(Node));
    
    n1->data = 100; n1->link = n2;
    n2->data = 200; n2->link = NULL;
    
    printf("Total nodes: %d\\n", countNodes(n1));
    
    free(n1); free(n2);
    return 0;
}`,
          explanation: 'Counting nodes utilizes the exact same traversal logic. Instead of just printing data, we increment a counter for every non-NULL node visited.',
          expectedOutput: "Total nodes: 2",
          lineBreakdown: [
            { lineNumber: 10, code: 'int count = 0;', explanation: 'Initialize a counter.' },
            { lineNumber: 14, code: 'count++;', explanation: 'Increment counter for each visited node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s2-cm1',
          title: 'Infinite Loops during Traversal',
          wrongCode: `void printList(Node *head) {
    Node *temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        // Forgot: temp = temp->link;
    }
}`,
          correctCode: `void printList(Node *head) {
    Node *temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->link; // Correctly advances the pointer
    }
}`,
          explanation: 'Failing to advance the pointer `temp = temp->link` causes the loop to process the same node infinitely.',
          consequence: 'The program will hang in an infinite loop and keep printing the first node\'s data.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s2-ic1',
          title: 'Losing the Head',
          content: 'A very common interview mistake is doing `while (head != NULL) { head = head->link; }`. If you traverse by mutating the head pointer, you permanently lose the ability to access the start of your list, causing a massive memory leak and breaking the list structure for any subsequent operations. Always traverse with a temporary pointer.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s2-cp1',
          title: 'Traversal Understanding',
          description: 'Verify your knowledge of traversing linked lists.',
          criteria: [
            'Always use a temporary pointer instead of moving the head.',
            'Know that `while(temp != NULL)` visits every node, while `while(temp->link != NULL)` stops AT the last node.',
            'Remember to advance the pointer inside the loop.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s2-rc1',
          front: 'Why should you never use the head pointer to traverse a linked list?',
          back: 'Because updating the head pointer makes you lose the reference to the start of the list. You cannot go backwards in a Singly Linked List.',
          topicId: 'u1-t2',
          tags: ['traversal', 'pointers']
        }
      ]
    },
    {
      id: 'u1-t2-s3',
      title: 'Insertion Operations',
      slug: 'insertion-operations',
      description: `Inserting a new node into a Singly Linked List generally falls into three cases: inserting at the beginning (head), inserting at the end (tail), and inserting at a specific given position.

**Insertion at the Beginning (O(1)):** This is the simplest and fastest insertion. We allocate a new node, set its link to point to the current head, and then update the head pointer to point to this new node. This works perfectly whether the list is empty or already populated.

**Insertion at the End (O(n)):** To append a node, we must traverse the entire list to find the very last node (the one whose link is \`NULL\`). Once found, we change that node's link to point to our newly created node, and set the new node's link to \`NULL\`. An edge case occurs if the list is empty; in that case, the new node simply becomes the head.

**Insertion at a Given Position (O(n)):** To insert a node at position \`P\`, we must traverse to position \`P-1\`. We then rearrange the pointers: the new node's link is set to point to node \`P\`, and node \`P-1\`'s link is set to point to the new node. Order matters here—if you update \`P-1\` first, you will lose the address of node \`P\`!`,
      keyPoints: [
        'Inserting at the beginning takes O(1) time complexity.',
        'Inserting at the end takes O(n) time, unless an explicit tail pointer is maintained.',
        'When inserting at a specific position, you must traverse to the (position - 1) node.',
        'Order of pointer reassignment is critical to prevent losing the rest of the list.',
        'Always check for empty list edge cases, especially when inserting at the end.'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s3-ex1',
          title: 'Insert at Beginning and End',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

// Insert at the very front
void insertAtBeginning(Node **head_ref, int newData) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (!newNode) return;
    
    newNode->data = newData;
    // Point new node to current head
    newNode->link = *head_ref; 
    // Move head to point to the new node
    *head_ref = newNode; 
}

// Insert at the very end
void insertAtEnd(Node **head_ref, int newData) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (!newNode) return;
    
    newNode->data = newData;
    newNode->link = NULL;
    
    // Case: Empty List
    if (*head_ref == NULL) {
        *head_ref = newNode;
        return;
    }
    
    // Traverse to the last node
    Node *temp = *head_ref;
    while (temp->link != NULL) {
        temp = temp->link;
    }
    
    // Link the old last node to the new node
    temp->link = newNode;
}

void printList(Node *node) {
    while (node != NULL) {
        printf("%d -> ", node->data);
        node = node->link;
    }
    printf("NULL\\n");
}

int main() {
    Node *head = NULL;
    insertAtEnd(&head, 10);      // 10 -> NULL
    insertAtBeginning(&head, 20); // 20 -> 10 -> NULL
    insertAtEnd(&head, 30);      // 20 -> 10 -> 30 -> NULL
    
    printList(head);
    return 0;
}`,
          explanation: 'This code demonstrates how to insert nodes both at the head (O(1)) and the tail (O(n)). Notice the double pointers (Node **head_ref) used so the function can permanently modify the head pointer of the caller.',
          expectedOutput: "20 -> 10 -> 30 -> NULL",
          lineBreakdown: [
            { lineNumber: 16, code: 'newNode->link = *head_ref;', explanation: 'Links the new node to whatever node is currently first.' },
            { lineNumber: 18, code: '*head_ref = newNode;', explanation: 'Updates the head to officially point to the new node.' },
            { lineNumber: 33, code: 'while (temp->link != NULL) {', explanation: 'Traverse condition to stop EXACTLY on the last node, not past it.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s3-ex2',
          title: 'Insert at Given Position',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

// Assuming 1-based index (position 1 is head)
void insertAtPosition(Node **head_ref, int position, int newData) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = newData;
    
    // Case: Insert at head (position 1)
    if (position == 1) {
        newNode->link = *head_ref;
        *head_ref = newNode;
        return;
    }
    
    Node *temp = *head_ref;
    // Traverse to the node JUST BEFORE the position (pos - 1)
    for (int i = 1; temp != NULL && i < position - 1; i++) {
        temp = temp->link;
    }
    
    // If temp is NULL, the position was greater than the list size
    if (temp == NULL) {
        printf("Position out of bounds.\\n");
        free(newNode);
        return;
    }
    
    // Crucial Order: First link newNode to the next node
    newNode->link = temp->link;
    // Then link temp to newNode
    temp->link = newNode;
}

int main() {
    Node *head = NULL;
    insertAtPosition(&head, 1, 10); // Pos 1: 10
    insertAtPosition(&head, 2, 20); // Pos 2: 20
    insertAtPosition(&head, 2, 15); // Pos 2: 15. List: 10 -> 15 -> 20
    
    Node *t = head;
    while(t != NULL) {
        printf("%d ", t->data);
        t = t->link;
    }
    return 0;
}`,
          explanation: 'Inserting at a specific index requires stopping at the node right before the target index. The links are then rearranged to splice the new node into the chain.',
          expectedOutput: "10 15 20 ",
          lineBreakdown: [
            { lineNumber: 23, code: 'for (int i = 1; temp != NULL && i < position - 1; i++)', explanation: 'Advances temp until it reaches position - 1.' },
            { lineNumber: 35, code: 'newNode->link = temp->link;', explanation: 'Secures the rest of the list by pointing newNode to temp\'s current next node.' },
            { lineNumber: 37, code: 'temp->link = newNode;', explanation: 'Finally updates temp to point to the newNode.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s3-cm1',
          title: 'Incorrect Pointer Assignment Order',
          wrongCode: `// Trying to insert newNode after temp
temp->link = newNode;
newNode->link = temp->link;`,
          correctCode: `// Trying to insert newNode after temp
newNode->link = temp->link;
temp->link = newNode;`,
          explanation: 'If you overwrite `temp->link` first, you lose the address of the subsequent node! The new node will just point to itself, truncating the rest of your list.',
          consequence: 'Memory leak (lost nodes) and corrupted list.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s3-ic1',
          title: 'Passing Head by Reference in C',
          content: 'In C, if a function needs to modify the head pointer (e.g., insertion at the beginning), you must pass a pointer to the head pointer (`Node **head_ref`). If you just pass `Node *head`, you are modifying a local copy of the pointer, and the original head in `main()` will remain unchanged.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s3-cp1',
          title: 'Insertion Mastery',
          description: 'Verify your understanding of SLL insertions.',
          criteria: [
            'Understands why insertion at head is O(1) and tail is O(N).',
            'Knows to use double pointers (Node **) when the head might change.',
            'Understands the strict order of pointer assignments when inserting in the middle.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s3-rc1',
          front: 'What is the time complexity of inserting a node at the end of an SLL without a tail pointer?',
          back: 'O(N), because you must traverse the entire list to find the last node.',
          topicId: 'u1-t2',
          tags: ['complexity', 'insertion']
        },
        {
          id: 'u1-t2-s3-rc2',
          front: 'When inserting a node `N` after node `P`, what is the correct order of pointer updates?',
          back: '1. `N->link = P->link;` 2. `P->link = N;`',
          topicId: 'u1-t2',
          tags: ['pointers', 'insertion']
        }
      ]
    },
    {
      id: 'u1-t2-s4',
      title: 'Deletion Operations',
      slug: 'deletion-operations',
      description: `Just like insertion, deleting a node from a Singly Linked List happens in three primary locations: from the beginning, from the end, or from a specific position. Unlike array deletions where you have to shift elements left, linked list deletions only require bypassing the node with pointers and then freeing its memory.

**Deletion at the Beginning:** To delete the first node, we temporarily store the current head in a pointer, update the head to point to the second node (\`head = head->link\`), and then \`free()\` the temporary pointer.

**Deletion at the End:** This requires traversing the list using two pointers: one to find the last node (to free it), and a previous pointer to find the second-to-last node (to set its link to \`NULL\`).

**Deletion at a Given Position:** To delete a node at position \`P\`, traverse to node \`P-1\`. We then set \`P-1\`'s link to point to \`P\`'s link, effectively bypassing node \`P\`. We can then \`free()\` node \`P\`. Always ensure to handle cases where the list is empty or the requested position doesn't exist.`,
      keyPoints: [
        'Deletion from a linked list avoids the O(n) element shifting seen in arrays.',
        'To delete a node, you must rewire the previous node to point to the next node.',
        'You must use the free() function in C to deallocate memory and avoid memory leaks.',
        'Deleting the last node requires tracking the second-to-last node.',
        'Special cases apply when deleting the head node or when the list becomes empty.'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s4-ex1',
          title: 'Delete from Beginning and End',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

// Delete the first node
void deleteFirst(Node **head_ref) {
    if (*head_ref == NULL) return; // Empty list
    
    Node *temp = *head_ref;      // Store current head
    *head_ref = (*head_ref)->link; // Move head to next node
    free(temp);                  // Free the old head
}

// Delete the last node
void deleteLast(Node **head_ref) {
    if (*head_ref == NULL) return;
    
    // If only one node exists
    if ((*head_ref)->link == NULL) {
        free(*head_ref);
        *head_ref = NULL;
        return;
    }
    
    Node *temp = *head_ref;
    Node *prev = NULL;
    
    // Traverse to the last node while keeping track of the previous
    while (temp->link != NULL) {
        prev = temp;
        temp = temp->link;
    }
    
    // Unlink the last node
    prev->link = NULL;
    free(temp); // Free the last node
}

// Utility functions (insertAtBeginning, printList omitted for brevity)
void insert(Node **head, int data) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = data; n->link = *head; *head = n;
}

void print(Node *node) {
    while (node != NULL) { printf("%d -> ", node->data); node = node->link; }
    printf("NULL\\n");
}

int main() {
    Node *head = NULL;
    insert(&head, 30); insert(&head, 20); insert(&head, 10);
    
    printf("Original: "); print(head);
    deleteFirst(&head);
    printf("After deleteFirst: "); print(head);
    deleteLast(&head);
    printf("After deleteLast: "); print(head);
    
    return 0;
}`,
          explanation: 'Illustrates safely removing nodes at the head and tail. When deleting the tail, a `prev` pointer is strictly required because a singly linked list cannot look backwards to update the second-to-last node.',
          expectedOutput: "Original: 10 -> 20 -> 30 -> NULL\nAfter deleteFirst: 20 -> 30 -> NULL\nAfter deleteLast: 20 -> NULL",
          lineBreakdown: [
            { lineNumber: 13, code: 'Node *temp = *head_ref;', explanation: 'Temporarily stores the node we want to delete so we can free it later.' },
            { lineNumber: 14, code: '*head_ref = (*head_ref)->link;', explanation: 'Updates head to skip the first node.' },
            { lineNumber: 39, code: 'prev->link = NULL;', explanation: 'Updates the new tail node to point to NULL.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s4-ex2',
          title: 'Delete at Given Position',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node { int data; struct node *link; } Node;

void deleteAtPosition(Node **head_ref, int position) {
    if (*head_ref == NULL) return; // Empty list
    
    Node *temp = *head_ref;
    
    // If head needs to be removed
    if (position == 1) {
        *head_ref = temp->link;
        free(temp);
        return;
    }
    
    // Find previous node of the node to be deleted
    for (int i = 1; temp != NULL && i < position - 1; i++) {
        temp = temp->link;
    }
    
    // If position is more than number of nodes
    if (temp == NULL || temp->link == NULL) {
        printf("Position not found.\\n");
        return;
    }
    
    // Node temp->link is the node to be deleted
    // Store pointer to the next of node to be deleted
    Node *nodeToDelete = temp->link;
    
    // Unlink the node from linked list
    temp->link = nodeToDelete->link;
    
    // Free memory
    free(nodeToDelete);
}

// Utility functions omitted for brevity...
int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 3;
    head->link = n2; n2->link = n3; n3->link = NULL;
    
    deleteAtPosition(&head, 2); // delete node with value 2
    
    Node *t = head;
    while(t!=NULL){ printf("%d ", t->data); t=t->link; }
    
    return 0;
}`,
          explanation: 'Traverses to the node right before the one we want to delete. Bypasses the target node by updating the link, and then frees the target node memory.',
          expectedOutput: "1 3 ",
          lineBreakdown: [
            { lineNumber: 31, code: 'Node *nodeToDelete = temp->link;', explanation: 'Stores the node we actually want to delete.' },
            { lineNumber: 34, code: 'temp->link = nodeToDelete->link;', explanation: 'Rewires the list to bypass nodeToDelete.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s4-cm1',
          title: 'Memory Leaks on Deletion',
          wrongCode: `void deleteFirst(Node **head_ref) {
    if (*head_ref == NULL) return;
    *head_ref = (*head_ref)->link;
    // Missing free()
}`,
          correctCode: `void deleteFirst(Node **head_ref) {
    if (*head_ref == NULL) return;
    Node *temp = *head_ref;
    *head_ref = (*head_ref)->link;
    free(temp); // Properly deallocates memory
}`,
          explanation: 'Just because you bypassed a node by updating pointers doesn\'t mean it ceases to exist. It remains allocated in the heap, causing a memory leak if you do not call `free()`.',
          consequence: 'Gradual increase in program memory usage, eventually leading to crashes in long-running applications.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s4-ic1',
          title: 'Delete Node without Head Pointer',
          content: 'A classic trick question: "Delete a node given ONLY a pointer to that node (no head pointer)." Solution: You cannot delete the node itself because you can\'t update the previous node\'s link. Instead, copy the data from the next node into the current node, then delete the next node! `current->data = current->link->data; Node* temp = current->link; current->link = temp->link; free(temp);`',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s4-cp1',
          title: 'Deletion Concepts',
          description: 'Ensure accurate knowledge of removing nodes.',
          criteria: [
            'Knows how to securely bypass a node using links.',
            'Understands the necessity of freeing the bypassed node.',
            'Can handle the edge case where the list only has one node.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s4-rc1',
          front: 'Why do we need a `prev` pointer when deleting the last node of a Singly Linked List?',
          back: 'Because once we find the last node, we cannot traverse backward to update the second-to-last node\'s link to NULL.',
          topicId: 'u1-t2',
          tags: ['deletion', 'tail']
        }
      ]
    },
    {
      id: 'u1-t2-s5',
      title: 'Searching & Reversing',
      slug: 'searching-and-reversing',
      description: `Searching and reversing are two fundamental list manipulation tasks that heavily test your understanding of pointer logic.

**Searching** in a singly linked list is straightforward but somewhat inefficient compared to arrays. Because there are no indices, binary search is not practical (it would take O(n) just to find the middle element). Thus, we rely on **Linear Search**. We traverse from the head, comparing each node's data with the target value until we either find it or reach the end (\`NULL\`). The time complexity is O(N).

**Reversing** a linked list is a quintessential interview problem. It can be done iteratively or recursively. 
- The **iterative approach** uses three pointers: \`prev\`, \`current\`, and \`next\`. As we walk the list, we temporarily store the \`next\` node, flip the \`current\` node's link to point backwards to \`prev\`, and then slide all three pointers one step forward.
- The **recursive approach** travels to the end of the list and essentially rewires the nodes as the recursion unwinds, returning the new head.`,
      keyPoints: [
        'Searching a Linked List requires an O(n) Linear Search.',
        'Binary search is generally not used in standard linked lists due to lack of random access.',
        'Iterative reversal requires three pointers: prev, current, and next.',
        'In reversal, the current node\'s link is pointed to the previous node.',
        'After reversal, the original head becomes the new tail (pointing to NULL).'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s5-ex1',
          title: 'Linear Search in SLL',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct node { int data; struct node *link; } Node;

bool search(Node *head, int target) {
    Node *temp = head;
    while (temp != NULL) {
        if (temp->data == target) {
            return true; // Found
        }
        temp = temp->link;
    }
    return false; // Not found
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 10;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 20;
    head->link = n2; n2->link = NULL;
    
    printf("Search 20: %s\\n", search(head, 20) ? "Found" : "Not Found");
    printf("Search 30: %s\\n", search(head, 30) ? "Found" : "Not Found");
    return 0;
}`,
          explanation: 'Traverses the list checking each node\'s data. Returns true as soon as it finds the target.',
          expectedOutput: "Search 20: Found\nSearch 30: Not Found",
          lineBreakdown: [
            { lineNumber: 10, code: 'if (temp->data == target)', explanation: 'Condition to check if current node holds the required value.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s5-ex2',
          title: 'Iterative Reversal',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node { int data; struct node *link; } Node;

void reverseList(Node **head_ref) {
    Node *prev = NULL;
    Node *current = *head_ref;
    Node *next = NULL;
    
    while (current != NULL) {
        // Store next node
        next = current->link;
        
        // Reverse current node's pointer
        current->link = prev;
        
        // Move pointers one position ahead
        prev = current;
        current = next;
    }
    
    // Update head to point to the new first element (prev)
    *head_ref = prev;
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 3;
    head->link = n2; n2->link = n3; n3->link = NULL;
    
    reverseList(&head);
    
    Node *t = head;
    while(t){ printf("%d ", t->data); t=t->link; }
    return 0;
}`,
          explanation: 'The classic iterative reverse. It flips pointers one by one without needing any extra memory allocations.',
          expectedOutput: "3 2 1 ",
          lineBreakdown: [
            { lineNumber: 13, code: 'next = current->link;', explanation: 'Safeguards the rest of the list before breaking the link.' },
            { lineNumber: 16, code: 'current->link = prev;', explanation: 'The actual reversal: points the current node backwards.' },
            { lineNumber: 24, code: '*head_ref = prev;', explanation: 'When loop ends, prev is pointing to the last node, which is now the new head.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s5-cm1',
          title: 'Forgetting to store next node during reversal',
          wrongCode: `while (current != NULL) {
    current->link = prev; // Link reversed
    prev = current;
    current = current->link; // FAILS! current->link is now prev.
}`,
          correctCode: `while (current != NULL) {
    next = current->link; // Safe store
    current->link = prev;
    prev = current;
    current = next; // Move forward safely
}`,
          explanation: 'If you overwrite `current->link` to point backward before saving its original forward value, you can never progress to the next node. You\'ll end up jumping backward into an infinite loop or terminating early.',
          consequence: 'Infinite loop or truncated list.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s5-ic1',
          title: 'Recursive Reversal Complexity',
          content: 'While iterative reversal takes O(n) time and O(1) space, recursive reversal takes O(n) space due to the call stack. Interviewers often ask you to implement both to test your knowledge of space complexity trade-offs.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s5-cp1',
          title: 'Pointer Acrobatics',
          description: 'Ensure you understand the sliding window of pointers.',
          criteria: [
            'Knows the three pointers required for iterative reversal.',
            'Understands why modifying pointers doesn\'t shift data in memory.',
            'Understands linear search limits.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s5-rc1',
          front: 'What are the three pointers used in iteratively reversing a Linked List?',
          back: '`prev` (initialized to NULL), `current` (initialized to head), and `next` (used as a temporary placeholder).',
          topicId: 'u1-t2',
          tags: ['reversal']
        }
      ]
    },
    {
      id: 'u1-t2-s6',
      title: 'Applications',
      slug: 'applications',
      description: `Linked lists are incredibly versatile and serve as the foundation for many complex algorithms and data structures. For instance, Stacks and Queues are often implemented using linked lists to allow dynamic sizing without bounds checking.

One classic academic application of linked lists is the **Polynomial ADT (Abstract Data Type)**. A mathematical polynomial like \( 3x^2 + 2x + 1 \) can be represented as a list of nodes, where each node stores a coefficient and an exponent. Adding two polynomials then becomes a process of merging two linked lists based on exponent values.

Another crucial algorithm involving linked lists is **Cycle Detection**. If a node in a list points back to a previous node rather than \`NULL\`, a cycle is formed, causing standard traversals to loop infinitely. This is solved using **Floyd's Cycle-Finding Algorithm** (also known as the Tortoise and Hare algorithm), which uses a slow pointer that moves one step and a fast pointer that moves two steps. If there is a cycle, the two pointers will eventually meet.`,
      keyPoints: [
        'Stacks and Queues use linked lists internally for dynamic resizing.',
        'Polynomial manipulation stores coefficient and exponent in node data.',
        'Concatenating lists involves traversing the first list to the end, then linking it to the head of the second.',
        'Floyd\'s algorithm detects loops in O(N) time and O(1) space using two pointers.',
        'A fast pointer (2 steps) and slow pointer (1 step) will always collide if a cycle exists.'
      ],
      codeExamples: [
        {
          id: 'u1-t2-s6-ex1',
          title: 'Floyd\'s Cycle Detection',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct node { int data; struct node *link; } Node;

bool detectCycle(Node *head) {
    Node *slow_p = head, *fast_p = head;
    
    while (slow_p && fast_p && fast_p->link) {
        slow_p = slow_p->link;          // Moves 1 step
        fast_p = fast_p->link->link;    // Moves 2 steps
        
        if (slow_p == fast_p) {
            return true; // Cycle found
        }
    }
    return false; // Reached NULL, no cycle
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 3;
    
    head->link = n2; n2->link = n3; 
    n3->link = head; // Creates a cycle back to head
    
    if (detectCycle(head)) {
        printf("Loop Detected!\\n");
    } else {
        printf("No Loop found.\\n");
    }
    return 0;
}`,
          explanation: 'Demonstrates Floyd\'s Tortoise and Hare algorithm. The fast pointer will eventually overlap with the slow pointer inside a cyclic loop.',
          expectedOutput: "Loop Detected!",
          lineBreakdown: [
            { lineNumber: 11, code: 'slow_p = slow_p->link;', explanation: 'Tortoise moves one node.' },
            { lineNumber: 12, code: 'fast_p = fast_p->link->link;', explanation: 'Hare moves two nodes.' },
            { lineNumber: 14, code: 'if (slow_p == fast_p)', explanation: 'If they point to the exact same memory address, a cycle exists.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t2-s6-ex2',
          title: 'List Concatenation',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

typedef struct node { int data; struct node *link; } Node;

void concatenate(Node **head1, Node *head2) {
    // If first list is empty, just point it to list 2
    if (*head1 == NULL) {
        *head1 = head2;
        return;
    }
    
    Node *temp = *head1;
    // Traverse to the end of list 1
    while (temp->link != NULL) {
        temp = temp->link;
    }
    
    // Attach head of list 2 to end of list 1
    temp->link = head2;
}

int main() {
    // List 1: 1 -> 2
    Node *h1 = (Node*)malloc(sizeof(Node)); h1->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    h1->link = n2; n2->link = NULL;
    
    // List 2: 3 -> 4
    Node *h2 = (Node*)malloc(sizeof(Node)); h2->data = 3;
    Node *n4 = (Node*)malloc(sizeof(Node)); n4->data = 4;
    h2->link = n4; n4->link = NULL;
    
    concatenate(&h1, h2);
    
    Node *t = h1;
    while(t) { printf("%d ", t->data); t=t->link; }
    
    return 0;
}`,
          explanation: 'Merges two lists into one continuous list. It involves finding the tail of the first list and pointing its link to the head of the second list.',
          expectedOutput: "1 2 3 4 ",
          lineBreakdown: [
            { lineNumber: 15, code: 'while (temp->link != NULL)', explanation: 'Find the tail node of the first list.' },
            { lineNumber: 20, code: 'temp->link = head2;', explanation: 'Binds the two lists together.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s6-cm1',
          title: 'Not checking fast_p->link in cycle detection',
          wrongCode: `while (slow_p && fast_p) {
    slow_p = slow_p->link;
    fast_p = fast_p->link->link; // Segfault if fast_p->link is NULL!
}`,
          correctCode: `while (slow_p && fast_p && fast_p->link) {
    slow_p = slow_p->link;
    fast_p = fast_p->link->link;
}`,
          explanation: 'If `fast_p` is at the last node, `fast_p->link` is NULL. Attempting to read `fast_p->link->link` will attempt to dereference NULL, causing a segmentation fault.',
          consequence: 'Program crash on non-cyclic lists.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s6-ic1',
          title: 'Finding the start of the Cycle',
          content: 'Detecting a cycle is often part 1 of an interview question. Part 2 is "Find the node where the cycle begins." Floyd\'s algorithm solves this: after the fast and slow pointers meet, reset `slow` to the `head`. Then move both `slow` and `fast` one step at a time. The node where they meet again is the start of the cycle!',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t2-s6-cp1',
          title: 'Advanced SLL Concepts',
          description: 'Ensure comprehension of list interactions.',
          criteria: [
            'Understands how two pointers moving at different speeds detect cycles.',
            'Knows how to securely concatenate lists even if one is empty.',
            'Can visualize polynomial structures as lists.'
          ],
          topicId: 'u1-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t2-s6-rc1',
          front: 'What is the time and space complexity of Floyd\'s Cycle Detection algorithm?',
          back: 'Time Complexity: O(N). Space Complexity: O(1) (since only two pointers are used regardless of list size).',
          topicId: 'u1-t2',
          tags: ['algorithms', 'complexity']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t2-q99',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'Which of the following is true about Traversing a linked list?',
      options: ['You can start from the middle if you know the index', 'You must always start from the head node', 'It is faster than traversing an array', 'It requires O(1) time complexity'],
      correctAnswer: 'You must always start from the head node',
      explanation: 'Linked lists do not have random access by index, so you must always begin traversal from the head pointer.',
      tags: ['traversal']
    },
    {
      id: 'u1-t2-q1',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'What does the last node of a perfectly formed Singly Linked List point to?',
      options: ['The head node', 'A garbage memory address', 'NULL', 'The previous node'],
      correctAnswer: 'NULL',
      explanation: 'In a standard Singly Linked List, the `link` part of the last node is always set to NULL to indicate the termination of the list.',
      tags: ['definitions']
    },
    {
      id: 'u1-t2-q2',
      type: 'true-false',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'Linked lists store elements in contiguous memory locations.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'False. Unlike arrays, linked list nodes are allocated dynamically on the heap and are scattered randomly in memory, connected only by pointers.',
      tags: ['memory', 'comparison']
    },
    {
      id: 'u1-t2-q3',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'What is the time complexity of inserting a node at the head of a Singly Linked List?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
      correctAnswer: 'O(1)',
      explanation: 'Inserting at the head requires simply pointing the new node to the current head, and updating the head pointer. This takes constant time, O(1), regardless of the list size.',
      tags: ['complexity', 'insertion']
    },
    {
      id: 'u1-t2-q4',
      type: 'fill-blank',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'In C, memory for a new linked list node is dynamically allocated using the ________ function.',
      options: [],
      correctAnswer: 'malloc',
      explanation: '`malloc()` (memory allocate) is used to allocate space on the heap for dynamic data structures like nodes in a linked list.',
      tags: ['memory']
    },
    {
      id: 'u1-t2-q5',
      type: 'spot-bug',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'Identify the issue in this traversal code.',
      code: `void print(Node *head) {
    while (head != NULL) {
        printf("%d", head->data);
        head = head->link;
    }
}`,
      options: ['Missing semicolon', 'Modifies the original head pointer', 'Dereferences NULL', 'Infinite loop'],
      correctAnswer: 'Modifies the original head pointer',
      explanation: 'If the `head` pointer is passed by value it\'s technically safe locally, but modifying `head` directly is terrible practice. If used in `main()` without a function abstraction, you lose the reference to the list start. You should always use a temporary pointer `temp`.',
      tags: ['traversal', 'bugs']
    },
    {
      id: 'u1-t2-q6',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'Which of the following operations is O(N) in a Singly Linked List? (Assuming only a head pointer exists)',
      options: ['Deleting the first node', 'Inserting a node at the beginning', 'Deleting the last node', 'Checking if the list is empty'],
      correctAnswer: 'Deleting the last node',
      explanation: 'To delete the last node, you must traverse the entire list to find the second-to-last node to set its link to NULL, which takes O(N) time.',
      tags: ['complexity', 'deletion']
    },
    {
      id: 'u1-t2-q7',
      type: 'predict-output',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'What is the output of the following code snippet?',
      code: `Node *a = malloc(sizeof(Node));
Node *b = malloc(sizeof(Node));
a->data = 5; b->data = 10;
a->link = b; b->link = a;
printf("%d", a->link->link->data);`,
      options: ['5', '10', 'Segmentation Fault', 'Compilation Error'],
      correctAnswer: '5',
      explanation: 'This creates a circular reference. `a->link` is `b`, so `a->link->link` is `b->link`, which points back to `a`. Thus, its data is 5.',
      tags: ['pointers']
    },
    {
      id: 'u1-t2-q8',
      type: 'true-false',
      topicId: 'u1-t2',
      difficulty: 'advanced',
      question: 'Floyd’s cycle-finding algorithm uses O(N) extra space to track visited nodes.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'False. Floyd’s algorithm (Tortoise and Hare) uses exactly two pointers regardless of list size, meaning it requires O(1) auxiliary space.',
      tags: ['algorithms', 'complexity']
    },
    {
      id: 'u1-t2-q9',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'advanced',
      question: 'When deleting node P from a list, where node PREV is before it and node NEXT is after it, which operation correctly bypasses P?',
      options: ['PREV->link = NEXT;', 'NEXT->link = PREV;', 'P->link = NEXT;', 'PREV->link = P;'],
      correctAnswer: 'PREV->link = NEXT;',
      explanation: 'To bypass node P, you set the link of the node before P (PREV) to point directly to the node after P (NEXT).',
      tags: ['deletion', 'pointers']
    },
    {
      id: 'u1-t2-q10',
      type: 'spot-bug',
      topicId: 'u1-t2',
      difficulty: 'advanced',
      question: 'What is wrong with this deletion code trying to delete the first node?',
      code: `void deleteFirst(Node **head) {
    free(*head);
    *head = (*head)->link;
}`,
      options: ['free() is spelled incorrectly', 'Use-after-free error', 'Dereferencing a double pointer', 'Nothing is wrong'],
      correctAnswer: 'Use-after-free error',
      explanation: 'The code calls `free(*head)` and THEN tries to access `(*head)->link`. Once memory is freed, accessing it results in undefined behavior (use-after-free). You must save the link in a temporary variable before freeing.',
      tags: ['bugs', 'memory']
    },
    {
      id: 'u1-t2-q11',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'An Abstract Data Type (ADT) specifies:',
      options: ['Both interface and implementation', 'Only the implementation', 'Only the interface', 'None of these'],
      correctAnswer: 'Only the interface',
      explanation: 'An ADT defines WHAT operations are available and their behavior (the interface/contract) without specifying HOW they are implemented. The implementation is hidden from the user. This is the core concept of abstraction and encapsulation.',
      tags: ['ADT', 'Abstraction']
    },
    {
      id: 'u1-t2-q12',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'An array is a data structure in which:',
      options: ['Access is faster but insertion and deletion are not', 'Both access and insertion/deletion are fast', 'Both access and insertion/deletion are slow', 'None of these'],
      correctAnswer: 'Access is faster but insertion and deletion are not',
      explanation: 'Arrays provide O(1) random access (direct indexing). However, insertion and deletion require shifting elements: O(n) in the worst case. This trade-off is the key reason linked lists exist as an alternative.',
      tags: ['Array', 'Complexity']
    },
    {
      id: 'u1-t2-q13',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'A linked list is a data structure in which:',
      options: ['Access is faster but insertion/deletion are not', 'Both access and insertion/deletion are fast', 'Both access and insertion/deletion are slow', 'None of these'],
      correctAnswer: 'None of these',
      explanation: 'A linked list has O(n) access (must traverse from head). Insertion/deletion at the HEAD is O(1), but at a given position requires O(n) traversal first. So neither a, b, nor c is entirely correct for ALL positions — answer is d (none of these).',
      tags: ['Linked-List', 'Complexity']
    },
    {
      id: 'u1-t2-q14',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'What is true of a list (as an ADT)?',
      options: ['Can access the ith element directly', 'Cannot be empty', 'Every element has a position (ordinal position)', 'Can grow indefinitely'],
      correctAnswer: 'Every element has a position (ordinal position)',
      explanation: 'By definition, a list is a sequence where every element occupies an ordinal position (1st, 2nd, 3rd...). Lists CAN be empty. Direct access is not guaranteed (depends on implementation). Growth depends on memory.',
      tags: ['List-ADT', 'Properties']
    },
    {
      id: 'u1-t2-q15',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      question: 'Which operation on a linked list always requires the fewest operations?',
      options: ['Add at the beginning', 'Add in the middle', 'Find the midpoint', 'Remove an element at the end'],
      correctAnswer: 'Add at the beginning',
      explanation: 'Adding at the beginning of a linked list is always O(1) — just create a new node and point its next to the current head, then update head. All other operations require traversal: O(n).',
      tags: ['SLL-Operations', 'Complexity']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t2-p1',
      title: 'Implement a Complete SLL',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      problemStatement: 'Write a complete C program that implements a Singly Linked List with a menu-driven interface or a main function that tests the following functions: `insert_front`, `insert_end`, `delete_front`, `display`, and `search`.',
      constraints: ['Nodes contain integer data.', 'Functions must handle empty list edge cases safely.'],
      sampleInput: 'insert_front(10), insert_end(20), insert_front(5), display()',
      sampleOutput: '5 -> 10 -> 20 -> NULL',
      hints: ['Remember to pass the head pointer by reference (Node **) to insertion/deletion functions so the caller\'s head gets updated.'],
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

void insert_front(Node **head, int data) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = data;
    newNode->link = *head;
    *head = newNode;
}

void insert_end(Node **head, int data) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    newNode->data = data;
    newNode->link = NULL;
    
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    
    Node *temp = *head;
    while (temp->link != NULL) {
        temp = temp->link;
    }
    temp->link = newNode;
}

void delete_front(Node **head) {
    if (*head == NULL) return;
    Node *temp = *head;
    *head = (*head)->link;
    free(temp);
}

void display(Node *head) {
    while (head != NULL) {
        printf("%d -> ", head->data);
        head = head->link;
    }
    printf("NULL\\n");
}

bool search(Node *head, int target) {
    while (head != NULL) {
        if (head->data == target) return true;
        head = head->link;
    }
    return false;
}

int main() {
    Node *head = NULL;
    insert_front(&head, 10);
    insert_end(&head, 20);
    insert_front(&head, 5);
    display(head); // 5 -> 10 -> 20 -> NULL
    
    delete_front(&head);
    display(head); // 10 -> 20 -> NULL
    
    printf("Search 20: %d\\n", search(head, 20)); // 1
    
    return 0;
}`,
      solutionExplanation: 'This program provides standard boilerplate for an SLL. `insert_front` updates the head immediately. `insert_end` traverses to the last node. `delete_front` holds the old head in `temp`, updates head, and frees `temp`.',
      dryRun: [
        { step: 1, line: 12, variables: { '*head': 'NULL', 'data': '10' }, output: '', explanation: 'insert_front called. newNode created with data=10. link=NULL. head updated to newNode.' },
        { step: 2, line: 20, variables: { '*head': 'Node(10)', 'data': '20' }, output: '', explanation: 'insert_end called. Traverses to Node(10). Points its link to newNode(20).' }
      ],
      tags: ['crud', 'basics']
    },
    {
      id: 'u1-t2-p2',
      title: 'Reverse a Linked List',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      problemStatement: 'Given a pointer to the head node of a linked list, write a function to reverse the list. Return the new head pointer. The reversal must be done in-place (iteratively) without allocating new nodes.',
      constraints: ['Time Complexity: O(N)', 'Space Complexity: O(1)'],
      sampleInput: '1 -> 2 -> 3 -> 4 -> NULL',
      sampleOutput: '4 -> 3 -> 2 -> 1 -> NULL',
      hints: ['Use three pointers: prev (NULL), current (head), and next (NULL).', 'Save the next node before modifying current->link.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

Node* reverse(Node *head) {
    Node *prev = NULL;
    Node *current = head;
    Node *next = NULL;
    
    while (current != NULL) {
        next = current->link;  // Save the next node
        current->link = prev;  // Reverse the link
        prev = current;        // Move prev one step
        current = next;        // Move current one step
    }
    
    return prev; // prev is the new head
}

// Helper functions to test
void push(Node** head, int new_data) {
    Node* new_node = (Node*)malloc(sizeof(Node));
    new_node->data = new_data;
    new_node->link = (*head);
    (*head) = new_node;
}

void print(Node *node) {
    while (node != NULL) {
        printf("%d ", node->data);
        node = node->link;
    }
    printf("\\n");
}

int main() {
    Node* head = NULL;
    push(&head, 4); push(&head, 3); push(&head, 2); push(&head, 1);
    
    printf("Original: "); print(head);
    head = reverse(head);
    printf("Reversed: "); print(head);
    
    return 0;
}`,
      solutionExplanation: 'The three-pointer approach shifts a "sliding window" over the list. `next` preserves the remainder of the list, `current->link = prev` flips the current node backwards, and then both `prev` and `current` step forward.',
      dryRun: [
        { step: 1, line: 11, variables: { 'prev': 'NULL', 'curr': 'Node(1)' }, output: '', explanation: 'Start of loop.' },
        { step: 2, line: 15, variables: { 'next': 'Node(2)', 'curr->link': 'NULL' }, output: '', explanation: 'Node 1 points to NULL.' },
        { step: 3, line: 17, variables: { 'prev': 'Node(1)', 'curr': 'Node(2)' }, output: '', explanation: 'Pointers advance.' }
      ],
      tags: ['reversal', 'pointers']
    },
    {
      id: 'u1-t2-p3',
      title: 'Polynomial Addition',
      topicId: 'u1-t2',
      difficulty: 'intermediate',
      problemStatement: 'Represent two mathematical polynomials using linked lists (where each node holds a coefficient and an exponent) and write a function to add them. The lists are sorted in descending order of exponents.',
      constraints: ['Keep exponents sorted.'],
      sampleInput: 'Poly1: 5x^2 + 4x^1 + 2x^0. Poly2: 5x^1 + 5x^0.',
      sampleOutput: '5x^2 + 9x^1 + 7x^0',
      hints: ['Traverse both lists. If exponents match, add coefficients. If poly1 exp > poly2 exp, append poly1 node and move poly1 pointer.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int coeff;
    int exp;
    struct node *link;
} Node;

void insert(Node **poly, int coeff, int exp) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->coeff = coeff; newNode->exp = exp; newNode->link = NULL;
    
    if (*poly == NULL) {
        *poly = newNode;
        return;
    }
    Node *temp = *poly;
    while(temp->link != NULL) temp = temp->link;
    temp->link = newNode;
}

Node* addPolynomials(Node *p1, Node *p2) {
    Node *result = NULL;
    while (p1 != NULL && p2 != NULL) {
        if (p1->exp == p2->exp) {
            insert(&result, p1->coeff + p2->coeff, p1->exp);
            p1 = p1->link; p2 = p2->link;
        } else if (p1->exp > p2->exp) {
            insert(&result, p1->coeff, p1->exp);
            p1 = p1->link;
        } else {
            insert(&result, p2->coeff, p2->exp);
            p2 = p2->link;
        }
    }
    
    while (p1 != NULL) {
        insert(&result, p1->coeff, p1->exp);
        p1 = p1->link;
    }
    while (p2 != NULL) {
        insert(&result, p2->coeff, p2->exp);
        p2 = p2->link;
    }
    return result;
}

void display(Node *poly) {
    while (poly != NULL) {
        printf("%dx^%d ", poly->coeff, poly->exp);
        poly = poly->link;
        if (poly != NULL) printf("+ ");
    }
    printf("\\n");
}

int main() {
    Node *poly1 = NULL, *poly2 = NULL;
    insert(&poly1, 5, 2); insert(&poly1, 4, 1); insert(&poly1, 2, 0);
    insert(&poly2, 5, 1); insert(&poly2, 5, 0);
    
    Node *sum = addPolynomials(poly1, poly2);
    display(sum);
    return 0;
}`,
      solutionExplanation: 'This mimics the merge phase of Merge Sort. We compare exponents. If equal, sum the coefficients and move both pointers. Otherwise, take the node with the higher exponent and move its respective pointer. Remaining nodes in either list are appended at the end.',
      dryRun: [
        { step: 1, line: 26, variables: { 'p1->exp': '2', 'p2->exp': '1' }, output: '', explanation: 'p1 > p2. Insert 5x^2 to result. Advance p1.' },
        { step: 2, line: 24, variables: { 'p1->exp': '1', 'p2->exp': '1' }, output: '', explanation: 'Exponents match. Insert (4+5)x^1 = 9x^1. Advance both.' }
      ],
      tags: ['applications', 'math']
    },
    {
      id: 'u1-t2-p4',
      title: 'Detect Loop using Floyd\'s Algorithm',
      topicId: 'u1-t2',
      difficulty: 'advanced',
      problemStatement: 'Write a C function to detect if a cycle (loop) exists in a Singly Linked List using Floyd\'s Cycle-Finding Algorithm. Return 1 if a cycle exists, 0 otherwise.',
      constraints: ['Time Complexity: O(N)', 'Space Complexity: O(1)'],
      sampleInput: '1 -> 2 -> 3 -> 4 -> (points back to 2)',
      sampleOutput: '1 (True)',
      hints: ['Use two pointers: slow (moves 1 step) and fast (moves 2 steps).', 'If they ever meet, there is a loop. If fast reaches NULL, there is no loop.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct node {
    int data;
    struct node *link;
} Node;

int detectLoop(Node *head) {
    Node *slow = head;
    Node *fast = head;
    
    while (slow != NULL && fast != NULL && fast->link != NULL) {
        slow = slow->link;          // tortoise moves 1 step
        fast = fast->link->link;    // hare moves 2 steps
        
        if (slow == fast) {
            return 1; // Cycle detected
        }
    }
    return 0; // No cycle
}

int main() {
    Node *head = (Node*)malloc(sizeof(Node)); head->data = 1;
    Node *n2 = (Node*)malloc(sizeof(Node)); n2->data = 2;
    Node *n3 = (Node*)malloc(sizeof(Node)); n3->data = 3;
    Node *n4 = (Node*)malloc(sizeof(Node)); n4->data = 4;
    
    head->link = n2; n2->link = n3; n3->link = n4;
    n4->link = n2; // Loop created here (4 points to 2)
    
    if (detectLoop(head))
        printf("Loop found.\\n");
    else
        printf("No loop found.\\n");
        
    return 0;
}`,
      solutionExplanation: 'The algorithm forces a faster pointer to run around the cycle and eventually lap the slower pointer. If there is no cycle, the fast pointer will simply hit NULL and terminate the loop safely.',
      dryRun: [
        { step: 1, line: 15, variables: { 'slow': 'Node(2)', 'fast': 'Node(3)' }, output: '', explanation: '1st iteration: slow moves to 2, fast moves to 3.' },
        { step: 2, line: 15, variables: { 'slow': 'Node(3)', 'fast': 'Node(2)' }, output: '', explanation: '2nd iteration: slow moves to 3, fast moves to 2 (due to loop).' },
        { step: 3, line: 15, variables: { 'slow': 'Node(4)', 'fast': 'Node(4)' }, output: 'Loop found.', explanation: '3rd iteration: Both land on node 4. Loop detected.' }
      ],
      tags: ['algorithms', 'two-pointers']
    }
  ]
};
