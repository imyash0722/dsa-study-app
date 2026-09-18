import type { Topic } from '../../../../types';

export const binarySearchTree: Topic = {
  id: 'u2-t7',
  unitId: 'unit-2',
  title: 'Binary Search Tree',
  slug: 'binary-search-tree',
  description: 'A Binary Search Tree (BST) is a node-based binary tree data structure that enforces a strict structural invariant: for any given node, all keys in its left subtree must be strictly less than the node\'s key, and all keys in its right subtree must be strictly greater than the node\'s key. Both left and right subtrees must themselves be binary search trees. This inherent ordering makes BSTs exceptionally powerful for search-intensive applications.\n\nBy organizing data in this hierarchical manner, a BST enables efficient searching, insertion, and deletion operations. The average time complexity for these operations is proportional to the height of the tree, denoted as O(h). When a BST is well-balanced, its height is O(log n), providing a dramatic performance improvement over linear data structures like arrays and linked lists.\n\nIn this topic, we will explore the complete implementation of a BST in C. We will cover the two-layer design pattern for encapsulating recursive algorithms, the recursive logic for insertion, tree traversal techniques, and methods for calculating tree metrics such as node and leaf counts. Finally, we will analyze how the insertion sequence affects the tree\'s topology, leading to degenerate cases that motivate the need for self-balancing trees.',
  difficulty: 'advanced',
  prerequisites: ['u2-t6'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u2-t7-s1',
      title: 'BST Property and C Structure',
      slug: 'bst-property-and-c-structure',
      description: 'The defining characteristic of a Binary Search Tree is its invariant: for any node, all elements in the left subtree are smaller, and all elements in the right subtree are larger. This property must hold true for every single node within the tree, not just the root.\n\nWhen implementing a BST in C, it is a best practice to use a two-layer design. The outer layer provides a public interface that accepts a pointer to a tree wrapper structure (`tree_t`), which holds the root pointer. The inner layer consists of `static` recursive helper functions that operate directly on node pointers (`node_t*`).\n\nThis architecture completely hides the recursive implementation details and node management from the user of the data structure. The user simply passes the tree object and the data, while the internal static functions handle the recursive pointer linkages and memory allocation.',
      keyPoints: [
        'A BST requires left subtree keys to be less than the root key, and right subtree keys to be greater.',
        'The BST property applies recursively to all subtrees.',
        'A two-layer design separates the public interface from the internal recursive implementation.',
        'The `tree_t` wrapper struct encapsulates the root pointer, preventing the user from needing to manage node pointers.',
        '`static` helper functions process the recursive logic, taking and returning `node_t*`.'
      ],
      codeExamples: [
        {
          id: 'u2-t7-s1-ex1',
          title: 'BST Structures and Header',
          code: `struct node { int key_; struct node *left_; struct node *right_; };\ntypedef struct node node_t;\nstruct tree { node_t *root_; };\ntypedef struct tree tree_t;\nvoid init(tree_t *ptr_tree);\nvoid deinit(tree_t *ptr_tree);\nvoid disp(tree_t *ptr_tree);\nvoid insert(tree_t *ptr_tree, int key);`,
          language: 'c',
          explanation: 'This header defines the basic components of our BST. `node_t` represents an individual node containing the data and links to its left and right children. `tree_t` acts as a wrapper containing the pointer to the root node. The function prototypes define the public API for the tree operations.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 1, code: 'struct node { int key_; struct node *left_; struct node *right_; };', explanation: 'Defines the recursive node structure.' },
            { lineNumber: 3, code: 'struct tree { node_t *root_; };', explanation: 'Wrapper structure that holds the root of the tree, providing encapsulation.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t7-s1-cm1',
          title: 'Exposing Node Pointers in API',
          wrongCode: `void insert(node_t **root, int key);`,
          correctCode: `void insert(tree_t *ptr_tree, int key);`,
          explanation: 'While passing a double pointer to a node works technically, it forces the user of your code to manage a pointer to the root node directly. Using a `tree_t` wrapper struct provides better encapsulation and a cleaner API.',
          consequence: 'Violates encapsulation and makes the client code responsible for pointer management, increasing the likelihood of memory errors.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t7-s1-ic1',
          title: 'Validating a BST',
          content: 'A very common interview question is to determine if a given binary tree is a valid BST. A naive approach checks only immediate children, which is incorrect. The correct approach passes a valid minimum and maximum range down the recursive calls to ensure all descendants adhere to the BST invariant.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t7-s1-cp1',
          title: 'Understanding BST Invariant',
          description: 'Ensure the structural rules of a BST are understood.',
          criteria: [
            'All keys in the left subtree are smaller than the node\'s key.',
            'All keys in the right subtree are greater than the node\'s key.',
            'The tree_t structure encapsulates the root pointer.'
          ],
          topicId: 'u2-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t7-s1-rc1',
          front: 'What is the purpose of the `tree_t` structure in our two-layer design?',
          back: 'It acts as a wrapper that holds the root pointer, encapsulating the internal node structure and providing a clean public interface.',
          topicId: 'u2-t7',
          tags: ['design', 'structure']
        }
      ]
    },
    {
      id: 'u2-t7-s2',
      title: 'Insert Recursive Algorithm',
      slug: 'insert-recursive-algorithm',
      description: 'The insertion algorithm in a BST leverages the tree\'s structural property. We start at the root and recursively compare the key to be inserted with the current node\'s key. If the new key is smaller, we recursively traverse the left subtree; if it\'s larger, we traverse the right subtree. \n\nWhen we reach a `NULL` pointer, it means we have found the correct spot for the new element. We return the newly allocated node pointer up the call stack. Crucially, the recursive helper function `insert_recursive` always returns the root of the modified subtree. The parent node then assigns this return value to its respective child pointer.\n\nEvery new element inserted into a standard BST is always added as a new leaf node. For example, tracing the insertion of {40, 20, 60}, 40 becomes the root. 20 is less than 40, so it becomes the left child. 60 is greater than 40, so it becomes the right child.',
      keyPoints: [
        'Insertion always adds a new node as a leaf in the tree.',
        'The algorithm compares the new key with the current node to decide the path.',
        '`insert_recursive` returns a `node_t*`, representing the root of the updated subtree.',
        'Parent nodes update their left or right child pointers using the return value of the recursive call.',
        'The public `insert` function allocates the new node and initiates the recursive process.'
      ],
      codeExamples: [
        {
          id: 'u2-t7-s2-ex1',
          title: 'Recursive Insertion',
          code: `static node_t* insert_recursive(node_t* root, node_t* temp) {\n    if(root == NULL) { root = temp; }\n    else if(root->key_ > temp->key_) { root->left_ = insert_recursive(root->left_, temp); }\n    else { root->right_ = insert_recursive(root->right_, temp); }\n    return root;\n}\n\nvoid insert(tree_t *ptr_tree, int key) {\n    node_t *temp = (node_t*)malloc(sizeof(node_t));\n    temp->key_ = key; temp->left_ = temp->right_ = NULL;\n    ptr_tree->root_ = insert_recursive(ptr_tree->root_, temp);\n}`,
          language: 'c',
          explanation: 'The `insert` function creates a new isolated node and passes it to `insert_recursive`. The recursive function traverses down to find a `NULL` spot, attaches the node, and returns the pointer back up, ensuring the parent\'s link is updated correctly.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 2, code: 'if(root == NULL) { root = temp; }', explanation: 'Base case: found the correct spot, assign the new node as the root of this empty subtree.' },
            { lineNumber: 3, code: 'else if(root->key_ > temp->key_) { root->left_ = insert_recursive(root->left_, temp); }', explanation: 'If the new key is smaller, traverse left and update the left child pointer.' },
            { lineNumber: 10, code: 'ptr_tree->root_ = insert_recursive(ptr_tree->root_, temp);', explanation: 'Initiate recursion and update the actual tree root in case it was initially empty.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t7-s2-cm1',
          title: 'Not Assigning Recursive Return Values',
          wrongCode: `if(root->key_ > temp->key_) { insert_recursive(root->left_, temp); }`,
          correctCode: `if(root->key_ > temp->key_) { root->left_ = insert_recursive(root->left_, temp); }`,
          explanation: 'If you do not assign the return value of the recursive call back to `root->left_` (or `right_`), the new node will never be linked to the tree. The tree will remain unchanged.',
          consequence: 'The newly allocated node is lost in memory, causing a memory leak, and the element is not inserted into the tree.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t7-s2-ic1',
          title: 'Iterative vs Recursive Insertion',
          content: 'In interviews, you might be asked to implement iterative insertion to avoid call stack overhead. An iterative insert maintains a pointer to the current node and a trailing pointer to the parent, descending until it finds a NULL child, then linking the new node to the parent.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t7-s2-cp1',
          title: 'Insertion Behavior',
          description: 'Verify understanding of where new nodes are placed.',
          criteria: [
            'Know that elements are always inserted as leaves.',
            'Understand that the return value updates the parent\'s link.',
            'Trace the insertion of {40, 20, 60} mentally.'
          ],
          topicId: 'u2-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t7-s2-rc1',
          front: 'Where is a new element always inserted in a standard Binary Search Tree?',
          back: 'It is always inserted as a new leaf node at the bottom of the tree.',
          topicId: 'u2-t7',
          tags: ['insertion', 'tree structure']
        }
      ]
    },
    {
      id: 'u2-t7-s3',
      title: 'Display and Deinit Traversal',
      slug: 'display-and-deinit',
      description: 'Traversing a BST means visiting every node systematically. For displaying the contents of a BST, an Inorder traversal is the most natural choice. By visiting the left subtree, then the root, and finally the right subtree, an Inorder traversal guarantees that the keys are printed in strictly ascending sorted order. This is a direct consequence of the BST property.\n\nWhen we need to destroy the tree and free its memory, we must use a Postorder traversal. A Postorder traversal visits the left subtree, the right subtree, and then finally the node itself. This ensures that we safely free all of a node\'s children before we attempt to free the node itself. \n\nAttempting to free a tree using an Inorder or Preorder traversal would result in a use-after-free error, as we would destroy a parent node before traversing to its children.',
      keyPoints: [
        'Inorder traversal (Left, Root, Right) processes BST nodes in sorted ascending order.',
        'Postorder traversal (Left, Right, Root) is required for safely de-initializing the tree.',
        'Postorder ensures children are freed before their parent.',
        'The public `disp` and `deinit` functions wrap the recursive `disp_recursive` and `deinit_recursive` helpers.',
        'Setting `ptr_tree->root_ = NULL` after de-initialization prevents dangling pointers.'
      ],
      codeExamples: [
        {
          id: 'u2-t7-s3-ex1',
          title: 'Display and De-initialization',
          code: `static void disp_recursive(node_t* temp) {\n    if(temp) {\n        disp_recursive(temp->left_);\n        printf("%d ", temp->key_);\n        disp_recursive(temp->right_);\n    }\n}\n\nstatic void deinit_recursive(node_t* root) {\n    if(root) {\n        deinit_recursive(root->left_);\n        deinit_recursive(root->right_);\n        free(root);\n    }\n}\n\nvoid disp(tree_t *ptr_tree) { printf("Tree : "); disp_recursive(ptr_tree->root_); printf("\\n"); }\n\nvoid deinit(tree_t *ptr_tree) { deinit_recursive(ptr_tree->root_); ptr_tree->root_ = NULL; }`,
          language: 'c',
          explanation: '`disp_recursive` implements Inorder traversal to print keys sorted. `deinit_recursive` implements Postorder traversal to safely free nodes bottom-up. The public functions initialize the recursive calls.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 4, code: 'printf("%d ", temp->key_);', explanation: 'Inorder: processing the node happens between the left and right recursive calls.' },
            { lineNumber: 12, code: 'free(root);', explanation: 'Postorder: freeing the node happens only after both subtrees have been completely freed.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t7-s3-cm1',
          title: 'Using Preorder for Freeing',
          wrongCode: `static void deinit_recursive(node_t* root) {\n    if(root) {\n        free(root);\n        deinit_recursive(root->left_);\n        deinit_recursive(root->right_);\n    }\n}`,
          correctCode: `static void deinit_recursive(node_t* root) {\n    if(root) {\n        deinit_recursive(root->left_);\n        deinit_recursive(root->right_);\n        free(root);\n    }\n}`,
          explanation: 'If you `free(root)` before calling `deinit_recursive` on its children, you are accessing memory (`root->left_` and `root->right_`) that has already been deallocated.',
          consequence: 'Undefined behavior, likely resulting in a segmentation fault or memory corruption due to accessing freed memory.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t7-s3-ic1',
          title: 'Finding the Kth Smallest Element',
          content: 'Because an Inorder traversal processes a BST in sorted order, finding the Kth smallest element is easily solved by performing an Inorder traversal and keeping a counter. When the counter reaches K, the current node is the answer.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t7-s3-cp1',
          title: 'Traversal Applications',
          description: 'Match traversal types to their practical use cases.',
          criteria: [
            'Inorder traversal gives sorted order.',
            'Postorder traversal is mandatory for safe deletion.',
            'Dangling pointers must be mitigated by setting root to NULL.'
          ],
          topicId: 'u2-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t7-s3-rc1',
          front: 'Why must Postorder traversal be used to delete a Binary Tree?',
          back: 'Because it guarantees that a node\'s children are processed (deleted) before the node itself is deleted, preventing use-after-free errors.',
          topicId: 'u2-t7',
          tags: ['traversal', 'memory']
        }
      ]
    },
    {
      id: 'u2-t7-s4',
      title: 'Counting Nodes and Leaves',
      slug: 'counting-nodes-and-leaves',
      description: 'Understanding the structure of a tree often requires metrics like the total number of nodes or the number of leaf nodes. Both of these problems can be elegantly solved using recursion by aggregating results from subtrees.\n\nTo count the total number of nodes, we use the logic: the total nodes in a tree rooted at `temp` is 1 (for `temp` itself) plus the number of nodes in the left subtree plus the number of nodes in the right subtree. If `temp` is `NULL`, the count is 0.\n\nTo count the number of leaves (nodes with no children), the logic changes slightly. If `temp` is `NULL`, return 0. If `temp` has no left and no right child, it is a leaf, so return 1. Otherwise, it is an internal node, so its leaf count is the sum of the leaves in its left and right subtrees. For example, the balanced sequence {40,20,60,10,70,30,50} creates a tree with 7 nodes and 4 leaves. The degenerate sequence {10,20,30,40,50,60,70} yields 7 nodes but only 1 leaf.',
      keyPoints: [
        'Total nodes = 1 + nodes in left subtree + nodes in right subtree.',
        'Leaf nodes = 1 (if node is leaf) OR leaves in left subtree + leaves in right subtree.',
        'A `NULL` pointer always contributes 0 to both node and leaf counts.',
        'The shape of the tree heavily influences the number of leaf nodes.',
        'Degenerate trees have very few leaves (often just 1), while balanced trees maximize the number of leaves.'
      ],
      codeExamples: [
        {
          id: 'u2-t7-s4-ex1',
          title: 'Node and Leaf Counting (Program 9.4 extensions)',
          code: `static int number_of_nodes_recursive(node_t* temp) {\n    if(temp == NULL) return 0;\n    return 1 + number_of_nodes_recursive(temp->left_) + number_of_nodes_recursive(temp->right_);\n}\n\nstatic int number_of_leaves_recursive(node_t* temp) {\n    if(temp == NULL) return 0;\n    if(temp->left_ == NULL && temp->right_ == NULL) return 1;\n    return number_of_leaves_recursive(temp->left_) + number_of_leaves_recursive(temp->right_);\n}\n\nint number_of_nodes(tree_t *ptr_tree) { return number_of_nodes_recursive(ptr_tree->root_); }\nint number_of_leaves(tree_t *ptr_tree) { return number_of_leaves_recursive(ptr_tree->root_); }`,
          language: 'c',
          explanation: 'These recursive functions break down the counting problem into smaller subproblems. `number_of_nodes_recursive` counts every non-null visit, while `number_of_leaves_recursive` only returns 1 when a terminal node is encountered.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 3, code: 'return 1 + number_of_nodes_recursive(temp->left_) + number_of_nodes_recursive(temp->right_);', explanation: 'Adds 1 for the current node, plus the sums of both subtrees.' },
            { lineNumber: 8, code: 'if(temp->left_ == NULL && temp->right_ == NULL) return 1;', explanation: 'Base case for identifying a leaf node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t7-s4-cm1',
          title: 'Incorrect Leaf Base Case',
          wrongCode: `if(temp == NULL) return 1;`,
          correctCode: `if(temp == NULL) return 0;`,
          explanation: 'Returning 1 when `temp` is `NULL` incorrectly counts every `NULL` pointer as a leaf. A leaf is an actual node that exists, but has no children. A `NULL` pointer represents the absence of a node.',
          consequence: 'The function will grossly overcount the number of leaves, effectively counting the number of empty child pointers in the tree.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t7-s4-ic1',
          title: 'Height of a Tree',
          content: 'Another extremely common recursive metric is finding the height (or depth) of a tree. The logic is similar: the height is 1 + the maximum height between the left and right subtrees. This pattern of aggregating results from subtrees is fundamental to tree algorithms.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t7-s4-cp1',
          title: 'Tree Metrics Formulation',
          description: 'Identify the correct recursive formulations for tree metrics.',
          criteria: [
            'Total node count aggregates 1 from every valid node.',
            'Leaf count aggregates 1 only from nodes without children.',
            'Understand how tree shape impacts leaf count.'
          ],
          topicId: 'u2-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t7-s4-rc1',
          front: 'How do you recursively calculate the total number of nodes in a binary tree?',
          back: 'Return 0 if the node is NULL; otherwise, return 1 plus the node count of the left subtree plus the node count of the right subtree.',
          topicId: 'u2-t7',
          tags: ['recursion', 'counting']
        }
      ]
    },
    {
      id: 'u2-t7-s5',
      title: 'Balanced vs Degenerate BST',
      slug: 'balanced-vs-degenerate-bst',
      description: 'A critical vulnerability of a standard Binary Search Tree is that its shape is entirely dictated by the order in which elements are inserted. This has profound implications for performance.\n\nConsider the insertion sequence {40, 20, 60, 10, 30, 50, 70}. The resulting tree is perfectly balanced. At each step down the tree, roughly half the remaining elements are eliminated. Operations on this tree take O(log n) time, which is highly efficient. For a tree of a million nodes, a search takes roughly 20 comparisons.\n\nNow consider the sequence {10, 20, 30, 40, 50, 60, 70}. Every element inserted is greater than the previous one, so they are all added as right children. The resulting structure is not a tree in a functional sense; it has become a linked list. This is known as a degenerate or pathological tree. Operations on this tree degrade to O(n) time. A search through a million nodes could require a million comparisons. This vulnerability motivates the development of self-balancing trees like AVL and Red-Black trees.',
      keyPoints: [
        'The shape of a BST depends entirely on the insertion sequence.',
        'Inserting random or alternating data generally yields a somewhat balanced tree with O(log n) performance.',
        'Inserting pre-sorted data (ascending or descending) yields a degenerate tree, effectively a linked list.',
        'Degenerate trees suffer from O(n) worst-case performance for search, insert, and delete.',
        'The worst-case scenario for a BST highlights the necessity of self-balancing variants like AVL trees.'
      ],
      codeExamples: [],
      commonMistakes: [
        {
          id: 'u2-t7-s5-cm1',
          title: 'Assuming O(log n) is Guaranteed',
          wrongCode: `// Assuming search is always fast`,
          correctCode: `// Recognizing search is fast only if balanced`,
          explanation: 'It is a common misconception that BST operations are always O(log n). They are O(h), where h is the height of the tree. O(log n) is the average case or the case for balanced trees; O(n) is the worst-case time complexity.',
          consequence: 'Designing systems that perform poorly when fed sorted data, leading to unexpected performance bottlenecks.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t7-s5-ic1',
          title: 'Time Complexity of BST Operations',
          content: 'You will frequently be asked for the time complexity of BST operations. Always specify: O(h) where h is the height. Elaborate that this means O(log n) in the best/average case and O(n) in the worst case (degenerate tree).',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t7-s5-cp1',
          title: 'BST Performance Degradation',
          description: 'Understand what causes a BST to perform poorly.',
          criteria: [
            'Know that sorted insertion data creates degenerate trees.',
            'Identify that degenerate trees behave like linked lists.',
            'State the worst-case time complexity as O(n).'
          ],
          topicId: 'u2-t7'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t7-s5-rc1',
          front: 'What happens to a standard BST if you insert elements that are already sorted in ascending order?',
          back: 'It forms a degenerate right-skewed tree that resembles a linked list, degrading operation time complexities to O(n).',
          topicId: 'u2-t7',
          tags: ['performance', 'degenerate']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t7-q99',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'Trace the output: Insert [30, 20, 40, 10, 25, 35, 50] into an empty BST, then perform a Postorder traversal.',
      correctAnswer: '10 25 20 35 50 40 30',
      explanation: 'The tree is constructed with 30 as root. Postorder (Left, Right, Root) yields 10 25 20 35 50 40 30.',
      tags: ['trace', 'traversal']
    },
    {
      id: 'u2-t7-q100',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'Consider a BST with insertions [10, 5, 15, 2, 7, 12, 20]. What is the root of the left subtree of the node containing 15?',
      correctAnswer: '12',
      explanation: 'Node 15 is the right child of 10. Its left child is 12.',
      tags: ['trace', 'structure']
    },
    {
      id: 'u2-t7-q1',
      type: 'mcq',
      topicId: 'u2-t7',
      difficulty: 'beginner',
      question: 'Which traversal of a Binary Search Tree produces elements in sorted ascending order?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 'Inorder',
      explanation: 'Inorder traversal processes the left subtree (smaller elements), then the root, then the right subtree (larger elements), ensuring sorted output.',
      tags: ['traversal', 'sorting']
    },
    {
      id: 'u2-t7-q2',
      type: 'true-false',
      topicId: 'u2-t7',
      difficulty: 'beginner',
      question: 'In a standard BST, a new element is always inserted as a leaf node.',
      correctAnswer: true,
      explanation: 'The insertion algorithm traverses down the tree until it finds a NULL pointer, which represents an empty spot at the bottom of the tree, creating a new leaf.',
      tags: ['insertion', 'concept']
    },
    {
      id: 'u2-t7-q3',
      type: 'mcq',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'What is the worst-case time complexity for searching an element in a Binary Search Tree?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 'O(n)',
      explanation: 'In the worst case (a degenerate or skewed tree), the tree becomes essentially a linked list, requiring a linear scan of all n elements.',
      tags: ['complexity', 'performance']
    },
    {
      id: 'u2-t7-q4',
      type: 'fill-blank',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'To safely destroy a BST and free all allocated memory without causing a use-after-free error, a _______ traversal must be used.',
      correctAnswer: 'Postorder',
      explanation: 'Postorder traversal processes both children before the parent, ensuring nodes are freed bottom-up.',
      tags: ['memory', 'traversal']
    },
    {
      id: 'u2-t7-q5',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'Consider an empty BST. Elements are inserted in this order: 50, 30, 70, 20, 40, 60, 80. How many leaf nodes does this tree have?',
      code: `// Insertion sequence: 50, 30, 70, 20, 40, 60, 80`,
      correctAnswer: '4',
      explanation: 'This sequence creates a perfectly balanced tree. 50 is root. 30 and 70 are children. 20, 40, 60, and 80 are all inserted as children of 30 and 70, forming 4 leaves at the bottom.',
      tags: ['trace', 'leaves']
    },
    {
      id: 'u2-t7-q6',
      type: 'spot-bug',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'Identify the flaw in this recursive insertion function.',
      code: `static void insert_recursive(node_t* root, node_t* temp) {\n    if(root == NULL) { root = temp; }\n    else if(root->key_ > temp->key_) { insert_recursive(root->left_, temp); }\n    else { insert_recursive(root->right_, temp); }\n}`,
      correctAnswer: 'Does not return updated subtree pointer',
      explanation: 'The function does not return a node_t* and does not assign the result of the recursive call back to root->left_ or root->right_. Thus, the links are never actually formed in memory.',
      tags: ['recursion', 'bug']
    },
    {
      id: 'u2-t7-q7',
      type: 'mcq',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'What is the primary advantage of wrapping the root pointer in a `tree_t` structure instead of exposing `node_t**` to the user?',
      options: ['It improves runtime speed of insertions', 'It reduces memory overhead significantly', 'It provides better encapsulation and hides implementation details', 'It allows the tree to hold multiple data types'],
      correctAnswer: 'It provides better encapsulation and hides implementation details',
      explanation: 'The two-layer design hides raw node pointers and recursion from the user, offering a clean, safe public API.',
      tags: ['design', 'encapsulation']
    },
    {
      id: 'u2-t7-q8',
      type: 'true-false',
      topicId: 'u2-t7',
      difficulty: 'beginner',
      question: 'Duplicate keys are generally allowed in a standard Binary Search Tree.',
      correctAnswer: false,
      explanation: 'By standard definition, a BST does not allow duplicate keys, though some variations handle them by keeping a count or strictly enforcing them into one subtree.',
      tags: ['concept', 'property']
    },
    {
      id: 'u2-t7-q9',
      type: 'fill-blank',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'If elements are inserted into a BST in strictly descending order, the resulting tree will only have _______ children.',
      correctAnswer: 'left',
      explanation: 'Every new element is smaller than the previous one, so it will always follow the left pointer, creating a left-skewed degenerate tree.',
      tags: ['degenerate', 'structure']
    },
    {
      id: 'u2-t7-q10',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      question: 'Consider a degenerate BST formed by inserting 10, 20, 30, 40. What is the value returned by a leaf-counting function for this tree?',
      correctAnswer: '1',
      explanation: 'Because it is a linked list shaped tree (right skewed), only the very last node (40) has no children and is thus considered a leaf.',
      tags: ['trace', 'leaves']
    },
    {
      id: 'u2-t7-q11',
      type: 'mcq',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'In the recursive function to count nodes, what is the role of the base case `if(temp == NULL) return 0;`?',
      options: ['It counts the leaf nodes.', 'It handles empty child pointers without adding to the total count.', 'It terminates the tree destruction process.', 'It throws an error for invalid tree structures.'],
      correctAnswer: 'It handles empty child pointers without adding to the total count.',
      explanation: 'Empty subtrees contribute 0 to the total node count. This base case safely stops recursion when descending past the leaves.',
      tags: ['recursion', 'counting']
    },
    {
      id: 'u2-t7-q12',
      type: 'true-false',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'A BST search algorithm takes O(h) time, meaning an unbalanced tree of 100 nodes could take 100 comparisons to search.',
      correctAnswer: true,
      explanation: 'Since time complexity is O(h) and a degenerate tree has h = n, searching for the last element in a 100-node skewed tree requires 100 comparisons.',
      tags: ['performance', 'complexity']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t7-p1',
      title: 'Implement BST Search',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      problemStatement: 'Write a recursive function `search_recursive` that searches for a specific key in a BST. If the key is found, return the pointer to the node. If the key is not present or the tree is empty, return NULL.',
      constraints: ['The tree may be empty.', 'The key may not exist in the tree.'],
      sampleInput: 'Tree containing {40, 20, 60, 10, 30, 50, 70}. Search for 30.',
      sampleOutput: 'Pointer to node with key 30',
      hints: ['Compare the key with the current node\'s key.', 'If it\'s smaller, recurse left. If larger, recurse right.', 'Base case: node is NULL or node->key_ == key.'],
      solution: `static node_t* search_recursive(node_t* temp, int key) {\n    if (temp == NULL || temp->key_ == key) {\n        return temp;\n    }\n    if (temp->key_ > key) {\n        return search_recursive(temp->left_, key);\n    }\n    return search_recursive(temp->right_, key);\n}`,
      solutionExplanation: 'The function elegantly uses the BST property. It recursively descends either left or right, effectively halving the search space in a balanced tree. The base case catches both success (finding the key) and failure (hitting NULL).',
      dryRun: [
        { step: 1, line: 2, variables: { temp_key: '40', key: '30' }, output: '', explanation: 'Start at root. 40 != 30.' },
        { step: 2, line: 5, variables: { temp_key: '40', key: '30' }, output: '', explanation: '40 > 30, so recurse left.' },
        { step: 3, line: 2, variables: { temp_key: '20', key: '30' }, output: '', explanation: 'At node 20. 20 != 30.' },
        { step: 4, line: 8, variables: { temp_key: '20', key: '30' }, output: '', explanation: '20 < 30, so recurse right.' },
        { step: 5, line: 2, variables: { temp_key: '30', key: '30' }, output: '', explanation: 'At node 30. 30 == 30. Match found, return pointer.' }
      ],
      tags: ['search', 'recursion']
    },
    {
      id: 'u2-t7-p2',
      title: 'Find Minimum Value in BST',
      topicId: 'u2-t7',
      difficulty: 'beginner',
      problemStatement: 'Write an iterative function `find_min` that returns the minimum key in a given BST. Assume the tree is not empty.',
      constraints: ['Do not use recursion.', 'Tree has at least one node.'],
      sampleInput: 'Tree containing {40, 20, 60, 10, 30, 50, 70}',
      sampleOutput: '10',
      hints: ['The smallest value in a BST is always found by going as far left as possible.'],
      solution: `int find_min(tree_t *ptr_tree) {\n    node_t *temp = ptr_tree->root_;\n    while (temp->left_ != NULL) {\n        temp = temp->left_;\n    }\n    return temp->key_;\n}`,
      solutionExplanation: 'Because of the BST invariant, any node\'s left child is smaller than the node itself. Therefore, simply following the left pointers until you hit a node with no left child guarantees finding the minimum element.',
      dryRun: [
        { step: 1, line: 2, variables: { temp_key: '40' }, output: '', explanation: 'Start at root 40.' },
        { step: 2, line: 3, variables: { temp_key: '40' }, output: '', explanation: '40 has a left child (20).' },
        { step: 3, line: 4, variables: { temp_key: '20' }, output: '', explanation: 'Move temp to 20.' },
        { step: 4, line: 3, variables: { temp_key: '20' }, output: '', explanation: '20 has a left child (10).' },
        { step: 5, line: 4, variables: { temp_key: '10' }, output: '', explanation: 'Move temp to 10.' },
        { step: 6, line: 3, variables: { temp_key: '10' }, output: '', explanation: '10 has NO left child. Loop terminates.' },
        { step: 7, line: 6, variables: { return_val: '10' }, output: '', explanation: 'Return 10.' }
      ],
      tags: ['iteration', 'min/max']
    },
    {
      id: 'u2-t7-p3',
      title: 'Calculate Tree Height',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      problemStatement: 'Write a recursive function `height_recursive` that calculates the height of a BST. The height of an empty tree is 0. The height of a tree with only a root node is 1.',
      constraints: ['Use recursion.', 'Consider empty tree edge cases.'],
      sampleInput: 'Tree {40, 20, 60, 10}',
      sampleOutput: '3',
      hints: ['The height of a node is 1 + the maximum of the heights of its left and right subtrees.'],
      solution: `static int height_recursive(node_t* temp) {\n    if (temp == NULL) {\n        return 0;\n    }\n    int left_height = height_recursive(temp->left_);\n    int right_height = height_recursive(temp->right_);\n    \n    if (left_height > right_height) {\n        return left_height + 1;\n    } else {\n        return right_height + 1;\n    }\n}`,
      solutionExplanation: 'This is a classic Postorder traversal application. We compute the height of the left and right subtrees first, then take the maximum of the two, and add 1 for the current node. This perfectly models the definition of tree depth.',
      dryRun: [
        { step: 1, line: 5, variables: { temp: '10' }, output: '', explanation: 'At leaf 10, both subtrees return 0.' },
        { step: 2, line: 11, variables: { return_val: '1' }, output: '', explanation: 'Node 10 returns height 1.' },
        { step: 3, line: 5, variables: { temp: '20', left_h: '1' }, output: '', explanation: 'At node 20, left subtree height is 1. Right is 0.' },
        { step: 4, line: 9, variables: { return_val: '2' }, output: '', explanation: 'Node 20 returns 1 + 1 = 2.' }
      ],
      tags: ['recursion', 'metrics']
    },
    {
      id: 'u2-t7-p4',
      title: 'Sum of All Keys',
      topicId: 'u2-t7',
      difficulty: 'intermediate',
      problemStatement: 'Write a recursive function `sum_recursive` that calculates the sum of all keys present in the Binary Search Tree.',
      constraints: ['Tree may be empty (return 0).'],
      sampleInput: 'Tree containing {10, 20, 30}',
      sampleOutput: '60',
      hints: ['Similar to counting nodes, but instead of adding 1, add the node\'s key.'],
      solution: `static int sum_recursive(node_t* temp) {\n    if (temp == NULL) {\n        return 0;\n    }\n    return temp->key_ + sum_recursive(temp->left_) + sum_recursive(temp->right_);\n}`,
      solutionExplanation: 'This algorithm aggregates the values across the entire tree. The sum of an empty tree is 0. The sum of any subtree is the root\'s value plus the sum of its left and right subtrees.',
      dryRun: [
        { step: 1, line: 5, variables: { temp_key: '10' }, output: '', explanation: 'Leaf 10 returns 10 + 0 + 0 = 10.' },
        { step: 2, line: 5, variables: { temp_key: '30' }, output: '', explanation: 'Leaf 30 returns 30 + 0 + 0 = 30.' },
        { step: 3, line: 5, variables: { temp_key: '20', left_sum: '10', right_sum: '30' }, output: '', explanation: 'Root 20 returns 20 + 10 + 30 = 60.' }
      ],
      tags: ['recursion', 'aggregation']
    }
  ]
};
