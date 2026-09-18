import type { Topic } from '../../../../types';

export const fileHandlingFunctions: Topic = {
  id: 'u4-t2',
  unitId: 'unit-4',
  title: 'File Handling Functions',
  slug: 'file-handling-functions',
  description: `File handling functions in C provide direct, programmatic control over the file system through the standard I/O library defined in <stdio.h>. Unlike I/O redirection, which relies on the shell to reconnect standard streams before a program launches, file handling functions allow a C program to open, read, write, seek within, and close arbitrary files at any point during execution — and to have multiple files open simultaneously. The central abstraction is the FILE structure, an opaque type that encapsulates all the bookkeeping the C runtime needs to manage a buffered connection to a file: the underlying operating system file descriptor, a user-space buffer (typically 4096 or 8192 bytes), the current read/write position within the file, end-of-file and error status flags, and the mode in which the file was opened. Every file operation — fprintf, fscanf, fgets, fwrite, fread, fseek — operates through a FILE pointer, and the lifetime of that pointer follows a strict open-use-close discipline that is the programmer's responsibility to enforce. Failure to close files leaks file descriptors, a finite kernel resource (typically limited to 1024 per process on Linux), and can leave write buffers unflushed, causing data loss. Understanding the layered architecture of file handling — user-space buffering on top of kernel-level file descriptors on top of physical disk I/O — is essential for writing correct, efficient, and robust C programs that interact with persistent storage.`,
  difficulty: 'intermediate',
  prerequisites: ['u4-t1'],
  estimatedMinutes: 60,
  subtopics: [
    {
      id: 'u4-t2-s1',
      title: 'Opening, Closing, and Text Modes',
      slug: 'opening-closing-files',
      description: `The fopen function is the gateway to programmatic file access in C, serving as the user-space wrapper around the operating system's open() system call. When you call fopen("data.txt", "w"), the C runtime requests the kernel to open (or create) the file, allocates a FILE structure on the heap, initialises the internal buffer and position tracking, and returns a pointer to this structure. If the operation fails — because the file does not exist (in "r" mode), the directory is not writable, the disk is full, or the per-process file descriptor limit has been reached — fopen returns NULL. Dereferencing a NULL FILE pointer (by passing it to fprintf, fscanf, or any other I/O function) triggers undefined behavior, almost always manifesting as a segmentation fault. Checking the return value of fopen against NULL before proceeding is therefore not a best practice but an absolute requirement.

The mode string controls both the direction of I/O and the file's initial state. Mode "r" opens for reading and fails if the file does not exist; mode "w" opens for writing and truncates the file to zero length if it already exists (a destructive operation that permanently destroys existing contents the instant fopen returns); mode "a" opens for appending and positions the write cursor at the end of the file, preserving existing contents. Each mode has a "+" variant ("r+", "w+", "a+") that enables both reading and writing on the same stream.

The fclose function performs two critical operations: it flushes the internal write buffer (ensuring all data that has been fprintf'd or fwrite'n actually reaches the disk), and it releases the file descriptor back to the kernel. In long-running programs like servers or daemons, failing to call fclose after each file operation creates a file descriptor leak. The operating system imposes a hard limit on open file descriptors per process (controllable via ulimit on Unix); once this limit is exhausted, every subsequent fopen returns NULL, and the program can no longer open any files, sockets, or pipes — a failure mode that is notoriously difficult to diagnose because the error occurs far from the original leak site.`,
      keyPoints: [
        "FILE * is a pointer to a hidden structure that tracks the file\'s location on disk, buffer, and current reading position.",
        'fopen("filename", "mode"): Asks the OS to open a file. Returns a FILE *, or NULL if it fails (e.g., file not found, permission denied).',
        'ALWAYS check if the FILE * is NULL before using it!',
        'fclose(file_pointer): Flushes the buffer and releases the file back to the OS. Failing to close files causes memory leaks and file locks.',
        'Modes: "r" (read, fails if missing), "w" (write, overwrites/creates), "a" (append, adds to end/creates).',
      ],
      codeExamples: [
        {
          id: 'u4-t2-s1-ex1',
          title: 'Safe File Opening Pattern',
          code: '#include <stdio.h>\n\nint main(void) {\n    /* 1. Open the file in write mode */\n    FILE *file = fopen("data.txt", "w");\n    \n    /* 2. ALWAYS check for NULL */\n    if (file == NULL) {\n        printf("Error: Could not open file.\\n");\n        return 1;\n    }\n    \n    /* 3. Interact with the file (using fputs instead of puts) */\n    fputs("Hello File System!\\n", file);\n    \n    /* 4. ALWAYS close the file */\n    fclose(file);\n    printf("File written and closed safely.\\n");\n    \n    return 0;\n}',
          language: 'c',
          explanation: 'This is the mandatory boilerplate for file handling. You open, you check for failure, you work, you close.',
          expectedOutput: 'File written and closed safely.',
          lineBreakdown: [
            { lineNumber: 5, code: '    FILE *file = fopen("data.txt", "w");', explanation: 'Creates data.txt if it doesn\'t exist. If it DOES exist, it deletes all its contents instantly.' },
            { lineNumber: 8, code: '    if (file == NULL) {', explanation: 'If the disk is full, or you lack permissions, fopen returns NULL. Writing to a NULL file pointer causes a segfault.' },
            { lineNumber: 17, code: '    fclose(file);', explanation: 'Releases the OS lock on the file. Data might sit in RAM until you call this, so forgetting it can mean empty files.' },
          ],
          relatedTopicIds: ['u3-t4'],
        },
      ],
      commonMistakes: [
        {
          id: 'u4-t2-s1-cm1',
          title: 'Opening for read without checking NULL',
          wrongCode: 'FILE *f = fopen("missing.txt", "r");\nfgets(buffer, 100, f); /* CRASH */',
          correctCode: 'FILE *f = fopen("missing.txt", "r");\nif (f == NULL) return 1;\nfgets(buffer, 100, f);',
          explanation: "If \"r\" mode cannot find the file, it returns NULL. Passing NULL to fgets or fscanf will immediately crash the program.",
          consequence: 'Segmentation fault.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u4-t2-s1-ic1',
          title: 'File Descriptor Leaks',
          content: "Interviewer: \"What happens if a server program repeatedly calls fopen but forgets to call fclose?\" Answer: \"A File Descriptor Leak. The OS imposes a limit on how many files a program can have open simultaneously (often 1024). Once that limit is hit, fopen will permanently return NULL for all future calls, and the server will crash or hang.\"",
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u4-t2-s1-cp1',
          title: 'fopen Basics',
          description: 'Verify file opening logic.',
          criteria: [
            "What does fopen return if it fails?",
            "What is the difference between \"w\" mode and \"a\" mode?",
            "Why is fclose mandatory?",
          ],
          topicId: 'u4-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u4-t2-s1-rc1',
          front: "What does fopen(\"log.txt\", \"w\") do if log.txt already exists?",
          back: 'It completely erases (truncates) the existing file and starts fresh.',
          topicId: 'u4-t2',
          tags: ['file-io', 'fopen'],
        },
        {
          id: 'u4-t2-s1-rc2',
          front: 'What data type tracks an open file in C?',
          back: "A FILE * (Pointer to a FILE structure).",
          topicId: 'u4-t2',
          tags: ['file-io', 'pointers'],
        },
      ],
    },
    {
      id: 'u4-t2-s2',
      title: 'Reading and Writing Text',
      slug: 'reading-writing-text',
      description: `The C standard library provides a complete set of formatted I/O functions for text files that mirror their terminal counterparts: fprintf writes formatted text to a file exactly as printf writes to stdout, fscanf reads formatted input from a file exactly as scanf reads from stdin, and fputs/fgets write and read raw strings. The key difference is that each file-oriented function takes a FILE pointer as its first argument, directing the operation to a specific open file rather than to the implicit standard streams. Internally, these functions write into the FILE structure's user-space buffer rather than issuing a system call for every character; the buffer is flushed to the kernel (via the write() system call) when it fills up, when a newline is encountered (in line-buffered mode), or when fflush or fclose is explicitly called. This buffering dramatically reduces the number of expensive kernel transitions, improving throughput for programs that perform many small writes.

The fgets function deserves special attention because it is the only safe way to read text lines in C. Unlike gets (which was removed from the C11 standard due to its inability to prevent buffer overflows), fgets accepts a maximum size parameter and will never write more than size bytes into the destination buffer, including the null terminator. It reads until it encounters a newline character (which it stores in the buffer), until it has read size-1 characters, or until end-of-file is reached — whichever comes first. When end-of-file is reached with no characters read, fgets returns NULL, making it the ideal loop condition for processing text files line by line: while (fgets(buffer, sizeof(buffer), fp) != NULL).

A pervasive beginner mistake is using feof() as the primary loop condition: while (!feof(fp)). This fails because feof returns true only after a read operation has already attempted to read past the end of the file. In a loop controlled by !feof, the final iteration executes the read, which fails silently (returning garbage or leaving the buffer unchanged), and then processes the stale buffer contents before feof finally returns true on the next iteration. The correct idiom is to check the return value of the read function itself (fscanf's return count or fgets' NULL return), which simultaneously performs the read and detects end-of-file in a single atomic check.`,
      keyPoints: [
        "fprintf(file, format, ...): Just like printf, but takes the FILE* as the first argument.",
        "fscanf(file, format, ...): Reads formatted data from the file. Returns EOF when the file ends.",
        "fgets(buffer, size, file): Reads a full line of text safely, preventing buffer overflow.",
        "feof(file): Returns true if the End Of File indicator has been set for that stream.",
      ],
      codeExamples: [
        {
          id: 'u4-t2-s2-ex1',
          title: 'Writing Data (fprintf)',
          code: '#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("scores.txt", "w");\n    if (fp == NULL) return 1;\n    \n    char name[] = "Alice";\n    int score = 95;\n    \n    /* Works exactly like printf, but goes to the file */\n    fprintf(fp, "Player: %s\\n", name);\n    fprintf(fp, "Score: %d\\n", score);\n    \n    fclose(fp);\n    return 0;\n}',
          language: 'c',
          explanation: "fprintf is incredibly powerful because you already know how to use it from printf. It formats numbers and strings easily.",
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 11, code: '    fprintf(fp, "Player: %s\\n", name);', explanation: 'The first argument is the FILE pointer. The rest is standard format string and variables.' },
          ],
          relatedTopicIds: ['u1-t4'],
        },
        {
          id: 'u4-t2-s2-ex2',
          title: 'Reading Data (fgets)',
          code: '#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("scores.txt", "r");\n    if (fp == NULL) return 1;\n    \n    char buffer[100];\n    \n    /* fgets returns NULL when it hits EOF */\n    while (fgets(buffer, sizeof(buffer), fp) != NULL) {\n        /* Print the line to the screen */\n        printf("READ: %s", buffer);\n    }\n    \n    fclose(fp);\n    return 0;\n}',
          language: 'c',
          explanation: "fgets reads up to a newline character \\n, stores the newline, adds a \\0, and returns. It is the absolute safest way to read text files line by line.",
          expectedOutput: 'READ: Player: Alice\nREAD: Score: 95',
          lineBreakdown: [
            { lineNumber: 10, code: '    while (fgets(buffer, sizeof(buffer), fp) != NULL) {', explanation: "Reads one line at a time. Protects against overflow by respecting sizeof(buffer)." },
          ],
          relatedTopicIds: ['u3-t2'],
        },
      ],
      commonMistakes: [
        {
          id: 'u4-t2-s2-cm1',
          title: 'Using feof() incorrectly as a loop condition',
          wrongCode: 'while (!feof(fp)) {\n    fscanf(fp, "%d", &num);\n    printf("%d ", num);\n}',
          correctCode: 'while (fscanf(fp, "%d", &num) == 1) {\n    printf("%d ", num);\n}',
          explanation: "feof() does not return true until AFTER you try to read past the end of the file. If you use it as the while condition, the loop will execute one extra time, reading garbage or duplicating the last line.",
          consequence: 'Last line of the file is processed twice.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u4-t2-s2-ic1',
          title: 'fscanf vs fgets',
          content: "If asked how to parse a complex text file, never answer fscanf. Say you will use fgets to safely read a line into memory, and then use sscanf (string scan) or strtok to parse the buffer. fscanf handles spaces and newlines poorly and can easily desync and corrupt the rest of the parsing process.",
          relatedTopicIds: ['u3-t2'],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u4-t2-s2-cp1',
          title: 'Text I/O',
          description: 'Verify file reading/writing mechanics.',
          criteria: [
            "What is the difference between printf and fprintf?",
            "What does fgets return when it reaches the end of the file?",
            "Why is while(!feof(file)) considered bad practice?",
          ],
          topicId: 'u4-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u4-t2-s2-rc1',
          front: 'What function writes formatted text to a file?',
          back: "fprintf(file_pointer, \"format\", ...)",
          topicId: 'u4-t2',
          tags: ['file-io', 'fprintf'],
        },
        {
          id: 'u4-t2-s2-rc2',
          front: 'What is the safest function to read a text file line-by-line?',
          back: "fgets(buffer, size, file_pointer)",
          topicId: 'u4-t2',
          tags: ['file-io', 'fgets'],
        },
      ],
    },
    {
      id: 'u4-t2-s3',
      title: 'Binary I/O and File Positioning',
      slug: 'binary-io-fseek',
      description: `Binary I/O bypasses the text-mode translation layer and transfers raw memory bytes between RAM and disk without any interpretation or conversion. In text mode, the C runtime translates platform-specific line endings (\\r\\n on Windows) to the universal \\n that C programs expect, and vice versa on output; it also stores numeric values as human-readable ASCII strings, so the integer 42 becomes the two-byte sequence '4' '2'. Binary mode (opened with "rb" or "wb") disables all translation: the integer 42 is stored as its exact four-byte memory representation (e.g., 2A 00 00 00 on a little-endian system), and newline bytes pass through unmodified.

The fwrite function takes a pointer to a block of memory, the size of one element, and the count of elements, and writes size * count bytes directly from RAM to the file in a single operation. Its counterpart fread performs the reverse, reading raw bytes from the file directly into a memory buffer. This makes binary I/O extraordinarily efficient for saving and loading structured data: an array of 1000 Player structs can be written with a single fwrite call and read back with a single fread call, with no parsing, no format strings, and no string-to-number conversion overhead. However, binary files are not portable across different CPU architectures because they encode the platform's byte order (endianness) and struct padding directly; a save file written on a little-endian x86 machine will produce corrupted data if read on a big-endian PowerPC machine without explicit byte-swapping.

File positioning functions — fseek, ftell, and rewind — provide random access within a file by manipulating the FILE structure's internal position indicator. fseek(fp, offset, origin) moves the cursor to a byte offset relative to the start (SEEK_SET), current position (SEEK_CUR), or end (SEEK_END) of the file. ftell(fp) returns the current byte offset from the start. Together, these functions enable O(1) direct access to any record in a binary file: to read the Nth record in a file of fixed-size structs, you compute the byte offset as N * sizeof(Record), seek directly to that position, and fread a single record — without scanning through the preceding N-1 records. This random-access capability is the foundation of simple database implementations, game save systems, and any application that needs to read or update specific records within a large file without loading the entire file into memory.`,
      keyPoints: [
        "Open with \"rb\" or \"wb\" for binary mode. This prevents the OS from tampering with newline characters (\\n to \\r\\n).",
        "fwrite(pointer, size, count, file): Dumps a block of raw RAM directly to the disk.",
        "fread(pointer, size, count, file): Reads a block of raw bytes from disk directly into RAM.",
        "File Positioning: A FILE* maintains an internal \"cursor\" indicating where it is currently reading/writing.",
        "fseek(file, offset, origin): Moves the cursor to a specific byte. (Origins: SEEK_SET start, SEEK_CUR current, SEEK_END end).",
        "ftell(file): Returns the current byte position of the cursor.",
      ],
      codeExamples: [
        {
          id: 'u4-t2-s3-ex1',
          title: 'Saving Structs to Binary Files',
          code: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    float health;\n} Player;\n\nint main(void) {\n    Player p1 = {404, 99.5f};\n    \n    /* Write Binary */\n    FILE *fw = fopen("save.dat", "wb");\n    if (fw) {\n        /* Write 1 Player struct directly from memory to disk */\n        fwrite(&p1, sizeof(Player), 1, fw);\n        fclose(fw);\n    }\n    \n    /* Read Binary */\n    Player p2 = {0, 0.0f}; /* Empty struct */\n    FILE *fr = fopen("save.dat", "rb");\n    if (fr) {\n        fread(&p2, sizeof(Player), 1, fr);\n        fclose(fr);\n        printf("Loaded: ID %d, HP %.1f\\n", p2.id, p2.health);\n    }\n    \n    return 0;\n}',
          language: 'c',
          explanation: "Binary I/O is incredible for saving game states or databases. You don't need to convert the integer to a string, write a space, convert the float, etc. fwrite just takes the 8 bytes of the struct in RAM and slams them onto the hard drive in one fast operation.",
          expectedOutput: 'Loaded: ID 404, HP 99.5',
          lineBreakdown: [
            { lineNumber: 12, code: '    FILE *fw = fopen("save.dat", "wb");', explanation: '"wb" means Write Binary.' },
            { lineNumber: 15, code: '        fwrite(&p1, sizeof(Player), 1, fw);', explanation: 'Address of data, size of one item, number of items, file pointer.' },
            { lineNumber: 23, code: '        fread(&p2, sizeof(Player), 1, fr);', explanation: 'Reads exactly sizeof(Player) bytes from disk directly into p2\'s memory.' },
          ],
          relatedTopicIds: ['u3-t5'],
        },
        {
          id: 'u4-t2-s3-ex2',
          title: 'Getting File Size using fseek/ftell',
          code: '#include <stdio.h>\n\nint main(void) {\n    FILE *fp = fopen("save.dat", "rb");\n    if (fp == NULL) return 1;\n    \n    /* 1. Seek to the absolute end of the file */\n    fseek(fp, 0, SEEK_END);\n    \n    /* 2. Ask ftell where the cursor is (byte offset from start) */\n    long size = ftell(fp);\n    \n    printf("File size: %ld bytes\\n", size);\n    \n    /* 3. Rewind to start if you want to read it now */\n    rewind(fp); /* equivalent to fseek(fp, 0, SEEK_SET) */\n    \n    fclose(fp);\n    return 0;\n}',
          language: 'c',
          explanation: "A very common idiom in C. By instantly teleporting the file cursor to the end (SEEK_END) with 0 offset, and then asking ftell for the cursor's position, you discover the total size of the file in bytes without having to read it.",
          expectedOutput: 'File size: 8 bytes\n(Depends on struct size/padding)',
          lineBreakdown: [
            { lineNumber: 8, code: '    fseek(fp, 0, SEEK_END);', explanation: 'Move cursor 0 bytes away from the END of the file.' },
            { lineNumber: 11, code: '    long size = ftell(fp);', explanation: 'Returns the byte index of the cursor, effectively giving the file size.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u4-t2-s3-cm1',
          title: 'Using strlen instead of sizeof in fwrite',
          wrongCode: 'Player p;\nfwrite(&p, strlen((char*)&p), 1, file);',
          correctCode: 'Player p;\nfwrite(&p, sizeof(Player), 1, file);',
          explanation: "strlen stops counting at the first \\0 byte. Binary structs often contain zero-bytes (e.g., an integer value of 5 is 05 00 00 00 in memory). strlen will hit that zero and stop writing, corrupting your save file. Always use sizeof.",
          consequence: 'Partial data written to disk, corrupting the file.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u4-t2-s3-ic1',
          title: 'Endianness in Binary Files',
          content: "If you save a binary file using fwrite on an Intel PC (Little Endian), and send that file to an ARM network router (Big Endian), fread will read the integer backwards! Text files are portable; binary files are NOT strictly portable across different CPU architectures.",
          relatedTopicIds: ['u3-t10'],
          frequency: 'rare',
        },
      ],
      checkpoints: [
        {
          id: 'u4-t2-s3-cp1',
          title: 'Binary and Fseek',
          description: 'Verify binary layout and seeking.',
          criteria: [
            'What fopen mode is required to read a binary file?',
            "What do the 4 arguments to fwrite represent?",
            "How do you use fseek and ftell to get a file's size in bytes?",
          ],
          topicId: 'u4-t2',
        },
      ],
      revisionCards: [
        {
          id: 'u4-t2-s3-rc1',
          front: "What does fwrite do?",
          back: 'Writes a block of raw memory bytes directly to a file (Binary I/O).',
          topicId: 'u4-t2',
          tags: ['file-io', 'binary', 'fwrite'],
        },
        {
          id: 'u4-t2-s3-rc2',
          front: 'What function moves the internal file cursor to a specific byte location?',
          back: "fseek(file_ptr, offset, origin)",
          topicId: 'u4-t2',
          tags: ['file-io', 'fseek'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u4-t2-q1',
      type: 'mcq',
      topicId: 'u4-t2',
      difficulty: 'beginner',
      question: "What does fopen return if it successfully opens a file?",
      options: ['1', '0', 'A FILE pointer (FILE *)', 'A file descriptor integer'],
      correctAnswer: 'A FILE pointer (FILE *)',
      explanation: "It returns a pointer to a FILE struct. Low-level UNIX open() returns an integer, but standard C fopen returns FILE *.",
      tags: ['file-io', 'fopen'],
    },
    {
      id: 'u4-t2-q2',
      type: 'true-false',
      topicId: 'u4-t2',
      difficulty: 'intermediate',
      question: "If you open a file with mode \"w\", and the file already exists, its contents are preserved and new data is appended to the end.",
      correctAnswer: false,
      explanation: "Mode \"w\" (write) completely destroys existing contents. To preserve and append, you must use mode \"a\" (append).",
      tags: ['file-io', 'modes'],
    },
    {
      id: 'u4-t2-q3',
      type: 'predict-output',
      topicId: 'u4-t2',
      difficulty: 'advanced',
      question: 'Assuming "data.bin" contains exactly 10 bytes of data. What is the output?',
      code: 'FILE *f = fopen("data.bin", "rb");\nfseek(f, 0, SEEK_END);\nlong s = ftell(f);\nprintf("%ld", s);',
      correctAnswer: '10',
      explanation: "fseek to SEEK_END puts the cursor at the very end of the 10 bytes. ftell reports the cursor is at byte offset 10.",
      tags: ['file-io', 'fseek', 'binary'],
    },
    {
      id: 'u4-t2-q4',
      type: 'spot-bug',
      topicId: 'u4-t2',
      difficulty: 'beginner',
      question: 'Spot the critical bug in this file reading code:',
      code: 'FILE *fp = fopen("config.txt", "r");\nchar buffer[100];\nfgets(buffer, 100, fp);\nprintf("%s", buffer);\nfclose(fp);',
      correctAnswer: 'No check for fp == NULL.',
      explanation: "If config.txt does not exist, fopen returns NULL. fgets(buffer, 100, NULL) will instantly cause a Segmentation Fault.",
      tags: ['file-io', 'errors', 'segfault'],
    },
    {
      id: 'u4-t2-q5',
      type: 'mcq',
      topicId: 'u4-t2',
      difficulty: 'intermediate',
      question: "Why should you avoid using while(!feof(fp)) as your main file reading loop condition?",
      options: [
        'It is very slow.',
        'It causes the loop to execute one time too many.',
        'It does not work on binary files.',
        'It crashes if the file is empty.'
      ],
      correctAnswer: 'It causes the loop to execute one time too many.',
      explanation: "feof only becomes true AFTER a read fails. Therefore, the loop runs, the read fails, but you still process the failed data (or old buffer) before the loop checks feof again and terminates.",
      tags: ['file-io', 'feof'],
    },
  ],

  programmingProblems: [
    {
      id: 'u4-t2-new-easy',
      title: 'File Line Counter',
      topicId: 'u4-t2',
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
      id: 'u4-t2-new-med',
      title: 'MAX Macro',
      topicId: 'u4-t2',
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
      id: 'u4-t2-new-hard',
      title: 'Variadic Sum',
      topicId: 'u4-t2',
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
      id: 'u4-t2-p1',
      title: 'Copy a Text File',
      topicId: 'u4-t2',
      difficulty: 'beginner',
      problemStatement: "Write a program that opens source.txt for reading, and dest.txt for writing. Copy the contents of source.txt into dest.txt line by line. Close both files.",
      constraints: ['Use fgets and fputs', 'Check for NULL on both fopens'],
      sampleInput: 'source.txt contains: Hello\\nWorld',
      sampleOutput: 'dest.txt now contains: Hello\\nWorld',
      hints: ['while (fgets(buffer, sizeof(buffer), src) != NULL) { fputs(buffer, dest); }'],
      solution: '#include <stdio.h>\n\nint main(void) {\n    FILE *src = fopen("source.txt", "r");\n    if (src == NULL) {\n        printf("Failed to open source.\\n");\n        return 1;\n    }\n    \n    FILE *dest = fopen("dest.txt", "w");\n    if (dest == NULL) {\n        printf("Failed to open dest.\\n");\n        fclose(src); /* Must close src before quitting! */\n        return 1;\n    }\n    \n    char buffer[256];\n    while (fgets(buffer, sizeof(buffer), src) != NULL) {\n        fputs(buffer, dest);\n    }\n    \n    printf("File copied.\\n");\n    fclose(src);\n    fclose(dest);\n    \n    return 0;\n}',
      solutionExplanation: "Standard file copying template. Notice the critical detail: if opening the SECOND file fails, we must fclose the FIRST file before we return 1 to prevent a resource leak.",
      dryRun: [
        { step: 1, line: 4, variables: {}, output: '', explanation: 'Opens source.txt successfully.' },
        { step: 2, line: 10, variables: {}, output: '', explanation: 'Creates/Opens dest.txt successfully.' },
        { step: 3, line: 17, variables: { buffer: '"Hello\\n"' }, output: '', explanation: 'Reads first line. Writes to dest.' },
      ],
      tags: ['file-io', 'copying', 'fgets'],
    },
    {
      id: 'u4-t2-p2',
      title: 'Append Log File',
      topicId: 'u4-t2',
      difficulty: 'intermediate',
      problemStatement: "Write a function void logMessage(const char *msg) that opens app.log in append mode, writes the message followed by a newline, and closes the file.",
      constraints: ['Use "a" mode'],
      sampleInput: 'logMessage("User logged in");',
      sampleOutput: 'app.log has "User logged in\\n" added to the end.',
      hints: ['fopen("app.log", "a")'],
      solution: '#include <stdio.h>\n\nvoid logMessage(const char *msg) {\n    FILE *fp = fopen("app.log", "a");\n    if (fp != NULL) {\n        fprintf(fp, "%s\\n", msg);\n        fclose(fp);\n    }\n}\n\nint main(void) {\n    logMessage("System started.");\n    logMessage("Processing data.");\n    logMessage("System shut down.");\n    return 0;\n}',
      solutionExplanation: "Append mode \"a\" automatically moves the internal file cursor to the absolute end of the file before every write, ensuring you never overwrite existing log history.",
      dryRun: [
        { step: 1, line: 4, variables: {}, output: '', explanation: 'Opens app.log. Cursor is at EOF.' },
        { step: 2, line: 6, variables: {}, output: '', explanation: 'Writes "System started.\\n".' },
      ],
      tags: ['file-io', 'append', 'logging'],
    },
    {
      id: 'u4-t2-p3',
      title: 'Read Specific Struct from Binary (fseek)',
      topicId: 'u4-t2',
      difficulty: 'advanced',
      problemStatement: "Assume records.bin contains exactly 100 Player structs (id, score). Write a program that opens the file, uses fseek to jump directly to the 50th record (index 49), reads it into a struct, and prints the score.",
      constraints: ['Use rb mode', 'Use fseek to jump bytes', 'Use fread'],
      sampleInput: '',
      sampleOutput: 'Record 50 Score: 995',
      hints: ['Offset formula: index * sizeof(Player)', 'fseek(fp, offset, SEEK_SET)'],
      solution: '#include <stdio.h>\n\ntypedef struct {\n    int id;\n    int score;\n} Player;\n\nint main(void) {\n    FILE *fp = fopen("records.bin", "rb");\n    if (fp == NULL) return 1;\n    \n    int targetIndex = 49; /* The 50th record */\n    long offset = targetIndex * sizeof(Player);\n    \n    /* Jump directly to the bytes for the 50th record */\n    fseek(fp, offset, SEEK_SET);\n    \n    Player p;\n    if (fread(&p, sizeof(Player), 1, fp) == 1) {\n        printf("Record 50 (ID: %d) Score: %d\\n", p.id, p.score);\n    } else {\n        printf("Failed to read record.\\n");\n    }\n    \n    fclose(fp);\n    return 0;\n}',
      solutionExplanation: "This demonstrates Random Access in binary files. Instead of calling fread 50 times to get to the 50th record (which is slow), we calculate the exact byte offset (49 * 8 bytes = 392) and fseek directly to it instantly.",
      dryRun: [
        { step: 1, line: 13, variables: { offset: '392' }, output: '', explanation: 'Assuming sizeof(Player) is 8. 49 * 8 = 392.' },
        { step: 2, line: 16, variables: {}, output: '', explanation: 'fseek moves cursor 392 bytes from SEEK_SET (start of file).' },
        { step: 3, line: 19, variables: {}, output: '', explanation: 'fread pulls the next 8 bytes into the Player struct.' },
      ],
      tags: ['file-io', 'binary', 'fseek', 'structs'],
    },
  ],
};
