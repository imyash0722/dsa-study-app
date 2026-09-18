import type { Topic } from '../../../../types';

export const pragma: Topic = {
  id: 'u3-t6',
  unitId: 'unit-3',
  title: '#pragma',
  slug: 'pragma',
  description: `Pragma directives (#pragma) are special preprocessor commands that provide implementation-specific instructions to the C compiler, allowing the programmer to control aspects of compilation and code generation that lie outside the scope of the standard C language. Unlike standard preprocessor directives (#include, #define, #ifdef) which are portable across all conforming compilers, pragmas are inherently compiler-specific: a pragma understood by GCC may be ignored or interpreted differently by MSVC or Clang.

The most widely used pragma is #pragma pack, which overrides the compiler's default memory alignment rules for structures. Normally, the compiler inserts padding bytes between structure members to satisfy the CPU's alignment requirements (e.g., ensuring that a 4-byte int starts at a 4-byte boundary). #pragma pack(1) disables all padding, forcing the compiler to lay out structure members with no gaps — essential when the structure must match an exact byte layout defined by a network protocol specification, a binary file format, or a hardware register map. However, this comes at a performance cost: misaligned memory accesses may be slower or even cause hardware faults on some architectures.

Other commonly encountered pragmas include #pragma once (a non-standard but widely supported alternative to include guards that prevents a header file from being included more than once), #pragma GCC diagnostic (which enables or disables specific compiler warnings within a region of code), and #pragma comment (used by MSVC to embed linker directives). Because pragmas are by nature non-portable, professional codebases typically isolate them behind conditional compilation guards (#ifdef _MSC_VER / #ifdef __GNUC__) to maintain cross-platform compatibility.`,
  difficulty: 'advanced',
  prerequisites: ['u3-t5'],
  estimatedMinutes: 30,
  subtopics: [
    {
      id: 'u3-t6-s1',
      title: 'Understanding Compiler Directives',
      slug: 'understanding-pragmas',
      description: `The #pragma directive is a standardized mechanism in C for passing implementation-specific instructions to the compiler. Unlike other preprocessor directives (#include, #define, #ifdef) that have universally defined behavior across all C compilers, #pragma directives are inherently compiler-specific: each compiler vendor defines its own set of supported pragmas, and an unrecognized pragma is silently ignored rather than causing an error. This design allows programmers to leverage compiler-specific features and optimizations without breaking portability — the code still compiles on other compilers, it simply does not benefit from the unsupported pragma.

The most widely supported and practically important pragma is #pragma once, which serves as a header file include guard. When the compiler encounters #pragma once at the top of a header file, it records the file's identity and guarantees that the file will not be processed again, even if another #include directive references it later in the compilation. This is functionally equivalent to the traditional #ifndef/#define/#endif include guard pattern, but it is less error-prone (no risk of mismatched macro names) and typically faster (the compiler can skip the file entirely without re-reading and re-parsing it). Although #pragma once is not part of the C standard, it is supported by virtually every modern compiler (GCC, Clang, MSVC, Intel), making it a de facto standard.

Other common pragmas include #pragma warning (MSVC, to enable or suppress specific compiler warnings), #pragma GCC optimize (GCC, to apply optimization flags to individual functions), and #pragma message (to emit a user-defined message during compilation). These are tools for fine-grained control over the compilation process that go beyond what the standard language provides.`,
      keyPoints: [
        'Meta-Programming: `#pragma` directives are not C code. They are "pragmatic" instructions explicitly intended for the compiler itself.',
        'Compiler Specificity: Because different compilers (GCC, Clang, MSVC) have different internal engines, a `#pragma` that works perfectly on a Windows machine might be completely ignored by an Apple compiler.',
        'Graceful Degradation: By C Standard mandate, if a compiler encounters a `#pragma` it doesn\'t recognize, it MUST ignore it rather than halting compilation. This allows for somewhat portable code.',
        'The Modern Guard: `#pragma once` is an industry-standard directive placed at the top of header files. It commands the compiler to only parse the file exactly one time, preventing catastrophic redefinition errors without the boilerplate of traditional `#ifndef` include guards.',
      ],
      codeExamples: [
        {
          id: 'u3-t6-s1-ex1',
          title: '#pragma once vs Include Guards',
          code: '/* Traditional Include Guard (Old Way) */\n#ifndef MY_HEADER_H\n#define MY_HEADER_H\n\nstruct Data { int x; };\n\n#endif\n\n\n/* #pragma once (Modern Way) */\n#pragma once\n\nstruct Data { int x; };\n',
          language: 'c',
          explanation: 'When engineering large systems, multiple `.c` files often `#include` the same `.h` header. If the compiler blindly copies the header code multiple times, it will attempt to redefine `struct Data`, halting compilation. The legacy `#ifndef` (Include Guard) solves this using 3 lines of macro logic. The modern `#pragma once` directive solves this with a single, highly-optimized instruction directly to the compiler engine.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 2, code: '#ifndef MY_HEADER_H', explanation: 'The legacy approach. Requires three lines of boilerplate macro logic that wraps the entire file.' },
            { lineNumber: 11, code: '#pragma once', explanation: 'The modern directive. Tells the compiler engine to flag this file and never parse it again during the current build.' },
          ],
          relatedTopicIds: ['u2-t6'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t6-s1-cm1',
          title: 'Assuming pragmas are universally portable',
          wrongCode: '#pragma GCC optimize("O3") /* GCC only */',
          correctCode: '/* Use standard compiler flags (-O3) in the Makefile instead */',
          explanation: 'Injecting compiler-specific pragmas (like `#pragma GCC`) directly into your core C files permanently tethers your codebase to that specific vendor. If another engineer attempts to compile your code using Clang or MSVC, the pragma is ignored, resulting in severe performance regressions or altered binary behavior.',
          consequence: 'Vendor lock-in, where the codebase compiles but behaves radically differently across different operating systems.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t6-s1-ic1',
          title: '#pragma once portability',
          content: 'A frequent interview question for systems roles: "If `#pragma once` is so much cleaner, why do some codebases strictly mandate `#ifndef` include guards?" The architectural answer: `#pragma once` is technically NOT part of the official ISO C Standard. While 99.9% of modern compilers support it, extremely strict legacy compilers (often found in aerospace or automotive embedded systems) do not. `#ifndef` is 100% standard-compliant and mathematically guaranteed to work on every C compiler ever written.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t6-s1-cp1',
          title: 'Pragma Basics',
          description: 'Verify your understanding of compiler meta-instructions.',
          criteria: [
            'Architecturally explain the C Standard\'s rules for handling unrecognized `#pragma` directives.',
            'Explain the mechanical purpose of `#pragma once`.',
            'Defend the decision to use legacy include guards over modern pragmas in aerospace embedded systems.',
          ],
          topicId: 'u3-t6',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t6-s1-rc1',
          front: 'What does `#pragma once` do at the top of a header file?',
          back: 'It is a compiler directive instructing the engine to parse the file exactly one time per build, preventing catastrophic struct/function redefinition errors.',
          topicId: 'u3-t6',
          tags: ['pragma', 'headers'],
        },
        {
          id: 'u3-t6-s1-rc2',
          front: 'Are `#pragma` directives part of the strict C language syntax?',
          back: 'No. They are highly compiler-specific meta-instructions. By C Standard rules, an unknown pragma is safely ignored by the compiler rather than halting the build.',
          topicId: 'u3-t6',
          tags: ['pragma', 'compiler'],
        },
      ],
    },
    {
      id: 'u3-t6-s2',
      title: '#pragma pack (Struct Packing)',
      slug: 'pragma-pack',
      description: `The most impactful use of #pragma in systems programming is #pragma pack, which overrides the compiler's default structure alignment and padding rules. By default, the compiler inserts padding bytes between structure members to align each member on an address that is a multiple of its size (a 4-byte int is placed at an address divisible by 4, an 8-byte double at an address divisible by 8). This alignment is required by most CPU architectures for efficient memory access \u2014 reading a 4-byte integer from a misaligned address may require two memory bus transactions instead of one, or may cause a hardware fault on architectures that do not support unaligned access (such as ARM and SPARC).

#pragma pack(push, 1) instructs the compiler to pack all subsequent structure members with no padding, aligning every member at a 1-byte boundary. This eliminates wasted space but forces the CPU to perform unaligned memory accesses, which can significantly degrade performance on architectures that handle misalignment in software. #pragma pack(pop) restores the previous packing setting. The push/pop syntax allows nesting: you can pack a specific structure tightly while leaving all other structures in the file with default alignment.

This directive is essential in two scenarios. First, when a structure must match an externally defined binary format (a network protocol header, a file format record, a hardware register map), the format specification dictates the exact byte layout with no padding, and the C structure must reproduce that layout exactly. Second, in memory-constrained embedded systems where millions of small structures are stored in arrays, eliminating padding can reduce memory consumption by 20-50%. However, using #pragma pack carelessly on general-purpose structures is a common anti-pattern: the performance cost of misaligned access typically far exceeds the memory savings. The directive should be applied surgically to only those structures that require a specific binary layout, and always bounded with push/pop to avoid accidentally affecting unrelated structures.`,
      keyPoints: [
        'The Hardware Mandate: By default, compilers inject dead "padding" bytes into `struct`s to force variables to align with the CPU\'s physical read-lanes (e.g., 4-byte or 8-byte chunks).',
        'The Override: `#pragma pack(1)` commands the compiler to completely abandon hardware alignment and pack all variables flush against each other (1-byte boundaries).',
        'The Motive: Why intentionally ruin hardware alignment? 1) Network Transmission: Sending structs over TCP requires an exact byte layout without hidden padding. 2) Binary File I/O: Reading the precise headers of `.bmp` or `.zip` files. 3) Embedded RAM: Shaving every possible byte off a struct in ultra-low memory environments.',
        'The Consequence: Packed structs are mathematically slower to process. Worse, on strict RISC architectures (like older ARM chips), attempting to read unaligned data will trigger a violent hardware exception (a crash).',
        'The Sandbox Protocol: Because packing is so dangerous, you must use `#pragma pack(push, 1)` to save the current compiler state, define your specific struct, and immediately call `#pragma pack(pop)` to restore hardware alignment for the rest of the application.',
      ],
      codeExamples: [
        {
          id: 'u3-t6-s2-ex1',
          title: 'Controlling Struct Padding',
          code: '#include <stdio.h>\n\n/* Default compiler padding */\nstruct Normal {\n    char c;\n    int i;\n};\n\n/* Force 1-byte alignment (no padding) */\n#pragma pack(push, 1)\nstruct Packed {\n    char c;\n    int i;\n};\n#pragma pack(pop)\n\nint main(void) {\n    printf("Size of Normal: %zu bytes\\n", sizeof(struct Normal));\n    printf("Size of Packed: %zu bytes\\n", sizeof(struct Packed));\n    return 0;\n}',
          language: 'c',
          explanation: 'The `Normal` struct triggers the compiler\'s hardware alignment rules, injecting 3 bytes of dead padding after `char c` to ensure the `int i` aligns to a 4-byte boundary (8 bytes total). The `#pragma pack(push, 1)` forcefully strips this padding, compressing the struct into a raw, unaligned 5-byte block.',
          expectedOutput: 'Size of Normal: 8 bytes\nSize of Packed: 5 bytes',
          lineBreakdown: [
            { lineNumber: 10, code: '#pragma pack(push, 1)', explanation: 'Push (save) the current compiler state onto an internal stack, then enforce aggressive 1-byte packing.' },
            { lineNumber: 15, code: '#pragma pack(pop)', explanation: 'Pop (restore) the previous compiler state, protecting the rest of the application from unaligned memory access.' },
          ],
          relatedTopicIds: ['u3-t5'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t6-s2-cm1',
          title: 'Forgetting to pop the pragma pack',
          wrongCode: '#pragma pack(1)\nstruct NetworkPacket { ... };\n\n/* Everything below this is now packed! */\nstruct LocalData { ... }; ',
          correctCode: '#pragma pack(push, 1)\nstruct NetworkPacket { ... };\n#pragma pack(pop)',
          explanation: 'If you execute `#pragma pack(1)` without the `push`/`pop` sandbox, you permanently alter the compiler\'s alignment engine for the remainder of the translation unit. Every single struct defined below it will be forcefully packed. This subjects your entire application to unaligned memory access, resulting in severe CPU pipeline stalls and potential hardware faults on RISC architectures.',
          consequence: 'Catastrophic CPU performance degradation and potential hardware-level crashes across the entire application.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t6-s2-ic1',
          title: 'Network Serialization',
          content: 'A defining question for networking roles: "How do you safely serialize a C struct over a TCP socket?" If you mention `#pragma pack(1)`, you instantly differentiate yourself. You must explain that different compilers (and different CPUs) might pad the exact same struct differently. By packing the struct, you forcefully strip all padding, guaranteeing an exact, predictable, byte-for-byte layout over the wire that the receiving machine can safely parse.',
          relatedTopicIds: [],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t6-s2-cp1',
          title: 'Struct Packing',
          description: 'Verify your architectural understanding of hardware alignment overrides.',
          criteria: [
            'Mechanically explain the exact byte layout of a packed struct containing a `char` and an `int`.',
            'Defend two architectural scenarios where overriding hardware padding is strictly required.',
            'Explain the severe CPU performance tradeoffs associated with `#pragma pack(1)`.',
          ],
          topicId: 'u3-t6',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t6-s2-rc1',
          front: 'What does `#pragma pack(1)` do to a struct?',
          back: 'It commands the compiler to completely abandon hardware alignment rules and use 1-byte boundaries, violently stripping all internal dead padding bytes. The struct\'s size becomes exactly the mathematical sum of its members.',
          topicId: 'u3-t6',
          tags: ['pragma', 'packing', 'memory'],
        },
        {
          id: 'u3-t6-s2-rc2',
          front: 'Why must you use `#pragma pack(push, 1)` and `(pop)` instead of just `pack(1)`?',
          back: 'To sandbox the directive. `push` saves the current compiler state. `pop` restores it. If you forget to `pop`, every struct in the rest of the application will be aggressively packed, triggering massive CPU performance degradation.',
          topicId: 'u3-t6',
          tags: ['pragma', 'safety'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t6-q1',
      type: 'mcq',
      topicId: 'u3-t6',
      difficulty: 'beginner',
      question: 'What happens if a compiler encounters a `#pragma` it does not understand?',
      options: [
        'It generates a fatal compilation error.',
        'It ignores the directive and continues compiling.',
        'It crashes the preprocessor.',
        'It falls back to a default configuration.'
      ],
      correctAnswer: 'It ignores the directive and continues compiling.',
      explanation: 'By strict ISO C Standard mandate, an unrecognized `#pragma` directive must be silently ignored (though it may trigger a warning). This allows pragmatic directives to remain somewhat cross-platform without halting the entire build process.',
      tags: ['pragma', 'compiler'],
    },
    {
      id: 'u3-t6-q2',
      type: 'true-false',
      topicId: 'u3-t6',
      difficulty: 'intermediate',
      question: '`#pragma pack(1)` increases the speed at which the CPU can read the struct\'s variables.',
      correctAnswer: false,
      explanation: 'It drastically decreases speed. CPU hardware pipelines are physically wired to fetch memory in aligned blocks (e.g., 4 or 8 bytes). Packed (unaligned) data forces the CPU to execute multiple hardware reads and perform complex bit-shifting to reconstruct a single variable, ruining performance.',
      tags: ['pragma', 'packing', 'performance'],
    },
    {
      id: 'u3-t6-q3',
      type: 'predict-output',
      topicId: 'u3-t6',
      difficulty: 'advanced',
      question: 'Assume 32-bit system. What is the output?',
      code: '#pragma pack(push, 1)\nstruct Data {\n    char a;\n    double b;\n    char c;\n};\n#pragma pack(pop)\n\nint main() { printf("%zu", sizeof(struct Data)); return 0; }',
      correctAnswer: '10',
      explanation: '`char` (1 byte), `double` (8 bytes), `char` (1 byte). The `#pragma pack(push, 1)` directive forcefully strips all compiler padding. Thus, 1 + 8 + 1 = 10 raw bytes.',
      tags: ['pragma', 'memory', 'size'],
    },
    {
      id: 'u3-t6-q4',
      type: 'mcq',
      topicId: 'u3-t6',
      difficulty: 'intermediate',
      question: 'Which of the following is a completely standard-compliant, portable alternative to `#pragma once`?',
      options: [
        '#include <once>',
        '#pragma pack(0)',
        'Include Guards (#ifndef, #define, #endif)',
        '__attribute__((once))'
      ],
      correctAnswer: 'Include Guards (#ifndef, #define, #endif)',
      explanation: 'Legacy Include Guards utilize standard preprocessor macro logic that is mathematically guaranteed to work on every compliant C compiler in existence, unlike `#pragma once` which is technically a vendor extension.',
      tags: ['pragma', 'headers'],
    },
    {
      id: 'u3-t6-q5',
      type: 'spot-bug',
      topicId: 'u3-t6',
      difficulty: 'intermediate',
      question: 'Spot the bug that will ruin performance for the rest of the application:',
      code: '#pragma pack(1)\nstruct Header { char type; int length; };\n\nstruct Matrix { float data[16]; };',
      correctAnswer: 'Missing #pragma pack(pop)',
      explanation: 'Because the packing state was never popped, the compiler engine continues to enforce 1-byte alignment on the `Matrix` struct. Forcing floating-point arrays to reside on unaligned memory boundaries will obliterate mathematical processing speeds.',
      tags: ['pragma', 'packing'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t6-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t6',
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
      id: 'u3-t6-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t6',
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
      id: 'u3-t6-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t6',
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
      id: 'u3-t6-p1',
      title: 'Analyze Struct Sizes',
      topicId: 'u3-t6',
      difficulty: 'beginner',
      problemStatement: 'Write a program that defines two identical structs: one normal, and one packed using `#pragma pack(push, 1)`. The struct should contain a `char`, a `long`, and a `short`. Print the `sizeof` both structs to observe the difference.',
      constraints: ['Use #pragma pack(push, 1) and (pop)'],
      sampleInput: '',
      sampleOutput: 'Normal size: 24\nPacked size: 11\n(Note: Output varies by system architecture)',
      hints: ['struct Normal { char c; long l; short s; };', '#pragma pack(push, 1) ...'],
      solution: '#include <stdio.h>\n\nstruct Normal {\n    char c;\n    long l;\n    short s;\n};\n\n#pragma pack(push, 1)\nstruct Packed {\n    char c;\n    long l;\n    short s;\n};\n#pragma pack(pop)\n\nint main(void) {\n    printf("Normal size: %zu\\n", sizeof(struct Normal));\n    printf("Packed size: %zu\\n", sizeof(struct Packed));\n    return 0;\n}',
      solutionExplanation: 'This explicitly proves the massive memory footprint of hardware padding on 64-bit architecture. `char` (1), `long` (8), `short` (2). The Packed struct strictly occupies 11 bytes. The Normal struct injects 7 bytes of dead padding to align the `long`, and 6 bytes of tail padding to align the struct array size, exploding to 24 bytes.',
      dryRun: [
        { step: 1, line: 17, variables: {}, output: 'Normal size: 24', explanation: 'System aligns to 8-byte boundaries (assuming 64-bit long).' },
        { step: 2, line: 18, variables: {}, output: 'Packed size: 11', explanation: 'Zero padding. 1 + 8 + 2 = 11.' },
      ],
      tags: ['pragma', 'memory', 'packing'],
    },
    {
      id: 'u3-t6-p2',
      title: 'Create a Header File',
      topicId: 'u3-t6',
      difficulty: 'intermediate',
      problemStatement: 'Assume you are creating a header file `math_utils.h`. Write the contents of this header file using `#pragma once`, defining a struct `Vector3` (x, y, z floats) and declaring a function prototype `float getLength(Vector3 v);`.',
      constraints: ['Write only the header file content'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['Start with #pragma once', 'Define the typedef struct', 'Write the function prototype'],
      solution: '/* math_utils.h */\n#pragma once\n\ntypedef struct {\n    float x;\n    float y;\n    float z;\n} Vector3;\n\nfloat getLength(Vector3 v);\n',
      solutionExplanation: 'A standard header file architecture utilizing the modern `#pragma once` directive. This meta-instruction signals the compiler engine to never parse this file a second time during the build, safely preventing `Vector3` redefinition collisions.',
      dryRun: [
        { step: 1, line: 2, variables: {}, output: '', explanation: 'Compiler flags this file to only be included once per translation unit.' },
      ],
      tags: ['pragma', 'headers', 'architecture'],
    },
    {
      id: 'u3-t6-p3',
      title: 'Network Packet Simulation',
      topicId: 'u3-t6',
      difficulty: 'advanced',
      problemStatement: 'You are designing a protocol. Define a packed struct `Packet` with `char packetId`, `int timestamp`, and `short payload`. Create an instance, populate it (ID=\'A\', time=1000, payload=50). Print the size of the packet and the values.',
      constraints: ['Must be packed'],
      sampleInput: '',
      sampleOutput: 'Packet Size: 7 bytes\nID: A, Time: 1000, Payload: 50',
      hints: ['Use push/pop for packing', '1 byte + 4 bytes + 2 bytes = 7 bytes total.'],
      solution: '#include <stdio.h>\n\n#pragma pack(push, 1)\ntypedef struct {\n    char packetId;\n    int timestamp;\n    short payload;\n} Packet;\n#pragma pack(pop)\n\nint main(void) {\n    Packet p;\n    p.packetId = \'A\';\n    p.timestamp = 1000;\n    p.payload = 50;\n    \n    printf("Packet Size: %zu bytes\\n", sizeof(Packet));\n    printf("ID: %c, Time: %d, Payload: %d\\n", p.packetId, p.timestamp, p.payload);\n    \n    return 0;\n}',
      solutionExplanation: 'Simulates the architectural preparation required to transmit a struct over a raw TCP socket. By wrapping it in the pack sandbox, we guarantee exactly 7 bytes are physically sent over the wire, preventing random padding bytes from leaking memory secrets or corrupting the receiver\'s parsing logic.',
      dryRun: [
        { step: 1, line: 17, variables: {}, output: 'Packet Size: 7 bytes\\n', explanation: 'sizeof(Packet) is exactly 7 due to pack(1).' },
        { step: 2, line: 18, variables: {}, output: 'ID: A, Time: 1000, Payload: 50\\n', explanation: 'Values are accessed normally.' },
      ],
      tags: ['pragma', 'packing', 'networks'],
    },
  ],
};
