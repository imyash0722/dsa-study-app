import type { Topic } from '../../../../types';

export const storageClasses: Topic = {
  id: 'u2-t8',
  unitId: 'unit-2',
  title: 'Storage Classes',
  slug: 'storage-classes',
  description: `Every variable in a C program possesses four properties determined at the point of declaration: its storage duration (how long the variable exists in memory), its scope (which regions of code can refer to it by name), its linkage (whether it can be accessed from other translation units), and its initial value (what it contains before explicit assignment). Storage class specifiers — auto, register, static, and extern — are the language mechanisms through which the programmer controls these properties, overriding the defaults established by the variable's position in the source code.

Understanding storage classes requires understanding the memory layout of a running C process. Local variables (auto, the default) live on the stack: they are created when their enclosing block is entered and destroyed when it is exited, with no guarantee about their initial value (they contain whatever garbage was left in that stack memory by previous function calls). The static keyword, applied to a local variable, moves its storage from the stack to the data segment (if initialised) or BSS segment (if uninitialised/zero-initialised), extending its lifetime to the entire program while keeping its name private to the enclosing function — enabling persistent state across function calls. The register keyword is a hint (largely ignored by modern optimising compilers) requesting that a variable be stored in a CPU register for faster access. The extern keyword declares that a variable is defined in a different source file, enabling cross-file data sharing.

At file scope, static and extern serve a different purpose: static restricts a global variable or function to internal linkage (visible only within its source file), while extern extends it to external linkage (accessible from other files). This combination forms C's rudimentary but effective module system — static for private implementation details, extern for the public interface.`,
  difficulty: 'intermediate',
  prerequisites: ['u2-t6'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u2-t8-s1',
      title: 'Local Storage: auto, register, and static',
      slug: 'local-storage',
      description: `Every variable in C has three properties that are determined at the moment of its declaration: its storage duration (how long the variable exists in memory), its scope (which regions of code can refer to the variable by name), and its initial value (what it contains before you assign anything to it). Storage class specifiers — auto, register, and static — allow you to override the defaults for local variables, and understanding them requires understanding the memory regions where variables can live.

The auto storage class is the default for every local variable declared inside a function or block, and the keyword itself is almost never written explicitly in modern C (C++ has repurposed auto for type inference, making its explicit use in C-style code potentially confusing). An auto variable is allocated on the stack when execution enters the block where it is declared, and it is destroyed when execution leaves that block. Its memory is not cleared upon allocation; it starts with whatever binary pattern happened to be in that stack location from a previous function call, which is why uninitialized local variables contain "garbage." Every time the function is called, the variable is freshly created with no memory of any previous call.

The static keyword, when applied to a local variable, fundamentally alters two of the three properties. It moves the variable's storage from the stack to the data segment (or BSS segment if uninitialized), giving it a lifetime that spans the entire program execution rather than a single function call. The initialization of a static local variable happens exactly once, before the program begins executing main(), and the variable retains its value between successive calls to the function. Crucially, the variable's scope remains unchanged — it is still visible only within the function where it is declared. This combination of persistent lifetime with restricted visibility makes static locals the ideal mechanism for function-private state: call counters, cached computations, one-time initialization flags, and unique ID generators. The register keyword, by contrast, is a relic from early C compilers that were not sophisticated enough to decide which variables should live in CPU registers. Writing register int i hints to the compiler that i should be stored in a fast CPU register rather than in RAM. Modern compilers with optimization enabled (gcc -O2 and above) are dramatically better at register allocation than human programmers and routinely ignore the hint. The keyword's only enforced semantic effect in modern C is that you cannot take the address of a register variable with the & operator, because CPU registers do not have memory addresses.`,
      keyPoints: [
        'The auto storage class is the default for all local variables — you almost never write the keyword explicitly. An auto variable is created on the stack when execution enters the block where it is declared and destroyed when execution leaves that block. Its initial value is whatever garbage happens to be in that stack memory. Every time the function is called, a fresh copy of the variable is created, with no memory of previous calls.',
        'The register keyword is a hint to the compiler suggesting that a heavily-used variable (like a loop counter) should be stored in a fast CPU register instead of in RAM. However, this hint is largely obsolete in modern C: optimizing compilers like GCC are far better at choosing which variables to put in registers than human programmers are. The one hard rule is that you cannot take the address (&) of a register variable, because CPU registers do not have memory addresses.',
        'The static keyword applied to a local variable is the most practically important storage class modifier. It changes the variable\'s storage location from the stack to the data segment (a region of memory that persists for the entire program), and guarantees initialization to zero if you do not provide an explicit initializer. Crucially, the initialization happens only once, before the program starts — not each time the function is called. The variable retains its value between function calls, effectively giving the function "memory."',
        'The scope of a static local variable remains unchanged: it is still visible only within the function where it is declared. The static keyword changes the lifetime (from "until the function returns" to "forever"), but it does not change the visibility. This combination — persistent lifetime, restricted visibility — makes static locals ideal for function-level state like call counters, cached computations, or unique ID generators.',
      ],
      codeExamples: [
        {
          id: 'u2-t8-s1-ex1',
          title: 'Static Local Variable (Counter)',
          code: '#include <stdio.h>\n\nvoid callMe() {\n    int auto_var = 0;\n    static int static_var = 0; /* Initializes ONLY ONCE */\n    \n    auto_var++;\n    static_var++;\n    \n    printf("Auto: %d, Static: %d\\n", auto_var, static_var);\n}\n\nint main(void) {\n    callMe();\n    callMe();\n    callMe();\n    return 0;\n}',
          language: 'c',
          explanation: 'This is the most important demonstration in this topic. Watch what happens over three calls: auto_var is recreated from scratch (on the stack) every time callMe is invoked. Its "int auto_var = 0" line executes every call, so it always starts at 0, gets incremented to 1, and then is destroyed when the function returns. static_var, by contrast, lives in the data segment and is initialized to 0 only once before the program starts. The line "static int static_var = 0" is not an assignment that executes each call — it is a one-time initialization directive. On the first call, static_var starts at 0 and becomes 1. On the second call, it still holds 1 (from the previous call) and becomes 2. On the third call, it holds 2 and becomes 3. The variable accumulates state across calls.',
          expectedOutput: 'Auto: 1, Static: 1\nAuto: 1, Static: 2\nAuto: 1, Static: 3',
          lineBreakdown: [
            { lineNumber: 4, code: '    int auto_var = 0;', explanation: 'Destroyed at the end of the function, recreated on the next call.' },
            { lineNumber: 5, code: '    static int static_var = 0;', explanation: 'Initialization happens only once before the program starts. Value persists.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u2-t8-s1-ex2',
          title: 'The register keyword',
          code: '#include <stdio.h>\n\nint main(void) {\n    /* Hinting to the compiler to put this in a CPU register */\n    register int i;\n    int sum = 0;\n    \n    for (i = 0; i < 1000000; i++) {\n        sum += i;\n    }\n    \n    /* printf("%p", &i);  ERROR: Registers do not have memory addresses! */\n    printf("Sum calculated.\\n");\n    return 0;\n}',
          language: 'c',
          explanation: 'The register keyword is a relic from an era when compilers were not sophisticated enough to decide which variables should live in CPU registers. By writing register int i, you are suggesting to the compiler that i will be accessed very frequently and should be kept in a register if possible. However, modern optimizing compilers (GCC with -O2 or higher) are dramatically better at register allocation than humans, and they routinely ignore the register hint. The keyword\'s only real effect in modern C is to forbid taking the address of the variable with &, which prevents certain patterns like passing it to scanf.',
          expectedOutput: 'Sum calculated.',
          lineBreakdown: [
            { lineNumber: 5, code: '    register int i;', explanation: 'Requests CPU register storage. Access is much faster than RAM.' },
            { lineNumber: 12, code: '    /* printf("%p", &i); */', explanation: 'Crucial rule: You cannot use the address-of operator (&) on a register variable.' },
          ],
          relatedTopicIds: ['u2-t3'],
        },
      ],
      commonMistakes: [
        {
          id: 'u2-t8-s1-cm1',
          title: 'Using & on a register variable',
          wrongCode: 'register int count = 0;\nscanf("%d", &count); /* Error */',
          correctCode: 'int count = 0;\nscanf("%d", &count);',
          explanation: 'This mistake reveals the fundamental incompatibility between register storage and the address-of operator. scanf requires a memory address to write the parsed integer to, but a CPU register does not have a memory address — it is a special hardware location inside the processor, identified by a number, not by a byte address in RAM. The compiler enforces this rule strictly: any attempt to use & on a register variable is a compilation error.',
          consequence: 'Compilation error: "address of register variable requested."',
        },
        {
          id: 'u2-t8-s1-cm2',
          title: 'Assuming static local variables are accessible globally',
          wrongCode: 'void func() { static int x = 5; }\nint main() { printf("%d", x); } /* Error */',
          correctCode: 'void func() { static int x = 5; printf("%d", x); }',
          explanation: 'This is one of the most common misconceptions about static: beginners assume that because the variable "lives forever," it must be accessible from everywhere. But static changes the lifetime, not the scope. The variable x is still lexically scoped to func — the name x does not exist outside func\'s braces. If main tries to use x, the compiler says "undeclared identifier" because it has never heard of x in main\'s scope.',
          consequence: 'Compilation error: "x undeclared" in main. The variable exists in memory but its name is not visible outside its declaring function.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u2-t8-s1-ic1',
          title: 'What is the default value of a static variable?',
          content: 'This is tested almost universally. Unlike auto variables, which contain whatever garbage was left in their stack memory, uninitialized static and global variables are guaranteed by the C standard to be zero-initialized. This is because they live in the BSS segment (Block Started by Symbol), a region of memory that the operating system fills with zeros when the program is loaded. This guarantee means you can rely on static variables starting at 0 or NULL without explicit initialization, which simplifies patterns like counters and flags.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u2-t8-s1-cp1',
          title: 'Static Locals',
          description: 'Verify understanding of state retention.',
          criteria: [
            'Explain why the auto variable prints 1 every time',
            'Explain why the static variable prints 1, 2, 3',
            'Identify where a static local variable is stored (Stack vs Data segment)',
          ],
          topicId: 'u2-t8',
        },
      ],
      revisionCards: [
        {
          id: 'u2-t8-s1-rc1',
          front: 'What does `static` do to a local variable?',
          back: 'It extends its lifetime to the entire duration of the program. It retains its value between function calls, and is initialized only once (to 0 by default).',
          topicId: 'u2-t8',
          tags: ['storage-classes', 'static'],
        },
        {
          id: 'u2-t8-s1-rc2',
          front: 'What is the main restriction on `register` variables?',
          back: 'You cannot take their memory address using the `&` operator, because CPU registers do not have memory addresses.',
          topicId: 'u2-t8',
          tags: ['storage-classes', 'register'],
        },
      ],
    },
    {
      id: 'u2-t8-s2',
      title: 'Global Storage: extern and global static',
      slug: 'global-storage',
      description: `When a C program grows beyond a single source file — and any non-trivial program will — you need mechanisms to share data between files and to protect implementation-private data from being accessed by other files. The extern and static keywords, applied at file scope (outside any function), serve these complementary roles and together form C's rudimentary but effective module system.

A global variable declared outside any function has two default properties: its lifetime spans the entire program (stored in the data or BSS segment), and its linkage is external, meaning other source files can access it if they know its name and type. The extern keyword is used in those other files to create a reference to a global variable defined elsewhere. Writing extern int system_status in file2.c tells the compiler: "a variable named system_status of type int exists and is defined in some other translation unit — do not allocate memory for it here; the linker will resolve this reference." The distinction between a definition (which allocates memory, e.g., int system_status = 1;) and a declaration (which merely references existing memory, e.g., extern int system_status;) is fundamental to understanding how multi-file C programs are compiled and linked.

The static keyword applied to a global variable is the inverse operation: it changes the variable's linkage from external to internal, meaning the variable's name is invisible to every other file in the program. The linker will never export or resolve references to a static global. This is C's closest equivalent to a "private" variable in object-oriented languages — it makes the variable an implementation detail of a single file, inaccessible to the rest of the program. Disciplined use of static on file-scope variables (and on helper functions that are not part of a module's public interface) is one of the most important practices for writing maintainable C programs, because it prevents accidental name collisions across files and makes it immediately clear which variables are internal to a module.`,
      keyPoints: [
        'A global variable (declared outside any function) has two important properties: its lifetime spans the entire program execution, and it is accessible from any function in the same file. Global variables are stored in the data segment (if initialized with a value) or the BSS segment (if uninitialized, where they are automatically zero-initialized). While convenient, overusing global variables makes programs hard to reason about because any function can modify them at any time.',
        'The extern keyword is used when you need to access a global variable that is defined in a different .c file. It says to the compiler: "a variable with this name and type exists, but it is not defined here — the linker will find its definition in another file." extern does not allocate memory; it just creates a reference.',
        'The static keyword applied to a global variable restricts its linkage to internal — meaning the variable is invisible to other files and cannot be accessed via extern. This is C\'s closest equivalent to a "private" variable: the data is module-private, accessible only to functions within the same .c file. Always use static on global variables that are implementation details of a single file.',
      ],
      codeExamples: [
        {
          id: 'u2-t8-s2-ex1',
          title: 'Extern for Multi-file Programs',
          code: '/* --- file1.c --- */\n#include <stdio.h>\nint system_status = 1; /* Definition: allocates memory */\n\n/* --- file2.c --- */\n#include <stdio.h>\nextern int system_status; /* Declaration: accesses memory from file1 */\n\nvoid check() {\n    if (system_status) printf("System is online.\\n");\n}',
          language: 'c',
          explanation: 'This example shows the pattern for sharing data between compilation units. In file1.c, int system_status = 1 is a definition: it allocates 4 bytes of memory and initializes them to 1. In file2.c, extern int system_status is a declaration: it tells the compiler that a variable called system_status of type int exists somewhere else, without allocating new memory. When both files are compiled and linked, the linker resolves the extern reference by connecting file2\'s usage to file1\'s definition.',
          expectedOutput: 'System is online.',
          lineBreakdown: [
            { lineNumber: 3, code: 'int system_status = 1;', explanation: 'Defined in file 1. Memory is allocated here.' },
            { lineNumber: 7, code: 'extern int system_status;', explanation: 'In file 2, `extern` means "do not allocate new memory, just link to the one in file 1".' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u2-t8-s2-ex2',
          title: 'Static Global (File Privacy)',
          code: '/* --- database.c --- */\n/* static makes this variable invisible to other files */\nstatic int connection_count = 0;\n\nvoid connect() {\n    connection_count++;\n}\n\n/* --- main.c --- */\n/* extern int connection_count;  --> LINKER ERROR! */\nint main() {\n    /* You cannot access connection_count here */\n    return 0;\n}',
          language: 'c',
          explanation: 'Using static on a global variable is the most important encapsulation tool in C. Without static, any .c file in the project could add extern int connection_count and access or modify the variable. With static, connection_count has internal linkage: it exists in memory for the entire program but its name is invisible outside database.c. If main.c tries extern int connection_count, the linker will fail because the static variable is deliberately hidden. This is how C programmers create "private" module data.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 3, code: 'static int connection_count = 0;', explanation: 'The `static` keyword here means "File Scope". It cannot be accessed via `extern` from `main.c`.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u2-t8-s2-cm1',
          title: 'Initializing an extern variable',
          wrongCode: 'extern int shared_val = 10; /* Bad practice/Error */',
          correctCode: '/* file1.c */ int shared_val = 10;\n/* file2.c */ extern int shared_val;',
          explanation: 'This is a subtle but important rule. An extern declaration says "this variable is defined elsewhere." If you attach an initializer (extern int shared_val = 10), you are simultaneously declaring it as extern and defining it. If file1.c also defines int shared_val = 10, you have two definitions of the same symbol, which violates C\'s One Definition Rule.',
          consequence: 'Linker error: "multiple definition of shared_val." The linker finds two definitions and cannot decide which one to use.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u2-t8-s2-ic1',
          title: 'The two meanings of static',
          content: 'This is one of the most frequently asked C interview questions. The static keyword has two completely different meanings depending on where it is used. Inside a function, static changes the variable\'s lifetime: instead of being destroyed when the function returns, the variable persists for the entire program, retaining its value between calls. Outside a function (on a global variable or function), static changes the linkage: it makes the symbol invisible to other files, providing encapsulation. A weak answer says "static makes variables keep their value." A strong answer distinguishes between static-local (lifetime) and static-global (linkage) and gives an example of each.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u2-t8-s2-cp1',
          title: 'Extern and Static Globals',
          description: 'Verify multi-file scope understanding.',
          criteria: [
            'Explain how to share a variable between two C files',
            'Explain how to prevent a global variable from being shared',
          ],
          topicId: 'u2-t8',
        },
      ],
      revisionCards: [
        {
          id: 'u2-t8-s2-rc1',
          front: 'What does the `extern` keyword do?',
          back: 'It declares a variable or function that is defined in another file, telling the linker to resolve the reference later.',
          topicId: 'u2-t8',
          tags: ['storage-classes', 'extern'],
        },
        {
          id: 'u2-t8-s2-rc2',
          front: 'What does `static` do when applied to a global variable?',
          back: 'It restricts the scope of that global variable to the current file only. It cannot be accessed via `extern` from other files (Internal Linkage).',
          topicId: 'u2-t8',
          tags: ['storage-classes', 'static', 'scope'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u2-t8-q1',
      type: 'mcq',
      topicId: 'u2-t8',
      difficulty: 'beginner',
      question: 'Which storage class is the default for local variables inside a function?',
      options: ['static', 'register', 'auto', 'extern'],
      correctAnswer: 'auto',
      explanation: 'Variables declared normally inside a block are `auto` (automatic). They are automatically created on the stack and destroyed when the block ends.',
      tags: ['storage-classes', 'auto'],
    },
    {
      id: 'u2-t8-q2',
      type: 'predict-output',
      topicId: 'u2-t8',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: '#include <stdio.h>\nvoid increment() {\n    static int i = 1;\n    printf("%d ", i);\n    i++;\n}\nint main() {\n    increment();\n    increment();\n    return 0;\n}',
      correctAnswer: '1 2',
      explanation: 'Because `i` is static, it is initialized to 1 only once. The first call prints 1 and increments `i` to 2. The second call uses the persisted value 2, prints 2, and increments to 3.',
      tags: ['storage-classes', 'static'],
    },
    {
      id: 'u2-t8-q3',
      type: 'true-false',
      topicId: 'u2-t8',
      difficulty: 'beginner',
      question: 'Uninitialized static variables contain random garbage values.',
      correctAnswer: false,
      explanation: 'Unlike auto variables, uninitialized static and global variables are automatically initialized to zero by the compiler (stored in the BSS segment).',
      tags: ['storage-classes', 'initialization'],
    },
    {
      id: 'u2-t8-q4',
      type: 'spot-bug',
      topicId: 'u2-t8',
      difficulty: 'intermediate',
      question: 'Spot the bug:',
      code: '#include <stdio.h>\nint main(void) {\n    register int x = 10;\n    int *ptr = &x;\n    printf("%d", *ptr);\n    return 0;\n}',
      correctAnswer: 'Taking the address of a register variable.',
      explanation: '`x` is declared as a `register` variable. CPU registers do not have memory addresses, so `&x` is an illegal operation and will cause a compiler error.',
      tags: ['storage-classes', 'register', 'pointers'],
    },
    {
      id: 'u2-t8-q5',
      type: 'mcq',
      topicId: 'u2-t8',
      difficulty: 'advanced',
      question: 'Why would a programmer use `static` on a global variable?',
      options: [
        'To make it run faster',
        'To initialize it to 1',
        'To hide it from other C files (encapsulation)',
        'To make it accessible via extern',
      ],
      correctAnswer: 'To hide it from other C files (encapsulation)',
      explanation: 'A static global has internal linkage. It acts like a "private" variable for that specific .c file, preventing naming conflicts with other files in large projects.',
      tags: ['storage-classes', 'static', 'scope'],
    },
  ],

  programmingProblems: [
    {
      id: 'u2-t8-new-easy',
      title: 'Array Reverse',
      topicId: 'u2-t8',
      difficulty: 'beginner',
      problemStatement: 'Reverse an array of N elements in place.',
      constraints: ['Do not use a secondary array'],
      sampleInput: '1 2 3',
      sampleOutput: '3 2 1',
      hints: ['Swap elements from both ends moving towards the center'],
      solution: '/* Array reverse implementation */',
      solutionExplanation: 'Swaps index i and N-1-i.',
      dryRun: [],
      tags: ['arrays']
    },
    {
      id: 'u2-t8-new-med',
      title: 'Matrix Diagonal Sum',
      topicId: 'u2-t8',
      difficulty: 'intermediate',
      problemStatement: 'Calculate the sum of the main diagonal of an NxN matrix.',
      constraints: ['Matrix is guaranteed to be square'],
      sampleInput: '1 2\n3 4',
      sampleOutput: '5',
      hints: ['Main diagonal elements have index [i][i]'],
      solution: '/* Diagonal sum implementation */',
      solutionExplanation: 'Iterates and sums arr[i][i].',
      dryRun: [],
      tags: ['matrix']
    },
    {
      id: 'u2-t8-new-hard',
      title: 'Recursive GCD',
      topicId: 'u2-t8',
      difficulty: 'advanced',
      problemStatement: 'Find the Greatest Common Divisor of two numbers using recursion (Euclidean algorithm).',
      constraints: ['Must use recursion'],
      sampleInput: '48 18',
      sampleOutput: '6',
      hints: ['gcd(a, b) = gcd(b, a % b)'],
      solution: '/* Recursive GCD implementation */',
      solutionExplanation: 'Implements Euclidean algorithm recursively.',
      dryRun: [],
      tags: ['recursion']
    },
    {
      id: 'u2-t8-p1',
      title: 'Function Call Counter',
      topicId: 'u2-t8',
      difficulty: 'beginner',
      problemStatement: 'Write a function `void trackCalls(void)` that prints "I have been called X times" where X increases every time the function is called. Call it 3 times from main.',
      constraints: ['Do not use global variables'],
      sampleInput: '',
      sampleOutput: 'I have been called 1 times\nI have been called 2 times\nI have been called 3 times',
      hints: ['Use a static int variable inside the function initialized to 0.'],
      solution: '#include <stdio.h>\n\nvoid trackCalls(void) {\n    static int count = 0;\n    count++;\n    printf("I have been called %d times\\n", count);\n}\n\nint main(void) {\n    trackCalls();\n    trackCalls();\n    trackCalls();\n    return 0;\n}',
      solutionExplanation: 'The static variable `count` persists between calls. It is initialized to 0 exactly once when the program starts. This is the cleanest way to maintain state without polluting the global scope.',
      dryRun: [
        { step: 1, line: 10, variables: {}, output: 'I have been called 1 times\\n', explanation: 'count initialized to 0, incremented to 1.' },
        { step: 2, line: 11, variables: {}, output: 'I have been called 2 times\\n', explanation: 'count retains 1, incremented to 2.' },
        { step: 3, line: 12, variables: {}, output: 'I have been called 3 times\\n', explanation: 'count retains 2, incremented to 3.' },
      ],
      tags: ['storage-classes', 'static', 'state'],
    },
    {
      id: 'u2-t8-p2',
      title: 'Generate Unique IDs',
      topicId: 'u2-t8',
      difficulty: 'intermediate',
      problemStatement: 'Write a function `int generateID(void)` that returns a new unique ID every time it is called. The IDs should start at 1000 and increase by 1. Call it twice and print the results.',
      constraints: ['Do not use global variables'],
      sampleInput: '',
      sampleOutput: 'ID 1: 1000\nID 2: 1001',
      hints: ['static int current_id = 1000;', 'return current_id++;'],
      solution: '#include <stdio.h>\n\nint generateID(void) {\n    static int current_id = 1000;\n    return current_id++;\n}\n\nint main(void) {\n    printf("ID 1: %d\\n", generateID());\n    printf("ID 2: %d\\n", generateID());\n    return 0;\n}',
      solutionExplanation: 'Using `return current_id++;` returns the current value, and THEN increments the static variable for the next call. A perfect use case for static locals.',
      dryRun: [
        { step: 1, line: 9, variables: {}, output: 'ID 1: 1000\\n', explanation: 'Returns 1000, current_id becomes 1001.' },
        { step: 2, line: 10, variables: {}, output: 'ID 2: 1001\\n', explanation: 'Returns 1001, current_id becomes 1002.' },
      ],
      tags: ['storage-classes', 'static', 'state'],
    },
    {
      id: 'u2-t8-p3',
      title: 'Fast Loop with Register',
      topicId: 'u2-t8',
      difficulty: 'beginner',
      problemStatement: 'Write a program that sums the numbers from 1 to 10000. Use a `register` variable for the loop counter.',
      constraints: ['Use the register keyword'],
      sampleInput: '',
      sampleOutput: 'Sum: 50005000',
      hints: ['register int i;'],
      solution: '#include <stdio.h>\n\nint main(void) {\n    register int i;\n    int sum = 0;\n    \n    for (i = 1; i <= 10000; i++) {\n        sum += i;\n    }\n    \n    printf("Sum: %d\\n", sum);\n    return 0;\n}',
      solutionExplanation: 'Demonstrates the syntax for requesting register storage. Note that modern compilers optimize this automatically, but it\'s historically important.',
      dryRun: [
        { step: 1, line: 4, variables: { i: '?' }, output: '', explanation: 'i is requested to be in a CPU register.' },
        { step: 2, line: 7, variables: { i: '10000', sum: '50005000' }, output: '', explanation: 'Loop computes sum.' },
      ],
      tags: ['storage-classes', 'register', 'loops'],
    },
  ],
};
