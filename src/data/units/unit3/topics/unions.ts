import type { Topic } from '../../../../types';

export const unions: Topic = {
  id: 'u3-t10',
  unitId: 'unit-3',
  title: 'Unions',
  slug: 'unions',
  description: `While structures allocate separate, non-overlapping memory for each member, a union takes a radically different approach: it forces all of its members to share the exact same physical memory address, overlapping completely. The size of a union equals the size of its largest member (plus alignment padding), and writing to any one member physically overwrites the binary data of all other members. A union can therefore hold only one value at a time — you store an integer, or a float, or a character array, but never more than one simultaneously.

This shared-memory design serves two primary purposes. First, memory conservation: in embedded systems or protocol implementations where RAM is severely constrained, a union allows a variable to represent any one of several possible types while consuming only enough memory for the largest alternative. Second, type punning: by writing data as one type and reading it as another, unions provide a low-level mechanism for inspecting the raw binary representation of data — for example, examining the IEEE 754 bit pattern of a floating-point number by reading it through an unsigned integer member.

The critical danger of raw unions is the absence of any built-in mechanism to track which member currently contains valid data. Reading the wrong member silently reinterprets the stored bit pattern under a different encoding, producing garbage without any compiler warning or runtime error. The standard solution is the tagged union (discriminated union) pattern: wrapping the union inside a structure alongside an enum field that records which member is currently active. This pattern is the C equivalent of algebraic data types in Rust, Haskell, and TypeScript, and it is the architecture used internally by interpreters (CPython's PyObject) to implement dynamically typed variables.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t5'],
  estimatedMinutes: 40,
  subtopics: [
    {
      id: 'u3-t10-s1',
      title: 'Unions vs Structures',
      slug: 'unions-vs-structures',
      description: `A union in C is a composite data type that is syntactically almost identical to a structure but is fundamentally different in its memory layout. Where a structure allocates separate, non-overlapping memory for each member (the total size is the sum of all members plus padding), a union allocates a single shared block of memory large enough to hold only its largest member, and all members begin at the same starting address (byte offset 0). Writing to any one member overwrites the raw bytes of all other members, because they all occupy the same physical memory. This means a union can hold only one value at a time; you store an int, or a float, or a char array, but never more than one simultaneously.

The size of a union is determined by its largest member. If a union contains an int (4 bytes), a double (8 bytes), and a char[20] (20 bytes), the union's total size is at least 20 bytes (plus any alignment padding). When you write a double value into the union, all 8 bytes of the double are written starting at byte 0. If you then read the int member, you get the first 4 bytes of the double's IEEE 754 representation reinterpreted as an integer — a completely meaningless value. This type-punning behavior (reading one type's bit pattern as another type) is technically undefined behavior in most cases under the C standard, though some compilers provide well-defined semantics for it as an extension.

Unions exist to save memory in situations where a variable needs to hold one of several possible types but never more than one at a time. This is common in protocol parsers (a message field might be an integer, a string, or a float depending on the message type), in interpreters and virtual machines (a value register might hold any data type), and in embedded systems where RAM is severely constrained. The critical danger is that a raw union provides no mechanism to track which member is currently valid — the programmer must maintain that knowledge externally, or risk reading the wrong member and producing garbage data without any compiler warning or runtime error.`,
      keyPoints: [
        'The syntax for defining a union is identical to defining a structure, but you use the keyword `union` instead of `struct`.',
        'Memory Size: The physical footprint of a union is determined solely by its largest member. It does not sum the sizes of its members like a structure does.',
        'The Overwrite Rule: Because all members point to the same starting memory address, writing to one member physically overwrites the binary data of whatever was stored there previously.',
        'Practical Use: Unions are ideal when an object can be one of several different types, but will never be more than one at the same time. This saves massive amounts of memory when creating arrays of thousands of variant objects.',
      ],
      codeExamples: [
        {
          id: 'u3-t10-s1-ex1',
          title: 'Struct vs Union Memory',
          code: '#include <stdio.h>\n\nstruct MyStruct {\n    int i;\n    double d;\n    char c;\n};\n\nunion MyUnion {\n    int i;\n    double d;\n    char c;\n};\n\nint main(void) {\n    printf("Size of Struct: %zu bytes\\n", sizeof(struct MyStruct));\n    printf("Size of Union: %zu bytes\\n", sizeof(union MyUnion));\n    return 0;\n}',
          language: 'c',
          explanation: 'This code illustrates the fundamental architectural difference between structs and unions. The struct spreads its members out sequentially in memory, requiring enough space for all of them simultaneously (plus padding for alignment). The union, however, collapses all members onto the exact same starting byte. Since the largest member is the 8-byte `double`, the entire union takes exactly 8 bytes. `i`, `d`, and `c` are just different lenses through which we view those same 8 bytes.',
          expectedOutput: 'Size of Struct: 24 bytes\nSize of Union: 8 bytes\n(Sizes may vary by system)',
          lineBreakdown: [
            { lineNumber: 9, code: 'union MyUnion {', explanation: 'Instructs the compiler to overlap all listed members in memory, rather than placing them sequentially.' },
            { lineNumber: 17, code: '    printf("Size of Union: %zu bytes\\n", sizeof(union MyUnion));', explanation: 'Evaluates to 8, because the compiler allocates only enough space to fit the largest constituent (the double).' },
          ],
          relatedTopicIds: ['u3-t5'],
        },
        {
          id: 'u3-t10-s1-ex2',
          title: 'The Overwrite Behavior',
          code: '#include <stdio.h>\n\nunion Data {\n    int i;\n    float f;\n};\n\nint main(void) {\n    union Data data;\n    \n    data.i = 10;\n    printf("i: %d, f: %f\\n", data.i, data.f);\n    \n    /* Now we write to f. This DESTROYS the int value! */\n    data.f = 220.5;\n    printf("i: %d, f: %f\\n", data.i, data.f);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This is the most critical behavioral quirk of a union. When we write `10` into `data.i`, the first 4 bytes of the block are set to the binary representation of integer 10. When we subsequently write `220.5` into `data.f`, the CPU writes the IEEE 754 binary representation of 220.5 directly over top of the integer data. The integer is physically destroyed. If we then try to print `data.i`, `printf` obediently reads those floating-point bits and blindly interprets them as an integer, producing a massive, seemingly random number.',
          expectedOutput: 'i: 10, f: 0.000000\ni: 1129414656, f: 220.500000',
          lineBreakdown: [
            { lineNumber: 11, code: '    data.i = 10;', explanation: 'The 4-byte memory block now holds the binary pattern for the integer 10.' },
            { lineNumber: 15, code: '    data.f = 220.5;', explanation: 'The exact same 4-byte block is overwritten with the binary pattern for the float 220.5. The integer 10 is gone.' },
            { lineNumber: 16, code: '    printf("i: %d...", data.i);', explanation: 'Attempts to read float bits as if they were integer bits, producing numerical garbage.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t10-s1-cm1',
          title: 'Trying to use all members simultaneously',
          wrongCode: 'union Data d;\nd.i = 5;\nd.f = 3.14;\nprintf("%d and %f", d.i, d.f);',
          correctCode: 'union Data d;\nd.i = 5;\nprintf("%d\\n", d.i);\nd.f = 3.14;\nprintf("%f\\n", d.f);',
          explanation: 'A union is not a struct. You cannot use it to store multiple disparate pieces of data simultaneously. You can only reliably read the specific member that you most recently wrote to. Beginners often try to initialize multiple members at once or assume the union magically keeps the data separate.',
          consequence: 'Silent data corruption. Writing to `d.f` obliterates whatever was stored in `d.i`, resulting in logic errors that are notoriously difficult to track down.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t10-s1-ic1',
          title: 'Type Punning',
          content: 'Unions are heavily used in systems programming for a technique called "Type Punning" — reading the raw binary of one data type through the lens of another. For example, if you want to inspect the exact IEEE 754 bit-pattern that the CPU uses to represent a `float`, you can store the float in a union, and then read it back out through an `unsigned int` member. This allows you to manipulate floating-point data at the bitwise level, completely bypassing C\'s strict type checking.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t10-s1-cp1',
          title: 'Union Mechanics',
          description: 'Verify your mental model of overlapping memory blocks.',
          criteria: [
            'Explain mechanically how the `sizeof` a union is calculated by the compiler.',
            'Describe exactly what happens to the binary data when you assign a value to `union.a` and then to `union.b`.',
          ],
          topicId: 'u3-t10',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t10-s1-rc1',
          front: 'How does the compiler determine the total memory size of a `union`?',
          back: 'A union is exactly the size of its largest single member (plus any padding required for alignment). It does not sum the sizes of its members.',
          topicId: 'u3-t10',
          tags: ['unions', 'memory'],
        },
        {
          id: 'u3-t10-s1-rc2',
          front: 'What happens to the data in `unionData.x` when you write a new value to `unionData.y`?',
          back: 'The data in `x` is physically overwritten and destroyed, because `x` and `y` share the exact same starting address in RAM.',
          topicId: 'u3-t10',
          tags: ['unions', 'data-loss'],
        },
      ],
    },
    {
      id: 'u3-t10-s2',
      title: 'The Tagged Union Pattern',
      slug: 'tagged-unions',
      description: `A raw union is inherently unsafe because it provides no way to determine which of its members currently contains valid data. If you store a float value and later read the int member, the program silently reinterprets the float's bit pattern as an integer — no error, no warning, just garbage. The standard solution to this problem is the tagged union (also called a discriminated union), which wraps the union inside a structure alongside an integer or enum field that records which member is currently active.

The tag field (often named type or kind) acts as metadata that travels with the union value, allowing any code that receives the tagged union to inspect the tag before accessing a member. A switch statement on the tag value is the canonical access pattern: each case branch accesses only the union member that corresponds to that tag value, and a default branch handles the error case where the tag holds an unexpected value. This pattern guarantees that the correct member is always read, completely eliminating the type-confusion bug that plagues raw unions.

Tagged unions are one of the most important data modeling patterns in systems programming. They are the C equivalent of algebraic data types (sum types) found in languages like Rust (enum), Haskell (data), and TypeScript (discriminated unions). Every interpreter implements its value type as a tagged union: a Value struct contains a TypeTag enum and a union of int, double, char*, bool, and pointer. JSON parsers use tagged unions to represent the six JSON value types. Network protocol implementations use tagged unions to represent variable-format message payloads. The pattern is so fundamental that some modern languages (Rust, Swift) build it directly into their type systems with compiler-enforced exhaustiveness checking — ensuring you handle every possible variant. In C, this discipline is entirely the programmer's responsibility.`,
      keyPoints: [
        'A "Tagged Union" (or Variant) is a design pattern: it is a `struct` containing a type flag (the tag) and a `union` (the payload).',
        'Whenever you write data into the union payload, you MUST simultaneously update the tag to reflect the new data type.',
        'Whenever you read data from the union, you MUST first evaluate the tag (usually via a `switch` statement) to ensure you are accessing the correct, active member.',
        'This pattern provides the dynamic flexibility of languages like Python (where a variable can change its type on the fly) while maintaining strict memory safety and minimizing RAM usage.',
      ],
      codeExamples: [
        {
          id: 'u3-t10-s2-ex1',
          title: 'Implementing a Tagged Union',
          code: '#include <stdio.h>\n\n/* The Tag */\ntypedef enum { TYPE_INT, TYPE_FLOAT, TYPE_STRING } DataType;\n\n/* The Tagged Union */\ntypedef struct {\n    DataType type;\n    union {\n        int i;\n        float f;\n        char* str;\n    } value; /* Anonymous union member named \'value\' */\n} Variant;\n\nvoid printVariant(Variant v) {\n    switch (v.type) {\n        case TYPE_INT:   printf("Int: %d\\n", v.value.i); break;\n        case TYPE_FLOAT: printf("Float: %.2f\\n", v.value.f); break;\n        case TYPE_STRING:printf("String: %s\\n", v.value.str); break;\n    }\n}\n\nint main(void) {\n    Variant var;\n    \n    var.type = TYPE_INT;\n    var.value.i = 42;\n    printVariant(var);\n    \n    var.type = TYPE_STRING;\n    var.value.str = "Hello Unions";\n    printVariant(var);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code reveals exactly how dynamically typed languages (like JavaScript or Python) implement variables under the hood in C. The `Variant` struct requires only 4 bytes for the `enum` tag, plus 8 bytes for the largest union member (the pointer `str`), totaling 12 bytes. This tiny 12-byte struct can safely morph to represent an integer, a floating-point number, or a string of text, drastically reducing memory overhead compared to a struct holding all three simultaneously.',
          expectedOutput: 'Int: 42\nString: Hello Unions',
          lineBreakdown: [
            { lineNumber: 9, code: '    union { ... } value;', explanation: 'An anonymous union embedded directly inside the struct. Its members are accessed via `v.value.i`.' },
            { lineNumber: 16, code: '    switch (v.type) {', explanation: 'The safety mechanism. We check the metadata tag before daring to touch the raw union data.' },
            { lineNumber: 27, code: '    var.type = TYPE_INT; var.value.i = 42;', explanation: 'The Golden Rule of Tagged Unions: whenever you overwrite the data, you must update the tag.' },
          ],
          relatedTopicIds: ['u3-t5', 'u3-t11'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t10-s2-cm1',
          title: 'Reading without checking the tag',
          wrongCode: 'var.type = TYPE_FLOAT;\nvar.value.f = 3.14;\nprintf("%d", var.value.i); /* Undefined behavior */',
          correctCode: 'if (var.type == TYPE_INT) {\n    printf("%d", var.value.i);\n}',
          explanation: 'If you bypass the `type` tag and arbitrarily read whichever member you want, you defeat the entire architecture of the tagged union. Reading `var.value.i` when the memory block actually contains float data will result in treating float bits as an integer, yielding numerical garbage.',
          consequence: 'Logical errors and corrupted data reads.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t10-s2-ic1',
          title: 'How do Interpreters work?',
          content: 'If an interviewer asks how a dynamically typed language like Python implements variables (since a variable `x` can hold an integer, and a moment later hold a string), explain the Tagged Union pattern. It is the exact architecture used inside the CPython interpreter (specifically, the `PyObject` structure). It provides the illusion of dynamic typing on top of a statically typed language.',
          relatedTopicIds: [],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t10-s2-cp1',
          title: 'Tagged Unions',
          description: 'Verify your understanding of safe union usage patterns.',
          criteria: [
            'Identify the two structural components that make up a Tagged Union.',
            'Explain mechanically why a Tagged Union is safer than a raw union.',
          ],
          topicId: 'u3-t10',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t10-s2-rc1',
          front: 'What is the "Tagged Union" design pattern?',
          back: 'It is a struct containing two things: a raw `union` for data storage, and an integer/enum "tag" that acts as metadata, recording exactly which union member is currently active and safe to read.',
          topicId: 'u3-t10',
          tags: ['unions', 'patterns'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t10-q1',
      type: 'mcq',
      topicId: 'u3-t10',
      difficulty: 'beginner',
      question: 'Which of the following is true about a union?',
      options: [
        'It allocates memory for all its members simultaneously.',
        'It shares the same memory address for all its members.',
        'It cannot contain arrays.',
        'Its size is the sum of its members.'
      ],
      correctAnswer: 'It shares the same memory address for all its members.',
      explanation: 'This is the fundamental defining characteristic of a union. Unlike a struct, which allocates distinct memory for each field, a union forces every single member to start at byte offset 0 of the memory block.',
      tags: ['unions', 'memory'],
    },
    {
      id: 'u3-t10-q2',
      type: 'predict-output',
      topicId: 'u3-t10',
      difficulty: 'intermediate',
      question: 'What is the output? (Assuming standard ASCII)',
      code: '#include <stdio.h>\nunion Data {\n    int num;\n    char ch;\n};\nint main() {\n    union Data d;\n    d.num = 65;\n    printf("%c", d.ch);\n    return 0;\n}',
      correctAnswer: 'A',
      explanation: 'The integer 65 is written to the memory block. When we access `d.ch`, the CPU looks at the exact same memory block, reads the first byte (which contains 65), and the `%c` specifier formats it as the ASCII character \'A\'. This is a classic example of type punning.',
      tags: ['unions', 'type-punning'],
    },
    {
      id: 'u3-t10-q3',
      type: 'true-false',
      topicId: 'u3-t10',
      difficulty: 'advanced',
      question: 'A struct can contain a union, and a union can contain a struct.',
      correctAnswer: true,
      explanation: 'They are completely composable building blocks. Placing an anonymous union inside a struct is the basis of the Tagged Union pattern, and placing structs inside a union allows you to interpret a single block of raw memory via multiple distinct structural layouts.',
      tags: ['unions', 'structs', 'composition'],
    },
    {
      id: 'u3-t10-q4',
      type: 'spot-bug',
      topicId: 'u3-t10',
      difficulty: 'beginner',
      question: 'Spot the logical bug:',
      code: 'union Profile {\n    int age;\n    float weight;\n};\nunion Profile p = {25, 180.5};',
      correctAnswer: 'Cannot initialize multiple union members at once.',
      explanation: 'A union physically only holds ONE value at any given time. C only allows you to initialize the very first member using the brace syntax: `union Profile p = {25};`. If you try to provide multiple values, the compiler rejects it because there is nowhere to store the second value.',
      tags: ['unions', 'initialization'],
    },
    {
      id: 'u3-t10-q5',
      type: 'mcq',
      topicId: 'u3-t10',
      difficulty: 'advanced',
      question: 'What is the primary reason for using a Tagged Union over a standard Union?',
      options: [
        'To reduce memory consumption further.',
        'To allow multiple members to be used simultaneously.',
        'To safely track which data type is currently stored in the memory block.',
        'To speed up memory access times.'
      ],
      correctAnswer: 'To safely track which data type is currently stored in the memory block.',
      explanation: 'A raw union has no self-awareness. The tag provides essential metadata, ensuring the programmer does not accidentally read the memory block using the wrong data type (which would result in treating float bits as integer bits, yielding garbage).',
      tags: ['unions', 'patterns'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t10-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t10',
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
      id: 'u3-t10-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t10',
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
      id: 'u3-t10-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t10',
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
      id: 'u3-t10-p1',
      title: 'Analyze Union Size',
      topicId: 'u3-t10',
      difficulty: 'beginner',
      problemStatement: 'Define a union `Mixed` with a `char` array of size 15, an `int`, and a `double`. Define a struct `MixedStruct` with the exact same members. Print the `sizeof` both to the console.',
      constraints: ['Use union and struct'],
      sampleInput: '',
      sampleOutput: 'Union size: 16\nStruct size: 32\n(Note: Sizes may vary slightly due to padding)',
      hints: ['The union size will be determined by the char array (15 bytes, padded to 16).'],
      solution: '#include <stdio.h>\n\nunion Mixed {\n    char str[15];\n    int i;\n    double d;\n};\n\nstruct MixedStruct {\n    char str[15];\n    int i;\n    double d;\n};\n\nint main(void) {\n    printf("Union size: %zu\\n", sizeof(union Mixed));\n    printf("Struct size: %zu\\n", sizeof(struct MixedStruct));\n    return 0;\n}',
      solutionExplanation: 'This visualizes how a union collapses memory. The struct lays out the 15-byte array, adds 1 byte of padding for int alignment, the 4-byte int, 4 bytes of padding for double alignment, and the 8-byte double (totaling 32 bytes sequentially). The union simply overlaps them all, taking only 16 bytes (the size of the array, padded to a multiple of 8 for the double).',
      dryRun: [
        { step: 1, line: 15, variables: {}, output: 'Union size: 16\\n', explanation: 'Largest member is str[15], padded to 16 for 8-byte alignment.' },
      ],
      tags: ['unions', 'memory', 'sizeof'],
    },
    {
      id: 'u3-t10-p2',
      title: 'Byte Extractor (Type Punning)',
      topicId: 'u3-t10',
      difficulty: 'intermediate',
      problemStatement: 'Define a union containing a 32-bit integer and an array of 4 chars (bytes). Set the integer to `0x12345678`. Print the 4 chars in hex format to see how the integer is stored in memory (Little Endian vs Big Endian).',
      constraints: ['Use a union of int and char[4]'],
      sampleInput: '',
      sampleOutput: 'Bytes: 78 56 34 12 ',
      hints: ['printf("%02X ", bytes[i]);'],
      solution: '#include <stdio.h>\n\nunion EndianTest {\n    unsigned int num;\n    unsigned char bytes[4];\n};\n\nint main(void) {\n    union EndianTest test;\n    test.num = 0x12345678;\n    \n    printf("Bytes: ");\n    for (int i = 0; i < 4; i++) {\n        printf("%02X ", test.bytes[i]);\n    }\n    printf("\\n");\n    \n    return 0;\n}',
      solutionExplanation: 'This is a powerful systems programming trick. By writing data to the 4-byte integer, and reading it back out through the 4-byte char array, we can look at the raw bytes that make up the integer in RAM. On most modern PCs (which use Little Endian architecture), the least significant byte (78) is stored first in memory.',
      dryRun: [
        { step: 1, line: 10, variables: {}, output: '', explanation: 'Memory holds 0x12345678. On x86, it is stored as 78 56 34 12.' },
        { step: 2, line: 14, variables: { i: '0' }, output: '78 ', explanation: 'test.bytes[0] reads the first byte of the integer.' },
      ],
      tags: ['unions', 'type-punning', 'endianness'],
    },
    {
      id: 'u3-t10-p3',
      title: 'Vehicle Registry (Tagged Union)',
      topicId: 'u3-t10',
      difficulty: 'advanced',
      problemStatement: 'Create a tagged union `Vehicle`. A vehicle can be a CAR (needs int doors) or a BOAT (needs float length). Set up one Car and one Boat. Write a function `printVehicle` that takes the struct and prints the correct info based on the tag.',
      constraints: ['Use enum for tags', 'Use struct wrapping a union'],
      sampleInput: '',
      sampleOutput: 'Car with 4 doors\nBoat of length 24.5',
      hints: ['typedef enum { CAR, BOAT } Type;', 'typedef struct { Type t; union { int doors; float length; } specs; } Vehicle;'],
      solution: '#include <stdio.h>\n\ntypedef enum { CAR, BOAT } VehicleType;\n\ntypedef struct {\n    VehicleType type;\n    union {\n        int doors;\n        float length;\n    } specs;\n} Vehicle;\n\nvoid printVehicle(Vehicle v) {\n    if (v.type == CAR) {\n        printf("Car with %d doors\\n", v.specs.doors);\n    } else if (v.type == BOAT) {\n        printf("Boat of length %.1f\\n", v.specs.length);\n    }\n}\n\nint main(void) {\n    Vehicle v1;\n    v1.type = CAR;\n    v1.specs.doors = 4;\n    \n    Vehicle v2;\n    v2.type = BOAT;\n    v2.specs.length = 24.5;\n    \n    printVehicle(v1);\n    printVehicle(v2);\n    \n    return 0;\n}',
      solutionExplanation: 'This implements polymorphism-like behavior in C. The `Vehicle` struct safely morphs between acting like a car and acting like a boat, while remaining incredibly memory efficient (consuming only enough memory for the `enum` tag plus the largest specification member).',
      dryRun: [
        { step: 1, line: 23, variables: {}, output: '', explanation: 'v1 tagged as CAR, spec written as int.' },
        { step: 2, line: 15, variables: {}, output: 'Car with 4 doors\\n', explanation: 'printVehicle sees CAR tag, reads specs.doors safely.' },
      ],
      tags: ['unions', 'patterns', 'structs'],
    },
  ],
};
