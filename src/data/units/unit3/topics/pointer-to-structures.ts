import type { Topic } from '../../../../types';

export const pointerToStructures: Topic = {
  id: 'u3-t8',
  unitId: 'unit-3',
  title: 'Pointer to Structures',
  slug: 'pointer-to-structures',
  description: `In systems programming, copying large structures by value — duplicating hundreds or thousands of bytes onto the stack every time a structure is passed to a function — is an unacceptable performance bottleneck. By passing an 8-byte pointer (on a 64-bit system) instead of the structure itself, pointers eliminate this copying overhead entirely while simultaneously enabling the called function to modify the original structure's data in place. This combination of efficiency and mutability makes structure pointers the dominant access pattern in professional C code.

Structure pointers introduce the arrow operator (->), which is syntactic sugar for the dereference-then-dot operation: ptr->member is exactly equivalent to (*ptr).member. The parentheses in the expanded form are mandatory because the dot operator has higher precedence than the dereference operator, and writing *ptr.member would be parsed incorrectly. The arrow operator eliminates this precedence trap and is universally used whenever accessing structure members through a pointer.

Beyond function parameter passing, structure pointers are the enabling mechanism for dynamic memory allocation (creating structures on the heap with malloc that outlive the creating function) and for building all pointer-linked data structures: linked lists (where each node contains a pointer to the next node), binary trees (where each node contains pointers to its children), graphs, hash tables with chaining, and any other data structure whose topology is determined at runtime rather than compile time. Mastering structure pointers is therefore prerequisite for the entire data structures curriculum that follows.`,
  difficulty: 'advanced',
  prerequisites: ['u2-t3', 'u3-t4', 'u3-t5'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u3-t8-s1',
      title: 'Pointers and the Arrow Operator',
      slug: 'arrow-operator',
      description: `When a structure is passed to a function by value — the default behavior in C — the entire structure is copied byte by byte onto the called function's stack frame. For a small structure of 8 bytes, this copy is negligible. But structures in real-world programs routinely grow to hundreds or thousands of bytes (consider a structure containing a 256-character name field, multiple arrays, and nested sub-structures). Copying such a structure on every function call wastes both time (the CPU must copy every byte) and memory (the stack frame must be large enough to hold the copy). Passing a pointer to the structure instead passes only the 8-byte address (on a 64-bit system), regardless of how large the structure is, providing identical access to all members with negligible overhead.

Accessing structure members through a pointer requires the arrow operator (->). The expression ptr->member is syntactic sugar for (*ptr).member: it dereferences the pointer to obtain the structure, then accesses the member. The parentheses in (*ptr).member are mandatory because the dot operator has higher precedence than the dereference operator; without them, *ptr.member would be parsed as *(ptr.member), which is almost certainly not what you intend. The arrow operator eliminates this precedence trap and is universally used in C code whenever you have a pointer to a structure.

Passing structures by pointer also enables a critical capability: the function can modify the original structure. When you pass by value, the function receives a copy, and any modifications to the copy are invisible to the caller. When you pass a pointer, the function operates on the original data through the address, and all modifications are immediately visible to the caller. If you want the function to read the structure without modifying it, you declare the parameter as const StructType *ptr, which allows read access through the arrow operator but produces a compiler error if the function attempts to write to any member. This const-correctness discipline is essential for documenting intent and preventing accidental modification in large codebases.`,
      keyPoints: [
        'Syntax: You declare a pointer to a struct just like any primitive type: `Student *ptr = &s1;`',
        'Dereferencing Conflict: To access members via a pointer, you must dereference it. However, the dot operator `.` has higher precedence than the dereference operator `*`. Writing `*ptr.age` evaluates as `*(ptr.age)`, which triggers a compiler error. You MUST use parentheses: `(*ptr).age`.',
        'The Arrow Operator: Because `(*ptr).age` is syntactically atrocious, C introduced the Arrow Operator (`->`).',
        '`ptr->age` is exact syntactic sugar for `(*ptr).age`. It elegantly translates to "follow this pointer to its memory address, and grab the `age` field inside it."',
        'The Golden Rule of Access: If you are holding an actual object (or reference), use the dot `.`. If you are holding a POINTER to an object, you must use the arrow `->`.',
      ],
      codeExamples: [
        {
          id: 'u3-t8-s1-ex1',
          title: 'The Arrow Operator',
          code: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    float score;\n} Player;\n\nint main(void) {\n    Player p1 = {1, 95.5};\n    \n    /* Pointer to struct */\n    Player *ptr = &p1;\n    \n    /* Method 1: Dereference and Dot (Ugly) */\n    printf("ID: %d\\n", (*ptr).id);\n    \n    /* Method 2: Arrow Operator (Beautiful and Standard) */\n    printf("ID: %d\\n", ptr->id);\n    \n    /* Modifying via pointer */\n    ptr->score = 99.9;\n    printf("New score: %.1f\\n", p1.score);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'The arrow operator `->` is perhaps the most famous and frequently typed operator in systems programming. It entirely replaces the clunky `(*ptr).` syntax, vastly improving code readability when navigating complex pointer hierarchies.',
          expectedOutput: 'ID: 1\nID: 1\nNew score: 99.9',
          lineBreakdown: [
            { lineNumber: 12, code: '    Player *ptr = &p1;', explanation: '`ptr` now holds the physical memory address of the `p1` struct on the Stack.' },
            { lineNumber: 15, code: '    printf("ID: %d\\n", (*ptr).id);', explanation: 'The parentheses are mathematically mandatory. `*ptr.id` would attempt to dereference an integer, causing a fatal compiler error.' },
            { lineNumber: 18, code: '    printf("ID: %d\\n", ptr->id);', explanation: 'The industry-standard, clean syntax for dereferencing a struct pointer.' },
          ],
          relatedTopicIds: ['u2-t3'],
        },
        {
          id: 'u3-t8-s1-ex2',
          title: 'Pass by Pointer (Efficiency)',
          code: '#include <stdio.h>\n\ntypedef struct {\n    char name[100];\n    int data[1000]; /* Massive 4000 byte array */\n} BigStruct;\n\n/* Pass by Pointer. Copies 8 bytes (the address). */\nvoid processStruct(BigStruct *b) {\n    b->data[0] = 42; /* Modifies the original struct */\n    printf("Processed %s\\n", b->name);\n}\n\nint main(void) {\n    BigStruct b1;\n    b1.name[0] = \'A\'; b1.name[1] = \'\\0\';\n    \n    /* Pass the address */\n    processStruct(&b1);\n    \n    printf("Data modified: %d\\n", b1.data[0]);\n    return 0;\n}',
          language: 'c',
          explanation: 'If we foolishly passed `BigStruct` by value, the CPU would be forced to physically duplicate 4100 bytes of memory onto the Stack every single time the function executed. By passing a pointer, the CPU only transfers a lightweight 8-byte memory address. Furthermore, this grants the function permission to directly mutate the original struct\'s data.',
          expectedOutput: 'Processed A\nData modified: 42',
          lineBreakdown: [
            { lineNumber: 9, code: 'void processStruct(BigStruct *b) {', explanation: 'The function signature explicitly demands a memory address, enabling zero-copy data transfer.' },
            { lineNumber: 10, code: '    b->data[0] = 42;', explanation: 'Follows the pointer `b` back to the original struct in `main`, modifying its data in place.' },
            { lineNumber: 19, code: '    processStruct(&b1);', explanation: 'The "address-of" operator `&` extracts the memory address of `b1` to satisfy the pointer argument.' },
          ],
          relatedTopicIds: ['u2-t6'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t8-s1-cm1',
          title: 'Using dot on a pointer',
          wrongCode: 'Player *p = &p1;\np.id = 5; /* ERROR */',
          correctCode: 'Player *p = &p1;\np->id = 5; /* Correct */',
          explanation: 'This error fundamentally stems from a misunderstanding of types. `p` is an 8-byte pointer (a memory address). A memory address, as an abstract concept, does not have members like `.id`. You must use the `->` operator to instruct the CPU to follow the memory address to the actual physical object before attempting to extract its members.',
          consequence: 'Compilation error (request for member in something not a structure or union).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t8-s1-ic1',
          title: 'The Arrow Operator under the hood',
          content: 'In technical interviews for systems programming or embedded C, you will frequently be asked what `ptr->member` translates to at the raw assembly level. The precise answer: The CPU takes the base memory address stored inside `ptr`, ADDS the static byte-offset of `member` calculated at compile time, and dereferences that final resultant memory address. It is purely pointer arithmetic under the hood.',
          relatedTopicIds: ['u3-t5'],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t8-s1-cp1',
          title: 'Arrow Operator Mechanics',
          description: 'Verify your mastery of pointer mechanics and access operators.',
          criteria: [
            'Mechanically explain the exact syntax expansion of the shorthand `ptr->member`.',
            'Explain the architectural rule for when to use `.` versus when to use `->`.',
            'Defend why passing a struct pointer to a function is architecturally superior to passing the struct by value.',
          ],
          topicId: 'u3-t8',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t8-s1-rc1',
          front: 'What operator must you use to access a struct member if you only have a pointer to the struct?',
          back: 'The arrow operator (`->`). Example: `ptr->age`.',
          topicId: 'u3-t8',
          tags: ['structs', 'pointers', 'syntax'],
        },
        {
          id: 'u3-t8-s1-rc2',
          front: 'Architecturally, what are the two primary benefits of passing a large struct to a function via a pointer instead of by value?',
          back: '1. Massive Performance Gain: Copies only an 8-byte memory address rather than replicating thousands of bytes on the Stack.\n2. Mutability: Grants the function the ability to permanently modify the original struct data.',
          topicId: 'u3-t8',
          tags: ['structs', 'functions', 'performance'],
        },
      ],
    },
    {
      id: 'u3-t8-s2',
      title: 'Dynamically Allocating Structs',
      slug: 'dynamic-structs',
      description: `Combining dynamic memory allocation (malloc/calloc) with structures creates heap-allocated structure instances whose lifetimes are controlled entirely by the programmer. Unlike stack-allocated structures, which are automatically destroyed when the function returns, heap-allocated structures persist until explicitly freed, making them essential for building data that must outlive the function that created it \u2014 the nodes of linked lists, the vertices of graphs, the entries of hash tables, and the records of in-memory databases.

The allocation pattern is straightforward: Node *newNode = (Node *)malloc(sizeof(Node)). The sizeof operator ensures the correct number of bytes is requested regardless of the structure's layout or padding, and the cast converts the void* returned by malloc to the appropriate pointer type. After allocation, you must immediately check whether malloc returned NULL (indicating the system has run out of memory) before accessing any members. Once allocated, all member access uses the arrow operator (newNode->data = 42; newNode->next = NULL), because newNode is a pointer to the structure, not the structure itself.

This pattern is the mechanical foundation of every pointer-linked data structure in C. A linked list node is a structure containing data and a pointer to the next node; a binary tree node contains data and pointers to left and right children; a graph adjacency list node contains a vertex identifier and a pointer to the next adjacent vertex. In every case, the ability to individually allocate and free nodes on the heap is what gives these data structures their dynamic, flexible topology. The corresponding responsibility is that every malloc must be matched with a free when the node is no longer needed, and the programmer must carefully manage the order of pointer updates and frees to avoid dangling pointers, memory leaks, and use-after-free bugs.`,
      keyPoints: [
        'Heap Allocation: `Node *n = (Node*)malloc(sizeof(Node));` securely requests a block of Heap RAM large enough to hold the struct, returning an address pointer.',
        'Access Rules: Because `malloc` returns a pointer, you are immediately forced into pointer mechanics. You MUST use the arrow operator `->` to manipulate its members.',
        'Safety First: Always rigorously check if the pointer is `NULL` after calling `malloc` to defend against out-of-memory crashes.',
        'Manual Destruction: The struct persists indefinitely on the Heap. You must invoke `free(n);` when the object is no longer needed to prevent memory leaks.',
      ],
      codeExamples: [
        {
          id: 'u3-t8-s2-ex1',
          title: 'Malloc a Structure',
          code: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct {\n    char name[50];\n    int level;\n} Character;\n\nint main(void) {\n    /* Allocate one Character on the Heap */\n    Character *c1 = (Character*)malloc(sizeof(Character));\n    \n    if (c1 == NULL) {\n        return 1;\n    }\n    \n    /* c1 is a pointer, so we must use -> */\n    strcpy(c1->name, "Hero");\n    c1->level = 99;\n    \n    printf("%s is level %d\\n", c1->name, c1->level);\n    \n    /* Clean up heap memory */\n    free(c1);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code highlights the precise architectural separation between the Stack and the Heap. The struct itself—containing the `name` array and `level` integer—resides entirely on the Heap. The only data stored on the local Stack is the 8-byte pointer variable `c1` that holds the Heap memory address.',
          expectedOutput: 'Hero is level 99',
          lineBreakdown: [
            { lineNumber: 12, code: '    Character *c1 = (Character*)malloc(sizeof(Character));', explanation: 'Dynamically reserves at least 54 contiguous bytes of Heap memory to satisfy the `Character` blueprint.' },
            { lineNumber: 19, code: '    strcpy(c1->name, "Hero");', explanation: 'Utilizes the arrow operator to safely navigate to the Heap block and write data into its `name` array member.' },
            { lineNumber: 25, code: '    free(c1);', explanation: 'Explicitly relinquishes the struct memory back to the OS, preventing a memory leak.' },
          ],
          relatedTopicIds: ['u3-t4'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t8-s2-cm1',
          title: 'Using sizeof on the pointer',
          wrongCode: 'Character *c = malloc(sizeof(c)); /* Allocates 8 bytes! */',
          correctCode: 'Character *c = malloc(sizeof(Character)); /* Allocates 54 bytes */',
          explanation: 'This is a catastrophic error caused by rushing. `sizeof(c)` requests the byte size of the POINTER variable itself. On a 64-bit architecture, a pointer is exactly 8 bytes. You have asked `malloc` for 8 bytes, but your `Character` struct actually requires 54 bytes. The moment you attempt to use `c->name`, you will write data far beyond your 8-byte allocation, instantly triggering a massive Heap Buffer Overflow and a likely program crash.',
          consequence: 'Catastrophic Heap Buffer Overflow, memory corruption, and program crash.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t8-s2-ic1',
          title: 'Self-Referential Structures',
          content: 'A classic data structures concept: A C struct is physically incapable of containing an instance of itself. Why? Because the compiler must calculate the exact byte size of the struct. A struct containing itself would trigger an infinite, recursive size calculation. However, a struct CAN contain a POINTER to an instance of itself (e.g., `struct Node *next;`), because all pointers are a fixed, known size (usually 8 bytes). This singular mechanic enables the construction of Linked Lists and Trees.',
          relatedTopicIds: ['u3-t12'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t8-s2-cp1',
          title: 'Heap Structs',
          description: 'Verify your understanding of heap-allocated objects and access rules.',
          criteria: [
            'Write the exact `malloc` syntax required to allocate a single `Box` struct on the Heap.',
            'Explain mechanically why you are forced to use `->` instead of `.` when operating on a malloc\'d struct.',
          ],
          topicId: 'u3-t8',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t8-s2-rc1',
          front: 'What is the mathematically correct argument to pass to `malloc` when dynamically allocating a struct of type `Data`?',
          back: '`sizeof(Data)` (or `sizeof(struct Data)` if not using typedef). Never hardcode byte numbers.',
          topicId: 'u3-t8',
          tags: ['structs', 'malloc', 'sizeof'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t8-q1',
      type: 'mcq',
      topicId: 'u3-t8',
      difficulty: 'beginner',
      question: 'If `p` is a pointer to a struct containing an integer `x`, how do you access `x`?',
      options: [
        'p.x',
        '*p.x',
        'p->x',
        '->p.x'
      ],
      correctAnswer: 'p->x',
      explanation: 'The arrow operator is used to follow a pointer and access a member.',
      tags: ['structs', 'pointers', 'syntax'],
    },
    {
      id: 'u3-t8-q2',
      type: 'true-false',
      topicId: 'u3-t8',
      difficulty: 'intermediate',
      question: '`(*ptr).value` and `ptr->value` compile to the exact same machine code.',
      correctAnswer: true,
      explanation: 'Yes, the arrow operator is simply syntactic sugar for dereferencing and then using the dot operator.',
      tags: ['structs', 'pointers'],
    },
    {
      id: 'u3-t8-q3',
      type: 'predict-output',
      topicId: 'u3-t8',
      difficulty: 'advanced',
      question: 'What is the output?',
      code: '#include <stdio.h>\ntypedef struct { int val; } Box;\nvoid change(Box *b) { b->val = 50; }\nint main() {\n    Box b1 = {10};\n    change(&b1);\n    printf("%d", b1.val);\n    return 0;\n}',
      correctAnswer: '50',
      explanation: 'We pass the memory address of `b1` to the function. The function follows the pointer and alters the original `b1.val` to 50.',
      tags: ['structs', 'functions', 'pointers'],
    },
    {
      id: 'u3-t8-q4',
      type: 'spot-bug',
      topicId: 'u3-t8',
      difficulty: 'intermediate',
      question: 'Spot the bug:',
      code: 'typedef struct { int x; } Point;\nint main() {\n    Point *p;\n    p->x = 100;\n    return 0;\n}',
      correctAnswer: 'Dereferencing an uninitialized pointer.',
      explanation: '`p` is declared but never initialized to point to a valid `Point` struct (either via `&` or `malloc`). Following a garbage memory address using `->` will cause a Segmentation Fault.',
      tags: ['structs', 'pointers', 'segfault'],
    },
    {
      id: 'u3-t8-q5',
      type: 'mcq',
      topicId: 'u3-t8',
      difficulty: 'advanced',
      question: 'Why does `struct Node { int data; struct Node next; };` fail to compile?',
      options: [
        'Missing typedef',
        'Structs cannot contain structs',
        'It causes an infinite recursive size calculation',
        'It is perfectly valid'
      ],
      correctAnswer: 'It causes an infinite recursive size calculation',
      explanation: 'If a Node contains a full Node, which contains a full Node... the compiler cannot calculate `sizeof(Node)`. It must be a POINTER `struct Node *next`, which is a fixed 8-byte size.',
      tags: ['structs', 'pointers', 'size'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t8-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t8',
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
      id: 'u3-t8-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t8',
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
      id: 'u3-t8-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t8',
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
      id: 'u3-t8-p1',
      title: 'Update Balance via Pointer',
      topicId: 'u3-t8',
      difficulty: 'beginner',
      problemStatement: 'Define an `Account` struct with `balance` (float). Write a function `void deposit(Account *acc, float amount)` that adds the amount to the balance. In main, create an account, call deposit, and print the new balance.',
      constraints: ['Use -> operator', 'Pass by pointer'],
      sampleInput: '',
      sampleOutput: 'Balance: 150.00',
      hints: ['acc->balance += amount;'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    float balance;\n} Account;\n\nvoid deposit(Account *acc, float amount) {\n    acc->balance += amount;\n}\n\nint main(void) {\n    Account myAcc = {100.0};\n    \n    deposit(&myAcc, 50.0);\n    \n    printf("Balance: %.2f\\n", myAcc.balance);\n    return 0;\n}',
      solutionExplanation: 'A classic "pass by reference" emulation in C. By passing the pointer, the `deposit` function can reach back into `main`\'s memory and update the `balance`.',
      dryRun: [
        { step: 1, line: 12, variables: {}, output: '', explanation: 'myAcc created with balance 100.' },
        { step: 2, line: 14, variables: {}, output: '', explanation: 'Address of myAcc passed to deposit.' },
        { step: 3, line: 8, variables: {}, output: '', explanation: 'acc->balance becomes 100 + 50 = 150.' },
      ],
      tags: ['structs', 'pointers', 'functions'],
    },
    {
      id: 'u3-t8-p2',
      title: 'Dynamic Struct Factory',
      topicId: 'u3-t8',
      difficulty: 'intermediate',
      problemStatement: 'Define a `Circle` struct with `radius` (double). Write a function `Circle* createCircle(double r)` that dynamically allocates a Circle on the heap, sets its radius, and returns the pointer. Call it in main, print the radius, and free it.',
      constraints: ['Use malloc', 'Return pointer from function'],
      sampleInput: '',
      sampleOutput: 'Circle radius: 5.50',
      hints: ['Circle *c = malloc(sizeof(Circle));', 'c->radius = r; return c;'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    double radius;\n} Circle;\n\nCircle* createCircle(double r) {\n    Circle *c = (Circle*)malloc(sizeof(Circle));\n    if (c != NULL) {\n        c->radius = r;\n    }\n    return c;\n}\n\nint main(void) {\n    Circle *myCircle = createCircle(5.5);\n    \n    if (myCircle != NULL) {\n        printf("Circle radius: %.2f\\n", myCircle->radius);\n        free(myCircle); /* Clean up */\n    }\n    \n    return 0;\n}',
      solutionExplanation: 'This acts like a "Constructor" in object-oriented languages. It safely allocates memory on the Heap so that it survives the function return, and hands ownership of that memory back to the caller.',
      dryRun: [
        { step: 1, line: 17, variables: {}, output: '', explanation: 'Calls createCircle(5.5)' },
        { step: 2, line: 9, variables: {}, output: '', explanation: 'Allocates 8 bytes on Heap.' },
        { step: 3, line: 11, variables: {}, output: '', explanation: 'Sets heap memory radius to 5.5.' },
        { step: 4, line: 20, variables: {}, output: 'Circle radius: 5.50\\n', explanation: 'Accesses heap data from main.' },
        { step: 5, line: 21, variables: {}, output: '', explanation: 'Frees heap memory.' },
      ],
      tags: ['structs', 'heap', 'malloc'],
    },
    {
      id: 'u3-t8-p3',
      title: 'Link Two Structs Together',
      topicId: 'u3-t8',
      difficulty: 'advanced',
      problemStatement: 'Define a `Node` struct containing an `int data` and a `struct Node *next` pointer. Create two nodes dynamically on the heap. Set their data to 10 and 20. Make the first node\'s `next` pointer point to the second node. Print the second node\'s data by ONLY using the first node\'s pointer. Free both.',
      constraints: ['Self-referential struct', 'Use pointer chaining (node1->next->data)'],
      sampleInput: '',
      sampleOutput: 'Node 2 data: 20',
      hints: ['typedef struct Node { int data; struct Node *next; } Node;', 'n1->next = n2;', 'printf("%d", n1->next->data);'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nint main(void) {\n    /* Allocate two nodes */\n    Node *n1 = (Node*)malloc(sizeof(Node));\n    Node *n2 = (Node*)malloc(sizeof(Node));\n    \n    if (!n1 || !n2) return 1;\n    \n    /* Setup data */\n    n1->data = 10;\n    n2->data = 20;\n    \n    /* Link them! */\n    n1->next = n2;\n    n2->next = NULL; /* Always terminate with NULL */\n    \n    /* Access n2 via n1 */\n    printf("Node 2 data: %d\\n", n1->next->data);\n    \n    /* Free memory */\n    free(n1);\n    free(n2);\n    \n    return 0;\n}',
      solutionExplanation: 'This is the absolute core of Linked Lists. We create two independent objects on the heap, and link them by storing the address of the second inside the first. `n1->next->data` follows the first pointer, then follows the second pointer.',
      dryRun: [
        { step: 1, line: 11, variables: {}, output: '', explanation: 'n1 and n2 created on heap.' },
        { step: 2, line: 21, variables: {}, output: '', explanation: 'n1\'s next pointer now holds the memory address of n2.' },
        { step: 3, line: 25, variables: {}, output: 'Node 2 data: 20\\n', explanation: 'n1->next evaluates to n2. n2->data evaluates to 20.' },
      ],
      tags: ['structs', 'pointers', 'linked-lists'],
    },
  ],
};
