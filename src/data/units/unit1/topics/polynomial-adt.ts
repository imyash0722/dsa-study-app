import type { Topic } from '../../../../types';

export const polynomialAdt: Topic = {
  id: 'u1-t8',
  unitId: 'unit-1',
  title: 'Polynomial ADT',
  slug: 'polynomial-adt',
  description: 'The Polynomial Abstract Data Type (ADT) provides a structured way to represent and manipulate polynomials mathematically. A polynomial is a mathematical expression consisting of variables and coefficients, involving operations of addition, subtraction, multiplication, and non-negative integer exponents. In computer science, polynomials are frequently modeled using linked lists, where each node represents a non-zero term of the polynomial. This representation is highly memory-efficient, particularly for sparse polynomials where most coefficients might be zero.\n\nIn this topic, we will implement a two-level ADT to represent polynomials. The basic unit is a term containing a coefficient and an exponent, which is embedded inside a linked list node. The linked list maintains these terms in strictly descending order of their exponents, simplifying polynomial arithmetic like addition, evaluation, and differentiation.\n\nBy mastering the Polynomial ADT, you will gain hands-on experience in managing ordered linked lists, handling embedded structures, and performing mathematical operations by traversing dynamic data structures.',
  difficulty: 'advanced',
  prerequisites: ['u1-t1', 'u1-t2', 'u1-t7'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u1-t8-s1',
      title: 'Polynomial as ADT: term_t and poly_t Structures',
      slug: 'polynomial-adt-structures',
      description: 'Mathematically, a polynomial is a sum of terms, where each term consists of a coefficient and an exponent (e.g., 5x^2). In our implementation, we represent each term using a structure called term_t, containing integer fields for the coefficient and exponent. Rather than dealing with raw pointers, this term is directly embedded within a linked list node.\n\nThe polynomial itself is represented by a poly_t structure, which contains a pointer to the head of a singly linked list of nodes. To make operations efficient and mathematically correct, this linked list is strictly ordered by descending exponent. This ordered storage guarantees that the highest degree term is always at the head of the list.\n\nThe Polynomial ADT provides a clean interface for interaction: init_poly to initialize an empty polynomial, insert to add a term in its proper sorted position, disp to print the polynomial, eval to substitute a value for x, and functions like copy_poly and diff_poly to manipulate the entire expression.',
      keyPoints: [
        'A polynomial is represented mathematically as a sum of terms with coefficients and exponents.',
        'The term_t structure holds coeff_ and expo_ as integer fields.',
        'The term is embedded directly within the linked list node, rather than using a pointer.',
        'The poly_t structure maintains an ordered linked list sorted descending by exponent.',
        'The ADT interface completely hides the linked list implementation details from the client.'
      ],
      codeExamples: [
        {
          id: 'u1-t8-s1-ex1',
          title: 'Term and Polynomial Definitions',
          code: `#ifndef TERM_H
#define TERM_H

struct term {
    int coeff_;   // coefficient
    int expo_;    // exponent
};
typedef struct term term_t;

void set_term(term_t* ptr_term, int coeff, int expo);
void disp_term(term_t* ptr_term);
int compare_exponents(term_t* left, term_t* right);
int val(term_t* ptr_term, int x);   // evaluates coeff * x^expo

#endif

#ifndef LIST_H
#define LIST_H
#include "term.h"

struct node {
    term_t term_;         // embedded term (not a pointer)
    struct node *next_;
};
typedef struct node node_t;

struct poly {
    node_t* head_;
};
typedef struct poly poly_t;

void init_poly(poly_t* ptr_poly);
void insert(poly_t* ptr_poly, int coeff, int expo);
void disp(poly_t* ptr_list);
int eval(poly_t* ptr_poly, int x);

#endif`,
          language: 'c',
          explanation: 'This code defines the term_t and poly_t structures. Notice how term_t is embedded as a value (term_) inside the node structure rather than as a pointer. The headers provide the complete ADT interface for basic polynomial operations.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 21, code: 'term_t term_;', explanation: 'The term structure is embedded directly in the node, improving memory locality and simplifying memory management.' },
            { lineNumber: 26, code: 'node_t* head_;', explanation: 'The poly_t structure wraps the list head, hiding the raw pointer from the client.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t8-s1-cm1',
          title: 'Using Pointer for Embedded Term',
          wrongCode: `struct node {
    term_t* term_; // Pointer instead of embedded struct
    struct node *next_;
};`,
          correctCode: `struct node {
    term_t term_; // Embedded struct
    struct node *next_;
};`,
          explanation: 'Using a pointer for the term requires an additional malloc and free for every single term, complicating memory management. Embedding the struct directly inside the node allocates both the node and its term in a single contiguous block.',
          consequence: 'Causes memory leaks if the term pointer is not explicitly freed when the node is deleted, and doubles the number of malloc calls required.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t8-s1-ic1',
          title: 'Memory Overhead of Linked Polynomials',
          content: 'In interviews, you may be asked to compare array vs. linked list representations of polynomials. A linked list uses O(K) space where K is the number of non-zero terms, making it ideal for sparse polynomials (e.g., x^1000 + 1). An array would require O(N) space where N is the maximum degree (1001 elements for x^1000 + 1).',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t8-s1-cp1',
          title: 'Polynomial Data Structures',
          description: 'Ensure understanding of how the two-level ADT is constructed.',
          criteria: [
            'Recognize that term_t contains a coefficient and an exponent.',
            'Identify that the term is embedded inside the linked list node.',
            'Understand that poly_t maintains a pointer to the head of the list.'
          ],
          topicId: 'u1-t8'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t8-s1-rc1',
          front: 'In our Polynomial ADT, is the term stored as a pointer or embedded in the node?',
          back: 'It is embedded directly within the node as a term_t struct, not as a pointer.',
          topicId: 'u1-t8',
          tags: ['struct', 'memory']
        }
      ]
    },
    {
      id: 'u1-t8-s2',
      title: 'Polynomial Construct and Display',
      slug: 'polynomial-construct-display',
      description: 'Building the polynomial correctly is critical for subsequent operations. The insert function allows the client to add terms in any order, but the polynomial must internally maintain them strictly ordered by descending exponent. This ordered storage makes evaluation, addition, and differentiation significantly simpler and faster.\n\nTo insert a new term, we traverse the list while the current term has a strictly higher exponent than the new term. The compare_exponents function assists with this, returning a positive value if the left term has a higher exponent. Once we find a term with a lower or equal exponent, or reach the end of the list, we insert the new node just before it.\n\nThe display function simply iterates from the head to the end of the list, invoking disp_term for each node to print the coefficient and exponent. Since the list is already sorted, the display output naturally appears in the correct mathematical order.',
      keyPoints: [
        'The linked list always maintains terms in descending order of their exponents.',
        'The insert function handles unordered inputs and places them in their correct sorted positions.',
        'Traversal continues as long as the current term\'s exponent is higher than the new term\'s exponent.',
        'Insertion handles two main cases: inserting at the beginning (prev is NULL) or inserting in the middle/end.',
        'The disp function prints the polynomial in standard mathematical notation.'
      ],
      codeExamples: [
        {
          id: 'u1-t8-s2-ex1',
          title: 'Inserting Terms in Order',
          code: `#include <stdio.h>
#include <stdlib.h>
#include "poly.h"

// Helper function implementations from term.c
void set_term(term_t* ptr_term, int coeff, int expo) {
    ptr_term->coeff_ = coeff;
    ptr_term->expo_ = expo;
}

int compare_exponents(term_t* left, term_t* right) {
    return left->expo_ - right->expo_;
}

void disp_term(term_t* ptr_term) {
    printf("%dx^%d ", ptr_term->coeff_, ptr_term->expo_);
}

void init_poly(poly_t *ptr_poly) { ptr_poly->head_ = NULL; }

void insert(poly_t* ptr_poly, int coeff, int expo) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    set_term(&temp->term_, coeff, expo);
    temp->next_ = NULL;
    
    // 1. empty poly
    if(ptr_poly->head_ == NULL) { 
        ptr_poly->head_ = temp; 
    }
    else {
        // find position: ordered by DESCENDING exponent
        node_t* prev = NULL;
        node_t* pres = ptr_poly->head_;
        while(pres != NULL && compare_exponents(&pres->term_, &temp->term_) > 0) {
            prev = pres; 
            pres = pres->next_;
        }
        if(prev == NULL) { // insert at beginning
            ptr_poly->head_ = temp; 
            temp->next_ = pres; 
        }  
        else {             // insert in middle or end
            prev->next_ = temp; 
            temp->next_ = pres; 
        }
    }
}

void disp(poly_t *ptr_poly) {
    node_t* pres = ptr_poly->head_;
    while(pres != NULL) { 
        disp_term(&pres->term_); 
        if (pres->next_ != NULL) printf("+ ");
        pres = pres->next_; 
    }
    printf("\\n");
}

int main() {
    int coeff[] = {5, 4, 3, 2, 1};
    int expo[]  = {2, 6, 0, 4, 8};   // unordered input
    int n = 5;
    
    poly_t mypoly;
    init_poly(&mypoly);
    for(int i = 0; i < n; ++i) {
        insert(&mypoly, coeff[i], expo[i]);
    }
    
    // Prints terms in DESCENDING exponent order
    printf("Polynomial: ");
    disp(&mypoly);
    return 0;
}`,
          language: 'c',
          explanation: 'The client provides terms with unordered exponents (2, 6, 0, 4, 8). The insert function searches for the correct insertion point using compare_exponents. Even though the input is random, the display shows terms strictly sorted from highest degree to lowest.',
          expectedOutput: 'Polynomial: 1x^8 + 4x^6 + 2x^4 + 5x^2 + 3x^0 \n',
          lineBreakdown: [
            { lineNumber: 35, code: 'while(pres != NULL && compare_exponents(&pres->term_, &temp->term_) > 0)', explanation: 'Traverses past all terms that have a higher exponent than the term being inserted.' },
            { lineNumber: 39, code: 'if(prev == NULL)', explanation: 'Checks if insertion must happen at the very beginning of the list, updating the head pointer.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t8-s2-cm1',
          title: 'Failing to Update Head on Front Insertion',
          wrongCode: `if(prev == NULL) { 
    temp->next_ = pres; 
    // Missing head update
}`,
          correctCode: `if(prev == NULL) { 
    ptr_poly->head_ = temp; 
    temp->next_ = pres; 
}`,
          explanation: 'When inserting a term with an exponent higher than any existing term, the loop condition instantly fails, leaving prev as NULL. You must update the head pointer to point to the new node, otherwise the new term is lost from the polynomial structure.',
          consequence: 'The new highest-degree term is dropped and causes a memory leak as it becomes unreferenced.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t8-s2-ic1',
          title: 'Insertion Time Complexity',
          content: 'Inserting a term takes O(N) time in the worst case, where N is the number of existing terms, due to the linear traversal. If you construct a polynomial by inserting N terms from an unsorted array, the overall time complexity is O(N^2), similar to insertion sort.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t8-s2-cp1',
          title: 'Ordered Insertion Logic',
          description: 'Verify understanding of the list traversal stopping condition.',
          criteria: [
            'Traversal stops when the current exponent is <= the new exponent.',
            'compare_exponents > 0 means the current term is larger.',
            'Inserting at the head requires explicitly updating the head pointer.'
          ],
          topicId: 'u1-t8'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t8-s2-rc1',
          front: 'What condition stops the traversal loop during ordered insertion?',
          back: 'Traversal stops when it reaches the end of the list (pres == NULL) or when the current term\'s exponent is no longer strictly greater than the new term\'s exponent.',
          topicId: 'u1-t8',
          tags: ['insertion', 'linked list']
        }
      ]
    },
    {
      id: 'u1-t8-s3',
      title: 'Polynomial Evaluation',
      slug: 'polynomial-evaluation',
      description: 'Evaluating a polynomial means computing its numerical value for a specific value of the variable x. Since a polynomial is a sum of its individual terms, we evaluate the polynomial by iterating through each term, computing its specific value, and keeping a running sum.\n\nThe logic is distributed cleanly across the ADT layers. The val function is part of the term module and calculates coeff * x^expo for a single term. The eval function belongs to the polynomial module; it traverses the linked list from head to tail, accumulating the results returned by val into a single integer variable.\n\nFor example, if we have the polynomial 4x^6 + 5x^2 + 3 and we evaluate it at x=1, the process breaks down as follows: val computes 4*(1^6) = 4, then 5*(1^2) = 5, then 3*(1^0) = 3. The eval function sums these up as 4 + 5 + 3, returning 12 as the final evaluated result.',
      keyPoints: [
        'Evaluation involves substituting a value for x and accumulating the results.',
        'The val function computes coeff * x^expo for an individual term.',
        'The eval function traverses the linked list, calling val for every node.',
        'A running total is maintained and returned as the final evaluation result.',
        'The time complexity of evaluating the polynomial is O(N), where N is the number of terms.'
      ],
      codeExamples: [
        {
          id: 'u1-t8-s3-ex1',
          title: 'Evaluating a Polynomial',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "poly.h"

// Helper function from term.c
int val(term_t* ptr_term, int x) {
    // pow returns a double, we cast to int
    return ptr_term->coeff_ * (int)pow(x, ptr_term->expo_);
}

// eval function from poly.c
int eval(poly_t* ptr_poly, int x) {
    node_t* pres = ptr_poly->head_;
    int res = 0;
    while(pres != NULL) { 
        res += val(&pres->term_, x); 
        pres = pres->next_; 
    }
    return res;
}

int main() {
    poly_t mypoly;
    init_poly(&mypoly);
    
    // Creating 1x^8 + 4x^6 + 2x^4 + 5x^2 + 3x^0
    insert(&mypoly, 5, 2);
    insert(&mypoly, 4, 6);
    insert(&mypoly, 3, 0);
    insert(&mypoly, 2, 4);
    insert(&mypoly, 1, 8);
    
    int x = 2;
    printf("Evaluating for x = %d\\n", x);
    int result = eval(&mypoly, x);
    printf("Value of expr: %d\\n", result);
    // 1(256) + 4(64) + 2(16) + 5(4) + 3(1) = 256 + 256 + 32 + 20 + 3 = 567
    
    return 0;
}`,
          language: 'c',
          explanation: 'The code demonstrates evaluating a populated polynomial list. The eval function cleanly delegates the math of a single term to val, summing the accumulated total as it walks the list.',
          expectedOutput: 'Evaluating for x = 2\nValue of expr: 567\n',
          lineBreakdown: [
            { lineNumber: 8, code: 'return ptr_term->coeff_ * (int)pow(x, ptr_term->expo_);', explanation: 'Calculates the contribution of a single mathematical term using the standard power rule.' },
            { lineNumber: 17, code: 'res += val(&pres->term_, x);', explanation: 'Accumulates the values of all terms sequentially by traversing the list.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t8-s3-cm1',
          title: 'Not Initializing Accumulator Variable',
          wrongCode: `int eval(poly_t* ptr_poly, int x) {
    node_t* pres = ptr_poly->head_;
    int res; // Uninitialized
    while(pres != NULL) { res += val(&pres->term_, x); pres = pres->next_; }
    return res;
}`,
          correctCode: `int eval(poly_t* ptr_poly, int x) {
    node_t* pres = ptr_poly->head_;
    int res = 0; // Initialized to zero
    while(pres != NULL) { res += val(&pres->term_, x); pres = pres->next_; }
    return res;
}`,
          explanation: 'In C, local variables like res contain garbage values if not explicitly initialized. Adding to an uninitialized variable leads to completely unpredictable results.',
          consequence: 'The function will return random incorrect numbers instead of the evaluated mathematical sum.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t8-s3-ic1',
          title: 'Horner\'s Method for Evaluation',
          content: 'While this list traversal takes O(N), calculating pow(x, expo) can be expensive. Horner\'s method is a more optimal way to evaluate polynomials mathematically in O(degree) without explicitly calculating powers, though it typically assumes an array format without missing terms.',
          relatedTopicIds: [],
          frequency: 'rare'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t8-s3-cp1',
          title: 'Evaluation Accumulation',
          description: 'Ensure correct understanding of the summing logic.',
          criteria: [
            'The result variable must be initialized to 0.',
            'val() handles exactly one term.',
            'eval() loops over every node and adds val() to the result.'
          ],
          topicId: 'u1-t8'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t8-s3-rc1',
          front: 'What does the val function compute for a given term_t and variable x?',
          back: 'It computes the numerical value of that single term: coeff * x^expo.',
          topicId: 'u1-t8',
          tags: ['evaluation', 'term']
        }
      ]
    },
    {
      id: 'u1-t8-s4',
      title: 'Polynomial Copy',
      slug: 'polynomial-copy',
      description: 'Copying a polynomial requires creating a completely independent duplicate of the original structure. A simple pointer assignment (shallow copy) is insufficient; if both polynomials share the same nodes, modifying one will instantly modify the other, causing data corruption in mathematical operations.\n\nThe copy_poly function performs a deep copy by iterating through the original linked list and creating an entirely new node for each existing node. It maintains two pointers: pres for traversing the source polynomial, and pres_new for constructing the destination polynomial.\n\nThe logic requires handling the very first node as a special case to set the destination\'s head_ pointer. For all subsequent nodes, we link the newly created node to the next_ pointer of the previously created node, effectively chaining them together in the same descending exponent order.',
      keyPoints: [
        'A deep copy creates new nodes with identical coefficients and exponents.',
        'Shallow copying only copies the head pointer, linking both polynomials to the same nodes.',
        'Two pointers traverse synchronously: pres reads the source, pres_new builds the copy.',
        'The first node is handled specially to initialize the destination\'s head pointer.',
        'Subsequent nodes are appended by updating the next_ pointer of the previously copied node.'
      ],
      codeExamples: [
        {
          id: 'u1-t8-s4-ex1',
          title: 'Deep Copying a Polynomial',
          code: `#include <stdio.h>
#include <stdlib.h>
#include "poly.h"

// Helper function to create a standalone node
node_t* create_node(int coeff, int expo) {
    node_t* temp = (node_t*)malloc(sizeof(node_t));
    set_term(&temp->term_, coeff, expo);
    temp->next_ = NULL;
    return temp;
}

void copy_poly(poly_t* ptr_poly_new, poly_t* ptr_poly) {
    node_t* pres = ptr_poly->head_;
    node_t* pres_new = ptr_poly_new->head_;
    
    // Handle the first node (sets the head of the new polynomial)
    if(pres != NULL) {
        node_t* temp = create_node(pres->term_.coeff_, pres->term_.expo_);
        ptr_poly_new->head_ = temp;
        pres_new = temp;
        pres = pres->next_;
    }
    
    // Handle all subsequent nodes
    while(pres != NULL) {
        node_t* temp = create_node(pres->term_.coeff_, pres->term_.expo_);
        pres_new->next_ = temp;
        pres_new = temp;
        pres = pres->next_;
    }
}

int main() {
    poly_t p1, p2;
    init_poly(&p1);
    init_poly(&p2); // Destination must be initialized
    
    insert(&p1, 5, 2);
    insert(&p1, 4, 6);
    
    printf("Original: ");
    disp(&p1);
    
    copy_poly(&p2, &p1);
    
    printf("Copied:   ");
    disp(&p2);
    
    return 0;
}`,
          language: 'c',
          explanation: 'The function traverses the source polynomial, allocating a new node for each term. The first node sets the head_, and the loop chains the rest. Because we deep copy, modifying p2 later will have absolutely no effect on p1.',
          expectedOutput: 'Original: 4x^6 + 5x^2 \nCopied:   4x^6 + 5x^2 \n',
          lineBreakdown: [
            { lineNumber: 19, code: 'ptr_poly_new->head_ = temp; pres_new = temp;', explanation: 'Secures the head pointer of the new polynomial and sets up pres_new to track the end of the new list.' },
            { lineNumber: 27, code: 'pres_new->next_ = temp; pres_new = temp;', explanation: 'Links the new node to the growing chain, then advances the tail pointer.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t8-s4-cm1',
          title: 'Shallow Copying the Polynomial',
          wrongCode: `void copy_poly(poly_t* ptr_poly_new, poly_t* ptr_poly) {
    // This is a shallow copy!
    ptr_poly_new->head_ = ptr_poly->head_;
}`,
          correctCode: `// See full deep copy implementation using create_node and traversal loop`,
          explanation: 'Simply assigning the head pointer makes both polynomial wrappers point to the exact same chain of nodes. Modifying, freeing, or differentiating one will ruin the state of the other.',
          consequence: 'Shared state leading to data corruption and potential double-free crashes.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t8-s4-ic1',
          title: 'Cloning Linked Lists',
          content: 'Copying a polynomial is fundamentally the standard "Clone a Linked List" interview problem without random pointers. Understanding how to manage the head case separately from the iterative tail-appending case is a core linked list skill.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t8-s4-cp1',
          title: 'Deep Copy Mechanics',
          description: 'Identify the structural differences between deep and shallow copies.',
          criteria: [
            'A deep copy requires a malloc for every node in the source list.',
            'The head of the new list is handled as a special case.',
            'pres_new always points to the last node added to the copy.'
          ],
          topicId: 'u1-t8'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t8-s4-rc1',
          front: 'Why must we handle the first node separately when copying a linked list polynomial?',
          back: 'Because the very first node needs to update the head_ pointer of the poly_t structure, whereas subsequent nodes only update the next_ pointer of the previous node.',
          topicId: 'u1-t8',
          tags: ['linked list', 'pointers']
        }
      ]
    },
    {
      id: 'u1-t8-s5',
      title: 'Polynomial Differentiation',
      slug: 'polynomial-differentiation',
      description: 'Differentiating a polynomial utilizes the standard calculus power rule: the derivative of a term coeff * x^expo is (coeff * expo) * x^(expo - 1). Applying this rule to every term in the polynomial yields its full mathematical derivative.\n\nThe diff_poly function follows an architectural pattern nearly identical to copy_poly. It traverses the original polynomial and constructs an entirely new polynomial representing the derivative. The critical difference lies solely in the values passed to create_node: instead of passing the same coefficient and exponent, we pass the multiplied coefficient and the decremented exponent.\n\nSpecial care must be taken with constant terms where the exponent is 0 (e.g., 3x^0). The power rule natively handles this: the new coefficient becomes 3 * 0 = 0, and the new exponent becomes 0 - 1 = -1. The resulting term is 0x^(-1). While mathematically 0, this term physically exists in the list unless explicit cleanup logic is added. Our ADT correctly generates this zero term.',
      keyPoints: [
        'Differentiation applies the power rule: d/dx(cx^n) = (c*n)x^(n-1).',
        'Structurally, the diff_poly function is identical to copy_poly.',
        'A new node is created for every original node, ensuring a deep copy of the derived structure.',
        'The arguments to create_node are (coeff * expo) and (expo - 1).',
        'Constant terms (expo=0) result in terms with a coefficient of 0 and exponent of -1.'
      ],
      codeExamples: [
        {
          id: 'u1-t8-s5-ex1',
          title: 'Differentiating a Polynomial',
          code: `#include <stdio.h>
#include <stdlib.h>
#include "poly.h"

// Assuming create_node exists as shown in copy_poly

void diff_poly(poly_t* ptr_poly_new, poly_t* ptr_poly) {
    node_t* pres = ptr_poly->head_;
    node_t* pres_new = ptr_poly_new->head_;
    
    if(pres != NULL) {
        node_t* temp = create_node(
            pres->term_.coeff_ * pres->term_.expo_,  // New coeff
            pres->term_.expo_ - 1                    // New expo
        );
        ptr_poly_new->head_ = temp;
        pres_new = temp;
        pres = pres->next_;
    }
    
    while(pres != NULL) {
        node_t* temp = create_node(
            pres->term_.coeff_ * pres->term_.expo_,  // New coeff
            pres->term_.expo_ - 1                    // New expo
        );
        pres_new->next_ = temp;
        pres_new = temp;
        pres = pres->next_;
    }
}

int main() {
    poly_t original, derivative;
    init_poly(&original);
    init_poly(&derivative);
    
    // 4x^6 + 5x^2 + 3x^0
    insert(&original, 4, 6);
    insert(&original, 5, 2);
    insert(&original, 3, 0);
    
    printf("Original: ");
    disp(&original);
    
    diff_poly(&derivative, &original);
    
    // Derivative: 24x^5 + 10x^1 + 0x^-1
    printf("Derivative: ");
    disp(&derivative);
    
    return 0;
}`,
          language: 'c',
          explanation: 'The function traverses the source polynomial and builds a new polynomial just like copy_poly, but applies the mathematical derivative formula when generating each new node.',
          expectedOutput: 'Original: 4x^6 + 5x^2 + 3x^0 \nDerivative: 24x^5 + 10x^1 + 0x^-1 \n',
          lineBreakdown: [
            { lineNumber: 13, code: 'pres->term_.coeff_ * pres->term_.expo_', explanation: 'Multiplies the original coefficient by the original exponent to form the new coefficient.' },
            { lineNumber: 14, code: 'pres->term_.expo_ - 1', explanation: 'Decrements the exponent by 1 according to the power rule.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t8-s5-cm1',
          title: 'Mutating the Original Polynomial',
          wrongCode: `void diff_poly(poly_t* p) {
    node_t* pres = p->head_;
    while(pres != NULL) {
        pres->term_.coeff_ *= pres->term_.expo_;
        pres->term_.expo_ -= 1;
        pres = pres->next_;
    }
}`,
          correctCode: `// See full diff_poly implementation which builds a separate derivative list`,
          explanation: 'While mutating in-place mathematically works, it destroys the original polynomial. In mathematical applications, you usually need to retain the original expression alongside its derivative (e.g., f(x) and f\'(x)).',
          consequence: 'The original polynomial is irreparably transformed into its derivative.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t8-s5-ic1',
          title: 'Handling Zero Coefficients',
          content: 'A robust differentiation implementation in production would explicitly filter out terms where the new coefficient becomes 0 (e.g., from constants). In interviews, identifying this edge case and proposing a conditional if (new_coeff != 0) { append_node(); } demonstrates strong attention to detail.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t8-s5-cp1',
          title: 'Power Rule Logic',
          description: 'Ensure correct application of the mathematical derivative inside the loop.',
          criteria: [
            'The new coefficient is the product of the old coefficient and exponent.',
            'The new exponent is strictly the old exponent minus one.',
            'The structure iterates cleanly without skipping terms.'
          ],
          topicId: 'u1-t8'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t8-s5-rc1',
          front: 'What happens mathematically to the constant term 3x^0 when our diff_poly function runs?',
          back: 'It creates a node with coefficient 0 (3*0) and exponent -1 (0-1), printing as 0x^-1.',
          topicId: 'u1-t8',
          tags: ['math', 'edge-case']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t8-q1',
      type: 'mcq',
      topicId: 'u1-t8',
      difficulty: 'beginner',
      question: 'How is the term_ structure stored within the node_t structure in our implementation?',
      options: [
        'A) As a dynamically allocated pointer',
        'B) As an embedded struct',
        'C) As an integer ID',
        'D) As an array of values'
      ],
      correctAnswer: 'B) As an embedded struct',
      explanation: 'The term_t is embedded directly within the node_t struct (struct node { term_t term_; ... }), which avoids an extra level of pointers and mallocs.',
      tags: ['struct', 'memory']
    },
    {
      id: 'u1-t8-q2',
      type: 'mcq',
      topicId: 'u1-t8',
      difficulty: 'beginner',
      question: 'In what order does the polynomial linked list store its terms?',
      options: [
        'A) Ascending exponent order',
        'B) Descending exponent order',
        'C) Order of insertion',
        'D) Ascending coefficient order'
      ],
      correctAnswer: 'B) Descending exponent order',
      explanation: 'The insert function uses compare_exponents to guarantee that terms are always sorted in strictly descending order of their exponents, making math operations easier.',
      tags: ['ordering', 'list']
    },
    {
      id: 'u1-t8-q3',
      type: 'fill-blank',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      question: 'The compare_exponents function returns a value > 0 when the left term has a ________ exponent than the right term.',
      correctAnswer: 'higher',
      explanation: 'Returning a positive value indicates the left term is mathematically larger in degree than the right term.',
      tags: ['logic', 'comparison']
    },
    {
      id: 'u1-t8-q4',
      type: 'mcq',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      question: 'What is the primary function of the eval() operation?',
      options: [
        'A) To calculate the derivative of the polynomial',
        'B) To substitute x with a given number and compute the total sum',
        'C) To count the number of terms in the polynomial',
        'D) To find the root of the polynomial equation'
      ],
      correctAnswer: 'B) To substitute x with a given number and compute the total sum',
      explanation: 'Evaluation means replacing the variable x with a specific numerical value and computing the sum of all terms.',
      tags: ['math', 'evaluation']
    },
    {
      id: 'u1-t8-q5',
      type: 'predict-output',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      question: 'If you insert the terms {coeff=5, expo=2}, {coeff=4, expo=6}, and {coeff=3, expo=0} into a new polynomial, in what order will disp() print them?',
      correctAnswer: '4x^6 + 5x^2 + 3x^0',
      explanation: 'The linked list enforces descending exponent order, so 6 comes first, then 2, then 0, regardless of the order they were inserted.',
      tags: ['insertion', 'output']
    },
    {
      id: 'u1-t8-q6',
      type: 'mcq',
      topicId: 'u1-t8',
      difficulty: 'beginner',
      question: 'According to the power rule used in diff_poly, what does 5x^2 become?',
      options: [
        'A) 5x^1',
        'B) 10x^1',
        'C) 10x^2',
        'D) 2x^5'
      ],
      correctAnswer: 'B) 10x^1',
      explanation: 'The new coefficient is 5 * 2 = 10, and the new exponent is 2 - 1 = 1.',
      tags: ['math', 'derivative']
    },
    {
      id: 'u1-t8-q7',
      type: 'true-false',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      question: 'The copy_poly function creates entirely new nodes in memory to ensure a deep copy.',
      correctAnswer: 'true',
      explanation: 'A deep copy creates independent node allocations so modifying the copy does not alter the original polynomial.',
      tags: ['memory', 'copy']
    },
    {
      id: 'u1-t8-q8',
      type: 'mcq',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      question: 'What happens to a constant term like 3x^0 when processed by our diff_poly function without explicit zero-filtering?',
      options: [
        'A) It is removed from the linked list entirely',
        'B) It remains 3x^0',
        'C) It becomes 0x^-1',
        'D) The program crashes with a division by zero error'
      ],
      correctAnswer: 'C) It becomes 0x^-1',
      explanation: 'The rule multiplies coeff*expo (3*0 = 0) and subtracts 1 from expo (0-1 = -1), resulting in 0x^-1.',
      tags: ['edge-case', 'derivative']
    },
    {
      id: 'u1-t8-q9',
      type: 'predict-output',
      topicId: 'u1-t8',
      difficulty: 'advanced',
      question: 'Given the polynomial 5x^2 + 4x^6 + 3x^0, what is the output of eval() at x=1?',
      correctAnswer: '12',
      explanation: 'At x=1, the values are 5(1)^2 + 4(1)^6 + 3(1)^0 = 5 + 4 + 3 = 12.',
      tags: ['evaluation', 'math']
    },
    {
      id: 'u1-t8-q10',
      type: 'spot-bug',
      topicId: 'u1-t8',
      difficulty: 'advanced',
      question: 'Identify the issue in this copy implementation: void copy_poly(poly_t* new_p, poly_t* p) { new_p->head_ = p->head_; }',
      correctAnswer: 'This creates a shallow copy where both polynomials share the exact same linked list nodes.',
      explanation: 'Assigning the head pointer does not allocate new memory. Modifying one polynomial will instantly corrupt the other because they point to the same physical nodes in memory.',
      tags: ['pointers', 'memory']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t8-p1',
      title: 'Trace Polynomial Insertion',
      topicId: 'u1-t8',
      difficulty: 'beginner',
      problemStatement: 'Trace the state of the linked list as you insert the following terms in order: {coeff=5, expo=2}, {coeff=4, expo=6}, and {coeff=3, expo=0}. Show the list contents after each step.',
      constraints: ['List must maintain descending exponent order'],
      sampleInput: 'insert(5,2) -> insert(4,6) -> insert(3,0)',
      sampleOutput: 'Step 1: 5x^2\nStep 2: 4x^6 -> 5x^2\nStep 3: 4x^6 -> 5x^2 -> 3x^0',
      hints: [
        'First insertion always goes to the head.',
        'Compare exponents to find the insertion point.',
        'Higher exponents push existing terms down the list.'
      ],
      solution: `// This is a theoretical trace problem. No code required.
// Step 1: insert(5,2). List is empty. Head -> [5, 2]
// Step 2: insert(4,6). 6 > 2. Insert before [5,2]. Head -> [4, 6] -> [5, 2]
// Step 3: insert(3,0). 0 < 6, 0 < 2. Traverse to end. Insert at tail. Head -> [4, 6] -> [5, 2] -> [3, 0]`,
      solutionExplanation: 'Because the list must be ordered descending, 4x^6 jumps to the front upon insertion, and 3x^0 naturally settles at the tail.',
      dryRun: [
        { step: 1, line: 0, variables: { term: '5x^2', list: '5x^2' }, output: '', explanation: 'Initial insert at empty head' },
        { step: 2, line: 0, variables: { term: '4x^6', list: '4x^6 -> 5x^2' }, output: '', explanation: '6 > 2, inserts at head' },
        { step: 3, line: 0, variables: { term: '3x^0', list: '4x^6 -> 5x^2 -> 3x^0' }, output: '', explanation: 'Traverses to end and appends' }
      ],
      tags: ['trace', 'insertion']
    },
    {
      id: 'u1-t8-p2',
      title: 'Free Polynomial Memory',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      problemStatement: 'Implement a function void free_poly(poly_t* ptr_poly) that traverses the polynomial linked list and explicitly frees every node, preventing memory leaks, and finally sets head_ to NULL.',
      constraints: ['Must free all allocated nodes', 'Must leave the poly_t struct in a valid empty state'],
      sampleInput: 'A polynomial with 3 terms',
      sampleOutput: 'Memory freed successfully, head is NULL',
      hints: [
        'You need a temporary pointer to hold the next node before freeing the current node.',
        'Do not access pres->next_ after you have called free(pres)!'
      ],
      solution: `void free_poly(poly_t* ptr_poly) {
    node_t* pres = ptr_poly->head_;
    node_t* temp = NULL;
    
    while(pres != NULL) {
        temp = pres->next_;  // Save next pointer
        free(pres);          // Free current node
        pres = temp;         // Advance
    }
    
    ptr_poly->head_ = NULL;  // Reset polynomial to empty state
}`,
      solutionExplanation: 'The function safely traverses the list. By caching the next_ pointer in temp, we ensure we don\'t dereference freed memory. Setting head_ to NULL at the end leaves the structure ready for reuse.',
      dryRun: [
        { step: 1, line: 6, variables: { pres: 'node 1', temp: 'node 2' }, output: '', explanation: 'Store reference to next node' },
        { step: 2, line: 7, variables: { pres: 'freed' }, output: '', explanation: 'Free current node safely' },
        { step: 3, line: 8, variables: { pres: 'node 2' }, output: '', explanation: 'Move forward using cached pointer' }
      ],
      tags: ['memory', 'free', 'linked-list']
    },
    {
      id: 'u1-t8-p3',
      title: 'Polynomial Addition',
      topicId: 'u1-t8',
      difficulty: 'intermediate',
      problemStatement: 'Implement void add_poly(poly_t* result, poly_t* p1, poly_t* p2) that mathematically adds two polynomials. Assume the result polynomial is initialized but empty.',
      constraints: ['Do not mutate p1 or p2', 'Result must be correctly ordered'],
      sampleInput: 'p1 = 3x^2 + 2x^0, p2 = 4x^3 + 5x^2',
      sampleOutput: 'result = 4x^3 + 8x^2 + 2x^0',
      hints: [
        'Traverse both p1 and p2 simultaneously.',
        'If exponents match, add coefficients and insert.',
        'If one exponent is higher, insert it and advance only that list.',
        'Don\'t forget to copy remaining terms if one list finishes before the other.'
      ],
      solution: `void add_poly(poly_t* result, poly_t* p1, poly_t* p2) {
    node_t* t1 = p1->head_;
    node_t* t2 = p2->head_;
    
    while (t1 != NULL && t2 != NULL) {
        if (t1->term_.expo_ == t2->term_.expo_) {
            insert(result, t1->term_.coeff_ + t2->term_.coeff_, t1->term_.expo_);
            t1 = t1->next_;
            t2 = t2->next_;
        } else if (t1->term_.expo_ > t2->term_.expo_) {
            insert(result, t1->term_.coeff_, t1->term_.expo_);
            t1 = t1->next_;
        } else {
            insert(result, t2->term_.coeff_, t2->term_.expo_);
            t2 = t2->next_;
        }
    }
    
    // Copy remaining elements
    while (t1 != NULL) {
        insert(result, t1->term_.coeff_, t1->term_.expo_);
        t1 = t1->next_;
    }
    while (t2 != NULL) {
        insert(result, t2->term_.coeff_, t2->term_.expo_);
        t2 = t2->next_;
    }
}`,
      solutionExplanation: 'This mimics the merge phase of Merge Sort. Because both input lists are already sorted descending, we can compare their head elements, insert the larger one (or combine them if equal), and advance the pointers. Any leftover elements are flushed at the end.',
      dryRun: [
        { step: 1, line: 10, variables: { t1: '3x^2', t2: '4x^3' }, output: '', explanation: 't2 has higher exponent, insert 4x^3, advance t2' },
        { step: 2, line: 6, variables: { t1: '3x^2', t2: '5x^2' }, output: '', explanation: 'Exponents match. Insert sum 8x^2, advance both' },
        { step: 3, line: 20, variables: { t1: '2x^0', t2: 'NULL' }, output: '', explanation: 't2 is empty, flush remaining t1 terms' }
      ],
      tags: ['math', 'merge', 'addition']
    },
    {
      id: 'u1-t8-p4',
      title: 'Second Derivative',
      topicId: 'u1-t8',
      difficulty: 'advanced',
      problemStatement: 'Given the polynomial 4x^6 + 2x^4 + 5x^2 + 3, trace mathematically what the first and second derivatives look like when generated by our diff_poly function.',
      constraints: ['Follow the exact behavior of diff_poly, including constant handling'],
      sampleInput: '4x^6 + 2x^4 + 5x^2 + 3x^0',
      sampleOutput: 'D1: 24x^5 + 8x^3 + 10x^1 + 0x^-1, D2: ...',
      hints: [
        'D1 applies the power rule once.',
        'D2 applies the power rule to D1.',
        'Remember that 0x^-1 will become 0x^-2 in the next step.'
      ],
      solution: `// Original: 4x^6 + 2x^4 + 5x^2 + 3x^0
// First Derivative (D1):
// 4*6 x^5 = 24x^5
// 2*4 x^3 = 8x^3
// 5*2 x^1 = 10x^1
// 3*0 x^-1 = 0x^-1
// D1 Output: 24x^5 + 8x^3 + 10x^1 + 0x^-1

// Second Derivative (D2), applying diff_poly on D1:
// 24*5 x^4 = 120x^4
// 8*3 x^2 = 24x^2
// 10*1 x^0 = 10x^0
// 0*-1 x^-2 = 0x^-2
// D2 Output: 120x^4 + 24x^2 + 10x^0 + 0x^-2`,
      solutionExplanation: 'Our simple diff_poly blindly applies the power rule. The constant term 3x^0 decays to 0x^-1, and on the next pass decays further to 0x^-2. Mathematically they are 0, but structurally they remain in the linked list.',
      dryRun: [
        { step: 1, line: 0, variables: { orig: '3x^0' }, output: '', explanation: 'Original constant term' },
        { step: 2, line: 0, variables: { d1: '0x^-1' }, output: '', explanation: 'First derivative produces zero coefficient' },
        { step: 3, line: 0, variables: { d2: '0x^-2' }, output: '', explanation: 'Second derivative continues negative exponents with zero coeff' }
      ],
      tags: ['math', 'trace', 'calculus']
    }
  ]
};
