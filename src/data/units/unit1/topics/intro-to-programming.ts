import type { Topic } from '../../../../types';

export const introToProgramming: Topic = {
  id: 'u1-t1',
  unitId: 'unit-1',
  title: 'Introduction to Programming',
  slug: 'intro-to-programming',
  description:
    `Programming is the discipline of expressing solutions to computational problems as precise, unambiguous sequences of instructions that a machine can execute. Before writing any C code, a programmer must develop the foundational mindset: the ability to decompose a complex problem into simple, atomic steps, to reason about the order in which those steps must execute, and to anticipate edge cases and failure modes that a human would handle intuitively but that a machine will mishandle catastrophically if not explicitly addressed.

This topic introduces that way of thinking through two complementary lenses. The first is the nature of programs themselves — what they are at the hardware level (sequences of binary-encoded machine instructions fetched, decoded, and executed by the CPU billions of times per second) and what they are at the human level (readable source code that a compiler translates into those machine instructions). The second lens is the discipline of algorithmic design: the practice of planning a solution's logic on paper using algorithms (finite, ordered sequences of well-defined steps) and flowcharts (visual diagrams using standardised symbols for input, processing, decisions, and output) before translating that logic into code.

The habit of designing and verifying an algorithm before writing code is the single most impactful practice a beginning programmer can adopt. It forces the programmer to confront logical gaps, missing edge cases, and ambiguous steps at the planning stage — when they are cheap to fix — rather than during debugging, when they are tangled in syntax and difficult to isolate.`,
  difficulty: 'beginner',
  prerequisites: [],
  estimatedMinutes: 45,

  subtopics: [
    {
      id: 'u1-t1-s1',
      title: 'What is a Program?',
      slug: 'what-is-a-program',
      description:
        `A program is a precise, unambiguous sequence of instructions that directs a computer to perform a specific computation or task. The computer itself is extraordinarily fast but has absolutely no judgment, no ability to infer intent, and no capacity to fill in missing details — it executes exactly the instructions it is given, in exactly the order specified, with no improvisation. This fundamental characteristic of computers shapes everything about programming: every step must be explicit, every condition must be anticipated, and every edge case must be handled, because the machine will follow your instructions literally even when they lead to nonsensical results.

At the hardware level, a program is a sequence of binary-encoded machine instructions stored in memory. The CPU fetches each instruction in sequence (unless a branch or jump instruction redirects it), decodes the instruction to determine what operation to perform (add, subtract, compare, load from memory, store to memory), executes the operation, and then advances to the next instruction. This fetch-decode-execute cycle repeats billions of times per second on modern processors. High-level languages like C exist to abstract away the binary encoding: instead of writing 10110000 01100001 to load a value into a register, you write int x = 97, and the compiler translates your readable notation into the corresponding machine instructions.

The discipline of programming therefore consists of two interlocking skills: problem decomposition (breaking a complex problem into a sequence of simple, concrete steps that a computer can execute) and precise expression (encoding those steps in a programming language's syntax with no ambiguity). Developing both skills requires practice, but the first — the ability to think algorithmically about problems before writing any code — is the more fundamental and transferable skill, applicable regardless of which programming language you eventually use.`,
      keyPoints: [
        'A program is a sequence of instructions that the CPU executes one after another, in the exact order you specify. The computer never skips ahead, never reorders your steps, and never decides that one of your instructions is unnecessary. This strict sequential execution is both the power and the challenge of programming — you have complete control, but you must be precise.',
        'Computers are breathtakingly fast but have zero intelligence. A modern CPU can perform billions of operations per second, yet it cannot understand what you "meant" — it can only follow what you wrote. If you forget a semicolon or misspell a function name, the computer will not helpfully figure out your intention. This is why programming rewards precision and attention to detail.',
        'Programs are written in programming languages like C, which are designed to be readable by humans while still being precise enough for a machine. However, the CPU does not understand C directly — it only understands machine code (binary instructions specific to your processor). A special program called a compiler translates your human-readable C code into machine code the CPU can execute.',
        'Nearly every useful program follows the input-process-output model. It takes some data in (from the keyboard, a file, or a sensor), performs computations on that data (calculations, comparisons, transformations), and produces a result (displayed on screen, written to a file, or sent over a network). Even a simple calculator follows this model: input two numbers, process them with addition, output the sum.',
        'The text you type in your editor is called source code — it is the human-readable version of your program. When you compile it with a tool like gcc, the compiler translates your source code through several stages (preprocessing, compilation, assembly, linking) into an executable binary file that your operating system can load and run. You never edit the binary directly; you always work with the source code and let the compiler handle the translation.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s1-ex1',
          title: 'Your First C Program — Hello World',
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'This is the simplest meaningful C program you can write, and it has been the traditional first program in almost every programming language since the 1970s. Despite its simplicity, it contains every structural element that every C program needs: an include directive to bring in library functionality, a main function where execution begins, a function call to produce output, and a return statement to signal completion. Take a moment to appreciate that even this five-line program involves the preprocessor, the compiler, the standard library, and the operating system all working together.',
          expectedOutput: 'Hello, World!',
          lineBreakdown: [
            { lineNumber: 1, code: '#include <stdio.h>', explanation: 'Includes the Standard I/O library so we can use printf.' },
            { lineNumber: 3, code: 'int main(void) {', explanation: 'Entry point of every C program. int means it returns an integer to the OS.' },
            { lineNumber: 4, code: '    printf("Hello, World!\\n");', explanation: 'Prints the text inside quotes. \\n moves cursor to next line.' },
            { lineNumber: 5, code: '    return 0;', explanation: 'Returns 0 to the operating system, meaning "program ran successfully".' },
            { lineNumber: 6, code: '}', explanation: 'Closing brace marks the end of the main function.' },
          ],
          relatedTopicIds: ['u1-t3'],
        },
        {
          id: 'u1-t1-s1-ex2',
          title: 'A Program That Adds Two Numbers',
          code: '#include <stdio.h>\n\nint main(void) {\n    int a = 10;\n    int b = 20;\n    int sum = a + b;\n    printf("Sum = %d\\n", sum);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program is a perfect illustration of the input-process-output model that underlies virtually all software. We define two inputs (the numbers a and b), perform a computation on them (addition), and produce an output (the printed sum). Notice how each step maps cleanly to a line of C code. This clarity is not an accident — well-written programs read almost like a recipe, where each line has a clear purpose that you can explain in plain English.',
          expectedOutput: 'Sum = 30',
          lineBreakdown: [
            { lineNumber: 1, code: '#include <stdio.h>', explanation: 'Include standard I/O for printf.' },
            { lineNumber: 3, code: 'int main(void) {', explanation: 'Program entry point.' },
            { lineNumber: 4, code: '    int a = 10;', explanation: 'Declares an integer variable a and sets it to 10.' },
            { lineNumber: 5, code: '    int b = 20;', explanation: 'Declares an integer variable b and sets it to 20.' },
            { lineNumber: 6, code: '    int sum = a + b;', explanation: 'Adds a and b, stores result in sum.' },
            { lineNumber: 7, code: '    printf("Sum = %d\\n", sum);', explanation: '%d is a placeholder that gets replaced by the value of sum.' },
            { lineNumber: 8, code: '    return 0;', explanation: 'Exit successfully.' },
          ],
          relatedTopicIds: ['u1-t4', 'u1-t9'],
        },
        {
          id: 'u1-t1-s1-ex3',
          title: 'Common Beginner Mistake — Missing Semicolon',
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("This will compile fine.\\n");\n    printf("Each statement ends with a semicolon.\\n");\n    return 0;\n}',
          language: 'c',
          explanation:
            'Every statement in C must end with a semicolon — it is how the compiler knows where one instruction ends and the next begins. Forgetting a semicolon is the single most common beginner error, and it is made more frustrating by the fact that the compiler typically reports the error on the line after the missing semicolon, not the line where the semicolon should be. This happens because the compiler does not realize the statement was supposed to end until it encounters something on the next line that does not make sense as a continuation. Once you understand this behavior, you will know to look at the previous line whenever you see an inexplicable syntax error.',
          expectedOutput: 'This will compile fine.\nEach statement ends with a semicolon.',
          lineBreakdown: [
            { lineNumber: 4, code: '    printf("This will compile fine.\\n");', explanation: 'Statement ends with semicolon — correct.' },
            { lineNumber: 5, code: '    printf("Each statement ends with a semicolon.\\n");', explanation: 'Also ends with semicolon — correct.' },
            { lineNumber: 6, code: '    return 0;', explanation: 'return is also a statement and needs a semicolon.' },
          ],
          relatedTopicIds: ['u1-t3'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s1-cm1',
          title: 'Forgetting the Semicolon',
          wrongCode: 'printf("Hello")\nreturn 0;',
          correctCode: 'printf("Hello");\nreturn 0;',
          explanation:
            'Every C statement must end with a semicolon, and this is the mistake you will make more than any other in your first weeks of programming. The reason it trips up beginners so badly is not just the missing character itself — it is the misleading error message. The compiler reads your code left to right, and when you forget the semicolon after printf("Hello"), it does not realize the statement should have ended there. It keeps reading into the next line (return 0;), tries to make sense of the combined text, and fails. So it reports the error on the return line, which looks perfectly fine to you. The lesson: when a line looks correct but the compiler complains about it, always check the line above for a missing semicolon.',
          consequence: 'The compiler produces a syntax error, but the error message typically points to the line after the missing semicolon rather than the actual problem line. This sends beginners on a frustrating hunt through code that looks perfectly correct, until they learn to check the preceding line.',
        },
        {
          id: 'u1-t1-s1-cm2',
          title: 'Using print instead of printf',
          wrongCode: 'print("Hello");',
          correctCode: 'printf("Hello");',
          explanation:
            'If you have any exposure to Python, your fingers will instinctively type print() instead of printf(). This happens because Python uses print as its output function, and muscle memory is powerful. But C has no function called print — its output function is printf, which stands for "print formatted." The "formatted" part is important: unlike Python, where print can handle almost any data type automatically, printf requires you to specify the exact format of your output using format specifiers like %d for integers and %f for floats. This extra precision is characteristic of C — the language always wants you to be explicit about what you mean.',
          consequence: 'The compiler produces an error about an "implicit declaration of function print" — meaning it has never heard of a function called print. If you see this error, it is almost certainly a Python habit sneaking through.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s1-ic1',
          title: 'What happens when you run a C program?',
          content:
            'When an interviewer asks "what happens when you run a C program," they want to hear the full pipeline, not just "it compiles and runs." The journey is: your source code first passes through the preprocessor (which handles #include directives and macros, producing a single expanded file), then the compiler translates this expanded C code into assembly language for your specific CPU architecture, then the assembler converts that assembly into machine code (an object file), and finally the linker combines your object file with library code (like the implementation of printf) to produce a complete executable. When you run this executable, the operating system loads it into RAM, sets up a stack for function calls, and begins executing from main(). Understanding this pipeline helps you debug at every stage — preprocessor errors look different from compiler errors, which look different from linker errors.',
          relatedTopicIds: ['u1-t3'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s1-cp1',
          title: 'Can You Write Hello World?',
          description: 'Verify you can write, compile, and run a basic C program.',
          criteria: [
            'Write a program that prints your name',
            'Compile it with gcc -o myname myname.c',
            'Run it with ./myname and see correct output',
            'Understand what each line does',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s1-rc1',
          front: 'What is a program?',
          back: 'A precise sequence of instructions written in a programming language that tells the computer exactly what to do.',
          topicId: 'u1-t1',
          tags: ['basics', 'definition'],
        },
        {
          id: 'u1-t1-s1-rc2',
          front: 'What does printf do in C?',
          back: 'printf (print formatted) outputs text to the console. It can insert variable values using format specifiers like %d, %f, %c.',
          topicId: 'u1-t1',
          tags: ['basics', 'io'],
        },
        {
          id: 'u1-t1-s1-rc3',
          front: 'What does return 0 mean in main()?',
          back: 'It tells the operating system that the program finished successfully. A non-zero return value signals an error.',
          topicId: 'u1-t1',
          tags: ['basics', 'main'],
        },
      ],
    },
    {
      id: 'u1-t1-s2',
      title: 'Algorithms and Flowcharts',
      slug: 'algorithms-and-flowcharts',
      description:
        `An algorithm is a finite, ordered sequence of well-defined steps that solves a specific computational problem, and it is the intellectual core of programming \u2014 the blueprint that must be designed and verified before a single line of code is written. The five formal properties of an algorithm, as defined in computer science, are: finiteness (it must terminate after a bounded number of steps), definiteness (each step must be precisely specified with no room for ambiguity), input (it accepts zero or more inputs), output (it produces at least one observable result), and effectiveness (every step must be simple enough to be carried out in finite time with pencil and paper). A procedure that violates any of these properties \u2014 most commonly finiteness, when a loop condition is never met \u2014 is not a valid algorithm.

Flowcharts provide a visual notation for expressing algorithms using standardised symbols: ovals mark start and stop points, parallelograms represent input and output operations, rectangles denote processing or computation steps, and diamonds indicate decision points where the flow branches based on a yes/no condition. Arrows connect these symbols to show the flow of execution, making branching logic, loop structures, and sequential flow visible at a glance in a way that pseudocode or prose descriptions cannot achieve as immediately.

The most valuable habit a beginning programmer can develop is to design and verify an algorithm on paper before writing any code. This planning step forces you to confront edge cases, identify missing logic, and clarify the sequence of operations before they become entangled in syntax details. Students who invest five minutes in planning consistently produce cleaner code that works on the first or second attempt, while students who jump directly into coding typically spend far longer debugging tangled logic that could have been prevented by systematic problem decomposition.`,
      keyPoints: [
        'An algorithm is a finite, ordered sequence of unambiguous steps that solves a specific problem. The word "finite" is crucial — an algorithm must eventually stop. An infinite loop is not an algorithm; it is a bug. Every algorithm takes some input (possibly none), performs a series of operations, and produces at least one output.',
        'Computer scientists define five essential properties of an algorithm: finiteness (it must terminate after a bounded number of steps), definiteness (each step must be precisely defined with no room for interpretation), input (it accepts zero or more inputs), output (it produces at least one result), and effectiveness (every step must be simple enough to be carried out exactly, in finite time, using pencil and paper). If your procedure violates any of these, it is not a proper algorithm.',
        'A flowchart translates the abstract steps of an algorithm into a visual diagram using standardized symbols: ovals mark the start and stop points, parallelograms represent input and output operations, rectangles show processing or computation steps, and diamonds indicate decision points where the flow branches based on a yes/no condition. Arrows connect these symbols to show the flow of execution. The beauty of a flowchart is that it makes branching and looping logic visible in a way that plain text cannot.',
        'The most valuable habit you can develop as a beginner is to plan your algorithm on paper before writing any code. This seems like a waste of time when the problem is simple, but it pays enormous dividends as problems get more complex. Students who jump straight into coding often end up with tangled logic and spend hours debugging, while students who spend five minutes planning write cleaner code that works on the first attempt. Planning forces you to confront edge cases and logical gaps before they become buried in syntax.',
        'Professional problem-solving follows a five-step process: first, understand the problem thoroughly by restating it in your own words; second, analyze the inputs and outputs to know exactly what data comes in and what results must come out; third, design an algorithm by breaking the problem into small, concrete steps; fourth, translate that algorithm into code; and fifth, test your program with multiple examples, including edge cases. Skipping any of these steps — especially the first two — is the most common source of bugs in student code.',
      ],
      codeExamples: [
        {
          id: 'u1-t1-s2-ex1',
          title: 'Algorithm to Code — Sum of Two Numbers',
          code: '/* Algorithm:\n   Step 1: Start\n   Step 2: Read two numbers a and b\n   Step 3: Calculate sum = a + b\n   Step 4: Print sum\n   Step 5: Stop\n*/\n#include <stdio.h>\n\nint main(void) {\n    int a, b, sum;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    sum = a + b;\n    printf("Sum = %d\\n", sum);\n    return 0;\n}',
          language: 'c',
          explanation:
            'This example demonstrates the direct mapping between a written algorithm and C code. Notice how each numbered step in the algorithm comment corresponds to one or two lines of actual C code. Step 2 ("Read two numbers") becomes a printf prompt followed by a scanf call. Step 3 ("Calculate sum") becomes a single arithmetic statement. This one-to-one correspondence is not a coincidence — it is the whole point of writing the algorithm first. When your algorithm is clear and detailed, translating it to code becomes almost mechanical.',
          expectedOutput: 'Enter two numbers: Sum = 30',
          lineBreakdown: [
            { lineNumber: 1, code: '/* Algorithm: ... */', explanation: 'The algorithm is written as a comment for documentation.' },
            { lineNumber: 11, code: '    int a, b, sum;', explanation: 'Declare three integer variables for our two inputs and the result.' },
            { lineNumber: 12, code: '    printf("Enter two numbers: ");', explanation: 'Prompt the user (Step 2 of algorithm).' },
            { lineNumber: 13, code: '    scanf("%d %d", &a, &b);', explanation: 'Read two integers from keyboard into a and b.' },
            { lineNumber: 14, code: '    sum = a + b;', explanation: 'Process step — compute the sum (Step 3).' },
            { lineNumber: 15, code: '    printf("Sum = %d\\n", sum);', explanation: 'Output step — display the result (Step 4).' },
          ],
          relatedTopicIds: ['u1-t4', 'u1-t9'],
        },
        {
          id: 'u1-t1-s2-ex2',
          title: 'Algorithm to Code — Find Maximum of Two Numbers',
          code: '#include <stdio.h>\n\nint main(void) {\n    int a, b;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    if (a > b) {\n        printf("Maximum = %d\\n", a);\n    } else {\n        printf("Maximum = %d\\n", b);\n    }\n    return 0;\n}',
          language: 'c',
          explanation:
            'This program introduces the most fundamental concept in programming: making decisions. Until now, every program executed every line in order from top to bottom. But real problems require the program to choose between different paths based on the data it receives. The if-else statement is how C expresses this choice — it evaluates a condition and executes one block of code if the condition is true, and a different block if it is false. In a flowchart, this decision point is drawn as a diamond with two outgoing arrows (yes and no), which maps perfectly to the two branches of an if-else in code.',
          expectedOutput: 'Enter two numbers: Maximum = 20',
          lineBreakdown: [
            { lineNumber: 7, code: '    if (a > b) {', explanation: 'Decision point: is a greater than b? This is the diamond in a flowchart.' },
            { lineNumber: 8, code: '        printf("Maximum = %d\\n", a);', explanation: 'Yes branch — a is larger.' },
            { lineNumber: 9, code: '    } else {', explanation: 'No branch — b is larger or equal.' },
            { lineNumber: 10, code: '        printf("Maximum = %d\\n", b);', explanation: 'Print b as the maximum.' },
          ],
          relatedTopicIds: ['u1-t8'],
        },
        {
          id: 'u1-t1-s2-ex3',
          title: 'Algorithm to Code — Check Even or Odd',
          code: '#include <stdio.h>\n\nint main(void) {\n    int num;\n    printf("Enter a number: ");\n    scanf("%d", &num);\n    if (num % 2 == 0) {\n        printf("%d is even\\n", num);\n    } else {\n        printf("%d is odd\\n", num);\n    }\n    return 0;\n}',
          language: 'c',
          explanation:
            'This is a classic beginner problem that elegantly demonstrates how mathematical reasoning translates into code. The key insight is that every even number is divisible by 2 with no remainder, while every odd number leaves a remainder of 1 when divided by 2. The modulo operator (%) gives you exactly this remainder. So num % 2 == 0 is a direct translation of the mathematical definition of "even" into C syntax. This pattern — expressing a real-world condition as a boolean expression — is something you will do constantly in programming.',
          expectedOutput: 'Enter a number: 7 is odd',
          lineBreakdown: [
            { lineNumber: 7, code: '    if (num % 2 == 0) {', explanation: '% gives remainder. If num divided by 2 has remainder 0, it is even.' },
            { lineNumber: 8, code: '        printf("%d is even\\n", num);', explanation: 'Print that the number is even.' },
            { lineNumber: 10, code: '        printf("%d is odd\\n", num);', explanation: 'Otherwise it is odd.' },
          ],
          relatedTopicIds: ['u1-t7', 'u1-t8'],
        },
      ],
      commonMistakes: [
        {
          id: 'u1-t1-s2-cm1',
          title: 'Using = instead of == in conditions',
          wrongCode: 'if (num % 2 = 0)',
          correctCode: 'if (num % 2 == 0)',
          explanation:
            'This is arguably the most dangerous single-character typo in all of C, and virtually every beginner makes it at least once. The confusion arises because in mathematics, the equals sign (=) means "is equal to," but in C, the single equals sign (=) means "assign this value." To test equality, C uses a double equals sign (==). So when you write if (num % 2 = 0), you are not asking "is the remainder equal to zero?" — you are telling C to assign 0 to the expression num % 2, which is not a valid target for assignment. Even if the compiler allowed it, the assigned value 0 would be treated as false, so the if-body would never execute regardless of the input.',
          consequence: 'Depending on the compiler, this either produces a cryptic error about "lvalue required" (because you cannot assign to the result of an expression), or if the left side happened to be a simple variable, the code compiles but silently produces wrong results — the condition always evaluates to the assigned value rather than performing a comparison.',
        },
        {
          id: 'u1-t1-s2-cm2',
          title: 'Writing algorithm steps that are too vague',
          wrongCode: '// Algorithm: Step 1 - Solve the problem',
          correctCode: '// Algorithm: Step 1 - Read integer n from user\n// Step 2 - If n % 2 == 0, print "even"\n// Step 3 - Else print "odd"',
          explanation:
            'This mistake reveals a misunderstanding about what an algorithm is supposed to do. An algorithm is not a summary of your intent — it is a recipe so detailed that someone with no understanding of the problem could follow it mechanically and still get the right answer. "Solve the problem" is not a step; it is the entire goal you are trying to achieve. A useful algorithm step would be something like "Read the integer n from the user" or "If n is divisible by 2, print even." The test for whether your algorithm is detailed enough is simple: could a ten-year-old who knows nothing about the problem follow your steps and get the correct answer? If not, break the vague steps down further.',
          consequence: 'A vague algorithm gives you no real guidance when you sit down to write code. You end up improvising the logic as you type, which leads to tangled control flow, forgotten edge cases, and programs that seem to work for one input but fail for others. The time you "saved" by skipping the planning phase is repaid tenfold in debugging.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u1-t1-s2-ic1',
          title: 'Algorithm vs Program — what is the difference?',
          content:
            'Interviewers ask this question to test whether you understand the separation of logic from syntax — a distinction that separates strong programmers from those who just memorize code patterns. An algorithm is a language-independent description of a solution: it describes the logic, the steps, the decisions, without committing to any particular programming language. A program is the concrete implementation of an algorithm in a specific language like C, Python, or Java. The same sorting algorithm (say, bubble sort) can be implemented in any language, and the resulting programs will look different but follow identical logic. This is why computer science courses teach algorithms separately from programming languages — the algorithm is the idea, and the program is just one possible expression of that idea. When you can articulate this distinction clearly, it signals to an interviewer that you think about problems at the right level of abstraction.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u1-t1-s2-cp1',
          title: 'Can You Write an Algorithm?',
          description: 'Verify you can break a problem into clear steps before coding.',
          criteria: [
            'Write an algorithm to find if a number is positive, negative, or zero',
            'Draw a flowchart with correct symbols for the same',
            'Convert your algorithm to C code',
            'Test with inputs: 5, -3, 0',
          ],
          topicId: 'u1-t1',
        },
      ],
      revisionCards: [
        {
          id: 'u1-t1-s2-rc1',
          front: 'What are the 5 properties of an algorithm?',
          back: 'Finiteness (must end), Definiteness (unambiguous steps), Input (zero or more), Output (at least one), Effectiveness (each step doable in finite time).',
          topicId: 'u1-t1',
          tags: ['algorithm', 'definition'],
        },
        {
          id: 'u1-t1-s2-rc2',
          front: 'What does the diamond symbol represent in a flowchart?',
          back: 'A decision/condition (yes/no or true/false). It maps to an if-else statement in C code.',
          topicId: 'u1-t1',
          tags: ['flowchart', 'symbols'],
        },
        {
          id: 'u1-t1-s2-rc3',
          front: 'What is the difference between = and == in C?',
          back: '= is the assignment operator (stores a value). == is the equality comparison operator (checks if two values are equal). Using = in a condition is a very common bug.',
          topicId: 'u1-t1',
          tags: ['operators', 'common-bug'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u1-t1-q1',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'Which of the following is NOT a property of an algorithm?',
      options: [
        'Finiteness — it must terminate after a finite number of steps',
        'Ambiguity — steps can be interpreted in multiple ways',
        'Definiteness — each step is precisely defined',
        'Effectiveness — each step can be carried out in finite time',
      ],
      correctAnswer: 'Ambiguity — steps can be interpreted in multiple ways',
      explanation:
        'An algorithm must be UNAMBIGUOUS (definite), not ambiguous. Every step must have exactly one meaning. The other three are genuine properties.',
      tags: ['algorithm', 'properties'],
    },
    {
      id: 'u1-t1-q2',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'In a flowchart, which symbol is used to represent a decision (yes/no condition)?',
      options: ['Rectangle', 'Oval', 'Diamond', 'Parallelogram'],
      correctAnswer: 'Diamond',
      explanation:
        'Diamond = decision (if/else). Rectangle = process/computation. Oval = start/stop. Parallelogram = input/output.',
      tags: ['flowchart', 'symbols'],
    },
    {
      id: 'u1-t1-q3',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'What is the output of this program?',
      code: '#include <stdio.h>\nint main(void) {\n    printf("Hello");\n    printf("World\\n");\n    return 0;\n}',
      correctAnswer: 'HelloWorld',
      explanation:
        'printf does NOT automatically add a newline. The first printf prints "Hello" and the cursor stays on the same line. The second printf prints "World" right next to it. Only the \\n at the end moves to the next line.',
      tags: ['printf', 'output'],
    },
    {
      id: 'u1-t1-q4',
      type: 'spot-bug',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'Find the bug in this program:',
      code: '#include <stdio.h>\nint main(void) {\n    printf("Sum = %d\\n", 5 + 3)\n    return 0;\n}',
      correctAnswer: 'Missing semicolon after the printf statement on line 3.',
      explanation:
        'Every C statement must end with a semicolon (;). The printf call on line 3 is missing its semicolon. The compiler will report an error, often pointing to line 4 (return), which confuses beginners.',
      tags: ['syntax', 'semicolon'],
    },
    {
      id: 'u1-t1-q5',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'What does return 0; in main() tell the operating system?',
      options: [
        'The program has an error',
        'The program finished successfully',
        'The program should restart',
        'The program used 0 bytes of memory',
      ],
      correctAnswer: 'The program finished successfully',
      explanation:
        'By convention, return 0 means success. Any non-zero value (like return 1) indicates an error. The OS can check this return value to decide what to do next.',
      tags: ['main', 'return-value'],
    },
    {
      id: 'u1-t1-q6',
      type: 'true-false',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'An algorithm must always be written in a programming language.',
      correctAnswer: false,
      explanation:
        'An algorithm is language-independent. It can be expressed in plain English, pseudocode, or flowcharts. A program is the implementation of an algorithm in a specific language like C.',
      tags: ['algorithm', 'definition'],
    },
    {
      id: 'u1-t1-q7',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      question: 'What does this program print?',
      code: '#include <stdio.h>\nint main(void) {\n    int x = 10;\n    int y = 3;\n    printf("%d\\n", x / y);\n    return 0;\n}',
      correctAnswer: '3',
      explanation:
        'When both operands of / are integers, C performs integer division and truncates the decimal part. 10 / 3 = 3.333... but since both x and y are int, the result is 3 (not 3.333).',
      tags: ['integer-division', 'operators'],
    },
  ],

  programmingProblems: [
    {
      id: 'u1-t1-new-easy',
      title: 'Armstrong Number Check',
      topicId: 'u1-t1',
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
      id: 'u1-t1-new-med',
      title: 'Factorial Calculation',
      topicId: 'u1-t1',
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
      id: 'u1-t1-new-hard',
      title: 'Diamond Pattern',
      topicId: 'u1-t1',
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
      id: 'u1-t1-p1',
      title: 'Print Your Name and University',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that prints your name on the first line and "PES University" on the second line.',
      constraints: ['Use printf for output', 'Each piece of text must be on its own line'],
      sampleInput: '',
      sampleOutput: 'Rahul\nPES University',
      hints: [
        'Use \\n inside the printf string to move to a new line',
        'You can use one printf with \\n in the middle, or two separate printf calls',
      ],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    printf("Rahul\\n");\n    printf("PES University\\n");\n    return 0;\n}',
      solutionExplanation:
        'Two printf calls, each ending with \\n to move to the next line. You could also do it in one: printf("Rahul\\nPES University\\n");',
      dryRun: [
        { step: 1, line: 4, variables: {}, output: 'Rahul\\n', explanation: 'printf outputs "Rahul" followed by a newline.' },
        { step: 2, line: 5, variables: {}, output: 'PES University\\n', explanation: 'printf outputs "PES University" followed by a newline.' },
        { step: 3, line: 6, variables: {}, output: '', explanation: 'return 0 ends the program successfully.' },
      ],
      tags: ['printf', 'basics'],
    },
    {
      id: 'u1-t1-p2',
      title: 'Calculate Area of a Rectangle',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that reads the length and breadth of a rectangle from the user and prints its area.',
      constraints: ['Length and breadth are positive integers', 'Use scanf to read input'],
      sampleInput: '5 3',
      sampleOutput: 'Area = 15',
      hints: [
        'Area = length × breadth',
        'Use %d format specifier for integers in both scanf and printf',
        'Remember the & before variable names in scanf',
      ],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    int length, breadth, area;\n    printf("Enter length and breadth: ");\n    scanf("%d %d", &length, &breadth);\n    area = length * breadth;\n    printf("Area = %d\\n", area);\n    return 0;\n}',
      solutionExplanation:
        'Read two integers, multiply them, print the result. This follows the exact 5-step process: understand (area formula), analyze (two integer inputs, one integer output), design (read → multiply → print), code, test.',
      dryRun: [
        { step: 1, line: 4, variables: { length: '?', breadth: '?', area: '?' }, output: '', explanation: 'Variables declared but uninitialized (garbage values).' },
        { step: 2, line: 6, variables: { length: '5', breadth: '3', area: '?' }, output: '', explanation: 'scanf reads 5 and 3 from input into length and breadth.' },
        { step: 3, line: 7, variables: { length: '5', breadth: '3', area: '15' }, output: '', explanation: 'area = 5 * 3 = 15.' },
        { step: 4, line: 8, variables: { length: '5', breadth: '3', area: '15' }, output: 'Area = 15', explanation: 'printf prints the computed area.' },
      ],
      tags: ['scanf', 'arithmetic', 'basics'],
    },
    {
      id: 'u1-t1-p3',
      title: 'Swap Two Numbers Using a Temp Variable',
      topicId: 'u1-t1',
      difficulty: 'beginner',
      problemStatement:
        'Write a C program that reads two integers, swaps their values using a temporary variable, and prints the values after swapping.',
      constraints: ['You must use a third variable (temp) for the swap', 'Print both values before and after swapping'],
      sampleInput: '10 20',
      sampleOutput: 'Before: a=10 b=20\nAfter: a=20 b=10',
      hints: [
        'Store one value in temp before overwriting it',
        'The order is: temp=a, a=b, b=temp',
        'If you do a=b first without saving a, the original value of a is lost forever',
      ],
      solution:
        '#include <stdio.h>\n\nint main(void) {\n    int a, b, temp;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    printf("Before: a=%d b=%d\\n", a, b);\n    temp = a;\n    a = b;\n    b = temp;\n    printf("After: a=%d b=%d\\n", a, b);\n    return 0;\n}',
      solutionExplanation:
        'The classic swap algorithm. We need temp because if we directly write a = b, we lose the original value of a. Think of it like swapping liquid between two glasses — you need a third glass.',
      dryRun: [
        { step: 1, line: 6, variables: { a: '10', b: '20', temp: '?' }, output: '', explanation: 'Read a=10, b=20 from input.' },
        { step: 2, line: 8, variables: { a: '10', b: '20', temp: '10' }, output: '', explanation: 'Save a in temp. temp = 10.' },
        { step: 3, line: 9, variables: { a: '20', b: '20', temp: '10' }, output: '', explanation: 'Copy b into a. a = 20.' },
        { step: 4, line: 10, variables: { a: '20', b: '10', temp: '10' }, output: '', explanation: 'Copy temp into b. b = 10. Swap complete!' },
        { step: 5, line: 11, variables: { a: '20', b: '10', temp: '10' }, output: 'After: a=20 b=10', explanation: 'Print swapped values.' },
      ],
      tags: ['swap', 'temp-variable', 'algorithm'],
    },
  ],
};
