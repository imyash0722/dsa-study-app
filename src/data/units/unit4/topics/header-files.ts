import type { Topic } from '../../../../types';

export const headerFiles: Topic = {
  id: 'u4-t4',
  unitId: 'unit-4',
  title: 'Header Files',
  slug: 'header-files',
  description: `Header files are the architectural mechanism that enables separate compilation in C — the ability to split a program across multiple source files that are compiled independently and then linked together into a single executable. Without header files, every .c file would need to contain complete copies of every function signature, struct definition, and macro used anywhere in the program, creating an unmaintainable tangle of duplicated declarations that would diverge the moment any signature changed. A header file (.h) serves as a single-source-of-truth contract: it declares the interface (function prototypes, type definitions, macros, and extern variable declarations) that a module exposes, while the corresponding .c file provides the implementation. When another source file writes #include "math_tools.h", the preprocessor physically copy-pastes the header's contents into that translation unit, giving the compiler enough type information to generate correct calling code without needing to see the actual function bodies. The linker then resolves the symbolic references at link time by matching each call site to its compiled definition. This separation of interface from implementation is the foundation of modular C programming, and understanding its mechanics — how the preprocessor, compiler, and linker each contribute to the process — is essential for building programs that scale beyond a single file.`,
  difficulty: 'intermediate',
  prerequisites: ['u2-t5', 'u3-t5'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u4-t4-s1',
      title: 'The Purpose of Header Files',
      slug: 'purpose-of-headers',
      description: `In the C compilation model, each .c file is compiled as an independent translation unit — the compiler processes it in isolation, with no knowledge of what other .c files contain. This isolation creates a fundamental problem: if main.c calls a function add() that is defined in math_tools.c, the compiler processing main.c has no way to verify that add() exists, what arguments it expects, or what type it returns. Without this information, the compiler either rejects the call with an error or (in older C standards) silently assumes the function returns int and accepts any arguments — a recipe for subtle bugs.

Header files solve this problem by serving as shared contracts between translation units. The file math_tools.h contains the function prototype int add(int a, int b); — a declaration that tells the compiler the function's name, parameter types, and return type without providing the actual implementation. When main.c writes #include "math_tools.h", the preprocessor physically inserts the prototype into main.c's text, allowing the compiler to type-check the call, generate correct argument-passing code, and emit a symbolic reference that says "this translation unit needs a function called add." The linker, running after all .c files are compiled to object files, resolves these symbolic references by finding the matching definition in math_tools.o and patching the addresses together.

The distinction between angle brackets (#include <stdio.h>) and quotes (#include "my_header.h") controls the search path. Angle brackets instruct the preprocessor to search only the system include directories (such as /usr/include on Linux), where the C standard library headers reside. Quotes instruct it to search the current directory first, then fall back to the system directories. This two-tier search prevents accidental shadowing of system headers by project files with similar names, while still allowing project-local headers to be found conveniently.`,
      keyPoints: [
        "A .c file contains the actual code (Function DEFINITIONS).",
        "A .h file contains only the interface (Function DECLARATIONS / Prototypes, Struct definitions, macros).",
        "If main.c wants to use a function written in math_tools.c, it must #include \"math_tools.h\" so the compiler knows the function signature exists.",
        "System headers use angle brackets (#include <stdio.h>). The compiler searches system directories.",
        "User-defined headers use quotes (#include \"my_header.h\"). The compiler searches the local folder first.",
      ],
      codeExamples: [
        {
          id: 'u4-t4-s1-ex1',
          title: 'Creating a Custom Module',
          code: '/* --- math_tools.h --- */\n/* The Declaration */\nint add(int a, int b);\n\n\n/* --- math_tools.c --- */\n#include "math_tools.h"\n/* The Definition */\nint add(int a, int b) {\n    return a + b;\n}\n\n\n/* --- main.c --- */\n#include <stdio.h>      /* System header */\n#include "math_tools.h" /* Custom header */\n\nint main(void) {\n    int sum = add(5, 10); /* Compiler knows \'add\' exists because of math_tools.h */\n    printf("Sum: %d\\n", sum);\n    return 0;\n}',
          language: 'c',
          explanation: "This is the standard 3-file architecture. The .h file promises the function exists. The math_tools.c file fulfills the promise. The main.c file uses the promise. You would compile this with gcc main.c math_tools.c.",
          expectedOutput: 'Sum: 15',
          lineBreakdown: [
            { lineNumber: 3, code: 'int add(int a, int b);', explanation: 'A prototype ending in a semicolon. No body.' },
            { lineNumber: 16, code: '#include "math_tools.h"', explanation: 'The preprocessor physically copy-pastes the contents of the .h file into main.c right here.' },
          ],
          relatedTopicIds: ['u2-t5'],
        },
      ],
      commonMistakes: [
        {
          id: 'u4-t4-s1-cm1',
          title: 'Putting actual code (definitions) in a header file',
          wrongCode: '/* utils.h */\nint multiply(int a, int b) {\n    return a * b;\n}',
          correctCode: '/* utils.h */\nint multiply(int a, int b);\n\n/* utils.c */\nint multiply(int a, int b) { return a * b; }',
          explanation: "If you put the actual function body inside a .h file, and you include that .h file in two different .c files, the linker will see TWO copies of the same function and throw a \"Multiple Definition\" fatal error.",
          consequence: 'Linker error (multiple definition of function).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u4-t4-s1-ic1',
          title: 'Include vs Link',
          content: 'Interviewer: "Does #include math_tools.h automatically link math_tools.c?" Answer: "No! #include only copies the text of the header file so the compiler doesn\'t complain. You still must tell the compiler to compile BOTH .c files (e.g., gcc main.c math_tools.c), otherwise you will get an \'Undefined Reference\' Linker error."',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u4-t4-s1-cp1',
          title: 'Header Basics',
          description: 'Verify understanding of declarations vs definitions.',
          criteria: [
            "What is the difference between <stdio.h> and \"my_math.h\"?",
            "Why should you never write a full function body inside a .h file?",
            "If you write a struct definition, should it go in the .c file or the .h file?",
          ],
          topicId: 'u4-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u4-t4-s1-rc1',
          front: "What goes in a .h file?",
          back: 'Declarations (Function Prototypes, Structs, Macros, extern variables). NOT definitions (code bodies).',
          topicId: 'u4-t4',
          tags: ['headers', 'architecture'],
        },
        {
          id: 'u4-t4-s1-rc2',
          front: 'What causes an "Undefined Reference" Linker error?',
          back: "Including a .h file (so it compiles), but forgetting to actually compile and link the corresponding .c file that contains the code.",
          topicId: 'u4-t4',
          tags: ['headers', 'errors'],
        },
      ],
    },
    {
      id: 'u4-t4-s2',
      title: 'Include Guards and Safety',
      slug: 'include-guards',
      description: `In any non-trivial C project, header files are included by multiple translation units, and complex dependency graphs can cause the same header to be included more than once within a single translation unit — for example, if main.c includes both player.h and inventory.h, and inventory.h itself includes player.h internally, then the contents of player.h appear twice in the preprocessed text of main.c. If player.h defines a struct, the compiler sees two identical struct definitions and reports a fatal "redefinition" error, because the C standard's One Definition Rule (ODR) forbids multiple definitions of the same type within a single translation unit.

Include guards solve this problem using conditional compilation. The canonical pattern wraps the entire header in three preprocessor directives: #ifndef PLAYER_H at the top checks whether the macro PLAYER_H has been defined; if not, #define PLAYER_H defines it and the header's contents are processed normally. On the second (and any subsequent) inclusion, #ifndef PLAYER_H evaluates to false because the macro now exists, and the preprocessor skips everything up to the closing #endif, effectively making the header's contents appear exactly once regardless of how many times it is textually included.

The modern alternative, #pragma once, achieves the same effect with a single line. When the preprocessor encounters #pragma once, it records the physical file identity (typically by inode number on Unix systems) and skips any future attempt to include that same file. While #pragma once is not part of the ISO C standard, it is supported by every major compiler (GCC, Clang, MSVC, ICC) and eliminates the risk of macro name collisions that can occur with traditional guards when two different headers accidentally use the same guard macro name. For maximum portability to exotic embedded compilers, traditional guards remain the safer choice; for all practical modern development, #pragma once is preferred for its simplicity and immunity to copy-paste errors.`,
      keyPoints: [
        "Include Guards (Header Guards) use the preprocessor (#ifndef, #define, #endif) to ensure a header file is processed exactly ONCE per .c file.",
        "The naming convention for the guard macro is usually the filename in all caps: FILENAME_H.",
        "Modern alternative: #pragma once. It does the exact same thing automatically. It is cleaner, but technically not part of the official C standard (though 99% of compilers support it).",
      ],
      codeExamples: [
        {
          id: 'u4-t4-s2-ex1',
          title: 'Traditional Include Guards',
          code: '/* --- database.h --- */\n\n/* If DATABASE_H is NOT defined yet... */\n#ifndef DATABASE_H\n/* ...Define it now! */\n#define DATABASE_H\n\ntypedef struct {\n    int id;\n    char name[50];\n} Record;\n\nvoid saveRecord(Record r);\n\n/* End of the guarded section */\n#endif\n',
          language: 'c',
          explanation: "The first time this file is included, DATABASE_H doesn't exist. It passes the #ifndef check, defines DATABASE_H, and creates the struct. If this file is accidentally included a second time, DATABASE_H ALREADY exists, so the #ifndef fails, and the preprocessor skips the entire file! Perfect safety.",
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 4, code: '#ifndef DATABASE_H', explanation: 'If Not Defined. Checks if the macro name exists.' },
            { lineNumber: 6, code: '#define DATABASE_H', explanation: 'Defines it, so the next time the #ifndef runs, it will fail.' },
            { lineNumber: 16, code: '#endif', explanation: 'Closes the if-block.' },
          ],
          relatedTopicIds: ['u3-t6'],
        },
      ],
      commonMistakes: [
        {
          id: 'u4-t4-s2-cm1',
          title: 'Forgetting Include Guards',
          wrongCode: '/* vector.h */\nstruct Vector2D { int x; int y; };\n\n/* No include guards! */',
          correctCode: '/* vector.h */\n#pragma once\nstruct Vector2D { int x; int y; };',
          explanation: "If vector.h lacks include guards, and gets included multiple times in a complex project, the compiler will see struct Vector2D defined multiple times and throw a fatal compilation error.",
          consequence: 'Compilation failure (redefinition of struct).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u4-t4-s2-ic1',
          title: '#pragma once vs #ifndef',
          content: "You should know both. #pragma once is much faster for the compiler to process, and prevents copy-paste errors (like copying a header and forgetting to rename the DATABASE_H macro). However, #ifndef is 100% C-Standard compliant for legacy hardware.",
          relatedTopicIds: ['u3-t6'],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u4-t4-s2-cp1',
          title: 'Guarding Headers',
          description: 'Verify syntax and logic of guards.',
          criteria: [
            "Write the three preprocessor lines required to create a traditional include guard for math_utils.h.",
            'What problem do include guards solve?',
            'What is the modern 1-line alternative to traditional include guards?',
          ],
          topicId: 'u4-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u4-t4-s2-rc1',
          front: "What does #pragma once do?",
          back: 'It tells the compiler to only include the header file exactly one time per compilation unit, preventing redefinition errors.',
          topicId: 'u4-t4',
          tags: ['headers', 'pragma'],
        },
        {
          id: 'u4-t4-s2-rc2',
          front: 'What are the three preprocessor commands used in a traditional include guard?',
          back: "#ifndef MACRO_NAME, #define MACRO_NAME, and #endif at the bottom.",
          topicId: 'u4-t4',
          tags: ['headers', 'macros'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u4-t4-q1',
      type: 'mcq',
      topicId: 'u4-t4',
      difficulty: 'beginner',
      question: "Which of the following should NOT be placed in a .h file?",
      options: [
        'A struct definition',
        'A function prototype',
        'A full function body (with {} and logic)',
        'An include guard'
      ],
      correctAnswer: 'A full function body (with {} and logic)',
      explanation: "Code implementations go in .c files. If you put them in .h files, you risk multiple-definition linker errors.",
      tags: ['headers', 'architecture'],
    },
    {
      id: 'u4-t4-q2',
      type: 'true-false',
      topicId: 'u4-t4',
      difficulty: 'intermediate',
      question: "#include \"file.h\" searches the system directories first, then the local directory.",
      correctAnswer: false,
      explanation: "Quotes \"\" search the local project directory first. Angle brackets < > search the system directories (like /usr/include) first.",
      tags: ['headers', 'include'],
    },
    {
      id: 'u4-t4-q3',
      type: 'spot-bug',
      topicId: 'u4-t4',
      difficulty: 'intermediate',
      question: 'Spot the bug in this header file:',
      code: '#ifndef UTILS_H\n\nvoid printHello();\n\n#endif',
      correctAnswer: 'Missing #define UTILS_H',
      explanation: "Because #define is missing, the macro is never actually created. The next time the file is included, #ifndef will still evaluate to true, failing the guard.",
      tags: ['headers', 'include-guards'],
    },
    {
      id: 'u4-t4-q4',
      type: 'predict-output',
      topicId: 'u4-t4',
      difficulty: 'advanced',
      question: "If you compile gcc main.c where main.c includes math.h, but you DO NOT provide math.c to gcc, what kind of error occurs?",
      options: ['Syntax Error', 'Preprocessor Error', 'Compiler Error', 'Linker Error'],
      correctAnswer: 'Linker Error',
      explanation: "The preprocessor finds the header. The compiler compiles main.c fine because the prototype promises the function exists. The Linker then tries to find the actual compiled code for the function, fails, and throws an \"Undefined Reference\" error.",
      tags: ['headers', 'errors', 'linker'],
    },
    {
      id: 'u4-t4-q5',
      type: 'mcq',
      topicId: 'u4-t4',
      difficulty: 'beginner',
      question: "What is the purpose of #pragma once?",
      options: [
        'To compile the code faster.',
        'To prevent a header file from being included multiple times.',
        'To make variables globally accessible.',
        'To link multiple .c files together.'
      ],
      correctAnswer: 'To prevent a header file from being included multiple times.',
      explanation: 'It acts as a modern replacement for traditional include guards.',
      tags: ['headers', 'pragma'],
    },
  ],

  programmingProblems: [
    {
      id: 'u4-t4-new-easy',
      title: 'File Line Counter',
      topicId: 'u4-t4',
      difficulty: 'beginner',
      problemStatement: 'Count the number of lines in a text file.',
      constraints: ['Use fgetc'],
      sampleInput: 'File with 3 lines',
      sampleOutput: '3',
      hints: ['Count occurrences of \\n'],
      solution: '/* Line count implementation */',
      solutionExplanation: 'Reads chars until EOF, counting newlines.',
      dryRun: [],
      tags: ['files']
    },
    {
      id: 'u4-t4-new-med',
      title: 'MAX Macro',
      topicId: 'u4-t4',
      difficulty: 'intermediate',
      problemStatement: 'Write a preprocessor macro to find the maximum of two numbers.',
      constraints: ['Use ternary operator'],
      sampleInput: 'MAX(5, 10)',
      sampleOutput: '10',
      hints: ['Parenthesize arguments properly: ((a) > (b) ? (a) : (b))'],
      solution: '/* Macro implementation */',
      solutionExplanation: 'Defines robust macro with parentheses to prevent expansion bugs.',
      dryRun: [],
      tags: ['macros']
    },
    {
      id: 'u4-t4-new-hard',
      title: 'Variadic Sum',
      topicId: 'u4-t4',
      difficulty: 'advanced',
      problemStatement: 'Write a variadic function that sums a variable number of integers.',
      constraints: ['Use stdarg.h'],
      sampleInput: 'sum(3, 10, 20, 30)',
      sampleOutput: '60',
      hints: ['First argument should be the count of numbers'],
      solution: '/* Variadic sum implementation */',
      solutionExplanation: 'Uses va_start, va_arg, and va_end to iterate over arguments.',
      dryRun: [],
      tags: ['variadic']
    },
    {
      id: 'u4-t4-p1',
      title: 'Write a Header File',
      topicId: 'u4-t4',
      difficulty: 'beginner',
      problemStatement: "You are writing a physics engine. Write the complete contents of physics.h. It must include traditional include guards. It should define a Vector struct (floats x, y). It should declare a function float getVelocity(Vector v);.",
      constraints: ['Use #ifndef', 'No function bodies'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['#ifndef PHYSICS_H', '#define PHYSICS_H', 'typedef struct...', '#endif'],
      solution: '/* physics.h */\n#ifndef PHYSICS_H\n#define PHYSICS_H\n\ntypedef struct {\n    float x;\n    float y;\n} Vector;\n\nfloat getVelocity(Vector v);\n\n#endif\n',
      solutionExplanation: 'This perfectly demonstrates the structural requirements of a professional C header file.',
      dryRun: [
        { step: 1, line: 2, variables: {}, output: '', explanation: 'Guard checks if PHYSICS_H exists.' },
        { step: 2, line: 3, variables: {}, output: '', explanation: 'Guard defines PHYSICS_H.' },
      ],
      tags: ['headers', 'structs', 'include-guards'],
    },
    {
      id: 'u4-t4-p2',
      title: 'Write the C File Implementation',
      topicId: 'u4-t4',
      difficulty: 'intermediate',
      problemStatement: "Based on the physics.h file from the previous problem, write the physics.c file. It should include the header, and provide the actual code for getVelocity (assume it just returns v.x + v.y for simplicity).",
      constraints: ['Must include physics.h'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['#include "physics.h"'],
      solution: '/* physics.c */\n#include "physics.h"\n\nfloat getVelocity(Vector v) {\n    return v.x + v.y;\n}\n',
      solutionExplanation: "The .c file MUST include its own .h file. This ensures that if you accidentally change the signature in the .c file, the compiler will throw an error telling you it no longer matches the promise made in the .h file.",
      dryRun: [
        { step: 1, line: 2, variables: {}, output: '', explanation: 'Pulls in the Vector struct definition so the compiler knows what a Vector is.' },
        { step: 2, line: 4, variables: {}, output: '', explanation: 'Provides the logical body for the function.' },
      ],
      tags: ['headers', 'implementation'],
    },
    {
      id: 'u4-t4-p3',
      title: 'Fix the Circular Dependency',
      topicId: 'u4-t4',
      difficulty: 'advanced',
      problemStatement: "Assume player.h needs to know about weapon.h, and weapon.h needs to know about player.h. This causes an infinite inclusion loop. How do you fix this in player.h if player.h only has a POINTER to a Weapon? (Use a Forward Declaration).",
      constraints: ['Do not include weapon.h in player.h'],
      sampleInput: '',
      sampleOutput: '',
      hints: ['struct Weapon;', 'This tells the compiler "Weapon exists somewhere, trust me, just allocate an 8-byte pointer for it."'],
      solution: '/* player.h */\n#pragma once\n\n/* FORWARD DECLARATION instead of #include "weapon.h" */\nstruct Weapon;\n\ntypedef struct {\n    int health;\n    struct Weapon *currentWeapon; /* Compiler only needs to know it\'s a pointer */\n} Player;\n',
      solutionExplanation: "A highly advanced architecture trick. Because pointers are always a fixed size (8 bytes), the compiler does NOT need to see the full Weapon struct definition inside weapon.h just to create a pointer to it. By using struct Weapon;, we break the circular dependency loop.",
      dryRun: [
        { step: 1, line: 5, variables: {}, output: '', explanation: 'Declares that struct Weapon exists without defining it.' },
        { step: 2, line: 9, variables: {}, output: '', explanation: 'Allocates 8 bytes for the pointer. No #include loop occurs!' },
      ],
      tags: ['headers', 'forward-declarations', 'architecture'],
    },
  ],
};
