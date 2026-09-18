import type { Topic } from '../../../../types';

export const orderedListHeader: Topic = {
  id: 'u1-t7',
  unitId: 'unit-1',
  title: 'Ordered List and Header Node',
  slug: 'ordered-list-header',
  description: 'In computer science, maintaining elements in a specific order is a common requirement. An ordered list ensures that elements are always sorted according to some key. When implementing linked lists, edge cases such as inserting at the beginning or into an empty list often complicate the code, requiring multiple conditional branches.\n\nBy introducing a dummy "header node" at the beginning of the list, we can elegantly eliminate these edge cases. The header node acts as a permanent sentinel; it never holds valid data and is never deleted. This means that every real node always has a predecessor, simplifying our insertion and deletion logic to a single, robust path.\n\nIn this topic, we will explore self-referential structures, manual linked list building, and the profound impact a header node has on simplifying ordered list operations. You will compare code with and without a header node, witnessing firsthand how a small structural change can lead to vastly cleaner algorithms.',
  difficulty: 'intermediate',
  prerequisites: ['u1-t1', 'u1-t2'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u1-t7-s1',
      title: 'Self-Referential Structures and Manual List Building',
      slug: 'self-referential-structures',
      description: 'A self-referential structure is one that contains a pointer to a structure of the same type. This is the foundational concept for building linked lists, trees, and graphs in C. It is crucial to understand that a structure cannot contain an instance of itself, as this would lead to an infinitely large object and a compile-time error. However, a pointer to itself is perfectly valid because all pointers have a fixed size, regardless of what they point to.\n\nUsing these self-referential pointers, we can manually chain dynamically allocated structures together. By manually allocating memory for each node and explicitly setting the next pointers, we create a linked list. While this manual building demonstrates how nodes connect in memory, real applications use functions to automate traversal and insertion.',
      keyPoints: [
        'A self-referential structure contains a pointer to a structure of the same type.',
        'Structures cannot contain direct instances of themselves due to infinite recursion in size.',
        'Pointers have a fixed size, making self-referencing pointers legal.',
        'Linked lists are built by chaining nodes using these self-referential pointers.',
        'Manual chaining involves allocating each node and linking the next pointer of the previous node.'
      ],
      codeExamples: [
        {
          id: 'u1-t7-s1-ex1',
          title: 'Self-Referential Structures Concept',
          code: `#include <stdio.h>
#include <stdlib.h>
struct X { int a; };
struct Y { int b; struct X x; };
// struct Z { int c; struct Z z; }; // ERROR: infinitely recursive — NOT a pointer

// Self-referential structure — OK because it is a POINTER
struct A {
    int c;
    struct A *p;   // pointer to same type — OK
};

int main() {
    printf("size : %lu\\n", sizeof(struct X));  // 4
    printf("size : %lu\\n", sizeof(struct Y));  // 8
    printf("size : %lu\\n", sizeof(struct A));  // 8 or 16 depending on padding, let's assume 8 for 32bit systems as per prompt comments
    struct A one;
    one.c = 10;
    one.p = &one;  // points to itself
    printf("%d %d %d\\n", one.c, one.p->c, one.p->p->c);  // 10 10 10
}`,
          language: 'c',
          explanation: 'This example shows the difference between nesting structures and self-referential pointers. Struct A contains a pointer `p` of type `struct A *`. Because `p` is a pointer, its size is fixed, and the compiler can determine the total size of `struct A`. Trying to include `struct Z z;` directly fails.',
          expectedOutput: 'size : 4\nsize : 8\nsize : 16\n10 10 10',
          lineBreakdown: [
            { lineNumber: 5, code: '// struct Z { int c; struct Z z; };', explanation: 'Compile error: a struct cannot hold an instance of itself.' },
            { lineNumber: 10, code: 'struct A *p;', explanation: 'Pointer to a self-referential structure.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t7-s1-ex2',
          title: 'Manual Linked List Building',
          code: `#include <stdio.h>
#include <stdlib.h>
struct node { int key_; struct node *next_; };
typedef struct node node_t;

void disp(node_t* q) {
    while(q != NULL) { printf("%d ", q->key_); q = q->next_; }
}
void freelist(node_t* q) {
    node_t* r;
    while(q != NULL) { r = q->next_; free(q); q = r; }
}
int main() {
    node_t *p;
    p = (node_t*)malloc(sizeof(node_t));
    p->key_ = 20; p->next_ = (node_t*)malloc(sizeof(node_t));
    p->next_->key_ = 40; p->next_->next_ = (node_t*)malloc(sizeof(node_t));
    p->next_->next_->key_ = 60; p->next_->next_->next_ = NULL;
    disp(p);      // 20 40 60
    freelist(p);
}`,
          language: 'c',
          explanation: 'This code manually allocates nodes one by one and chains their `next_` pointers together. It visually demonstrates how a linked list structure is formed in the heap.',
          expectedOutput: '20 40 60 ',
          lineBreakdown: [
            { lineNumber: 16, code: 'p->next_ = (node_t*)malloc(sizeof(node_t));', explanation: 'Allocates memory for the second node and links it to the first.' },
            { lineNumber: 11, code: 'while(q != NULL) { r = q->next_; free(q); q = r; }', explanation: 'Correctly iterates through the list, saving the next pointer before freeing the current node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t7-s1-cm1',
          title: 'Direct structure embedding',
          wrongCode: `struct node {
    int data;
    struct node next;
};`,
          correctCode: `struct node {
    int data;
    struct node *next;
};`,
          explanation: 'Attempting to include the structure itself as a member creates an infinite size definition, which the compiler rejects.',
          consequence: 'Compile-time error: field has incomplete type.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t7-s1-ic1',
          title: 'Memory Leaks in Linked Lists',
          content: 'When manually building or manipulating linked lists, failing to free dynamically allocated nodes when they are no longer needed is a common source of memory leaks. Interviewers will often ask you to demonstrate the correct sequence for freeing a list (save next, free current, advance).',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t7-s1-cp1',
          title: 'Self-Referencing Validation',
          description: 'Verify understanding of valid self-referential structures.',
          criteria: [
            'Identify that pointers have fixed sizes.',
            'Explain why direct embedding causes an infinite size compile error.',
            'Trace manually chained nodes.'
          ],
          topicId: 'u1-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t7-s1-rc1',
          front: 'Why must a self-referential struct member be a pointer?',
          back: 'Because pointers have a known, fixed size. A direct instance would recursively demand infinite memory, preventing the compiler from determining the struct size.',
          topicId: 'u1-t7',
          tags: ['struct', 'memory']
        }
      ]
    },
    {
      id: 'u1-t7-s2',
      title: 'What is an Ordered List?',
      slug: 'ordered-list-concept',
      description: 'An ordered list is a list in which the elements are arranged in a logical sequence, such as ascending or descending order, based on a specific key. Unlike a stack or a queue where elements are placed based on timing (LIFO/FIFO), ordered list insertions dynamically find the correct sorted position for the new element.\n\nTo maintain order, the insertion function must traverse the list and compare the new element with existing ones. The traversal stops when the correct position is found, and the pointers are updated. Before introducing a header node, insertion algorithms typically have to handle four distinct cases: empty list, insertion at the beginning, insertion in the middle, and insertion at the end.',
      keyPoints: [
        'An ordered list maintains elements in sorted order based on their keys.',
        'The list stays sorted at all times; each insertion respects the order.',
        'Traversing is necessary to find the correct insertion position.',
        'Standard list insertion involves handling multiple edge cases.',
        'Edge cases include an empty list, and inserting at the head, middle, or tail.'
      ],
      codeExamples: [
        {
          id: 'u1-t7-s2-ex1',
          title: 'Header File Definition (mylist.h)',
          code: `#ifndef MYLIST_H
#define MYLIST_H
struct node { int key_; struct node *next_; };
typedef struct node node_t;
struct mylist { node_t *head_; };
typedef struct mylist mylist_t;
void init_list(mylist_t*);
void insert_list(mylist_t*, int key);
void disp_list(mylist_t*);
void free_list(mylist_t*);
#endif`,
          language: 'c',
          explanation: 'This header file declares the `mylist_t` interface. The implementation can encapsulate the list state entirely, allowing a clean client-side experience.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 5, code: 'struct mylist { node_t *head_; };', explanation: 'Wrapper structure that holds the head pointer.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t7-s2-ex2',
          title: 'The Old Way: Complex Insertion',
          code: `// Old insert_list (before header node) handled 4 cases:
// 1: Empty list
// 2: Insert at beginning
// 3: Insert in middle
// 4: Insert at end

/*
void insert_list_old(mylist_t* ptr_list, int key) {
    node_t* temp = malloc(sizeof(node_t));
    temp->key_ = key; temp->next_ = NULL;
    
    // Case 1: Empty list
    if (ptr_list->head_ == NULL) {
        ptr_list->head_ = temp;
        return;
    }
    
    // Case 2: Insert at beginning
    if (key < ptr_list->head_->key_) {
        temp->next_ = ptr_list->head_;
        ptr_list->head_ = temp;
        return;
    }
    
    // Cases 3 & 4: Middle or End
    node_t* prev = NULL;
    node_t* pres = ptr_list->head_;
    while (pres != NULL && pres->key_ < key) {
        prev = pres;
        pres = pres->next_;
    }
    temp->next_ = pres;
    prev->next_ = temp;
}
*/`,
          language: 'c',
          explanation: 'Without a header node, `ptr_list->head_` might be NULL, or the new node might need to become the new head. This forces special `if` checks that complicate the code.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 11, code: 'if (ptr_list->head_ == NULL)', explanation: 'Edge case check for an initially empty list.' },
            { lineNumber: 17, code: 'if (key < ptr_list->head_->key_)', explanation: 'Edge case check for insertion before the first element.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t7-s2-cm1',
          title: 'Missing edge cases in manual inserts',
          wrongCode: `node_t* prev = NULL;
node_t* pres = ptr_list->head_;
while (pres != NULL && pres->key_ < key) {
    prev = pres;
    pres = pres->next_;
}
// If list was empty, prev is NULL, so this crashes:
prev->next_ = temp;`,
          correctCode: `// Must check if prev is NULL first
if (prev == NULL) {
    ptr_list->head_ = temp;
} else {
    prev->next_ = temp;
}`,
          explanation: 'When implementing a standard list without a header node, failing to handle the case where the list is empty (or the element belongs at the head) leads to a NULL pointer dereference.',
          consequence: 'Segmentation fault due to dereferencing a NULL `prev` pointer.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t7-s2-ic1',
          title: 'Understanding List Complexity',
          content: 'Insertion into an ordered linked list takes O(N) time in the worst case, because you must perform a linear search to find the correct position. This differs from O(1) insertions at the head or tail in standard unsorted lists.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t7-s2-cp1',
          title: 'Ordered List Rules',
          description: 'Identify the properties of an ordered list.',
          criteria: [
            'Know that elements are always sorted.',
            'Understand why insertions are O(N).',
            'Recognize the 4 edge cases in standard list implementations.'
          ],
          topicId: 'u1-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t7-s2-rc1',
          front: 'What are the four edge cases handled in a standard ordered list insertion without a header node?',
          back: '1) Empty list, 2) Insertion at beginning, 3) Insertion in middle, 4) Insertion at end.',
          topicId: 'u1-t7',
          tags: ['list', 'edge-cases']
        }
      ]
    },
    {
      id: 'u1-t7-s3',
      title: 'List with Header Node: Eliminating Edge Cases',
      slug: 'header-node',
      description: 'A header node, also known as a dummy node, is a node placed at the very beginning of a linked list. It is created when the list is initialized and remains there throughout the list\'s lifetime. The data field of the header node is ignored; its sole purpose is to provide a valid next_ pointer.\n\nBy guaranteeing that the list is never truly empty (it always contains the header node), we eliminate the "empty list" and "insert at beginning" edge cases. When traversing the list for insertion or deletion, our prev pointer can always start at the header node, and it will never be NULL. Therefore, every insertion essentially becomes an "insert in the middle or end" operation, leading to a single, unified code path.\n\nFunctions like disp_list and free_list must be adjusted to skip the header node and begin operations from head_->next_.',
      keyPoints: [
        'A header node is a dummy node at the start of the list.',
        'It ensures head_ is never NULL, eliminating empty list edge cases.',
        'The prev pointer always starts at the header node.',
        'Insertion code collapses into a single, straightforward loop and link operation.',
        'Display and free functions must start at head_->next_ to skip the dummy node.'
      ],
      codeExamples: [
        {
          id: 'u1-t7-s3-ex1',
          title: 'Header Node Implementation (mylist.c)',
          code: `// linked list with a header node
#include <stdio.h>
#include "mylist.h"
#include <stdlib.h>

void init_list(mylist_t* ptr_list) {
    // Allocate a HEADER NODE — head_ always exists, never NULL
    ptr_list->head_ = (node_t*)malloc(sizeof(node_t));
    ptr_list->head_->next_ = NULL;
}

// NEW insert_list (header node eliminates ALL special cases — just 1 path):
void insert_list(mylist_t* ptr_list, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->next_ = NULL;

    // Always start prev at HEADER NODE (never NULL)
    node_t* prev = ptr_list->head_;
    node_t* pres = ptr_list->head_->next_;
    
    // Traverse to find insertion position (ordered: ascending)
    while(pres != NULL && pres->key_ < temp->key_) {
        prev = pres;
        pres = pres->next_;
    }
    
    // Always "middle or end" case — no special handling needed
    temp->next_ = pres;
    prev->next_ = temp;
}

void disp_list(mylist_t* ptr_list) {
    // Start from head_->next_ (skip the header node)
    node_t* q = ptr_list->head_->next_;
    while(q != NULL) { printf("%d ", q->key_); q = q->next_; }
    printf("\\n");
}

void free_list(mylist_t* ptr_list) {
    // Free data nodes only (head_->next_ onwards), preserve header
    node_t* q = ptr_list->head_->next_;
    while(q != NULL) { node_t* r = q->next_; free(q); q = r; }
    ptr_list->head_->next_ = NULL;
}`,
          language: 'c',
          explanation: 'This code provides the definitive implementation of a list using a header node. Notice how insert_list no longer contains any if statements for special cases. The loop robustly handles everything.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 8, code: 'ptr_list->head_ = (node_t*)malloc(sizeof(node_t));', explanation: 'Creates the dummy header node during initialization.' },
            { lineNumber: 18, code: 'node_t* prev = ptr_list->head_;', explanation: 'prev starts at the header node, ensuring it is never NULL.' }
          ],
          relatedTopicIds: []
        },
        {
          id: 'u1-t7-s3-ex2',
          title: 'Client Code and Execution',
          code: `#include <stdio.h>
#include "mylist.h"
int main() {
    mylist_t l;
    init_list(&l);
    int a[] = {20, 10, 50, 30, 40}; int n = 5;
    for(int i = 0; i < n; ++i) insert_list(&l, a[i]);
    disp_list(&l);   // Output: 10 20 30 40 50 (sorted!)
    free_list(&l);
}`,
          language: 'c',
          explanation: 'The client drives the list by inserting elements out of order. The insert_list logic ensures they settle into ascending order. The output is correctly sorted.',
          expectedOutput: '10 20 30 40 50 ',
          lineBreakdown: [
            { lineNumber: 5, code: 'init_list(&l);', explanation: 'Creates the list and allocates the header node.' },
            { lineNumber: 7, code: 'insert_list(&l, a[i]);', explanation: 'Inserts nodes into their correct sorted position.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t7-s3-cm1',
          title: 'Forgetting to skip header in traversal',
          wrongCode: `void disp_list(mylist_t* ptr_list) {
    node_t* q = ptr_list->head_;
    while(q != NULL) { 
        printf("%d ", q->key_); 
        q = q->next_; 
    }
}`,
          correctCode: `void disp_list(mylist_t* ptr_list) {
    node_t* q = ptr_list->head_->next_; // Skip header
    while(q != NULL) { 
        printf("%d ", q->key_); 
        q = q->next_; 
    }
}`,
          explanation: 'Because the header node does not contain valid initialized data, starting traversal directly at head_ will print uninitialized garbage values or 0.',
          consequence: 'Garbage data is displayed as the first element of the list.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t7-s3-ic1',
          title: 'Sentinel Nodes',
          content: 'A header node is a type of "sentinel node". Sentinel nodes are frequently employed to simplify code and reduce edge case checks, especially in doubly linked lists and trees (e.g., dummy leaf nodes in a Red-Black tree).',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t7-s3-cp1',
          title: 'Header Node Implementation',
          description: 'Ensure correct setup and usage of a header node.',
          criteria: [
            'Initialize head_ to an allocated dummy node, not NULL.',
            'Start prev at head_ and pres at head_->next_ in insertions.',
            'Start q at head_->next_ when displaying or freeing.'
          ],
          topicId: 'u1-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t7-s3-rc1',
          front: 'In a list with a header node, how many special edge cases (like empty list) do you need to handle in insert_list?',
          back: 'Zero. The header node ensures there is always a "previous" node, reducing insertion to a single unified path.',
          topicId: 'u1-t7',
          tags: ['header-node', 'algorithm']
        }
      ]
    },
    {
      id: 'u1-t7-s4',
      title: 'Comparison: With vs Without Header Node',
      slug: 'comparison-header',
      description: 'When comparing standard lists to those using a header node, the primary tradeoff is code complexity versus memory. A standard list requires less memory but relies on complex, nested conditional logic to handle insertions securely. A header node list introduces a minor memory overhead (one extra node per list) but simplifies the algorithmic flow, drastically reducing the chances of NULL pointer dereference bugs.\n\nIn most real-world scenarios, the small memory cost of one extra node is considered a worthwhile tradeoff for cleaner, more maintainable, and less bug-prone code. Ordered lists, in particular, are common in system programming for maintaining priority queues, event scheduling, or managing free blocks in memory allocation.',
      keyPoints: [
        'Without header: 4 insertion cases (empty, start, middle, end).',
        'With header: 1 insertion case (middle or end).',
        'Header node tradeoff: uses one extra node of memory.',
        'Header nodes result in more robust, readable, and maintainable code.',
        'Ordered lists are practically used in priority handling and scheduling tasks.'
      ],
      codeExamples: [
        {
          id: 'u1-t7-s4-ex1',
          title: 'Side-by-side Flow Comparison',
          code: `// --- WITHOUT HEADER NODE ---
// if (ptr_list->head_ == NULL) { ... }
// else if (key < ptr_list->head_->key_) { ... }
// else {
//     while (pres != NULL && pres->key_ < key) { ... }
//     temp->next_ = pres; prev->next_ = temp;
// }

// --- WITH HEADER NODE ---
// node_t* prev = ptr_list->head_;
// node_t* pres = ptr_list->head_->next_;
// while(pres != NULL && pres->key_ < temp->key_) { ... }
// temp->next_ = pres; prev->next_ = temp;`,
          language: 'c',
          explanation: 'This pseudo-code highlights the dramatic simplification. The multiple conditional blocks are completely flattened into a single loop sequence.',
          expectedOutput: '',
          lineBreakdown: [],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t7-s4-cm1',
          title: 'Freeing the header node prematurely',
          wrongCode: `void free_list(mylist_t* ptr_list) {
    node_t* q = ptr_list->head_; // starts at header
    while(q != NULL) { 
        node_t* r = q->next_; 
        free(q); 
        q = r; 
    }
}`,
          correctCode: `void free_list(mylist_t* ptr_list) {
    node_t* q = ptr_list->head_->next_; 
    while(q != NULL) { 
        node_t* r = q->next_; 
        free(q); 
        q = r; 
    }
    ptr_list->head_->next_ = NULL; // Preserve header!
}`,
          explanation: 'If the free_list function frees the header node, the list can no longer be used correctly by subsequent inserts unless init_list is called again. The header should generally persist until the list is entirely destroyed.',
          consequence: 'Subsequent calls to insert_list will dereference a freed header pointer, causing a crash.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t7-s4-ic1',
          title: 'Complexity Comparison',
          content: 'The time complexity remains O(N) for insertion in both methods, and O(1) for deletion if the node pointer is known (O(N) if searching is required). The improvement is strictly in code simplicity and cyclomatic complexity, not asymptotic time bounds.',
          relatedTopicIds: [],
          frequency: 'rare'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t7-s4-cp1',
          title: 'Tradeoff Awareness',
          description: 'Assess the pros and cons of using a header node.',
          criteria: [
            'Recognize the minor memory overhead.',
            'Acknowledge the significant reduction in conditional logic.',
            'Understand that asymptotic time complexity (O(N)) remains unchanged.'
          ],
          topicId: 'u1-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t7-s4-rc1',
          front: 'Does a header node improve the O(N) time complexity of inserting into an ordered list?',
          back: 'No, the time complexity remains O(N) because we still must traverse the list to find the correct sorted position. The benefit is purely structural simplicity.',
          topicId: 'u1-t7',
          tags: ['complexity', 'tradeoffs']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t7-q1',
      type: 'mcq',
      topicId: 'u1-t7',
      difficulty: 'beginner',
      question: 'Why can a struct contain a pointer to itself but not a direct instance of itself?',
      options: [
        'Pointers are faster to access',
        'A pointer has fixed size; a direct instance would be infinitely large',
        'Direct instances violate C naming rules',
        'Structs cannot contain variables'
      ],
      correctAnswer: 'A pointer has fixed size; a direct instance would be infinitely large',
      explanation: 'A pointer has a known, fixed size (like 4 or 8 bytes). An instance of itself inside itself would recurse infinitely, making it impossible for the compiler to determine the memory size.',
      tags: ['struct', 'memory']
    },
    {
      id: 'u1-t7-q2',
      type: 'mcq',
      topicId: 'u1-t7',
      difficulty: 'beginner',
      question: 'What does the header node store?',
      options: [
        'The highest value in the list',
        'The lowest value in the list',
        'It is a dummy node — its key is unused; only its next_ pointer matters',
        'The count of total elements in the list'
      ],
      correctAnswer: 'It is a dummy node — its key is unused; only its next_ pointer matters',
      explanation: 'The header node acts as a structural sentinel to guarantee the list is never completely empty, making its data field entirely irrelevant.',
      tags: ['header-node']
    },
    {
      id: 'u1-t7-q3',
      type: 'true-false',
      topicId: 'u1-t7',
      difficulty: 'beginner',
      question: 'init_list in the header-node version sets head_ to NULL.',
      correctAnswer: false,
      explanation: 'False — it allocates a dummy header node and sets the header node\'s next_ pointer to NULL, while head_ points to the header node.',
      tags: ['init']
    },
    {
      id: 'u1-t7-q4',
      type: 'fill-blank',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      question: 'In the new insert_list, prev always starts at ___.',
      correctAnswer: 'ptr_list->head_',
      explanation: 'Because we have a header node, we can always start prev at the header node (ptr_list->head_), ensuring it is never NULL.',
      tags: ['insert']
    },
    {
      id: 'u1-t7-q5',
      type: 'mcq',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      question: 'How many distinct edge cases does insert_list handle explicitly with a header node?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '1',
      explanation: 'With a header node, the insertion logic is unified into a single case (middle-or-end), eliminating the empty and beginning edge cases.',
      tags: ['algorithm']
    },
    {
      id: 'u1-t7-q6',
      type: 'mcq',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      question: 'How many distinct cases did the old insert_list handle explicitly without a header node?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '4',
      explanation: 'Without a header, you generally check for an empty list, inserting at the beginning, inserting in the middle, and inserting at the end.',
      tags: ['algorithm']
    },
    {
      id: 'u1-t7-q7',
      type: 'mcq',
      topicId: 'u1-t7',
      difficulty: 'beginner',
      question: 'disp_list starts printing from which node?',
      options: ['head_', 'head_->next_', 'NULL', 'tail_'],
      correctAnswer: 'head_->next_',
      explanation: 'Because the header node does not contain valid data, disp_list must skip it and begin printing from head_->next_.',
      tags: ['display']
    },
    {
      id: 'u1-t7-q8',
      type: 'predict-output',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      question: 'Insert {20, 10, 50, 30, 40} in order using the ordered list insert logic — what does disp_list print?',
      correctAnswer: '10 20 30 40 50',
      explanation: 'The insert_list function ensures that elements are maintained in ascending order, no matter the sequence they are inserted in.',
      tags: ['trace']
    },
    {
      id: 'u1-t7-q9',
      type: 'true-false',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      question: 'free_list in a standard implementation also frees the header node.',
      correctAnswer: false,
      explanation: 'False — it usually only frees data nodes (head_->next_ onwards) so the list can be reused without needing re-initialization.',
      tags: ['memory']
    },
    {
      id: 'u1-t7-q10',
      type: 'spot-bug',
      topicId: 'u1-t7',
      difficulty: 'advanced',
      question: 'If init_list sets head_ to NULL (forgetting the header node), what immediately breaks in the new insert_list?',
      code: `void insert_list(mylist_t* ptr_list, int key) {
    node_t* prev = ptr_list->head_;
    node_t* pres = ptr_list->head_->next_;
    // ... loop ...
}`,
      correctAnswer: 'Dereferencing prev->next_ crashes',
      explanation: 'Since prev starts at ptr_list->head_ (which is NULL), attempting to access ptr_list->head_->next_ for pres immediately triggers a Segmentation Fault.',
      tags: ['debug']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t7-p1',
      title: 'Trace Ordered Insertion with Header',
      topicId: 'u1-t7',
      difficulty: 'beginner',
      problemStatement: 'You are provided with an empty ordered list initialized with a header node. Insert the sequence {5, 1, 3, 2, 4} one by one into the list. Trace the state of the list (excluding the header node) after each insertion.',
      constraints: ['List must be sorted in ascending order.', 'Insertions occur sequentially.'],
      sampleInput: '5, 1, 3, 2, 4',
      sampleOutput: 'State 1: 5\\nState 2: 1 5\\nState 3: 1 3 5\\nState 4: 1 2 3 5\\nState 5: 1 2 3 4 5',
      hints: [
        'Notice how elements smaller than the existing ones gracefully slide behind the header node but before the first real node.'
      ],
      solution: `// Trace only, no code needed.
// After 5: [H] -> 5
// After 1: [H] -> 1 -> 5
// After 3: [H] -> 1 -> 3 -> 5
// After 2: [H] -> 1 -> 2 -> 3 -> 5
// After 4: [H] -> 1 -> 2 -> 3 -> 4 -> 5`,
      solutionExplanation: 'The header node acts as the stable predecessor for all insertions, allowing values like 1 to be inserted at the beginning seamlessly.',
      dryRun: [
        { step: 1, line: 0, variables: { key: '5', prev: 'header' }, output: '5 ', explanation: '5 is added as the first real node.' },
        { step: 2, line: 0, variables: { key: '1', prev: 'header' }, output: '1 5 ', explanation: '1 is smaller than 5, so it is inserted between the header and 5.' },
        { step: 3, line: 0, variables: { key: '3', prev: '1' }, output: '1 3 5 ', explanation: '3 is inserted between 1 and 5.' },
        { step: 4, line: 0, variables: { key: '2', prev: '1' }, output: '1 2 3 5 ', explanation: '2 is inserted between 1 and 3.' },
        { step: 5, line: 0, variables: { key: '4', prev: '3' }, output: '1 2 3 4 5 ', explanation: '4 is inserted between 3 and 5.' }
      ],
      tags: ['trace', 'insertion']
    },
    {
      id: 'u1-t7-p2',
      title: 'Descending Order Insertion',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      problemStatement: 'Modify the standard insert_list code to insert elements in DESCENDING order instead of ascending order. Ensure the header node properties are maintained.',
      constraints: ['Must use the header node.', 'Elements should be sorted highest to lowest.'],
      sampleInput: '20, 10, 50, 30',
      sampleOutput: '50 30 20 10',
      hints: [
        'Look at the while loop condition. Currently, it stops when pres->key_ > temp->key_. What should you change the < operator to?'
      ],
      solution: `void insert_list_desc(mylist_t* ptr_list, int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key; temp->next_ = NULL;

    node_t* prev = ptr_list->head_;
    node_t* pres = ptr_list->head_->next_;
    
    // Change < to > to sort in descending order
    while(pres != NULL && pres->key_ > temp->key_) {
        prev = pres;
        pres = pres->next_;
    }
    
    temp->next_ = pres;
    prev->next_ = temp;
}`,
      solutionExplanation: 'By simply changing the comparison operator from < to >, the traversal skips elements that are larger than the new key, eventually stopping at the first element that is smaller, thereby inserting the new key before it.',
      dryRun: [
        { step: 1, line: 10, variables: { pres: 'node(50)', temp: '30' }, output: '', explanation: 'Loops while current key (50) is greater than new key (30).' }
      ],
      tags: ['descending', 'algorithm']
    },
    {
      id: 'u1-t7-p3',
      title: 'Deletion with a Header Node',
      topicId: 'u1-t7',
      difficulty: 'intermediate',
      problemStatement: 'Implement delete_list(mylist_t* ptr_list, int key) that removes the first node containing the given key. Show how the header node simplifies this process as well.',
      constraints: ['Must handle deleting the first real element gracefully.', 'Free the deleted node memory.'],
      sampleInput: 'Delete 20 from list {20, 30, 40}',
      sampleOutput: '30 40',
      hints: [
        'Just like in insertion, start prev at the header node. When pres->key_ == key, link prev->next_ to pres->next_ and free pres.'
      ],
      solution: `void delete_list(mylist_t* ptr_list, int key) {
    node_t* prev = ptr_list->head_;
    node_t* pres = ptr_list->head_->next_;
    
    while(pres != NULL) {
        if (pres->key_ == key) {
            prev->next_ = pres->next_;
            free(pres);
            return;
        }
        prev = pres;
        pres = pres->next_;
    }
}`,
      solutionExplanation: 'The header node removes the need to check if the node being deleted is the head of the list. prev will point to the header if the first real element is being deleted, meaning prev->next_ = pres->next_ cleanly unlinks it without any special cases.',
      dryRun: [
        { step: 1, line: 2, variables: { prev: 'header', pres: '20' }, output: '', explanation: 'Start at header.' },
        { step: 2, line: 6, variables: { key: '20' }, output: '', explanation: 'Match found at first node.' },
        { step: 3, line: 7, variables: { prev: 'header' }, output: '', explanation: 'Header points directly to next node, unlinking 20.' }
      ],
      tags: ['deletion', 'memory']
    }
  ]
};
