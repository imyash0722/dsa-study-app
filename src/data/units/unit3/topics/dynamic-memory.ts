import type { Topic } from '../../../../types';

export const dynamicMemory: Topic = {
  id: 'u3-t4',
  unitId: 'unit-3',
  title: 'Dynamic Memory Management',
  slug: 'dynamic-memory',
  description: `In modern high-level languages, garbage collectors silently manage memory behind the scenes — allocating objects when needed and reclaiming them when no references remain. C offers no such luxury. Instead, C grants the programmer absolute manual control over the system's RAM via the heap, a large pool of memory that persists independently of function scope and whose lifetime is controlled entirely by explicit allocation (malloc, calloc, realloc) and deallocation (free) calls.

Understanding the architectural divide between the stack and the heap is the definitive rite of passage for every systems programmer. Stack memory is fast (allocation is a single pointer decrement), automatic (variables are created when their scope is entered and destroyed when it exits), and limited (typically 1–8 MB). Heap memory is slower (allocation requires traversing a free-list or similar bookkeeping structure), manual (the programmer is solely responsible for both allocation and deallocation), and virtually unlimited (bounded only by available system memory). Every data structure whose size is unknown at compile time or whose lifetime must extend beyond the creating function requires heap allocation.

The three cardinal sins of heap memory management are: memory leaks (allocating memory and losing all pointers to it, making it permanently unreclaimable), dangling pointers (freeing memory and then continuing to access it through a stale pointer), and double frees (calling free on the same pointer twice, corrupting the heap's internal bookkeeping and potentially enabling arbitrary code execution). These bugs are notoriously difficult to diagnose because their symptoms are often delayed and non-deterministic — a program may appear to work correctly for hours before the accumulated damage manifests as a crash in an unrelated function. Tools like Valgrind and AddressSanitizer are essential for detecting these errors in non-trivial programs.`,
  difficulty: 'advanced',
  prerequisites: ['u2-t3', 'u2-t4'],
  estimatedMinutes: 90,
  subtopics: [
    {
      id: 'u3-t4-s1',
      title: 'The Stack vs The Heap',
      slug: 'stack-vs-heap',
      description: `A running C program divides its available memory into several distinct regions, but the two that matter most for understanding dynamic allocation are the stack and the heap. The stack is a fixed-size, contiguous region of memory (typically 1–8 MB, configured by the operating system) that the CPU manages automatically using a single register called the stack pointer. Every time a function is called, a new stack frame is pushed onto the top of the stack, containing the function's parameters, local variables, and a return address. When the function returns, its stack frame is popped off instantly — the stack pointer is adjusted by a single instruction, and the memory is reclaimed. This makes stack allocation and deallocation essentially free in terms of performance, but it imposes two rigid constraints: the size of every stack-allocated variable must be known at compile time, and no stack-allocated data can survive past the return of the function that created it.

The heap is a much larger region of memory (limited primarily by the operating system's virtual address space, often gigabytes) that is managed entirely by the programmer through explicit function calls. Unlike the stack, heap memory has no automatic lifecycle — it persists until the programmer explicitly releases it by calling free(). Allocation on the heap is performed by library functions like malloc() and calloc(), which request a block of memory from the operating system's memory manager. This process is slower than stack allocation because the allocator must search for a sufficiently large contiguous free region, update internal bookkeeping structures, and potentially request additional memory from the OS kernel.

The fundamental reason dynamic memory allocation exists is to solve problems that the stack cannot: creating data structures whose size is not known until runtime (arrays whose length depends on user input), creating data that must outlive the function that created it (returning a buffer from a function), and creating data structures like linked lists, trees, and graphs where nodes are allocated and freed independently throughout the program's lifetime. Mastering the stack-heap distinction means understanding that every piece of data in your program lives in one of these two regions, and the choice of region determines who is responsible for its lifecycle, how long it lives, and how fast it can be accessed.`,
      keyPoints: [
        'The Stack: A tightly structured, highly optimized memory region managed entirely by the CPU. Local variables live here. It is blazingly fast but severely limited in size. Crucially, when a function returns, its entire Stack frame is instantly and permanently destroyed.',
        'The Heap: A massive, unstructured ocean of memory managed manually by YOU. It is slower to access than the Stack, but it persists indefinitely until you explicitly command the OS to delete it.',
        'Why use the Heap? 1) Dynamism: To allocate arrays whose required size is completely unknown until the user inputs a value at runtime. 2) Persistence: To construct complex data structures (like linked lists) that must survive after the function that built them has finished executing.',
        'The Golden Rule of Pointers: Returning a pointer to a local (Stack) variable is catastrophic; it creates a dangling pointer to destroyed data. Returning a pointer to Heap memory is the mathematically correct way to pass data upwards.',
      ],
      codeExamples: [
        {
          id: 'u3-t4-s1-ex1',
          title: 'The Limitation of the Stack',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\n/* WRONG: Returning pointer to Stack memory */\nint* badFunction() {\n    int stackArray[5] = {1, 2, 3, 4, 5};\n    return stackArray; /* ERROR: Memory destroyed on return */\n}\n\n/* RIGHT: Returning pointer to Heap memory */\nint* goodFunction() {\n    /* Request 5 integers worth of space on the Heap */\n    int *heapArray = (int*)malloc(5 * sizeof(int));\n    if (heapArray != NULL) {\n        heapArray[0] = 1;\n        heapArray[1] = 2;\n    }\n    return heapArray; /* SAFE: Heap memory survives return */\n}\n\nint main(void) {\n    int *safeData = goodFunction();\n    printf("Data: %d\\n", safeData[0]);\n    free(safeData); /* Must manually clean up Heap memory */\n    return 0;\n}',
          language: 'c',
          explanation: 'This code illustrates the most critical architectural difference in C. Stack memory is physically tied to the execution lifespan of its parent function. When `badFunction` returns, `stackArray` ceases to exist. Heap memory, acquired via `malloc`, is entirely detached from the function\'s lifespan. It floats independently in RAM until explicitly destroyed via `free`.',
          expectedOutput: 'Data: 1',
          lineBreakdown: [
            { lineNumber: 6, code: '    int stackArray[5] = {1, 2, 3, 4, 5};', explanation: 'Allocated on the Stack. The moment the `return` statement executes, this memory is pulverized by the OS.' },
            { lineNumber: 13, code: '    int *heapArray = (int*)malloc(5 * sizeof(int));', explanation: 'The pointer variable `heapArray` lives on the Stack, but the 20 bytes of data it points to are permanently anchored in the Heap.' },
            { lineNumber: 24, code: '    free(safeData);', explanation: 'Because the Heap lacks automatic garbage collection, you must manually relinquish the memory back to the OS.' },
          ],
          relatedTopicIds: ['u2-t6'],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t4-s1-cm1',
          title: 'Variable Length Arrays (VLAs) vs malloc',
          wrongCode: 'int n; scanf("%d", &n);\nint arr[n]; /* VLA on the Stack */',
          correctCode: 'int n; scanf("%d", &n);\nint *arr = malloc(n * sizeof(int)); /* Heap */\n/* ... */\nfree(arr);',
          explanation: 'C99 introduced Variable Length Arrays (VLAs), allowing syntax like `int arr[n]`. However, VLAs aggressively allocate memory on the Stack. The Stack is incredibly small (often just 8MB total). If a user inputs `n = 1000000`, the VLA will instantly blow past the Stack limit, causing a catastrophic "Stack Overflow" crash. Any large or highly dynamic memory allocation MUST be routed to the Heap using `malloc`.',
          consequence: 'Stack overflow crash on large inputs.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t4-s1-ic1',
          title: 'Stack vs Heap Characteristics',
          content: 'This is a guaranteed interview question. You must articulate the trade-offs clearly: The Stack is blazingly fast, automatically managed, but strictly limited in capacity (a few Megabytes) and highly contiguous. The Heap is massive (Gigabytes of available RAM), but suffers from fragmentation, requires slow manual management, and enforces pointer dereferencing overhead to access data.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t4-s1-cp1',
          title: 'Stack vs Heap Theory',
          description: 'Verify your conceptual understanding of C\'s dual-memory architecture.',
          criteria: [
            'Mechanically explain exactly what happens to local variables when a function reaches its `return` statement.',
            'Explain the architectural reason why you cannot return a pointer to a local Stack array.',
            'Describe two distinct programming scenarios where allocating memory on the Heap is absolutely mandatory.',
          ],
          topicId: 'u3-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t4-s1-rc1',
          front: 'Architecturally, what happens to a function\'s Stack memory the exact moment the function returns?',
          back: 'The entire Stack frame is instantly deallocated (destroyed). All local variables within that function are permanently lost.',
          topicId: 'u3-t4',
          tags: ['memory', 'stack'],
        },
        {
          id: 'u3-t4-s1-rc2',
          front: 'What happens to data allocated on the Heap when the function that created it ends?',
          back: 'Absolutely nothing. Heap memory is completely independent of function lifespans and persists until you explicitly call `free()` on its pointer.',
          topicId: 'u3-t4',
          tags: ['memory', 'heap'],
        },
      ],
    },
    {
      id: 'u3-t4-s2',
      title: 'malloc, calloc, and free',
      slug: 'malloc-calloc-free',
      description: `The C standard library provides three core functions in <stdlib.h> for managing heap memory: malloc for raw allocation, calloc for zero-initialized allocation, and free for deallocation. These functions are the programmer's interface to the operating system's memory manager, and using them correctly is the defining skill that separates a C programmer from a programmer who merely writes C syntax.

malloc(size_t size) requests a contiguous block of exactly size bytes from the heap and returns a void* pointer to the beginning of that block. The void* type is C's generic pointer — it holds an address but carries no type information, which is why you must cast it to the appropriate pointer type before use (e.g., int *arr = (int *)malloc(5 * sizeof(int))). The memory returned by malloc is not initialized: it contains whatever binary garbage happened to be in those bytes from their previous use. calloc(size_t nmemb, size_t size) performs the same allocation but takes two parameters — the number of elements and the size of each element — computes the total size internally (with overflow checking that malloc lacks), and initializes every byte of the allocated block to zero. This zero-initialization makes calloc slightly slower than malloc but eliminates an entire class of bugs caused by reading uninitialized data.

The free(void *ptr) function releases a previously allocated block back to the heap, making it available for future allocations. After calling free(ptr), the memory at that address no longer belongs to your program, and accessing it through ptr (or any copy of ptr) is undefined behavior — a dangling pointer bug. The critical discipline is: every successful malloc or calloc must be paired with exactly one corresponding free. Calling free twice on the same pointer (double free) corrupts the heap's internal bookkeeping and can crash the program or create exploitable security vulnerabilities. The canonical defensive practice is to immediately set the pointer to NULL after freeing: free(ptr); ptr = NULL;. This ensures that any accidental subsequent use of ptr will produce a NULL dereference crash rather than silently corrupting unrelated data.`,
      keyPoints: [
        '`malloc(size)`: Memory Allocation. Requests a contiguous block of `size` bytes from the OS. It returns a generic `void *` pointer to the start of the block. The memory is filled with unpredictable GARBAGE data.',
        '`calloc(num_elements, element_size)`: Contiguous Allocation. Similar to `malloc`, but it mathematically calculates the total size for you AND forcefully initializes every single byte to 0.',
        'The `sizeof` Mandate: You must ALWAYS use `sizeof(type)`. Hardcoding sizes (like `malloc(4)`) is a fatal error, as integer sizes vary wildly between CPU architectures. Use `malloc(1 * sizeof(int))` to ensure cross-platform safety.',
        'The `NULL` Check: You must meticulously verify if the returned pointer is `NULL`. If the system is out of RAM, `malloc` refuses the request. Attempting to use a `NULL` pointer causes an immediate crash.',
        '`free(ptr)`: Relinquishes ownership of the memory block back to the OS. You must pass the exact, unmodified pointer originally returned by `malloc`.',
      ],
      codeExamples: [
        {
          id: 'u3-t4-s2-ex1',
          title: 'Dynamic Array Allocation',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    printf("How many numbers? ");\n    scanf("%d", &n);\n    \n    /* Allocate memory for \'n\' integers */\n    int *arr = (int*)malloc(n * sizeof(int));\n    \n    /* ALWAYS check for NULL */\n    if (arr == NULL) {\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n    \n    /* Use the pointer exactly like an array */\n    for (int i = 0; i < n; i++) {\n        arr[i] = i * 10;\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n    \n    /* ALWAYS free what you malloc */\n    free(arr);\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code showcases the definitive lifecycle of a dynamic array in C. 1) Query the user for the size. 2) Allocate exactly `n * sizeof(type)` bytes on the Heap. 3) Validate the pointer isn\'t `NULL`. 4) Manipulate the array using standard bracket notation. 5) Surrender the memory using `free()`.',
          expectedOutput: 'How many numbers? 3\n0 10 20 ',
          lineBreakdown: [
            { lineNumber: 10, code: '    int *arr = (int*)malloc(n * sizeof(int));', explanation: 'Calculates the absolute byte requirement (e.g., 3 items * 4 bytes = 12 bytes) and casts the generic `void*` return to a specific `int*`.' },
            { lineNumber: 13, code: '    if (arr == NULL) {', explanation: 'Defensive programming. If the OS denied our memory request, writing to `arr` triggers a fatal segmentation fault.' },
            { lineNumber: 29, code: '    free(arr);', explanation: 'Relinquishes the memory. Forgetting this single line of code creates a permanent Memory Leak.' },
          ],
          relatedTopicIds: ['u2-t4'],
        },
        {
          id: 'u3-t4-s2-ex2',
          title: 'malloc vs calloc',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    /* malloc leaves garbage in memory */\n    int *m_arr = (int*)malloc(3 * sizeof(int));\n    \n    /* calloc initializes everything to 0 */\n    int *c_arr = (int*)calloc(3, sizeof(int));\n    \n    if (m_arr != NULL && c_arr != NULL) {\n        printf("malloc: %d, %d, %d\\n", m_arr[0], m_arr[1], m_arr[2]);\n        printf("calloc: %d, %d, %d\\n", c_arr[0], c_arr[1], c_arr[2]);\n        \n        free(m_arr);\n        free(c_arr);\n    }\n    return 0;\n}',
          language: 'c',
          explanation: 'While `malloc` merely reserves space, `calloc` goes a step further by physically scrubbing the allocated memory with zeros. This eliminates dangerous "garbage" values. However, `calloc` is marginally slower because of this scrubbing operation.',
          expectedOutput: 'malloc: -123456, 32767, 0 (Garbage values)\ncalloc: 0, 0, 0',
          lineBreakdown: [
            { lineNumber: 6, code: '    int *m_arr = (int*)malloc(3 * sizeof(int));', explanation: 'Takes 1 argument: the total bytes required. Leaves existing RAM data completely intact (garbage).' },
            { lineNumber: 9, code: '    int *c_arr = (int*)calloc(3, sizeof(int));', explanation: 'Takes 2 arguments: number of items, and size of one item. Actively zeroes out the entire block.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t4-s2-cm1',
          title: 'Forgetting sizeof()',
          wrongCode: 'int *arr = malloc(10); /* Allocates 10 BYTES */\narr[9] = 5; /* Buffer Overflow! */',
          correctCode: 'int *arr = malloc(10 * sizeof(int)); /* Allocates 40 bytes */\narr[9] = 5; /* Safe */',
          explanation: 'The `malloc` function is entirely ignorant of data types; it only understands raw bytes. If you request `malloc(10)` on a system where an integer is 4 bytes, you have only secured enough space for 2.5 integers. Attempting to access `arr[9]` will violently overwrite adjacent Heap data, a critical vulnerability known as a Heap Buffer Overflow.',
          consequence: 'Heap buffer overflow, corrupting adjacent heap metadata and crashing the program (often during `free`).',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t4-s2-ic1',
          title: 'To cast or not to cast malloc?',
          content: 'A philosophical debate in C programming: "Should you cast the return value of `malloc`?" Because `malloc` returns a `void *`, C allows it to implicitly convert to any pointer type (e.g., `int *p = malloc(...)`). However, C++ strictly forbids this implicit conversion. Therefore, explicitly casting `(int*)malloc(...)` is universally recommended to ensure your code is cleanly portable between C and C++ compilers.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t4-s2-cp1',
          title: 'Allocation Syntax',
          description: 'Verify your mastery of dynamic memory syntax and defensive safety checks.',
          criteria: [
            'Write the exact `malloc` statement required to allocate a dynamic array of 50 `double` precision floats.',
            'Explain the mechanical difference between `malloc` and `calloc`.',
            'Explain why failing to check if `malloc` returns `NULL` is a catastrophic software flaw.',
          ],
          topicId: 'u3-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t4-s2-rc1',
          front: 'What specific parameter does the `malloc` function require?',
          back: 'A single integer representing the absolute total number of bytes to allocate (virtually always calculated as `n * sizeof(type)`).',
          topicId: 'u3-t4',
          tags: ['memory', 'malloc'],
        },
        {
          id: 'u3-t4-s2-rc2',
          front: 'Architecturally, what does `calloc` do differently than `malloc`?',
          back: 'It takes two parameters (element count and element size), and crucially, it actively initializes every single byte of the allocated block to zero.',
          topicId: 'u3-t4',
          tags: ['memory', 'calloc'],
        },
        {
          id: 'u3-t4-s2-rc3',
          front: 'What happens to your system if you consistently fail to `free()` memory allocated with `malloc`?',
          back: 'A Memory Leak occurs. The allocated RAM remains permanently locked by your application. If this occurs inside a loop, your program will rapidly consume all available system RAM until the OS forcefully kills it.',
          topicId: 'u3-t4',
          tags: ['memory', 'free', 'leaks'],
        },
      ],
    },
    {
      id: 'u3-t4-s3',
      title: 'Memory Leaks and Dangerous Bugs',
      slug: 'memory-bugs',
      description: `Manual memory management gives C programmers power that garbage-collected languages deliberately withhold \u2014 and with that power comes the responsibility for three categories of bugs that are among the most dangerous, most difficult to diagnose, and most frequently exploited vulnerabilities in all of software engineering. These bugs are not compiler errors; they are runtime pathologies that may not manifest until hours, days, or months after deployment, under specific workloads or timing conditions that are nearly impossible to reproduce in testing.

A memory leak occurs when a program allocates heap memory but loses all pointers to it, making it impossible to free. The memory remains allocated for the lifetime of the process, permanently reducing the available heap. In a short-lived program, leaks are inconsequential \u2014 the operating system reclaims all of a process's memory when it terminates. But in long-running programs (servers, embedded systems, daemons), leaks accumulate continuously, gradually consuming megabytes, then gigabytes, until the system runs out of memory and crashes. Leaks are insidious because they produce no immediate symptoms; the program continues to run correctly while silently hemorrhaging memory.

A dangling pointer is a pointer that continues to reference memory after that memory has been freed. The freed memory may be immediately reused by a subsequent malloc call, so dereferencing a dangling pointer may read or write data that now belongs to a completely different part of the program, causing silent data corruption with effects that manifest far from the actual bug. A double free occurs when free() is called twice on the same pointer, corrupting the heap allocator's internal linked-list metadata and potentially allowing an attacker to overwrite arbitrary memory locations \u2014 this is one of the most commonly exploited vulnerability classes in systems software. The universal defense against both dangling pointers and double frees is the same: immediately set every pointer to NULL after freeing it (free(ptr); ptr = NULL;), because free(NULL) is defined by the C standard as a harmless no-op, and dereferencing NULL produces a deterministic crash that is trivial to debug.`,
      keyPoints: [
        'The Memory Leak: Failing to call `free()` before you lose the pointer to the Heap block. The memory becomes "lost at sea"—permanently locked and unusable until the program is killed.',
        'The Dangling Pointer: Calling `free(ptr)`, but carelessly continuing to use the `ptr` variable afterward. The memory is gone, but the pointer still aims at the dead address like a ghost.',
        'The Double Free: Calling `free(ptr)` twice on the same memory address. This violently corrupts the OS\'s internal heap allocator lists and triggers an immediate program abort.',
        'Valgrind: The industry-standard Linux tool for dynamic analysis. Running your program through Valgrind detects every leaked byte and invalid memory access.',
      ],
      codeExamples: [
        {
          id: 'u3-t4-s3-ex1',
          title: 'The Dangling Pointer',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *ptr = (int*)malloc(sizeof(int));\n    *ptr = 42;\n    \n    free(ptr); /* Memory is returned to OS */\n    \n    /* BUG: Use After Free (Dangling Pointer) */\n    /* *ptr = 100; --> THIS MIGHT CRASH, OR CORRUPT OTHER DATA */\n    \n    /* Best practice: set to NULL immediately after freeing */\n    ptr = NULL;\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'Calling `free(ptr)` notifies the OS that the memory block is surrendered. However, it does NOT erase the physical address stored inside the `ptr` variable. `ptr` still points to that now-illegal location. If you write to it, you corrupt memory belonging to other parts of your program. The absolute gold standard of C programming is to forcefully set `ptr = NULL` immediately after freeing it, turning a silent memory corruption bug into a loud, highly-debuggable crash.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 8, code: '    free(ptr);', explanation: 'The Heap memory is successfully destroyed and returned to the OS.' },
            { lineNumber: 14, code: '    ptr = NULL;', explanation: 'The defensive programming shield. Nullifying the pointer guarantees we cannot accidentally write to dead memory.' },
          ],
          relatedTopicIds: ['u2-t3'],
        },
        {
          id: 'u3-t4-s3-ex2',
          title: 'Memory Leak Demonstration',
          code: '#include <stdio.h>\n#include <stdlib.h>\n\nvoid leakyFunction() {\n    /* Allocates 400 bytes */\n    int *data = (int*)malloc(100 * sizeof(int));\n    data[0] = 5;\n    /* Function ends WITHOUT calling free(data) */\n}\n\nint main(void) {\n    for (int i = 0; i < 100000; i++) {\n        leakyFunction(); /* Leaks 40 MB of RAM! */\n    }\n    printf("Done leaking memory.\\n");\n    return 0;\n}',
          language: 'c',
          explanation: 'When `leakyFunction` concludes, its local Stack variable `data` (which holds the crucial memory address) is completely pulverized. However, the 400 bytes on the Heap are completely untouched. Because we lost the only pointer containing the address, we have mathematically lost the ability to ever call `free()` on that memory. Placed inside a `for` loop, this silent leak will rapidly devour Gigabytes of system RAM.',
          expectedOutput: 'Done leaking memory.',
          lineBreakdown: [
            { lineNumber: 6, code: '    int *data = (int*)malloc(100 * sizeof(int));', explanation: '400 bytes are successfully claimed on the Heap.' },
            { lineNumber: 8, code: '    /* Function ends WITHOUT calling free(data) */', explanation: 'The pointer `data` is wiped from the Stack. The Heap memory is orphaned forever. A textbook Memory Leak.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t4-s3-cm1',
          title: 'Double Free',
          wrongCode: 'int *p = malloc(sizeof(int));\nfree(p);\nfree(p); /* CRASH */',
          correctCode: 'int *p = malloc(sizeof(int));\nfree(p);\np = NULL;\nfree(p); /* Safe: free(NULL) does nothing */',
          explanation: 'Calling `free()` on the exact same address twice severely corrupts the internal linked-list data structures the OS Heap Allocator uses to track available space. This usually results in an immediate, catastrophic abort (`free(): double free detected`). However, if you diligently set `p = NULL` after the first free, the second `free(NULL)` is completely ignored by the C standard, rendering your code bulletproof.',
          consequence: 'Program abort / crash.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t4-s3-ic1',
          title: 'Valgrind',
          content: 'If a senior engineer asks, "How do you trace a memory leak in a large C codebase?", the undisputed industry answer is Valgrind. Valgrind is a dynamic binary instrumentation framework that runs your program on a synthetic CPU, intercepting every single `malloc` and `free` operation. Upon exit, it prints a highly detailed manifest of exactly which lines of code leaked memory or accessed out-of-bounds addresses.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t4-s3-cp1',
          title: 'Memory Bugs',
          description: 'Verify your understanding of C\'s most notorious memory vulnerabilities.',
          criteria: [
            'Define exactly what constitutes a Memory Leak.',
            'Define exactly what constitutes a Dangling Pointer.',
            'Explain the specific, one-line best practice used to disarm a Dangling Pointer.',
          ],
          topicId: 'u3-t4',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t4-s3-rc1',
          front: 'What is a Dangling Pointer?',
          back: 'A pointer variable that continues to store the memory address of a block of memory (on the Heap or Stack) that has already been deallocated or destroyed.',
          topicId: 'u3-t4',
          tags: ['memory', 'pointers', 'bugs'],
        },
        {
          id: 'u3-t4-s3-rc2',
          front: 'What specific line of defensive code should you write immediately after calling `free(ptr);`?',
          back: 'You must set `ptr = NULL;` to absolutely ensure you cannot accidentally read or write to that dead memory address later.',
          topicId: 'u3-t4',
          tags: ['memory', 'safety'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t4-q1',
      type: 'mcq',
      topicId: 'u3-t4',
      difficulty: 'beginner',
      question: 'Which of the following creates a memory leak?',
      options: [
        'Freeing a pointer twice.',
        'Accessing memory after freeing it.',
        'Losing all pointers to a malloc\'d block of memory without freeing it.',
        'Allocating memory and setting the pointer to NULL immediately.'
      ],
      correctAnswer: 'Losing all pointers to a malloc\'d block of memory without freeing it.',
      explanation: 'If you lose the address (e.g., the pointer goes out of scope), you can never pass it to `free()`. The memory remains locked permanently.',
      tags: ['memory', 'leaks'],
    },
    {
      id: 'u3-t4-q2',
      type: 'predict-output',
      topicId: 'u3-t4',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: '#include <stdio.h>\n#include <stdlib.h>\nint main() {\n    int *p = (int*)calloc(2, sizeof(int));\n    p[0] = 5;\n    printf("%d %d", p[0], p[1]);\n    free(p);\n    return 0;\n}',
      correctAnswer: '5 0',
      explanation: '`calloc` initializes all memory to 0. `p[0]` is explicitly set to 5. `p[1]` remains 0.',
      tags: ['memory', 'calloc'],
    },
    {
      id: 'u3-t4-q3',
      type: 'spot-bug',
      topicId: 'u3-t4',
      difficulty: 'advanced',
      question: 'Spot the bug:',
      code: 'int *arr = (int*)malloc(10 * sizeof(int));\narr++;\nfree(arr);',
      correctAnswer: 'Freeing a pointer that is not the start of the allocated block.',
      explanation: '`arr++` changes the pointer to point to the second element. `free()` requires the EXACT pointer returned by `malloc`. Passing a shifted pointer corrupts the heap and crashes.',
      tags: ['memory', 'free', 'pointers'],
    },
    {
      id: 'u3-t4-q4',
      type: 'true-false',
      topicId: 'u3-t4',
      difficulty: 'beginner',
      question: '`free(ptr)` deletes the `ptr` variable itself.',
      correctAnswer: false,
      explanation: '`free(ptr)` deletes the *memory block* that `ptr` points to. The `ptr` variable itself still exists on the stack and still holds the old address (becoming a dangling pointer).',
      tags: ['memory', 'free'],
    },
    {
      id: 'u3-t4-q5',
      type: 'mcq',
      topicId: 'u3-t4',
      difficulty: 'intermediate',
      question: 'Why should you cast the return value of malloc? E.g., `(int*)malloc(...)`',
      options: [
        'It is strictly required by the C compiler.',
        'malloc returns a void* which implicitly converts, but explicit casting is good practice for C++ compatibility.',
        'It prevents memory leaks.',
        'It zeroes out the memory.'
      ],
      correctAnswer: 'malloc returns a void* which implicitly converts, but explicit casting is good practice for C++ compatibility.',
      explanation: 'In pure C, the cast is optional. In C++, it is mandatory. Many developers cast it to ensure code compiles in both environments.',
      tags: ['memory', 'malloc', 'casting'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t4-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t4',
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
      id: 'u3-t4-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t4',
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
      id: 'u3-t4-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t4',
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
      id: 'u3-t4-p1',
      title: 'Dynamic Array of Floats',
      topicId: 'u3-t4',
      difficulty: 'beginner',
      problemStatement: 'Ask the user for a number N. Dynamically allocate an array of N floats. Read N floats from the user into the array. Print their sum, then free the memory.',
      constraints: ['Use malloc', 'Check for NULL', 'Free memory'],
      sampleInput: '3\n1.5 2.5 3.5',
      sampleOutput: 'Sum: 7.50',
      hints: ['float *arr = (float*)malloc(n * sizeof(float));', 'if (arr == NULL) { return 1; }'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    \n    float *arr = (float*)malloc(n * sizeof(float));\n    if (arr == NULL) {\n        printf("Memory allocation failed.\\n");\n        return 1;\n    }\n    \n    float sum = 0.0;\n    for (int i = 0; i < n; i++) {\n        scanf("%f", &arr[i]);\n        sum += arr[i];\n    }\n    \n    printf("Sum: %.2f\\n", sum);\n    \n    free(arr);\n    arr = NULL; /* Good habit */\n    \n    return 0;\n}',
      solutionExplanation: 'Standard dynamic array lifecycle: allocate, verify, use, free, nullify.',
      dryRun: [
        { step: 1, line: 8, variables: { n: '3' }, output: '', explanation: 'Allocates 3 * 4 = 12 bytes on the heap.' },
        { step: 2, line: 16, variables: { sum: '4.0' }, output: '', explanation: 'Reads 1.5, then 2.5. sum is 4.0' },
        { step: 3, line: 22, variables: {}, output: '', explanation: 'Memory is returned to OS.' },
      ],
      tags: ['memory', 'malloc', 'arrays'],
    },
    {
      id: 'u3-t4-p2',
      title: 'Reallocating Memory',
      topicId: 'u3-t4',
      difficulty: 'intermediate',
      problemStatement: 'Allocate an array of 2 integers and store {10, 20}. Then, use `realloc` to resize the array to hold 4 integers. Add {30, 40} to the new slots. Print all 4 integers.',
      constraints: ['Use realloc'],
      sampleInput: '',
      sampleOutput: '10 20 30 40 ',
      hints: ['int *new_arr = realloc(old_arr, new_total_size);', 'Always catch the return value of realloc in a new pointer, check for NULL, then assign back to old pointer.'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int *arr = (int*)malloc(2 * sizeof(int));\n    if (!arr) return 1;\n    \n    arr[0] = 10;\n    arr[1] = 20;\n    \n    /* Resize to hold 4 integers */\n    int *temp = (int*)realloc(arr, 4 * sizeof(int));\n    if (temp == NULL) {\n        printf("Realloc failed\\n");\n        free(arr); /* Must free original if realloc fails */\n        return 1;\n    }\n    arr = temp;\n    \n    arr[2] = 30;\n    arr[3] = 40;\n    \n    for (int i = 0; i < 4; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    \n    free(arr);\n    return 0;\n}',
      solutionExplanation: '`realloc` is incredibly powerful. It expands the memory block. If it can\'t expand in place, it finds a new larger block, copies the old data over automatically, frees the old block, and returns the new pointer. Catching it in `temp` is crucial; if realloc fails and returns NULL, assigning it directly to `arr` would cause you to lose the original memory pointer (a leak!).',
      dryRun: [
        { step: 1, line: 5, variables: {}, output: '', explanation: 'Heap block of 8 bytes created.' },
        { step: 2, line: 12, variables: {}, output: '', explanation: 'Heap block expanded to 16 bytes. Data {10, 20} is preserved.' },
        { step: 3, line: 20, variables: {}, output: '', explanation: 'Added {30, 40} to newly allocated space.' },
      ],
      tags: ['memory', 'realloc', 'resizing'],
    },
    {
      id: 'u3-t4-p3',
      title: 'Clone a String (Duplicate)',
      topicId: 'u3-t4',
      difficulty: 'advanced',
      problemStatement: 'Write a function `char* my_strdup(const char *src)` that takes a string, allocates enough memory on the heap to hold it, copies the string into the heap memory, and returns the pointer. Test it in main.',
      constraints: ['Use malloc', 'Use strlen and strcpy'],
      sampleInput: '',
      sampleOutput: 'Original: Hello\nClone: Hello',
      hints: ['malloc needs strlen(src) + 1 bytes (don\'t forget the null terminator!)'],
      solution: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nchar* my_strdup(const char *src) {\n    /* Calculate length. +1 is for the \\0 */\n    size_t len = strlen(src) + 1;\n    \n    /* Allocate memory on the heap */\n    char *clone = (char*)malloc(len * sizeof(char));\n    \n    /* Check for NULL */\n    if (clone != NULL) {\n        strcpy(clone, src); /* Copy the data */\n    }\n    \n    return clone; /* Return pointer to heap data */\n}\n\nint main(void) {\n    const char *original = "Hello";\n    char *cloned = my_strdup(original);\n    \n    if (cloned) {\n        printf("Original: %s\\n", original);\n        printf("Clone: %s\\n", cloned);\n        free(cloned); /* We own this memory, we must free it */\n    }\n    \n    return 0;\n}',
      solutionExplanation: 'This mimics the POSIX `strdup` function. It is a perfect example of returning Heap memory from a function safely. The caller assumes ownership of the cloned string and is responsible for calling `free()`.',
      dryRun: [
        { step: 1, line: 7, variables: { len: '6' }, output: '', explanation: 'strlen("Hello") is 5. + 1 = 6 bytes.' },
        { step: 2, line: 10, variables: {}, output: '', explanation: 'Allocates 6 bytes on Heap.' },
        { step: 3, line: 14, variables: {}, output: '', explanation: 'Copies "Hello\\0" into the Heap block.' },
        { step: 4, line: 17, variables: {}, output: '', explanation: 'Returns pointer. The Heap memory survives the function return.' },
      ],
      tags: ['memory', 'strings', 'heap'],
    },
  ],
};
