import type { Topic } from '../../../../types';

export const generalBinaryTree: Topic = {
  id: 'u2-t6',
  unitId: 'unit-2',
  title: 'General Trees and Binary Trees',
  slug: 'general-binary-tree',
  description: 'A tree is a NON-LINEAR data structure used for representing hierarchical relationships. ' +
    'Unlike linear structures like arrays or linked lists where data is sequential, trees organize elements ' +
    'in a parent-child structure. The topmost element is called the root, and it connects to its children, ' +
    'which in turn connect to their children, creating a branching structure. Trees are widely used in ' +
    'computer science for representing file systems, HTML DOM, event-driven simulations, and more.\n\n' +
    'In this topic, we will explore both General Trees and Binary Trees. A general tree allows a node ' +
    'to have any number of children, whereas a binary tree restricts each node to have at most two children. ' +
    'We will cover standard terminology borrowed from both botany and genealogy, important mathematical properties ' +
    'of trees, and traversal algorithms like inorder, preorder, and postorder. Additionally, we will learn ' +
    'how to represent any general tree as a binary tree using the first-child next-sibling approach.',
  difficulty: 'intermediate',
  prerequisites: ['u1-t2', 'u2-t1'],
  estimatedMinutes: 50,
  subtopics: [
    {
      id: 'u2-t6-s1',
      title: 'General Tree: Concept and Terminology',
      slug: 'general-tree-concept',
      description: 'A tree is defined as a connected, acyclic graph. In a general tree, a node can have zero or ' +
        'more children. Terminology is borrowed from both botany and genealogy to describe the relationships between nodes. ' +
        'From botany, we get terms like root (the topmost node with no parent), leaf or external node (a node with no children), ' +
        'internal node (a node with at least one child), and branch (the edge connecting a parent to its child).\n\n' +
        'From genealogy, we get terms like parent, child, siblings (nodes sharing the same parent), ancestor (a node ' +
        'on the path from the root to the current node), and descendant. A crucial property of trees is that a tree ' +
        'with n nodes has exactly n-1 edges, and there is exactly one unique path between any two nodes. This structure ' +
        'is foundational for applications like Huffman Coding and Expression Trees.',
      keyPoints: [
        'A tree is a non-linear data structure for hierarchical relationships.',
        'Root is the topmost node; leaves are nodes with no children.',
        'A tree with n nodes contains exactly n-1 edges.',
        'There is exactly one unique path between any two nodes in a tree.',
        'Common applications include file systems, HTML DOM, and Huffman Coding.'
      ],
      codeExamples: [
        {
          id: 'u2-t6-s1-ex1',
          title: 'Conceptual General Tree Node',
          code: `#include <stdio.h>
#include <stdlib.h>

// A general tree node using the first-child, next-sibling representation
struct general_node {
    int data;
    struct general_node* first_child;
    struct general_node* next_sibling;
};
typedef struct general_node gnode_t;

gnode_t* create_gnode(int value) {
    gnode_t* new_node = (gnode_t*)malloc(sizeof(gnode_t));
    new_node->data = value;
    new_node->first_child = NULL;
    new_node->next_sibling = NULL;
    return new_node;
}

int main() {
    // Root node
    gnode_t* root = create_gnode(1);
    
    // Adding children
    root->first_child = create_gnode(2);
    root->first_child->next_sibling = create_gnode(3);
    root->first_child->next_sibling->next_sibling = create_gnode(4);
    
    printf("Root: %d\\n", root->data);
    printf("First child: %d\\n", root->first_child->data);
    printf("Second child (sibling of first): %d\\n", root->first_child->next_sibling->data);
    
    // Clean up memory
    free(root->first_child->next_sibling->next_sibling);
    free(root->first_child->next_sibling);
    free(root->first_child);
    free(root);
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code demonstrates how a general tree can be represented in C. Instead of having an array of children, each node points to its first child and its next immediate sibling. This elegant approach can represent a tree of any degree.',
          expectedOutput: 'Root: 1\nFirst child: 2\nSecond child (sibling of first): 3',
          lineBreakdown: [
            { lineNumber: 7, code: 'struct general_node* first_child;', explanation: 'Pointer to the leftmost child of this node.' },
            { lineNumber: 8, code: 'struct general_node* next_sibling;', explanation: 'Pointer to the sibling immediately to the right.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t6-s1-cm1',
          title: 'Confusing Cycle with Tree',
          wrongCode: `root->first_child = child1;\nchild1->first_child = root; // Creates a cycle!`,
          correctCode: `root->first_child = child1;\nchild1->first_child = NULL;`,
          explanation: 'A tree must be acyclic. Adding a pointer from a descendant back to an ancestor creates a cycle, breaking the tree properties and leading to infinite loops during traversal.',
          consequence: 'Infinite recursion or infinite loops when traversing the structure.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t6-s1-ic1',
          title: 'Edges in a Tree',
          content: 'A very common property to be tested on is the number of edges. Always remember that a connected tree with n nodes will always have exactly n-1 edges. If it has fewer edges, it is disconnected (a forest). If it has more edges, it contains a cycle.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t6-s1-cp1',
          title: 'Tree Terminology',
          description: 'Ensure you understand the basic definitions of nodes in a tree.',
          criteria: [
            'Know that the root has no parent.',
            'Know that a leaf node has no children.',
            'Know that internal nodes have at least one child.'
          ],
          topicId: 'u2-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t6-s1-rc1',
          front: 'How many edges does a tree with N nodes have?',
          back: 'Exactly N-1 edges.',
          topicId: 'u2-t6',
          tags: ['properties']
        }
      ]
    },
    {
      id: 'u2-t6-s2',
      title: 'Tree Properties: Depth, Height and Degree',
      slug: 'tree-properties',
      description: 'Understanding the quantitative properties of a tree is essential for analyzing the performance ' +
        'of tree-based algorithms. The **degree** of a node is defined as the number of children it has. The degree of ' +
        'the tree itself is the maximum degree among all its nodes. A leaf node naturally has a degree of 0.\n\n' +
        'The **depth** (or level) of a node is the number of edges along the unique path from the root to that node. ' +
        'By definition, the depth of the root is 0. The **height** of a node is the number of edges on the longest downward ' +
        'path from that node to a leaf. The height of the tree is the height of its root node, which is equivalent to ' +
        'the maximum depth of any node in the tree. It is important to distinguish between depth (which is counted ' +
        'from the top down) and height (which is counted from the bottom up).',
      keyPoints: [
        'Degree of a node is the number of its children.',
        'Depth of a node is the number of edges from the root to the node.',
        'Height of a node is the maximum number of edges from the node to a leaf.',
        'Height of the tree is the height of the root.',
        'Root depth is 0; a tree with a single node has a height of 0.'
      ],
      codeExamples: [
        {
          id: 'u2-t6-s2-ex1',
          title: 'Calculating Height of a Binary Tree',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int key_;
    struct node *left_;
    struct node *right_;
};
typedef struct node node_t;

node_t* create_node(int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key;
    temp->left_ = temp->right_ = NULL;
    return temp;
}

// Function to calculate height of a tree
int tree_height(node_t* root) {
    if (root == NULL) {
        return -1; // Empty tree height is -1 (so a single node has height 0)
    }
    
    int left_height = tree_height(root->left_);
    int right_height = tree_height(root->right_);
    
    if (left_height > right_height) {
        return left_height + 1;
    } else {
        return right_height + 1;
    }
}

int main() {
    node_t* root = create_node(10);
    root->left_ = create_node(5);
    root->right_ = create_node(15);
    root->left_->left_ = create_node(2);
    
    printf("Height of the tree is: %d\\n", tree_height(root));
    
    // Free memory (omitted for brevity)
    return 0;
}`,
          language: 'c',
          explanation: 'This code calculates the height of a binary tree using a recursive approach. The height of an empty tree is defined as -1, so that a tree with just a root node will have a height of 0.',
          expectedOutput: 'Height of the tree is: 2',
          lineBreakdown: [
            { lineNumber: 20, code: 'if (root == NULL) return -1;', explanation: 'Base case: empty tree has height -1.' },
            { lineNumber: 27, code: 'return left_height + 1;', explanation: 'Returns the maximum height of the subtrees plus one for the current edge.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t6-s2-cm1',
          title: 'Confusing Height and Depth',
          wrongCode: `// Assuming depth and height are interchangeable`,
          correctCode: `// Height is max distance to leaf (bottom-up)\n// Depth is distance from root (top-down)`,
          explanation: 'While the maximum depth of a tree equals its height, the depth and height of a specific individual node are generally different. Depth counts from the root down to the node, while height counts from the node down to the deepest leaf.',
          consequence: 'Incorrect calculations when determining node balance in advanced trees like AVL trees.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t6-s2-ic1',
          title: 'Recursive Tree Analytics',
          content: 'Calculating the height or depth of a tree is a classic example of post-order traversal (process children, then parent). You must compute the height of the left and right subtrees before you can determine the height of the current node. This runs in O(N) time.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t6-s2-cp1',
          title: 'Height vs Depth',
          description: 'Differentiate between height and depth.',
          criteria: [
            'Depth of root is always 0.',
            'Height of a leaf node is always 0.',
            'Tree height equals maximum node depth.'
          ],
          topicId: 'u2-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t6-s2-rc1',
          front: 'What is the base case for calculating tree height recursively?',
          back: 'If the root is NULL, return -1. This ensures a single node tree returns a height of 0 (-1 + 1).',
          topicId: 'u2-t6',
          tags: ['properties', 'recursion']
        }
      ]
    },
    {
      id: 'u2-t6-s3',
      title: 'Binary Tree: Definition and C Structure',
      slug: 'binary-tree-structure',
      description: 'A binary tree is a specialized tree data structure where each node has AT MOST two children. ' +
        'Crucially, unlike general trees, the children in a binary tree are ordered and distinguished as the left ' +
        'child and the right child. This distinction matters: a tree with only a left child is considered structurally ' +
        'different from a tree with the same node as a right child.\n\n' +
        'The formal recursive definition of a binary tree states that a binary tree is either empty, or it consists ' +
        'of a root node, a left binary tree, and a right binary tree. Binary trees come in several specific ' +
        'varieties. A **Full Binary Tree** is one where every node has either 0 or 2 children. A **Complete Binary Tree** ' +
        'has all levels completely filled except possibly the last level, which is filled from left to right. ' +
        'A **Perfect Binary Tree** is both full and complete, meaning all internal nodes have 2 children and all leaves ' +
        'are at the same depth.',
      keyPoints: [
        'Every node in a binary tree has at most two children.',
        'Left and right children are distinguished and not interchangeable.',
        'A full binary tree has nodes with exactly 0 or 2 children.',
        'A complete binary tree fills all levels fully except the last, filled left-to-right.',
        'Maximum nodes at level i is 2^i.',
        'Minimum height for a binary tree with n nodes is floor(log2(n)).'
      ],
      codeExamples: [
        {
          id: 'u2-t6-s3-ex1',
          title: 'Binary Tree Definition and Implementation',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int key_;
    struct node *left_;
    struct node *right_;
};
typedef struct node node_t;

struct tree {
    node_t *root_;
};
typedef struct tree tree_t;

node_t* create_node(int key) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    temp->key_ = key;
    temp->left_ = temp->right_ = NULL;
    return temp;
}

void init(tree_t* ptr_tree) {
    ptr_tree->root_ = NULL;
}

int main() {
    tree_t my_tree;
    init(&my_tree);
    
    my_tree.root_ = create_node(10);
    my_tree.root_->left_ = create_node(5);
    my_tree.root_->right_ = create_node(15);
    
    printf("Root: %d\\n", my_tree.root_->key_);
    printf("Left: %d\\n", my_tree.root_->left_->key_);
    printf("Right: %d\\n", my_tree.root_->right_->key_);
    
    free(my_tree.root_->left_);
    free(my_tree.root_->right_);
    free(my_tree.root_);
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code illustrates the fundamental C structures for a binary tree. We separate the concept of a `node` from the `tree` itself. The `tree_t` wrapper holds the root pointer, making it easier to pass the entire tree state to functions.',
          expectedOutput: 'Root: 10\nLeft: 5\nRight: 15',
          lineBreakdown: [
            { lineNumber: 5, code: 'struct node *left_;', explanation: 'Pointer to the distinct left child.' },
            { lineNumber: 6, code: 'struct node *right_;', explanation: 'Pointer to the distinct right child.' },
            { lineNumber: 11, code: 'struct tree { node_t *root_; };', explanation: 'Wrapper structure representing the tree itself.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t6-s3-cm1',
          title: 'Not Initializing Child Pointers',
          wrongCode: `node_t* temp = (node_t*)malloc(sizeof(node_t));\ntemp->key_ = key;\nreturn temp;`,
          correctCode: `node_t* temp = (node_t*)malloc(sizeof(node_t));\ntemp->key_ = key;\ntemp->left_ = temp->right_ = NULL;\nreturn temp;`,
          explanation: 'Failing to initialize `left_` and `right_` to NULL means they will contain garbage values. When traversing the tree, the program will attempt to access these invalid memory addresses, causing a segmentation fault.',
          consequence: 'Undefined behavior and crashes during tree traversal or operations.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t6-s3-ic1',
          title: 'Array Representation of Complete Binary Trees',
          content: 'A complete binary tree is uniquely suited to be represented as an array rather than with pointers. If a node is at index i, its left child is at 2i+1, right child at 2i+2, and parent at floor((i-1)/2). This is heavily tested in heaps.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t6-s3-cp1',
          title: 'Binary Tree Types',
          description: 'Identify the properties of specific binary tree types.',
          criteria: [
            'Full binary tree: all nodes have 0 or 2 children.',
            'Complete binary tree: filled left-to-right on the last level.',
            'Perfect binary tree: all leaves at the same depth.'
          ],
          topicId: 'u2-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t6-s3-rc1',
          front: 'What is the maximum number of nodes in a perfect binary tree of height h?',
          back: '2^(h+1) - 1',
          topicId: 'u2-t6',
          tags: ['formulas', 'binary tree']
        }
      ]
    },
    {
      id: 'u2-t6-s4',
      title: 'Tree Traversals: Inorder, Preorder, Postorder',
      slug: 'tree-traversals',
      description: 'Traversal is the process of visiting all nodes of a tree in a specific order. Since trees are ' +
        'non-linear, there are multiple valid ways to traverse them. The three primary depth-first traversals are ' +
        'Inorder, Preorder, and Postorder. Their names indicate when the root (the current node) is visited relative ' +
        'to its left and right subtrees.\n\n' +
        '**Preorder** visits the root first, then the left subtree, then the right subtree (root -> left -> right). ' +
        '**Inorder** visits the left subtree, then the root, then the right subtree (left -> root -> right). ' +
        '**Postorder** visits the left subtree, then the right subtree, and finally the root (left -> right -> root).\n\n' +
        'For example, in a tree representing an arithmetic expression, preorder traversal produces prefix notation, ' +
        'inorder produces infix notation, and postorder produces postfix notation. Postorder is also exclusively used ' +
        'when deleting a tree, as you must delete children before you can safely delete the parent.',
      keyPoints: [
        'Preorder traversal: Root, Left, Right.',
        'Inorder traversal: Left, Root, Right.',
        'Postorder traversal: Left, Right, Root.',
        'Inorder traversal of a Binary Search Tree (BST) yields a sorted sequence.',
        'Postorder traversal is essential for safely deleting a tree.'
      ],
      codeExamples: [
        {
          id: 'u2-t6-s4-ex1',
          title: 'Implementing the Three Traversals',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node { 
    int key_; 
    struct node *left_; 
    struct node *right_; 
};
typedef struct node node_t;

node_t* create_node(int k) {
    node_t* t = (node_t*)malloc(sizeof(node_t));
    t->key_ = k; 
    t->left_ = t->right_ = NULL;
    return t;
}

// Inorder: left -> root -> right
void inorder(node_t* root) {
    if(root) {
        inorder(root->left_);
        printf("%d ", root->key_);
        inorder(root->right_);
    }
}

// Preorder: root -> left -> right
void preorder(node_t* root) {
    if(root) {
        printf("%d ", root->key_);
        preorder(root->left_);
        preorder(root->right_);
    }
}

// Postorder: left -> right -> root
void postorder(node_t* root) {
    if(root) {
        postorder(root->left_);
        postorder(root->right_);
        printf("%d ", root->key_);
    }
}

// Safely delete tree using postorder logic
void deinit(node_t* root) {
    if(root) { 
        deinit(root->left_); 
        deinit(root->right_); 
        free(root); 
    }
}

int main() {
    node_t* root = create_node(4);
    root->left_ = create_node(2);
    root->right_ = create_node(6);
    root->left_->left_ = create_node(1);
    root->left_->right_ = create_node(3);
    root->right_->left_ = create_node(5);
    root->right_->right_ = create_node(7);
    
    printf("Inorder:   "); 
    inorder(root); 
    printf("\\n");
    
    printf("Preorder:  "); 
    preorder(root); 
    printf("\\n");
    
    printf("Postorder: "); 
    postorder(root); 
    printf("\\n");
    
    deinit(root);
    return 0;
}`,
          language: 'c',
          explanation: 'This code builds a balanced binary tree and executes all three traversals. Notice the structural similarity of the three recursive functions; only the placement of the `printf` statement changes.',
          expectedOutput: 'Inorder:   1 2 3 4 5 6 7 \nPreorder:  4 2 1 3 6 5 7 \nPostorder: 1 3 2 5 7 6 4 ',
          lineBreakdown: [
            { lineNumber: 21, code: 'inorder(root->left_); printf("%d ", root->key_); inorder(root->right_);', explanation: 'The left-root-right pattern characteristic of inorder traversal.' },
            { lineNumber: 42, code: 'deinit(root->left_); deinit(root->right_); free(root);', explanation: 'Children must be freed before the parent node is freed to avoid accessing freed memory.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t6-s4-cm1',
          title: 'Missing the Base Case',
          wrongCode: `void inorder(node_t* root) {
    inorder(root->left_);
    printf("%d ", root->key_);
    inorder(root->right_);
}`,
          correctCode: `void inorder(node_t* root) {
    if(root) {
        inorder(root->left_);
        printf("%d ", root->key_);
        inorder(root->right_);
    }
}`,
          explanation: 'Without checking `if (root != NULL)`, the recursive function will attempt to dereference a NULL pointer when it reaches the bottom of the tree, causing an immediate segmentation fault.',
          consequence: 'Segmentation fault due to NULL pointer dereference.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t6-s4-ic1',
          title: 'Tree Reconstruction',
          content: 'A classic interview question asks to reconstruct a binary tree given its Inorder traversal and either its Preorder or Postorder traversal. You cannot reconstruct a tree uniquely using only Preorder and Postorder traversals.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t6-s4-cp1',
          title: 'Traversal Output Prediction',
          description: 'Memorize the ordering of the three depth-first traversals.',
          criteria: [
            'Preorder: Node, Left, Right',
            'Inorder: Left, Node, Right',
            'Postorder: Left, Right, Node'
          ],
          topicId: 'u2-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t6-s4-rc1',
          front: 'Which traversal is used to safely delete an entire binary tree?',
          back: 'Postorder traversal, because it ensures that children are visited (and deleted) before their parent.',
          topicId: 'u2-t6',
          tags: ['traversal', 'memory']
        }
      ]
    },
    {
      id: 'u2-t6-s5',
      title: 'Binary Representation of General Trees',
      slug: 'binary-representation',
      description: 'A general tree can have nodes with varying degrees (an arbitrary number of children). ' +
        'Creating a node structure to accommodate an unknown number of children is inefficient in C. Instead, ' +
        'we can elegantly map ANY general tree onto a binary tree structure using the First-Child Next-Sibling approach.\n\n' +
        'In this representation, every node has two pointers, exactly like a binary tree. However, their meaning changes. ' +
        'The `left` pointer now points to the node\'s **first child** (the leftmost child in the general tree). ' +
        'The `right` pointer now points to the node\'s **next sibling** (the child immediately to its right sharing the same parent).\n\n' +
        'This means that the original children of a general node form a linked list connected by their right pointers, ' +
        'and the parent\'s left pointer points to the head of this linked list. This transformation proves that ' +
        'binary trees are functionally as expressive as general trees.',
      keyPoints: [
        'A general tree can be represented as a binary tree.',
        'Uses the "First-Child Next-Sibling" mapping.',
        'The left pointer acts as the first-child pointer.',
        'The right pointer acts as the next-sibling pointer.',
        'This avoids variable-sized arrays or linked lists of children in each node.'
      ],
      codeExamples: [
        {
          id: 'u2-t6-s5-ex1',
          title: 'Converting a General Tree conceptually',
          code: `#include <stdio.h>
#include <stdlib.h>

// Standard binary tree node
struct node {
    char data;
    struct node* left;
    struct node* right;
};

struct node* create_node(char data) {
    struct node* new_node = (struct node*)malloc(sizeof(struct node));
    new_node->data = data;
    new_node->left = new_node->right = NULL;
    return new_node;
}

int main() {
    /* 
     * Imagine a general tree:
     *      A
     *    / | \\
     *   B  C  D
     * 
     * We convert it using: left = first_child, right = next_sibling
     */
    
    struct node* root = create_node('A');
    
    // A's first child is B
    root->left = create_node('B');
    
    // B's next sibling is C
    root->left->right = create_node('C');
    
    // C's next sibling is D
    root->left->right->right = create_node('D');
    
    printf("General Root: %c\\n", root->data);
    printf("First child of A: %c\\n", root->left->data);
    printf("Second child of A (sibling of B): %c\\n", root->left->right->data);
    printf("Third child of A (sibling of C): %c\\n", root->left->right->right->data);
    
    // Cleanup omitted
    return 0;
}`,
          language: 'c',
          explanation: 'This code shows how a standard binary tree node (left/right) can represent a general tree. A\'s children (B, C, D) are chained via the right pointer. A\'s left pointer connects to the start of this chain (B).',
          expectedOutput: 'General Root: A\nFirst child of A: B\nSecond child of A (sibling of B): C\nThird child of A (sibling of C): D',
          lineBreakdown: [
            { lineNumber: 29, code: 'root->left = create_node(\'B\');', explanation: 'Left pointer serves as First Child.' },
            { lineNumber: 32, code: 'root->left->right = create_node(\'C\');', explanation: 'Right pointer serves as Next Sibling.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t6-s5-cm1',
          title: 'Incorrect Traversal Assumptions',
          wrongCode: `// Assuming traditional inorder prints siblings sensibly`,
          correctCode: `// Traversal logic must be adapted for First-Child Next-Sibling semantics`,
          explanation: 'A traditional binary tree traversal (like inorder) applied to a first-child next-sibling binary tree will yield an order that doesn\'t directly match standard general tree traversals (like level-order). You must traverse right pointers iteratively to visit all siblings of a level.',
          consequence: 'Misinterpreting the structure of the general tree when traversing.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t6-s5-ic1',
          title: 'N-ary Tree Conversions',
          content: 'The LCRS (Left-Child Right-Sibling) representation is occasionally asked in graph theory or advanced tree design problems to optimize memory for N-ary trees with highly variable branching factors.',
          relatedTopicIds: [],
          frequency: 'rare'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t6-s5-cp1',
          title: 'First-Child Next-Sibling',
          description: 'Map general tree edges to binary tree edges.',
          criteria: [
            'Left child pointer maps to the first (leftmost) child.',
            'Right child pointer maps to the immediate right sibling.',
            'A node without siblings has a NULL right pointer.'
          ],
          topicId: 'u2-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t6-s5-rc1',
          front: 'In the binary representation of a general tree, what does a node\'s right pointer signify?',
          back: 'It points to the node\'s next immediate sibling.',
          topicId: 'u2-t6',
          tags: ['conversion', 'general tree']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t6-q1',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      question: 'Inorder traversal of a Binary Search Tree (BST) yields which ordering?',
      options: ['Random sequence', 'Reverse sorted sequence', 'Sorted ascending sequence', 'Same as insertion order'],
      correctAnswer: 'Sorted ascending sequence',
      explanation: 'Because inorder processes the left subtree (smaller elements), then the root, then the right subtree (larger elements), it inherently produces a sorted list.',
      tags: ['traversal', 'properties']
    },
    {
      id: 'u2-t6-q2',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      question: 'A connected tree with n nodes has exactly how many edges?',
      options: ['n', 'n + 1', 'n - 1', '2n'],
      correctAnswer: 'n - 1',
      explanation: 'A defining property of any tree is that it has n-1 edges. Each node except the root has exactly one parent edge.',
      tags: ['properties', 'graph']
    },
    {
      id: 'u2-t6-q3',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      question: 'What is the maximum number of children a node can have in a binary tree?',
      options: ['1', '2', '3', 'Unlimited'],
      correctAnswer: '2',
      explanation: 'The definition of a binary tree restricts nodes to have at most two children (left and right).',
      tags: ['definition', 'binary tree']
    },
    {
      id: 'u2-t6-q4',
      type: 'true-false',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'Every general tree can be represented as a binary tree.',
      correctAnswer: true,
      explanation: 'Using the first-child next-sibling representation, any general tree of any degree can be mapped perfectly to a binary tree.',
      tags: ['conversion', 'general tree']
    },
    {
      id: 'u2-t6-q5',
      type: 'true-false',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      question: 'Every binary tree is also a general tree.',
      correctAnswer: true,
      explanation: 'A general tree allows zero or more children. Since a binary tree allows zero, one, or two children, it strictly adheres to the definition of a general tree.',
      tags: ['definition', 'hierarchy']
    },
    {
      id: 'u2-t6-q6',
      type: 'fill-blank',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      question: 'In an inorder traversal, the algorithm first visits the left subtree, then the ____, and finally the right subtree.',
      correctAnswer: 'root',
      explanation: 'Inorder places the root in the middle of the traversal of the two subtrees.',
      tags: ['traversal', 'inorder']
    },
    {
      id: 'u2-t6-q7',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'If a binary tree has root=A, left=B, right=C, what is the output of a preorder traversal?',
      options: ['B A C', 'A B C', 'B C A', 'A C B'],
      correctAnswer: 'A B C',
      explanation: 'Preorder visits the root first, then the left child, then the right child.',
      tags: ['traversal', 'preorder']
    },
    {
      id: 'u2-t6-q8',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'Which traversal method should be used to safely delete a binary tree (freeing children before the parent)?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
      correctAnswer: 'Postorder',
      explanation: 'Postorder traversal processes the left and right subtrees completely before processing (deleting) the root node. This prevents accessing memory that has already been freed.',
      tags: ['traversal', 'memory']
    },
    {
      id: 'u2-t6-q9',
      type: 'predict-output',
      topicId: 'u2-t6',
      difficulty: 'advanced',
      question: 'Consider a tree with root=1, root.left=2, root.right=3, root.left.left=4, root.left.right=5. What is the inorder traversal?',
      correctAnswer: '4 2 5 1 3',
      explanation: 'Left subtree of 1 is the subtree rooted at 2. Inorder of 2 is its left (4), then 2, then its right (5). So left subtree yields 4 2 5. Then the root 1. Then right subtree 3.',
      tags: ['traversal', 'trace']
    },
    {
      id: 'u2-t6-q10',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'According to common convention, what is the height of a tree that contains only a single node (the root)?',
      options: ['-1', '0', '1', 'Undefined'],
      correctAnswer: '0',
      explanation: 'The height is the number of edges on the longest path to a leaf. A tree with one node has 0 edges.',
      tags: ['properties', 'height']
    },
    {
      id: 'u2-t6-q11',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'The number of EDGES in a tree having n nodes is:',
      options: ['Depends on whether binary tree or not', 'Always n-1', '2n as each node has 2 pointers', 'Can vary from 1 to n'],
      correctAnswer: 'Always n-1',
      explanation: 'A tree with n nodes always has exactly n-1 edges. This is a fundamental property of trees (connected acyclic graphs). Each node except the root has exactly one parent edge. So edges = nodes - 1 = n-1, regardless of the type of tree.',
      tags: ['Tree-Properties', 'Edges']
    },
    {
      id: 'u2-t6-q12',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'The longest path from the root to a leaf in a binary tree of n nodes has length at most:',
      options: ['n-1', 'log2(n)', 'n', 'n/2'],
      correctAnswer: 'n-1',
      explanation: 'In the worst case (a completely degenerate/skewed tree where each node has exactly one child), the tree degenerates into a linked list of depth n-1. The longest path has n-1 edges (from root through n-1 levels to the single leaf). For balanced trees it would be log2(n) but the MAXIMUM is n-1.',
      tags: ['Tree-Properties', 'Height', 'Worst-Case']
    },
    {
      id: 'u2-t6-q13',
      type: 'mcq',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      question: 'The maximum number of LEAVES in a binary tree of n nodes is:',
      options: ['n-1', 'log2(n)', 'floor(n/2) + 1', 'floor((n+1)/2)'],
      correctAnswer: 'floor((n+1)/2)',
      explanation: 'In a full binary tree (every node has 0 or 2 children), leaves = ceil(n/2) = floor((n+1)/2). For n=7: floor(8/2)=4 leaves. For n=4: floor(5/2)=2 leaves. This is the maximum achievable — a full binary tree maximizes leaf count.',
      tags: ['Binary-Tree', 'Leaves', 'Maximum']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t6-p1',
      title: 'Count Nodes in a Binary Tree',
      topicId: 'u2-t6',
      difficulty: 'beginner',
      problemStatement: 'Write a recursive function `int count_nodes(node_t* root)` that counts and returns the total number of nodes present in a binary tree. The function should return 0 if the tree is empty.',
      constraints: ['Tree may be empty (root is NULL).', 'Tree is purely a binary tree.'],
      sampleInput: 'Tree: root=1, left=2, right=3',
      sampleOutput: '3',
      hints: ['A tree\'s node count is 1 (for the root) plus the nodes in the left subtree plus the nodes in the right subtree.', 'Base case: if root is NULL, return 0.'],
      solution: `int count_nodes(node_t* root) {
    if (root == NULL) {
        return 0;
    }
    return 1 + count_nodes(root->left_) + count_nodes(root->right_);
}`,
      solutionExplanation: 'This elegant recursive solution leverages the property that the total number of nodes is the sum of nodes in both subtrees, plus one for the current node. The base case correctly handles empty trees or leaves.',
      dryRun: [
        { step: 1, line: 2, variables: { root: 'node_1' }, output: '', explanation: 'root is not NULL, skip to line 5' },
        { step: 2, line: 5, variables: { root: 'node_1' }, output: '', explanation: 'returns 1 + count_nodes(left) + count_nodes(right)' }
      ],
      tags: ['recursion', 'counting']
    },
    {
      id: 'u2-t6-p2',
      title: 'Calculate Tree Height',
      topicId: 'u2-t6',
      difficulty: 'intermediate',
      problemStatement: 'Write a recursive function `int height(node_t* root)` that calculates the height of a binary tree. Recall that the height of an empty tree is -1, and the height of a single-node tree is 0.',
      constraints: ['Tree may be empty.', 'Return -1 for empty tree.'],
      sampleInput: 'Tree: root=1, left=2, right=3, left.left=4',
      sampleOutput: '2',
      hints: ['The height of a node is the max height of its left or right child, plus 1.', 'Use a helper logic to determine the max of two integers.'],
      solution: `int height(node_t* root) {
    if (root == NULL) {
        return -1;
    }
    
    int left_h = height(root->left_);
    int right_h = height(root->right_);
    
    if (left_h > right_h) {
        return left_h + 1;
    } else {
        return right_h + 1;
    }
}`,
      solutionExplanation: 'We recursively find the height of both subtrees. We then add 1 to the larger of the two heights to account for the edge connecting the current node to that subtree. Setting the base case to -1 ensures a leaf node correctly returns max(-1, -1) + 1 = 0.',
      dryRun: [
        { step: 1, line: 2, variables: { root: 'leaf_node' }, output: '', explanation: 'Check if leaf_node is NULL' },
        { step: 2, line: 6, variables: { root: 'leaf_node', left_h: '-1' }, output: '', explanation: 'Left child is NULL, returns -1' },
        { step: 3, line: 7, variables: { root: 'leaf_node', left_h: '-1', right_h: '-1' }, output: '', explanation: 'Right child is NULL, returns -1' },
        { step: 4, line: 12, variables: { root: 'leaf_node' }, output: '', explanation: 'Returns -1 + 1 = 0' }
      ],
      tags: ['recursion', 'properties']
    },
    {
      id: 'u2-t6-p3',
      title: 'Build and Traverse Specific Tree',
      topicId: 'u2-t6',
      difficulty: 'advanced',
      problemStatement: 'Construct the binary tree corresponding to the slide example that produces the inorder traversal DBEACF. Then write a function to perform an inorder traversal to verify your construction.',
      constraints: ['Use a standard node structure.', 'Write a main block simulating this construction.'],
      sampleInput: 'None',
      sampleOutput: 'D B E A C F',
      hints: ['A is the root. Left child is B, Right child is C. B\'s children are D and E. C\'s left child is NULL, right child is F.'],
      solution: `#include <stdio.h>
#include <stdlib.h>

struct node { char key_; struct node *left_, *right_; };
typedef struct node node_t;

node_t* create_node(char k) {
    node_t* t = (node_t*)malloc(sizeof(node_t));
    t->key_ = k; 
    t->left_ = t->right_ = NULL;
    return t;
}

void inorder(node_t* root) {
    if(root) {
        inorder(root->left_);
        printf("%c ", root->key_);
        inorder(root->right_);
    }
}

int main() {
    node_t* root = create_node('A');
    root->left_ = create_node('B');
    root->right_ = create_node('C');
    root->left_->left_ = create_node('D');
    root->left_->right_ = create_node('E');
    root->right_->right_ = create_node('F');
    
    inorder(root);
    printf("\\n");
    return 0;
}`,
      solutionExplanation: 'Based on standard traversal trace analysis, A must be the root to be in the middle of DBE and CF. B must be the root of the left subtree (with D left and E right), and C must be the right child of A, with F as its right child to produce C F in inorder.',
      dryRun: [
        { step: 1, line: 24, variables: { root: 'A' }, output: '', explanation: 'Root is created as A' },
        { step: 2, line: 31, variables: { root: 'A' }, output: 'D B E A C F ', explanation: 'Recursive inorder processes D, then B, E, A, C, F' }
      ],
      tags: ['traversal', 'tree construction']
    }
  ]
};
