import type { Topic } from '../../../../types';

export const structures: Topic = {
  id: 'u3-t5',
  unitId: 'unit-3',
  title: 'Structures',
  slug: 'structures',
  description: `Structures (struct) are C's primary mechanism for data abstraction — the ability to define custom composite data types that group multiple variables of potentially different types into a single, named entity. Where an array stores N elements of the same type, a structure stores a fixed set of named fields, each of which can be a different type (integers, floats, character arrays, pointers, or even other structures). This capability is the conceptual foundation of object-oriented programming: a structure is essentially a class without methods, grouping logically related data into a single memory block that can be declared, copied, passed to functions, and returned from functions as a single unit.

At the memory level, a structure declaration instructs the compiler to lay out the member fields sequentially within a contiguous block of memory, inserting padding bytes as needed to satisfy the CPU's alignment requirements. The distinction between definition (creating the type blueprint with struct Player { ... };) and declaration (allocating memory with struct Player p1;) is fundamental: a definition generates no machine code and allocates no memory; it merely registers a new type with the compiler's type system. This two-phase model mirrors the separation between function prototypes and function implementations.

Mastering structures requires understanding memory padding and alignment (sizeof(struct) is almost never the simple sum of member sizes), the typedef pattern that eliminates verbose struct-keyword repetition, shallow-copy semantics of the assignment operator (byte-for-byte duplication that shares pointer targets rather than duplicating pointed-to data), and nested composition (embedding structures within structures to build hierarchical data models). These concepts form the essential foundation for pointers to structures, arrays of structures, dynamic memory allocation, and linked data structures covered in subsequent topics.`,
  difficulty: 'intermediate',
  prerequisites: ['u1-t5'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u3-t5-s1',
      title: 'Defining and Using Structures',
      slug: 'defining-structures',
      description: `A structure (struct) in C is a user-defined composite data type that groups together variables of potentially different types into a single named entity. Unlike an array, which stores multiple values of the same type, a structure can combine integers, floats, character arrays, pointers, and even other structures into one cohesive unit that represents a real-world concept — a student record, a coordinate point, a network packet header, or a database row. Structures are C's primary mechanism for data abstraction, and they are the conceptual ancestor of classes in object-oriented languages like C++, Java, and Python.

Defining a structure with struct Player { ... }; creates a blueprint — a type template that tells the compiler how much memory is needed and how the internal fields are laid out, but it does not allocate any memory. Memory is allocated only when you declare a variable of that structure type: struct Player p1;. At that point, the compiler reserves a contiguous block of memory on the stack (or on the heap, if you use malloc) large enough to hold all the structure's members, and you access individual members using the dot operator (p1.name, p1.score). Each structure variable is an independent copy: modifying p1.score has no effect on p2.score, because they occupy separate memory regions.

The distinction between definition (creating the type) and declaration (creating a variable of that type) is fundamental and is a source of confusion for beginners who expect struct definitions to "do something." A struct definition is purely a compile-time instruction; it generates no machine code and allocates no memory. It simply registers a new type with the compiler so that subsequent declarations can use it. This two-phase model mirrors how functions work in C: a function prototype declares the interface, and the function definition provides the implementation. Understanding this separation is essential for organizing structures across multiple files using header files.`,
      keyPoints: [
        'The Blueprint: A `struct` definition is a compiler directive. It maps out the exact byte offsets of the internal variables (called "members" or "fields").',
        'Global Scope: Blueprints are almost always defined at the top of your `.c` file (or in a `.h` header) so that all functions in your program recognize the custom type.',
        'The Semicolon Trap: Because a struct definition is technically a complete C statement, it MUST be terminated with a semicolon `};`. Forgetting this is the #1 cause of catastrophic, file-wide syntax errors.',
        'Instantiation: Writing `struct Player p1;` forces the OS to allocate physical memory on the Stack based on the blueprint\'s exact byte dimensions.',
        'The Dot Operator (`.`): To access or mutate a specific field, use the dot operator (e.g., `p1.health = 100;`). The compiler uses the blueprint to instantly calculate the exact memory address of that specific field within `p1`\'s memory block.',
      ],
      codeExamples: [
        {
          id: 'u3-t5-s1-ex1',
          title: 'Basic Structure Usage',
          code: '#include <stdio.h>\n#include <string.h>\n\n/* 1. Define the blueprint (usually outside main) */\nstruct Student {\n    char name[50];\n    int age;\n    float gpa;\n}; /* <-- DO NOT FORGET THIS SEMICOLON */\n\nint main(void) {\n    /* 2. Declare a variable of type \'struct Student\' */\n    struct Student s1;\n    \n    /* 3. Access members using the dot operator */\n    s1.age = 19;\n    s1.gpa = 3.8;\n    \n    /* Strings must be copied, you cannot use = for arrays */\n    strcpy(s1.name, "Alice");\n    \n    printf("Name: %s, Age: %d, GPA: %.1f\\n", s1.name, s1.age, s1.gpa);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code illustrates the fundamental separation between Type Definition and Memory Allocation. Lines 5-9 merely instruct the compiler on the byte layout of a "Student". Line 13 triggers the actual Stack allocation of ~58 bytes for `s1`. Notice the strict usage of `strcpy` for the string member—you cannot bypass C\'s array assignment restrictions just because the array lives inside a struct.',
          expectedOutput: 'Name: Alice, Age: 19, GPA: 3.8',
          lineBreakdown: [
            { lineNumber: 5, code: 'struct Student {', explanation: 'Commences the blueprint definition. Usually placed in the global scope.' },
            { lineNumber: 9, code: '};', explanation: 'The absolute syntactical requirement. The trailing semicolon terminates the blueprint statement.' },
            { lineNumber: 13, code: '    struct Student s1;', explanation: 'The Allocation Phase. The OS reserves the physical Stack memory required by the blueprint.' },
            { lineNumber: 16, code: '    s1.age = 19;', explanation: 'The Dot Operator calculates the exact byte offset into `s1` to write the integer 19.' },
          ],
          relatedTopicIds: ['u3-t2'],
        },
        {
          id: 'u3-t5-s1-ex2',
          title: 'Structure Initialization and Assignment',
          code: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main(void) {\n    /* 1. Initialization using brace syntax */\n    struct Point p1 = {10, 20};\n    \n    /* 2. Designated initializers (C99+ feature, much cleaner) */\n    struct Point p2 = {.y = 50, .x = 15};\n    \n    /* 3. Direct structure assignment (shallow copy) */\n    struct Point p3;\n    p3 = p1; /* Copies all members from p1 to p3 instantly! */\n    \n    printf("p1: (%d, %d)\\n", p1.x, p1.y);\n    printf("p2: (%d, %d)\\n", p2.x, p2.y);\n    printf("p3: (%d, %d)\\n", p3.x, p3.y);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'C offers powerful, high-speed memory initialization for structs. Line 10 uses traditional brace initialization, filling memory sequentially. Line 13 showcases C99 "Designated Initializers", an industry-standard feature that allows you to initialize specific fields by name, rendering the code immune to future reorderings of the blueprint. Finally, line 17 demonstrates the sheer power of the Struct Assignment Operator: `=` triggers a highly optimized, byte-for-byte bulk memory copy from `p1` to `p3`.',
          expectedOutput: 'p1: (10, 20)\np2: (15, 50)\np3: (10, 20)',
          lineBreakdown: [
            { lineNumber: 10, code: '    struct Point p1 = {10, 20};', explanation: 'Positional initialization. The bytes are written in the exact order specified by the blueprint.' },
            { lineNumber: 13, code: '    struct Point p2 = {.y = 50, .x = 15};', explanation: 'Designated Initializers. Explicitly targets fields by name, making the code vastly more robust.' },
            { lineNumber: 17, code: '    p3 = p1;', explanation: 'Bulk Memory Copy. C executes a raw, byte-for-byte duplication of `p1`\'s entire memory block into `p3`.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t5-s1-cm1',
          title: 'Missing semicolon after struct definition',
          wrongCode: 'struct Point {\n    int x;\n    int y;\n} /* Missing ; */\n\nint main() { ... }',
          correctCode: 'struct Point {\n    int x;\n    int y;\n}; /* Correct */\n\nint main() { ... }',
          explanation: 'Historically, C allowed developers to declare variables on the exact same line as the struct definition (e.g., `struct {int x;} p1;`). Because of this, the compiler parses the closing brace `}` and waits to see if a variable name follows. If you are ONLY defining the blueprint, you MUST terminate it with a semicolon. If you forget, the compiler falsely assumes the very next token in your file (often `int` from `int main()`) is the variable you want to declare, triggering an avalanche of bizarre, cascading syntax errors.',
          consequence: 'Hundreds of confusing compiler errors (e.g., "two or more data types in declaration") pointing to lines far below the actual missing semicolon.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t5-s1-ic1',
          title: 'Shallow Copy vs Deep Copy',
          content: 'The Structural Assignment Operator (`=`) performs a raw "Shallow Copy"—a blind, byte-for-byte memory duplication. If your struct contains integers and floats, this is perfect. However, if your struct contains a `char *` pointer aiming at Heap memory, the shallow copy ONLY duplicates the memory address! Both structs will now possess pointers aiming at the exact same Heap data. If Struct A `free()`s that memory, Struct B is instantly holding a catastrophic Dangling Pointer. In technical interviews, you must demonstrate the ability to write custom "Deep Copy" functions that manually allocate fresh Heap memory for internal pointers.',
          relatedTopicIds: ['u3-t4'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t5-s1-cp1',
          title: 'Struct Basics',
          description: 'Verify your architectural understanding of struct blueprints and memory allocation.',
          criteria: [
            'Architecturally explain the difference between defining a structure blueprint and instantiating a structure variable.',
            'Write a struct definition for `Vector3` containing floats `x`, `y`, `z`, and guarantee you include the required terminating syntax.',
            'Mechanically explain what occurs in RAM when you execute a struct assignment operation (`s1 = s2`).',
          ],
          topicId: 'u3-t5',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t5-s1-rc1',
          front: 'What operator is used to access members of a structure variable?',
          back: 'The dot operator (`.`). Example: `student.age`',
          topicId: 'u3-t5',
          tags: ['structs', 'syntax'],
        },
        {
          id: 'u3-t5-s1-rc2',
          front: 'What does the struct assignment operator (`=`) actually do?',
          back: 'It executes a raw, byte-for-byte memory duplication (a "Shallow Copy") of the entire memory block from the source variable to the destination variable.',
          topicId: 'u3-t5',
          tags: ['structs', 'assignment'],
        },
      ],
    },
    {
      id: 'u3-t5-s2',
      title: 'typedef with Structures',
      slug: 'typedef-structures',
      description: `The typedef keyword in C creates a permanent alias for an existing type, allowing you to refer to that type by a shorter or more descriptive name throughout your program. When applied to structures, typedef eliminates the need to write the struct keyword on every declaration, transforming verbose declarations like struct Player p1 into clean, natural-looking declarations like Player p1. This is not merely a cosmetic improvement — it fundamentally changes how structures integrate into your codebase, making them feel like first-class types on par with int and float.

The standard pattern combines typedef with an anonymous structure definition: typedef struct { char name[50]; int score; } Player;. This single statement defines a structure layout, creates a type alias named Player for it, and leaves the underlying struct unnamed (anonymous). From this point forward, Player is a fully recognized type that can be used in variable declarations, function parameters, return types, sizeof expressions, and pointer declarations. The alternative approach — naming the struct and typedef separately (struct Player_s { ... }; typedef struct Player_s Player;) — is necessary when the structure needs to reference itself, as in linked list nodes: typedef struct Node { int data; struct Node *next; } Node;. A structure cannot refer to its own typedef name inside its own definition because the alias does not exist until the definition is complete.

Using typedef consistently for all custom types is a widely adopted convention in professional C codebases. It reduces visual clutter, makes function signatures more readable, and creates a vocabulary of domain-specific type names (Color, Matrix, Socket, Config) that make the code self-documenting. The tradeoff is a minor loss of explicitness: when you see Player p1, it is not immediately obvious whether Player is a struct, a union, an enum, or a scalar typedef. Some coding standards (notably the Linux kernel style) deliberately avoid typedef for structures to preserve this visibility. The pragmatic choice depends on your project's conventions, but for application-level C programming, typedef for structures is nearly universal.`,
      keyPoints: [
        'The Alias Directive: `typedef <existing_type> <new_name>;` commands the compiler to recognize a new vocabulary word for an existing architecture.',
        'The Fusion Pattern: By writing `typedef struct { ... } AliasName;`, you simultaneously declare the physical memory blueprint and assign it a permanent alias.',
        'Anonymous Structs: Notice the struct has no tag name after the word `struct`. The alias at the end completely assumes its identity.',
        'Capitalization Convention: Professional systems code almost universally capitalizes `typedef` struct aliases (e.g., `Packet`, `Node`) to visually differentiate them from primitive C types.',
      ],
      codeExamples: [
        {
          id: 'u3-t5-s2-ex1',
          title: 'The typedef Pattern',
          code: '#include <stdio.h>\n\n/* Combine struct definition and typedef */\ntypedef struct {\n    int x;\n    int y;\n} Point; /* \'Point\' is the new alias */\n\nint main(void) {\n    /* No need to write \'struct Point\' anymore! */\n    Point p1 = {5, 10};\n    Point p2 = {15, 20};\n    \n    printf("P1 is at %d, %d\\n", p1.x, p1.y);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This is the absolute industry standard for defining structures. We instruct the compiler to create an anonymous struct blueprint, and immediately bind the alias `Point` to it. Moving forward, `Point` functions as a native, single-word data type, identical in syntax to an `int` or `float`.',
          expectedOutput: 'P1 is at 5, 10',
          lineBreakdown: [
            { lineNumber: 4, code: 'typedef struct {', explanation: 'Opens an anonymous struct blueprint while simultaneously initiating an alias directive.' },
            { lineNumber: 7, code: '} Point;', explanation: 'Terminates the blueprint and formally registers the alias `Point` with the compiler.' },
            { lineNumber: 11, code: '    Point p1 = {5, 10};', explanation: 'Clean, modern instantiation syntax completely devoid of the `struct` keyword.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t5-s2-cm1',
          title: 'Confusing typedef name with variable name',
          wrongCode: 'struct {\n    int age;\n} Person;\n\nint main() {\n    Person p1; /* ERROR */\n}',
          correctCode: 'typedef struct {\n    int age;\n} Person;\n\nint main() {\n    Person p1; /* OK */\n}',
          explanation: 'Without `typedef`, the syntax `struct { int age; } Person;` constructs an anonymous blueprint and immediately forces the OS to allocate a single, global variable named `Person`. Later, when you write `Person p1;`, the compiler throws a fatal error because it thinks you are trying to use a variable name as a data type. Injecting the `typedef` keyword fundamentally rewires the compiler\'s logic: it dictates that `Person` is not a variable to be allocated, but a dictionary alias for the blueprint itself.',
          consequence: 'Fatal compiler error: "unknown type name \'Person\'" when attempting to instantiate variables.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t5-s2-ic1',
          title: 'Linux Kernel Coding Style',
          content: 'A fascinating architectural divergence: The official Linux Kernel coding standard vehemently forbids the use of `typedef` for structures! Kernel architects demand the explicit word `struct` (e.g., `struct task_struct`) because it acts as a harsh visual warning that the variable is a massive, complex memory block rather than a lightweight primitive. However, in almost all other C/C++ application-level engineering, `typedef` is the universally accepted best practice.',
          relatedTopicIds: [],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t5-s2-cp1',
          title: 'Typedef Syntax',
          description: 'Verify your mastery of compiler alias directives.',
          criteria: [
            'Mechanically explain the compiler\'s reaction to `struct { int x; } Point;` versus `typedef struct { int x; } Point;`.',
            'Write a pristine `typedef` definition for a `Server` containing an integer `port`.',
          ],
          topicId: 'u3-t5',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t5-s2-rc1',
          front: 'What does `typedef` do?',
          back: 'It commands the compiler to register a new dictionary alias for an existing data type, allowing for cleaner, native-looking variable declarations.',
          topicId: 'u3-t5',
          tags: ['structs', 'typedef'],
        },
      ],
    },
    {
      id: 'u3-t5-s3',
      title: 'Nested Structures and Size/Padding',
      slug: 'nested-structures-padding',
      description: `The size of a structure in memory is almost never the simple sum of the sizes of its individual members. When you declare struct Example { char c; int i; }, you might expect sizeof(struct Example) to be 5 bytes (1 for the char + 4 for the int), but on most systems it will be 8 bytes. The extra 3 bytes are padding — invisible, unused bytes that the compiler inserts between members to ensure that each member's starting address satisfies the CPU's alignment requirements.

Alignment requirements exist because modern CPUs are physically designed to access memory in fixed-size chunks called words (typically 4 or 8 bytes, matching the processor's register width). A 4-byte int that starts at an address divisible by 4 (address 0, 4, 8, 12, ...) can be loaded in a single memory bus transaction. The same int starting at address 3 would straddle two words, requiring the CPU to perform two separate memory reads, mask out the irrelevant bytes, and stitch the pieces together — a process that can be 2–3x slower on some architectures and may even trigger a hardware fault on others (notably ARM and older SPARC processors). To prevent this, the C compiler automatically inserts padding bytes so that every member starts at an address that is a multiple of its natural alignment (typically sizeof(type) for primitive types).

The practical consequence is that the order in which you declare structure members can significantly affect the structure's total size. Consider: struct Bad { char a; int b; char c; } requires 12 bytes (1 + 3 padding + 4 + 1 + 3 trailing padding), while struct Good { int b; char a; char c; } requires only 8 bytes (4 + 1 + 1 + 2 trailing padding). The rule of thumb is to order members from largest alignment requirement to smallest, which minimizes internal padding. In programs that create thousands or millions of structure instances (databases, particle simulations, network packet buffers), this optimization can save megabytes of memory and improve cache performance. You can verify your structure's actual size and member offsets using sizeof() and the offsetof() macro from <stddef.h>.`,
      keyPoints: [
        'Hardware Alignment Constraints: A 4-byte `int` absolutely must start at a memory address that is a multiple of 4. An 8-byte `double` must start at a multiple of 8. This is a physical hardware restriction.',
        'Padding Injection: If a 1-byte `char` is followed by a 4-byte `int`, the compiler will secretly inject 3 bytes of dead padding after the `char` to push the `int` onto a valid 4-byte boundary.',
        'The `sizeof` Mandate: Because padding is heavily dependent on the specific CPU architecture (32-bit vs 64-bit), you must NEVER mathematically guess the size of a struct. Always enforce `sizeof(struct Name)`.',
        'Architectural Optimization: The order of variables directly dictates the amount of wasted padding. Grouping large variables together, or ordering them strictly largest-to-smallest (e.g., `double` -> `int` -> `char`), mathematically minimizes dead padding and compresses your memory footprint.',
        'Composition: Structs can natively embed other structs (e.g., `employee.birthDate.year`), enabling the construction of massive, hierarchical memory blocks.',
      ],
      codeExamples: [
        {
          id: 'u3-t5-s3-ex1',
          title: 'Nested Structures',
          code: '#include <stdio.h>\n\ntypedef struct {\n    int day;\n    int month;\n    int year;\n} Date;\n\ntypedef struct {\n    char name[50];\n    Date birthDate; /* Nested struct */\n} Employee;\n\nint main(void) {\n    Employee e1 = {"John Doe", {15, 8, 1995}};\n    \n    /* Accessing nested members using multiple dots */\n    printf("%s was born in year %d\\n", e1.name, e1.birthDate.year);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'Notice how the initialization uses nested curly braces `{"John Doe", {15, 8, 1995}}`. The inner braces correspond to the `Date` struct embedded inside the `Employee` struct. We access the innermost data by walking down the hierarchy using multiple dot operators: `e1.birthDate.year`.',
          expectedOutput: 'John Doe was born in year 1995',
          lineBreakdown: [
            { lineNumber: 11, code: '    Date birthDate;', explanation: 'A struct used as a data type inside another struct.' },
            { lineNumber: 15, code: '    Employee e1 = {"John Doe", {15, 8, 1995}};', explanation: 'Nested brace initialization.' },
            { lineNumber: 18, code: '    printf("... %d\\n", e1.name, e1.birthDate.year);', explanation: 'Chained dot operators.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u3-t5-s3-ex2',
          title: 'Struct Padding (Memory Wasted)',
          code: '#include <stdio.h>\n\n/* 1 byte + 4 bytes + 1 byte = 6 bytes? */\nstruct BadOrder {\n    char a;   /* 1 byte */\n    int b;    /* 4 bytes */\n    char c;   /* 1 byte */\n};\n\n/* 4 bytes + 1 byte + 1 byte = 6 bytes? */\nstruct GoodOrder {\n    int b;    /* 4 bytes */\n    char a;   /* 1 byte */\n    char c;   /* 1 byte */\n};\n\nint main(void) {\n    printf("Size of BadOrder: %zu bytes\\n", sizeof(struct BadOrder));\n    printf("Size of GoodOrder: %zu bytes\\n", sizeof(struct GoodOrder));\n    return 0;\n}',
          language: 'c',
          explanation: 'This code exposes the brutal memory cost of poor variable ordering. In `BadOrder`, the compiler encounters a 1-byte `char`, but must align the subsequent 4-byte `int` to a 4-byte boundary. It is forced to inject 3 bytes of dead padding. It then places the final `char`, but must inject 3 MORE bytes of padding at the tail to ensure the total struct size is a multiple of 4 (mandated for Array alignment). Total footprint: 12 bytes. `GoodOrder` reorganizes the fields (largest to smallest), requiring only 2 bytes of tail padding. Total footprint: 8 bytes. By simply shuffling lines of code, we slashed RAM consumption by 33%.',
          expectedOutput: 'Size of BadOrder: 12 bytes\nSize of GoodOrder: 8 bytes',
          lineBreakdown: [
            { lineNumber: 18, code: '    printf("Size of BadOrder: %zu bytes\\n", sizeof(struct BadOrder));', explanation: 'Evaluates to 12 due to padding.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t5-s3-cm1',
          title: 'Assuming sizeof(struct) is sum of parts',
          wrongCode: 'struct Data { char c; int i; };\nchar buffer[5];\nmemcpy(buffer, &data, sizeof(struct Data)); /* Overflow! */',
          correctCode: 'struct Data { char c; int i; };\nchar buffer[sizeof(struct Data)]; /* Let compiler decide */',
          explanation: 'Never attempt to manually compute a struct\'s byte size. If you assume 5 bytes (1 for `char`, 4 for `int`) and execute a `memcpy` or file-write operation using that hardcoded number, you will trigger memory corruption. The struct physically occupies 8 bytes due to hidden padding. ALWAYS mandate `sizeof(struct Name)` to extract the true, padded memory geometry.',
          consequence: 'Violent buffer overflows, data corruption, and catastrophic security vulnerabilities when serializing structs to disk or network sockets.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t5-s3-ic1',
          title: 'Struct Padding Optimization',
          content: 'The ultimate systems engineering interview question: "How do you minimize the RAM footprint of a massive C struct without deleting fields?" The definitive answer: "Sort the structural members strictly by descending byte size." By placing 8-byte types (`double`, pointers) at the top, followed by 4-byte (`int`), 2-byte (`short`), and 1-byte (`char`) types at the bottom, you perfectly align the data with the CPU\'s hardware boundaries, completely eliminating internal compiler padding gaps.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t5-s3-cp1',
          title: 'Padding and Nesting',
          description: 'Verify your comprehension of hardware memory alignment.',
          criteria: [
            'Mechanically explain why a CPU architecture forces the C compiler to inject dead padding bytes.',
            'Calculate the exact padded byte size of a struct containing a `char`, a `double`, and an `int` (in that exact order) on a 64-bit CPU.',
            'Demonstrate the nested brace syntax required to initialize a structural hierarchy.',
          ],
          topicId: 'u3-t5',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t5-s3-rc1',
          front: 'Why is `sizeof(struct)` rarely equal to the exact mathematical sum of its member variables?',
          back: 'Because of CPU Memory Alignment rules. The compiler secretly injects dead "Padding" bytes between fields to force variables to align perfectly with the CPU\'s hardware read-lanes, maximizing execution speed at the cost of wasted RAM.',
          topicId: 'u3-t5',
          tags: ['structs', 'memory', 'padding'],
        },
        {
          id: 'u3-t5-s3-rc2',
          front: 'How do you initialize a nested struct?',
          back: 'By using nested curly braces. Example: `Person p = {"John", {12, "Main St"}};`',
          topicId: 'u3-t5',
          tags: ['structs', 'nested'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t5-q1',
      type: 'mcq',
      topicId: 'u3-t5',
      difficulty: 'beginner',
      question: 'Which of the following correctly accesses a struct member?',
      options: [
        'student->age',
        'student.age',
        'student:age',
        'student[age]'
      ],
      correctAnswer: 'student.age',
      explanation: 'The dot operator (`.`) is the standard mechanism in C to navigate into a structure\'s memory block and access a specific field.',
      tags: ['structs', 'syntax'],
    },
    {
      id: 'u3-t5-q2',
      type: 'true-false',
      topicId: 'u3-t5',
      difficulty: 'intermediate',
      question: 'If `struct A { int x; };`, assigning `A1 = A2;` copies the value of `x` from A2 to A1.',
      correctAnswer: true,
      explanation: 'Unlike arrays, which decay to pointers and cannot be assigned with `=`, structs act as distinct, copyable values. The `=` operator performs a byte-for-byte bulk memory copy from the source struct to the destination struct.',
      tags: ['structs', 'assignment'],
    },
    {
      id: 'u3-t5-q3',
      type: 'spot-bug',
      topicId: 'u3-t5',
      difficulty: 'beginner',
      question: 'Spot the bug:',
      code: 'struct Node {\n    int data\n    float score\n}\nint main() { return 0; }',
      correctAnswer: 'Missing semicolons.',
      explanation: 'Semicolons are required to terminate the variable declarations inside the struct (`int data;`, `float score;`), AND a semicolon is absolutely required after the closing brace `};` to terminate the struct definition itself.',
      tags: ['structs', 'syntax'],
    },
    {
      id: 'u3-t5-q4',
      type: 'predict-output',
      topicId: 'u3-t5',
      difficulty: 'advanced',
      question: 'Assume a 32-bit system (int=4 bytes, char=1 byte). What is the likely output?',
      code: '#include <stdio.h>\nstruct A { char c; int i; };\nint main() {\n    printf("%zu", sizeof(struct A));\n    return 0;\n}',
      correctAnswer: '8',
      explanation: 'The char `c` requires 1 byte. The int `i` requires 4 bytes, and therefore must start on a 4-byte memory boundary. To achieve this alignment, the compiler injects 3 bytes of padding after `c`. Total size = 1 (char) + 3 (padding) + 4 (int) = 8 bytes.',
      tags: ['structs', 'memory', 'padding'],
    },
    {
      id: 'u3-t5-q5',
      type: 'mcq',
      topicId: 'u3-t5',
      difficulty: 'intermediate',
      question: 'Why do we use `typedef` with structs?',
      options: [
        'To reduce the memory size of the struct',
        'To prevent memory leaks',
        'To create an alias, avoiding the need to type the word "struct" everywhere',
        'To allow structs to contain functions'
      ],
      correctAnswer: 'To create an alias, avoiding the need to type the word "struct" everywhere',
      explanation: 'Typedef simply renames the type to make the code cleaner and more readable.',
      tags: ['structs', 'typedef'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t5-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t5',
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
      id: 'u3-t5-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t5',
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
      id: 'u3-t5-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t5',
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
      id: 'u3-t5-p1',
      title: 'Rectangle Area',
      topicId: 'u3-t5',
      difficulty: 'beginner',
      problemStatement: 'Define a struct `Rectangle` with integer members `width` and `height`. Write a program that declares a Rectangle, sets width to 5 and height to 10, calculates its area, and prints it.',
      constraints: ['Use typedef struct'],
      sampleInput: '',
      sampleOutput: 'Area: 50',
      hints: ['typedef struct { int width; int height; } Rectangle;', 'Area is width * height.'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    int width;\n    int height;\n} Rectangle;\n\nint main(void) {\n    Rectangle rect;\n    rect.width = 5;\n    rect.height = 10;\n    \n    int area = rect.width * rect.height;\n    printf("Area: %d\\n", area);\n    \n    return 0;\n}',
      solutionExplanation: 'This demonstrates the core lifecycle of a structure: defining the `typedef` blueprint globally, declaring the physical memory in `main`, populating the fields using the dot operator, and using the bundled data in an operation.',
      dryRun: [
        { step: 1, line: 9, variables: {}, output: '', explanation: 'rect variable created in memory (8 bytes).' },
        { step: 2, line: 10, variables: { rect_width: '5' }, output: '', explanation: 'rect.width set to 5.' },
        { step: 3, line: 11, variables: { rect_height: '10' }, output: '', explanation: 'rect.height set to 10.' },
        { step: 4, line: 13, variables: { area: '50' }, output: '', explanation: 'area = 5 * 10 = 50.' },
      ],
      tags: ['structs', 'basics', 'math'],
    },
    {
      id: 'u3-t5-p2',
      title: 'Passing Structs to Functions',
      topicId: 'u3-t5',
      difficulty: 'intermediate',
      problemStatement: 'Define a struct `Time` with `hours` and `minutes`. Write a function `void printTime(Time t)` that takes a Time struct and prints it in HH:MM format. Call it from main.',
      constraints: ['Struct must be defined globally before the function', 'Pass by value'],
      sampleInput: '',
      sampleOutput: 'Time is 09:05',
      hints: ['Use %02d in printf to pad single digits with zero.'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    int hours;\n    int minutes;\n} Time;\n\n/* Pass by value. A full copy of the struct is made. */\nvoid printTime(Time t) {\n    printf("Time is %02d:%02d\\n", t.hours, t.minutes);\n}\n\nint main(void) {\n    Time t1 = {9, 5};\n    printTime(t1);\n    return 0;\n}',
      solutionExplanation: 'This highlights how structs interact with functions. Because we are passing the struct "by value" (`Time t`), C makes a complete copy of the struct memory and hands it to the function. For a small struct like this, that is fine. However, if the struct contained a massive array, copying it would severely hurt performance. In such cases, passing a pointer to the struct is preferred.',
      dryRun: [
        { step: 1, line: 14, variables: {}, output: '', explanation: 't1 initialized with 9 and 5.' },
        { step: 2, line: 15, variables: {}, output: '', explanation: 'printTime called. t1 is copied into t.' },
        { step: 3, line: 10, variables: {}, output: 'Time is 09:05\\n', explanation: '%02d formats 9 as 09, and 5 as 05.' },
      ],
      tags: ['structs', 'functions'],
    },
    {
      id: 'u3-t5-p3',
      title: 'Distance Between Points',
      topicId: 'u3-t5',
      difficulty: 'advanced',
      problemStatement: 'Define a struct `Point` with double `x` and `y`. Write a program that reads coordinates for two points from the user. Calculate and print the straight-line distance between them. Include <math.h>.',
      constraints: ['Use sqrt() and pow()', 'Struct with double'],
      sampleInput: '0 0\n3 4',
      sampleOutput: 'Distance: 5.00',
      hints: ['Distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)', 'Use pow(dx, 2) or just dx * dx.'],
      solution: '#include <stdio.h>\n#include <math.h>\n\ntypedef struct {\n    double x;\n    double y;\n} Point;\n\nint main(void) {\n    Point p1, p2;\n    \n    printf("Enter x y for Point 1: ");\n    scanf("%lf %lf", &p1.x, &p1.y);\n    \n    printf("Enter x y for Point 2: ");\n    scanf("%lf %lf", &p2.x, &p2.y);\n    \n    double dx = p2.x - p1.x;\n    double dy = p2.y - p1.y;\n    \n    double distance = sqrt(dx * dx + dy * dy);\n    \n    printf("Distance: %.2f\\n", distance);\n    return 0;\n}',
      solutionExplanation: 'This demonstrates a highly practical use of structs in graphics and physics calculations. Note the syntax used with `scanf`: `&p1.x`. `p1.x` accesses the double, and the `&` operator gets the exact memory address of that specific field within the struct\'s memory block so `scanf` can write to it.',
      dryRun: [
        { step: 1, line: 13, variables: { p1_x: '0.0', p1_y: '0.0' }, output: '', explanation: 'Reads 0 0 into p1.' },
        { step: 2, line: 16, variables: { p2_x: '3.0', p2_y: '4.0' }, output: '', explanation: 'Reads 3 4 into p2.' },
        { step: 3, line: 18, variables: { dx: '3.0', dy: '4.0' }, output: '', explanation: 'Calculates deltas.' },
        { step: 4, line: 21, variables: { distance: '5.0' }, output: '', explanation: 'sqrt(9 + 16) = sqrt(25) = 5.0.' },
      ],
      tags: ['structs', 'math', 'pointers'],
    },
  ],
};
