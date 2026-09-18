import type { Topic } from '../../../../types';

export const sorting: Topic = {
  id: 'u2-t11',
  unitId: 'unit-2',
  title: 'Sorting Algorithms',
  slug: 'sorting',
  description: `Sorting — rearranging a collection of elements into a defined order — is arguably the most studied operation in computer science and one of the most frequently performed operations in software worldwide. From displaying leaderboards to organising database records, from rendering graphics to compressing data, bringing order to unstructured data is a prerequisite for efficient processing. This topic covers the three classic O(n²) comparison-based sorting algorithms: Bubble Sort, Selection Sort, and Insertion Sort.

While modern production systems use more sophisticated algorithms (quicksort, mergesort, timsort) that achieve O(n log n) average-case performance, the three elementary algorithms serve as indispensable pedagogical tools. Each one teaches a different algorithmic strategy — Bubble Sort works by repeatedly swapping adjacent out-of-order elements, Selection Sort finds the minimum element and places it in its final position, and Insertion Sort builds a sorted sub-array by inserting each new element into its correct position. Understanding these strategies develops the ability to analyse algorithm efficiency (best-case, average-case, and worst-case time complexity), to reason about loop invariants (what property the sorted portion maintains after each iteration), and to understand the concept of algorithmic stability (whether equal elements preserve their original relative order).

Mastering these algorithms also provides concrete practice with nested loop structures, swap operations using temporary variables, index tracking, and the relationship between loop structure and time complexity — skills that transfer directly to more complex algorithms and to the analysis of any code containing nested iterations.`,
  difficulty: 'intermediate',
  prerequisites: ['u2-t10'],
  estimatedMinutes: 90,
  subtopics: [
    {
      id: 'u2-t11-s1',
      title: 'Bubble Sort',
      slug: 'bubble-sort',
      description: `Bubble Sort is the most conceptually transparent sorting algorithm: it works by repeatedly traversing the array from left to right, comparing each pair of adjacent elements, and swapping them if they are out of order. The name "Bubble Sort" comes from the observation that, during each complete pass through the array, the largest unsorted element "bubbles up" to its correct position at the end, just as the largest bubble in a glass of soda rises to the surface first. After the first pass, the absolute maximum is guaranteed to be at the last index. After the second pass, the second-largest is in the second-to-last position. After N-1 passes, the entire array is sorted.

The algorithm uses two nested loops. The outer loop controls the number of passes (at most N-1 are needed). The inner loop performs the actual comparisons and swaps, iterating from index 0 to n-1-i, where i is the current pass number. The "-i" term is a crucial optimization: since i elements have already bubbled to their final positions at the right end of the array, there is no point in re-examining them. An additional optimization uses a boolean flag (swapped) that is set to false at the start of each pass and switched to true whenever a swap occurs. If an entire pass completes without any swaps, the array is already perfectly sorted, and the algorithm can terminate immediately. This optimization gives Bubble Sort a best-case time complexity of O(N) on already-sorted input, though its average and worst cases remain O(N²).

Bubble Sort is classified as a stable sorting algorithm, meaning it preserves the relative order of elements that compare as equal. This stability arises from the comparison condition: elements are only swapped when the left element is strictly greater than the right (arr[j] > arr[j+1]). If two elements are equal, they are not swapped, so their original relative order is maintained. While Bubble Sort is rarely used in production due to its O(N²) performance, its pedagogical value is immense: it introduces the concepts of in-place sorting, stability, and early termination optimization, all in a package simple enough for a beginning programmer to trace through by hand.`,
      keyPoints: [
        'The algorithm works in "passes." In each pass, we compare `arr[j]` with `arr[j+1]`. If the left element is larger, we swap them.',
        'Because of this continuous swapping, by the end of the first pass, the absolute largest element is guaranteed to have shifted all the way to the rightmost index.',
        'This means in the second pass, we don\'t need to check the last element. In the third pass, we don\'t need to check the last two. The inner loop gets shorter every time.',
        'Bubble sort can be optimized: if an entire pass completes without a single swap occurring, the array is perfectly sorted, and the algorithm can terminate early.',
        'Time Complexity: O(N²) in the worst/average case (nested loops). O(N) in the best case (already sorted array with early termination).',
        'Stability: Bubble Sort is STABLE. If you have two identical values, they will never swap past each other, preserving their original order.',
      ],
      codeExamples: [
        {
          id: 'u2-t11-s1-ex1',
          title: 'Optimized Bubble Sort',
          code: '#include <stdio.h>\n#include <stdbool.h>\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        bool swapped = false;\n        \n        /* Inner loop stops earlier each pass (- i) */\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (arr[j] > arr[j + 1]) {\n                /* Swap */\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        \n        /* If no swaps occurred, array is sorted */\n        if (!swapped) break;\n    }\n}\n\nint main(void) {\n    int data[] = {64, 34, 25, 12, 22, 11, 90};\n    bubbleSort(data, 7);\n    for(int i=0; i<7; i++) printf("%d ", data[i]);\n    return 0;\n}',
          language: 'c',
          explanation: 'This code reveals the classic nested-loop structure of O(N²) algorithms. The outer loop (`i`) simply dictates how many passes we need. The inner loop (`j`) does the actual heavy lifting of comparing and swapping adjacent neighbors. Notice the clever use of `n - 1 - i` in the inner loop condition to skip elements that have already bubbled to their final sorted positions.',
          expectedOutput: '11 12 22 25 34 64 90 ',
          lineBreakdown: [
            { lineNumber: 6, code: '        bool swapped = false;', explanation: 'At the start of every pass, we optimistically assume the array is sorted (no swaps needed).' },
            { lineNumber: 9, code: '        for (int j = 0; j < n - 1 - i; j++) {', explanation: 'The inner loop stops at `n - 1 - i`. The `- 1` prevents looking past the end of the array. The `- i` skips the rightmost elements that are already sorted.' },
            { lineNumber: 20, code: '        if (!swapped) break;', explanation: 'The early exit optimization. If the inner loop finishes without flipping `swapped` to true, we break out of the outer loop entirely.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u2-t11-s1-cm1',
          title: 'Out of bounds in inner loop',
          wrongCode: 'for (int j = 0; j < n; j++) {\n    if (arr[j] > arr[j + 1]) { ... }',
          correctCode: 'for (int j = 0; j < n - 1; j++) {\n    if (arr[j] > arr[j + 1]) { ... }',
          explanation: 'Inside the loop, we are comparing `arr[j]` with `arr[j + 1]`. If the loop is allowed to run all the way until `j = n - 1` (the very last index of the array), then `j + 1` evaluates to `n`. The array does not have an index `n`. This will cause the program to read garbage memory immediately past the end of the array, bringing that garbage data into the sorting logic.',
          consequence: 'Undefined behavior. The algorithm will likely pull a garbage number into the array or crash with a Segmentation Fault.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u2-t11-s1-ic1',
          title: 'What is a "Stable" sort?',
          content: 'A very common interview question: "What does it mean for a sorting algorithm to be Stable?" Imagine a spreadsheet of employees sorted by name. You then decide to sort them by age. If two employees are both 30 years old, a STABLE sort guarantees that their alphabetical order is preserved. An UNSTABLE sort might randomly flip them. Bubble Sort is stable because we only swap if the left element is strictly greater (`>`) than the right element. If they are equal, they don\'t swap, preserving their relative order.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u2-t11-s1-cp1',
          title: 'Bubble Sort Tracing',
          description: 'Verify your ability to implement and optimize adjacent-element sorting.',
          criteria: [
            'Write the nested loops for Bubble Sort',
            'Implement the `swapped` flag to enable early termination',
            'Explain mathematically why the inner loop bounds decrease by `i` on each pass',
          ],
          topicId: 'u2-t11',
        },
      ],
      revisionCards: [
        {
          id: 'u2-t11-s1-rc1',
          front: 'What is the Time Complexity of Bubble Sort?',
          back: 'In the worst and average cases, it is O(N²) because of the nested loops. However, in the best case (an array that is already completely sorted), the optimized version finishes in O(N) time.',
          topicId: 'u2-t11',
          tags: ['sorting', 'complexity'],
        },
        {
          id: 'u2-t11-s1-rc2',
          front: 'What is guaranteed to happen after the very first pass of Bubble Sort?',
          back: 'The absolute largest element in the array will have "bubbled" all the way to the final index, locking into its correct, fully sorted position.',
          topicId: 'u2-t11',
          tags: ['sorting', 'bubble'],
        },
      ],
    },
    {
      id: 'u2-t11-s2',
      title: 'Selection Sort',
      slug: 'selection-sort',
      description: `Selection Sort approaches the sorting problem with a different strategy than Bubble Sort: instead of comparing and swapping adjacent elements, it divides the array into a sorted left portion (initially empty) and an unsorted right portion (initially the entire array), then repeatedly finds the absolute minimum element in the unsorted portion and places it at the leftmost unsorted position. In each pass of the outer loop, the algorithm scans the entire unsorted section to identify the index of the smallest element (tracking it in a variable min_idx), and then performs exactly one swap to move that element to its correct final position.

The key distinction between Selection Sort and Bubble Sort is the number of swap operations. Bubble Sort may perform O(N²) swaps in the worst case, because every adjacent comparison that finds a pair out of order triggers a swap. Selection Sort, by contrast, performs at most N-1 swaps — exactly one per pass — because the inner loop only tracks the index of the minimum without moving any data, and the actual swap occurs only after the minimum has been definitively identified. In scenarios where writing to memory is significantly more expensive than reading (for example, when sorting data on flash memory or when elements are very large structures), this characteristic makes Selection Sort preferable despite having the same O(N²) time complexity.

The major disadvantage of Selection Sort is that it has no concept of "early termination." Even if the array is already perfectly sorted, the algorithm stubbornly performs the full inner scan for every pass, verifying that each element is indeed the minimum of the remaining unsorted portion. This gives it an O(N²) time complexity in all cases — best, average, and worst — making it strictly inferior to both Bubble Sort (which can achieve O(N) on sorted input) and Insertion Sort (which also achieves O(N) on sorted input). Additionally, Selection Sort is unstable: because it swaps elements across long distances, a swap can easily move an element past another element with the same value, destroying their original relative order.`,
      keyPoints: [
        'Algorithm: Scan the unsorted portion of the array. Find the index of the absolute minimum value. Swap that value with the first element of the unsorted portion.',
        'Unlike Bubble Sort which swaps continuously, Selection Sort only makes ONE swap per pass. If writing data to memory is computationally expensive, this is a huge advantage.',
        'Time Complexity: O(N²) in ALL cases (Worst, Average, and Best). Even if the array is already sorted, it stubbornly scans the entire remaining array just to verify it is the minimum.',
        'Stability: Selection Sort is generally UNSTABLE. A long-distance swap can easily jump over duplicate elements, scrambling their original relative order.',
      ],
      codeExamples: [
        {
          id: 'u2-t11-s2-ex1',
          title: 'Selection Sort',
          code: '#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        \n        /* Find minimum in the rest of the array */\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        \n        /* Swap found minimum with the first element */\n        if (min_idx != i) {\n            int temp = arr[i];\n            arr[i] = arr[min_idx];\n            arr[min_idx] = temp;\n        }\n    }\n}\n\nint main(void) {\n    int data[] = {64, 25, 12, 22, 11};\n    selectionSort(data, 5);\n    return 0;\n}',
          language: 'c',
          explanation: 'Notice how the inner loop does not perform any swaps. It merely updates an integer `min_idx` to remember where the smallest value is located. The actual swap operation only happens once per outer loop iteration.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 5, code: '        int min_idx = i;', explanation: 'We assume the first element of the unsorted section is the minimum until proven otherwise.' },
            { lineNumber: 8, code: '        for (int j = i + 1; j < n; j++) {', explanation: 'We scan all remaining elements to the right (`i + 1` to the end) searching for something smaller.' },
            { lineNumber: 15, code: '        if (min_idx != i) {', explanation: 'A minor optimization. If the minimum was actually the first element we assumed, it is already in the right place, so don\'t waste CPU cycles swapping an element with itself.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u2-t11-s2-cm1',
          title: 'Swapping values inside the inner loop',
          wrongCode: 'for(int j=i+1; j<n; j++) {\n    if(arr[j] < arr[min_idx]) { \n        swap(arr[j], arr[min_idx]); \n    }\n}',
          correctCode: 'for(...) {\n    if(arr[j] < arr[min_idx]) { min_idx = j; }\n}\nswap(arr[i], arr[min_idx]);',
          explanation: 'The entire performance benefit of Selection Sort is that it minimizes swaps (writing to memory is historically slower than reading memory). If you perform a physical array swap inside the inner loop every time you see a smaller number, you have recreated a very bad version of Bubble Sort.',
          consequence: 'The algorithm will still sort the array, but it performs massive amounts of unnecessary memory writes, destroying its only theoretical advantage.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u2-t11-s2-ic1',
          title: 'Why is Selection Sort unstable?',
          content: 'Selection sort is UNSTABLE due to its long-distance swaps. Consider the array `[4a, 4b, 1]`. (We label the 4s to track them). In pass 1, the algorithm finds the minimum (`1`) and swaps it with the first element (`4a`). The new array is `[1, 4b, 4a]`. The relative order of the 4s has been flipped! This happens frequently when Selection Sort arbitrarily launches elements across the array.',
          relatedTopicIds: [],
          frequency: 'occasional',
        },
      ],
      checkpoints: [
        {
          id: 'u2-t11-s2-cp1',
          title: 'Selection Sort Mechanics',
          description: 'Verify your understanding of index-tracking algorithms.',
          criteria: [
            'Write a Selection Sort that tracks `min_idx` rather than swapping immediately',
            'Explain why Selection Sort is considered an unstable sorting algorithm',
            'Explain the specific scenario where Selection Sort is preferable over Bubble Sort',
          ],
          topicId: 'u2-t11',
        },
      ],
      revisionCards: [
        {
          id: 'u2-t11-s2-rc1',
          front: 'What is the Best-Case time complexity of Selection Sort?',
          back: 'O(N²). Even if the array is perfectly sorted from the start, Selection Sort is "dumb" — it still forces the inner loop to scan the entire remaining array just to verify that no smaller elements exist.',
          topicId: 'u2-t11',
          tags: ['sorting', 'complexity'],
        },
      ],
    },
    {
      id: 'u2-t11-s3',
      title: 'Insertion Sort',
      slug: 'insertion-sort',
      description: `Insertion Sort is widely considered the most elegant and practically useful of the three elementary O(N\u00b2) sorting algorithms. It models the way humans naturally sort a hand of playing cards: you start with one card (which is trivially sorted), pick up the next card from the unsorted pile, and slide it into its correct position within the already-sorted hand by shifting larger cards to the right. The outer loop picks up the next unsorted element (stored in a temporary variable called the "key"), and the inner while loop scans backward through the sorted portion, shifting each element one position to the right until it finds the correct insertion point for the key.

The inner loop's shifting mechanism is what gives Insertion Sort its efficiency advantage over Bubble Sort. Rather than performing full three-step swaps (temp = a; a = b; b = temp), Insertion Sort uses single-assignment shifts (arr[j+1] = arr[j]), which require one-third the memory writes. The key is saved in a temporary variable at the start of each outer iteration, so the slot it originally occupied can be safely overwritten by a shifted element. When the inner loop terminates \u2014 either because it found an element smaller than or equal to the key, or because it reached the beginning of the array \u2014 the key is placed into the vacated slot at position j+1.

Insertion Sort's best-case time complexity is O(N), which occurs when the input array is already sorted or nearly sorted. In this case, the inner while loop's condition (arr[j] > key) fails immediately on every pass, meaning zero shifts are performed and the algorithm degenerates to a simple linear scan that confirms the array is in order. This property makes Insertion Sort the algorithm of choice for "nearly sorted" data and for small arrays. In fact, professional sorting implementations like glibc's qsort, Python's Timsort, and Java's Arrays.sort all use Insertion Sort as a sub-routine: they divide large datasets using a fast O(N log N) algorithm like QuickSort or MergeSort, but once the partitions become small enough (typically 16-32 elements), they switch to Insertion Sort because its low overhead and cache-friendly sequential access pattern make it faster than the recursive algorithms at small scales. Insertion Sort is also stable: the shifting condition arr[j] > key uses strict inequality, so equal elements are never shifted past each other, preserving their original relative order.`,
      keyPoints: [
        'Algorithm: The outer loop picks up the next "unsorted" element (the `key`). The inner loop scans leftward through the "sorted" portion, shifting larger elements to the right to create an empty slot, and then drops the `key` into the slot.',
        'Insertion Sort does not use the traditional three-line swap `temp=a; a=b; b=temp;`. It uses highly efficient "shifts" (`arr[j+1] = arr[j]`), which require less memory reading/writing.',
        'Time Complexity: Worst/Average case is O(N²). Best case (already sorted array) is an incredibly fast O(N) because the inner loop immediately terminates if no shifting is needed.',
        'Stability: Insertion Sort is STABLE. We only shift elements if they are strictly greater (`>`) than our key.',
        'Practical Use: Because of its extremely low overhead, real-world sorting engines (like Python\'s Timsort or C++ `std::sort`) actually use Insertion Sort to handle small chunks of data (e.g., arrays smaller than 16 elements).',
      ],
      codeExamples: [
        {
          id: 'u2-t11-s3-ex1',
          title: 'Insertion Sort',
          code: '#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i]; /* The card we picked up */\n        int j = i - 1;\n\n        /* Move elements that are greater than key, \n           to one position ahead of their current position */\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j]; /* Shift right */\n            j--;\n        }\n        arr[j + 1] = key; /* Insert the card */\n    }\n}\n\nint main(void) {\n    int data[] = {12, 11, 13, 5, 6};\n    insertionSort(data, 5);\n    for(int i=0; i<5; i++) printf("%d ", data[i]);\n    return 0;\n}',
          language: 'c',
          explanation: 'Notice that we do not start the outer loop at `i = 0`. We start at `i = 1`, assuming the single element at index 0 is already our "sorted hand of cards". We save the current card into `key`. The `while` loop is the shifting engine: it looks backwards (`j--`) and drags elements one slot to the right until it finds an element smaller than the `key` (or hits the beginning of the array).',
          expectedOutput: '5 6 11 12 13 ',
          lineBreakdown: [
            { lineNumber: 5, code: '        int key = arr[i];', explanation: 'We must save `arr[i]` into a temporary variable `key`. As we shift elements right, `arr[i]` will be overwritten and destroyed.' },
            { lineNumber: 10, code: '        while (j >= 0 && arr[j] > key) {', explanation: 'We look backwards (`j--`). If the card we are looking at is larger than our `key`, it needs to move to the right.' },
            { lineNumber: 11, code: '            arr[j + 1] = arr[j];', explanation: 'The shift. We copy the value at `j` into the slot at `j + 1`.' },
            { lineNumber: 14, code: '        arr[j + 1] = key;', explanation: 'The inner loop has finished, leaving a "hole" at `j + 1`. We drop our `key` directly into it.' },
          ],
          relatedTopicIds: [],
        },
      ],
      commonMistakes: [
        {
          id: 'u2-t11-s3-cm1',
          title: 'Using swap instead of shift',
          wrongCode: 'while(j>=0 && arr[j] > arr[j+1]) {\n    swap(&arr[j], &arr[j+1]);\n    j--;\n}',
          correctCode: 'while(j>=0 && arr[j] > key) {\n    arr[j+1] = arr[j];\n    j--;\n}\narr[j+1] = key;',
          explanation: 'A full swap requires three memory operations (`temp=a; a=b; b=temp;`). If you use full swaps to push the element backwards, you are doing triple the work. Insertion Sort is fast specifically because it uses single-assignment shifts (`arr[j+1] = arr[j]`) and only drops the key in once at the very end.',
          consequence: 'Algorithm produces the correct output but is significantly slower due to unnecessary memory writes.',
        },
      ],
      interviewCallouts: [
        {
          id: 'u2-t11-s3-ic1',
          title: 'Which O(N²) sort is the best?',
          content: 'Interviewers often ask: "If O(N log N) sorts like QuickSort are so much faster, why do we still teach Insertion Sort?" The answer is that Insertion Sort has almost zero overhead. For very small arrays (e.g., less than 20 elements), O(N log N) algorithms waste too much time allocating memory and managing recursive call stacks. In professional standard libraries, the sorting engine will often divide massive data sets using QuickSort, but once the data chunks get small enough, it physically switches to Insertion Sort to finish the job.',
          relatedTopicIds: [],
          frequency: 'common',
        },
      ],
      checkpoints: [
        {
          id: 'u2-t11-s3-cp1',
          title: 'Insertion Sort Mechanics',
          description: 'Verify your understanding of shifting algorithms and loop termination.',
          criteria: [
            'Write the shifting logic for Insertion Sort',
            'Explain why we start the outer loop at index 1 instead of index 0',
            'Explain why professional sorting engines still use Insertion Sort for small arrays',
          ],
          topicId: 'u2-t11',
        },
      ],
      revisionCards: [
        {
          id: 'u2-t11-s3-rc1',
          front: 'What is the Best-Case time complexity of Insertion Sort, and when does it occur?',
          back: 'O(N). This occurs when the array is already perfectly sorted. The inner `while` loop condition (`arr[j] > key`) will immediately fail on the first check every single time, meaning zero shifts occur.',
          topicId: 'u2-t11',
          tags: ['sorting', 'complexity'],
        },
        {
          id: 'u2-t11-s3-rc2',
          front: 'Is Insertion Sort considered a Stable or Unstable sort?',
          back: 'It is a STABLE sort. Because the shifting condition is strictly `arr[j] > key`, if it encounters a duplicate element (`arr[j] == key`), it stops shifting and drops the key to the right of the duplicate, preserving their original order.',
          topicId: 'u2-t11',
          tags: ['sorting', 'stability'],
        },
      ],
    },
  ],

  theoryQuestions: [
    {
      id: 'u2-t11-q1',
      type: 'mcq',
      topicId: 'u2-t11',
      difficulty: 'beginner',
      question: 'Which sorting algorithm repeatedly finds the minimum element and places it at the beginning?',
      options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort'],
      correctAnswer: 'Selection Sort',
      explanation: 'Selection Sort works by scanning the unsorted right half to "select" the absolute minimum value, and then executing a single swap to pull it into the sorted left half.',
      tags: ['sorting', 'selection'],
    },
    {
      id: 'u2-t11-q2',
      type: 'true-false',
      topicId: 'u2-t11',
      difficulty: 'intermediate',
      question: 'An optimized Bubble Sort can finish in O(N) time if given an array that is already sorted.',
      correctAnswer: true,
      explanation: 'Bubble sort includes an optimization flag (`bool swapped`). If an array is perfectly sorted, the first pass will make 0 swaps. The flag remains false, triggering an early `break`, completing the algorithm in O(N) time.',
      tags: ['sorting', 'bubble', 'complexity'],
    },
    {
      id: 'u2-t11-q3',
      type: 'mcq',
      topicId: 'u2-t11',
      difficulty: 'intermediate',
      question: 'Which of the following sorting algorithms is UNSTABLE?',
      options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'All of the above'],
      correctAnswer: 'Selection Sort',
      explanation: 'Selection Sort frequently swaps the current element with a minimum element located far across the array. This "long jump" can easily leapfrog over identical elements, scrambling their original relative order, making it unstable.',
      tags: ['sorting', 'stability'],
    },
    {
      id: 'u2-t11-q4',
      type: 'predict-output',
      topicId: 'u2-t11',
      difficulty: 'advanced',
      question: 'After ONE full pass of Bubble Sort on array {5, 1, 4, 2, 8}, what is the array state?',
      options: [
        '{1, 4, 2, 5, 8}',
        '{1, 5, 4, 2, 8}',
        '{1, 2, 4, 5, 8}',
        '{5, 1, 4, 2, 8}'
      ],
      correctAnswer: '{1, 4, 2, 5, 8}',
      explanation: 'Tracing pass 1: (5,1) swap -> {1,5,4,2,8}. (5,4) swap -> {1,4,5,2,8}. (5,2) swap -> {1,4,2,5,8}. (5,8) NO swap. The pass ends. The heaviest element (8) has successfully bubbled to the end.',
      tags: ['sorting', 'bubble', 'tracing'],
    },
    {
      id: 'u2-t11-q5',
      type: 'spot-bug',
      topicId: 'u2-t11',
      difficulty: 'advanced',
      question: 'Spot the bug in this Insertion Sort inner loop:',
      code: 'while (j >= 0 && arr[j] >= key) {\n    arr[j + 1] = arr[j];\n    j--;\n}',
      correctAnswer: 'Using >= makes the sort UNSTABLE.',
      explanation: 'Using `>=` breaks the stability of the sort. If the key is identical to `arr[j]`, `>=` will force the older duplicate to shift right, moving it behind the new duplicate. The strictly `>` operator ensures identical elements stay in their original relative positions.',
      tags: ['sorting', 'insertion', 'stability'],
    },
  ],

  programmingProblems: [
    {
      id: 'u2-t11-new-easy',
      title: 'Array Reverse',
      topicId: 'u2-t11',
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
      id: 'u2-t11-new-med',
      title: 'Matrix Diagonal Sum',
      topicId: 'u2-t11',
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
      id: 'u2-t11-new-hard',
      title: 'Recursive GCD',
      topicId: 'u2-t11',
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
      id: 'u2-t11-p1',
      title: 'Sort Strings by First Character',
      topicId: 'u2-t11',
      difficulty: 'intermediate',
      problemStatement: 'Write a program using Bubble Sort to sort an array of strings (char pointers) alphabetically based ONLY on their first character.',
      constraints: ['Use Bubble sort', 'Array of char pointers'],
      sampleInput: '["Zebra", "Apple", "Mango"]',
      sampleOutput: 'Apple Mango Zebra',
      hints: ['Compare arr[j][0] with arr[j+1][0]'],
      solution: '#include <stdio.h>\n\nvoid sortStrings(char *arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - 1 - i; j++) {\n            if (arr[j][0] > arr[j + 1][0]) {\n                /* Swap POINTERS, not characters */\n                char *temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}\n\nint main(void) {\n    char *words[] = {"Zebra", "Apple", "Mango"};\n    sortStrings(words, 3);\n    for(int i=0; i<3; i++) printf("%s ", words[i]);\n    return 0;\n}',
      solutionExplanation: 'This demonstrates the massive power of arrays of pointers. We are sorting words, but we NEVER copy or move the string characters themselves. We evaluate `arr[j][0]` to see which starting letter is alphabetically larger. If a swap is needed, we simply swap the memory addresses (the `char *` pointers). The strings stay locked in their original memory locations, but the array holding their addresses is now perfectly sorted.',
      dryRun: [
        { step: 1, line: 6, variables: {}, output: '', explanation: 'Compare "Zebra" [Z] with "Apple" [A]. Z > A. We swap the pointers in the array.' },
        { step: 2, line: 6, variables: {}, output: '', explanation: 'Compare "Zebra" [Z] with "Mango" [M]. Z > M. We swap the pointers in the array.' },
        { step: 3, line: 17, variables: {}, output: 'Apple Mango Zebra', explanation: 'The pointers are now arranged in alphabetical order based on their first letters.' },
      ],
      tags: ['sorting', 'bubble', 'pointers', 'strings'],
    },
    {
      id: 'u2-t11-p2',
      title: 'Insertion Sort Dry Run Logger',
      topicId: 'u2-t11',
      difficulty: 'beginner',
      problemStatement: 'Modify the Insertion Sort algorithm to print the entire array at the end of every outer loop iteration (i.e., after every card is inserted).',
      constraints: ['Use Insertion Sort'],
      sampleInput: '4 3 2 1',
      sampleOutput: 'Pass 1: 3 4 2 1\nPass 2: 2 3 4 1\nPass 3: 1 2 3 4',
      hints: ['Add a print loop at the end of the outer for-loop.'],
      solution: '#include <stdio.h>\n\nvoid insertionSortLog(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n        \n        /* Log state */\n        printf("Pass %d: ", i);\n        for(int k=0; k<n; k++) printf("%d ", arr[k]);\n        printf("\\n");\n    }\n}\n\nint main(void) {\n    int data[] = {4, 3, 2, 1};\n    insertionSortLog(data, 4);\n    return 0;\n}',
      solutionExplanation: 'By adding a print loop directly inside the outer `for` loop, we can peer inside the sorting algorithm. This visualizes exactly how Insertion Sort builds a sorted "wall" from left to right. Every time a new element is inserted, the sorted partition grows by one.',
      dryRun: [
        { step: 1, line: 11, variables: { i: '1', key: '3' }, output: 'Pass 1: 3 4 2 1', explanation: 'The algorithm picks up 3. It shifts 4 to the right, and drops 3 at index 0.' },
        { step: 2, line: 11, variables: { i: '2', key: '2' }, output: 'Pass 2: 2 3 4 1', explanation: 'The algorithm picks up 2. It shifts both 4 and 3 to the right, and drops 2 at index 0.' },
      ],
      tags: ['sorting', 'insertion', 'tracing'],
    },
    {
      id: 'u2-t11-p3',
      title: 'Selection Sort (Count Swaps)',
      topicId: 'u2-t11',
      difficulty: 'intermediate',
      problemStatement: 'Implement Selection Sort. Add a counter that increments ONLY when an actual swap occurs (i.e., min_idx != i). Print the total number of swaps at the end.',
      constraints: ['Use Selection Sort'],
      sampleInput: '5 4 3 2 1',
      sampleOutput: 'Total swaps: 2',
      hints: ['if (min_idx != i) { swap... swaps++; }'],
      solution: '#include <stdio.h>\n\nint selectionSortSwaps(int arr[], int n) {\n    int swaps = 0;\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) min_idx = j;\n        }\n        \n        if (min_idx != i) {\n            int temp = arr[i];\n            arr[i] = arr[min_idx];\n            arr[min_idx] = temp;\n            swaps++;\n        }\n    }\n    return swaps;\n}\n\nint main(void) {\n    int data[] = {5, 4, 3, 2, 1};\n    int s = selectionSortSwaps(data, 5);\n    printf("Total swaps: %d\\n", s);\n    return 0;\n}',
      solutionExplanation: 'This highlights the solitary advantage of Selection Sort. While Bubble Sort and Insertion Sort can trigger O(N²) memory writes (shifting/swapping elements repeatedly), Selection Sort executes exactly one swap per pass. By guarding the swap with `if (min_idx != i)`, we don\'t even write to memory if the element is already in the correct place. Total swaps for a completely reversed array is only 2!',
      dryRun: [
        { step: 1, line: 11, variables: { i: '0', min_idx: '4' }, output: '', explanation: 'Outer loop pass 1. Scans the array and finds the absolute minimum (1) at index 4. Swaps index 0 (5) with index 4. Array is now `{1, 4, 3, 2, 5}`.' },
        { step: 2, line: 11, variables: { i: '1', min_idx: '3' }, output: '', explanation: 'Outer loop pass 2. Scans the remainder and finds minimum (2) at index 3. Swaps index 1 (4) with index 3. Array is now `{1, 2, 3, 4, 5}`.' },
        { step: 3, line: 11, variables: { i: '2', min_idx: '2' }, output: '', explanation: 'Outer loop pass 3. The minimum of `{3, 5, 4}` is 3, which is already at index 2. `min_idx == i`, so the swap is skipped!' },
      ],
      tags: ['sorting', 'selection', 'counting'],
    },
  ],
};
