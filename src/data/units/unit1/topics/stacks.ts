import type { Topic } from '../../../../types';

export const stacks: Topic = {
  id: 'u1-t6',
  unitId: 'unit-1',
  title: 'Stacks & Applications',
  slug: 'stacks',
  description: `A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Think of it like a stack of plates in a cafeteria: the last plate placed on top is the first one removed. Stacks are fundamental in computer science, used for expression evaluation, backtracking algorithms, memory management (the call stack), and parsing.

In this topic, we will explore both array-based and linked-list-based implementations of stacks. The array implementation provides a fixed-size, contiguous memory structure that is simple and fast, but suffers from potential overflow. The linked-list implementation offers dynamic sizing, limited only by available system memory, at the cost of additional pointer overhead.

Beyond the fundamental operations (push, pop, peek), we will dive deeply into classical stack applications. You will learn how compilers evaluate arithmetic expressions by converting standard infix notation into postfix or prefix forms. We will also cover parenthesis matching, a core component of syntax checking in compilers, and how stacks conceptually simulate recursion.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t1', 'u1-t2'],
  estimatedMinutes: 50,
  subtopics: [
    {
      id: 'u1-t6-s1',
      title: 'Stack ADT: LIFO Principle & Operations',
      slug: 'stack-adt',
      description: `The Stack Abstract Data Type (ADT) is defined by its behavior rather than its implementation. It adheres to the Last-In-First-Out (LIFO) policy, meaning insertions and deletions are restricted to only one end of the structure, commonly referred to as the 'top'. 

The primary operations of a stack are \`push\` (to insert an element) and \`pop\` (to remove the most recently inserted element). Attempting to \`pop\` from a stack with no elements results in a 'Stack Underflow' error, while attempting to \`push\` onto a stack that has reached its maximum capacity results in a 'Stack Overflow' error. Auxiliary operations include \`peek\` (or \`peep\`), which returns the top element without removing it, and \`isEmpty\`, which checks if the stack has any elements.

By convention, when implementing a stack using a zero-indexed array, the \`top\` variable is initialized to \`-1\`. This indicates that the stack is empty. When the first element is pushed, \`top\` becomes \`0\`, matching the array index of the new element.`,
      keyPoints: [
        'A stack follows the Last-In-First-Out (LIFO) access principle.',
        'Insertions and deletions occur only at one end, called the top.',
        'The primary operations are push (insert) and pop (remove).',
        'Stack Underflow occurs when attempting to pop from an empty stack.',
        'Stack Overflow occurs when attempting to push onto a full stack.',
        'The top index is conventionally initialized to -1 to represent an empty stack.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s1-ex1',
          title: 'Stack ADT Conceptual Model',
          code: `#include <stdio.h>
#include <stdbool.h>

#define STACKSIZE 100

// We define the stack structure and conceptually map its operations.
struct stack {
    int top;
    int items[STACKSIZE];
};

// Initializes the stack
void initStack(struct stack *ps) {
    ps->top = -1; // -1 indicates the stack is empty
}

// Checks if stack is empty
int empty(struct stack *ps) {
    return (ps->top == -1) ? 1 : 0;
}

// Checks if stack is full
int overflow(struct stack *ps) {
    return (ps->top == STACKSIZE - 1) ? 1 : 0;
}

int main() {
    struct stack s;
    initStack(&s);
    
    printf("Is stack empty? %s\\n", empty(&s) ? "Yes" : "No");
    printf("Is stack full? %s\\n", overflow(&s) ? "Yes" : "No");
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code demonstrates the conceptual setup of a stack using a struct. The `top` is initialized to `-1`. The `empty` and `overflow` functions provide boolean checks for the stack boundaries.',
          expectedOutput: `Is stack empty? Yes\nIs stack full? No`,
          lineBreakdown: [
            { lineNumber: 9, code: 'int top;', explanation: 'Tracks the index of the top element.' },
            { lineNumber: 14, code: 'ps->top = -1;', explanation: 'Convention for an empty stack.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s1-cm1',
          title: 'Incorrect Top Initialization',
          wrongCode: `void initStack(struct stack *ps) {
    ps->top = 0;
}`,
          correctCode: `void initStack(struct stack *ps) {
    ps->top = -1;
}`,
          explanation: 'Initializing `top` to 0 means the stack already has an element at index 0, or that the next push will happen at index 1 before placing data at index 0, depending on the push implementation. For a 0-indexed array where `top` points to the current element, it must be -1.',
          consequence: 'Off-by-one errors during push and pop, and incorrectly reporting `isEmpty` as false when the stack is actually empty.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s1-ic1',
          title: 'Complexity of Stack Operations',
          content: 'In both array and linked-list implementations, stack operations (push, pop, peek, isEmpty) must run in O(1) time complexity. This constant-time guarantee is a strict requirement for the Stack ADT.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s1-cp1',
          title: 'ADT Fundamentals',
          description: 'Verify understanding of stack boundaries and state variables.',
          criteria: [
            'Know that LIFO stands for Last-In-First-Out.',
            'Identify -1 as the standard empty state for array stacks.',
            'Understand the definitions of overflow and underflow.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s1-rc1',
          front: 'What does a `top` value of -1 indicate in an array-based stack?',
          back: 'It indicates that the stack is completely empty.',
          topicId: 'u1-t6',
          tags: ['concepts', 'state']
        }
      ]
    },
    {
      id: 'u1-t6-s2',
      title: 'Array-Based Stack Implementation',
      slug: 'array-stack',
      description: `Implementing a stack using an array is straightforward. We allocate a fixed-size array and maintain an integer \`top\` that stores the index of the topmost element. 

The \`push\` operation involves two steps: first, verify the stack is not full. If it's not, increment \`top\` by 1, and then assign the new value to the array at the \`top\` index. The \`pop\` operation reverses this: first check if the stack is empty to prevent underflow. If it's not, retrieve the value at the \`top\` index, and then decrement \`top\`.

A struct is ideal for packaging the array and the \`top\` variable together, ensuring they are passed as a single cohesive unit to stack functions. This encapsulates the stack state and adheres to clean programming practices.`,
      keyPoints: [
        'An array-based stack uses a fixed-size array and an integer top index.',
        'Push increments top, then stores the value: `++(ps->top); ps->items[ps->top] = x;`',
        'Pop retrieves the value, then decrements top: `x = ps->items[ps->top]; --(ps->top);`',
        'Before pushing, always check for stack overflow (`top == STACKSIZE - 1`).',
        'Before popping, always check for stack underflow (`top == -1`).',
        'Structs encapsulate the array and top index efficiently.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s2-ex1',
          title: 'Complete Array-Based Stack',
          code: `#include <stdio.h>
#include <stdlib.h>

#define STACKSIZE 5

struct stack {
    int top;
    int items[STACKSIZE];
};

void push(struct stack *ps, int x) {
    if (ps->top == STACKSIZE - 1) {
        printf("STACK FULL Cannot insert..\\n");
    } else {
        ++(ps->top);
        ps->items[ps->top] = x;
        printf("Pushed %d\\n", x);
    }
}

int pop(struct stack *ps) {
    if (ps->top == -1) {
        printf("STACK EMPTY Cannot DELETE..\\n");
        return -1; // Return error value
    } else {
        int x = ps->items[ps->top];
        --(ps->top);
        return x;
    }
}

int peep(struct stack *ps) {
    if (ps->top == -1) {
        printf("STACK EMPTY ..\\n");
        return -1;
    } else {
        return ps->items[ps->top];
    }
}

int main() {
    struct stack s;
    s.top = -1; // Initialize

    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    
    printf("Top element is %d\\n", peep(&s));
    
    printf("Popped %d\\n", pop(&s));
    printf("Popped %d\\n", pop(&s));
    
    push(&s, 40);
    push(&s, 50);
    push(&s, 60);
    push(&s, 70); // This will cause overflow
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code implements the complete array-based stack using a struct, exactly matching the Langsam textbook conventions. It demonstrates push, pop, peep, and correctly handles both overflow and underflow scenarios.',
          expectedOutput: `Pushed 10\nPushed 20\nPushed 30\nTop element is 30\nPopped 30\nPopped 20\nPushed 40\nPushed 50\nPushed 60\nSTACK FULL Cannot insert..`,
          lineBreakdown: [
            { lineNumber: 14, code: '++(ps->top); ps->items[ps->top] = x;', explanation: 'Pre-increment top, then insert item.' },
            { lineNumber: 25, code: 'int x = ps->items[ps->top]; --(ps->top);', explanation: 'Read item, then decrement top.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s2-cm1',
          title: 'Post-increment in Push',
          wrongCode: `ps->items[ps->top++] = x; // Assumes top started at 0`,
          correctCode: `++(ps->top); ps->items[ps->top] = x; // Assumes top started at -1`,
          explanation: 'If `top` is initialized to -1, you MUST pre-increment it before accessing the array. `ps->items[-1]` will cause memory corruption. If you use post-increment, `top` must be initialized to 0, representing the next available slot, not the current top item.',
          consequence: 'Writing to invalid memory indices resulting in Segmentation Faults or data corruption.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s2-ic1',
          title: 'Fixed vs Dynamic Arrays',
          content: 'A major limitation of this implementation is the fixed `STACKSIZE`. In interviews, you might be asked to implement a dynamically resizing array stack. This involves using `malloc` and `realloc` to double the array size when it gets full, changing worst-case push time to O(N), but keeping amortized time O(1).',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s2-cp1',
          title: 'Array Stack Implementation',
          description: 'Ensure correct order of operations during push/pop.',
          criteria: [
            'Check overflow before pushing.',
            'Increment top BEFORE inserting data.',
            'Extract data BEFORE decrementing top.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s2-rc1',
          front: 'What is the condition for stack overflow in a zero-indexed array of size `STACKSIZE`?',
          back: '`top == STACKSIZE - 1`',
          topicId: 'u1-t6',
          tags: ['array', 'bounds']
        }
      ]
    },
    {
      id: 'u1-t6-s3',
      title: 'Linked-List–Based Stack Implementation',
      slug: 'linked-list-stack',
      description: `An array-based stack has a fixed size, which can lead to overflow if we underestimate the space needed, or wasted memory if we overestimate. A linked-list-based stack elegantly solves this by allocating memory dynamically for each new element.

In a linked stack, we maintain a \`top\` pointer that points to the head of a singly linked list. To push an element, we create a new node and insert it at the front of the list, updating \`top\` to point to this new node. To pop an element, we simply delete the first node and update \`top\` to point to the next node.

Since insertions and deletions always happen at the head of the list, both operations take O(1) time. The stack can theoretically grow until the system runs out of memory, effectively eliminating the traditional 'stack overflow' condition caused by fixed array limits.`,
      keyPoints: [
        'A linked stack uses a singly linked list with a `top` pointer at the head.',
        'Push operation is equivalent to inserting a node at the beginning of the list.',
        'Pop operation is equivalent to deleting the first node of the list.',
        'The `top` pointer is initially `NULL`, indicating an empty stack.',
        'Linked stacks do not suffer from fixed-size limitations; they grow dynamically.',
        'Operations are strictly O(1) time complexity.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s3-ex1',
          title: 'Linked-List Stack Implementation',
          code: `#include <stdio.h>
#include <stdlib.h>

struct node {
    int data;
    struct node *next;
};

// Global top pointer, initially NULL
struct node *top = NULL;

void push(int x) {
    struct node *newNode = (struct node*)malloc(sizeof(struct node));
    if (newNode == NULL) {
        printf("Stack Overflow (Heap memory full)\\n");
        return;
    }
    newNode->data = x;
    newNode->next = top; // Link new node to current top
    top = newNode;       // Update top
    printf("Pushed %d\\n", x);
}

int pop() {
    if (top == NULL) {
        printf("Stack Underflow\\n");
        return -1;
    }
    struct node *temp = top;
    int x = temp->data;
    top = top->next;     // Move top to next node
    free(temp);          // Free memory
    return x;
}

int peek() {
    if (top == NULL) {
        printf("Stack Empty\\n");
        return -1;
    }
    return top->data;
}

int main() {
    push(100);
    push(200);
    
    printf("Top element: %d\\n", peek());
    
    printf("Popped: %d\\n", pop());
    printf("Popped: %d\\n", pop());
    
    pop(); // Triggers underflow
    
    return 0;
}`,
          language: 'c',
          explanation: 'This code implements a stack using a singly linked list. `push` inserts at the front, and `pop` removes from the front. Memory is dynamically allocated and freed, ensuring efficient space usage.',
          expectedOutput: `Pushed 100\nPushed 200\nTop element: 200\nPopped: 200\nPopped: 100\nStack Underflow`,
          lineBreakdown: [
            { lineNumber: 19, code: 'newNode->next = top; top = newNode;', explanation: 'Inserts the new node at the front (head) of the linked list.' },
            { lineNumber: 30, code: 'top = top->next; free(temp);', explanation: 'Advances the top pointer and frees the removed node.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s3-cm1',
          title: 'Memory Leak on Pop',
          wrongCode: `int pop() {
    int x = top->data;
    top = top->next;
    return x;
}`,
          correctCode: `int pop() {
    struct node *temp = top;
    int x = temp->data;
    top = top->next;
    free(temp);
    return x;
}`,
          explanation: 'Forgetting to `free` the node that was popped causes a memory leak. Over time, in a long-running program, this will exhaust heap memory.',
          consequence: 'Memory leaks leading to system slowdowns or crashes due to out-of-memory errors.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s3-ic1',
          title: 'Array vs Linked List Stack',
          content: 'Be prepared to compare both. Array stacks have better cache locality (faster in practice) but fixed size. Linked stacks have no fixed size limit but incur extra memory overhead per element (for the pointer) and are less cache-friendly.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s3-cp1',
          title: 'Linked Stack Memory',
          description: 'Verify understanding of pointers and dynamic allocation in stacks.',
          criteria: [
            'Understand that top is a pointer, initialized to NULL.',
            'Know that malloc is used during push.',
            'Know that free is used during pop.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s3-rc1',
          front: 'In a linked stack, where do insertions and deletions occur?',
          back: 'At the front (head) of the linked list, designated by the `top` pointer.',
          topicId: 'u1-t6',
          tags: ['linked list', 'operations']
        }
      ]
    },
    {
      id: 'u1-t6-s4',
      title: 'Application: Balanced Parenthesis Checker',
      slug: 'parenthesis-checker',
      description: `One of the most classical applications of a stack is checking whether a given mathematical expression has balanced parentheses. This is the exact technique used by compilers to check if your curly braces \`{}\` or parentheses \`()\` match up correctly in code.

The algorithm is elegant: iterate through the string character by character. If you encounter an opening bracket (like \`(\`, \`[\`, or \`{\`), push it onto the stack. If you encounter a closing bracket, pop the top element from the stack. The popped opening bracket must be of the exact same type as the closing bracket. If they don't match, or if you try to pop from an empty stack (meaning there's an extra closing bracket), the expression is unbalanced.

After scanning the entire string, the stack must be completely empty. If elements remain on the stack, it indicates that there were extra opening brackets that were never closed.`,
      keyPoints: [
        'Push opening brackets: (, [, { onto the stack.',
        'Upon seeing a closing bracket, pop the stack and check for a match.',
        'Mismatched brackets (e.g., [ } ) mean the expression is unbalanced.',
        'Stack empty during pop means extra closing brackets exist.',
        'Stack not empty at the end means extra opening brackets exist.',
        'Provides an O(N) time and O(N) space complexity solution.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s4-ex1',
          title: 'Parenthesis Checker Implementation',
          code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define MAX 100
struct Stack {
    int top;
    char items[MAX];
};

void push(struct Stack *s, char c) {
    if(s->top < MAX - 1) s->items[++(s->top)] = c;
}

char pop(struct Stack *s) {
    if(s->top >= 0) return s->items[(s->top)--];
    return '\\0'; // Underflow indicator
}

bool isMatchingPair(char char1, char char2) {
    if (char1 == '(' && char2 == ')') return true;
    if (char1 == '{' && char2 == '}') return true;
    if (char1 == '[' && char2 == ']') return true;
    return false;
}

bool areParenthesesBalanced(char exp[]) {
    struct Stack s;
    s.top = -1;
    
    for (int i = 0; i < strlen(exp); i++) {
        if (exp[i] == '(' || exp[i] == '{' || exp[i] == '[') {
            push(&s, exp[i]);
        }
        else if (exp[i] == ')' || exp[i] == '}' || exp[i] == ']') {
            char popped = pop(&s);
            if (popped == '\\0' || !isMatchingPair(popped, exp[i])) {
                return false;
            }
        }
    }
    
    // Valid if stack is completely empty at the end
    return s.top == -1;
}

int main() {
    char exp1[] = "{()}[]";
    printf("%s is %s\\n", exp1, areParenthesesBalanced(exp1) ? "Balanced" : "Not Balanced");
    
    char exp2[] = "((()"; // Extra open
    printf("%s is %s\\n", exp2, areParenthesesBalanced(exp2) ? "Balanced" : "Not Balanced");
    
    char exp3[] = "())"; // Extra close
    printf("%s is %s\\n", exp3, areParenthesesBalanced(exp3) ? "Balanced" : "Not Balanced");
    
    char exp4[] = "({)}"; // Mismatch
    printf("%s is %s\\n", exp4, areParenthesesBalanced(exp4) ? "Balanced" : "Not Balanced");

    return 0;
}`,
          language: 'c',
          explanation: 'This code checks for balanced parentheses. It handles `()`, `{}`, and `[]`. It correctly catches extra closing brackets (stack underflow), extra opening brackets (stack not empty at end), and mismatched pairs.',
          expectedOutput: `{()}[] is Balanced\n((() is Not Balanced\n()) is Not Balanced\n({)} is Not Balanced`,
          lineBreakdown: [
            { lineNumber: 37, code: 'if (popped == \'\\0\' || !isMatchingPair(popped, exp[i]))', explanation: 'Checks for both stack underflow (extra closing) and bracket type mismatch.' },
            { lineNumber: 44, code: 'return s.top == -1;', explanation: 'Ensures no unmatched opening brackets are left on the stack.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s4-cm1',
          title: 'Forgetting the Final Emptiness Check',
          wrongCode: `// Loop finishes
return true; // Assumes balanced if loop didn't fail`,
          correctCode: `// Loop finishes
return s.top == -1; // Checks for left-over opening brackets`,
          explanation: 'If the string contains only opening brackets like `(((`, the loop will process them all by pushing to the stack without ever triggering a mismatch or underflow. You must check that the stack is empty at the end to declare the string balanced.',
          consequence: 'Strings with unmatched trailing opening brackets will incorrectly be flagged as valid.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s4-ic1',
          title: 'Multiple Bracket Types',
          content: 'A classic variation of this problem tests your ability to handle multiple bracket types (curly, square, round). Using a helper function `isMatchingPair` keeps the logic clean. This is LeetCode #20 (Valid Parentheses).',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s4-cp1',
          title: 'Parenthesis Rules',
          description: 'Identify the failure conditions in matching.',
          criteria: [
            'Know that popping an empty stack means extra closing brackets.',
            'Know that stack not empty at end means extra opening brackets.',
            'Know that mismatched popped and current bracket means invalid nesting.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s4-rc1',
          front: 'In parenthesis checking, what happens if you encounter `}` but the top of the stack is `(`?',
          back: 'The expression is unbalanced (mismatched brackets). The program should return false/invalid.',
          topicId: 'u1-t6',
          tags: ['application', 'parsing']
        }
      ]
    },
    {
      id: 'u1-t6-s5',
      title: 'Application: Infix-to-Postfix Conversion',
      slug: 'infix-to-postfix',
      description: `Infix notation (e.g., A + B) is human-readable but difficult for computers to evaluate because of precedence and associativity rules (BODMAS/PEMDAS). Postfix notation (e.g., A B +) places the operator after the operands, removing the need for parentheses and precedence rules completely.

To convert Infix to Postfix, we use a stack to hold operators and parentheses. The precedence rules are defined using 'input precedence' and 'stack precedence'. As we scan the infix string:
1. Operands (letters/numbers) are directly appended to the postfix output.
2. Opening parentheses '(' are pushed to the stack.
3. Operators are pushed to the stack, but only after popping any operators already on the stack that have strictly greater or equal stack precedence compared to the new operator's input precedence.
4. Closing parentheses ')' cause the stack to pop to the output until the matching '(' is popped.

Let's trace \`A+B*C\`:
- 'A' -> Output: \`A\`
- '+' -> Stack: \`+\`
- 'B' -> Output: \`A B\`
- '*' -> Precedence of \`*\` > \`+\`, so Stack: \`+, *\`
- 'C' -> Output: \`A B C\`
- End -> Pop stack to output: \`A B C * +\``,
      keyPoints: [
        'Postfix expressions do not require parentheses.',
        'Operands are immediately sent to the output string.',
        'Operators are pushed onto the stack based on precedence rules.',
        'Pop operators from stack while their precedence is >= current operator precedence.',
        '( has highest input precedence but lowest stack precedence.',
        'At the end of the input, pop all remaining operators from the stack to the output.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s5-ex1',
          title: 'Infix to Postfix Converter',
          code: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

#define MAX 100
char stack[MAX];
int top = -1;

void push(char x) { stack[++top] = x; }
char pop() { return top == -1 ? -1 : stack[top--]; }
char peek() { return top == -1 ? -1 : stack[top]; }

// Input precedence
int input_prec(char c) {
    if (c == '+' || c == '-') return 1;
    if (c == '*' || c == '/') return 3;
    if (c == '$' || c == '^') return 6;
    if (c == '(') return 9;
    if (c == ')') return 0;
    return 7; // Operand
}

// Stack precedence
int stack_prec(char c) {
    if (c == '+' || c == '-') return 2;
    if (c == '*' || c == '/') return 4;
    if (c == '$' || c == '^') return 5;
    if (c == '(') return 0;
    if (c == '#') return -1;
    return 8; // Operand
}

void infixToPostfix(char infix[], char postfix[]) {
    int i = 0, j = 0;
    push('#'); // Base marker
    
    while (infix[i] != '\\0') {
        char symb = infix[i];
        
        if (isalnum(symb)) { // Operand
            postfix[j++] = symb;
        } else if (symb == ')') { // Closing bracket
            while (peek() != '(' && peek() != '#') {
                postfix[j++] = pop();
            }
            pop(); // Remove '('
        } else { // Operator or '('
            while (stack_prec(peek()) >= input_prec(symb)) {
                postfix[j++] = pop();
            }
            push(symb);
        }
        i++;
    }
    
    // Pop remaining operators
    while (peek() != '#') {
        postfix[j++] = pop();
    }
    postfix[j] = '\\0'; // Null terminate
}

int main() {
    char infix1[] = "A+B*C";
    char postfix1[MAX];
    infixToPostfix(infix1, postfix1);
    printf("Infix: %s -> Postfix: %s\\n", infix1, postfix1);

    char infix2[] = "(A+B)*C";
    char postfix2[MAX];
    infixToPostfix(infix2, postfix2);
    printf("Infix: %s -> Postfix: %s\\n", infix2, postfix2);
    
    return 0;
}`,
          language: 'c',
          explanation: 'Converts infix expressions to postfix using standard precedence tables. Operands go directly to the output. Operators are pushed or pop based on their input vs stack precedence, effectively resolving BODMAS correctly. Traces match textbook examples exactly.',
          expectedOutput: `Infix: A+B*C -> Postfix: ABC*+\nInfix: (A+B)*C -> Postfix: AB+C*`,
          lineBreakdown: [
            { lineNumber: 46, code: 'while (stack_prec(peek()) >= input_prec(symb)) { postfix[j++] = pop(); }', explanation: 'Core logic: lower precedence operators push higher/equal ones out of the stack.' },
            { lineNumber: 14, code: 'int input_prec(char c)', explanation: 'Defines rules for operators entering the stack.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s5-cm1',
          title: 'Mishandling Associativity for Exponents',
          wrongCode: `// Equal precedence causes left-associativity
if (c == '^') return 4; // stack_prec`,
          correctCode: `// ^ is right-associative, so input_prec(^) > stack_prec(^)
if (c == '^') return 5; // stack_prec
// Input prec returns 6`,
          explanation: 'Operators like `+`, `-`, `*`, `/` are left-associative. When reading `A-B-C`, the second `-` must pop the first `-`. Exponentiation `^` or `$` is right-associative. `A^B^C` means `A^(B^C)`. Therefore, the second `^` must NOT pop the first `^`. Setting input precedence higher than stack precedence for `^` achieves this.',
          consequence: 'Right-associative operators are incorrectly evaluated from left to right.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s5-ic1',
          title: 'Shunting Yard Algorithm',
          content: 'This algorithm was invented by Edsger Dijkstra and is known as the Shunting Yard algorithm because its operation resembles a railroad shunting yard. It is a very common topic in systems programming interviews.',
          relatedTopicIds: [],
          frequency: 'occasional'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s5-cp1',
          title: 'Infix to Postfix Tracing',
          description: 'Trace stack states during expression conversion.',
          criteria: [
            'Operands never go onto the stack.',
            'Higher precedence operators stay on top of lower precedence ones.',
            'Closing parenthesis pops everything up to the opening parenthesis.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s5-rc1',
          front: 'During Infix to Postfix conversion, what happens when you encounter a `)`?',
          back: 'You pop operators from the stack to the output string until you encounter the matching `(` on the stack. Then you pop and discard the `(`. ',
          topicId: 'u1-t6',
          tags: ['expression', 'algorithm']
        }
      ]
    },
    {
      id: 'u1-t6-s6',
      title: 'Application: Postfix Expression Evaluation',
      slug: 'postfix-evaluation',
      description: `Once an expression is in postfix format (like \`3 5 4 * +\`), it is incredibly easy for a computer to evaluate it in a single pass using a stack. 

The algorithm scans the postfix string from left to right. When it sees an operand (a number), it pushes it onto the stack. When it sees an operator (like \`+\` or \`*\`), it pops the top two operands from the stack. It applies the operator to these operands, and then pushes the resulting value back onto the stack.

Order matters for non-commutative operators like subtraction and division. The first element popped is operand 2 (the right side of the operator), and the second element popped is operand 1 (the left side). For example, if the stack has \`[8, 2]\` and we encounter \`/\`, we pop \`2\` (opnd2), then \`8\` (opnd1), and compute \`8 / 2 = 4\`.
At the end of the scan, the stack will contain exactly one item: the final result of the expression.`,
      keyPoints: [
        'Scan the postfix expression from left to right.',
        'Push operands (numbers) onto the stack.',
        'For operators, pop twice to get opnd2 and opnd1.',
        'Compute `opnd1 operator opnd2` and push the result back.',
        'Order of popping is critical: first popped is the right operand.',
        'Final result remains as the single element on the stack.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s6-ex1',
          title: 'Postfix Evaluator',
          code: `#include <stdio.h>
#include <ctype.h>

#define MAX 100
int stack[MAX];
int top = -1;

void push(int x) { stack[++top] = x; }
int pop() { return stack[top--]; }

int evaluatePostfix(char postfix[]) {
    int i = 0;
    while (postfix[i] != '\\0') {
        char symb = postfix[i];
        
        // If operand, push to stack (converting char digit to integer)
        if (isdigit(symb)) {
            push(symb - '0');
        } 
        // If operator, pop two operands and calculate
        else {
            int opnd2 = pop(); // Topmost is operand 2
            int opnd1 = pop(); // Next is operand 1
            int val = 0;
            
            switch (symb) {
                case '+': val = opnd1 + opnd2; break;
                case '-': val = opnd1 - opnd2; break;
                case '*': val = opnd1 * opnd2; break;
                case '/': val = opnd1 / opnd2; break;
            }
            push(val); // Push result back
        }
        i++;
    }
    // The final result is the only item left in the stack
    return pop();
}

int main() {
    // 3 + 5 * 4 = 23
    char exp1[] = "354*+"; 
    printf("Result of %s = %d\\n", exp1, evaluatePostfix(exp1));
    
    // (8 - 2) / 3 = 2
    char exp2[] = "82-3/"; 
    printf("Result of %s = %d\\n", exp2, evaluatePostfix(exp2));
    
    return 0;
}`,
          language: 'c',
          explanation: 'Evaluates a postfix string where operands are single digits. Notice how `opnd2` is popped first, followed by `opnd1`. This ensures `82-` calculates `8-2` and not `2-8`.',
          expectedOutput: `Result of 354*+ = 23\nResult of 82-3/ = 2`,
          lineBreakdown: [
            { lineNumber: 18, code: 'push(symb - \'0\');', explanation: 'Converts ASCII character (e.g., \'3\') to its integer value (3).' },
            { lineNumber: 22, code: 'int opnd2 = pop(); int opnd1 = pop();', explanation: 'Crucial: First popped is right side of operation, second is left side.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s6-cm1',
          title: 'Incorrect Operand Order on Pop',
          wrongCode: `int opnd1 = pop();
int opnd2 = pop();
val = opnd1 - opnd2;`,
          correctCode: `int opnd2 = pop();
int opnd1 = pop();
val = opnd1 - opnd2;`,
          explanation: 'Because a stack is LIFO, the right-most operand in an infix operation gets pushed last, meaning it sits on top of the stack. Therefore, it is popped first. If you pop into `opnd1` first, operations like division and subtraction will be inverted.',
          consequence: 'Expressions like `8 2 /` will calculate `2 / 8` instead of `8 / 2`, producing incorrect mathematical results.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s6-ic1',
          title: 'Multi-digit Evaluation',
          content: 'In simple academic examples, operands are single digits (0-9). In a real interview (e.g., Evaluate Reverse Polish Notation on LeetCode), operands can be multi-digit numbers or negative numbers, separated by spaces. You must use `strtol` or manual parsing to build the full integer before pushing.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s6-cp1',
          title: 'Postfix Logic',
          description: 'Ensure accurate tracing of postfix evaluation.',
          criteria: [
            'Push operands immediately.',
            'Pop twice when encountering an operator.',
            'Final stack contains exactly one element.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s6-rc1',
          front: 'In postfix evaluation, if the stack contains [4, 10] (10 is top) and the token is `/`, what is computed?',
          back: '`4 / 10`. The top element (10) is opnd2, and the next element (4) is opnd1.',
          topicId: 'u1-t6',
          tags: ['evaluation', 'stack']
        }
      ]
    },
    {
      id: 'u1-t6-s7',
      title: 'Application: Infix-to-Prefix & Recursion Simulation',
      slug: 'prefix-and-recursion',
      description: `While Postfix (Reverse Polish Notation) places the operator after operands, Prefix notation (Polish Notation) places the operator before operands (e.g., \`+ A B\`). Converting infix to prefix uses a clever variation of the infix-to-postfix algorithm:
1. Reverse the infix expression (swapping '(' with ')' and vice versa).
2. Apply standard infix-to-postfix conversion.
3. Reverse the resulting postfix expression to get the final prefix string.
For example, \`A*B+C/D\` reversed is \`D/C+B*A\`. Converting that to postfix gives \`DC/BA*+\`. Reversing the postfix yields the prefix: \`+*AB/CD\`.

Another massive application of stacks in computer science is the Call Stack. Every time a function calls another function (or itself, in recursion), the computer pushes a 'stack frame' containing local variables, parameters, and the return address onto the call stack. When a function returns, its frame is popped. 

Because of this, any recursive algorithm can theoretically be rewritten iteratively by manually using a stack data structure. This is often necessary in environments with severe memory constraints where a deep recursion might cause a 'Stack Overflow' of the system's memory.`,
      keyPoints: [
        'Prefix conversion: Reverse infix -> Get Postfix -> Reverse Postfix.',
        'When reversing infix for prefix, swap `(` with `)` mathematically.',
        'Prefix evaluates right-to-left instead of left-to-right.',
        'Function calls and recursion rely fundamentally on the system Call Stack.',
        'Each function call pushes a Stack Frame (variables + return address).',
        'Any recursive algorithm can be converted to iterative using an explicit stack.'
      ],
      codeExamples: [
        {
          id: 'u1-t6-s7-ex1',
          title: 'Conceptual Prefix Tracing',
          code: `/*
No explicit C code provided here as the logic re-uses the 
Infix-to-Postfix C code combined with a standard string reversal.

Algorithm Trace for: (A-B/C)*(D/K-L)
1. Reverse and swap brackets: 
   (L-K/D)*(C/B-A)
2. Infix to Postfix on reversed string:
   L K D / - C B / A - *
3. Reverse the Postfix result:
   * - A / B C - / D K L
   
This is the correct Prefix notation!
*/`,
          language: 'c',
          explanation: 'This trace highlights the three-step algorithm for infix-to-prefix conversion, verifying against textbook examples.',
          expectedOutput: '',
          lineBreakdown: [],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u1-t6-s7-cm1',
          title: 'Forgetting to Swap Parentheses',
          wrongCode: `// Reversing (A+B) gives )B+A(`,
          correctCode: `// Reversing (A+B) and swapping gives (B+A)`,
          explanation: 'When you reverse a string for infix-to-prefix conversion, the closing parenthesis becomes an opening parenthesis mathematically. If you don\'t swap them, the standard infix-to-postfix algorithm will crash because the parenthesis rules are inverted.',
          consequence: 'Syntax errors and failure of the postfix conversion subroutine.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u1-t6-s7-ic1',
          title: 'Iterative DFS',
          content: 'In graph theory algorithms, Depth First Search (DFS) is typically written recursively. In interviews, you are often asked to write iterative DFS. To do this, you simply replace the recursive function calls with pushing graph nodes onto an explicit Stack data structure.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u1-t6-s7-cp1',
          title: 'Prefix Rules',
          description: 'Know the 3 steps to generate prefix notation.',
          criteria: [
            'Step 1: Reverse string and swap parentheses.',
            'Step 2: Generate Postfix.',
            'Step 3: Reverse Postfix.'
          ],
          topicId: 'u1-t6'
        }
      ],
      revisionCards: [
        {
          id: 'u1-t6-s7-rc1',
          front: 'How does the operating system handle recursion under the hood?',
          back: 'It uses a Call Stack. Every recursive call pushes a new stack frame containing local state and return addresses.',
          topicId: 'u1-t6',
          tags: ['system', 'recursion']
        }
      ]
    }
  ],
  theoryQuestions: [
    {
      id: 'u1-t6-q1',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'beginner',
      question: 'Which of the following principles does a Stack follow?',
      options: ['FIFO (First-In-First-Out)', 'LIFO (Last-In-First-Out)', 'Random Access', 'Priority Based'],
      correctAnswer: 'LIFO (Last-In-First-Out)',
      explanation: 'A stack follows the LIFO principle, where the last item inserted is the first item to be removed.',
      tags: ['concepts']
    },
    {
      id: 'u1-t6-q2',
      type: 'fill-blank',
      topicId: 'u1-t6',
      difficulty: 'beginner',
      question: 'When an array-based stack is full, attempting to push another element results in a Stack ________.',
      correctAnswer: 'Overflow',
      explanation: 'Stack Overflow occurs when pushing onto a stack that has reached its capacity.',
      tags: ['array', 'errors']
    },
    {
      id: 'u1-t6-q3',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'beginner',
      question: 'In a standard 0-indexed array implementation of a stack, what is the initial value of the `top` variable?',
      options: ['0', '1', '-1', 'NULL'],
      correctAnswer: '-1',
      explanation: 'The top variable is initialized to -1 to signify that the stack is completely empty.',
      tags: ['array', 'state']
    },
    {
      id: 'u1-t6-q4',
      type: 'true-false',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'A linked-list implementation of a stack is limited by a fixed maximum capacity.',
      correctAnswer: false,
      explanation: 'Unlike an array-based stack, a linked-list stack grows dynamically and is only limited by the total available memory in the system heap.',
      tags: ['linked list']
    },
    {
      id: 'u1-t6-q5',
      type: 'spot-bug',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'Identify the bug in this push operation for an array stack (top initialized to -1).',
      code: `void push(struct stack *ps, int x) {
    if (ps->top == STACKSIZE - 1) return;
    ps->items[ps->top] = x;
    ps->top++;
}`,
      correctAnswer: 'Variables are assigned before incrementing top',
      explanation: 'Since `top` starts at -1, you must pre-increment `top` before assigning `x` to `ps->items[ps->top]`. The current code assigns to index -1, causing memory corruption.',
      tags: ['array', 'debugging']
    },
    {
      id: 'u1-t6-q6',
      type: 'predict-output',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'What is the output of the following sequence of stack operations? push(1), push(2), pop(), push(3), peep()',
      correctAnswer: '3',
      explanation: 'Stack state: [1] -> [1,2] -> pop 2, stack is [1] -> push 3, stack is [1,3]. The peek/peep operation returns the top element, which is 3.',
      tags: ['operations']
    },
    {
      id: 'u1-t6-q7',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'In postfix notation, where is the operator placed relative to its operands?',
      options: ['Before the operands', 'Between the operands', 'After the operands', 'Randomly'],
      correctAnswer: 'After the operands',
      explanation: 'Postfix notation places the operator immediately after its required operands (e.g., A B +).',
      tags: ['expressions']
    },
    {
      id: 'u1-t6-q8',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'During Infix to Postfix conversion, if we encounter a closing parenthesis `)`, what action is taken?',
      options: ['Push it onto the stack', 'Pop elements to output until an operator is found', 'Pop elements to output until an opening parenthesis `(` is found', 'Ignore it entirely'],
      correctAnswer: 'Pop elements to output until an opening parenthesis `(` is found',
      explanation: 'A closing parenthesis forces the evaluation (popping) of all operators inside the parentheses until the matching opening parenthesis is popped and discarded.',
      tags: ['algorithm', 'expressions']
    },
    {
      id: 'u1-t6-q9',
      type: 'predict-output',
      topicId: 'u1-t6',
      difficulty: 'advanced',
      question: 'Evaluate the postfix expression: `5 3 + 8 2 / *`',
      correctAnswer: '32',
      explanation: 'Stack trace: [5] -> [5,3] -> + gives 8 -> [8] -> [8,8] -> [8,8,2] -> / computes 8/2=4 -> [8,4] -> * computes 8*4=32. Result is 32.',
      tags: ['evaluation', 'postfix']
    },
    {
      id: 'u1-t6-q10',
      type: 'true-false',
      topicId: 'u1-t6',
      difficulty: 'advanced',
      question: 'In postfix evaluation, for the expression `A B -`, B is popped first and A is popped second, making the calculation A - B.',
      correctAnswer: true,
      explanation: 'Correct. Because stacks are LIFO, the right operand (B) is pushed last and therefore popped first. The calculation is `opnd1 - opnd2` which translates to `A - B`.',
      tags: ['evaluation']
    },
    {
      id: 'u1-t6-q11',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'advanced',
      question: 'What is the prefix notation for the infix expression `(A + B) * C`?',
      options: ['* + A B C', '+ * A B C', 'A B + C *', '* A B + C'],
      correctAnswer: '* + A B C',
      explanation: 'First evaluate parenthesis: `+ A B`. Then apply multiplication with C: `* (+ A B) C` -> `* + A B C`.',
      tags: ['prefix']
    },
    {
      id: 'u1-t6-q12',
      type: 'fill-blank',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      question: 'The operating system uses a _______ stack to keep track of active subroutines, local variables, and return addresses.',
      correctAnswer: 'call',
      explanation: 'The call stack (or execution stack) is fundamental to managing function calls and simulating recursion in modern computing architectures.',
      tags: ['system']
    }
  ],
  programmingProblems: [
    {
      id: 'u1-t6-p1',
      title: 'Reverse a String using a Stack',
      topicId: 'u1-t6',
      difficulty: 'beginner',
      problemStatement: 'Write a C program that implements an array-based character stack and uses it to reverse a given string. You should push all characters of the string onto the stack, and then pop them off one by one, constructing the reversed string.',
      constraints: [
        'The input string length will not exceed 100 characters.',
        'Do not use built-in string reversal functions.'
      ],
      sampleInput: 'HELLO',
      sampleOutput: 'OLLEH',
      hints: [
        'Because a stack is LIFO, popping elements out naturally reverses their insertion order.'
      ],
      solution: `#include <stdio.h>
#include <string.h>

#define MAX 100

struct Stack {
    int top;
    char items[MAX];
};

void push(struct Stack* s, char c) {
    if (s->top < MAX - 1) {
        s->items[++(s->top)] = c;
    }
}

char pop(struct Stack* s) {
    if (s->top >= 0) {
        return s->items[(s->top)--];
    }
    return '\\0';
}

void reverseString(char* str) {
    struct Stack s;
    s.top = -1;
    int len = strlen(str);
    
    // Push all characters to stack
    for (int i = 0; i < len; i++) {
        push(&s, str[i]);
    }
    
    // Pop characters back to the string
    for (int i = 0; i < len; i++) {
        str[i] = pop(&s);
    }
}

int main() {
    char str[] = "HELLO";
    reverseString(str);
    printf("%s\\n", str);
    return 0;
}`,
      solutionExplanation: 'By pushing every character of the string into the stack, the last character of the string becomes the top of the stack. When we pop them out in sequence, we naturally extract the string in reverse order. The space and time complexity are both O(N).',
      dryRun: [
        { step: 1, line: 30, variables: { str: 'HELLO', 's.top': '-1' }, output: '', explanation: 'Initialize string and stack.' },
        { step: 2, line: 34, variables: { str: 'HELLO', 's.items': '[H,E,L,L,O]', 's.top': '4' }, output: '', explanation: 'All characters pushed.' },
        { step: 3, line: 39, variables: { str: 'OLLEH', 's.top': '-1' }, output: '', explanation: 'Popped characters overwrite the string in reverse.' }
      ],
      tags: ['array', 'strings', 'reversal']
    },
    {
      id: 'u1-t6-p2',
      title: 'Valid Parentheses',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      problemStatement: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and open brackets are closed in the correct order. Return 1 if valid, 0 if invalid.',
      constraints: [
        'String length <= 100'
      ],
      sampleInput: '{[()]}',
      sampleOutput: '1',
      hints: [
        'Use a stack to store opening brackets.',
        'When you see a closing bracket, pop the stack and verify they match.',
        'Ensure the stack is completely empty at the end.'
      ],
      solution: `#include <stdio.h>
#include <string.h>

#define MAX 100

int isValid(char * s) {
    char stack[MAX];
    int top = -1;
    
    for (int i = 0; i < strlen(s); i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) return 0; // Stack underflow
            char popped = stack[top--];
            if (c == ')' && popped != '(') return 0;
            if (c == '}' && popped != '{') return 0;
            if (c == ']' && popped != '[') return 0;
        }
    }
    
    return top == -1 ? 1 : 0;
}

int main() {
    char str[] = "{[()]}";
    printf("%d\\n", isValid(str));
    return 0;
}`,
      solutionExplanation: 'We iterate through the string. Open brackets are pushed to the stack. If we see a closed bracket, we pop from the stack and compare types. If the stack is empty (too many close brackets) or the types mismatch, it returns 0. Finally, it checks if the stack is completely empty (no extra open brackets).',
      dryRun: [
        { step: 1, line: 12, variables: { c: '{', top: '0', stack: '[{]' }, output: '', explanation: 'Push {' },
        { step: 2, line: 12, variables: { c: '[', top: '1', stack: '[{, []' }, output: '', explanation: 'Push [' },
        { step: 3, line: 16, variables: { c: ']', popped: '[', top: '0' }, output: '', explanation: 'Pop and match ] with [' }
      ],
      tags: ['parsing', 'application']
    },
    {
      id: 'u1-t6-p3',
      title: 'Postfix Expression Evaluation',
      topicId: 'u1-t6',
      difficulty: 'intermediate',
      problemStatement: 'Write a C program to evaluate a given postfix expression. The expression will be provided as a string of single-digit operands and basic operators (+, -, *, /). There are no spaces in the string.',
      constraints: [
        'The input string is a valid postfix expression.',
        'Operands are single digit integers (0-9).'
      ],
      sampleInput: '53+82/*',
      sampleOutput: '32',
      hints: [
        'When you see a digit, convert it to integer and push.',
        'When you see an operator, pop opnd2 then opnd1, calculate, and push result.'
      ],
      solution: `#include <stdio.h>
#include <ctype.h>

#define MAX 100

int evaluatePostfix(char* exp) {
    int stack[MAX];
    int top = -1;
    
    for (int i = 0; exp[i] != '\\0'; i++) {
        if (isdigit(exp[i])) {
            stack[++top] = exp[i] - '0';
        } else {
            int op2 = stack[top--];
            int op1 = stack[top--];
            
            switch (exp[i]) {
                case '+': stack[++top] = op1 + op2; break;
                case '-': stack[++top] = op1 - op2; break;
                case '*': stack[++top] = op1 * op2; break;
                case '/': stack[++top] = op1 / op2; break;
            }
        }
    }
    return stack[top--];
}

int main() {
    char exp[] = "53+82/*";
    printf("%d\\n", evaluatePostfix(exp));
    return 0;
}`,
      solutionExplanation: 'This is standard postfix evaluation using an integer stack. It correctly maps character digits to integer values and handles the exact order of operands (op2 is popped before op1).',
      dryRun: [
        { step: 1, line: 11, variables: { 'exp[i]': '5', top: '0', stack: '[5]' }, output: '', explanation: 'Push 5' },
        { step: 2, line: 11, variables: { 'exp[i]': '3', top: '1', stack: '[5, 3]' }, output: '', explanation: 'Push 3' },
        { step: 3, line: 17, variables: { 'exp[i]': '+', op2: '3', op1: '5', top: '0', stack: '[8]' }, output: '', explanation: 'Add and push 8' }
      ],
      tags: ['evaluation', 'postfix']
    },
    {
      id: 'u1-t6-p4',
      title: 'Infix to Postfix Converter (Simplified)',
      topicId: 'u1-t6',
      difficulty: 'advanced',
      problemStatement: 'Convert a valid infix mathematical expression containing single-letter operands, standard operators (+, -, *, /) and parentheses, into a postfix expression.',
      constraints: [
        'All operands are single uppercase characters (A-Z).',
        'Operators are restricted to +, -, *, /.'
      ],
      sampleInput: '(A+B)*C',
      sampleOutput: 'AB+C*',
      hints: [
        'Use input and stack precedence logic.',
        '( has highest input precedence, lowest stack precedence.',
        'Pop operators to output while stack precedence >= input precedence.'
      ],
      solution: `#include <stdio.h>
#include <ctype.h>

#define MAX 100

int prec(char c) {
    if (c == '*' || c == '/') return 2;
    if (c == '+' || c == '-') return 1;
    return 0; // Parentheses
}

void infixToPostfix(char* infix, char* postfix) {
    char stack[MAX];
    int top = -1;
    int j = 0;
    
    for (int i = 0; infix[i] != '\\0'; i++) {
        char c = infix[i];
        
        if (isalpha(c)) {
            postfix[j++] = c;
        } else if (c == '(') {
            stack[++top] = c;
        } else if (c == ')') {
            while (top != -1 && stack[top] != '(') {
                postfix[j++] = stack[top--];
            }
            top--; // pop '('
        } else {
            while (top != -1 && prec(stack[top]) >= prec(c)) {
                postfix[j++] = stack[top--];
            }
            stack[++top] = c;
        }
    }
    
    while (top != -1) {
        postfix[j++] = stack[top--];
    }
    postfix[j] = '\\0';
}

int main() {
    char exp[] = "(A+B)*C";
    char res[MAX];
    infixToPostfix(exp, res);
    printf("%s\\n", res);
    return 0;
}`,
      solutionExplanation: 'This simplified version relies on a single precedence function since we lack exponentiation. Operators are pushed based on simple mathematical hierarchy. Parentheses naturally bound the popping logic.',
      dryRun: [
        { step: 1, line: 22, variables: { c: '(', stack: '[(]' }, output: '', explanation: 'Push (' },
        { step: 2, line: 20, variables: { c: 'A', res: 'A' }, output: '', explanation: 'Append operand to result' },
        { step: 3, line: 26, variables: { c: ')', stack: '[]', res: 'AB+' }, output: '', explanation: 'Pop until ( found' }
      ],
      tags: ['algorithm', 'conversion']
    }
  ]
};
