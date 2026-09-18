import type { Topic } from '../../../../types';

export const stack: Topic = {
  id: 'u3-t13',
  unitId: 'unit-3',
  title: 'Stack',
  slug: 'stack',
  description: `A stack is a mathematically restricted linear data structure that enforces the Last-In, First-Out (LIFO) access discipline: the only element that can be examined or removed is the one most recently added. This restriction, far from being a limitation, is what gives stacks their power — by constraining the interface to just two operations (push to add an element to the top, pop to remove the element from the top), stacks enforce an access pattern that naturally models problems involving nesting, reversal, and state history.

At the hardware level, the CPU's call stack is itself a stack data structure: each function call pushes a new frame containing local variables, parameters, and the return address; each function return pops that frame and resumes the caller. Understanding this connection between the abstract stack data structure and the CPU's physical call mechanism deepens comprehension of recursion (each recursive call pushes a frame, and the unwinding phase pops frames), stack overflow (pushing more frames than the stack's memory allocation allows), and how iterative solutions that use an explicit stack can replace recursive algorithms.

In software, stacks are used to evaluate arithmetic expressions (converting infix to postfix notation and evaluating the result), to implement undo/redo systems (each action is pushed onto the undo stack), to check balanced brackets in compilers, to manage browser navigation history (the back button pops the most recent page), and as the fundamental data structure in depth-first search (DFS) graph traversal. This topic covers both array-based and linked-list-based stack implementations, along with the classic stack applications that appear frequently in technical interviews.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t12'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u3-t13-s1',
      title: 'The Stack Concept and LIFO',
      slug: 'stack-lifo',
      description: `A stack is an abstract data type (ADT) that enforces a strict Last-In, First-Out (LIFO) access discipline: the only element that can be examined or removed at any time is the one most recently added. The term "abstract" is critical — a stack is not a built-in language feature or a specific memory layout; it is a behavioral contract that restricts how data can be accessed. You implement this contract using a concrete data structure (an array or a linked list) and then artificially limit the operations to just three: push (add an element to the top), pop (remove the element from the top), and peek (examine the top element without removing it).

The LIFO property arises from a single architectural constraint: all additions and removals occur at the same end, called the top. If you push elements A, B, C onto a stack in that order, C sits on top and must be popped first; you cannot reach A without first removing C and B. This behavior mirrors countless real-world systems: a stack of plates in a cafeteria, the "undo" history in a text editor (the most recent action is undone first), and most importantly, the CPU's call stack, which manages function calls in exactly this way — the most recently called function must return before the function that called it can resume.

The simplest implementation uses a fixed-size array and an integer variable top that tracks the index of the topmost element. Pushing increments top and stores the value at arr[top]; popping reads arr[top] and decrements top. The array-based implementation has O(1) time complexity for all three operations, making it extremely fast, but it has a fixed maximum capacity determined at compile time. If top reaches the array's maximum index, the stack is full (overflow), and if top is -1, the stack is empty (underflow). These two boundary conditions must be checked before every push and pop operation, respectively, or the program will silently corrupt memory.`,
      keyPoints: [
        'LIFO Architecture: Data flows strictly vertically. The very last item pushed onto the structure is mathematically guaranteed to be the first one popped off.',
        '`push(item)`: The absolute O(1) operation of placing a new element at the current apex of the Stack.',
        '`pop()`: The absolute O(1) operation of extracting the apex element, logically deleting it, and lowering the Stack pointer.',
        '`peek()` (or `top()`): Inspects the apex element without triggering a logical deletion.',
        'Systems Applications: The CPU Call Stack (which meticulously tracks function `return` addresses), algorithm Depth-First Search (DFS), and parsing mathematical or bracketed expressions.',
      ],
      codeExamples: [
        {
          id: 'u3-t13-s1-ex1',
          title: 'Array-Based Stack',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\n#define MAX 5\n\ntypedef struct {\n    int data[MAX];\n    int top; /* Index of the top element */\n} Stack;\n\nvoid push(Stack *s, int value) {\n    if (s->top == MAX - 1) {\n        printf("Stack Overflow!\\n");\n        return;\n    }\n    s->top++;\n    s->data[s->top] = value;\n}\n\nint pop(Stack *s) {\n    if (s->top == -1) {\n        printf("Stack Underflow!\\n");\n        return -1; /* Error code */\n    }\n    int value = s->data[s->top];\n    s->top--;\n    return value;\n}\n\nint main(void) {\n    Stack s;\n    s.top = -1; /* Empty stack indicator */\n    \n    push(&s, 10);\n    push(&s, 20);\n    \n    printf("Popped: %d\\n", pop(&s)); /* Prints 20 */\n    printf("Popped: %d\\n", pop(&s)); /* Prints 10 */\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This is the foundational Array-based implementation. The integer `top` acts as the master anchor, tracking the precise index of the highest live data. Crucially, when we execute `pop()`, we do NOT wipe or clear the memory in the array. We simply decrement the `top` index. The old data becomes inaccessible "garbage" that will be cleanly overwritten on the very next `push()`.',
          expectedOutput: 'Popped: 20\nPopped: 10',
          lineBreakdown: [
            { lineNumber: 32, code: '    s.top = -1;', explanation: 'The indispensable mathematical initialization. An index of `-1` strictly indicates an empty state. The first `push` will increment it to index `0`.' },
            { lineNumber: 16, code: '    s->top++; s->data[s->top] = value;', explanation: 'The O(1) push mechanic: Elevate the anchor, then physically write the data to that new index.' },
            { lineNumber: 25, code: '    int value = s->data[s->top]; s->top--;', explanation: 'The O(1) pop mechanic: Extract the payload, then lower the anchor to logically orphan the array slot.' },
          ],
          relatedTopicIds: ['u3-t7'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t13-s1-cm1',
          title: 'Forgetting to initialize top to -1',
          wrongCode: 'Stack s;\npush(&s, 5);',
          correctCode: 'Stack s;\ns.top = -1;\npush(&s, 5);',
          explanation: 'In C, local variables are never zeroed out; they inherit whatever raw garbage data happens to be sitting in that RAM block. If you forget to initialize `s.top = -1`, `top` might initialize with a garbage integer like `32767`. The very first `push` will attempt to write to `s.data[32768]`, instantly triggering a fatal out-of-bounds Segmentation Fault.',
          consequence: 'Catastrophic Out-Of-Bounds Array Access and instant Segmentation Fault.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t13-s1-ic1',
          title: 'Stack Overflow and Underflow',
          content: 'You must memorize these absolute failure states. "Stack Overflow" occurs dynamically when a `push` command executes against a 100% full memory array. "Stack Underflow" occurs when a `pop` command executes against an entirely empty structure (`top == -1`). Professional systems code must explicitly trap these states and return designated error codes to prevent hard crashes.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t13-s1-cp1',
          title: 'LIFO Mechanics',
          description: 'Verify your architectural intuition of the LIFO engine.',
          criteria: [
            'Mechanically trace the exact order of extraction for items A, B, and C pushed sequentially into a Stack.',
            'State the precise mathematical value of the `top` index when an Array-based stack of `MAX` 10 is completely full.',
          ],
          topicId: 'u3-t13',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t13-s1-rc1',
          front: 'What does LIFO stand for?',
          back: 'Last-In, First-Out. The most recently allocated element is mathematically guaranteed to be the first one extracted.',
          topicId: 'u3-t13',
          tags: ['stack', 'theory'],
        },
      ],
    },
    {
      id: 'u3-t13-s2',
      title: 'Linked List Based Stack',
      slug: 'linked-list-stack',
      description: `An array-based stack has a fundamental limitation: its capacity is fixed at compile time by the array's declared size. If the array holds 100 elements and the program needs to push a 101st, the only options are to report an overflow error or to reallocate a larger array and copy all existing elements — an expensive O(N) operation. A linked-list-based stack eliminates this limitation entirely by allocating each element as a separate node on the heap, connected through pointers. The stack can grow until the system runs out of memory, with no predetermined upper bound.

The architectural mapping between a linked list and a stack is elegant in its simplicity: the stack's top corresponds directly to the linked list's head pointer. Pushing an element means allocating a new node, setting its next pointer to the current head, and updating head to point to the new node — exactly the same as inserting at the head of a linked list, which is an O(1) operation. Popping means saving the current head in a temporary pointer, advancing head to head->next, reading the data from the temporary node, and freeing it — also O(1). Every push is a malloc call; every pop is a free call. There is no wasted, pre-allocated memory: the stack uses exactly as much heap space as the number of elements it currently contains.

The tradeoff is that each node carries the overhead of a next pointer (8 bytes on a 64-bit system) in addition to its data, and the individual malloc/free calls are slower than simple array index arithmetic. For performance-critical applications where the maximum stack size is known in advance, the array-based implementation is faster and more cache-friendly. For applications where the stack size is unpredictable or potentially very large, the linked-list implementation is more flexible and avoids the risk of overflow. In practice, both implementations are commonly used, and the choice depends on the specific constraints of the problem.`,
      keyPoints: [
        'Infinite Scaling: Heap allocation replaces fixed arrays. A "Stack Overflow" is now mathematically impossible (unless the OS physically runs out of RAM).',
        'Push Mapping: A Stack `push` is structurally identical to a Linked List `insertAtHead` (O(1) time).',
        'Pop Mapping: A Stack `pop` is structurally identical to a Linked List `deleteFromHead`, updating the pointer and strictly `free()`ing the orphaned node (O(1) time).',
        'The Apex Anchor: The conceptual "Top" of the stack is managed entirely by the single `head` pointer of the linked chain.',
      ],
      codeExamples: [
        {
          id: 'u3-t13-s2-ex1',
          title: 'Dynamic Stack via Linked List',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nvoid push(Node **top, int value) {\n    Node *newNode = (Node*)malloc(sizeof(Node));\n    if (!newNode) return; /* Out of RAM */\n    \n    newNode->data = value;\n    newNode->next = *top;\n    *top = newNode;\n    printf("Pushed %d\\n", value);\n}\n\nint pop(Node **top) {\n    if (*top == NULL) {\n        printf("Stack Underflow\\n");\n        return -1;\n    }\n    \n    Node *temp = *top;\n    int poppedValue = temp->data;\n    \n    *top = (*top)->next; /* Move top pointer down */\n    free(temp);          /* Free old top memory */\n    \n    return poppedValue;\n}\n\nint main(void) {\n    Node *stackTop = NULL;\n    \n    push(&stackTop, 100);\n    push(&stackTop, 200);\n    \n    printf("Popped: %d\\n", pop(&stackTop));\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'Observe the architectural symmetry. This code is functionally identical to the `insertHead` and `deleteHead` mechanics from the Linked List topic. By artificially restricting the programmer to only invoke these two specific functions, the underlying Linked List perfectly emulates a rigid LIFO Stack.',
          expectedOutput: 'Pushed 100\nPushed 200\nPopped: 200',
          lineBreakdown: [
            { lineNumber: 14, code: '    newNode->next = *top;', explanation: 'The new node captures the current apex of the stack, preparing to bury it.' },
            { lineNumber: 15, code: '    *top = newNode;', explanation: 'The top pointer formally shifts upward, crowning the new node as the apex.' },
            { lineNumber: 28, code: '    *top = (*top)->next;', explanation: 'The pop mechanic: The top pointer formally shifts downward, successfully bypassing the old apex.' },
            { lineNumber: 29, code: '    free(temp);', explanation: 'The strict destruction mandate. Unlike array arrays, orphaned heap nodes must be explicitly vaporized to prevent Memory Leaks.' },
          ],
          relatedTopicIds: ['u3-t12'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t13-s2-cm1',
          title: 'Pushing/Popping from the TAIL',
          wrongCode: '/* Traversing the whole list to insert at the end for Push */',
          correctCode: '/* Inserting at the HEAD for Push */',
          explanation: 'A Stack is defined by its strict O(1) performance guarantees. If you foolishly map the Stack "Top" to the tail of a Singly-Linked List, every single `push` and `pop` would force an abysmal O(N) traversal down the entire chain. Always anchor the conceptual "Top" precisely at the `head` pointer to maintain instantaneous O(1) execution.',
          consequence: 'Severe architectural performance degradation, dropping operations from O(1) to O(N).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t13-s2-ic1',
          title: 'Array vs Linked List Stack',
          content: 'A brutal comparative architecture question. The Array-Based Stack executes natively faster due to contiguous memory (resulting in perfect CPU cache prediction) and zero pointer-overhead. However, the Linked-List Stack is chosen when the data ceiling is entirely volatile and artificial scaling limitations are unacceptable.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t13-s2-cp1',
          title: 'Linked List Stack Operations',
          description: 'Verify your mapping of Stack behaviors onto underlying Heap chains.',
          criteria: [
            'Mechanically defend which end of the Linked List MUST represent the "top" of the stack to maintain O(1) performance.',
            'Explain the specific architectural flaw in using the tail of a Singly-Linked List as the Stack apex.',
          ],
          topicId: 'u3-t13',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t13-s2-rc1',
          front: 'What Linked List operation is equivalent to a Stack `push`?',
          back: 'Insertion at the Head (`insertHead`). Both execute in strict O(1) time by rewiring the exact same pointer.',
          topicId: 'u3-t13',
          tags: ['stack', 'lists', 'push'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t13-q1',
      type: 'mcq',
      topicId: 'u3-t13',
      difficulty: 'beginner',
      question: 'Which principle governs the behavior of a Stack?',
      options: ['FIFO', 'LIFO', 'FILO', 'Random Access'],
      correctAnswer: 'LIFO',
      explanation: 'Last-In, First-Out. Or alternatively, First-In, Last-Out (FILO), but LIFO is the standard acronym.',
      tags: ['stack', 'theory'],
    },
    {
      id: 'u3-t13-q2',
      type: 'predict-output',
      topicId: 'u3-t13',
      difficulty: 'intermediate',
      question: 'Assume an empty stack. What is the output after executing: push(1); push(2); pop(); push(3); print(pop());',
      options: ['1', '2', '3', 'Error'],
      correctAnswer: '3',
      explanation: 'State: [1]. State: [1, 2]. Pop removes 2 -> [1]. Push(3) -> [1, 3]. Pop removes 3. The printed value is 3.',
      tags: ['stack', 'operations'],
    },
    {
      id: 'u3-t13-q3',
      type: 'true-false',
      topicId: 'u3-t13',
      difficulty: 'beginner',
      question: 'In an array-based stack, `pop()` deletes the memory of the popped element from the array.',
      correctAnswer: false,
      explanation: 'It only decrements the `top` index. The data is left as garbage in the array and will be overwritten on the next push.',
      tags: ['stack', 'arrays'],
    },
    {
      id: 'u3-t13-q4',
      type: 'spot-bug',
      topicId: 'u3-t13',
      difficulty: 'intermediate',
      question: 'Spot the bug in this Pop function:',
      code: 'int pop(Stack *s) {\n    int val = s->data[s->top];\n    s->top--;\n    return val;\n}',
      correctAnswer: 'Missing Underflow check.',
      explanation: 'If `s->top` is -1 (empty), this attempts to access `s->data[-1]`, which is out of bounds and causes undefined behavior.',
      tags: ['stack', 'bugs'],
    },
    {
      id: 'u3-t13-q5',
      type: 'mcq',
      topicId: 'u3-t13',
      difficulty: 'advanced',
      question: 'What is the time complexity of pushing an item onto an Array-based stack vs a Linked-List based stack?',
      options: [
        'Array: O(N), List: O(1)',
        'Array: O(1), List: O(N)',
        'Both are O(1)',
        'Both are O(N)'
      ],
      correctAnswer: 'Both are O(1)',
      explanation: 'Array sets index and increments `top` (instant). List allocates node, changes two pointers (instant). Both are O(1) constant time.',
      tags: ['stack', 'complexity'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t13-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t13',
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
      id: 'u3-t13-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t13',
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
      id: 'u3-t13-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t13',
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
      id: 'u3-t13-p1',
      title: 'Reverse a String using a Stack',
      topicId: 'u3-t13',
      difficulty: 'beginner',
      problemStatement: 'Write a program that uses an array-based character stack to reverse the string "HELLO". Push every character onto the stack, then pop them all off and print them.',
      constraints: ['Use a stack of chars'],
      sampleInput: '',
      sampleOutput: 'OLLEH',
      hints: ['Loop through the string, pushing `str[i]`.', 'Loop while `top != -1`, printing `pop()`.'],
      solution: '#include <stdio.h>\n#include <string.h>\n\n#define MAX 100\n\ntypedef struct {\n    char data[MAX];\n    int top;\n} CharStack;\n\nvoid push(CharStack *s, char c) {\n    s->data[++(s->top)] = c; /* Pre-increment syntax shortcut */\n}\n\nchar pop(CharStack *s) {\n    return s->data[(s->top)--]; /* Post-decrement syntax shortcut */\n}\n\nint main(void) {\n    CharStack s;\n    s.top = -1;\n    \n    char str[] = "HELLO";\n    int len = strlen(str);\n    \n    /* Push all chars */\n    for (int i = 0; i < len; i++) {\n        push(&s, str[i]);\n    }\n    \n    /* Pop all chars */\n    while (s.top != -1) {\n        printf("%c", pop(&s));\n    }\n    printf("\\n");\n    \n    return 0;\n}',
      solutionExplanation: 'A classic demonstration of LIFO. The first character \'H\' goes in first, meaning it is buried at the bottom. \'O\' goes in last, sits at the top, and is popped first.',
      dryRun: [
        { step: 1, line: 28, variables: { i: '4' }, output: '', explanation: 'Stack contains [H, E, L, L, O]. top is 4.' },
        { step: 2, line: 33, variables: {}, output: 'O', explanation: 'Pop returns O. top becomes 3.' },
        { step: 3, line: 33, variables: {}, output: 'L', explanation: 'Pop returns L. top becomes 2.' },
      ],
      tags: ['stack', 'strings', 'algorithms'],
    },
    {
      id: 'u3-t13-p2',
      title: 'Valid Parentheses (Balanced Brackets)',
      topicId: 'u3-t13',
      difficulty: 'advanced',
      problemStatement: 'Given a string of brackets e.g. "{()[]}", use a stack to check if it is balanced. Return 1 if valid, 0 if invalid. "({)" is invalid.',
      constraints: ['Use a char stack'],
      sampleInput: '{()}',
      sampleOutput: 'Valid',
      hints: ['If opening bracket `( { [`, push to stack.', 'If closing `) } ]`, pop from stack and check if it matches the opening type.', 'If stack empty at end, it is valid.'],
      solution: '#include <stdio.h>\n#include <string.h>\n\n#define MAX 100\ntypedef struct { char data[MAX]; int top; } Stack;\nvoid push(Stack *s, char c) { s->data[++(s->top)] = c; }\nchar pop(Stack *s) { return s->top == -1 ? \'\\0\' : s->data[(s->top)--]; }\n\nint isMatchingPair(char char1, char char2) {\n    if (char1 == \'(\' && char2 == \')\') return 1;\n    if (char1 == \'{\' && char2 == \'}\') return 1;\n    if (char1 == \'[\' && char2 == \']\') return 1;\n    return 0;\n}\n\nint isValid(char str[]) {\n    Stack s; s.top = -1;\n    for (int i = 0; i < strlen(str); i++) {\n        if (str[i] == \'{\' || str[i] == \'(\' || str[i] == \'[\') {\n            push(&s, str[i]);\n        } else if (str[i] == \'}\' || str[i] == \')\' || str[i] == \']\') {\n            char popped = pop(&s);\n            if (!isMatchingPair(popped, str[i])) return 0;\n        }\n    }\n    return s.top == -1; /* Must be empty at end */\n}\n\nint main(void) {\n    printf("Checking {()}: %s\\n", isValid("{()}") ? "Valid" : "Invalid");\n    printf("Checking {[(])}: %s\\n", isValid("{[(])}") ? "Valid" : "Invalid");\n    return 0;\n}',
      solutionExplanation: 'The most famous Stack interview question (LeetCode #20). Stacks perfectly handle nested structures because the most recently opened bracket must be the first one closed (LIFO).',
      dryRun: [
        { step: 1, line: 20, variables: { char: '{' }, output: '', explanation: 'Pushed `{`. Stack: [{]' },
        { step: 2, line: 20, variables: { char: '(' }, output: '', explanation: 'Pushed `(`. Stack: [{, (]' },
        { step: 3, line: 22, variables: { char: ')' }, output: '', explanation: 'Popped `(`. Matches `)`. Valid. Stack: [{]' },
        { step: 4, line: 22, variables: { char: '}' }, output: '', explanation: 'Popped `{`. Matches `}`. Valid. Stack: []' },
      ],
      tags: ['stack', 'algorithms', 'leetcode'],
    },
  ],
};
