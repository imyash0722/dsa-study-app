import type { Topic } from '../../../../types';

export const programStructure: Topic = {
  id: 'u1-t3',
  unitId: 'unit-1',
  title: 'Program Structure',
  slug: 'program-structure',
  description:
    `Every C program, regardless of complexity, is composed of the same structural elements: preprocessor directives that transform the source text before compilation, function definitions that organise executable logic into reusable units, and a distinguished main() function that the operating system's runtime calls to begin program execution. Understanding this structure is not merely about memorising syntax — it is about understanding the four-stage transformation pipeline (preprocessing, compilation, assembly, linking) that converts human-readable source code into a binary executable.

Each stage of this pipeline serves a distinct purpose and produces different error messages when something goes wrong. Preprocessor errors (such as a missing header file) manifest as "file not found" messages before the compiler even parses your code. Compiler errors (such as a syntax mistake or type mismatch) occur during the translation from C to assembly. Assembler errors are rare but indicate low-level issues. Linker errors (such as "undefined reference to sqrt") occur when the compiled object files reference functions whose implementations were never provided — typically because a library flag like -lm was omitted.

Knowing which stage of the pipeline produced an error is a practical diagnostic skill that dramatically reduces debugging time. This topic covers the anatomy of a C source file (the role of each structural element) and the GCC compilation pipeline (how each stage transforms the code), providing the conceptual framework that every subsequent topic in the curriculum builds upon.`,
  difficulty: 'beginner',
  prerequisites: ['u1-t2'],
  estimatedMinutes: 40,

  subtopics: [
    {
      id: 'u1-t3-s1',
      title: 'Anatomy of a C Program',
      slug: 'anatomy-of-c-program',
      description:
        `Every C program, from a student's first assignment to the Linux kernel itself, is composed of three structural elements that serve distinct roles in the build pipeline: preprocessor directives, function definitions, and declarations. Preprocessor directives (lines beginning with #, such as #include and #define) are instructions to the C preprocessor — a separate text-transformation tool that runs before the compiler ever sees the code. The preprocessor performs textual substitution: #include <stdio.h> copies the entire contents of the stdio.h header file into your source at that point, and #define PI 3.14159 replaces every subsequent occurrence of PI with the literal text 3.14159. Because these operations are purely textual (not semantic), preprocessor directives do not end with semicolons and obey different rules than C statements.

Function definitions are the primary organisational unit of C code. A function encapsulates a named, reusable block of logic with a declared return type, a parameter list, and a body enclosed in braces. The special function int main(void) serves as the program's entry point: when the operating system loads and launches a compiled C executable, the C runtime startup code (_start on Linux, which the linker inserts automatically) performs initialisation tasks (setting up the stack, initialising static variables) and then calls main(). The integer value returned by main is passed back to the operating system as the program's exit status: 0 conventionally signals success, and any non-zero value signals an error. This return value is accessible to shell scripts and parent processes via the $? variable on Unix systems.

The interplay between these structural elements defines how a C program is organised. Header files (.h) contain function prototypes and type definitions that allow the compiler to check function calls for type correctness without seeing the actual implementation. Source files (.c) contain the implementations of those functions. The linker combines the compiled object files and resolves cross-references (such as calls to printf, whose implementation lives in the C standard library) to produce the final executable. Understanding this separation of declaration (headers) from definition (source files) is essential for building multi-file C projects.`,
      keyPoints: [
        'Preprocessor directives (lines starting with #, like #include and #define) are processed before the compiler even sees your code. They are instructions to the preprocessor, a separate tool that runs first and transforms your source text. Because they are not C statements, they do not end with semicolons — adding a semicolon after #include is a common mistake that can cause bewildering errors.',
        'The #include <stdio.h> directive tells the preprocessor to find the file stdio.h (Standard Input/Output header) on your system and literally paste its entire contents into your source code at that exact position. This file contains the declarations of printf, scanf, and dozens of other I/O functions. Without this line, the compiler has never heard of printf and will refuse to compile your program.',
        'The function int main(void) is the entry point of every C program — it is the first function the operating system calls when you run your executable. The int before main means it returns an integer to the operating system, and void inside the parentheses means it takes no command-line arguments (you will learn about main with arguments later). Every C program must have exactly one main function.',
        'The body of main (and every other function) is enclosed in curly braces { }. Statements inside are executed sequentially from top to bottom, one after another. Each statement represents a single action — printing a message, computing a value, or making a decision — and the order in which you write them determines the order in which they execute.',
        'The statement return 0 at the end of main sends the value 0 back to the operating system as an "exit code." By universal convention, 0 means "the program ran successfully," while any non-zero value (like 1, 2, or -1) signals that something went wrong. Shell scripts and build systems check this exit code to decide whether to proceed or report an error.',
        'Every statement in C must end with a semicolon (;). The semicolon is not a separator (like a comma) but a terminator — it marks the end of a statement the same way a period marks the end of a sentence. Preprocessor directives like #include and #define are not statements and must not have semicolons, which is an important distinction beginners need to internalize early.',
      ],
      codeExamples: [
        {
          id: 'u1-t3-s1-ex1',
          title: 'Complete Anatomy — Every Part Labeled',
          code: '/* Preprocessor Directive - includes standard I/O library */\n#include <stdio.h>\n\n/* Function Definition - program entry point */\nint main(void) {\n    /* Statement - print to console */\n    printf("Program structure demo\\n");\n\n    /* Statement - return success to OS */\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program is deliberately annotated to show every structural layer of a C program. Notice the three distinct levels: at the top, preprocessor directives prepare the compilation environment; in the middle, the function definition (int main) creates a named block of executable code; and inside the function body, individual statements do the actual work. This layered structure scales perfectly — a 10-line program and a 100,000-line program both follow exactly the same pattern.',
          expectedOutput: 'Program structure demo',
          lineBreakdown: [
            { lineNumber: 2, code: '#include <stdio.h>', explanation: 'Preprocessor directive. Tells the preprocessor to paste the contents of stdio.h here. No semicolon needed.' },
            { lineNumber: 5, code: 'int main(void) {', explanation: 'Function definition. int = return type, main = name, void = no parameters, { = body starts.' },
            { lineNumber: 7, code: '    printf("Program structure demo\\n");', explanation: 'A statement — calls printf function. Must end with semicolon.' },
            { lineNumber: 10, code: '    return 0;', explanation: 'Returns 0 to the OS. This is how the OS knows your program succeeded.' },
            { lineNumber: 11, code: '}', explanation: 'Closing brace — end of main function body.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
        {
          id: 'u1-t3-s1-ex2',
          title: 'Multiple Functions in a Program',
          code: '#include <stdio.h>\n\nvoid greet(void) {\n    printf("Hello from greet()!\\n");\n}\n\nint main(void) {\n    printf("Starting...\\n");\n    greet();\n    printf("Done.\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'Once your programs grow beyond a few lines, you need to break them into smaller, reusable pieces called functions. This program defines a helper function greet() that handles one specific task (printing a greeting), and main() orchestrates the overall flow by calling greet() at the right moment. When the CPU reaches the greet() call on line 9, it pauses execution of main, jumps to the greet function, executes its body, and then returns to main to continue where it left off. This call-and-return mechanism is the foundation of structured programming.',
          expectedOutput: 'Starting...\nHello from greet()!\nDone.',
          lineBreakdown: [
            { lineNumber: 3, code: 'void greet(void) {', explanation: 'A user-defined function. void means it returns nothing.' },
            { lineNumber: 9, code: '    greet();', explanation: 'Calls the greet function. Control jumps to greet(), executes it, then returns here.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u1-t3-s1-ex3',
          title: 'Using #define — Preprocessor Macro',
          code: '#include <stdio.h>\n#define PI 3.14159\n#define COURSE "UE25CS151B"\n\nint main(void) {\n    printf("Course: %s\\n", COURSE);\n    printf("Pi = %f\\n", PI);\n    return 0;\n}',
          language: 'c',
          explanation:
            'The #define directive is your first encounter with the preprocessor as a code transformation tool. When you write #define PI 3.14159, you are telling the preprocessor: "Before the compiler sees this code, find every occurrence of the text PI and replace it with 3.14159." This is a pure text substitution, not a variable assignment — after preprocessing, the token PI does not exist anywhere in your code. This matters because macros have no type checking, no scope, and no runtime overhead. Notice that #define lines have no semicolon: if you wrote #define PI 3.14159; then the semicolon would become part of the replacement text, causing errors wherever PI is used.',
          expectedOutput: 'Course: UE25CS151B\nPi = 3.141590',
          lineBreakdown: [
            { lineNumber: 2, code: '#define PI 3.14159', explanation: 'Macro definition. The preprocessor replaces all PI with 3.14159 before compiling. No semicolon!' },
            { lineNumber: 3, code: '#define COURSE "UE25CS151B"', explanation: 'String macro. COURSE is replaced with the string literal.' },
            { lineNumber: 7, code: '    printf("Pi = %f\\n", PI);', explanation: 'After preprocessing, this becomes printf("Pi = %f\\n", 3.14159);' },
          ],
          relatedTopicIds: ['u1-t12'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s1-cm1',
          title: 'Putting a semicolon after #include',
          wrongCode: '#include <stdio.h>;',
          correctCode: '#include <stdio.h>',
          explanation:
            'This mistake reveals a misunderstanding of the boundary between C statements and preprocessor directives. Preprocessor directives live in a separate world from C code — they are processed by a different tool (the preprocessor) that runs before the compiler. Directives like #include are complete instructions on their own and do not use semicolons. When you add a semicolon, it becomes part of the text that gets pasted into your code, potentially creating syntax errors deep inside the header file that are nearly impossible to diagnose because the error messages reference code you did not write.',
          consequence: 'The semicolon becomes part of the included content, potentially causing cryptic compilation errors that appear to be inside the header file itself rather than in your code. These errors are baffling because the error messages point to lines you never wrote.',
        },
        {
          id: 'u1-t3-s1-cm2',
          title: 'Writing void main() instead of int main(void)',
          wrongCode: 'void main() {\n    printf("Hello\\n");\n}',
          correctCode: 'int main(void) {\n    printf("Hello\\n");\n    return 0;\n}',
          explanation:
            'Many textbooks and online tutorials (especially older ones) use void main(), and students naturally copy this pattern. But the C standard (C89, C99, C11, and C17 all agree) specifies that main must return int. The return value is how your program communicates its exit status to the operating system and to any parent process that launched it. Using void main() means the return value is undefined, which is technically undefined behavior. Some compilers accept it as an extension, but others will reject it outright. More importantly, using void main() in an exam or interview signals that you learned from unreliable sources, which creates a poor impression.',
          consequence: 'Some compilers (particularly stricter ones or those with -pedantic flag) will reject void main() entirely. Even when it compiles, the exit code returned to the operating system is undefined, which can cause problems in scripts or automated testing systems. In academic settings, this typically results in lost marks.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s1-ic1',
          title: 'What does #include actually do?',
          content:
            'This is one of the most frequently asked questions in vivas and systems programming interviews, and the answer reveals how deeply you understand the compilation process. The #include directive is not a function call and does not "import" a module the way Python or Java does. It is a preprocessor command that literally opens the specified file, reads its entire contents (which can be thousands of lines), and pastes them into your source code at the exact point where the #include appears. After preprocessing, your 10-line program might be 10,000 lines because the entire contents of stdio.h (and all the headers it includes) have been inserted. This expanded file is what the compiler actually sees. Understanding this helps you debug errors that seem to come from inside system headers — they are usually caused by something in your code that corrupts the context before the #include expansion.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t3-s1-cp1',
          title: 'Write a Complete C Program',
          description: 'Verify you can write a properly structured C program from scratch.',
          criteria: [
            'Include the correct header file',
            'Use int main(void) with return 0',
            'End all statements with semicolons',
            'Use proper indentation (4 spaces or 1 tab)',
          ],
          topicId: 'u1-t3',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t3-s1-rc1',
          front: 'What does #include <stdio.h> do?',
          back: 'It tells the preprocessor to copy the entire contents of the stdio.h header file into your source code. This gives access to printf, scanf, and other I/O functions.',
          topicId: 'u1-t3',
          tags: ['preprocessor', 'include'],
        },
        {
          id: 'u1-t3-s1-rc2',
          front: 'Why must main() return int?',
          back: 'The C standard requires main to return int. The return value is sent to the OS as an exit code: 0 means success, non-zero means error. void main() is non-standard.',
          topicId: 'u1-t3',
          tags: ['main', 'return'],
        },
        {
          id: 'u1-t3-s1-rc3',
          front: 'Do preprocessor directives need a semicolon?',
          back: 'No. Directives like #include and #define are processed before compilation. They are not C statements and must NOT end with a semicolon.',
          topicId: 'u1-t3',
          tags: ['preprocessor', 'syntax'],
        },
      ],
    },
    {
      id: 'u1-t3-s2',
      title: 'GCC Compilation Pipeline',
      slug: 'gcc-compilation-pipeline',
      description:
        `When you execute gcc hello.c -o hello, four distinct programs run in strict sequence, each transforming your source code into a progressively lower-level representation until it becomes a stream of binary instructions that the CPU can execute directly. Understanding this pipeline is not academic trivia — it is the practical skill that enables you to diagnose build failures, because each stage produces different error messages and requires different fixes.

Stage 1 is preprocessing (invoked with gcc -E): the preprocessor performs textual transformations on your source file — expanding #include directives by pasting header file contents inline, replacing #define macros with their textual definitions, and evaluating #ifdef conditional compilation blocks. The output is a .i file that is still legal C code but can be enormous because all included headers have been expanded. Stage 2 is compilation proper (gcc -S): the compiler parses the preprocessed C code, checks it for syntactic and semantic correctness, performs optimisations, and translates it into assembly language specific to the target CPU architecture (x86-64, ARM, RISC-V). The output is a .s file containing human-readable assembly mnemonics.

Stage 3 is assembly (gcc -c): the assembler converts the assembly mnemonics into machine code — the actual binary opcodes that the CPU decodes and executes. The output is a .o object file containing relocatable binary code and a symbol table that lists the functions and global variables the file defines and references. Stage 4 is linking: the linker combines your .o files with the C standard library's object files (which contain the compiled implementations of printf, malloc, etc.) and resolves all cross-file function references to produce a complete, self-contained executable. Linker errors (such as "undefined reference to 'sqrt'") indicate that a function was declared but its implementation was never provided — typically because a required library flag (e.g., -lm for the math library) was omitted from the command.`,
      keyPoints: [
        'Stage 1 — Preprocessing (gcc -E): The preprocessor handles all lines that begin with #. It expands #include directives (pasting in header file contents), replaces #define macros with their values, evaluates #ifdef conditional compilation blocks, and strips out all comments. The output is a .i file that is still pure C code, but it can be enormous because all the included headers have been expanded inline.',
        'Stage 2 — Compilation (gcc -S): The compiler takes the preprocessed C code and translates it into assembly language specific to your CPU architecture (x86, ARM, etc.). The output is a .s file containing human-readable assembly instructions like mov, add, call, and push. You rarely need to read assembly, but understanding that this stage exists helps you appreciate that C is "one step above" the hardware.',
        'Stage 3 — Assembly (gcc -c): The assembler converts the human-readable assembly code into machine code — the actual binary instructions that your CPU can execute. The output is a .o (object) file containing raw binary data. This file is not yet a complete program because it may reference functions (like printf) whose actual code lives elsewhere.',
        'Stage 4 — Linking (gcc with no special flag): The linker is the final step. It takes your .o object file and combines it with the object files from the C standard library (which contain the actual compiled code for printf, scanf, malloc, etc.) to produce a complete, self-contained executable. If you use functions from math.h, you must tell the linker to include the math library with -lm, because it is not linked by default.',
        'Key GCC flags you should use every time you compile: -Wall enables all common warnings (unused variables, format mismatches, implicit declarations), -Wextra adds extra warnings beyond -Wall, -std=c11 ensures your code is compiled as C11 standard (which your course uses), -g embeds debugging symbols so GDB can show variable names and line numbers, and -o name lets you choose the name of the output executable.',
        'Your standard compilation command for this course should be: gcc -std=c11 -Wall -Wextra -g -o program program.c. This single command runs all four stages in sequence and produces a debuggable executable with all warnings enabled. Memorize this command — you will type it hundreds of times.',
      ],
      codeExamples: [
        {
          id: 'u1-t3-s2-ex1',
          title: 'Compiling Step by Step',
          code: '/* Save as hello.c */\n#include <stdio.h>\n#define MSG "Hello from the pipeline!"\n\nint main(void) {\n    printf("%s\\n", MSG);\n    return 0;\n}\n\n/* Terminal commands:\n   gcc -E hello.c -o hello.i    (preprocessing)\n   gcc -S hello.c -o hello.s    (compilation to assembly)\n   gcc -c hello.c -o hello.o    (assembly to object file)\n   gcc hello.o -o hello          (linking to executable)\n   ./hello                       (run it)\n*/',
          language: 'c',
          explanation:
            'Most of the time, you let gcc handle all four stages automatically with a single command. But this example shows you how to run each stage individually, which is invaluable when you are debugging a build failure. If gcc -E succeeds but gcc -S fails, you know the error is in your C code, not in your macros. If gcc -c succeeds but the final linking step fails, the problem is a missing library, not a syntax error. Being able to isolate the failing stage dramatically narrows your search for the cause.',
          expectedOutput: 'Hello from the pipeline!',
          lineBreakdown: [
            { lineNumber: 3, code: '#define MSG "Hello from the pipeline!"', explanation: 'Stage 1 (preprocessing) replaces MSG with the string everywhere.' },
            { lineNumber: 6, code: '    printf("%s\\n", MSG);', explanation: 'After preprocessing, this becomes printf("%s\\n", "Hello from the pipeline!");' },
            { lineNumber: 11, code: 'gcc -E hello.c -o hello.i', explanation: 'Produces preprocessed C code. The file will be thousands of lines (stdio.h contents).' },
            { lineNumber: 12, code: 'gcc -S hello.c -o hello.s', explanation: 'Produces assembly code. You can read it — it uses instructions like mov, call, push.' },
            { lineNumber: 13, code: 'gcc -c hello.c -o hello.o', explanation: 'Produces binary object code. Not human-readable.' },
            { lineNumber: 14, code: 'gcc hello.o -o hello', explanation: 'Links with C standard library to produce the final executable.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u1-t3-s2-ex2',
          title: 'Using -Wall to Catch Bugs Early',
          code: '#include <stdio.h>\n\nint main(void) {\n    int x = 5;\n    int y = 0;\n    /* -Wall would warn: variable y set but not used */\n    printf("x = %d\\n", x);\n    return 0;\n}',
          language: 'c',
          explanation:
            'The -Wall flag is the single most important habit you can develop as a C programmer. Without it, GCC compiles your code silently even when it detects suspicious patterns that are very likely bugs — like variables that are declared but never used (suggesting you forgot to incorporate them into your logic), printf format specifiers that do not match the types of the arguments, or functions that are supposed to return a value but do not. These warnings are not false alarms; they are the compiler trying to help you catch bugs before you run the program. Compile with -Wall -Wextra from day one and treat every warning as an error to fix, not a nuisance to ignore.',
          expectedOutput: 'x = 5',
          lineBreakdown: [
            { lineNumber: 5, code: '    int y = 0;', explanation: 'y is set but never used. With -Wall, GCC warns: "unused variable y".' },
          ],
          relatedTopicIds: ['u1-t12'],
        },
        {
          id: 'u1-t3-s2-ex3',
          title: 'Compilation Error vs Runtime Error',
          code: '#include <stdio.h>\n\nint main(void) {\n    int a = 10;\n    int b = 0;\n    /* This compiles fine but crashes at runtime! */\n    /* printf("%d\\n", a / b); -- division by zero */\n    printf("Compiles OK. Runtime errors are different!\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'This distinction is crucial and often tested in exams: compilation errors and runtime errors are fundamentally different animals. A compilation error means the compiler cannot even understand your code — you have made a syntactic or type error that prevents translation. The program never runs because it was never built. A runtime error, on the other hand, means the code compiled perfectly (the syntax was correct, the types matched) but something goes wrong during execution — you divide by zero, you access memory that does not belong to you, or you enter an infinite loop. The compiler cannot catch runtime errors because they depend on the actual data your program receives, which is unknown at compile time.',
          expectedOutput: 'Compiles OK. Runtime errors are different!',
          lineBreakdown: [
            { lineNumber: 5, code: '    int b = 0;', explanation: 'Legal C code — the compiler is fine with this.' },
            { lineNumber: 7, code: '    /* a / b */', explanation: 'If uncommented, a/b when b=0 would compile but crash at runtime with a floating-point exception.' },
          ],
          relatedTopicIds: ['u1-t10'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t3-s2-cm1',
          title: 'Forgetting to link math library',
          wrongCode: '/* gcc program.c -o program */\n#include <math.h>\ndouble r = sqrt(25.0);',
          correctCode: '/* gcc program.c -o program -lm */\n#include <math.h>\ndouble r = sqrt(25.0);',
          explanation:
            'This is a linker error, not a compiler error, and the distinction matters for diagnosis. The compiler stage succeeds because #include <math.h> provides the declaration of sqrt (telling the compiler "this function exists and takes a double"). But the actual compiled code for sqrt lives in a separate library file (libm.so or libm.a) that is not linked by default. The linker needs to find the actual implementation, and without -lm, it cannot. The error message "undefined reference to sqrt" is the linker\'s way of saying "I know this function was declared, but I cannot find its compiled code anywhere." The fix is simple: add -lm to your gcc command to tell the linker to search the math library.',
          consequence: 'The program compiles through stages 1-3 without any issue, but fails at stage 4 (linking) with an "undefined reference" error. This confuses beginners because the code looks syntactically perfect and includes the right header. The key insight is that #include provides declarations, but -l provides implementations.',
        },
        {
          id: 'u1-t3-s2-cm2',
          title: 'Not using -Wall during development',
          wrongCode: 'gcc program.c -o program',
          correctCode: 'gcc -std=c11 -Wall -Wextra -g program.c -o program',
          explanation:
            'Students often skip the -Wall flag because their code "compiles fine" without it. But "compiles" and "compiles correctly" are very different things. Without -Wall, GCC produces an executable even when it detects patterns that are almost certainly bugs: unused variables (you probably forgot to use them in a calculation), wrong format specifiers in printf (%d when the variable is a float), implicit function declarations (you forgot to #include the right header). These warnings are the compiler doing you a favor, and ignoring them is like ignoring a check engine light in your car — the car still runs, but something is wrong. Many bugs that cost students hours of debugging in exams would have been caught in seconds with -Wall enabled.',
          consequence: 'Subtle bugs silently pass through compilation and become runtime errors or produce wrong output. These bugs are especially painful during exams and vivas because you have limited time to debug, and the symptoms (wrong output, random crashes) give little clue about the root cause.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t3-s2-ic1',
          title: 'What are the 4 stages of C compilation?',
          content:
            'This is asked in nearly every systems programming interview and viva, so memorize the four stages and understand what each one does. The pipeline is: Preprocessing (text transformation: macro expansion, header inclusion, comment removal), Compilation (translation from C to assembly language for your specific CPU), Assembly (conversion from assembly mnemonics to binary machine code), and Linking (combining your compiled object file with library implementations to produce a runnable executable). A strong answer goes beyond just listing the stages — explain what kind of errors each stage can catch (preprocessor: missing headers, compiler: syntax/type errors, linker: missing function implementations) and what output each stage produces (.i, .s, .o, and the final executable).',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t3-s2-cp1',
          title: 'Master the GCC Command',
          description: 'Verify you can compile programs with proper flags.',
          criteria: [
            'Compile with gcc -std=c11 -Wall -Wextra -g -o prog prog.c',
            'Know what each flag does',
            'Try gcc -E to see preprocessed output',
            'Fix at least one warning revealed by -Wall',
          ],
          topicId: 'u1-t3',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t3-s2-rc1',
          front: 'What are the 4 stages of GCC compilation?',
          back: '1) Preprocessing (-E): expand #include/#define, remove comments. 2) Compilation (-S): C → assembly. 3) Assembly (-c): assembly → object code. 4) Linking: objects + libraries → executable.',
          topicId: 'u1-t3',
          tags: ['gcc', 'compilation'],
        },
        {
          id: 'u1-t3-s2-rc2',
          front: 'What does gcc -Wall do?',
          back: 'Enables all common compiler warnings. This catches unused variables, missing returns, format mismatches, and many other potential bugs at compile time.',
          topicId: 'u1-t3',
          tags: ['gcc', 'flags'],
        },
        {
          id: 'u1-t3-s2-rc3',
          front: 'What is the difference between a compile error and a runtime error?',
          back: 'Compile error: caught by the compiler before the program runs (syntax error, type mismatch). Runtime error: occurs while the program is executing (division by zero, segfault, infinite loop).',
          topicId: 'u1-t3',
          tags: ['errors', 'debugging'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u1-t3-q1',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'What is the output of gcc -E myfile.c?',
      options: ['An executable file', 'Assembly code', 'Preprocessed C source code', 'An object file'],
      correctAnswer: 'Preprocessed C source code',
      explanation: '-E stops after preprocessing. It expands #include and #define, removes comments, and outputs pure C code (usually a very large file).',
      tags: ['gcc', 'preprocessing'],
    },
    {
      id: 'u1-t3-q2',
      type: 'predict-output',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'What does this program print?',
      code: '#include <stdio.h>\n#define X 5\n#define Y (X + 3)\n\nint main(void) {\n    printf("%d\\n", Y * 2);\n    return 0;\n}',
      correctAnswer: '16',
      explanation: 'Y is (X + 3) = (5 + 3) = 8. Y * 2 = (5 + 3) * 2 = 8 * 2 = 16. The parentheses in #define Y (X + 3) are critical — without them, Y * 2 would be 5 + 3 * 2 = 5 + 6 = 11.',
      tags: ['define', 'macro', 'precedence'],
    },
    {
      id: 'u1-t3-q3',
      type: 'spot-bug',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'Find the bug:',
      code: '#include <stdio.h>\n\nvoid main() {\n    printf("Hello\\n");\n}',
      correctAnswer: 'main() should return int, not void. It should be int main(void) with return 0.',
      explanation: 'The C standard requires main() to return int. void main() is non-standard. Additionally, main should take void as parameter explicitly and include return 0.',
      tags: ['main', 'standard'],
    },
    {
      id: 'u1-t3-q4',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'Which GCC flag adds debug symbols for use with GDB?',
      options: ['-Wall', '-o', '-g', '-std=c11'],
      correctAnswer: '-g',
      explanation: '-g embeds debug information in the executable so GDB can show source code, variable names, and line numbers during debugging. -Wall enables warnings, -o sets output name, -std selects C standard.',
      tags: ['gcc', 'gdb', 'flags'],
    },
    {
      id: 'u1-t3-q5',
      type: 'true-false',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      question: 'The preprocessor directive #include needs a semicolon at the end.',
      correctAnswer: false,
      explanation: 'Preprocessor directives (#include, #define, #ifdef) are processed before compilation and are NOT C statements. They must NOT have semicolons.',
      tags: ['preprocessor', 'syntax'],
    },
    {
      id: 'u1-t3-q6',
      type: 'mcq',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      question: 'Without parentheses, what would #define SQUARE(x) x * x produce for SQUARE(3+1)?',
      options: ['16', '7', '10', 'Compilation error'],
      correctAnswer: '7',
      explanation: 'Without parentheses, SQUARE(3+1) expands to 3+1 * 3+1 = 3 + 3 + 1 = 7 (due to precedence: * before +). With #define SQUARE(x) ((x) * (x)), it correctly gives ((3+1) * (3+1)) = 16.',
      tags: ['define', 'macro', 'precedence'],
    },
  ],

  programmingProblems: [
    {
      id: 'u1-t3-new-easy',
      title: 'Armstrong Number Check',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      problemStatement: 'Read a 3-digit number. Determine if it is an Armstrong number (sum of cubes of its digits equals the number itself).',
      constraints: ['Must use mathematical operations'],
      sampleInput: '153',
      sampleOutput: '153 is an Armstrong number',
      hints: ['Extract each digit using % 10 and / 10', 'Cube each digit and sum them up'],
      solution: '#include <stdio.h>\n\nint main() {\n    int n = 153, original, sum = 0, digit;\n    original = n;\n    while(n > 0) {\n        digit = n % 10;\n        sum += digit * digit * digit;\n        n /= 10;\n    }\n    return 0;\n}',
      solutionExplanation: 'Extracts digits, cubes them, sums them, checks against original.',
      dryRun: [],
      tags: ['number-theory']
    },
    {
      id: 'u1-t3-new-med',
      title: 'Factorial Calculation',
      topicId: 'u1-t3',
      difficulty: 'intermediate',
      problemStatement: 'Calculate the factorial of a given number n without using recursion.',
      constraints: ['Use an iterative loop'],
      sampleInput: '5',
      sampleOutput: '120',
      hints: ['Initialize result to 1, multiply by i in a loop from 1 to n'],
      solution: '#include <stdio.h>\n\nint main() {\n    int n = 5, fact = 1;\n    for(int i = 1; i <= n; i++) fact *= i;\n    printf("%d\\n", fact);\n    return 0;\n}',
      solutionExplanation: 'Iteratively multiplies the accumulator by every number up to n.',
      dryRun: [],
      tags: ['math', 'loops']
    },
    {
      id: 'u1-t3-new-hard',
      title: 'Diamond Pattern',
      topicId: 'u1-t3',
      difficulty: 'advanced',
      problemStatement: 'Print a diamond pattern of stars for a given number of rows n.',
      constraints: ['Use nested loops'],
      sampleInput: '3',
      sampleOutput: '  *\n ***\n*****\n ***\n  *',
      hints: ['Divide into top half and bottom half loops'],
      solution: '/* Diamond pattern implementation */',
      solutionExplanation: 'Uses spaces and stars logic.',
      dryRun: [],
      tags: ['patterns']
    },
    {
      id: 'u1-t3-p1',
      title: 'Program with Multiple Functions',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      problemStatement: 'Write a program with a separate function printLine() that prints 20 dashes. Call it from main() before and after printing "PES University".',
      constraints: ['Must define a separate function called printLine', 'printLine should print exactly 20 dashes followed by a newline'],
      sampleInput: '',
      sampleOutput: '--------------------\nPES University\n--------------------',
      hints: ['Define printLine before main so the compiler knows about it', 'Use void return type since it just prints'],
      solution: '#include <stdio.h>\n\nvoid printLine(void) {\n    printf("--------------------\\n");\n}\n\nint main(void) {\n    printLine();\n    printf("PES University\\n");\n    printLine();\n    return 0;\n}',
      solutionExplanation: 'printLine is a reusable function — define once, call many times. This is the foundation of structured programming.',
      dryRun: [
        { step: 1, line: 8, variables: {}, output: '--------------------', explanation: 'First call to printLine() prints dashes.' },
        { step: 2, line: 9, variables: {}, output: 'PES University', explanation: 'printf in main prints the text.' },
        { step: 3, line: 10, variables: {}, output: '--------------------', explanation: 'Second call to printLine() prints dashes again.' },
      ],
      tags: ['functions', 'structure'],
    },
    {
      id: 'u1-t3-p2',
      title: 'Use #define Constants',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      problemStatement: 'Write a program that calculates the area and circumference of a circle. Define PI as 3.14159 using #define. Read radius from the user.',
      constraints: ['Must use #define PI 3.14159', 'Use float for radius and results', 'Print results with 2 decimal places'],
      sampleInput: '7',
      sampleOutput: 'Area = 153.94\nCircumference = 43.98',
      hints: ['Area = PI * r * r', 'Circumference = 2 * PI * r', 'Use %.2f to print 2 decimal places'],
      solution: '#include <stdio.h>\n#define PI 3.14159\n\nint main(void) {\n    float r, area, circ;\n    printf("Enter radius: ");\n    scanf("%f", &r);\n    area = PI * r * r;\n    circ = 2 * PI * r;\n    printf("Area = %.2f\\n", area);\n    printf("Circumference = %.2f\\n", circ);\n    return 0;\n}',
      solutionExplanation: '#define PI creates a named constant. The preprocessor replaces PI with 3.14159 everywhere before compilation. Using named constants instead of magic numbers is good practice.',
      dryRun: [
        { step: 1, line: 7, variables: { r: '7.0', area: '?', circ: '?' }, output: '', explanation: 'Read radius = 7.' },
        { step: 2, line: 8, variables: { r: '7.0', area: '153.94', circ: '?' }, output: '', explanation: 'area = 3.14159 * 7 * 7 = 153.94.' },
        { step: 3, line: 9, variables: { r: '7.0', area: '153.94', circ: '43.98' }, output: '', explanation: 'circ = 2 * 3.14159 * 7 = 43.98.' },
      ],
      tags: ['define', 'constants', 'math'],
    },
    {
      id: 'u1-t3-p3',
      title: 'Identify Compilation Stages',
      topicId: 'u1-t3',
      difficulty: 'beginner',
      problemStatement: 'Write a program that prints the 4 GCC compilation stages in order. Use #define to store each stage name as a macro.',
      constraints: ['Define 4 macros: STAGE1 through STAGE4', 'Print each on its own line with its number'],
      sampleInput: '',
      sampleOutput: '1. Preprocessing\n2. Compilation\n3. Assembly\n4. Linking',
      hints: ['Use #define STAGE1 "Preprocessing"', 'Use %s to print string macros in printf'],
      solution: '#include <stdio.h>\n#define STAGE1 "Preprocessing"\n#define STAGE2 "Compilation"\n#define STAGE3 "Assembly"\n#define STAGE4 "Linking"\n\nint main(void) {\n    printf("1. %s\\n", STAGE1);\n    printf("2. %s\\n", STAGE2);\n    printf("3. %s\\n", STAGE3);\n    printf("4. %s\\n", STAGE4);\n    return 0;\n}',
      solutionExplanation: 'Uses string macros for each stage name. The preprocessor replaces STAGE1 with "Preprocessing" etc. before compilation. Good practice with #define and reinforces the compilation pipeline.',
      dryRun: [
        { step: 1, line: 8, variables: {}, output: '1. Preprocessing', explanation: 'STAGE1 replaced with "Preprocessing" by preprocessor.' },
        { step: 2, line: 9, variables: {}, output: '2. Compilation', explanation: 'STAGE2 replaced with "Compilation".' },
        { step: 3, line: 10, variables: {}, output: '3. Assembly', explanation: 'STAGE3 replaced with "Assembly".' },
        { step: 4, line: 11, variables: {}, output: '4. Linking', explanation: 'STAGE4 replaced with "Linking".' },
      ],
      tags: ['define', 'compilation-pipeline'],
    },
  ],
};
