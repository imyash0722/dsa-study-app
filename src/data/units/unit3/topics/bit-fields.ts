import type { Topic } from '../../../../types';

export const bitFields: Topic = {
  id: 'u3-t9',
  unitId: 'unit-3',
  title: 'Bit Fields',
  slug: 'bit-fields',
  description: `In extreme performance environments like embedded microcontrollers, real-time operating systems, and high-speed network protocol implementations, wasting 7 bits of memory to store a simple boolean flag (which requires only 1 bit) or 28 bits to store a 4-bit field is architecturally unacceptable. Bit fields are a C language feature that allows the programmer to specify exactly how many bits each structure member should occupy, enabling multiple small integers to be packed into a single byte or word with surgical precision.

A bit field is declared by appending a colon and a width specifier to a structure member: struct Flags { unsigned int active : 1; unsigned int mode : 3; unsigned int level : 4; }. This instructs the compiler to pack the three fields into a single byte (1 + 3 + 4 = 8 bits) rather than allocating a separate 4-byte integer for each. The memory savings compound dramatically in arrays of thousands of such structures — a common pattern in hardware register mappings, network packet headers, and sensor data buffers.

However, bit fields come with significant portability and performance caveats. The C standard leaves the physical layout of bit fields largely implementation-defined: the order of bits within a byte (MSB-first vs LSB-first), whether a bit field can straddle a storage-unit boundary, and the signedness of plain int bit fields all vary between compilers and platforms. Accessing individual bit fields may also be slower than accessing full-width integers, because the CPU must perform additional shift and mask operations to extract or modify the targeted bits within the larger storage unit. For portable, performance-critical code, manual bitwise operations (shifts, masks, AND/OR) are often preferred over bit fields despite their greater syntactic complexity.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t5'],
  estimatedMinutes: 30,
  subtopics: [
    {
      id: 'u3-t9-s1',
      title: 'What are Bit Fields?',
      slug: 'understanding-bit-fields',
      description: `The smallest unit of memory that C can address is a byte (8 bits). When you declare an unsigned int flags, the compiler allocates 4 bytes (32 bits) even if the variable only needs to store values 0 or 1 — wasting 31 of those 32 bits. Bit fields are a structure-specific feature that allows you to declare members with an explicit width in bits, enabling the compiler to pack multiple narrow fields into a single word of memory. The syntax unsigned int active : 1 declares a 1-bit field that can hold exactly 0 or 1; unsigned int priority : 3 declares a 3-bit field that can hold values 0 through 7.

The compiler packs bit fields as tightly as possible within the underlying storage unit (typically an unsigned int, which is 4 bytes / 32 bits). Multiple bit fields declared consecutively within a structure share the same underlying word, and the compiler generates the necessary bit-masking and shifting instructions to extract and modify individual fields. For example, a structure with eight 1-bit boolean flags occupies just 4 bytes total rather than 8 bytes (one byte per flag) or 32 bytes (one int per flag). This savings is multiplied dramatically when you have arrays of thousands of such structures.

Bit fields are most commonly used in embedded systems programming, hardware register mapping, network protocol headers, and file format parsers — any domain where memory is severely constrained or where a specification defines fields at bit-level granularity. A TCP packet header, for example, contains a 4-bit data offset field and six 1-bit flag fields (URG, ACK, PSH, RST, SYN, FIN), which map naturally to a bit field structure. However, bit fields come with significant portability caveats: the C standard does not specify whether bits are packed from the most-significant or least-significant end, whether bit fields can straddle storage unit boundaries, or whether the underlying type can be anything other than int, unsigned int, or _Bool. Code that depends on a specific bit layout (such as hardware register maps) must verify the compiler's behavior on the target platform.`,
      keyPoints: [
        'The Syntax of Precision: `type member_name : width_in_bits;` declared exclusively inside a struct block.',
        'Data Packing: If you define eight 1-bit flags, the compiler will aggressively fuse them together, packing all 8 variables physically into a single 1-byte memory address.',
        'Embedded Dominance: Bit fields are the industry standard for mapping C structs directly onto hardware registers (like the control pins of an Arduino or a CPU status register).',
        'Addressability Trap: Because pointers natively point to byte boundaries, and a bit field often starts in the middle of a byte, it is physically impossible to use the address-of operator (`&`) on a bit field member.',
      ],
      codeExamples: [
        {
          id: 'u3-t9-s1-ex1',
          title: 'Memory Savings with Bit Fields',
          code: '#include <stdio.h>\n\n/* Standard approach: wastes 3 bytes */\nstruct NormalFlags {\n    unsigned int isPowerOn;  /* 4 bytes */\n    unsigned int isWifiOn;   /* 4 bytes */\n    unsigned int isBluetoothOn; /* 4 bytes */\n};\n\n/* Bit Field approach: 3 bits total, packed into 4 bytes */\nstruct BitFlags {\n    unsigned int isPowerOn : 1;\n    unsigned int isWifiOn  : 1;\n    unsigned int isBluetoothOn : 1;\n};\n\nint main(void) {\n    printf("Normal size: %zu bytes\\n", sizeof(struct NormalFlags));\n    printf("BitField size: %zu bytes\\n", sizeof(struct BitFlags));\n    \n    struct BitFlags device = {1, 0, 1};\n    printf("Power: %d, Wifi: %d\\n", device.isPowerOn, device.isWifiOn);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'The architectural contrast is staggering. `NormalFlags` demands 12 entire bytes (96 bits) of RAM. By declaring bit widths, `BitFlags` compresses the exact same logical data into just 3 bits. The compiler places these 3 bits into a single 4-byte `unsigned int` block, instantly saving 8 bytes of memory per object.',
          expectedOutput: 'Normal size: 12 bytes\nBitField size: 4 bytes\nPower: 1, Wifi: 0',
          lineBreakdown: [
            { lineNumber: 12, code: '    unsigned int isPowerOn : 1;', explanation: 'Instructs the compiler: Restrict this variable\'s hardware footprint to exactly 1 bit (capable of holding only 0 or 1).' },
            { lineNumber: 19, code: '    printf("BitField size: %zu bytes\\n", sizeof(struct BitFlags));', explanation: 'Though we utilized only 3 bits, the struct size evaluates to 4 bytes. CPUs fetch memory in Word-sized chunks (like an `int`), so the compiler pads the remaining 29 bits.' },
          ],
          relatedTopicIds: ['u3-t6'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t9-s1-cm1',
          title: 'Overflowing a bit field',
          wrongCode: 'struct Box { unsigned int state : 2; } b;\nb.state = 5;',
          correctCode: 'struct Box { unsigned int state : 3; } b;\nb.state = 5;',
          explanation: 'A 2-bit field is mathematically constrained to binary `00`, `01`, `10`, and `11` (decimal 0 through 3). If you force the decimal number 5 (binary `101`) into it, the compiler mercilessly truncates the most significant bit. The struct only catches the bottom two bits (`01`), secretly transforming your 5 into a 1.',
          consequence: 'Silent, devastating integer truncation and data corruption.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t9-s1-ic1',
          title: 'Can you take the address of a bit field?',
          content: 'A brutal technical interview trap: "Can you execute `scanf(\\"%d\\", &b.state)` if `state` is a bit field?" The answer is fundamentally NO. Pointers mathematically require byte-aligned memory addresses. Because a bit field can physically reside at the 3rd bit inside a byte, it has no standard memory address. The C compiler will outright reject the `&` operator on a bit field.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t9-s1-cp1',
          title: 'Bit Field Basics',
          description: 'Verify your understanding of precise bitwise memory constraints.',
          criteria: [
            'Write the struct syntax to declare a 4-bit unsigned integer named `month`.',
            'Explain the architectural reason why you cannot pass a bit field to `scanf` using `&`.',
            'Calculate the absolute maximum decimal value that a 3-bit unsigned field can store.',
          ],
          topicId: 'u3-t9',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t9-s1-rc1',
          front: 'What is the syntax to declare a struct member `flag` that occupies exactly 1 bit?',
          back: '`unsigned int flag : 1;`',
          topicId: 'u3-t9',
          tags: ['structs', 'bits'],
        },
        {
          id: 'u3-t9-s1-rc2',
          front: 'What is the mathematical maximum decimal value that can be stored in `unsigned int val : 3;`?',
          back: '7 (binary `111`). Calculated as (2^3) - 1.',
          topicId: 'u3-t9',
          tags: ['structs', 'bits', 'math'],
        },
      ],
    },
    {
      id: 'u3-t9-s2',
      title: 'Advanced Bit Field Rules',
      slug: 'advanced-bit-fields',
      description: `While bit fields provide compelling memory savings, they introduce several subtle complexities and portability hazards that every C programmer must understand before using them in production code.

The signedness of bit fields is a particularly dangerous pitfall. If you declare int status : 2 (a signed 2-bit field), the field can hold values -2, -1, 0, and 1 in two's complement representation \u2014 not 0 through 3 as many programmers expect. A signed 1-bit field can hold only -1 and 0, not 0 and 1. This is because the most significant bit is the sign bit, and in a 1-bit field, the only bit is the sign bit. To store non-negative values, you must explicitly declare the field as unsigned int status : 2, which can hold 0, 1, 2, and 3. The C standard leaves the default signedness of plain int bit fields as implementation-defined, meaning some compilers treat int : 3 as signed and others treat it as unsigned. Always use unsigned int for bit fields unless you specifically need negative values.

Bit fields also interact poorly with pointers and the address-of operator. You cannot take the address of a bit field member (&myStruct.flags is illegal), because bit fields do not necessarily start at a byte boundary and therefore do not have a well-defined byte address. This means bit field members cannot be passed to functions like scanf that require a pointer argument. Additionally, the sizeof operator cannot be applied to individual bit field members. These restrictions, combined with the platform-dependent packing order and the inability to create arrays of bit fields, mean that bit fields should be reserved for situations where their memory savings justifies their complexity: high-volume data structures in memory-constrained environments and hardware register overlays where the bit layout is dictated by the hardware specification.`,
      keyPoints: [
        'The Signedness Trap: You must explicitly write `unsigned int` (or `signed int`). If you simply write `int x : 1;`, the C standard leaves it "implementation-defined" whether it is signed or unsigned. This is a massive portability hazard.',
        'The 1-Bit Signed Bug: If a compiler treats `int flag : 1` as signed, that single bit acts as the sign bit. Its only possible values become `0` and `-1`. It physically cannot hold `1`! Always use unsigned for boolean flags.',
        'Endianness and Portability: The C standard does NOT dictate whether bits are packed left-to-right (MSB) or right-to-left (LSB). Because of this, bit fields are highly dangerous for network packets, as different CPUs will deserialize the same packet completely backward.',
        'Anonymous Padding: You can use a nameless bit field (e.g., `unsigned int : 3;`) to forcefully burn 3 bits of padding, useful for aligning data to match hardware specifications.',
      ],
      codeExamples: [
        {
          id: 'u3-t9-s2-ex1',
          title: 'Signed Bit Field Trap',
          code: '#include <stdio.h>\n\nstruct Trap {\n    int flag1 : 1;          /* Might be signed! */\n    unsigned int flag2 : 1; /* Safely unsigned */\n};\n\nint main(void) {\n    struct Trap t;\n    \n    t.flag1 = 1;\n    t.flag2 = 1;\n    \n    /* flag1 might print -1 instead of 1 */\n    printf("flag1: %d\\n", t.flag1);\n    printf("flag2: %d\\n", t.flag2);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code highlights a legendary C programming trap. If `flag1` defaults to a signed integer, its 1-bit allocation is entirely consumed by the mathematical sign bit. In two\'s complement arithmetic, a set sign bit represents a negative number (specifically -1). Attempting to assign `1` silently results in `-1`.',
          expectedOutput: 'flag1: -1\nflag2: 1',
          lineBreakdown: [
            { lineNumber: 4, code: '    int flag1 : 1;', explanation: 'A critical vulnerability. The compiler is free to choose whether this is signed or unsigned.' },
            { lineNumber: 5, code: '    unsigned int flag2 : 1;', explanation: 'Architecturally safe. Guaranteed to hold binary 0 and 1.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t9-s2-cm1',
          title: 'Using bit fields for network headers',
          wrongCode: 'struct TCPHeader {\n    unsigned int ack : 1;\n    unsigned int syn : 1;\n}; /* Sending this over network */',
          correctCode: '/* Use bitwise operators (|, &, <<) on a standard uint8_t for network code */',
          explanation: 'Bit field memory layout is entirely at the mercy of the compiler and the CPU\'s endianness. An ARM processor might place `ack` in the Most Significant Bit, while an x86 processor places it in the Least Significant Bit. If you transmit this struct over a TCP socket, the receiving machine will read the data backward.',
          consequence: 'Fatal network protocol incompatibility across different architectures.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t9-s2-ic1',
          title: 'Bitwise Operators vs Bit Fields',
          content: 'Senior systems engineers will often reject Pull Requests that use bit fields for network headers. They strictly prefer manual bitwise operations (`flags |= 0x01;`) combined with standard `uint8_t` types. Why? Because bitwise math is mathematically guaranteed to be 100% portable across all CPU architectures, whereas bit field struct layouts are wildly unpredictable.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t9-s2-cp1',
          title: 'Bit Field Traps',
          description: 'Verify your understanding of compiler-dependent traps.',
          criteria: [
            'Explain the severe architectural risk of using `int` instead of `unsigned int` for a bit field.',
            'What specific mathematical value is printed if you assign `1` to a 1-bit signed bit field?',
            'Defend why bitwise operators (`&`, `|`) are safer than bit fields for writing cross-platform networking code.',
          ],
          topicId: 'u3-t9',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t9-s2-rc1',
          front: 'Architecturally, why is the declaration `int flag : 1;` considered highly dangerous in C?',
          back: 'Because its signedness is compiler-dependent. If treated as signed, its single bit becomes the sign bit, meaning the variable can ONLY store the values `0` and `-1`.',
          topicId: 'u3-t9',
          tags: ['structs', 'bits', 'signedness'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t9-q1',
      type: 'mcq',
      topicId: 'u3-t9',
      difficulty: 'beginner',
      question: 'Which of the following is an INVALID operation on a bit field?',
      options: [
        'Assigning a value to it',
        'Comparing it in an if-statement',
        'Taking its memory address with the & operator',
        'Printing it with printf'
      ],
      correctAnswer: 'Taking its memory address with the & operator',
      explanation: 'Pointers must point to byte-aligned memory addresses. Bit fields often start in the middle of a byte, so they do not have a standard memory address.',
      tags: ['structs', 'bits', 'pointers'],
    },
    {
      id: 'u3-t9-q2',
      type: 'predict-output',
      topicId: 'u3-t9',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: 'struct Test {\n    unsigned int x : 2;\n} t;\nint main() {\n    t.x = 4;\n    printf("%u", t.x);\n    return 0;\n}',
      correctAnswer: '0',
      explanation: 'A 2-bit field holds 0, 1, 2, or 3. The number 4 in binary is `100`. Since it only holds 2 bits, it truncates the highest bit, keeping `00`, which is 0.',
      tags: ['structs', 'bits', 'math'],
    },
    {
      id: 'u3-t9-q3',
      type: 'true-false',
      topicId: 'u3-t9',
      difficulty: 'advanced',
      question: 'Bit fields guarantee that bits will be packed left-to-right exactly as defined.',
      correctAnswer: false,
      explanation: 'The C standard does not specify whether bits are packed left-to-right or right-to-left. It is highly compiler-specific.',
      tags: ['structs', 'bits', 'portability'],
    },
    {
      id: 'u3-t9-q4',
      type: 'spot-bug',
      topicId: 'u3-t9',
      difficulty: 'intermediate',
      question: 'Spot the bug:',
      code: 'struct Date {\n    unsigned int day : 5;\n    unsigned int month : 4;\n} d;\nscanf("%u", &d.day);',
      correctAnswer: 'Using scanf with &d.day.',
      explanation: '`scanf` requires a memory address to write to. You cannot take the address of a bit field. You must read into a normal variable first, then assign it: `int temp; scanf("%d", &temp); d.day = temp;`.',
      tags: ['structs', 'bits', 'pointers'],
    },
    {
      id: 'u3-t9-q5',
      type: 'mcq',
      topicId: 'u3-t9',
      difficulty: 'beginner',
      question: 'How many bits are needed to store a month value (1 to 12)?',
      options: ['2', '3', '4', '8'],
      correctAnswer: '4',
      explanation: '3 bits can store up to 7 (111). 4 bits can store up to 15 (1111). Therefore, 4 bits are required to store 12.',
      tags: ['structs', 'bits', 'math'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t9-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t9',
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
      id: 'u3-t9-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t9',
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
      id: 'u3-t9-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t9',
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
      id: 'u3-t9-p1',
      title: 'Compact Date Storage',
      topicId: 'u3-t9',
      difficulty: 'beginner',
      problemStatement: 'Define a struct `CompactDate` using bit fields for `day` (1-31), `month` (1-12), and `yearOffset` (0-100). Determine the minimum bits required for each. Initialize a date, print its values, and print the `sizeof` the struct.',
      constraints: ['Use bit fields', 'Minimize bit usage'],
      sampleInput: '',
      sampleOutput: 'Date: 15/8/2023\nSize: 4 bytes',
      hints: ['Day needs 5 bits (up to 31)', 'Month needs 4 bits (up to 15)', 'YearOffset needs 7 bits (up to 127)'],
      solution: '#include <stdio.h>\n\nstruct CompactDate {\n    unsigned int day : 5;\n    unsigned int month : 4;\n    unsigned int yearOffset : 7;\n};\n\nint main(void) {\n    struct CompactDate d;\n    d.day = 15;\n    d.month = 8;\n    d.yearOffset = 23; /* 2023 - 2000 */\n    \n    printf("Date: %u/%u/20%02u\\n", d.day, d.month, d.yearOffset);\n    printf("Size: %zu bytes\\n", sizeof(struct CompactDate));\n    \n    return 0;\n}',
      solutionExplanation: 'Instead of using 12 bytes (three normal ints), we packed the entire date into 5+4+7 = 16 bits (2 bytes). The compiler will pad it to 4 bytes (size of one int). We saved 8 bytes per date.',
      dryRun: [
        { step: 1, line: 4, variables: {}, output: '', explanation: 'day takes 5 bits.' },
        { step: 2, line: 12, variables: {}, output: '', explanation: 'Values assigned normally. The compiler handles the bit masking automatically.' },
        { step: 3, line: 16, variables: {}, output: 'Date: 15/8/2023\\n', explanation: 'Values retrieved and printed.' },
      ],
      tags: ['structs', 'bits', 'memory'],
    },
    {
      id: 'u3-t9-p2',
      title: 'Hardware Status Register',
      topicId: 'u3-t9',
      difficulty: 'intermediate',
      problemStatement: 'Simulate an 8-bit hardware register. Create a bit field struct with flags: `isReady` (1 bit), `errorCode` (3 bits), `mode` (2 bits), and `reserved` (2 bits). Set it to Ready, Error 5, Mode 2. Print the values.',
      constraints: ['Use unnamed bit field for reserved bits'],
      sampleInput: '',
      sampleOutput: 'Ready: 1, Error: 5, Mode: 2',
      hints: ['unsigned int : 2; /* Unnamed reserved bits */'],
      solution: '#include <stdio.h>\n\nstruct StatusRegister {\n    unsigned int isReady   : 1;\n    unsigned int errorCode : 3;\n    unsigned int mode      : 2;\n    unsigned int           : 2; /* Reserved, unnamed */\n};\n\nint main(void) {\n    struct StatusRegister reg;\n    reg.isReady = 1;\n    reg.errorCode = 5;\n    reg.mode = 2;\n    \n    printf("Ready: %u, Error: %u, Mode: %u\\n", \n           reg.isReady, reg.errorCode, reg.mode);\n    \n    return 0;\n}',
      solutionExplanation: 'Shows how to map bit fields to hardware specifications. The unnamed bit field is a feature of C that explicitly consumes bits to match a hardware padding requirement without exposing a variable name.',
      dryRun: [
        { step: 1, line: 5, variables: {}, output: '', explanation: '1+3+2+2 = exactly 8 bits defined.' },
        { step: 2, line: 12, variables: {}, output: '', explanation: 'errorCode set to 5 (binary 101, fits in 3 bits).' },
        { step: 3, line: 16, variables: {}, output: 'Ready: 1, Error: 5, Mode: 2\\n', explanation: 'Values retrieved.' },
      ],
      tags: ['structs', 'bits', 'hardware'],
    },
    {
      id: 'u3-t9-p3',
      title: 'Bit Field Overflow Test',
      topicId: 'u3-t9',
      difficulty: 'advanced',
      problemStatement: 'Create a struct with a 3-bit unsigned field. Write a loop from 0 to 10, assigning the loop index to the bit field, and printing it. Observe and explain the overflow pattern.',
      constraints: ['Loop 0 to 10'],
      sampleInput: '',
      sampleOutput: '0 1 2 3 4 5 6 7 0 1 2 ',
      hints: ['Just assign i to the struct member inside the loop.'],
      solution: '#include <stdio.h>\n\nstruct Counter {\n    unsigned int val : 3;\n};\n\nint main(void) {\n    struct Counter c;\n    \n    for (int i = 0; i <= 10; i++) {\n        c.val = i;\n        printf("%u ", c.val);\n    }\n    printf("\\n");\n    \n    return 0;\n}',
      solutionExplanation: 'A perfect demonstration of integer truncation. A 3-bit unsigned integer counts `000` (0) up to `111` (7). When the loop reaches 8 (`1000`), the top bit is chopped off, leaving `000` (0). It wraps around modularly.',
      dryRun: [
        { step: 1, line: 10, variables: { i: '7' }, output: '', explanation: 'c.val = 7. Prints 7.' },
        { step: 2, line: 10, variables: { i: '8' }, output: '', explanation: '8 is 1000 in binary. Bottom 3 bits are 000. c.val = 0. Prints 0.' },
        { step: 3, line: 10, variables: { i: '9' }, output: '', explanation: '9 is 1001 in binary. Bottom 3 bits are 001. c.val = 1. Prints 1.' },
      ],
      tags: ['structs', 'bits', 'overflow'],
    },
  ],
};
