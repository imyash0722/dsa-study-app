import type { Topic } from '../../../../types';

export const multilistsSparseSkip: Topic = {
  id: 'u1-t5',
  unitId: 'unit-1',
  title: 'Multilists, Sparse Matrices & Skip Lists',
  slug: 'multilists-sparse-skip',
  description: `As data becomes more complex, a single linear sequence is often insufficient to represent the relationships between elements. While traditional linked lists thread elements together in a single line, advanced structures allow elements to participate in multiple sequences or sequences with variable step sizes. This topic explores three such advanced linked structures: Multilists, Sparse Matrices using Linked Lists, and Skip Lists.

Multilists allow nodes to belong to multiple lists simultaneously by including multiple pointer fields. This is particularly useful when the same dataset needs to be sorted or traversed in multiple ways without duplicating the data. Sparse matrices, heavily used in scientific computing and machine learning, leverage a specialized form of linked lists to store only non-zero elements, saving vast amounts of memory compared to standard 2D arrays.

Skip lists introduce a probabilistic element to linked structures. By adding "express lanes" that skip over sections of the list, skip lists achieve logarithmic time complexity for search, insertion, and deletion operations, rivaling balanced binary search trees but with much simpler implementation logic. These structures are the backbone of high-performance modern systems, such as Redis and LevelDB.`,
  difficulty: 'advanced',
  prerequisites: ['u1-t1', 'u1-t2', 'u1-t3', 'u1-t4'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u1-t5-s1',
      title: 'Multi-Linked Lists',
      slug: 'multi-linked-lists',
      description: `A multi-linked list (or multilist) is a linked data structure where each node contains multiple pointer fields, allowing it to belong to more than one list simultaneously. In a standard singly linked list, a node has one data field and one next pointer, locking it into a single traversal sequence. In a multilist, a single node might have a \`name_next\` pointer, an \`id_next\` pointer, and a \`gpa_next\` pointer, allowing the exact same set of nodes to be traversed alphabetically, by student ID, or by grades.

This structure eliminates data duplication. Instead of creating separate lists with separate copies of the data, the data exists in memory exactly once. The complexity comes entirely from managing the multiple "threads" of pointers that weave through the same set of nodes. When a node is inserted or deleted, all the different pointer chains it belongs to must be updated correctly.

A common application of multilists is representing a 2D grid or matrix, where a node has a \`row_next\` and a \`col_next\` pointer. This allows efficient traversal across a specific row or down a specific column. This 2D multi-linked structure forms the theoretical foundation for advanced sparse matrix representations.`,
      keyPoints: [
        'A multilist node contains multiple pointer fields, enabling it to participate in several logical lists concurrently.',
        'Multilists avoid data duplication by threading multiple distinct sequences through a single shared set of nodes.',
        'Inserting or deleting a node in a multilist requires updating pointers for every list the node belongs to.',
        'A 2D multi-linked list assigns a row pointer and a column pointer to each node, facilitating grid-like traversal.',
        'Memory management can be complex, as a node can only be freed when it has been removed from all the lists it belongs to.'
      ],
      codeExamples: [
        {
          id: 'u1-t5-s1-ex1',
          title: 'Student Record Multilist',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    struct Student* next_id;
    struct Student* next_name;
};

void insertStudent(struct Student** id_head, struct Student** name_head, int id, const char* name) {
    struct Student* newNode = (struct Student*)malloc(sizeof(struct Student));
    newNode->id = id;
    strcpy(newNode->name, name);
    newNode->next_id = NULL;
    newNode->next_name = NULL;

    // Insert into ID list (sorted)
    if (*id_head == NULL || (*id_head)->id > id) {
        newNode->next_id = *id_head;
        *id_head = newNode;
    } else {
        struct Student* curr = *id_head;
        while (curr->next_id != NULL && curr->next_id->id < id) {
            curr = curr->next_id;
        }
        newNode->next_id = curr->next_id;
        curr->next_id = newNode;
    }

    // Insert into Name list (sorted alphabetically)
    if (*name_head == NULL || strcmp((*name_head)->name, name) > 0) {
        newNode->next_name = *name_head;
        *name_head = newNode;
    } else {
        struct Student* curr = *name_head;
        while (curr->next_name != NULL && strcmp(curr->next_name->name, name) < 0) {
            curr = curr->next_name;
        }
        newNode->next_name = curr->next_name;
        curr->next_name = newNode;
    }
}

void printById(struct Student* head) {
    printf("By ID: ");
    while (head != NULL) {
        printf("[%d: %s] -> ", head->id, head->name);
        head = head->next_id;
    }
    printf("NULL\\n");
}

void printByName(struct Student* head) {
    printf("By Name: ");
    while (head != NULL) {
        printf("[%s: %d] -> ", head->name, head->id);
        head = head->next_name;
    }
    printf("NULL\\n");
}

void freeAll(struct Student* head) {
    while (head != NULL) {
        struct Student* temp = head;
        head = head->next_id;
        free(temp);
    }
}

int main() {
    struct Student* id_list = NULL;
    struct Student* name_list = NULL;

    insertStudent(&id_list, &name_list, 105, "Charlie");
    insertStudent(&id_list, &name_list, 102, "Alice");
    insertStudent(&id_list, &name_list, 108, "Bob");

    printById(id_list);
    printByName(name_list);
    
    freeAll(id_list);
    return 0;
}`,
          explanation: 'This code demonstrates a multilist where a single set of Student nodes is simultaneously threaded into two sorted lists: one by ID and one by Name.',
          expectedOutput: `By ID: [102: Alice] -> [105: Charlie] -> [108: Bob] -> NULL\nBy Name: [Alice: 102] -> [Bob: 108] -> [Charlie: 105] -> NULL`,
          lineBreakdown: [
            { lineNumber: 8, code: 'struct Student* next_id;', explanation: 'Pointer for the sequence sorted by student ID.' },
            { lineNumber: 9, code: 'struct Student* next_name;', explanation: 'Pointer for the sequence sorted by student name.' }
          ],
          relatedTopicIds: ['u1-t1']
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t5-s1-cm1',
          title: 'Double Freeing Nodes',
          wrongCode: `void freeLists(struct Student* id_list, struct Student* name_list) {
    struct Student* temp;
    while(id_list) { temp = id_list; id_list = id_list->next_id; free(temp); }
    while(name_list) { temp = name_list; name_list = name_list->next_name; free(temp); }
}`,
          correctCode: `void freeLists(struct Student* id_list) {
    struct Student* temp;
    while(id_list) { temp = id_list; id_list = id_list->next_id; free(temp); }
}`,
          explanation: 'Since both logical lists point to the exact same physical nodes in memory, freeing the nodes via the first list makes the nodes in the second list invalid. Attempting to free them again via the second list results in a double-free corruption error.',
          consequence: 'Runtime crash due to memory corruption (double free).'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t5-s1-ic1',
          title: 'Trade-off: Multilists vs. Multiple Arrays',
          content: 'Interviewers may ask why not just use two arrays of pointers pointing to the objects. Multilists avoid the overhead of dynamically resizing arrays and provide O(1) insertions/deletions if the insertion point is known. However, multiple arrays of pointers provide O(1) random access and better cache locality.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t5-s1-cp1',
          title: 'Pointer Updates',
          description: 'Ensure understanding of insertion mechanics.',
          criteria: ['If a node belongs to K lists, K pointers must be managed.', 'Understand that physically the node exists only once in heap memory.'],
          topicId: 'u1-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t5-s1-rc1',
          front: 'What is a Multi-Linked List?',
          back: 'A linked structure where each node has multiple pointer fields, allowing it to participate in more than one distinct list sequence simultaneously.',
          topicId: 'u1-t5',
          tags: ['multilist', 'definition']
        }
      ]
    },
    {
      id: 'u1-t5-s2',
      title: 'Sparse Matrix Representation',
      slug: 'sparse-matrix',
      description: `A sparse matrix is a matrix in which most of the elements are zero. When storing such a matrix in a traditional 2D array, a massive amount of memory is wasted storing zeros, and processing power is wasted iterating over them. A common threshold is that a matrix is considered sparse if more than 2/3 of its elements are zero.

To optimize space, we can represent sparse matrices using a linked list. Instead of storing a massive grid, we only create nodes for the non-zero elements. Each node typically stores the \`row\` index, the \`column\` index, the actual non-zero \`value\`, and a \`next\` pointer linking to the next non-zero element (usually ordered row-by-row, then column-by-column).

While memory is saved, accessing a random element (e.g., \`matrix[i][j]\`) goes from O(1) in a 2D array to O(k) where k is the number of non-zero elements. However, operations like matrix addition and multiplication can actually be faster because you completely skip processing the zeros. The linked list representation is highly preferred when the matrix dimensions are huge (e.g., 100,000 x 100,000) but non-zero counts are low.`,
      keyPoints: [
        'A sparse matrix primarily contains zero elements, making a standard 2D array highly memory-inefficient.',
        'Linked list representation only creates nodes for non-zero elements.',
        'Each node must explicitly store its row and column coordinates alongside its value.',
        'Nodes are generally maintained in sorted order (by row, then column) to simplify mathematical operations.',
        'Trade-off: Saves massive amounts of memory but sacrifices O(1) random element access.'
      ],
      codeExamples: [
        {
          id: 'u1-t5-s2-ex1',
          title: 'Create and Display Sparse Matrix',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>

struct SparseNode {
    int row;
    int col;
    int value;
    struct SparseNode* next;
};

void insert(struct SparseNode** head, int r, int c, int val) {
    if (val == 0) return;
    struct SparseNode* newNode = (struct SparseNode*)malloc(sizeof(struct SparseNode));
    newNode->row = r;
    newNode->col = c;
    newNode->value = val;
    newNode->next = NULL;

    if (*head == NULL) {
        *head = newNode;
    } else {
        struct SparseNode* temp = *head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = newNode;
    }
}

void printList(struct SparseNode* head) {
    printf("Row\\tCol\\tValue\\n");
    while (head != NULL) {
        printf("%d\\t%d\\t%d\\n", head->row, head->col, head->value);
        head = head->next;
    }
}

int main() {
    int sparseMatrix[4][5] = {
        {0, 0, 3, 0, 4},
        {0, 0, 5, 7, 0},
        {0, 0, 0, 0, 0},
        {0, 2, 6, 0, 0}
    };
    
    struct SparseNode* head = NULL;
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 5; j++) {
            insert(&head, i, j, sparseMatrix[i][j]);
        }
    }
    
    printList(head);
    
    struct SparseNode* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`,
          explanation: 'This code converts a standard 2D array representation of a sparse matrix into a single linked list format, omitting all zeroes.',
          expectedOutput: `Row\tCol\tValue\n0\t2\t3\n0\t4\t4\n1\t2\t5\n1\t3\t7\n3\t1\t2\n3\t2\t6\n`,
          lineBreakdown: [
            { lineNumber: 5, code: 'int row; int col;', explanation: 'Coordinates must be saved because position is no longer implied by array indices.' }
          ],
          relatedTopicIds: ['u1-t1']
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t5-s2-cm1',
          title: 'Not sorting elements',
          wrongCode: `// Inserting elements in random order
insert(&head, 3, 2, 6);
insert(&head, 0, 2, 3);`,
          correctCode: `// Inserting row by row
insert(&head, 0, 2, 3);
insert(&head, 3, 2, 6);`,
          explanation: 'While an unsorted sparse matrix list is still valid for storing data, mathematical operations (like adding two sparse matrices) require O(n*m) time if unsorted, but can be done in O(n+m) time using two pointers if both lists are ordered by row/column.',
          consequence: 'Extremely slow performance for matrix operations.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t5-s2-ic1',
          title: 'Adding Two Sparse Matrices',
          content: 'A classic interview question is to add two sparse matrices. The algorithm is similar to merging two sorted linked lists. You use two pointers. If nodeA->row < nodeB->row, add nodeA to result. If rows are equal, check columns. If both row and col match, add their values. If the sum is zero, do not add it to the result list.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t5-s2-cp1',
          title: 'Memory Calculation',
          description: 'Understand when sparse matrices actually save memory.',
          criteria: ['Know that a sparse node takes more memory (row, col, value, next) than a simple integer.', 'Calculate the threshold at which the linked list becomes more space-efficient.'],
          topicId: 'u1-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t5-s2-rc1',
          front: 'What four fields are typically stored in a Linked List Sparse Matrix Node?',
          back: 'Row index, Column index, Value, and a Pointer to the next node.',
          topicId: 'u1-t5',
          tags: ['sparse', 'node']
        }
      ]
    },
    {
      id: 'u1-t5-s3',
      title: 'Skip List Concept & Structure',
      slug: 'skip-list-concept',
      description: `A standard sorted linked list has a search time complexity of O(n) because you must traverse nodes sequentially. Binary Search Trees solve this by allowing you to skip half the remaining elements at each step, yielding O(log n) time. However, keeping BSTs balanced (like AVL or Red-Black trees) requires complex rotation logic. Skip Lists achieve the same O(log n) average search time using a much simpler probabilistic approach.

A Skip List is essentially a series of linked lists layered on top of each other. The bottom layer (Level 0) is a standard sorted singly linked list containing all elements. The next layer up (Level 1) acts as an "express lane", skipping over some elements. Higher layers skip over even more elements. When searching, you start at the highest level, moving forward quickly with large leaps, and drop down to lower levels only when you overshoot your target.

The structure is built using nodes that contain an array of forward pointers. The size of this array varies per node and determines how many levels high that node reaches. The height of a new node is determined randomly (often by a coin flip) upon insertion, meaning the skip list does not need to execute rebalancing routines.`,
      keyPoints: [
        'Skip lists consist of multiple levels of sorted linked lists.',
        'Level 0 contains every single element.',
        'Higher levels act as express lanes, jumping over intermediate nodes.',
        'Search time is O(log n) on average, making it a viable alternative to balanced binary search trees.',
        'Skip list nodes contain an array of forward pointers, not just a single next pointer.'
      ],
      codeExamples: [
        {
          id: 'u1-t5-s3-ex1',
          title: 'Skip List Node Structure',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define MAX_LEVEL 3

struct SkipNode {
    int key;
    struct SkipNode* forward[MAX_LEVEL + 1];
};

struct SkipList {
    int level;
    struct SkipNode* header;
};

struct SkipNode* createNode(int key, int level) {
    struct SkipNode* n = (struct SkipNode*)malloc(sizeof(struct SkipNode));
    n->key = key;
    for (int i = 0; i <= level; i++) {
        n->forward[i] = NULL;
    }
    return n;
}

struct SkipList* createList() {
    struct SkipList* lst = (struct SkipList*)malloc(sizeof(struct SkipList));
    lst->level = 0;
    lst->header = createNode(INT_MIN, MAX_LEVEL);
    return lst;
}

int main() {
    struct SkipList* sl = createList();
    printf("Skip list initialized. Header max level: %d\\n", MAX_LEVEL);
    
    // Cleanup
    free(sl->header);
    free(sl);
    return 0;
}`,
          explanation: 'Demonstrates the structure of a Skip List node. Notice that `forward` is an array of pointers, allowing the node to connect to multiple different nodes at different heights.',
          expectedOutput: `Skip list initialized. Header max level: 3`,
          lineBreakdown: [
            { lineNumber: 9, code: 'struct SkipNode* forward[MAX_LEVEL + 1];', explanation: 'Array of pointers for different levels.' },
            { lineNumber: 29, code: 'lst->header = createNode(INT_MIN, MAX_LEVEL);', explanation: 'Header node spans all levels and usually holds minus infinity.' }
          ],
          relatedTopicIds: ['u1-t1']
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t5-s3-cm1',
          title: 'Fixed Array vs Variable Allocation',
          wrongCode: `// Always allocating max levels for every node wastes memory
struct SkipNode* n = malloc(sizeof(struct SkipNode));
// n->forward is always MAX_LEVEL size`,
          correctCode: `// Advanced implementation: flexible array member
struct SkipNode {
    int key;
    struct SkipNode* forward[];
};
struct SkipNode* n = malloc(sizeof(struct SkipNode) + (level+1)*sizeof(struct SkipNode*));`,
          explanation: 'In textbook examples, nodes are given a fixed MAX_LEVEL array for simplicity. In production code (like Redis), a flexible array member is used, allocating only exactly as many pointers as the randomized level requires, saving immense memory.',
          consequence: 'Massive memory bloat if maximum pointers are allocated for Level 0 nodes.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t5-s3-ic1',
          title: 'Skip Lists in the Real World',
          content: 'If asked for a real-world application, mention Redis. Redis uses Skip Lists to implement its Sorted Sets (ZSETs). The simplicity of implementation, combined with extremely fast concurrent access patterns (fewer locks needed compared to tree rebalancing), makes them ideal for in-memory datastores.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t5-s3-cp1',
          title: 'Level 0 Content',
          description: 'Verify understanding of the base layer.',
          criteria: ['Level 0 contains every single node in the structure.', 'Level 0 is equivalent to a standard singly linked list.'],
          topicId: 'u1-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t5-s3-rc1',
          front: 'What is the purpose of higher levels in a Skip List?',
          back: 'They act as express lanes, allowing searches to skip over large portions of the list, reducing time complexity to O(log n).',
          topicId: 'u1-t5',
          tags: ['skiplist', 'concept']
        }
      ]
    },
    {
      id: 'u1-t5-s4',
      title: 'Skip List Operations & Analysis',
      slug: 'skip-list-operations',
      description: `Searching in a skip list begins at the highest level of the header node. The search pointer moves forward along the current level as long as the next node's key is less than the target key. When a node is encountered with a key greater than or equal to the target, the search pointer "drops down" one level and continues. This process of sliding right and dropping down creates a staircase pattern terminating exactly at the target (or the spot it should be).

Insertion relies on randomization to maintain balance. To insert, you first locate the insertion point using the search algorithm. Then, you generate a random level for the new node. Typically, you flip a coin: heads means go up a level, tails means stop. This ensures that approximately 50% of nodes are level 0, 25% are level 1, 12.5% are level 2, and so on. Finally, you splice the new node's pointers into the structure at all applicable levels using an update array.

Because the levels are determined by probability, a skip list is not guaranteed to be perfectly balanced. However, the probability of it becoming heavily unbalanced is vanishingly small. The expected time complexity for Search, Insert, and Delete is all O(log n), with a worst-case of O(n) if the randomizer fails completely (e.g., all nodes roll level 0).`,
      keyPoints: [
        'Search algorithm starts at the top-left (highest level) and moves right and down.',
        'Random level generation uses a probability p (usually 0.5) to determine a node’s height.',
        'The "update" array is crucial during insertion; it temporarily stores pointers to nodes where a drop-down occurred, which need to be updated to point to the new node.',
        'Expected time complexity for search/insert/delete is O(log n).',
        'Worst-case time complexity is O(n), but probabilistically extremely rare.'
      ],
      codeExamples: [
        {
          id: 'u1-t5-s4-ex1',
          title: 'Skip List Search and Insert',
          language: 'c',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define MAX_LEVEL 3

struct SkipNode {
    int key;
    struct SkipNode* forward[MAX_LEVEL + 1];
};

struct SkipList {
    int level;
    struct SkipNode* header;
};

struct SkipNode* createNode(int key, int level) {
    struct SkipNode* n = (struct SkipNode*)malloc(sizeof(struct SkipNode));
    n->key = key;
    for (int i = 0; i <= level; i++) {
        n->forward[i] = NULL;
    }
    return n;
}

int randomLevel() {
    int lvl = 0;
    while (rand() % 2 == 0 && lvl < MAX_LEVEL) {
        lvl++;
    }
    return lvl;
}

void insert(struct SkipList* lst, int key) {
    struct SkipNode* update[MAX_LEVEL + 1];
    struct SkipNode* curr = lst->header;

    for (int i = lst->level; i >= 0; i--) {
        while (curr->forward[i] != NULL && curr->forward[i]->key < key) {
            curr = curr->forward[i];
        }
        update[i] = curr;
    }
    curr = curr->forward[0];

    if (curr == NULL || curr->key != key) {
        int rlevel = randomLevel();
        if (rlevel > lst->level) {
            for (int i = lst->level + 1; i <= rlevel; i++) {
                update[i] = lst->header;
            }
            lst->level = rlevel;
        }

        struct SkipNode* newNode = createNode(key, rlevel);
        for (int i = 0; i <= rlevel; i++) {
            newNode->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = newNode;
        }
        printf("Inserted %d at level %d\\n", key, rlevel);
    }
}

void search(struct SkipList* lst, int key) {
    struct SkipNode* curr = lst->header;
    for (int i = lst->level; i >= 0; i--) {
        while (curr->forward[i] != NULL && curr->forward[i]->key < key) {
            curr = curr->forward[i];
        }
    }
    curr = curr->forward[0];
    if (curr != NULL && curr->key == key) {
        printf("Found %d\\n", key);
    } else {
        printf("Not found %d\\n", key);
    }
}

int main() {
    srand(42); // Seed for deterministic output
    struct SkipList* lst = (struct SkipList*)malloc(sizeof(struct SkipList));
    lst->level = 0;
    lst->header = createNode(INT_MIN, MAX_LEVEL);

    insert(lst, 10);
    insert(lst, 20);
    insert(lst, 5);
    
    search(lst, 20);
    search(lst, 15);
    
    return 0;
}`,
          explanation: 'Implements full search and insert mechanics. The update array tracks the rightmost nodes at each level before dropping down, which is essential for wiring in the new node pointers.',
          expectedOutput: `Inserted 10 at level 0\nInserted 20 at level 1\nInserted 5 at level 0\nFound 20\nNot found 15\n`,
          lineBreakdown: [
            { lineNumber: 39, code: 'struct SkipNode* update[MAX_LEVEL + 1];', explanation: 'Holds pointers to the nodes that need their forward pointers updated to include the newly inserted node.' },
            { lineNumber: 29, code: 'while (rand() % 2 == 0 && lvl < MAX_LEVEL)', explanation: 'Coin flip mechanism to determine node height.' }
          ],
          relatedTopicIds: ['u1-t1']
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t5-s4-cm1',
          title: 'Forgetting to track update pointers',
          wrongCode: `// Attempting insertion by only updating level 0
newNode->forward[0] = curr->forward[0];
curr->forward[0] = newNode;`,
          correctCode: `// Loop through all levels the new node occupies
for (int i = 0; i <= rlevel; i++) {
    newNode->forward[i] = update[i]->forward[i];
    update[i]->forward[i] = newNode;
}`,
          explanation: 'If a node is randomly assigned level 2, you must insert it into the linked list at level 0, level 1, and level 2. Failing to update higher levels breaks the express lanes.',
          consequence: 'Higher level express lanes will be broken or point to incorrect memory.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t5-s4-ic1',
          title: 'Complexity Comparison: Skip List vs BST',
          content: 'Be ready to compare them. Both have O(log n) average search and insert. However, BSTs use strict deterministic rebalancing (rotations) which can be complicated to implement and slow under high concurrency. Skip Lists use simple randomization, making concurrent locking much easier and the code much shorter.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t5-s4-cp1',
          title: 'Random Promotion',
          description: 'Ensure comprehension of the coin-flip mechanic.',
          criteria: ['If p=0.5, 50% of nodes are level 0.', 'The expected height of the skip list is O(log n).'],
          topicId: 'u1-t5'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t5-s4-rc1',
          front: 'What is the "update array" used for during Skip List insertion?',
          back: 'It tracks the rightmost nodes visited at each level before dropping down, storing the locations where pointers need to be modified to link in the new node.',
          topicId: 'u1-t5',
          tags: ['skiplist', 'insertion']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t5-q99',
      type: 'true-false',
      topicId: 'u1-t5',
      difficulty: 'beginner',
      question: 'In a Skip List, the bottom-most level contains all the elements in the list.',
      correctAnswer: true,
      explanation: 'The bottom level of a Skip List is a standard sorted linked list containing every single element.',
      tags: ['skiplist', 'structure']
    },
    {
      id: 'u1-t5-q100',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'How is the height of a new node determined in a Skip List during insertion?',
      options: ['Based on the size of the list', 'Probabilistically (e.g., via coin flips)', 'It is always fixed to MAX_LEVEL', 'It depends on the value of the node'],
      correctAnswer: 'Probabilistically (e.g., via coin flips)',
      explanation: 'Skip lists use randomization to maintain balance. The level of a new node is determined probabilistically.',
      tags: ['skiplist', 'insertion']
    },
    {
      id: 'u1-t5-q1',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'beginner',
      question: 'Which of the following is true about a node in a Multi-Linked List?',
      options: [
        'It cannot be freed until the entire program terminates.',
        'It belongs to only one logical sequence at a time.',
        'It contains multiple pointer fields, participating in multiple sequences simultaneously.',
        'It must have exactly two pointers, row and column.'
      ],
      correctAnswer: 'It contains multiple pointer fields, participating in multiple sequences simultaneously.',
      explanation: 'A multilist node is characterized by having multiple pointers, each dedicated to a different logical thread or sequence through the data.',
      tags: ['multilist']
    },
    {
      id: 'u1-t5-q2',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'Why are sparse matrices often represented using linked lists instead of 2D arrays?',
      options: [
        'Linked lists provide faster O(1) access to arbitrary elements.',
        'A linked list representation avoids wasting memory on zero-value elements.',
        '2D arrays cannot store integers greater than 0.',
        'Linked lists guarantee that the matrix is square.'
      ],
      correctAnswer: 'A linked list representation avoids wasting memory on zero-value elements.',
      explanation: 'By only storing nodes for non-zero elements, huge amounts of memory are saved, which is the primary motivation for the sparse matrix linked list representation.',
      tags: ['sparse']
    },
    {
      id: 'u1-t5-q3',
      type: 'true-false',
      topicId: 'u1-t5',
      difficulty: 'beginner',
      question: 'In a sparse matrix linked list node, storing the row and column indices is optional.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Because we are omitting zero elements, we lose the implicit positional data of a 2D array. The row and column indices must be explicitly stored in each node.',
      tags: ['sparse']
    },
    {
      id: 'u1-t5-q4',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'advanced',
      question: 'What is the average time complexity for searching an element in a Skip List?',
      options: [
        'O(1)',
        'O(n)',
        'O(log n)',
        'O(n log n)'
      ],
      correctAnswer: 'O(log n)',
      explanation: 'Due to the multi-layered express lanes, skip lists allow you to skip over sections of data, halving the search space progressively, resulting in O(log n) time.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q5',
      type: 'fill-blank',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'In a Skip List, Level _______ contains every single inserted element, acting as a standard sorted singly linked list.',
      options: [],
      correctAnswer: '0',
      explanation: 'Level 0 is the foundational layer of a skip list, containing all elements without any skips.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q6',
      type: 'true-false',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'Skip lists require complex tree rotation logic to maintain their O(log n) performance.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Skip lists avoid complex rotations entirely by using randomized probability (coin flips) to determine node heights, statistically maintaining balance.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q7',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'advanced',
      question: 'During skip list insertion, what is the purpose of the "update" array?',
      options: [
        'To store the data values being updated.',
        'To track the rightmost nodes visited at each level before dropping down.',
        'To update the maximum level of the skip list.',
        'To store backup copies of nodes in case deletion fails.'
      ],
      correctAnswer: 'To track the rightmost nodes visited at each level before dropping down.',
      explanation: 'The update array captures the pointers that need to be severed and reattached to wire the newly inserted node into the existing multi-level linked structure.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q8',
      type: 'spot-bug',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'Identify the issue in this multilist node freeing function.',
      code: `void freeMultilist(Node* headA, Node* headB) {
  Node* tmp;
  while(headA) { tmp=headA; headA=headA->nextA; free(tmp); }
  while(headB) { tmp=headB; headB=headB->nextB; free(tmp); }
}`,
      options: [
        'headA->nextA is a syntax error.',
        'It causes a memory leak.',
        'It causes a double free error.',
        'The while loops are infinite.'
      ],
      correctAnswer: 'It causes a double free error.',
      explanation: 'Both headA and headB point to the same physical nodes in memory. Freeing them via the first list makes the second list contain dangling pointers, and attempting to free them again causes a double free.',
      tags: ['multilist']
    },
    {
      id: 'u1-t5-q9',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'What dictates the height (number of levels) of a newly inserted node in a Skip List?',
      options: [
        'The value of its key relative to the median.',
        'The number of elements currently in the list.',
        'A deterministic balancing algorithm.',
        'A probabilistic randomizer (e.g., repeated coin flips).'
      ],
      correctAnswer: 'A probabilistic randomizer (e.g., repeated coin flips).',
      explanation: 'Skip list node height is determined randomly at the moment of insertion, completely independently of the node\'s data or the current state of the list.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q10',
      type: 'true-false',
      topicId: 'u1-t5',
      difficulty: 'advanced',
      question: 'The worst-case search time complexity for a Skip List is O(log n).',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'The expected (average) time is O(log n). The worst-case is O(n), which occurs if the randomizer completely fails and assigns level 0 to every single node, reducing it to a normal linked list.',
      tags: ['skiplist']
    },
    {
      id: 'u1-t5-q11',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'What is true in a skiplist?',
      options: ['There are multiple levels, each with the same number of nodes', 'The number of pointers in each node depends on the number of levels it participates in', 'Traversal for any operation starts at the higher level which has all nodes', 'Any insertion affects at most one level'],
      correctAnswer: 'The number of pointers in each node depends on the number of levels it participates in',
      explanation: 'In a skiplist, each node has a variable number of forward pointers based on the levels it participates in. Level 0 (bottom) has ALL nodes. Higher levels have progressively fewer nodes. Insertions probabilistically affect multiple levels. Traversal starts at the highest level and works downward.',
      tags: ['Skiplist', 'Structure']
    },
    {
      id: 'u1-t5-q12',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'What is true in a multilist?',
      options: ['Same as a multidimensional array', 'Every node has only a single pointer', 'Every node may participate in multiple lists simultaneously', 'Adding a node requires updating only one list'],
      correctAnswer: 'Every node may participate in multiple lists simultaneously',
      explanation: 'In a multilist, a single node can be a member of several different linked lists at the same time (by having multiple next/link pointers, one per list). Example: a student node participates in both the course-1 list and course-2 list. Adding a node may update multiple lists.',
      tags: ['Multilist', 'Structure']
    },
    {
      id: 'u1-t5-q13',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'A sparse matrix representation is an example of:',
      options: ['Using more space to gain in time', 'Using less space at the cost of time', 'A 2D array that can be directly indexed', 'A matrix where most elements are non-zero'],
      correctAnswer: 'Using less space at the cost of time',
      explanation: 'A dense 2D array stores all elements including zeros (wasting space for large sparse matrices). A sparse representation (e.g., linked list of non-zero elements) uses much less space but requires more time to access a specific element (no direct O(1) indexing). Trade-off: space for time.',
      tags: ['Sparse-Matrix', 'Trade-off']
    },
    {
      id: 'u1-t5-q14',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'In a skiplist, the BOTTOM-MOST level contains:',
      options: ['Only the largest element', 'Only the smallest element', 'All the elements in sorted order', 'Randomly selected elements'],
      correctAnswer: 'All the elements in sorted order',
      explanation: 'Level 0 (the bottom-most level) of a skiplist is essentially a complete sorted linked list containing ALL elements. Higher levels contain progressively fewer elements, acting as express lanes. This is the fundamental structure: bottom = all elements, top = fewest elements.',
      tags: ['Skiplist', 'Level-Structure']
    },
    {
      id: 'u1-t5-q15',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'A multilist is particularly useful when:',
      options: ['You need O(1) random access to any element', 'A single node needs to belong to multiple different lists representing different relationships', 'You need to sort elements in multiple orders simultaneously using arrays', 'You need a stack and a queue at the same time'],
      correctAnswer: 'A single node needs to belong to multiple different lists representing different relationships',
      explanation: 'Multilists shine when data has multiple relationships. Example: a student is enrolled in multiple courses. One node represents the student, and it participates in a linked list for each course. This avoids data duplication while allowing multiple traversal paths.',
      tags: ['Multilist', 'Use-Case']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t5-p1',
      title: 'Convert Matrix to Sparse Linked List',
      topicId: 'u1-t5',
      difficulty: 'beginner',
      problemStatement: 'Given a 2D array matrix of size M x N, convert it into a sparse matrix linked list representation. Only store the non-zero elements. Print the resulting linked list in the format: "row col value".',
      constraints: [
        'M, N <= 100',
        'Matrix elements are integers.'
      ],
      sampleInput: `3 3
0 0 5
0 8 0
0 0 0`,
      sampleOutput: `0 2 5
1 1 8`,
      hints: [
        'Iterate through the 2D array row by row, then column by column.',
        'If the value is not zero, dynamically allocate a node and append it to your list.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int row;
    int col;
    int val;
    struct Node* next;
};

void insert(struct Node** head, struct Node** tail, int r, int c, int v) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->row = r;
    temp->col = c;
    temp->val = v;
    temp->next = NULL;

    if (*head == NULL) {
        *head = temp;
        *tail = temp;
    } else {
        (*tail)->next = temp;
        *tail = temp;
    }
}

int main() {
    int M, N;
    if (scanf("%d %d", &M, &N) != 2) return 0;

    struct Node* head = NULL;
    struct Node* tail = NULL;

    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            int val;
            scanf("%d", &val);
            if (val != 0) {
                insert(&head, &tail, i, j, val);
            }
        }
    }

    struct Node* curr = head;
    while (curr != NULL) {
        printf("%d %d %d\\n", curr->row, curr->col, curr->val);
        struct Node* temp = curr;
        curr = curr->next;
        free(temp);
    }

    return 0;
}`,
      solutionExplanation: 'We traverse the matrix linearly. To ensure O(1) insertions at the end of the list, we maintain a `tail` pointer alongside the `head` pointer.',
      dryRun: [
        {
          step: 1,
          line: 38,
          variables: { i: '0', j: '2', val: '5' },
          output: '',
          explanation: 'Non-zero found at 0,2. Node created.'
        },
        {
          step: 2,
          line: 38,
          variables: { i: '1', j: '1', val: '8' },
          output: '',
          explanation: 'Non-zero found at 1,1. Node appended to tail.'
        }
      ],
      tags: ['sparse', 'linked-list']
    },
    {
      id: 'u1-t5-p2',
      title: 'Add Two Sparse Matrices',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      problemStatement: 'You are given two sparse matrices, A and B, represented as linked lists. Both lists are sorted by row, then by column. Write a program to add these two matrices and produce a third sparse matrix linked list C. Print the result.',
      constraints: [
        'Input matrices are valid and have the same dimensions.',
        'Resulting values of 0 should NOT be added to the result list.'
      ],
      sampleInput: `A: (0,0)=3, (1,2)=5
B: (0,0)=2, (1,1)=4, (1,2)=-5`,
      sampleOutput: `0 0 5
1 1 4`,
      hints: [
        'Use two pointers, one for each list, similar to merging two sorted arrays.',
        'If row and col match, add values. If sum is 0, skip it.',
        'If list A element is "smaller" (comes first in reading order), append A and advance A.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int row, col, val;
    struct Node* next;
};

struct Node* createNode(int r, int c, int v) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->row = r; n->col = c; n->val = v; n->next = NULL;
    return n;
}

void append(struct Node** head, struct Node** tail, int r, int c, int v) {
    if (v == 0) return;
    struct Node* n = createNode(r, c, v);
    if (*head == NULL) { *head = n; *tail = n; }
    else { (*tail)->next = n; *tail = n; }
}

struct Node* addSparse(struct Node* A, struct Node* B) {
    struct Node* resHead = NULL;
    struct Node* resTail = NULL;
    
    while (A != NULL && B != NULL) {
        if (A->row < B->row || (A->row == B->row && A->col < B->col)) {
            append(&resHead, &resTail, A->row, A->col, A->val);
            A = A->next;
        }
        else if (B->row < A->row || (B->row == A->row && B->col < A->col)) {
            append(&resHead, &resTail, B->row, B->col, B->val);
            B = B->next;
        }
        else {
            append(&resHead, &resTail, A->row, A->col, A->val + B->val);
            A = A->next;
            B = B->next;
        }
    }
    
    while (A != NULL) {
        append(&resHead, &resTail, A->row, A->col, A->val);
        A = A->next;
    }
    while (B != NULL) {
        append(&resHead, &resTail, B->row, B->col, B->val);
        B = B->next;
    }
    
    return resHead;
}

int main() {
    // Example setup hardcoded for brevity
    struct Node* A = createNode(0, 0, 3);
    A->next = createNode(1, 2, 5);
    
    struct Node* B = createNode(0, 0, 2);
    B->next = createNode(1, 1, 4);
    B->next->next = createNode(1, 2, -5);
    
    struct Node* C = addSparse(A, B);
    
    struct Node* temp = C;
    while (temp != NULL) {
        printf("%d %d %d\\n", temp->row, temp->col, temp->val);
        temp = temp->next;
    }
    // Cleanup omitted for brevity
    return 0;
}`,
      solutionExplanation: 'The algorithm compares coordinates. If A is before B, we append A. If B is before A, we append B. If they overlap, we add the values and append if the result isn\'t zero.',
      dryRun: [
        {
          step: 1,
          line: 35,
          variables: { 'A->val': '3', 'B->val': '2' },
          output: '',
          explanation: 'Coordinates match (0,0). Sum is 5. Appended to C.'
        },
        {
          step: 2,
          line: 31,
          variables: { 'A->col': '2', 'B->col': '1' },
          output: '',
          explanation: 'B comes first (1,1). B is appended to C.'
        },
        {
          step: 3,
          line: 35,
          variables: { 'A->val': '5', 'B->val': '-5' },
          output: '',
          explanation: 'Coordinates match (1,2). Sum is 0. Append function ignores 0.'
        }
      ],
      tags: ['sparse', 'math']
    },
    {
      id: 'u1-t5-p3',
      title: 'Skip List Insertion Simulator',
      topicId: 'u1-t5',
      difficulty: 'advanced',
      problemStatement: 'Implement the insertion logic for a Skip List with MAX_LEVEL 3. Read an integer N, followed by N integers to insert. Print the structure of Level 0 after all insertions are complete.',
      constraints: [
        'N <= 50',
        'Values are positive integers'
      ],
      sampleInput: `3
10 20 5`,
      sampleOutput: `Level 0: 5 10 20`,
      hints: [
        'You need to maintain the update array.',
        'Make sure header is initialized with INT_MIN or a very small number.'
      ],
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define MAX_LEVEL 3

struct Node {
    int key;
    struct Node* forward[MAX_LEVEL + 1];
};

struct Node* createNode(int key, int level) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->key = key;
    for(int i=0; i<=level; i++) n->forward[i] = NULL;
    return n;
}

int randomLevel() {
    int lvl = 0;
    while(rand() % 2 == 0 && lvl < MAX_LEVEL) lvl++;
    return lvl;
}

void insert(struct Node* header, int* max_list_level, int key) {
    struct Node* update[MAX_LEVEL + 1];
    struct Node* curr = header;

    for (int i = *max_list_level; i >= 0; i--) {
        while (curr->forward[i] != NULL && curr->forward[i]->key < key) {
            curr = curr->forward[i];
        }
        update[i] = curr;
    }

    int lvl = randomLevel();
    if (lvl > *max_list_level) {
        for (int i = *max_list_level + 1; i <= lvl; i++) {
            update[i] = header;
        }
        *max_list_level = lvl;
    }

    struct Node* newNode = createNode(key, lvl);
    for (int i = 0; i <= lvl; i++) {
        newNode->forward[i] = update[i]->forward[i];
        update[i]->forward[i] = newNode;
    }
}

int main() {
    srand(1);
    int N;
    if (scanf("%d", &N) != 1) return 0;

    int max_list_level = 0;
    struct Node* header = createNode(INT_MIN, MAX_LEVEL);

    for (int i = 0; i < N; i++) {
        int val;
        scanf("%d", &val);
        insert(header, &max_list_level, val);
    }

    printf("Level 0: ");
    struct Node* curr = header->forward[0];
    while (curr != NULL) {
        printf("%d ", curr->key);
        curr = curr->forward[0];
    }
    printf("\\n");

    return 0;
}`,
      solutionExplanation: 'This constructs the skip list. Since Level 0 connects every node sequentially, traversing `forward[0]` from the header prints the sorted elements just like a normal singly linked list.',
      dryRun: [
        {
          step: 1,
          line: 46,
          variables: { val: '10' },
          output: '',
          explanation: 'Inserts 10. List is [10].'
        },
        {
          step: 2,
          line: 46,
          variables: { val: '20' },
          output: '',
          explanation: 'Inserts 20. Traverses forward[0] past 10, inserts 20. List is [10, 20].'
        },
        {
          step: 3,
          line: 46,
          variables: { val: '5' },
          output: '',
          explanation: 'Inserts 5. Stops at header because 5 < 10. Inserts 5. List is [5, 10, 20].'
        }
      ],
      tags: ['skiplist', 'insertion']
    }
  ]
};
