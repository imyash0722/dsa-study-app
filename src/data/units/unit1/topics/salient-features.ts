import type { Topic } from '../../../../types';

export const salientFeatures: Topic = {
  id: 'u1-t2',
  unitId: 'unit-1',
  title: 'Salient Features of C',
  slug: 'salient-features',
  description:
    `C was not designed in an academic vacuum — it was created in 1972 by Dennis Ritchie at Bell Labs to solve a specific, urgent engineering problem: how to write the UNIX operating system in a high-level language that could generate code efficient enough to run on the severely memory-constrained PDP-11 minicomputer, yet portable enough to be moved to entirely different hardware architectures with minimal rewriting. Every design decision in C — its minimalism, its trust in the programmer, its direct access to memory and hardware — reflects those origins and those constraints.

Understanding C's history explains why the language behaves the way it does, even when that behaviour seems strange or dangerous compared to modern languages. C prioritises runtime performance over safety (no bounds checking, no garbage collection), hardware proximity over abstraction (pointers, bitwise operations, direct memory access), and programmer control over convenience (manual memory management, explicit type declarations). These trade-offs are not accidents or oversights; they are deliberate design choices that make C uniquely suited for writing operating systems, device drivers, embedded firmware, and performance-critical applications.

After more than fifty years, C remains one of the most widely used programming languages in the world — not because of nostalgia, but because no other language occupies the same unique position: high-level enough to be readable and portable, yet low-level enough to replace assembly language for systems programming. The ANSI/ISO standardisation process (C89, C99, C11, C17, C23) has modernised the language incrementally while preserving backward compatibility with the vast body of existing C code that underpins the world's computing infrastructure.`,
  difficulty: 'beginner',
  prerequisites: ['u1-t1'],
  estimatedMinutes: 30,

  subtopics: [
    {
      id: 'u1-t2-s1',
      title: 'History and Origin of C',
      slug: 'history-of-c',
      description:
        `The history of C is inseparable from the history of the UNIX operating system, because C was invented specifically to solve a problem that UNIX created. In the late 1960s, Ken Thompson and Dennis Ritchie at Bell Labs (AT&T's research division) were building UNIX, initially writing it in PDP-7 assembly language. Assembly was fast but architecture-specific: every instruction was tied to the PDP-7's particular registers and opcodes, making the code impossible to move to a different machine without a complete rewrite. Thompson created a simplified language called B (derived from BCPL) to improve portability, but B was typeless — it treated all data as machine words — and lacked the ability to express structured data or generate efficient code for the more capable PDP-11 hardware.

In 1972, Ritchie extended B into C by adding a type system (int, char, float, struct), pointer arithmetic, and the ability to compile to efficient native machine code. The key innovation was that C occupied a unique position in the language landscape: it was high-level enough to express algorithms, data structures, and control flow in readable notation, yet low-level enough to directly manipulate memory addresses, hardware registers, and individual bits — operations that previously required assembly language. By 1973, the UNIX kernel had been rewritten almost entirely in C, proving that an operating system could be implemented in a high-level language without unacceptable performance penalties.

The language's influence spread rapidly through the 1970s and 1980s, propelled by the publication of "The C Programming Language" by Kernighan and Ritchie (1978), universally known as K&R. To address growing portability concerns as different compiler vendors extended the language in incompatible ways, ANSI standardised C in 1989 (C89/ANSI C), followed by ISO adoption in 1990 (C90). Subsequent standards — C99 (which added variable-length arrays, inline functions, and // comments), C11 (which added multi-threading primitives and generic selections), and C17/C23 (incremental refinements) — have modernised the language while preserving backward compatibility with the vast body of existing C code that powers the world's infrastructure.`,
      keyPoints: [
        'C was created by Dennis Ritchie at Bell Labs (AT&T) in 1972. It was not an academic exercise or a research project — it was a practical tool designed to solve a specific engineering problem: how to write an operating system in a high-level language that could run efficiently on the limited hardware of the 1970s.',
        'C evolved from a lineage of languages: BCPL (Martin Richards, 1967) inspired B (Ken Thompson, 1970), which Ritchie extended into C. The name "C" is simply the next letter after "B." Each step in this evolution added more structure and capability while maintaining the ability to generate fast, compact machine code.',
        'The primary motivation for creating C was to rewrite UNIX. The first version of UNIX was written in PDP-7 assembly language, making it fast but completely tied to one specific machine. By rewriting UNIX in C, the entire operating system became portable — moving it to a new machine required only rewriting the C compiler for that machine, not the entire operating system. This was revolutionary.',
        'In 1978, Brian Kernighan and Dennis Ritchie published "The C Programming Language" (universally known as "K&R"), which became the de-facto specification of the language and one of the most influential computer science books ever written. For years, if a C feature was in K&R, it was standard; if it was not, it was an extension.',
        'C has been formally standardized multiple times, each adding features while maintaining backward compatibility. C89/C90 (the first ANSI/ISO standard) codified the language. C99 added significant features like // comments, variable declarations anywhere in a block, loop variables inside for(), and long long int. C11 added threading support and generic selections. C17 was primarily a bug-fix release. Your course uses C11, compiled with gcc -std=c11.',
      ],
      codeExamples: [
        {
          id: 'u1-t2-s1-ex1',
          title: 'Classic K&R Style Hello World',
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program has barely changed since Kernighan and Ritchie published it in 1978 — a testament to C\'s remarkable stability over more than 45 years. The only significant difference is that modern C writes int main(void) instead of the original main(), explicitly stating the return type and parameter list. This stability is intentional: C\'s designers valued backward compatibility, ensuring that programs written decades ago still compile and run today. Very few other programming languages can make this claim.',
          expectedOutput: 'Hello, World!',
          lineBreakdown: [
            { lineNumber: 1, code: '#include <stdio.h>', explanation: 'Standard I/O header — same since 1978.' },
            { lineNumber: 3, code: 'int main(void)', explanation: 'Modern C uses int main(void). Old K&R used main() without void.' },
            { lineNumber: 4, code: '    printf("Hello, World!\\n");', explanation: 'The most famous line in programming history.' },
          ],
          relatedTopicIds: ['u1-t1'],
        },
        {
          id: 'u1-t2-s1-ex2',
          title: 'C99 Feature — Declare Variables Anywhere',
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("Enter a number: ");\n    int n;  /* C99: declaration after statement */\n    scanf("%d", &n);\n    for (int i = 0; i < n; i++) {  /* C99: loop variable in for */\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'This example highlights two of the most impactful features that C99 added over the original C89 standard. In C89, you had to declare all variables at the beginning of a block, before any executable statements — a leftover constraint from simpler compiler architectures. C99 relaxed this, allowing you to declare variables at the point where they are first needed, which makes code more readable and reduces the window where a variable exists without a meaningful value. Similarly, declaring a loop counter inside the for statement (for (int i = 0; ...)) both limits the variable\'s scope to the loop body and makes the code\'s intent clearer.',
          expectedOutput: 'Enter a number: 0 1 2 3 4',
          lineBreakdown: [
            { lineNumber: 5, code: '    int n;', explanation: 'In C89 this would be illegal here — it had to be before printf. C99 relaxed this.' },
            { lineNumber: 7, code: '    for (int i = 0; ...)', explanation: 'C99 allows declaring i inside the for statement. i only exists within the loop.' },
          ],
          relatedTopicIds: ['u1-t8'],
        },
        {
          id: 'u1-t2-s1-ex3',
          title: 'C89 vs C99 — Comment Styles',
          code: '#include <stdio.h>\n\nint main(void) {\n    /* This is a C89 comment - works in all versions */\n    // This is a C99 comment - only works in C99 and later\n    printf("Both comment styles work with -std=c11\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'This small example reveals a real historical evolution in the C language. The original C (C89) only supported block comments delimited by /* and */, which could span multiple lines but were awkward for quick annotations. C99 borrowed the // single-line comment syntax from C++, which quickly became the preferred style for brief comments because it is faster to type and cannot accidentally extend across multiple lines. Since your course uses -std=c11, both styles are available and you should use whichever is more appropriate: // for quick inline notes and /* */ for longer explanations.',
          expectedOutput: 'Both comment styles work with -std=c11',
          lineBreakdown: [
            { lineNumber: 4, code: '    /* ... */', explanation: 'Block comment — original C style. Can span multiple lines.' },
            { lineNumber: 5, code: '    // ...', explanation: 'Line comment — added in C99. Everything after // until end of line is ignored.' },
          ],
          relatedTopicIds: ['u1-t12'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s1-cm1',
          title: 'Using C99 features with C89 flag',
          wrongCode: '// Compiled with: gcc -std=c89 file.c\nfor (int i = 0; i < 5; i++) { }',
          correctCode: '// Compiled with: gcc -std=c11 file.c\nfor (int i = 0; i < 5; i++) { }',
          explanation:
            'This mistake exposes the tension between C\'s evolution and backward compatibility. Features like declaring variables inside for loops and using // comments were introduced in C99, but if you compile with -std=c89, the compiler enforces the older rules and rejects these modern features. The error messages can be confusing because the code looks perfectly reasonable to anyone who has learned from modern textbooks. This is why your course standardizes on -std=c11: it gives you access to all modern features while maintaining full compatibility with older code patterns. Always check your compilation flags if you get unexpected errors on code that "should work."',
          consequence: 'The compiler rejects code that works perfectly under C99 or C11. The error messages often reference specific standard versions, which can be confusing if you do not understand what compiler standards are.',
        },
        {
          id: 'u1-t2-s1-cm2',
          title: 'Thinking C and C++ are the same language',
          wrongCode: '// Using C++ features in a .c file\n#include <iostream>\nusing namespace std;',
          correctCode: '// Correct C code\n#include <stdio.h>\nprintf("Hello\\n");',
          explanation:
            'Students who have heard of C++ often assume it is just "a newer version of C" and try to use C++ features in their C programs. While C++ was originally derived from C (Bjarne Stroustrup created C++ by adding object-oriented features to C in the early 1980s), the two languages have diverged significantly over the decades. C++ has classes, templates, exceptions, namespaces, references, and many other features that simply do not exist in C. A .c file is compiled as C, which means #include <iostream>, cout, and using namespace std are completely meaningless to the C compiler. For this course, you write pure C — no C++ features.',
          consequence: 'The C compiler produces errors about unknown headers and undefined identifiers. The error messages can be confusing because they reference symbols (iostream, cout, std) that the C compiler has never heard of.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s1-ic1',
          title: 'Why is C called a "middle-level" language?',
          content:
            'This is one of the most frequently asked questions in first-year vivas, and a strong answer demonstrates that you understand C\'s unique position in the language spectrum. A "high-level" language (like Python or Java) provides abstractions that hide the hardware: you do not think about memory addresses, register allocation, or byte-level data layout. A "low-level" language (like Assembly) maps almost directly to machine instructions: every line corresponds to a specific CPU operation. C sits in the middle — it provides high-level constructs like functions, loops, structs, and type checking, but it also allows you to manipulate individual bits, access raw memory addresses through pointers, and write code that compiles to nearly optimal machine code. This dual nature is why C is the language of choice for operating systems, embedded systems, device drivers, and any software that must interact directly with hardware.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t2-s1-cp1',
          title: 'C Standards Knowledge Check',
          description: 'Verify you understand which C standard you are using and why.',
          criteria: [
            'Know that we compile with -std=c11 in this course',
            'Understand the difference between C89 and C99 variable declarations',
            'Know that // comments require C99 or later',
            'Understand why C is compiled, not interpreted',
          ],
          topicId: 'u1-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t2-s1-rc1',
          front: 'Who created C, when, and where?',
          back: 'Dennis Ritchie, in 1972, at Bell Labs (AT&T). C was created to rewrite the UNIX operating system.',
          topicId: 'u1-t2',
          tags: ['history', 'facts'],
        },
        {
          id: 'u1-t2-s1-rc2',
          front: 'What is the difference between a compiled and interpreted language?',
          back: 'Compiled: entire source code is translated to machine code BEFORE execution (C, C++). Interpreted: code is translated and executed line by line at runtime (Python, JavaScript). Compiled programs run faster.',
          topicId: 'u1-t2',
          tags: ['compiled', 'interpreted'],
        },
        {
          id: 'u1-t2-s1-rc3',
          front: 'What major feature did C99 add over C89?',
          back: 'C99 added: // single-line comments, variable declarations anywhere in a block, loop variable declarations in for(), variable-length arrays (VLAs), and the long long int type.',
          topicId: 'u1-t2',
          tags: ['standards', 'c99'],
        },
      ],
    },
    {
      id: 'u1-t2-s2',
      title: 'Key Characteristics of C',
      slug: 'characteristics-of-c',
      description:
        `C's design reflects a coherent set of engineering trade-offs that prioritise runtime performance, hardware proximity, and predictable behaviour over developer convenience, runtime safety, and automatic resource management. Understanding these trade-offs explains both why C remains indispensable for systems programming and why higher-level languages exist to address its deliberate omissions.

C is a structured language: it organises code into functions, each encapsulating a single responsibility, and supports block-scoped local variables that prevent unrelated parts of a program from interfering with each other's data. C is statically typed: every variable's type is declared at compile time and cannot change, enabling the compiler to generate optimised machine code and to catch type-mismatch errors before the program runs. C is portable: because C compilers exist for virtually every CPU architecture ever manufactured \u2014 from 8-bit microcontrollers to 64-bit server processors \u2014 a well-written C program can be recompiled for a new platform with minimal or no source code changes, a property that was revolutionary in the 1970s when most code was written in non-portable assembly.

C is fast: it compiles directly to native machine code with no interpreter, virtual machine, or garbage collector adding runtime overhead, making it the language of choice for performance-critical software (operating systems, databases, game engines, real-time embedded systems). C is close to the hardware: it provides direct access to memory through pointers, supports bitwise operations on individual bits, and allows type-unsafe casts that reinterpret raw memory \u2014 capabilities that are essential for writing device drivers, kernel code, and firmware but that other languages deliberately prohibit. Finally, C is deliberately small: with fewer than 40 reserved keywords (compared to hundreds in C++ or Java), the entire language specification fits in a manageable document, making C one of the few languages that a single programmer can know completely.`,
      keyPoints: [
        'C is a structured language: it encourages you to break your program into small, reusable functions, each responsible for one specific task. This is in contrast to older languages like FORTRAN and BASIC, where programs were organized as a flat sequence of numbered lines with GOTO jumps. Structured programming makes code easier to read, test, debug, and maintain, and it is the foundation for all modern software engineering practices.',
        'C is statically typed: every variable must have its type declared at compile time, and that type can never change. When you write int x, the compiler knows x will always be a 4-byte integer and can generate optimal machine code for operations on it. This is different from dynamically typed languages like Python, where a variable can hold a string one moment and a list the next. Static typing catches certain bugs (like trying to subtract a string from an integer) at compile time rather than at runtime.',
        'C is portable: a well-written C program can be compiled and run on almost any hardware platform — from tiny 8-bit microcontrollers to massive 64-bit servers. This portability comes from the fact that C compilers exist for virtually every CPU architecture ever made. You write your code once, and the compiler handles the translation to each specific machine\'s instruction set.',
        'C is fast: because C compiles directly to native machine code (the actual binary instructions your CPU executes), there is no interpreter or virtual machine adding overhead at runtime. A C program runs at nearly the theoretical maximum speed of the hardware. This is why performance-critical software — operating systems, databases, game engines, real-time systems — is overwhelmingly written in C.',
        'C is close to the hardware: through pointers, you can read and write individual memory addresses. Through bitwise operators, you can manipulate individual bits within a byte. Through casting, you can reinterpret the same block of memory as different data types. This level of control is essential for writing device drivers, network protocols, and embedded firmware, where you must communicate directly with hardware registers.',
        'C has a deliberately small core language: C89 has only 32 reserved keywords, compared to Python\'s 35, Java\'s 50+, and C++\'s 90+. This minimalism is intentional — a smaller language is easier to learn, easier to implement (you can write a C compiler relatively quickly), and easier to port to new hardware. The rich functionality comes from the standard library (stdio.h, stdlib.h, string.h, math.h, etc.) rather than from language keywords.',
      ],
      codeExamples: [
        {
          id: 'u1-t2-s2-ex1',
          title: 'Static Typing in Action',
          code: '#include <stdio.h>\n\nint main(void) {\n    int age = 19;\n    float gpa = 8.5f;\n    char grade = \'A\';\n    printf("Age: %d, GPA: %.1f, Grade: %c\\n", age, gpa, grade);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program demonstrates the concept of static typing: you must tell the compiler the exact type of every variable when you declare it, and that type is permanent. The variable age will always be an int, gpa will always be a float, and grade will always be a char. The compiler uses this type information to determine how much memory each variable needs, how to interpret the bits stored there, and which operations are legal. Attempting to store the wrong type of data in a variable (like putting a string into an int) triggers a compiler error — a safety net that dynamically typed languages like Python do not provide.',
          expectedOutput: 'Age: 19, GPA: 8.5, Grade: A',
          lineBreakdown: [
            { lineNumber: 4, code: '    int age = 19;', explanation: 'Declares age as integer. It can only hold whole numbers.' },
            { lineNumber: 5, code: '    float gpa = 8.5f;', explanation: 'Declares gpa as float. The f suffix makes 8.5 a float literal.' },
            { lineNumber: 6, code: "    char grade = 'A';", explanation: 'Declares grade as char. Single quotes for character literals.' },
            { lineNumber: 7, code: '    printf("...", age, gpa, grade);', explanation: '%d for int, %.1f for float (1 decimal), %c for char.' },
          ],
          relatedTopicIds: ['u1-t4', 'u1-t5'],
        },
        {
          id: 'u1-t2-s2-ex2',
          title: 'Portability — Same Code, Any Platform',
          code: '#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    printf("This platform details:\\n");\n    printf("  int size: %zu bytes\\n", sizeof(int));\n    printf("  int max:  %d\\n", INT_MAX);\n    printf("  char size: %zu byte\\n", sizeof(char));\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program runs identically on Windows, Linux, and macOS — that is portability. The same C source code compiles on each platform because each platform has its own C compiler that translates the universal C syntax into platform-specific machine code. However, notice that the output values might differ between platforms: int might be 4 bytes on your 64-bit laptop but only 2 bytes on a 16-bit embedded processor. The code adapts automatically because sizeof and the limits.h constants reflect the specific platform\'s characteristics. This is the beauty of portable C: you write the code once, and it works everywhere, even if the underlying hardware differs.',
          expectedOutput: 'This platform details:\n  int size: 4 bytes\n  int max:  2147483647\n  char size: 1 byte',
          lineBreakdown: [
            { lineNumber: 2, code: '#include <limits.h>', explanation: 'Provides INT_MAX, INT_MIN, CHAR_MAX etc. — platform-specific values.' },
            { lineNumber: 6, code: '    sizeof(int)', explanation: 'sizeof returns the size of a type in bytes. %zu is the format specifier for size_t.' },
          ],
          relatedTopicIds: ['u1-t5'],
        },
        {
          id: 'u1-t2-s2-ex3',
          title: 'C Has Only 32 Keywords (C89)',
          code: '#include <stdio.h>\n\nint main(void) {\n    /* Some C keywords: int, float, char, if, else, for,\n       while, do, switch, case, break, continue, return,\n       struct, union, enum, typedef, sizeof, void,\n       static, extern, register, auto, const, volatile,\n       signed, unsigned, short, long, default, goto */\n    printf("C89 has only 32 keywords!\\n");\n    printf("Python has 35, Java has 50+\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'C\'s deliberate minimalism is a design philosophy, not a limitation. With only 32 keywords, the entire language syntax fits on a single sheet of paper. Compare this to C++ (over 90 keywords) or Java (50+), and you see why C is considered one of the easiest languages to learn in terms of syntax (though mastering its subtleties is another matter entirely). This smallness also means C compilers can be implemented quickly for new hardware, which is why C is typically the first high-level language available on any new processor architecture.',
          expectedOutput: 'C89 has only 32 keywords!\nPython has 35, Java has 50+',
          lineBreakdown: [
            { lineNumber: 4, code: '    /* ... */', explanation: 'Block comment listing the 32 keywords of C89. You will learn each one in this course.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t2-s2-cm1',
          title: 'Assuming C is dynamically typed like Python',
          wrongCode: 'int x = 10;\nx = "hello";  /* type mismatch */',
          correctCode: 'int x = 10;\nx = 20;  /* same type — OK */\nchar *s = "hello";  /* separate variable for strings */',
          explanation:
            'This mistake reveals the fundamental difference between statically typed and dynamically typed languages. In Python, you can write x = 10 followed by x = "hello" and Python happily changes x\'s type from integer to string at runtime. C forbids this: once you declare int x, the compiler allocates exactly 4 bytes of memory for an integer and generates code that treats those bytes as an integer for every operation. Assigning a string literal (which is actually a memory address) to an int variable is a type mismatch that the compiler catches. This strictness is a safety feature — it prevents an entire category of bugs that dynamically typed languages can only catch at runtime.',
          consequence: 'The compiler produces an error or warning about incompatible types (pointer to integer conversion without a cast). In some compilers, this may compile with just a warning but produce completely nonsensical behavior at runtime.',
        },
        {
          id: 'u1-t2-s2-cm2',
          title: 'Using single quotes for strings',
          wrongCode: "printf('Hello');",
          correctCode: 'printf("Hello");',
          explanation:
            "This is a syntax distinction that catches every student coming from Python, where single quotes and double quotes are interchangeable for strings. In C, single quotes and double quotes serve completely different purposes: single quotes delimit a single character literal ('A', '\\n', '0'), which is actually an integer value (the ASCII code of that character). Double quotes delimit a string literal (\"Hello\"), which is a null-terminated array of characters stored in memory. Using single quotes for a multi-character sequence like 'Hello' is not a string — it is a multi-character constant with implementation-defined behavior, and it almost certainly does not do what you intended.",
          consequence: 'Using single quotes for a string argument to printf produces a compilation warning about a multi-character character constant. The behavior is implementation-defined and almost never what you wanted. Always use double quotes for strings in C.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t2-s2-ic1',
          title: 'Why is C still relevant today?',
          content:
            'This is one of the most important questions to answer well in a first-year viva because it tests whether you understand the software industry beyond textbooks. C remains relevant not because of nostalgia but because of irreplaceable technical advantages. The Linux kernel (which runs most of the internet\'s servers, all Android phones, and nearly every supercomputer) is written in C. The Windows and macOS kernels have significant C components. The databases you use (PostgreSQL, MySQL, SQLite), the programming languages you learn (CPython, the standard Ruby and PHP interpreters), the tools you rely on (Git, curl, nginx, OpenSSL), and the embedded systems in your car, refrigerator, and phone are all written in C. No other language offers C\'s combination of performance, portability, and direct hardware access. For a strong answer, cite specific examples and explain why those projects chose C (usually: speed, low memory usage, or hardware access).',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t2-s2-cp1',
          title: 'Understand C Characteristics',
          description: 'Verify you understand what makes C different from other languages.',
          criteria: [
            'Explain why C is called "middle-level"',
            'Give one example of how C is close to hardware',
            'Explain static typing in your own words',
            'Name two real-world software written in C',
          ],
          topicId: 'u1-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t2-s2-rc1',
          front: 'Why is C called a middle-level language?',
          back: 'It combines high-level features (functions, loops) with low-level capabilities (pointers, bit manipulation, direct memory access).',
          topicId: 'u1-t2',
          tags: ['characteristics', 'middle-level'],
        },
        {
          id: 'u1-t2-s2-rc2',
          front: 'What does "statically typed" mean?',
          back: 'Every variable must have its type declared at compile time, and the type cannot change. int x = 10; means x is always an integer.',
          topicId: 'u1-t2',
          tags: ['characteristics', 'typing'],
        },
        {
          id: 'u1-t2-s2-rc3',
          front: 'How many keywords does C89 have?',
          back: '32 keywords. C99 added 5 more (inline, restrict, _Bool, _Complex, _Imaginary). C11 added 7 more (_Alignas, _Atomic, etc.).',
          topicId: 'u1-t2',
          tags: ['keywords', 'standards'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u1-t2-q1',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'Who created the C programming language?',
      options: ['Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling', 'Guido van Rossum'],
      correctAnswer: 'Dennis Ritchie',
      explanation:
        'Dennis Ritchie created C in 1972 at Bell Labs. Bjarne Stroustrup created C++. James Gosling created Java. Guido van Rossum created Python.',
      tags: ['history'],
    },
    {
      id: 'u1-t2-q2',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'Which C standard first allowed // single-line comments?',
      options: ['C89', 'C99', 'C11', 'C17'],
      correctAnswer: 'C99',
      explanation:
        'C89 only had /* */ block comments. C99 added // single-line comments, borrowing the syntax from C++.',
      tags: ['standards', 'comments'],
    },
    {
      id: 'u1-t2-q3',
      type: 'true-false',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'C is an interpreted language — it executes code line by line without compiling first.',
      correctAnswer: false,
      explanation:
        'C is a compiled language. The source code is fully translated to machine code by the compiler (GCC) before execution. Python and JavaScript are interpreted.',
      tags: ['compiled', 'interpreted'],
    },
    {
      id: 'u1-t2-q4',
      type: 'predict-output',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'What does this program print?',
      code: '#include <stdio.h>\nint main(void) {\n    printf("%zu\\n", sizeof(char));\n    return 0;\n}',
      correctAnswer: '1',
      explanation:
        'sizeof(char) is ALWAYS 1 byte on every platform — this is guaranteed by the C standard. It is the only type with a guaranteed size.',
      tags: ['sizeof', 'char'],
    },
    {
      id: 'u1-t2-q5',
      type: 'spot-bug',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'What is wrong with this code?',
      code: '#include <stdio.h>\nint main(void) {\n    int x = 10;\n    x = "twenty";\n    printf("%d\\n", x);\n    return 0;\n}',
      correctAnswer: 'Type mismatch: assigning a string literal to an int variable on line 4.',
      explanation:
        'C is statically typed. x was declared as int so it can only hold integers. Assigning "twenty" (a string/char pointer) to an int is a type error. The compiler will warn about incompatible pointer-to-integer conversion.',
      tags: ['static-typing', 'type-mismatch'],
    },
  ],

  programmingProblems: [
    {
      id: 'u1-t2-new-easy',
      title: 'Armstrong Number Check',
      topicId: 'u1-t2',
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
      id: 'u1-t2-new-med',
      title: 'Factorial Calculation',
      topicId: 'u1-t2',
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
      id: 'u1-t2-new-hard',
      title: 'Diamond Pattern',
      topicId: 'u1-t2',
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
      id: 'u1-t2-p1',
      title: 'Print Platform Details',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that prints the size (in bytes) of int, float, double, and char on your system using the sizeof operator.',
      constraints: ['Use sizeof for each type', 'Use %zu as the format specifier for sizeof results'],
      sampleInput: '',
      sampleOutput: 'int: 4 bytes\nfloat: 4 bytes\ndouble: 8 bytes\nchar: 1 bytes',
      hints: ['sizeof(int) gives size in bytes', 'Use %zu for size_t type returned by sizeof'],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    printf("int: %zu bytes\\n", sizeof(int));\n    printf("float: %zu bytes\\n", sizeof(float));\n    printf("double: %zu bytes\\n", sizeof(double));\n    printf("char: %zu bytes\\n", sizeof(char));\n    return 0;\n}',
      solutionExplanation:
        'sizeof is a compile-time operator that returns the size of a type in bytes. char is always 1, but int, float, and double may vary by platform.',
      dryRun: [
        { step: 1, line: 4, variables: {}, output: 'int: 4 bytes', explanation: 'sizeof(int) returns 4 on most modern systems.' },
        { step: 2, line: 5, variables: {}, output: 'float: 4 bytes', explanation: 'sizeof(float) is typically 4 bytes.' },
        { step: 3, line: 6, variables: {}, output: 'double: 8 bytes', explanation: 'sizeof(double) is typically 8 bytes.' },
        { step: 4, line: 7, variables: {}, output: 'char: 1 bytes', explanation: 'sizeof(char) is always 1 — guaranteed by the standard.' },
      ],
      tags: ['sizeof', 'types'],
    },
    {
      id: 'u1-t2-p2',
      title: 'Multi-line Formatted Output',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that prints a formatted "student ID card" with name, USN, branch, and semester on separate lines, enclosed in a border made of dashes.',
      constraints: ['Use printf with escape sequences', 'Include at least 4 fields'],
      sampleInput: '',
      sampleOutput: '--------------------\n Name:   Rahul\n USN:    PES1UG22CS001\n Branch: CSE\n Sem:    1\n--------------------',
      hints: ['Use \\n to go to new line', 'Use \\t for tab alignment', 'Print a row of dashes for the border'],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    printf("--------------------\\n");\n    printf(" Name:   Rahul\\n");\n    printf(" USN:    PES1UG22CS001\\n");\n    printf(" Branch: CSE\\n");\n    printf(" Sem:    1\\n");\n    printf("--------------------\\n");\n    return 0;\n}',
      solutionExplanation:
        'Pure printf practice. Each line is a separate printf call with \\n. The dashes create a visual border. This reinforces string output and escape sequences.',
      dryRun: [
        { step: 1, line: 4, variables: {}, output: '--------------------', explanation: 'Print top border.' },
        { step: 2, line: 5, variables: {}, output: ' Name:   Rahul', explanation: 'Print name field.' },
        { step: 3, line: 9, variables: {}, output: '--------------------', explanation: 'Print bottom border.' },
      ],
      tags: ['printf', 'formatting'],
    },
    {
      id: 'u1-t2-p3',
      title: 'Variable Type Checker',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      problemStatement:
        'Declare one variable of each basic type (int, float, double, char), assign values, and print each with its correct format specifier and sizeof.',
      constraints: ['Must use int, float, double, and char', 'Print value and size for each'],
      sampleInput: '',
      sampleOutput: 'int:    42     (4 bytes)\nfloat:  3.14   (4 bytes)\ndouble: 2.718  (8 bytes)\nchar:   A      (1 bytes)',
      hints: ['%d for int, %f for float, %lf for double, %c for char', 'Use sizeof() for sizes'],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    int i = 42;\n    float f = 3.14f;\n    double d = 2.718;\n    char c = \'A\';\n    printf("int:    %-6d (%zu bytes)\\n", i, sizeof(i));\n    printf("float:  %-6.2f (%zu bytes)\\n", f, sizeof(f));\n    printf("double: %-6.3f (%zu bytes)\\n", d, sizeof(d));\n    printf("char:   %-6c (%zu bytes)\\n", c, sizeof(c));\n    return 0;\n}',
      solutionExplanation:
        'Demonstrates all four basic types with correct format specifiers. %-6d means left-aligned in a 6-character-wide field. The f suffix on 3.14f makes it a float literal instead of double.',
      dryRun: [
        { step: 1, line: 4, variables: { i: '42', f: '?', d: '?', c: '?' }, output: '', explanation: 'Declare int i = 42.' },
        { step: 2, line: 5, variables: { i: '42', f: '3.14', d: '?', c: '?' }, output: '', explanation: 'Declare float f = 3.14.' },
        { step: 3, line: 8, variables: { i: '42', f: '3.14', d: '2.718', c: 'A' }, output: 'int:    42     (4 bytes)', explanation: 'Print i with sizeof.' },
      ],
      tags: ['types', 'sizeof', 'format-specifiers'],
    },
  ],
};
