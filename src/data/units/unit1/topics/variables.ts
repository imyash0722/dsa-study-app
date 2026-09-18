import type { Topic } from '../../../../types';

export const variables: Topic = {
  id: 'u1-t4',
  unitId: 'unit-1',
  title: 'Variables',
  slug: 'variables',
  description:
    `A variable in C is a named storage location in the computer's RAM — a specific group of contiguous bytes at a specific memory address, associated with a human-readable name by the compiler's symbol table. Unlike variables in mathematics, which are abstract symbols representing unknown quantities, a C variable is a concrete, physical entity with a fixed size (determined by its data type), a real address (assigned by the compiler or linker), and a value that can change as the program executes.

When you declare int age = 19, the compiler allocates 4 bytes on the stack (assuming a typical 32-bit integer), stores the two's complement binary encoding of 19 in those bytes, and records a mapping from the name "age" to the starting address of that 4-byte region. Every subsequent reference to age in the source code compiles to a machine instruction that reads from or writes to that address. The variable name exists only during compilation — the final executable contains only raw numeric addresses.

This topic covers the mechanics of variable declaration, initialisation, and naming, as well as a preview of scope — the rules that determine which regions of code can access which variables. Understanding that uninitialised local variables contain garbage (whatever bit pattern was left in their stack memory by a previous function call) and that reading such variables is undefined behavior is a critical early lesson that prevents an entire class of debugging nightmares.`,
  difficulty: 'beginner',
  prerequisites: ['u1-t3'],
  estimatedMinutes: 35,

  subtopics: [
    {
      id: 'u1-t4-s1',
      title: 'Variables in Memory',
      slug: 'variables-in-memory',
      description:
        `When you declare a variable in C, the compiler performs a concrete physical action: it reserves a specific number of contiguous bytes in the program's memory space, associates the variable name with the starting address of that byte range, and records the variable's type so it knows how to interpret the bytes stored there. For example, the declaration int age = 25 causes the compiler to allocate 4 bytes (on a typical 32/64-bit system), store the binary representation of 25 in those bytes using two's complement encoding, and create a mapping from the name "age" to the address (say, 0x7ffd2a3c) where those bytes reside. Every subsequent reference to age in the source code is translated by the compiler into an instruction that reads from or writes to address 0x7ffd2a3c.

This name-to-address mapping is one of the most important services a high-level language provides. Without it, programmers would have to manually track which memory addresses hold which values — an error-prone process that assembly language programmers endure but that C abstracts away entirely. The compiler maintains a symbol table that records, for each variable, its name, type, size, and memory location. This table exists only during compilation; the final executable contains only raw addresses and machine instructions, with no trace of the original variable names (unless debug information is included with the -g flag).

Declaration and initialisation are conceptually separate operations in C. The declaration int x tells the compiler to reserve 4 bytes; it does not guarantee what value those bytes contain. On the stack (where local variables live), uninitialised bytes retain whatever garbage data was left there by a previous function call, producing unpredictable values that can change between runs, between compilers, and between optimisation levels. Reading an uninitialised variable is undefined behavior in C — the compiler is free to assume it never happens and may optimise code in ways that produce baffling results. Always initialising variables at the point of declaration (int x = 0) is the simplest defence against this entire class of bug.`,
      keyPoints: [
        'A variable is a named storage location in your computer\'s RAM (Random Access Memory). When your program is running, each variable occupies a specific group of bytes at a specific address. The name you give the variable is purely for your benefit as a human reader — the compiled program works entirely with numeric addresses.',
        'A helpful mental model is to think of memory as a vast row of numbered mailboxes. Each mailbox has an address (its position number), a fixed capacity (determined by the variable\'s type — 4 bytes for an int, 8 bytes for a double), and contents (the current value). When you declare int age = 19, you are claiming one of these mailboxes, labeling it "age" on your code map, and placing the value 19 inside.',
        'You never choose where in memory a variable lives — the compiler and operating system handle that automatically. This is a feature, not a limitation: it frees you to think about your program\'s logic rather than managing raw memory addresses. However, C uniquely allows you to find out where a variable lives using the address-of operator (&), which becomes critically important when you learn about pointers.',
        'Every variable in C has three essential properties: its name (the identifier you use in your code), its type (which determines how much memory it uses and how its bits are interpreted), and its current value (which can change throughout the program\'s execution). The type is fixed at declaration time and can never change, but the value can be updated as many times as you like.',
        'You can peek at a variable\'s memory address using the address-of operator (&) combined with the %p format specifier in printf. The address is typically displayed in hexadecimal notation, like 0x7ffd2a3c. This address changes every time you run the program, because modern operating systems use address space layout randomization (ASLR) as a security measure.',
      ],
      codeExamples: [
        {
          id: 'u1-t4-s1-ex1',
          title: 'Variable Declaration and Initialization',
          code: '#include <stdio.h>\n\nint main(void) {\n    int age;          /* Declaration: creates the box */\n    age = 19;        /* Assignment: puts a value in the box */\n    int score = 95;  /* Declaration + Initialization: one step */\n    printf("Age: %d, Score: %d\\n", age, score);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This example shows the two-step lifecycle of a variable: first it is declared (which reserves memory), then it is assigned a value (which writes data into that memory). You can combine both steps into a single statement, which is called initialization. The distinction matters because if you declare a variable without initializing it, the memory it occupies still contains whatever random bits were left there from previous use — a lurking source of bugs that we will explore shortly.',
          expectedOutput: 'Age: 19, Score: 95',
          lineBreakdown: [
            { lineNumber: 4, code: '    int age;', explanation: 'Declaration only — creates an int in memory but does NOT set its value. Contains garbage.' },
            { lineNumber: 5, code: '    age = 19;', explanation: 'Assignment — stores 19 into the memory location called age.' },
            { lineNumber: 6, code: '    int score = 95;', explanation: 'Declaration + initialization in one step. This is the preferred way.' },
          ],
          relatedTopicIds: ['u1-t5'],
        },
        {
          id: 'u1-t4-s1-ex2',
          title: 'Viewing Memory Addresses',
          code: '#include <stdio.h>\n\nint main(void) {\n    int x = 42;\n    float y = 3.14f;\n    printf("Value of x: %d\\n", x);\n    printf("Address of x: %p\\n", (void *)&x);\n    printf("Value of y: %f\\n", y);\n    printf("Address of y: %p\\n", (void *)&y);\n    return 0;\n}',
          language: 'c',
          explanation:
            'The & operator is your window into the machine\'s reality. While you think of variables as abstract names, the computer thinks of them as addresses. Using & with printf and the %p format specifier lets you see the actual memory address where each variable lives. Notice that the addresses are in hexadecimal, and they change every time you run the program — the operating system places your program at a different location each time for security reasons. This ability to examine addresses becomes foundational when you reach the topic of pointers.',
          expectedOutput: 'Value of x: 42\nAddress of x: 0x7ffd12345678\nValue of y: 3.140000\nAddress of y: 0x7ffd1234567c',
          lineBreakdown: [
            { lineNumber: 7, code: '    printf("Address of x: %p\\n", (void *)&x);', explanation: '&x gives the memory address of x. %p prints it as a pointer (hex). (void *) cast is for clean compilation.' },
          ],
          relatedTopicIds: ['u1-t9'],
        },
        {
          id: 'u1-t4-s1-ex3',
          title: 'Danger of Uninitialized Variables',
          code: '#include <stdio.h>\n\nint main(void) {\n    int a;  /* NOT initialized - contains garbage! */\n    printf("a = %d\\n", a);  /* Undefined behavior! */\n    int b = 0;  /* ALWAYS initialize your variables */\n    printf("b = %d\\n", b);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program demonstrates one of C\'s most dangerous properties: when you declare a local variable without giving it a value, C does not helpfully set it to zero. The memory allocated for that variable still contains whatever bits were left there from its previous use — remnants of a previous function call, a previous program, or even random electrical noise. Reading this "garbage value" is what the C standard calls undefined behavior, meaning the compiler and the CPU are free to do literally anything — the program might print 0, might print -1234567, might crash, or might appear to work today and fail tomorrow. The only safe habit is to always initialize your variables at the point of declaration.',
          expectedOutput: 'a = (unpredictable garbage value)\nb = 0',
          lineBreakdown: [
            { lineNumber: 4, code: '    int a;', explanation: 'a is declared but NOT initialized. Its memory could contain anything — leftover data from a previous program.' },
            { lineNumber: 5, code: '    printf("a = %d\\n", a);', explanation: 'Reading an uninitialized variable is UNDEFINED BEHAVIOR. Could print 0, -12345, or anything.' },
            { lineNumber: 6, code: '    int b = 0;', explanation: 'Always initialize variables. b is guaranteed to be 0.' },
          ],
          relatedTopicIds: ['u1-t10'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s1-cm1',
          title: 'Using a variable before initializing it',
          wrongCode: 'int total;\nprintf("%d\\n", total);  /* garbage value! */',
          correctCode: 'int total = 0;\nprintf("%d\\n", total);  /* prints 0 */',
          explanation:
            'This is one of the most common beginner mistakes, and it persists because the behavior seems random. Sometimes the garbage value happens to be zero (making the bug invisible during testing), and sometimes it is a large negative number that makes the bug obvious. The unpredictability is the danger: your program might pass all your tests but fail during your viva demonstration because the garbage value happened to be different that day. Modern compilers like gcc with the -Wall flag will warn you about uninitialized variables, but only if you turn on warnings. Always compile with gcc -Wall -Wextra as a beginner.',
          consequence: 'The output is unpredictable — it depends on whatever was previously stored in that memory location. The value may differ between runs, between machines, and even between debug and release builds. This is the definition of undefined behavior in C.',
        },
        {
          id: 'u1-t4-s1-cm2',
          title: 'Using a variable name that is a C keyword',
          wrongCode: 'int return = 5;\nint for = 10;',
          correctCode: 'int result = 5;\nint count = 10;',
          explanation:
            'C reserves about 32 words (like int, return, for, if, while, char, float, void, struct, etc.) for its own use as part of the language syntax. When you try to use one of these as a variable name, the compiler gets confused because it expects that word to introduce a language construct, not a variable. The error messages from this mistake can be particularly bewildering — writing int return = 5; makes the compiler think you are trying to return a value, not declare a variable, so the error message may talk about unexpected tokens rather than invalid names.',
          consequence: 'The compiler produces syntax errors that may seem unrelated to naming, because it interprets the keyword as a language construct rather than a variable name. For example, int for = 10; makes the compiler think you are starting a for loop.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s1-ic1',
          title: 'What is the difference between declaration and definition?',
          content:
            'This question probes your understanding of the compilation process. For local variables in C, declaration and definition happen simultaneously: writing int x; both announces that x exists (declaration) and allocates memory for it (definition). But this distinction becomes important in two situations you will encounter later. First, with the extern keyword, you can declare a variable in one file without defining it, telling the compiler "this variable exists somewhere else, just trust me." Second, with functions, a declaration (prototype) says "a function with this name and signature exists," while the definition provides the actual code body. Understanding this distinction shows an interviewer that you think about the compilation model, not just the syntax.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t4-s1-cp1',
          title: 'Variable Basics Mastered',
          description: 'Verify you understand variable lifecycle.',
          criteria: [
            'Declare and initialize variables of type int, float, char',
            'Explain why uninitialized variables are dangerous',
            'Print a variable\'s memory address using & and %p',
            'List 5 valid and 5 invalid variable names',
          ],
          topicId: 'u1-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t4-s1-rc1',
          front: 'What is the difference between declaration and initialization?',
          back: 'Declaration: int x; (creates the variable, allocates memory, but value is garbage). Initialization: int x = 0; (creates the variable AND sets its value).',
          topicId: 'u1-t4',
          tags: ['variables', 'declaration'],
        },
        {
          id: 'u1-t4-s1-rc2',
          front: 'What happens if you read an uninitialized local variable?',
          back: 'Undefined behavior. The variable contains garbage — whatever was previously in that memory location. The value is unpredictable and may change between runs.',
          topicId: 'u1-t4',
          tags: ['variables', 'uninitialized', 'UB'],
        },
        {
          id: 'u1-t4-s1-rc3',
          front: 'What are the C variable naming rules?',
          back: 'Must start with a letter or underscore. Can contain letters, digits, underscores. Cannot be a C keyword. Case-sensitive (Age ≠ age). Avoid starting with _ (reserved for system use).',
          topicId: 'u1-t4',
          tags: ['variables', 'naming'],
        },
      ],
    },
    {
      id: 'u1-t4-s2',
      title: 'Naming Rules and Scope Preview',
      slug: 'naming-and-scope',
      description:
        `Variable naming in C is governed by both hard language rules enforced by the compiler and soft conventions established by the programming community. The compiler enforces that names must begin with a letter (a\u2013z, A\u2013Z) or an underscore, followed by any combination of letters, digits, and underscores; names cannot contain spaces, hyphens, or special characters, and C is case-sensitive (age, Age, and AGE are three distinct variables). Additionally, approximately 30 reserved keywords (int, return, if, while, struct, etc.) cannot be used as variable names because the compiler assigns them special grammatical roles.

The community convention for C variable names is snake_case: all lowercase with underscores separating words (student_count, max_temperature, total_revenue). Constants and preprocessor macros use UPPER_SNAKE_CASE (MAX_SIZE, BUFFER_LENGTH, PI) to visually distinguish fixed values from mutable variables at a glance. These conventions are not arbitrary \u2014 they match the naming style used by the C standard library itself (strlen, fopen, BUFSIZ) and are universally expected in professional and academic C codebases.

A variable's scope is the region of source code in which the variable's name is visible and can be referenced. In C, scope is determined by the placement of curly braces: a variable declared inside a block { } is local to that block and ceases to exist when execution passes the closing brace. This block scoping prevents different parts of a program from accidentally interfering with each other's data and is the foundation of modular programming. A variable's lifetime \u2014 how long the memory it occupies persists \u2014 usually matches its scope for local variables (they are created on the stack when the block is entered and destroyed when it is exited), but the static keyword can extend a local variable's lifetime to the entire program while keeping its name private to the enclosing function.`,
      keyPoints: [
        'C variable names must start with a letter (a-z, A-Z) or an underscore (_), and the remaining characters can be letters, digits (0-9), or underscores. The name cannot contain spaces, hyphens, or special characters like @, $, or #. C is case-sensitive, so age, Age, and AGE are three completely different variables — a distinction that catches many beginners by surprise.',
        'Several names are off-limits because C reserves them as keywords: int, float, char, return, if, else, for, while, void, struct, and about two dozen more. You cannot use these as variable names because the compiler already assigns them special meaning in the language grammar. Trying to use a keyword as a variable name produces confusing errors.',
        'The C community follows a convention called snake_case for variable names: all lowercase with underscores separating words (total_marks, student_count, max_temperature). Constants are written in ALL_CAPS with underscores (MAX_SIZE, PI, BUFFER_LENGTH). Following these conventions makes your code instantly readable to any C programmer and is expected in professional and academic settings.',
        'A variable\'s scope is the region of your source code where that variable is visible and accessible. A local variable declared inside a pair of curly braces { } exists only within that block. The moment execution passes the closing brace, the variable is destroyed and its memory is reclaimed. This is not a limitation but a feature — it prevents different parts of your program from accidentally interfering with each other\'s data.',
        'Global variables are declared outside all functions, at the top of the file, and are accessible from any function in the program. While this might seem convenient, global variables make programs harder to reason about because any function can modify them at any time, creating hidden dependencies between distant parts of your code. Professional C programmers use global variables sparingly and prefer passing data through function parameters.',
        'If you declare a variable with the same name in an inner block that already exists in an outer block, the inner variable "shadows" the outer one. Within the inner block, the name refers to the inner variable, and the outer variable becomes temporarily inaccessible. This is legal C but is almost always a source of confusion and bugs — avoid it by choosing distinct names.',
      ],
      codeExamples: [
        {
          id: 'u1-t4-s2-ex1',
          title: 'Valid and Invalid Variable Names',
          code: '#include <stdio.h>\n\nint main(void) {\n    int age = 19;           /* valid */\n    int _count = 0;         /* valid (starts with _) */\n    int total_marks = 450;  /* valid (snake_case) */\n    int num2 = 42;          /* valid (digit not at start) */\n    /* int 2num = 0;   INVALID - starts with digit */\n    /* int my var = 0; INVALID - contains space */\n    /* int return = 0; INVALID - keyword */\n    printf("age=%d count=%d marks=%d num=%d\\n",\n           age, _count, total_marks, num2);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This example contrasts valid and invalid naming patterns side by side. The commented-out lines show the three most common naming mistakes: starting with a digit (the compiler cannot distinguish between the start of a number and the start of a name), including spaces or hyphens (which the compiler interprets as operators), and using reserved keywords (which have syntactic meaning in C). The valid examples demonstrate the conventions used in professional C code: lowercase with underscores for readability.',
          expectedOutput: 'age=19 count=0 marks=450 num=42',
          lineBreakdown: [
            { lineNumber: 4, code: '    int age = 19;', explanation: 'Starts with letter, lowercase — valid and conventional.' },
            { lineNumber: 6, code: '    int total_marks = 450;', explanation: 'snake_case — the standard C convention for multi-word names.' },
            { lineNumber: 8, code: '    /* int 2num = 0; */', explanation: 'INVALID — starts with a digit. Compiler error.' },
          ],
          relatedTopicIds: ['u1-t12'],
        },
        {
          id: 'u1-t4-s2-ex2',
          title: 'Local Scope — Variables Live Inside Their Block',
          code: '#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    printf("Outer x = %d\\n", x);\n    {\n        int y = 20;  /* y only exists in this block */\n        printf("Inner y = %d\\n", y);\n        printf("Inner x = %d\\n", x);  /* x is visible here */\n    }\n    /* printf("%d\\n", y); -- ERROR: y does not exist here */\n    printf("Outer x = %d\\n", x);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This is a critical concept that becomes important immediately and remains important for your entire programming career. The variable y is declared inside an inner block (delimited by { }), and it ceases to exist the moment that block ends. If you uncomment the attempt to print y outside the block, the compiler will refuse to compile your program because y simply does not exist in that scope. Meanwhile, the variable x, declared in the outer block, is visible everywhere inside it, including nested inner blocks. This nesting behavior — inner blocks can see outer variables but not vice versa — is how C manages the visibility and lifetime of your data.',
          expectedOutput: 'Outer x = 10\nInner y = 20\nInner x = 10\nOuter x = 10',
          lineBreakdown: [
            { lineNumber: 7, code: '    int y = 20;', explanation: 'y is local to this inner block. It is created here and destroyed at }.' },
            { lineNumber: 9, code: '    printf("Inner x = %d\\n", x);', explanation: 'x from the outer block is visible in inner blocks.' },
            { lineNumber: 11, code: '    /* y does not exist here */', explanation: 'After the closing }, y is out of scope. Accessing it would be a compilation error.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u1-t4-s2-ex3',
          title: 'Multiple Declarations on One Line',
          code: '#include <stdio.h>\n\nint main(void) {\n    int a = 1, b = 2, c = 3;\n    printf("a=%d b=%d c=%d\\n", a, b, c);\n    /* Tricky: only c is initialized here! */\n    int x, y, z = 99;\n    /* x and y are garbage, only z is 99 */\n    printf("z=%d\\n", z);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This example contains one of the sneakiest traps in C syntax. When you write int x, y, z = 99, it looks like all three variables get the value 99. But the initialization = 99 applies only to z. The variables x and y are merely declared, and since they are local variables, they contain garbage values. This trap exists because the comma in this context separates declarators, not assignments. The only way to safely initialize all three is to write int x = 99, y = 99, z = 99, or better yet, put each on its own line for clarity. Many experienced C programmers avoid multi-variable declarations entirely because of this ambiguity.',
          expectedOutput: 'a=1 b=2 c=3\nz=99',
          lineBreakdown: [
            { lineNumber: 4, code: '    int a = 1, b = 2, c = 3;', explanation: 'All three are initialized — this is fine.' },
            { lineNumber: 7, code: '    int x, y, z = 99;', explanation: 'TRAP: only z gets 99. x and y are uninitialized! This is a common source of bugs.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t4-s2-cm1',
          title: 'Thinking all variables on one line are initialized',
          wrongCode: 'int a, b, c = 0;\nprintf("%d %d %d\\n", a, b, c);',
          correctCode: 'int a = 0, b = 0, c = 0;\nprintf("%d %d %d\\n", a, b, c);',
          explanation:
            'This is a perfect example of how C\'s syntax can be visually misleading. The line int a, b, c = 0 looks symmetrical — it seems like all three variables are being set to zero. But the initialization only applies to c, the last variable in the comma-separated list. This trap persists because our brains naturally assume that parallel structure implies parallel behavior. The fix is to explicitly initialize each variable: int a = 0, b = 0, c = 0. Better yet, declare them on separate lines so the initialization of each is visually unambiguous.',
          consequence: 'Variables a and b contain unpredictable garbage values. The program might appear to work correctly during testing (if garbage happens to be 0) but fail unpredictably in production or during a viva demonstration.',
        },
        {
          id: 'u1-t4-s2-cm2',
          title: 'Confusing case sensitivity',
          wrongCode: 'int Age = 19;\nprintf("%d\\n", age);  /* age != Age */',
          correctCode: 'int age = 19;\nprintf("%d\\n", age);',
          explanation:
            'Students coming from mathematics or languages that are case-insensitive (like SQL or older BASIC) are often caught off-guard by C\'s strict case sensitivity. In C, every character of a name matters, including its case: Age, age, AGE, and aGe are four completely different identifiers. This means a typo as small as capitalizing one letter creates a reference to a variable that does not exist, producing a "variable undeclared" compiler error that seems baffling when you can see the variable right there in your code. The habit to develop is consistency: choose a casing convention (snake_case for variables in C) and stick to it throughout your program.',
          consequence: 'The compiler reports that "age" is undeclared, even though "Age" was declared just one line above. The error message is technically correct but feels wrong until you internalize that case matters in C.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t4-s2-ic1',
          title: 'What are garbage values?',
          content:
            'When you declare a local variable without initializing it, C does not zero out that memory for you — it simply hands you whatever bits were already there from previous use. Those leftover bits are called "garbage values," and they are genuinely random from your program\'s perspective. The key insight that impresses interviewers is explaining WHY this happens: C prioritizes performance, and zeroing out memory for every declaration would cost CPU cycles that may be wasted if you are about to assign a value anyway. Languages like Java and Python initialize variables automatically, trading a tiny performance cost for safety. C trusts you to initialize your own variables, and if you forget, the behavior is formally "undefined" — the compiler is not required to produce any particular result, and your program may behave differently on different runs, different machines, or different optimization levels.',
          relatedTopicIds: ['u1-t10'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t4-s2-cp1',
          title: 'Scope Understanding',
          description: 'Verify you understand variable scope.',
          criteria: [
            'Explain what happens to a variable when its block ends',
            'Predict the output of a program with nested scopes',
            'Know why global variables should be used sparingly',
          ],
          topicId: 'u1-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t4-s2-rc1',
          front: 'Is C case-sensitive for variable names?',
          back: 'Yes. age, Age, and AGE are three completely different variables in C.',
          topicId: 'u1-t4',
          tags: ['variables', 'case-sensitive'],
        },
        {
          id: 'u1-t4-s2-rc2',
          front: 'What is scope?',
          back: 'The region of code where a variable is visible and accessible. Local variables exist only within the { } block where they are declared.',
          topicId: 'u1-t4',
          tags: ['scope', 'variables'],
        },
        {
          id: 'u1-t4-s2-rc3',
          front: 'In "int a, b, c = 5;", which variables are initialized?',
          back: 'Only c is initialized to 5. a and b are uninitialized and contain garbage values. Always initialize each variable explicitly.',
          topicId: 'u1-t4',
          tags: ['variables', 'initialization', 'trap'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u1-t4-q1',
      type: 'mcq',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'Which of the following is a VALID C variable name?',
      options: ['2ndValue', 'my-var', '_total', 'float'],
      correctAnswer: '_total',
      explanation: '_total is valid — it starts with underscore and contains only letters. 2ndValue starts with a digit (invalid). my-var contains a hyphen (invalid). float is a keyword (invalid).',
      tags: ['naming', 'rules'],
    },
    {
      id: 'u1-t4-q2',
      type: 'predict-output',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'What does this program print?',
      code: '#include <stdio.h>\nint main(void) {\n    int x = 5;\n    {\n        int x = 10;\n        printf("%d ", x);\n    }\n    printf("%d\\n", x);\n    return 0;\n}',
      correctAnswer: '10 5',
      explanation: 'The inner x (10) shadows the outer x (5) within the inner block. Inside { }, x refers to the inner variable (10). After }, the inner x is destroyed and x refers to the outer variable (5).',
      tags: ['scope', 'shadowing'],
    },
    {
      id: 'u1-t4-q3',
      type: 'spot-bug',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'Find the bug:',
      code: '#include <stdio.h>\nint main(void) {\n    int a, b, sum = 0;\n    a = 10;\n    sum = a + b;\n    printf("Sum = %d\\n", sum);\n    return 0;\n}',
      correctAnswer: 'Variable b is used without being initialized. It contains a garbage value.',
      explanation: 'int a, b, sum = 0 only initializes sum. b is uninitialized and contains garbage. a + b produces an unpredictable result. Fix: initialize b before using it.',
      tags: ['uninitialized', 'garbage-value'],
    },
    {
      id: 'u1-t4-q4',
      type: 'true-false',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'In C, the variable names "count" and "Count" refer to the same variable.',
      correctAnswer: false,
      explanation: 'C is case-sensitive. "count" and "Count" are two completely different identifiers.',
      tags: ['case-sensitive', 'naming'],
    },
    {
      id: 'u1-t4-q5',
      type: 'mcq',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      question: 'What does the & operator do when used with a variable?',
      options: ['Multiplies the variable by 2', 'Returns the memory address of the variable', 'Performs bitwise AND', 'Declares a reference'],
      correctAnswer: 'Returns the memory address of the variable',
      explanation: 'The unary & operator (address-of) returns the memory address where a variable is stored. In scanf, we use & to tell scanf WHERE to store the input value. Note: & also serves as the bitwise AND operator when used between two values.',
      tags: ['address-of', 'pointers-preview'],
    },
  ],

  programmingProblems: [
    {
      id: 'u1-t4-new-easy',
      title: 'Armstrong Number Check',
      topicId: 'u1-t4',
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
      id: 'u1-t4-new-med',
      title: 'Factorial Calculation',
      topicId: 'u1-t4',
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
      id: 'u1-t4-new-hard',
      title: 'Diamond Pattern',
      topicId: 'u1-t4',
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
      id: 'u1-t4-p1',
      title: 'Temperature Converter',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      problemStatement: 'Read a temperature in Celsius from the user and convert it to Fahrenheit. Formula: F = (C × 9/5) + 32.',
      constraints: ['Use float for temperature values', 'Print result with 1 decimal place'],
      sampleInput: '100',
      sampleOutput: '100.0 C = 212.0 F',
      hints: ['Declare float variables for celsius and fahrenheit', 'Use 9.0/5.0 not 9/5 (integer division trap!)'],
      solution: '#include <stdio.h>\n\nint main(void) {\n    float celsius, fahrenheit;\n    printf("Enter temperature in Celsius: ");\n    scanf("%f", &celsius);\n    fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;\n    printf("%.1f C = %.1f F\\n", celsius, fahrenheit);\n    return 0;\n}',
      solutionExplanation: 'We use 9.0f/5.0f instead of 9/5 because 9/5 would do integer division and give 1 instead of 1.8. This is the #1 trap beginners fall into with this formula.',
      dryRun: [
        { step: 1, line: 6, variables: { celsius: '100.0', fahrenheit: '?' }, output: '', explanation: 'Read celsius = 100.0 from user.' },
        { step: 2, line: 7, variables: { celsius: '100.0', fahrenheit: '212.0' }, output: '', explanation: 'fahrenheit = (100.0 * 9.0 / 5.0) + 32.0 = 180.0 + 32.0 = 212.0' },
        { step: 3, line: 8, variables: { celsius: '100.0', fahrenheit: '212.0' }, output: '100.0 C = 212.0 F', explanation: 'Print formatted output.' },
      ],
      tags: ['float', 'arithmetic', 'conversion'],
    },
    {
      id: 'u1-t4-p2',
      title: 'Variable Address Printer',
      topicId: 'u1-t4',
      difficulty: 'beginner',
      problemStatement: 'Declare three variables of different types (int, float, char). Print each variable\'s value, size (using sizeof), and memory address.',
      constraints: ['Use %p for addresses', 'Use %zu for sizeof results', 'Cast address to (void *) for clean compilation'],
      sampleInput: '',
      sampleOutput: 'int:   value=42, size=4, addr=0x7ffd...\nfloat: value=3.14, size=4, addr=0x7ffd...\nchar:  value=A, size=1, addr=0x7ffd...',
      hints: ['Use & to get address', 'Use (void *)&var for the %p format specifier'],
      solution: '#include <stdio.h>\n\nint main(void) {\n    int i = 42;\n    float f = 3.14f;\n    char c = \'A\';\n    printf("int:   value=%d, size=%zu, addr=%p\\n", i, sizeof(i), (void *)&i);\n    printf("float: value=%.2f, size=%zu, addr=%p\\n", f, sizeof(f), (void *)&f);\n    printf("char:  value=%c, size=%zu, addr=%p\\n", c, sizeof(c), (void *)&c);\n    return 0;\n}',
      solutionExplanation: 'Combines three concepts: values, sizeof, and memory addresses. The addresses will differ on each run because the OS assigns different memory locations.',
      dryRun: [
        { step: 1, line: 4, variables: { i: '42', f: '?', c: '?' }, output: '', explanation: 'Declare and initialize i.' },
        { step: 2, line: 7, variables: { i: '42', f: '3.14', c: 'A' }, output: 'int:   value=42, size=4, addr=0x...', explanation: 'Print i details.' },
      ],
      tags: ['sizeof', 'address', 'types'],
    },
    {
      id: 'u1-t4-p3',
      title: 'Swap Without Temp (XOR Trick)',
      topicId: 'u1-t4',
      difficulty: 'intermediate',
      problemStatement: 'Swap two integer variables WITHOUT using a temporary variable. Use the XOR bitwise trick or arithmetic trick.',
      constraints: ['Must not declare any extra variables', 'Must work for all integer values', 'Print before and after swapping'],
      sampleInput: '15 25',
      sampleOutput: 'Before: a=15, b=25\nAfter: a=25, b=15',
      hints: ['XOR trick: a ^= b; b ^= a; a ^= b;', 'Arithmetic trick: a = a + b; b = a - b; a = a - b;', 'The arithmetic trick can overflow for large numbers'],
      solution: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    printf("Before: a=%d, b=%d\\n", a, b);\n    a = a ^ b;\n    b = a ^ b;\n    a = a ^ b;\n    printf("After: a=%d, b=%d\\n", a, b);\n    return 0;\n}',
      solutionExplanation: 'XOR swap: a^=b stores combined info in a. b^=a extracts original a into b. a^=b extracts original b into a. No temporary variable needed. This is a classic interview question.',
      dryRun: [
        { step: 1, line: 6, variables: { a: '15', b: '25' }, output: '', explanation: 'Read a=15, b=25.' },
        { step: 2, line: 8, variables: { a: '22', b: '25' }, output: '', explanation: 'a = 15 ^ 25 = 22 (binary: 01111 ^ 11001 = 10110).' },
        { step: 3, line: 9, variables: { a: '22', b: '15' }, output: '', explanation: 'b = 22 ^ 25 = 15. b now has original a.' },
        { step: 4, line: 10, variables: { a: '25', b: '15' }, output: '', explanation: 'a = 22 ^ 15 = 25. a now has original b. Swap complete!' },
      ],
      tags: ['xor', 'swap', 'bitwise'],
    },
  ],
};
