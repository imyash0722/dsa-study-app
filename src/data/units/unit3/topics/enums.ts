import type { Topic } from '../../../../types';

export const enums: Topic = {
  id: 'u3-t11',
  unitId: 'unit-3',
  title: 'Enums',
  slug: 'enums',
  description: `In software engineering, "magic numbers" — undocumented integer literals scattered throughout source code — are a primary source of unmaintainable, error-prone logic. Enumerations (enum) solve this problem by allowing the programmer to define a named vocabulary of integer constants that the compiler substitutes during compilation: instead of writing state = 3, you write state = FAILED, making the code self-documenting and resistant to the errors that arise when the meaning of a raw integer is forgotten or misremembered.

Under the hood, C enumerations are purely a compile-time abstraction with zero runtime overhead. The compiler assigns each enumerator an integer value (starting from 0 by default, incrementing by 1 for each subsequent name, with optional manual overrides), replaces every occurrence of the name with its integer value during compilation, and discards the name entirely from the compiled binary. This means that enum variables are just int variables at runtime, and C does not enforce type safety — assigning an arbitrary integer to an enum variable compiles without error, even if that integer does not correspond to any defined enumerator.

Despite this lack of type safety, disciplined use of enumerations dramatically improves code quality. Switch statements on enum values make program logic explicit and self-documenting; modern compilers with -Wswitch can warn when a switch fails to cover all enumerators, catching logical omissions at compile time. The typedef pattern (typedef enum { ... } TypeName) eliminates verbose syntax, and the lookup table pattern (using enum values as array indices) provides an efficient mechanism for converting enum values to their string representations for logging, debugging, and user-facing output.`,
  difficulty: 'beginner',
  prerequisites: ['u1-t5'],
  estimatedMinutes: 30,
  subtopics: [
    {
      id: 'u3-t11-s1',
      title: 'Defining and Using Enums',
      slug: 'defining-enums',
      description: `An enumeration (enum) in C is a user-defined type that assigns human-readable names to a set of integer constants. Instead of writing state = 3 and relying on comments or documentation to remember that 3 means "connection failed," you define enum ConnState { CONNECTED, DISCONNECTED, FAILED } and write state = FAILED. The compiler replaces each enum name with its corresponding integer value during compilation, so there is zero runtime overhead — enums are purely a compile-time abstraction that improves code readability, maintainability, and self-documentation.

By default, the compiler assigns consecutive integer values starting from 0: the first enumerator gets 0, the second gets 1, and so on. You can override these defaults by explicitly assigning values: enum HttpStatus { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 }. If you assign a value to one enumerator and leave the next unassigned, the compiler continues incrementing from the assigned value: in enum Color { RED = 5, GREEN, BLUE }, GREEN is 6 and BLUE is 7. This auto-increment behavior is convenient but can cause accidental value collisions if you are not careful.

Unlike enums in languages like Java, Rust, or TypeScript, C enums are not type-safe. An enum variable is just an int under the hood, and the compiler will happily accept any integer value in an enum variable, even one that does not correspond to any defined enumerator. Writing state = 42 compiles without error even if 42 is not a valid ConnState value. This lack of type safety means that C enums should be thought of as named integer constants rather than true enumerated types. Despite this limitation, consistent use of enums dramatically improves code quality: switch statements on enum values make intent explicit, and modern compilers can warn when a switch does not cover all enumerators (with -Wswitch), catching logical errors at compile time.`,
      keyPoints: [
        'An `enum` (enumeration) is a custom data type consisting of a finite set of integral constants.',
        'Automatic Numbering: By default, the C compiler assigns the integer `0` to the first identifier. Each subsequent identifier is automatically incremented by 1.',
        'Manual Override: You can explicitly dictate the numeric value of any identifier (e.g., `enum State { START = 10, STOP = 50 };`).',
        'The Type-Safety Illusion: Under the hood, C ruthlessly strips away the names and treats all enum variables as bare `int` types. Unlike C++ or Java, C does not physically prevent you from assigning an invalid number (like `99`) to an enum variable.',
        'State Machines: Enums are the industry standard for driving `switch` statements that control complex, multi-stage systems (like video game logic or network protocols).',
      ],
      codeExamples: [
        {
          id: 'u3-t11-s1-ex1',
          title: 'Basic Enum Syntax',
          code: '#include <stdio.h>\n\n/* Define the enum */\nenum Day { SUN, MON, TUE, WED, THU, FRI, SAT };\n\nint main(void) {\n    /* Declare an enum variable */\n    enum Day today;\n    today = WED;\n    \n    printf("Day %d\\n", today);\n    \n    if (today == WED) {\n        printf("It is Wednesday!\\n");\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'During the compilation phase, the compiler physically searches for `SUN`, `MON`, etc., and replaces them with 0, 1, 2, etc. Therefore, `today` technically holds the raw integer 3. However, writing `if (today == WED)` makes the source code read like natural English, drastically reducing cognitive load.',
          expectedOutput: 'Day 3\nIt is Wednesday!',
          lineBreakdown: [
            { lineNumber: 4, code: 'enum Day { SUN, MON, TUE, WED, THU, FRI, SAT };', explanation: 'Initializes the sequence. `SUN` is silently assigned 0, cascading up to `SAT` as 6.' },
            { lineNumber: 9, code: '    today = WED;', explanation: 'Assigns the symbolic constant (which evaluates to 3) to the state variable.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u3-t11-s1-ex2',
          title: 'Customizing Enum Values',
          code: '#include <stdio.h>\n\nenum HttpCode {\n    OK = 200,\n    NOT_FOUND = 404,\n    SERVER_ERROR = 500\n};\n\nint main(void) {\n    enum HttpCode status = NOT_FOUND;\n    \n    switch (status) {\n        case OK:\n            printf("Success!\\n"); break;\n        case NOT_FOUND:\n            printf("Page missing.\\n"); break;\n        case SERVER_ERROR:\n            printf("Server crashed.\\n"); break;\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'Enum values do not have to start at 0, nor do they have to be continuous. They are the ideal mechanism for grouping related, non-sequential system codes (like HTTP status codes or hardware error flags) under a single architectural umbrella.',
          expectedOutput: 'Page missing.',
          lineBreakdown: [
            { lineNumber: 5, code: '    NOT_FOUND = 404,', explanation: 'Manually overriding the compiler\'s default counting system with a specific integer value.' },
            { lineNumber: 13, code: '    switch (status) {', explanation: 'Because enums compile down to primitive integers, they function perfectly as `switch` statement discriminators.' },
          ],
          relatedTopicIds: ['u1-t9'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t11-s1-cm1',
          title: 'Trying to print the enum name',
          wrongCode: 'enum Color { RED, BLUE };\nenum Color c = RED;\nprintf("Color is: %s", c); /* Crash! */',
          correctCode: 'enum Color { RED, BLUE };\nenum Color c = RED;\nif (c == RED) printf("Color is: RED");',
          explanation: 'Because enums are literally just primitive integers (0, 1, 2) inside the compiled binary, the C compiler does NOT save the ASCII string "RED" anywhere in the executable file. If you attempt to print `c` using the `%s` (string) specifier, you are instructing the CPU to treat the number 0 as a memory address, which causes an immediate Segmentation Fault. You must print enums using `%d`, or write a function to map the integer back to a string.',
          consequence: 'Segmentation fault or printing garbage.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t11-s1-ic1',
          title: 'Type Safety of Enums in C',
          content: 'A critical architectural detail: In C, enums are not strictly type-checked. The compiler views them entirely as generic `int`s. This means writing `enum Day d = 999;` is perfectly legal C code and compiles without warning, even though 999 is clearly not a valid day! In modern languages like C++ or Rust, this is a strict compilation error. Pointing out C\'s lack of strict enum type-safety demonstrates a deep, systems-level understanding of the language.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t11-s1-cp1',
          title: 'Enum Logic',
          description: 'Verify your understanding of enum initialization and internal representation.',
          criteria: [
            'If you declare `enum {A, B=5, C};`, mechanically explain what integer value `C` is assigned.',
            'Explain architecturally why you cannot use `%s` to print the word "WED" if a variable holds `WED`.',
            'Can an enum variable in C successfully compile if assigned a random integer not defined in the enum block?',
          ],
          topicId: 'u3-t11',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t11-s1-rc1',
          front: 'Unless explicitly overridden, what is the default starting value of the first identifier in an `enum`?',
          back: '0. Every subsequent identifier automatically increments by exactly 1.',
          topicId: 'u3-t11',
          tags: ['enums', 'values'],
        },
        {
          id: 'u3-t11-s1-rc2',
          front: 'What fundamental primitive data type does C use internally to represent all enum values?',
          back: 'A standard integer (`int`).',
          topicId: 'u3-t11',
          tags: ['enums', 'types'],
        },
      ],
    },
    {
      id: 'u3-t11-s2',
      title: 'Typedef with Enums',
      slug: 'typedef-enums',
      description: `Just as with structures, C requires you to write the enum keyword before every variable declaration: enum Color c = RED. The typedef keyword eliminates this verbosity by creating a permanent alias: typedef enum { RED, GREEN, BLUE } Color allows you to write simply Color c = RED. This pattern is universally used in professional C codebases to make enum declarations indistinguishable from built-in types.

The combination of typedef and enum also enables the creation of self-documenting function interfaces. A function declared as void setLED(Color c) immediately communicates that its parameter is a color, whereas void setLED(int c) communicates nothing about what integer values are valid. Although the compiler treats both as int, the typedef name serves as documentation that guides the programmer to use the correct set of named constants. Modern coding standards strongly encourage this practice because it catches logical errors earlier in the development process \u2014 a developer is much more likely to notice the mistake in setLED(42) than to question whether 42 is a valid raw integer.

A common and powerful pattern combines enums with arrays to create lookup tables: const char *colorNames[] = {"Red", "Green", "Blue"}. Because the enum values are sequential integers starting from 0, they can be used directly as array indices: printf("%s", colorNames[RED]) prints "Red". This pattern is widely used for converting enum values to their string representations for logging, debugging output, and user-facing messages. It works perfectly as long as the enum values are contiguous and zero-based; if you assign custom non-sequential values, the array indexing trick breaks and you need a switch statement or a hash map instead.`,
      keyPoints: [
        'Syntax: By wrapping the definition in a typedef (`typedef enum { VAL1, VAL2 } TypeName;`), you create a globally recognized type alias.',
        'This allows you to declare variables natively using `TypeName varName;`, completely eliminating the need for the `enum` keyword.',
        'This specific pattern is embedded deeply in standard C libraries (e.g., `typedef enum { false, true } bool;` was how booleans were implemented before `<stdbool.h>` was introduced in C99).',
      ],
      codeExamples: [
        {
          id: 'u3-t11-s2-ex1',
          title: 'Typedef Enum Pattern',
          code: '#include <stdio.h>\n\ntypedef enum {\n    PENDING,\n    APPROVED,\n    REJECTED\n} RequestStatus;\n\nint main(void) {\n    /* No \'enum\' keyword needed! */\n    RequestStatus myRequest = APPROVED;\n    \n    if (myRequest == APPROVED) {\n        printf("Proceed with action.\\n");\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'By applying `typedef` to the anonymous enumeration and naming it `RequestStatus`, we forge a clean, highly readable data type that syntactically behaves exactly like a built-in primitive type.',
          expectedOutput: 'Proceed with action.',
          lineBreakdown: [
            { lineNumber: 3, code: 'typedef enum {', explanation: 'Initiates the creation of an anonymous enum while simultaneously preparing to assign it a global type alias.' },
            { lineNumber: 7, code: '} RequestStatus;', explanation: 'The final, polished alias name for the new type.' },
            { lineNumber: 11, code: '    RequestStatus myRequest = APPROVED;', explanation: 'A clean, modern variable declaration devoid of the `enum` keyword.' },
          ],
          relatedTopicIds: ['u3-t5'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t11-s2-cm1',
          title: 'Re-using enum constant names',
          wrongCode: 'enum Traffic { RED, GREEN };\nenum Fruit { APPLE, RED }; /* ERROR */',
          correctCode: 'enum Traffic { TRAFFIC_RED, TRAFFIC_GREEN };\nenum Fruit { FRUIT_APPLE, FRUIT_RED };',
          explanation: 'In C, enum constants leak aggressively into the global namespace. You cannot have two separate enums that both attempt to define the identifier `RED`. To prevent these fatal naming collisions, professional C programmers universally prefix their enum values with an abbreviation of the enum\'s name (e.g., `TRAFFIC_RED`, `FRUIT_RED`).',
          consequence: 'Compilation error (redeclaration of enumerator).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t11-s2-ic1',
          title: 'Enums vs #define Macros',
          content: 'A classic technical interview question: "Why use enums instead of `#define RED 0` macros?" The answer revolves around tooling and grouping. 1) Enums logically bundle related constants together. 2) The compiler handles the automatic sequential numbering, preventing manual duplication errors. 3) Crucially, because `#define` macros are physically erased by the Preprocessor before compilation, debuggers (like GDB) cannot see macro names. Enums, however, survive into the compiler, allowing debuggers to display the human-readable names during a crash.',
          relatedTopicIds: ['u4-t7'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t11-s2-cp1',
          title: 'Typedef and Scope',
          description: 'Verify your understanding of modern naming conventions and scoping rules.',
          criteria: [
            'Write a flawless `typedef enum` declaration for a `Direction` type containing UP, DOWN, LEFT, and RIGHT.',
            'Explain the architectural reason why you should prefix your constants as `DIR_UP` rather than simply `UP`.',
          ],
          topicId: 'u3-t11',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t11-s2-rc1',
          front: 'Why is an `enum` generally preferred over a `#define` macro for grouping sets of integer constants?',
          back: 'Because `enum` symbols are preserved and visible to debuggers (unlike macros which are erased), and the compiler automatically handles the sequential numbering.',
          topicId: 'u3-t11',
          tags: ['enums', 'macros'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t11-q1',
      type: 'mcq',
      topicId: 'u3-t11',
      difficulty: 'beginner',
      question: 'What is the underlying data type of an enum in C?',
      options: ['char', 'float', 'int', 'string'],
      correctAnswer: 'int',
      explanation: 'All enum constants are stored and evaluated as standard integers.',
      tags: ['enums', 'types'],
    },
    {
      id: 'u3-t11-q2',
      type: 'predict-output',
      topicId: 'u3-t11',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: 'enum Level { LOW=5, MEDIUM, HIGH=20, EXTREME };\nint main() {\n    printf("%d %d", MEDIUM, EXTREME);\n    return 0;\n}',
      correctAnswer: '6 21',
      explanation: 'If a value is not specified, it is exactly 1 greater than the previous value. `LOW=5`, so `MEDIUM=6`. `HIGH=20`, so `EXTREME=21`.',
      tags: ['enums', 'values'],
    },
    {
      id: 'u3-t11-q3',
      type: 'true-false',
      topicId: 'u3-t11',
      difficulty: 'intermediate',
      question: 'If `enum Color c = RED;`, `printf("%s", c)` will print the word "RED".',
      correctAnswer: false,
      explanation: 'Enums are integers. The string "RED" does not exist at runtime. Printing it with `%s` will cause a crash.',
      tags: ['enums', 'printing'],
    },
    {
      id: 'u3-t11-q4',
      type: 'spot-bug',
      topicId: 'u3-t11',
      difficulty: 'intermediate',
      question: 'Spot the bug:',
      code: 'enum Modes { EASY, HARD };\nenum Feelings { HARD, SOFT };\nint main() { return 0; }',
      correctAnswer: 'Redeclaration of HARD.',
      explanation: 'Enum constants share the same global namespace. `HARD` cannot belong to both `Modes` and `Feelings`.',
      tags: ['enums', 'scope'],
    },
    {
      id: 'u3-t11-q5',
      type: 'mcq',
      topicId: 'u3-t11',
      difficulty: 'advanced',
      question: 'Is `enum Day d = 100;` legal in C? (Assuming Day only has 7 days defined)',
      options: [
        'Yes, C does not enforce type safety on enums.',
        'No, it causes a compilation error.',
        'No, it causes a runtime exception.',
        'Yes, but it automatically loops back to 0.'
      ],
      correctAnswer: 'Yes, C does not enforce type safety on enums.',
      explanation: 'Because C treats enums purely as integers, assigning an out-of-bounds integer is perfectly legal, though logically incorrect. C++ fixes this.',
      tags: ['enums', 'safety'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t11-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t11',
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
      id: 'u3-t11-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t11',
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
      id: 'u3-t11-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t11',
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
      id: 'u3-t11-p1',
      title: 'Vending Machine States',
      topicId: 'u3-t11',
      difficulty: 'beginner',
      problemStatement: 'Define an enum `MachineState` with `IDLE`, `COIN_INSERTED`, and `DISPENSING`. Write a program that starts in `IDLE`, prints the state number, changes to `COIN_INSERTED`, and prints the state number.',
      constraints: ['Use typedef enum'],
      sampleInput: '',
      sampleOutput: 'State: 0\nState: 1',
      hints: ['typedef enum { ... } MachineState;'],
      solution: '#include <stdio.h>\n\ntypedef enum {\n    IDLE,\n    COIN_INSERTED,\n    DISPENSING\n} MachineState;\n\nint main(void) {\n    MachineState state = IDLE;\n    printf("State: %d\\n", state);\n    \n    state = COIN_INSERTED;\n    printf("State: %d\\n", state);\n    \n    return 0;\n}',
      solutionExplanation: 'Demonstrates the most common use case for enums: tracking the state of a system over time.',
      dryRun: [
        { step: 1, line: 10, variables: { state: '0' }, output: '', explanation: 'IDLE evaluates to 0.' },
        { step: 2, line: 13, variables: { state: '1' }, output: '', explanation: 'COIN_INSERTED evaluates to 1.' },
      ],
      tags: ['enums', 'states'],
    },
    {
      id: 'u3-t11-p2',
      title: 'Enum to String Converter',
      topicId: 'u3-t11',
      difficulty: 'intermediate',
      problemStatement: 'Define an enum `Month` (JAN=1, FEB, MAR...). Write a function `const char* getMonthName(Month m)` that uses a switch statement to return the string name of the month ("January", "February", etc.). Test it in main.',
      constraints: ['Start JAN at 1', 'Use switch'],
      sampleInput: '',
      sampleOutput: 'Month 2 is February',
      hints: ['case FEB: return "February";'],
      solution: '#include <stdio.h>\n\ntypedef enum {\n    JAN = 1, FEB, MAR, APR, MAY, JUN,\n    JUL, AUG, SEP, OCT, NOV, DEC\n} Month;\n\nconst char* getMonthName(Month m) {\n    switch (m) {\n        case JAN: return "January";\n        case FEB: return "February";\n        case MAR: return "March";\n        /* Ignoring the rest for brevity */\n        default: return "Unknown";\n    }\n}\n\nint main(void) {\n    Month current = FEB;\n    printf("Month %d is %s\\n", current, getMonthName(current));\n    return 0;\n}',
      solutionExplanation: 'Because enums are just integers, we must write manual mapping functions like this if we want to print their text names to the user.',
      dryRun: [
        { step: 1, line: 19, variables: { current: '2' }, output: '', explanation: 'JAN=1, so FEB=2.' },
        { step: 2, line: 10, variables: {}, output: '', explanation: 'Switch hits case FEB, returns string literal "February".' },
      ],
      tags: ['enums', 'switch', 'strings'],
    },
    {
      id: 'u3-t11-p3',
      title: 'Menu Driven Calculator',
      topicId: 'u3-t11',
      difficulty: 'advanced',
      problemStatement: 'Define a typedef enum `Operation` with `ADD=1`, `SUBTRACT=2`, `QUIT=3`. Write a loop that asks the user to enter an operation (1, 2, or 3) using scanf. If 1 or 2, read two numbers and do the math. If 3, break the loop.',
      constraints: ['Use enum in switch case'],
      sampleInput: '1\n10 5\n3',
      sampleOutput: 'Enter op: \nResult: 15\nEnter op: \nExiting.',
      hints: ['scanf("%d", &opChoice); switch(opChoice) { ... }'],
      solution: '#include <stdio.h>\n\ntypedef enum {\n    ADD = 1,\n    SUBTRACT = 2,\n    QUIT = 3\n} Operation;\n\nint main(void) {\n    int choice;\n    int a, b;\n    \n    while (1) {\n        printf("Enter op (1=Add, 2=Sub, 3=Quit): ");\n        scanf("%d", &choice);\n        \n        /* Cast integer from scanf to our Enum type */\n        Operation op = (Operation)choice;\n        \n        if (op == QUIT) {\n            printf("Exiting.\\n");\n            break;\n        }\n        \n        printf("Enter two numbers: ");\n        scanf("%d %d", &a, &b);\n        \n        switch (op) {\n            case ADD:\n                printf("Result: %d\\n", a + b);\n                break;\n            case SUBTRACT:\n                printf("Result: %d\\n", a - b);\n                break;\n            default:\n                printf("Invalid op.\\n");\n        }\n    }\n    \n    return 0;\n}',
      solutionExplanation: 'Shows how to safely cast raw integer input from the user into a structured Enum type to drive the logic of an application.',
      dryRun: [
        { step: 1, line: 15, variables: { choice: '1' }, output: '', explanation: 'User types 1.' },
        { step: 2, line: 18, variables: { op: '1' }, output: '', explanation: 'op becomes ADD.' },
        { step: 3, line: 29, variables: { a: '10', b: '5' }, output: 'Result: 15\\n', explanation: 'Switch hits case ADD.' },
      ],
      tags: ['enums', 'switch', 'casting'],
    },
  ],
};
