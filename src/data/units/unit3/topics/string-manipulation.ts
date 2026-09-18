import type { Topic } from '../../../../types';

export const stringManipulation: Topic = {
  id: 'u3-t2',
  unitId: 'unit-3',
  title: 'String Manipulation & Error Handling',
  slug: 'string-manipulation',
  description: `Because C handles text as raw memory arrays rather than as a managed data type, the fundamental string operations that higher-level languages provide as built-in operators — copying, comparing, concatenating, and searching — must be performed by library functions that manipulate character arrays directly. The C standard library provides a suite of highly optimised string manipulation functions in <string.h>, including strcpy (copy), strcat (concatenate), strcmp (compare), strlen (length), and strchr/strstr (search). These functions are the workhorses of text processing in C.

However, mastering these functions requires understanding not just what they do but how they interact with memory boundaries, and why the older functions are so deeply notorious for causing catastrophic security vulnerabilities. The original functions — strcpy, strcat, sprintf — perform no bounds checking whatsoever: they copy or concatenate bytes until they encounter a null terminator, regardless of whether the destination buffer is large enough to hold the result. If the source string is longer than the destination buffer, these functions silently write past the buffer's boundary, overwriting adjacent stack or heap data — the classic buffer overflow vulnerability that has been exploited in countless real-world attacks, from the 1988 Morris Worm to modern remote code execution exploits.

The safer alternatives — strncpy, strncat, snprintf — accept a maximum length parameter that prevents writing beyond the destination buffer. However, strncpy has its own pitfall: if the source string is exactly as long as the limit, the destination will not be null-terminated, creating a string that lacks its termination sentinel. Defensive C programming requires understanding these edge cases, always specifying explicit size limits, and manually ensuring null termination after every bounded string operation.`,
  difficulty: 'intermediate',
  prerequisites: ['u3-t1'],
  estimatedMinutes: 90,
  subtopics: [
    {
      id: 'u3-t2-s1',
      title: 'Basic string.h Functions',
      slug: 'basic-string-functions',
      description: `The C standard library header <string.h> provides a suite of functions for operating on null-terminated character arrays: strlen for measuring length, strcpy for copying, strcat for concatenation, and strcmp for comparison. These functions are fast because they operate directly on raw memory through pointer arithmetic, but they are also inherently dangerous because they rely entirely on the null terminator to determine where a string ends — they have no knowledge of the underlying array's allocated size. If the null terminator is missing or the destination buffer is too small, these functions will silently read or write past array boundaries, producing undefined behavior that ranges from garbled output to exploitable security vulnerabilities.

strlen(str) counts characters by scanning forward from the pointer until it encounters a '\\0' byte, returning the count (not including the terminator itself). This means calling strlen has O(N) time complexity — it must traverse the entire string every time. In performance-sensitive code, you should call strlen once and cache the result rather than calling it repeatedly in a loop condition. strcpy(dest, src) copies bytes from src to dest until it copies the null terminator, then stops. If dest is smaller than the string in src (including the terminator), strcpy will overflow the buffer. strcat(dest, src) appends src to the end of dest by first scanning dest to find its null terminator, then copying src starting at that position. This means strcat must traverse dest before it begins appending, giving it O(N+M) complexity where N is the length of dest and M is the length of src.

strcmp(s1, s2) compares two strings character by character, returning 0 if they are identical, a negative value if s1 is lexicographically less than s2, and a positive value if s1 is greater. This is the only correct way to compare strings in C — using the == operator on strings compares memory addresses (the values of the char* pointers), not the actual characters. Two different arrays containing the same text will reside at different memory addresses, so == will return false even though the strings are logically equal. This is one of the most common beginner mistakes in C string programming.`,
      keyPoints: [
        '`strlen(str)` iterates through memory, counting characters until it hits `\'\\0\'`. It returns a `size_t` (an unsigned integer). Crucially, it does NOT include the null terminator in its count.',
        '`strcpy(dest, src)` copies characters sequentially from the source to the destination, stopping only after it copies the source\'s null terminator. It blindly assumes the destination array is large enough. If it is not, a buffer overflow occurs.',
        '`strcat(dest, src)` attaches a copy of the source string to the end of the destination string. It first scans the destination to find its null terminator, overwrites it with the first character of the source, and then copies the rest (including a new null terminator).',
        '`strcmp(str1, str2)` performs a dictionary-style comparison. It subtracts the ASCII values of the characters one by one. It returns 0 if the strings are perfectly identical, a negative integer if str1 comes first alphabetically, and a positive integer if str2 comes first.',
        'The Equality Trap: You CANNOT use the `==` operator to compare the text inside two strings. `if (str1 == str2)` asks the compiler "Do these two arrays start at the exact same physical memory address?"—which is almost never what you actually want.',
      ],
      codeExamples: [
        {
          id: 'u3-t2-s1-ex1',
          title: 'Length, Copy, and Concatenate',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char buffer[50]; /* Large buffer to prevent overflow */\n    \n    /* Copying */\n    strcpy(buffer, "Hello");\n    printf("After strcpy: %s (Length: %zu)\\n", buffer, strlen(buffer));\n    \n    /* Concatenating (Appending) */\n    strcat(buffer, " World");\n    printf("After strcat: %s (Length: %zu)\\n", buffer, strlen(buffer));\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This code demonstrates the foundational triad of string operations: measuring, copying, and appending. Notice that we defensively allocate a massive buffer (50 bytes) even though we only initially need a fraction of that. This is because `strcat` requires enough vacant memory at the end of the current string to successfully graft the new letters. If we had allocated exactly 6 bytes for "Hello", the subsequent `strcat` would violently write " World" into adjacent, unowned memory.',
          expectedOutput: 'After strcpy: Hello (Length: 5)\nAfter strcat: Hello World (Length: 11)',
          lineBreakdown: [
            { lineNumber: 8, code: '    strcpy(buffer, "Hello");', explanation: 'Copies \'H\', \'e\', \'l\', \'l\', \'o\', and crucially, the \'\\0\', sequentially into `buffer`.' },
            { lineNumber: 9, code: '    printf("... (Length: %zu)\\n", buffer, strlen(buffer));', explanation: '`strlen` calculates the length by scanning until it sees `\\0`. `%zu` is the format specifier for the `size_t` type returned by `strlen`.' },
            { lineNumber: 12, code: '    strcat(buffer, " World");', explanation: 'Scans `buffer` to find the existing `\\0` (at index 5), overwrites it with \' \', appends \'W\', \'o\', \'r\', \'l\', \'d\', and appends a final `\\0`.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u3-t2-s1-ex2',
          title: 'Comparing Strings',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s1[] = "Apple";\n    char s2[] = "Banana";\n    char s3[] = "Apple";\n    \n    printf("s1 vs s2: %d\\n", strcmp(s1, s2));\n    printf("s2 vs s1: %d\\n", strcmp(s2, s1));\n    printf("s1 vs s3: %d\\n", strcmp(s1, s3));\n    \n    if (strcmp(s1, s3) == 0) {\n        printf("s1 and s3 are identical!\\n");\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: '`strcmp` operates by simultaneously walking down both arrays, subtracting the numerical ASCII value of the characters at each index. When it compares "Apple" and "Banana", it immediately halts at the first letter: \'A\' (65) minus \'B\' (66) equals -1. The negative result mathematically proves that "Apple" comes alphabetically before "Banana". If it makes it to the `\\0` of both strings simultaneously without finding a difference, it returns 0, proving exact textual equality.',
          expectedOutput: 's1 vs s2: -1\ns2 vs s1: 1\ns1 vs s3: 0\ns1 and s3 are identical!',
          lineBreakdown: [
            { lineNumber: 9, code: '    printf("s1 vs s2: %d\\n", strcmp(s1, s2));', explanation: '\'A\' comes before \'B\', resulting in a negative number (< 0).' },
            { lineNumber: 13, code: '    if (strcmp(s1, s3) == 0) {', explanation: 'This is the mandatory, canonical C idiom for checking if two strings contain identical text.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t2-s1-cm1',
          title: 'Using == to compare strings',
          wrongCode: 'char s1[] = "Hi"; char s2[] = "Hi";\nif (s1 == s2) { printf("Equal"); }',
          correctCode: 'char s1[] = "Hi"; char s2[] = "Hi";\nif (strcmp(s1, s2) == 0) { printf("Equal"); }',
          explanation: 'In C, array names gracefully decay into memory pointers. The expression `s1 == s2` literally asks the CPU: "Does the pointer `s1` hold the exact same numeric memory address as the pointer `s2`?" Because they are two distinctly allocated arrays, they live at different physical addresses. The CPU returns false, completely ignoring the fact that the text written inside those memory blocks happens to be identical.',
          consequence: 'Logical error. The `if` statement will always evaluate to false.',
        },
        {
          id: 'u3-t2-s1-cm2',
          title: 'strcpy buffer overflow',
          wrongCode: 'char small[5];\nstrcpy(small, "Hello World");',
          correctCode: 'char small[20];\nstrcpy(small, "Hello World");',
          explanation: '`strcpy` has no knowledge of how large the destination array is. It is functionally blind. It will copy characters from the source until it encounters a `\\0`. Here, it violently writes 12 bytes of data into a 5-byte allocation, actively overwriting adjacent memory. This specific flaw is the root cause of the "Buffer Overflow" vulnerability, historically the most exploited security flaw in computer science.',
          consequence: 'Buffer overflow, segmentation fault, or critical security vulnerability.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t2-s1-ic1',
          title: 'How does strlen work under the hood?',
          content: 'Interviewers love asking candidates to implement `strlen` from scratch to verify pointer fluency. The mechanical logic is straightforward: initialize an integer counter, create a `while` loop that increments a pointer until it dereferences a `\'\\0\'` character, and return the count. Crucially, emphasize to the interviewer that `strlen` is an O(N) operation—it must physically scan the entire string every single time it is called, making it expensive to use repeatedly inside a loop condition.',
          relatedTopicIds: ['u2-t4'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t2-s1-cp1',
          title: 'Basic String Functions',
          description: 'Verify your understanding of string function mechanics and boundary hazards.',
          criteria: [
            'Explain mechanically why you cannot use the `==` operator to verify if two strings contain the same text.',
            'What specific integer value does `strcmp` return if two strings contain perfectly identical text?',
            'Explain the fundamental architectural blindness that makes `strcpy` and `strcat` vulnerable to buffer overflows.',
          ],
          topicId: 'u3-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t2-s1-rc1',
          front: 'What does `strcmp(A, B)` return if string A comes alphabetically BEFORE string B?',
          back: 'A negative integer (< 0).',
          topicId: 'u3-t2',
          tags: ['strings', 'strcmp'],
        },
        {
          id: 'u3-t2-s1-rc2',
          front: 'Does `strlen` include the null terminator in its count?',
          back: 'No. `strlen("Hi")` returns 2, even though the array occupies 3 bytes in memory.',
          topicId: 'u3-t2',
          tags: ['strings', 'strlen'],
        },
      ],
    },
    {
      id: 'u3-t2-s2',
      title: 'Safe String Handling (The "n" variants)',
      slug: 'safe-string-handling',
      description: `The original string functions in <string.h> (strcpy, strcat, strcmp) operate without any knowledge of the destination buffer's size, which makes buffer overflow vulnerabilities trivially easy to introduce. The bounded variants — strncpy, strncat, and strncmp — add an explicit size parameter n that acts as an absolute upper limit on the number of bytes processed. This single parameter transforms each function from a potential security vulnerability into a controlled, bounded operation.

strncpy(dest, src, n) copies at most n characters from src to dest. If src is shorter than n, it pads the remaining bytes with null characters. However, strncpy has a critical and widely misunderstood behavior: if src is longer than n, strncpy copies exactly n bytes and does not append a null terminator. This means the resulting string in dest is not null-terminated, and any subsequent operation that relies on finding '\\0' (printf, strlen, strcat) will read past the buffer boundary. The defensive idiom is to always manually null-terminate after strncpy: strncpy(dest, src, n-1); dest[n-1] = '\\0';.

strncat(dest, src, n) appends at most n characters from src to the end of dest, and always appends a null terminator, making it safer than strncpy in this regard. However, the n parameter limits the number of characters appended from src, not the total size of dest, so you must calculate the available space yourself: strncat(dest, src, sizeof(dest) - strlen(dest) - 1). strncmp(s1, s2, n) compares at most n characters, which is useful for prefix matching (checking whether a string starts with a specific substring) without comparing the entire string. While the bounded variants are significantly safer than their unbounded counterparts, they still require careful calculation of buffer sizes. Modern C code increasingly uses non-standard but safer alternatives like snprintf for formatting or strlcpy/strlcat (available on BSD and macOS) that provide cleaner semantics for bounded string operations.`,
      keyPoints: [
        '`strncpy(dest, src, n)` copies at most `n` characters from the source. If the source string is longer than `n`, it strictly stops copying to protect the buffer. CRITICAL TRAP: If it stops early, it DOES NOT append a null terminator! You must append it manually.',
        '`strncat(dest, src, n)` appends at most `n` characters from the source to the destination. Unlike its sibling `strncpy`, `strncat` is well-designed: it ALWAYS guarantees a null terminator is added at the very end.',
        '`strncmp(s1, s2, n)` compares at most the first `n` characters of two strings. This is incredibly useful for validating text prefixes (e.g., checking if a URL starts with "https://").',
        'The gold standard security idiom for `strncpy` is two lines of code: `strncpy(dest, src, sizeof(dest) - 1);` followed immediately by `dest[sizeof(dest) - 1] = \'\\0\';` to force termination.',
      ],
      codeExamples: [
        {
          id: 'u3-t2-s2-ex1',
          title: 'Safe Copying with strncpy',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char dest[6]; /* Can hold 5 chars + \\0 */\n    const char *src = "This is a very long string";\n    \n    /* Copy at most 5 characters to leave room for \\0 */\n    strncpy(dest, src, sizeof(dest) - 1);\n    \n    /* MANDATORY: Manually apply the null terminator! */\n    dest[sizeof(dest) - 1] = \'\\0\';\n    \n    printf("Safe copy: %s\\n", dest);\n    return 0;\n}',
          language: 'c',
          explanation: 'This exemplifies the defensive programming required in C. We instruct `strncpy` to copy a maximum of 5 characters, deliberately withholding the 6th byte. `strncpy` obediently copies "This " and hits the limit. Because it was artificially stopped before seeing the source\'s `\\0`, it simply exits, leaving the destination array unterminated. We must then manually write the `\'\\0\'` into the final reserved slot to ensure `printf` does not subsequently crash the program.',
          expectedOutput: 'Safe copy: This ',
          lineBreakdown: [
            { lineNumber: 9, code: '    strncpy(dest, src, sizeof(dest) - 1);', explanation: '`sizeof(dest)` is 6. We defensively cap the copy operation at exactly 5 characters.' },
            { lineNumber: 12, code: '    dest[sizeof(dest) - 1] = \'\\0\';', explanation: 'Forces the absolute last index (index 5) to act as the null terminator, guaranteeing safety.' },
          ],
          relatedTopicIds: [],
        },
        {
          id: 'u3-t2-s2-ex2',
          title: 'Safe Appending with strncat',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char dest[12] = "Hello";\n    const char *src = " World, and universe";\n    \n    /* Calculate remaining space: total size - current length - 1 (for \\0) */\n    size_t remaining = sizeof(dest) - strlen(dest) - 1;\n    \n    strncat(dest, src, remaining);\n    \n    printf("Safe concat: %s\\n", dest);\n    return 0;\n}',
          language: 'c',
          explanation: '`strncat` represents a massive security upgrade over `strcat` because it categorically guarantees it will append a null terminator. However, using it requires mathematical precision: the `n` parameter does not represent the total size of the buffer, but rather the strictly available empty space remaining inside the buffer.',
          expectedOutput: 'Safe concat: Hello World',
          lineBreakdown: [
            { lineNumber: 9, code: '    size_t remaining = sizeof(dest) - strlen(dest) - 1;', explanation: 'Calculates vacancy: Total capacity (12), minus currently occupied bytes (5), minus 1 to reserve room for the terminating null.' },
            { lineNumber: 11, code: '    strncat(dest, src, remaining);', explanation: 'Appends characters up to the calculated limit, then permanently seals the string with a `\\0`.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t2-s2-cm1',
          title: 'Assuming strncpy null-terminates',
          wrongCode: 'char dest[5];\nstrncpy(dest, "LongString", 5);\nprintf("%s", dest); /* Crash! */',
          correctCode: 'char dest[5];\nstrncpy(dest, "LongString", 4);\ndest[4] = \'\\0\';\nprintf("%s", dest);',
          explanation: 'If `strncpy` exhausts its `n` limit before it encounters a null terminator in the source data, it simply stops executing and returns. It does not clean up after itself. The resulting array is physically full of characters but lacks a `\\0`. When passed to `printf`, the program will enthusiastically read past the bounds of the array, vomiting adjacent memory onto the screen.',
          consequence: 'Information leak or segmentation fault.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t2-s2-ic1',
          title: 'strlcpy and strlcat',
          content: 'Because `strncpy` requires such meticulous manual termination (a trap that has caused countless vulnerabilities), alternative platforms like BSD and macOS introduced `strlcpy` and `strlcat`. These functions ALWAYS guarantee null-termination natively and are vastly superior in design. However, they are completely excluded from the standard C library and are not included in Linux glibc by default. In portable, cross-platform C code, you must stick to rigorous, manual `strncpy` usage.',
          relatedTopicIds: [],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t2-s2-cp1',
          title: 'Safe String Functions',
          description: 'Verify your understanding of bounded string manipulation functions.',
          criteria: [
            'Explain the critical architectural flaw in `strncpy` regarding null termination.',
            'Write the canonical, two-line idiomatic C code to safely copy a string into a buffer of size 10 using `strncpy`.',
            'Explain the mathematical formula required to calculate the remaining space in a buffer for `strncat`.',
          ],
          topicId: 'u3-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t2-s2-rc1',
          front: 'What is the most critical behavioral difference between `strncpy` and `strncat` regarding the null terminator?',
          back: '`strncat` inherently guarantees the resulting string is null-terminated. `strncpy` strictly does NOT guarantee termination if the source string exceeds the size limit.',
          topicId: 'u3-t2',
          tags: ['strings', 'strncpy', 'strncat'],
        },
        {
          id: 'u3-t2-s2-rc2',
          front: 'What is the gold standard idiom for copying memory into a buffer named `dest` safely?',
          back: '`strncpy(dest, src, sizeof(dest) - 1);` followed immediately by `dest[sizeof(dest) - 1] = \'\\0\';` to force safety.',
          topicId: 'u3-t2',
          tags: ['strings', 'security'],
        },
      ],
    },
    {
      id: 'u3-t2-s3',
      title: 'Searching and Tokenizing Strings',
      slug: 'searching-tokenizing-strings',
      description: `Beyond basic copying, comparison, and concatenation, the <string.h> library provides functions for searching within strings and decomposing strings into tokens \u2014 operations that are essential for parsing text-based data formats, processing command-line arguments, and implementing text search features.

strstr(haystack, needle) searches for the first occurrence of the substring needle within the string haystack, returning a pointer to the beginning of the match, or NULL if no match is found. Because it returns a pointer into the original string rather than a copy, you can use the returned pointer to extract the matched position, compute an index (by subtracting the original pointer: index = strstr(str, sub) - str), or begin processing the remainder of the string from the match point onward. strchr(str, c) performs the simpler operation of finding the first occurrence of a single character c within str, also returning a pointer to that character or NULL. Both functions use linear scanning and have O(N) time complexity.

strtok(str, delimiters) is the most complex and most dangerous of the search functions. It splits a string into a sequence of tokens separated by any character in the delimiters string. On the first call, you pass the string to tokenize; on subsequent calls, you pass NULL to continue tokenizing the same string. strtok works by modifying the original string in place: it replaces delimiter characters with null terminators and maintains a static internal pointer to track its position between calls. This statefulness has two critical implications: first, the original string is permanently modified (every delimiter is replaced with '\\0'), so if you need the original intact, you must copy it before tokenizing. Second, because strtok uses a static internal variable, it is not reentrant and is not safe to use in multithreaded programs or in nested tokenization loops. The thread-safe alternative is strtok_r, which takes an explicit state pointer as an additional argument.`,
      keyPoints: [
        '`strchr(str, char)` scans memory to find the FIRST occurrence of a specific character. It returns a pointer directly to that character, or `NULL` if the character is completely absent.',
        '`strrchr(str, char)` performs the same function but in reverse, finding the LAST occurrence of a character.',
        '`strstr(haystack, needle)` scans a large string (the haystack) to locate the exact starting point of a smaller substring (the needle). It returns a pointer to the start of the match, or `NULL`.',
        '`strtok(str, delimiters)` acts as a destructive tokenizer. It physically mutates the original string by locating delimiter characters (like spaces or commas) and overwriting them with `\'\\0\'` bytes, thereby fracturing the text into isolated words.',
        'The Statefulness Trap: Because `strtok` must remember where it left off in the array, you only pass the string in the very first call. To extract subsequent tokens, you must strictly pass `NULL` as the first argument.',
      ],
      codeExamples: [
        {
          id: 'u3-t2-s3-ex1',
          title: 'Finding Substrings (strstr)',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    const char *text = "The quick brown fox jumps";\n    const char *word = "brown";\n    \n    /* strstr returns a pointer to the start of "brown" in text */\n    char *match = strstr(text, word);\n    \n    if (match != NULL) {\n        printf("Found substring! Rest of string: %s\\n", match);\n        /* Calculate the index using pointer arithmetic */\n        printf("Found at index: %td\\n", match - text);\n    } else {\n        printf("Not found.\\n");\n    }\n    return 0;\n}',
          language: 'c',
          explanation: '`strstr` returns a memory pointer indicating precisely where the needle begins inside the haystack. If you pass this pointer to `printf`, it predictably prints everything from that exact memory address forward until the end of the string. More impressively, by using pointer arithmetic to subtract the original base address of the array from the match address (`match - text`), we can mathematically calculate the exact integer index where the word begins.',
          expectedOutput: 'Found substring! Rest of string: brown fox jumps\nFound at index: 10',
          lineBreakdown: [
            { lineNumber: 9, code: '    char *match = strstr(text, word);', explanation: 'Scans `text` looking for the exact sequence "brown". Returns a pointer to the \'b\'.' },
            { lineNumber: 14, code: '        printf("Found at index: %td\\n", match - text);', explanation: 'Pointer arithmetic in action. The address of the \'b\' minus the address of the \'T\' yields an offset of exactly 10 bytes.' },
          ],
          relatedTopicIds: ['u2-t4'],
        },
        {
          id: 'u3-t2-s3-ex2',
          title: 'Tokenizing with strtok',
          code: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    /* MUST be a writable array! strtok modifies it. */\n    char csv[] = "apple,banana,orange,grape";\n    const char *delim = ",";\n    \n    /* First call: pass the string */\n    char *token = strtok(csv, delim);\n    \n    while (token != NULL) {\n        printf("Token: %s\\n", token);\n        /* Subsequent calls: pass NULL to continue from last spot */\n        token = strtok(NULL, delim);\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: '`strtok` is the quintessential workhorse for parsing configuration files or CSV data. It operates destructively: it actively hunts for the delimiter character (\',\') and physically overwrites it in RAM with a null terminator. This severs the string. To continue parsing the remainder of the fractured text, `strtok` relies on an internal static variable to remember its position. By passing `NULL`, we command the function to resume exactly where it previously paused.',
          expectedOutput: 'Token: apple\nToken: banana\nToken: orange\nToken: grape',
          lineBreakdown: [
            { lineNumber: 6, code: '    char csv[] = "apple,banana,orange,grape";', explanation: 'This MUST be a writable array. If we used `char *csv = ...`, `strtok` would violently crash attempting to overwrite read-only memory.' },
            { lineNumber: 10, code: '    char *token = strtok(csv, delim);', explanation: 'Injects a `\\0` over the first comma, isolating "apple", and returning a pointer to it.' },
            { lineNumber: 15, code: '        token = strtok(NULL, delim);', explanation: 'The `NULL` argument commands the function to leverage its internal state memory to resume parsing the remaining string.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u3-t2-s3-cm1',
          title: 'Using strtok on a string literal',
          wrongCode: 'char *text = "a,b,c";\nstrtok(text, ","); /* Crash! */',
          correctCode: 'char text[] = "a,b,c";\nstrtok(text, ",");',
          explanation: '`strtok` is aggressively destructive. It fundamentally relies on the ability to physically inject null terminators (`\\0`) directly into the target text. String literals (like `"a,b,c"` when assigned to a pointer) are permanently housed in the read-only Text segment of your application. When `strtok` attempts its overwrite on protected memory, the OS triggers a fatal segmentation fault.',
          consequence: 'Segmentation fault.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u3-t2-s3-ic1',
          title: 'Is strtok thread-safe?',
          content: 'An advanced interview question: "Is `strtok` thread-safe?" The answer is an emphatic NO. Because `strtok` relies on a hidden, static internal variable to remember its parsing position between calls, its state is global. If two independent threads attempt to use `strtok` simultaneously, they will catastrophically corrupt each other\'s parsing state. In modern multithreaded systems, you must always use the reentrant variants `strtok_r` (POSIX/Linux) or `strtok_s` (Windows).',
          relatedTopicIds: ['u2-t8'],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u3-t2-s3-cp1',
          title: 'Searching and Parsing',
          description: 'Verify your understanding of pointer manipulation and tokenization state.',
          criteria: [
            'Demonstrate how to calculate an integer index from the pointer returned by `strstr`.',
            'Explain the mechanical necessity of passing `NULL` to subsequent `strtok` calls.',
            'Explain precisely why invoking `strtok` on a string literal causes a segmentation fault.',
          ],
          topicId: 'u3-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u3-t2-s3-rc1',
          front: 'What exactly does `strstr` return?',
          back: 'A physical memory pointer indicating the very first character of the located substring, or `NULL` if the text is utterly absent.',
          topicId: 'u3-t2',
          tags: ['strings', 'strstr'],
        },
        {
          id: 'u3-t2-s3-rc2',
          front: 'Why is it mandatory to pass `NULL` as the first argument to `strtok` inside a parsing loop?',
          back: 'Passing `NULL` commands the function to query its internal static memory and resume fracturing the original text exactly where it previously stopped.',
          topicId: 'u3-t2',
          tags: ['strings', 'strtok'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u3-t2-q1',
      type: 'mcq',
      topicId: 'u3-t2',
      difficulty: 'beginner',
      question: 'Which function should be used to safely append one string to another?',
      options: ['strcat', 'strncpy', 'strncat', 'strcmp'],
      correctAnswer: 'strncat',
      explanation: '`strncat` requires a limit and always null-terminates, making it safe from buffer overflows, unlike `strcat`.',
      tags: ['strings', 'security', 'strncat'],
    },
    {
      id: 'u3-t2-q2',
      type: 'predict-output',
      topicId: 'u3-t2',
      difficulty: 'intermediate',
      question: 'What is the output?',
      code: '#include <stdio.h>\n#include <string.h>\nint main() {\n    char dest[10] = "ABC";\n    strncpy(dest, "XYZ", 2);\n    printf("%s", dest);\n    return 0;\n}',
      correctAnswer: 'XYC',
      explanation: '`strncpy` copies exactly 2 chars (\'X\' and \'Y\'). It overwrites \'A\' and \'B\' in `dest`. The \'C\' and the null terminator remain untouched. The array becomes [X, Y, C, \\0].',
      tags: ['strings', 'strncpy'],
    },
    {
      id: 'u3-t2-q3',
      type: 'spot-bug',
      topicId: 'u3-t2',
      difficulty: 'intermediate',
      question: 'Spot the bug:',
      code: 'char password[10];\nscanf("%9s", password);\nif (password == "admin123") {\n    printf("Access Granted");\n}',
      correctAnswer: 'Using == to compare string contents.',
      explanation: '`password == "admin123"` compares the memory address of the local array to the memory address of the string literal. They will never match. You must use `strcmp(password, "admin123") == 0`.',
      tags: ['strings', 'strcmp', 'comparison'],
    },
    {
      id: 'u3-t2-q4',
      type: 'true-false',
      topicId: 'u3-t2',
      difficulty: 'advanced',
      question: '`strtok` creates new string arrays in memory for each token it finds.',
      correctAnswer: false,
      explanation: '`strtok` does not allocate new memory. It modifies the existing string by inserting null terminators (`\\0`) in place of delimiters, and returns pointers pointing into the original array.',
      tags: ['strings', 'strtok', 'memory'],
    },
    {
      id: 'u3-t2-q5',
      type: 'mcq',
      topicId: 'u3-t2',
      difficulty: 'intermediate',
      question: 'What does `strlen` return for `char arr[50] = "Hi";`?',
      options: ['50', '2', '3', 'Garbage'],
      correctAnswer: '2',
      explanation: '`strlen` counts characters until it hits the first `\\0`. Even though the array capacity is 50, the null terminator is at index 2, so the length is 2.',
      tags: ['strings', 'strlen'],
    },
  ],

  programmingProblems: [
    {
      id: 'u3-t2-new-easy',
      title: 'String Length Manually',
      topicId: 'u3-t2',
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
      id: 'u3-t2-new-med',
      title: 'Bank Account Struct',
      topicId: 'u3-t2',
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
      id: 'u3-t2-new-hard',
      title: 'Linked List Middle',
      topicId: 'u3-t2',
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
      id: 'u3-t2-p1',
      title: 'Safe String Copy',
      topicId: 'u3-t2',
      difficulty: 'beginner',
      problemStatement: 'Write a program that asks the user for a long string using fgets. Create a destination array of size 10. Use `strncpy` to safely copy the user input into the destination array without overflowing it. Ensure it prints correctly.',
      constraints: ['Use strncpy', 'Must manually null-terminate'],
      sampleInput: 'This is a very long sentence',
      sampleOutput: 'Copied: This is a',
      hints: ['strncpy(dest, src, sizeof(dest) - 1);', 'dest[sizeof(dest) - 1] = \'\\0\';'],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char input[100];\n    char dest[10];\n    \n    printf("Enter a long string: ");\n    fgets(input, sizeof(input), stdin);\n    \n    strncpy(dest, input, sizeof(dest) - 1);\n    dest[sizeof(dest) - 1] = \'\\0\';\n    \n    printf("Copied: %s\\n", dest);\n    return 0;\n}',
      solutionExplanation: 'This is the canonical pattern for safe string copying in C. It guarantees that no matter how much the user types, exactly 9 characters are copied, and the 10th slot is forced to be a null terminator.',
      dryRun: [
        { step: 1, line: 9, variables: {}, output: '', explanation: 'input gets "This is a very long sentence"' },
        { step: 2, line: 11, variables: {}, output: '', explanation: 'strncpy copies 9 chars: "This is a"' },
        { step: 3, line: 12, variables: {}, output: '', explanation: 'dest[9] = \\0. Array is safely terminated.' },
      ],
      tags: ['strings', 'strncpy', 'security'],
    },
    {
      id: 'u3-t2-p2',
      title: 'Count Words (Tokenization)',
      topicId: 'u3-t2',
      difficulty: 'intermediate',
      problemStatement: 'Given a sentence, use `strtok` to split it into words (using space " " as the delimiter). Count and print the total number of words.',
      constraints: ['Use strtok'],
      sampleInput: 'C programming is very fun',
      sampleOutput: 'Word count: 5',
      hints: ['Initialize a counter to 0.', 'char *token = strtok(str, " ");', 'while(token != NULL) { counter++; token = strtok(NULL, " "); }'],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    /* Writable array */\n    char sentence[] = "C programming is very fun";\n    int count = 0;\n    \n    char *token = strtok(sentence, " ");\n    while (token != NULL) {\n        count++;\n        token = strtok(NULL, " ");\n    }\n    \n    printf("Word count: %d\\n", count);\n    return 0;\n}',
      solutionExplanation: '`strtok` is perfectly designed for this. It replaces spaces with null terminators and gives us a pointer to each word. Every time it finds a word, we increment the count.',
      dryRun: [
        { step: 1, line: 9, variables: { token: '"C"' }, output: '', explanation: 'First token extracted. count=1.' },
        { step: 2, line: 12, variables: { token: '"programming"' }, output: '', explanation: 'Second token extracted. count=2.' },
        { step: 3, line: 12, variables: { token: '"is"' }, output: '', explanation: 'Third token extracted. count=3. (continues until NULL)' },
      ],
      tags: ['strings', 'strtok', 'counting'],
    },
    {
      id: 'u3-t2-p3',
      title: 'Find and Replace Prefix',
      topicId: 'u3-t2',
      difficulty: 'advanced',
      problemStatement: 'Read a URL string. If it begins with "http://", create a new string where it is replaced with "https://". Use string functions to do this safely. Assume max length 100.',
      constraints: ['Use strncmp to check prefix', 'Use strcpy and strcat to build the new string'],
      sampleInput: 'http://example.com',
      sampleOutput: 'https://example.com',
      hints: ['strncmp(url, "http://", 7) == 0', 'strcpy(newUrl, "https://");', 'strcat(newUrl, url + 7); /* Pointer arithmetic! */'],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char url[100];\n    char newUrl[100];\n    \n    scanf("%s", url);\n    \n    /* Check if the first 7 characters match */\n    if (strncmp(url, "http://", 7) == 0) {\n        strcpy(newUrl, "https://");\n        /* Append the rest of the original url, skipping the first 7 chars */\n        strcat(newUrl, url + 7);\n        printf("%s\\n", newUrl);\n    } else {\n        printf("No change: %s\\n", url);\n    }\n    \n    return 0;\n}',
      solutionExplanation: 'Combines multiple concepts: `strncmp` to check a prefix safely, `strcpy` to set the base of the new string, and pointer arithmetic (`url + 7`) to skip the old prefix when appending the rest with `strcat`.',
      dryRun: [
        { step: 1, line: 8, variables: {}, output: '', explanation: 'url = "http://google.com"' },
        { step: 2, line: 11, variables: {}, output: '', explanation: 'strncmp matches. strcpy puts "https://" into newUrl.' },
        { step: 3, line: 14, variables: {}, output: '', explanation: 'url + 7 points to "google.com". strcat appends it. newUrl becomes "https://google.com".' },
      ],
      tags: ['strings', 'strncmp', 'strcat', 'pointers'],
    },
  ],
};
