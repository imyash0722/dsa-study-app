import type { Topic } from '../../../../types';

export const commandLineArgs: Topic = {
  id: 'u3-t3',
  unitId: 'unit-3',
  title: 'Command Line Arguments',
  slug: 'command-line-args',
  description: `Command-line arguments are the critical gateway between the operating system's shell and your C program — the mechanism through which the user injects external data into the program before execution begins. When you type ./myprogram input.txt 42 in a terminal, the shell tokenises this command string into three separate arguments, allocates memory for each string, and passes them to your program's main function via the argc (argument count) and argv (argument vector) parameters.

Understanding the memory layout of argc and argv is essential. argc is a simple integer indicating how many arguments were provided (always at least 1, because argv[0] is the program's own name). argv is an array of char pointers (char *argv[]), where each element points to a null-terminated string representing one argument. argv[0] is the program name, argv[1] is the first user argument, and so on through argv[argc-1]. The array is null-terminated: argv[argc] is guaranteed to be NULL, providing an alternative iteration sentinel.

Because all command-line arguments arrive as strings (character arrays), numeric arguments must be explicitly converted using functions like atoi() (ASCII to integer), atof() (ASCII to float), or the safer strtol()/strtod() variants that provide error detection. Forgetting this conversion and attempting to use argv[1] as a number directly is a type error that the compiler may not catch. Proper defensive programming also requires checking argc before accessing argv elements — accessing argv[2] when the user provided only one argument reads a NULL pointer, causing undefined behaviour. This topic provides the foundation for writing command-line utilities that follow the Unix philosophy of composable, scriptable programs.`,
  difficulty: 'intermediate',
  prerequisites: ['u3-t1', 'u2-t5'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u3-t3-s1',
      title: 'Understanding argc and argv',
      slug: 'argc-and-argv',
      description: `When you execute a compiled C program from the terminal (e.g., ./myprogram -v input.txt), the operating system captures the entire command string, splits it into individual whitespace-delimited tokens, allocates memory for each token as a null-terminated string, and passes them to your program's main function through two parameters: int argc (argument count — the total number of tokens, including the program's own name) and char *argv[] (argument vector — an array of pointers to the token strings). For the command ./myprogram -v input.txt, argc is 3 and argv contains {"./myprogram", "-v", "input.txt"}.

The argv array is guaranteed by the C standard to have argc + 1 elements, where the last element (argv[argc]) is always a NULL pointer. This NULL sentinel allows you to iterate through the arguments using either a counted for loop (for (int i = 0; i < argc; i++)) or a pointer-walking loop (while (*argv != NULL)). The first element, argv[0], always contains the name (or path) by which the program was invoked, which is useful for printing usage messages (fprintf(stderr, "Usage: %s [options] file\n", argv[0])). The actual user-supplied arguments start at argv[1].

This mechanism is the foundation of every command-line utility in Unix and Windows: gcc, ls, grep, git, curl, and thousands more all receive their inputs through argc and argv. Understanding this interface means understanding how to build professional tools that accept file paths, flags, options, and configuration parameters. It also connects to deeper C concepts: argv is an array of pointers (char *argv[] or equivalently char **argv), each pointing to a separately allocated null-terminated string, making it one of the most practical exercises in double-pointer and string manipulation.`,
      keyPoints: [
        'The Signature: `int main(int argc, char *argv[])` represents the OS-to-Program bridge.',
        '`argc` (Argument Count): A strict integer representing the total number of distinct strings passed. Crucially, this count ALWAYS includes the name of the executable itself.',
        '`argv` (Argument Vector): An array of String Pointers (`char *`). Each pointer targets the memory address of one specific parsed argument string.',
        'The Executable Anchor: `argv[0]` is mathematically guaranteed to contain the name/path of the executable being launched (e.g., `./app`).',
        'User Payloads: The actual user-provided arguments begin at index `argv[1]` and terminate at index `argv[argc - 1]`.',
        'The NULL Terminator: By strict C standard definition, the memory slot immediately following the final argument (`argv[argc]`) is always a explicit `NULL` pointer.',
      ],
      codeExamples: [
        {
          id: 'u3-t3-s1-ex1',
          title: 'Printing All Arguments',
          code: '#include <stdio.h>\n\n/* Run from terminal: ./program hello world 123 */\nint main(int argc, char *argv[]) {\n    printf("Total arguments (argc): %d\\n\\n", argc);\n    \n    for (int i = 0; i < argc; i++) {\n        printf("argv[%d]: %s\\n", i, argv[i]);\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This loop forms the backbone of all argument parsing. The OS mechanically tokenizes the input string `./program hello world 123` based on spaces, yielding 4 distinct tokens. It passes `argc = 4`. The `for` loop efficiently walks the array of pointers, extracting each string. Notice how the number "123" is strictly treated as a text string, not an integer.',
          expectedOutput: 'Total arguments (argc): 4\n\nargv[0]: ./program\nargv[1]: hello\nargv[2]: world\nargv[3]: 123',
          lineBreakdown: [
            { lineNumber: 4, code: 'int main(int argc, char *argv[]) {', explanation: 'The strict architectural signature required to intercept OS arguments.' },
            { lineNumber: 8, code: '        printf("argv[%d]: %s\\n", i, argv[i]);', explanation: 'Because `argv` is an array of pointers to `char` arrays, the `%s` format specifier correctly resolves them into readable text.' },
          ],
          relatedTopicIds: ['u2-t5'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t3-s1-cm1',
          title: 'Accessing arguments without checking argc',
          wrongCode: 'int main(int argc, char *argv[]) {\n    printf("Hello %s", argv[1]);\n}',
          correctCode: 'int main(int argc, char *argv[]) {\n    if (argc < 2) {\n        printf("Usage: ./program <name>\\n");\n        return 1;\n    }\n    printf("Hello %s", argv[1]);\n}',
          explanation: 'This is the most notorious security flaw in beginner C code. If the user executes the program bare (`./program`), the OS sets `argc` to `1`. Consequently, `argv[1]` contains an uninitialized or `NULL` pointer. Passing a `NULL` memory address into `printf("%s")` forces the CPU to attempt reading memory address 0x0, which instantly triggers a fatal Segmentation Fault. You must ALWAYS employ defensive programming by mathematically asserting `argc` before ever daring to access `argv`.',
          consequence: 'Violent Segmentation Fault when the user fails to provide the expected number of arguments.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t3-s1-ic1',
          title: 'char *argv[] vs char **argv',
          content: 'In professional codebases, you will almost exclusively see the signature written as `int main(int argc, char **argv)`. Why? Because in C function parameters, an array of pointers (`char *argv[]`) mathematically decays into a double pointer: a pointer to a pointer (`char **argv`). The compiler treats both signatures identically. Understanding this pointer decay is a classic benchmark in technical interviews.',
          relatedTopicIds: ['u2-t4'],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t3-s1-cp1',
          title: 'argc and argv Basics',
          description: 'Verify your architectural understanding of the OS-to-Program bridge.',
          criteria: [
            'Defend why `argv[0]` is reserved for the executable name rather than user data.',
            'Mechanically trace the value of `argc` if a user executes `./app --verbose file.txt`.',
            'Explain the catastrophic memory consequences of accessing `argv[1]` without an `argc` assertion.',
          ],
          topicId: 'u3-t3',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t3-s1-rc1',
          front: 'What does `argc` stand for and what does it count?',
          back: 'Argument Count. A strict integer representing the total number of parsed text tokens passed by the OS, explicitly including the execution command itself.',
          topicId: 'u3-t3',
          tags: ['cli', 'argc'],
        },
        {
          id: 'u3-t3-s1-rc2',
          front: 'What is guaranteed to be at `argv[argc]`?',
          back: 'A `NULL` pointer. This provides an alternative way to loop through arguments using a while loop until you hit `NULL`.',
          topicId: 'u3-t3',
          tags: ['cli', 'argv'],
        },
      ],
    },
    {
      id: 'u3-t3-s2',
      title: 'Converting String Arguments to Numbers',
      slug: 'converting-args',
      description: `All command-line arguments arrive in argv as null-terminated strings, regardless of what they look like to the human eye. If you type ./calc 42 3.14, the strings "42" and "3.14" are passed — not the integer 42 or the floating-point value 3.14. Before your program can perform any arithmetic on these values, it must explicitly convert them from their ASCII string representation to binary numeric types using the standard library functions atoi (ASCII to integer), atof (ASCII to float/double), or the more robust strtol and strtod.

atoi(argv[1]) parses the string "42" character by character, computing the mathematical value 4*10 + 2 = 42, and returns it as an int. atof works similarly for floating-point numbers. However, atoi and atof have a critical weakness: they provide no error detection. If the user types "abc" instead of a number, atoi silently returns 0, which is indistinguishable from the valid input "0". The more robust alternatives, strtol and strtod, accept an additional pointer parameter (the endptr) that points to the first character in the input string that could not be parsed. If endptr points to the null terminator after the call, the entire string was successfully converted; if it points to a character in the middle of the string, the conversion stopped at that point, indicating malformed input.

Production-quality CLI programs must also validate argc before accessing argv elements. If your program expects exactly two numeric arguments and the user provides only one, accessing argv[2] reads past the end of the array (one past the NULL sentinel), producing undefined behavior. The standard defensive pattern is to check argc first (if (argc != 3) { fprintf(stderr, "Usage: %s num1 num2\\n", argv[0]); return 1; }) and only then proceed to parse argv[1] and argv[2]. This argument validation is non-negotiable in any program intended for use outside of controlled tutorial environments.`,
      keyPoints: [
        'The Standard Library: All foundational parsing architecture resides within the `<stdlib.h>` header.',
        'ASCII to Integer: `atoi(string)` translates a text string into a 32-bit `int`.',
        'ASCII to Float: `atof(string)` translates a text string into a 64-bit `double`.',
        'The Silent Failure Threat: `atoi` and `atof` provide absolutely zero error handling. If you pass "hello" to `atoi`, it silently returns `0`. If you pass a massive number that overflows the 32-bit limit, it fails silently. This makes them dangerous for production code.',
        'The Professional Standard: For rigorous parsing, engineers use `strtol` (String to Long) or `strtod` (String to Double). These functions expose robust error-checking pointer mathematics to catch invalid text and overflows.',
      ],
      codeExamples: [
        {
          id: 'u3-t3-s2-ex1',
          title: 'Command Line Calculator (Addition)',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\n/* Run: ./calc 15 25 */\nint main(int argc, char *argv[]) {\n    /* 1. Validate argument count */\n    if (argc != 3) {\n        printf("Usage: ./calc <num1> <num2>\\n");\n        return 1; /* Return non-zero to indicate error */\n    }\n    \n    /* 2. Convert strings to integers */\n    int a = atoi(argv[1]);\n    int b = atoi(argv[2]);\n    \n    /* 3. Perform math */\n    int sum = a + b;\n    printf("%d + %d = %d\\n", a, b, sum);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This demonstrates the complete lifecycle of a robust CLI utility. Step 1: Defensively assert the exact `argc` value to prevent Segmentation Faults. Step 2: Route the raw text pointers (`argv[1]` and `argv[2]`) through the `atoi` parsing engine to extract mathematical integers. Step 3: Execute the calculation.',
          expectedOutput: '15 + 25 = 40',
          lineBreakdown: [
            { lineNumber: 7, code: '    if (argc != 3) {', explanation: 'The defensive assertion. We demand exactly 3 tokens: the program path, num1, and num2.' },
            { lineNumber: 13, code: '    int a = atoi(argv[1]);', explanation: 'The parsing engine dynamically converts the raw ASCII string into a binary integer.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t3-s2-cm1',
          title: 'Doing math directly on argv strings',
          wrongCode: 'int sum = argv[1] + argv[2];',
          correctCode: 'int sum = atoi(argv[1]) + atoi(argv[2]);',
          explanation: '`argv[1]` and `argv[2]` are NOT numbers; they are `char *` pointers representing memory addresses holding text. Instructing the CPU to perform binary addition on two memory addresses is mathematically illegal in C and instantly halts compilation. You must utilize parsing functions to bridge the gap between text and mathematical types.',
          consequence: 'Fatal compiler error (`invalid operands to binary +`).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t3-s2-ic1',
          title: 'atoi vs strtol',
          content: 'The "Silent Failure" of `atoi` is a highly tested interview concept. If you propose `atoi` in an architecture interview, expect the question: "What happens if a user maliciously inputs alphabetical text?" You must articulate that `atoi` blindly returns `0`, making it impossible to distinguish between the user actually typing "0" and a parsing failure. You must specify that `strtol` is the industry standard because it updates an end-pointer, allowing the developer to mathematically verify if the entire string was successfully consumed as a valid number.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t3-s2-cp1',
          title: 'String to Number Conversion',
          description: 'Verify your mastery of parsing engines and their critical flaws.',
          criteria: [
            'Identify the required header file to unlock `atoi` and `atof`.',
            'Mechanically explain the security flaw regarding `atoi`\'s return value when parsing invalid text.',
            'Write the exact C expression to extract a 64-bit floating-point value from `argv[2]`.',
          ],
          topicId: 'u3-t3',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t3-s2-rc1',
          front: 'What does `atoi` do and what library is it in?',
          back: 'Translates an ASCII string directly into a binary integer. It resides in `<stdlib.h>`.',
          topicId: 'u3-t3',
          tags: ['cli', 'atoi', 'stdlib'],
        },
        {
          id: 'u3-t3-s2-rc2',
          front: 'What does `atoi` return if the string contains no numbers (e.g., "hello")?',
          back: 'It silently returns `0`. This is a critical architectural flaw because the program cannot differentiate between a legitimate user input of "0" and a complete parsing failure.',
          topicId: 'u3-t3',
          tags: ['cli', 'atoi', 'errors'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t3-q1',
      type: 'mcq',
      topicId: 'u3-t3',
      difficulty: 'beginner',
      question: 'If a user runs: `./copy source.txt dest.txt`, what is the value of `argc`?',
      options: ['2', '3', '4', '1'],
      correctAnswer: '3',
      explanation: 'argv[0] is "./copy", argv[1] is "source.txt", and argv[2] is "dest.txt". Total count is 3.',
      tags: ['cli', 'argc'],
    },
    {
      id: 'u3-t3-q2',
      type: 'predict-output',
      topicId: 'u3-t3',
      difficulty: 'intermediate',
      question: 'Assume the program is executed as `./app 10 20`. What is the output?',
      code: '#include <stdio.h>\n#include <stdlib.h>\nint main(int argc, char *argv[]) {\n    printf("%d", atoi(argv[1]) * 2);\n    return 0;\n}',
      correctAnswer: '20',
      explanation: 'argv[1] is the string "10". atoi("10") returns the integer 10. 10 * 2 = 20.',
      tags: ['cli', 'atoi'],
    },
    {
      id: 'u3-t3-q3',
      type: 'true-false',
      topicId: 'u3-t3',
      difficulty: 'beginner',
      question: 'The arguments in `argv` are passed as integers if the user types numbers in the terminal.',
      correctAnswer: false,
      explanation: 'The terminal strictly transmits data as ASCII character arrays (`char *`). Even if a string visually resembles a number (like "42"), the CPU sees it as a text array. Mathematical operations mandate explicit parsing via `<stdlib.h>`.',
      tags: ['cli', 'types'],
    },
    {
      id: 'u3-t3-q4',
      type: 'spot-bug',
      topicId: 'u3-t3',
      difficulty: 'intermediate',
      question: 'Spot the bug in this program designed to print the first argument:',
      code: 'int main(int argc, char *argv[]) {\n    printf("First arg: %s", argv[1]);\n    return 0;\n}',
      correctAnswer: 'Missing bounds check for argc.',
      explanation: 'Without asserting `argc >= 2`, launching the program naked (`./app`) results in `argv[1]` being an uninitialized NULL pointer. Forcing `printf` to dereference NULL guarantees an instant Segmentation Fault.',
      tags: ['cli', 'bounds-checking'],
    },
    {
      id: 'u3-t3-q5',
      type: 'mcq',
      topicId: 'u3-t3',
      difficulty: 'advanced',
      question: 'What is guaranteed to be true about `argv[argc]`?',
      options: [
        'It contains the newline character',
        'It is a NULL pointer',
        'It points to the last argument',
        'Accessing it causes a segmentation fault'
      ],
      correctAnswer: 'It is a NULL pointer',
      explanation: 'The C standard dictates that the `argv` array is always terminated by a NULL pointer at index `argc`.',
      tags: ['cli', 'argv'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t3-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t3',
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
      id: 'u3-t3-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t3',
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
      id: 'u3-t3-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t3',
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
      id: 'u3-t3-p1',
      title: 'Repeat String N Times',
      topicId: 'u3-t3',
      difficulty: 'beginner',
      problemStatement: 'Write a program that takes two command line arguments: a string and an integer N. The program should print the string N times. If the number of arguments is incorrect, print an error.',
      constraints: ['Validate argc == 3', 'Convert N using atoi'],
      sampleInput: './repeat Hello 3',
      sampleOutput: 'Hello\nHello\nHello\n',
      hints: ['if (argc != 3) { print error; return 1; }', 'int n = atoi(argv[2]);', 'for loop from 0 to n'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    if (argc != 3) {\n        printf("Usage: ./repeat <string> <count>\\n");\n        return 1;\n    }\n    \n    char *str = argv[1];\n    int n = atoi(argv[2]);\n    \n    for (int i = 0; i < n; i++) {\n        printf("%s\\n", str);\n    }\n    \n    return 0;\n}',
      solutionExplanation: 'This demonstrates the precise handling of disparate data types arriving via `argv`. The target string (`argv[1]`) requires zero manipulation, while the loop control boundary (`argv[2]`) is routed through `atoi` to become a functional integer.',
      dryRun: [
        { step: 1, line: 10, variables: { str: '"Hello"' }, output: '', explanation: 'argv[1] assigned to str.' },
        { step: 2, line: 11, variables: { n: '3' }, output: '', explanation: 'atoi("3") returns integer 3.' },
        { step: 3, line: 13, variables: { i: '0' }, output: 'Hello\\n', explanation: 'Loop starts. Prints string.' },
      ],
      tags: ['cli', 'atoi', 'loops'],
    },
    {
      id: 'u3-t3-p2',
      title: 'Average of N Numbers',
      topicId: 'u3-t3',
      difficulty: 'intermediate',
      problemStatement: 'Write a program that accepts any number of floating-point numbers as command-line arguments. Calculate and print their average. If no numbers are provided, print an error.',
      constraints: ['Can accept 1 to 100+ arguments', 'Use atof()'],
      sampleInput: './avg 10.5 20.0 5.5',
      sampleOutput: 'Average: 12.00',
      hints: ['If argc < 2, return error.', 'Loop from i = 1 to argc - 1', 'sum += atof(argv[i]);', 'Average is sum / (argc - 1)'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) {\n        printf("Please provide numbers to average.\\n");\n        return 1;\n    }\n    \n    double sum = 0.0;\n    int count = argc - 1;\n    \n    for (int i = 1; i < argc; i++) {\n        sum += atof(argv[i]);\n    }\n    \n    printf("Average: %.2f\\n", sum / count);\n    return 0;\n}',
      solutionExplanation: 'A classic demonstration of dynamic `argv` traversal. By starting the loop at index `1`, we elegantly bypass the executable name. The `atof` engine seamlessly parses fractional ASCII text into binary floating-point sums.',
      dryRun: [
        { step: 1, line: 11, variables: { count: '3' }, output: '', explanation: 'Assuming input 10.5 20.0 5.5. count is 4 - 1 = 3.' },
        { step: 2, line: 14, variables: { i: '1', sum: '10.5' }, output: '', explanation: 'sum += 10.5' },
        { step: 3, line: 14, variables: { i: '2', sum: '30.5' }, output: '', explanation: 'sum += 20.0' },
        { step: 4, line: 14, variables: { i: '3', sum: '36.0' }, output: '', explanation: 'sum += 5.5' },
        { step: 5, line: 17, variables: {}, output: 'Average: 12.00\\n', explanation: '36.0 / 3 = 12.00' },
      ],
      tags: ['cli', 'atof', 'loops'],
    },
    {
      id: 'u3-t3-p3',
      title: 'Find Longest Argument',
      topicId: 'u3-t3',
      difficulty: 'advanced',
      problemStatement: 'Write a program that takes any number of string arguments and prints the longest one. If there is a tie, print the first one. Do not use <string.h>, calculate length manually.',
      constraints: ['No library functions except printf'],
      sampleInput: './findcat cat elephant dog',
      sampleOutput: 'Longest: elephant',
      hints: ['Write a helper function int strLen(char *s)', 'Keep track of maxLen and maxIndex in a loop.'],
      solution: '#include <stdio.h>\n\nint strLen(char *str) {\n    int len = 0;\n    while (str[len] != \'\\0\') len++;\n    return len;\n}\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) return 1;\n    \n    int maxIndex = 1;\n    int maxLen = strLen(argv[1]);\n    \n    for (int i = 2; i < argc; i++) {\n        int currentLen = strLen(argv[i]);\n        if (currentLen > maxLen) {\n            maxLen = currentLen;\n            maxIndex = i;\n        }\n    }\n    \n    printf("Longest: %s\\n", argv[maxIndex]);\n    return 0;\n}',
      solutionExplanation: 'A brilliant synthesis of array traversal, parsing logic, and pointer mathematics. It anchors the initial maximum state to `argv[1]`, then systematically evaluates every subsequent string via a custom, raw `strLen` byte-counting implementation.',
      dryRun: [
        { step: 1, line: 12, variables: { maxIndex: '1', maxLen: '3' }, output: '', explanation: 'argv[1] is "cat" (len 3).' },
        { step: 2, line: 17, variables: { i: '2', currentLen: '8' }, output: '', explanation: 'argv[2] is "elephant" (len 8). 8 > 3.' },
        { step: 3, line: 18, variables: { maxIndex: '2', maxLen: '8' }, output: '', explanation: 'Update max values.' },
        { step: 4, line: 17, variables: { i: '3', currentLen: '3' }, output: '', explanation: 'argv[3] is "dog" (len 3). Not > 8. No change.' },
      ],
      tags: ['cli', 'strings', 'algorithms'],
    },
  ],
};
