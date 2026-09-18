import type { Topic } from '../../../../types';

export const arrayOfStructures: Topic = {
  id: 'u3-t7',
  unitId: 'unit-3',
  title: 'Array of Structures',
  slug: 'array-of-structures',
  description: `In real-world systems, data rarely exists in isolation: you do not process a single student, a single employee, or a single sensor reading — you process thousands. An array of structures combines the contiguous memory layout of arrays (enabling O(1) indexed access and excellent CPU cache performance) with the heterogeneous data grouping of structures (enabling each element to contain multiple fields of different types). This combination is the architectural foundation of every in-memory database, record-processing system, and list-based application in C.

When you declare Student roster[100], the compiler allocates a single contiguous block of 100 × sizeof(Student) bytes on the stack (or on the heap via malloc). The structures are laid out back-to-back with no gaps between elements (beyond any internal padding within each structure), and any element can be accessed in constant time via roster[i]. Accessing a specific field requires the two-step syntax roster[i].name — indexing the array first to select a specific structure, then applying the dot operator to access a member within that structure.

This data structure also introduces the practical challenge of sorting and searching structured records. When sorting an array of structures, the comparison targets a specific key field (e.g., roster[i].gpa > roster[j].gpa), but the swap must exchange entire structures — swapping only the key field would corrupt the data by detaching field values from their parent records. The standard library's qsort() function is particularly well-suited for this task, accepting a custom comparator function that can sort by any field without modifying the sorting algorithm itself.`,
  difficulty: 'intermediate',
  prerequisites: ['u2-t1', 'u3-t5'],
  estimatedMinutes: 45,
  subtopics: [
    {
      id: 'u3-t7-s1',
      title: 'Declaring and Accessing Array of Structs',
      slug: 'array-of-structs-basics',
      description: `An array of structures is a contiguous block of memory where each element is a complete structure instance. Declaring Student roster[100] allocates space for 100 consecutive Student structures, laid out end-to-end in memory with no gaps between elements (beyond any internal padding within each structure). This layout provides the same O(1) indexed access as a primitive array — roster[i] computes the address as base + i * sizeof(Student) and returns the i-th structure — while allowing each element to contain multiple fields of different types (name, age, grade, student ID).

This data structure is the C equivalent of a database table or a spreadsheet: each element is a record (row) containing multiple fields (columns). You initialize elements using either positional initializers (roster[0] = (Student){"Alice", 20, 3.8}) or by assigning to individual fields (roster[0].name = "Alice"; roster[0].age = 20). Because the elements are stored contiguously, iterating through the array with a simple for loop is extremely cache-friendly: the CPU prefetcher can predict the sequential memory access pattern and load upcoming elements into the cache before they are needed, resulting in high throughput.

The primary limitation of an array of structures is the same as any static array: its size must be known at compile time (or allocated dynamically with malloc), and resizing requires allocating a new array and copying all elements. For applications that need a fixed collection of structured records (a class roster, a configuration table, a set of menu items), arrays of structures are the natural and efficient choice. For applications that need frequent insertion and deletion, a linked list of structures may be more appropriate despite its cache performance disadvantage.`,
      keyPoints: [
        'Declaration syntax: `struct TypeName arrayName[size];` (or simply `TypeName arrayName[size];` if using a typedef).',
        'The Syntax Hierarchy: To access a member, you must resolve the array index FIRST to grab the specific struct, and THEN apply the dot operator to access the member: `array[i].member`.',
        'Memory Layout: The structures are laid out back-to-back in RAM. If `sizeof(struct)` is 32 bytes, `array[0]` occupies bytes 0-31, and `array[1]` instantly begins at byte 32. Any internal padding dictated by the CPU is perfectly preserved.',
        'Initialization: You can natively initialize an array of structs using nested curly braces: `{{...}, {...}, {...}}`.',
      ],
      codeExamples: [
        {
          id: 'u3-t7-s1-ex1',
          title: 'Student Database',
          code: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    float gpa;\n} Student;\n\nint main(void) {\n    /* Initialize array of 3 structs */\n    Student classList[3] = {\n        {101, 3.5},\n        {102, 3.8},\n        {103, 2.9}\n    };\n    \n    /* Iterate and print */\n    for (int i = 0; i < 3; i++) {\n        printf("Student %d: GPA = %.1f\\n", classList[i].id, classList[i].gpa);\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This demonstrates the mechanics of a rudimentary in-memory database. We define a `Student` structure and immediately allocate an array of 3 of them on the Stack. The loop iterates sequentially through the contiguous array memory. At each step `i`, `classList[i]` resolves to a complete `Student` object, allowing us to safely access the `.id` and `.gpa` fields.',
          expectedOutput: 'Student 101: GPA = 3.5\nStudent 102: GPA = 3.8\nStudent 103: GPA = 2.9',
          lineBreakdown: [
            { lineNumber: 10, code: '    Student classList[3] = {', explanation: 'Allocates a single, contiguous block of Stack memory large enough to hold exactly 3 `Student` structs.' },
            { lineNumber: 11, code: '        {101, 3.5},', explanation: 'Initializes the exact byte-layout of `classList[0]`.' },
            { lineNumber: 18, code: '        printf("... %d ...", classList[i].id, classList[i].gpa);', explanation: 'Operator precedence: `[i]` executes first to select the correct struct from the array, then `.id` accesses the member inside it.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t7-s1-cm1',
          title: 'Incorrect syntax order',
          wrongCode: 'classList.id[i] = 101; /* ERROR */',
          correctCode: 'classList[i].id = 101; /* Correct */',
          explanation: 'This is a universal beginner syntax trap. `classList` is the array. The array itself does not possess an `id` field. You must strictly adhere to the structural hierarchy: index the array FIRST to isolate a single student object (`classList[i]`), and THEN apply the dot operator to that specific object.',
          consequence: 'Compilation error (request for member \'id\' in something not a structure or union).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t7-s1-ic1',
          title: 'Memory Caching and Array of Structs (AoS) vs Struct of Arrays (SoA)',
          content: 'A high-level interview concept: An "Array of Structs" (AoS) places data in memory as `x,y,z, x,y,z`. If a system only needs to process the `x` values, the CPU wastes precious cache space loading the useless `y` and `z` bytes. In high-performance computing (like 3D game engines or physics simulations), engineers aggressively prefer a "Struct of Arrays" (SoA): `struct { int x[100]; int y[100]; };`. This ensures all `x` values are perfectly contiguous, maximizing CPU cache efficiency.',
          relatedTopicIds: [],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t7-s1-cp1',
          title: 'Array of Structs Basics',
          description: 'Verify your understanding of array syntax and hierarchical data access.',
          criteria: [
            'Write the exact syntax required to declare a stack array of 50 `Book` structs.',
            'Explain the operator precedence required to correctly access the `price` member of the 3rd book in the array.',
          ],
          topicId: 'u3-t7',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t7-s1-rc1',
          front: 'In an array of structures named `arr`, what is the exact syntax to access `memberX` of the element at index `i`?',
          back: '`arr[i].memberX` (The array index bracket `[i]` MUST execute before the dot operator `.`)',
          topicId: 'u3-t7',
          tags: ['structs', 'arrays'],
        },
      ],
    },
    {
      id: 'u3-t7-s2',
      title: 'Searching and Sorting Arrays of Structs',
      slug: 'searching-sorting-struct-arrays',
      description: `The standard algorithms you learn for primitive arrays \u2014 linear search, binary search, bubble sort, selection sort, insertion sort \u2014 all transfer directly to arrays of structures with one critical modification: you must specify which structure member serves as the key field for comparison. When sorting an array of integers, the comparison arr[j] > arr[j+1] is self-evident. When sorting an array of Student structures, you must decide whether to sort by name (alphabetically, using strcmp), by age (numerically, using > or <), by GPA (floating-point comparison), or by student ID. The algorithm's control flow (loops, swaps, boundary conditions) remains identical; only the comparison expression changes.

When swapping elements during sorting, the entire structure is swapped, not just the key field. The three-line swap pattern (Student temp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = temp) copies the full structure contents, which can be expensive for large structures. For arrays of very large structures, a common optimization is to sort an array of pointers to the structures instead of sorting the structures themselves \u2014 swapping two 8-byte pointers is dramatically faster than swapping two 200-byte structures.

Searching follows the same principle: linear search iterates through the array comparing a specific field of each element to the target (e.g., strcmp(roster[i].name, target) == 0 for name-based search), and binary search requires the array to be pre-sorted by the search key. The qsort function from <stdlib.h> is particularly useful for arrays of structures, because its callback-based comparison function lets you sort by any field without modifying the sorting algorithm itself \u2014 you simply write a comparator function that accesses the appropriate member through a pointer cast.`,
      keyPoints: [
        'Searching: You iterate over the array, but evaluate your condition against a specific member (e.g., `if (array[i].id == target)`).',
        'Sorting: When sorting, the comparison evaluates a specific key (`array[i].score < array[j].score`).',
        'THE CRITICAL SWAP RULE: When your sorting algorithm decides a swap is necessary, you MUST swap the ENTIRE struct physically (`array[i] = array[j]`). Never swap just the individual sorting keys, or you will irreparably corrupt the database.',
      ],
      codeExamples: [
        {
          id: 'u3-t7-s2-ex1',
          title: 'Sorting Students by GPA (Bubble Sort)',
          code: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    float gpa;\n} Student;\n\nint main(void) {\n    Student classList[3] = {{101, 3.2}, {102, 3.9}, {103, 3.5}};\n    int n = 3;\n    \n    /* Bubble sort by GPA (Descending) */\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (classList[j].gpa < classList[j + 1].gpa) {\n                /* Swap the ENTIRE struct, not just the GPA! */\n                Student temp = classList[j];\n                classList[j] = classList[j + 1];\n                classList[j + 1] = temp;\n            }\n        }\n    }\n    \n    for(int i=0; i<n; i++) {\n        printf("ID: %d, GPA: %.1f\\n", classList[i].id, classList[i].gpa);\n    }\n    return 0;\n}',
          language: 'c',
          explanation: 'Observe the separation of logic. The `if` statement evaluates the `.gpa` field to determine ordering. However, the swap block executes a physical swap of `classList[j]`, moving the entire 8-byte structure in memory. If we had incorrectly swapped only the GPAs, the physical student IDs would remain static, resulting in student 101 incorrectly stealing student 102\'s GPA. Swapping the entire object maintains the integrity of the data record.',
          expectedOutput: 'ID: 102, GPA: 3.9\nID: 103, GPA: 3.5\nID: 101, GPA: 3.2',
          lineBreakdown: [
            { lineNumber: 15, code: '            if (classList[j].gpa < classList[j + 1].gpa) {', explanation: 'The algorithm compares only the specific sorting key.' },
            { lineNumber: 17, code: '                Student temp = classList[j];', explanation: 'The algorithm physically moves the entire structure in memory, ensuring the ID and GPA remain securely linked.' },
          ],
          relatedTopicIds: ['u2-t11'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t7-s2-cm1',
          title: 'Swapping only the sorting key',
          wrongCode: 'float temp = classList[j].gpa;\nclassList[j].gpa = classList[j+1].gpa;\nclassList[j+1].gpa = temp;',
          correctCode: 'Student temp = classList[j];\nclassList[j] = classList[j+1];\nclassList[j+1] = temp;',
          explanation: 'This is the most dangerous logical error when sorting structs. If you only swap the `gpa` members, the underlying memory is corrupted. The student IDs stay physically locked in their original memory slots, while their grades are shuffled around them. You must strictly swap the complete, overarching object.',
          consequence: 'Catastrophic database corruption (mismatched records).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t7-s2-ic1',
          title: 'qsort with Structs',
          content: 'In professional production systems, you will never write Bubble Sort. You will utilize C\'s built-in `<stdlib.h>` `qsort` function. Interviewers will frequently ask you to write a custom comparator function for `qsort` designed to sort an array of structs. To succeed, you must demonstrate the ability to mathematically cast the incoming `const void*` arguments into your specific struct pointer type, and correctly utilize the arrow (`->`) operator to evaluate the sorting fields.',
          relatedTopicIds: ['u2-t7'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t7-s2-cp1',
          title: 'Sorting Structs',
          description: 'Verify your understanding of safe sorting mechanics for complex objects.',
          criteria: [
            'When executing a Bubble Sort on an array of structs ordered by age, what specific data do you compare inside the `if` statement?',
            'What exact variables must physically be swapped inside the swap block to maintain data integrity?',
          ],
          topicId: 'u3-t7',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t7-s2-rc1',
          front: 'When sorting an array of structs based on a specific internal field, what exactly must be swapped during the swap phase?',
          back: 'The ENTIRE struct must be physically swapped (`arr[j] = arr[j+1]`), NEVER just the isolated field. Failure to swap the whole object corrupts the record.',
          topicId: 'u3-t7',
          tags: ['structs', 'sorting'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t7-q1',
      type: 'mcq',
      topicId: 'u3-t7',
      difficulty: 'beginner',
      question: 'Given `Student db[100];`, how do you access the age of the 5th student?',
      options: [
        'db.age[4]',
        'db[4].age',
        'db[5].age',
        'Student[4].age'
      ],
      correctAnswer: 'db[4].age',
      explanation: 'Array indices are 0-based, so the 5th student is `db[4]`. We then use `.age` to access the field.',
      tags: ['structs', 'arrays', 'syntax'],
    },
    {
      id: 'u3-t7-q2',
      type: 'spot-bug',
      topicId: 'u3-t7',
      difficulty: 'intermediate',
      question: 'Spot the bug in this linear search:',
      code: 'for(int i=0; i<10; i++) {\n    if(db.id[i] == target) return i;\n}',
      correctAnswer: 'db.id[i] is incorrect syntax.',
      explanation: '`db` is the array. It must be indexed first. It should be `db[i].id == target`.',
      tags: ['structs', 'arrays', 'searching'],
    },
    {
      id: 'u3-t7-q3',
      type: 'true-false',
      topicId: 'u3-t7',
      difficulty: 'beginner',
      question: 'You can initialize an array of structs using nested curly braces at the time of declaration.',
      correctAnswer: true,
      explanation: 'Yes, e.g., `Point arr[2] = {{1, 2}, {3, 4}};` is perfectly valid.',
      tags: ['structs', 'initialization'],
    },
    {
      id: 'u3-t7-q4',
      type: 'predict-output',
      topicId: 'u3-t7',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: '#include <stdio.h>\ntypedef struct { int x; int y; } Point;\nint main() {\n    Point p[2] = {{10, 20}, {30, 40}};\n    p[0] = p[1];\n    printf("%d", p[0].x);\n    return 0;\n}',
      correctAnswer: '30',
      explanation: '`p[0] = p[1]` copies the entire struct from index 1 to index 0. Therefore `p[0].x` becomes 30.',
      tags: ['structs', 'assignment'],
    },
    {
      id: 'u3-t7-q5',
      type: 'mcq',
      topicId: 'u3-t7',
      difficulty: 'advanced',
      question: 'If `sizeof(Student)` is 20 bytes, how many bytes does `Student db[10];` consume on the stack?',
      options: ['10', '20', '200', '210'],
      correctAnswer: '200',
      explanation: 'An array of 10 elements, where each element is 20 bytes, takes 10 * 20 = 200 bytes.',
      tags: ['structs', 'memory', 'size'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t7-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t7',
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
      id: 'u3-t7-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t7',
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
      id: 'u3-t7-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t7',
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
      id: 'u3-t7-p1',
      title: 'Highest Salary Employee',
      topicId: 'u3-t7',
      difficulty: 'beginner',
      problemStatement: 'Define an `Employee` struct with `id` (int) and `salary` (float). Create an array of 3 employees with hardcoded data. Use a loop to find and print the ID of the employee with the highest salary.',
      constraints: ['Use an array of structs', 'Linear scan for max'],
      sampleInput: '',
      sampleOutput: 'Highest earner ID: 2 (Salary: 85000.00)',
      hints: ['Maintain `float max_sal` and `int max_id` variables during the loop.'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    float salary;\n} Employee;\n\nint main(void) {\n    Employee staff[3] = {\n        {1, 55000.0},\n        {2, 85000.0},\n        {3, 72000.0}\n    };\n    \n    float max_sal = staff[0].salary;\n    int max_id = staff[0].id;\n    \n    for (int i = 1; i < 3; i++) {\n        if (staff[i].salary > max_sal) {\n            max_sal = staff[i].salary;\n            max_id = staff[i].id;\n        }\n    }\n    \n    printf("Highest earner ID: %d (Salary: %.2f)\\n", max_id, max_sal);\n    return 0;\n}',
      solutionExplanation: 'A standard "find maximum" algorithm applied to a specific field inside an array of structs.',
      dryRun: [
        { step: 1, line: 15, variables: { max_sal: '55000.0', max_id: '1' }, output: '', explanation: 'Initialize max with the first employee.' },
        { step: 2, line: 19, variables: { i: '1' }, output: '', explanation: 'staff[1].salary is 85000. > 55000. Update max.' },
        { step: 3, line: 19, variables: { i: '2' }, output: '', explanation: 'staff[2].salary is 72000. Not > 85000.' },
      ],
      tags: ['structs', 'arrays', 'searching'],
    },
    {
      id: 'u3-t7-p2',
      title: 'Search by Name',
      topicId: 'u3-t7',
      difficulty: 'intermediate',
      problemStatement: 'Define a `Product` struct with `name` (string) and `price` (float). Given an array of 3 products, ask the user to enter a product name. Search the array and print the price. If not found, print "Not found". Include <string.h>.',
      constraints: ['Use strcmp for searching'],
      sampleInput: 'Apple',
      sampleOutput: 'Price: 1.50',
      hints: ['strcmp(inventory[i].name, target) == 0'],
      solution: '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[20];\n    float price;\n} Product;\n\nint main(void) {\n    Product inv[3] = {\n        {"Apple", 1.50},\n        {"Banana", 0.75},\n        {"Milk", 3.20}\n    };\n    \n    char target[20];\n    printf("Enter product: ");\n    scanf("%19s", target);\n    \n    int found = 0;\n    for (int i = 0; i < 3; i++) {\n        if (strcmp(inv[i].name, target) == 0) {\n            printf("Price: %.2f\\n", inv[i].price);\n            found = 1;\n            break;\n        }\n    }\n    \n    if (!found) printf("Not found\\n");\n    \n    return 0;\n}',
      solutionExplanation: 'Combines array of structs with string manipulation (`strcmp`). This is exactly how a rudimentary database lookup operates.',
      dryRun: [
        { step: 1, line: 18, variables: { target: '"Apple"' }, output: '', explanation: 'Reads user input.' },
        { step: 2, line: 22, variables: { i: '0' }, output: '', explanation: 'strcmp("Apple", "Apple") returns 0. Match found.' },
        { step: 3, line: 23, variables: {}, output: 'Price: 1.50\\n', explanation: 'Prints the price linked to that struct.' },
      ],
      tags: ['structs', 'arrays', 'strcmp'],
    },
    {
      id: 'u3-t7-p3',
      title: 'Filter Array of Structs',
      topicId: 'u3-t7',
      difficulty: 'advanced',
      problemStatement: 'Define a `Task` struct with `id` (int) and `isComplete` (int boolean). Given an array of 5 tasks, print the IDs of ONLY the incomplete tasks.',
      constraints: ['Use a loop'],
      sampleInput: '',
      sampleOutput: 'Incomplete Tasks: 102 105',
      hints: ['if (tasks[i].isComplete == 0) { printf... }'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    int isComplete;\n} Task;\n\nint main(void) {\n    Task tasks[5] = {\n        {101, 1}, /* Complete */\n        {102, 0}, /* Incomplete */\n        {103, 1}, /* Complete */\n        {104, 1}, /* Complete */\n        {105, 0}  /* Incomplete */\n    };\n    \n    printf("Incomplete Tasks: ");\n    for (int i = 0; i < 5; i++) {\n        if (tasks[i].isComplete == 0) {\n            printf("%d ", tasks[i].id);\n        }\n    }\n    printf("\\n");\n    \n    return 0;\n}',
      solutionExplanation: 'Demonstrates filtering records based on a boolean-like state field. This pattern is foundational for managing task lists or processing state machines.',
      dryRun: [
        { step: 1, line: 19, variables: { i: '0' }, output: '', explanation: 'isComplete is 1. Ignore.' },
        { step: 2, line: 19, variables: { i: '1' }, output: '102 ', explanation: 'isComplete is 0. Print ID 102.' },
        { step: 3, line: 19, variables: { i: '4' }, output: '105 ', explanation: 'isComplete is 0. Print ID 105.' },
      ],
      tags: ['structs', 'arrays', 'filtering'],
    },
  ],
};
