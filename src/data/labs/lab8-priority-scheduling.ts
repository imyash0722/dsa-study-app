import type { LabProgram } from '../../types';

export const lab8PriorityScheduling: LabProgram = {
  id: 'lab-8',
  number: 8,
  title: 'Priority-Based Scheduling',
  slug: 'priority-scheduling',
  unitIds: ['unit-3'],
  objective:
    'Implement a priority queue using a sorted array to simulate a basic CPU process scheduler where higher priority processes are executed first.',
  description:
    'This lab builds a simplified CPU scheduler using a priority queue. Each process has a PID, name, priority level, and burst time. The priority queue is implemented as a sorted array — enqueueing inserts the process at the correct position based on priority, and dequeueing removes the highest-priority process. A simulation runs five processes in priority order, demonstrating how operating systems decide which process to run next.',

  solution: [
    '/* ============================================================',
    ' * Priority-Based Process Scheduler',
    ' * Compile: gcc -std=c11 -Wall scheduler.c -o scheduler',
    ' * ============================================================ */',
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '#include <string.h>',
    '#include <stdbool.h>',
    '',
    '#define MAX_PROCESSES 20',
    '',
    '/* ---- Process structure ---- */',
    'typedef struct {',
    '    int pid;',
    '    char name[30];',
    '    int priority;     /* Lower number = higher priority */',
    '    int burst_time;   /* Time units required to complete */',
    '} Process;',
    '',
    '/* ---- Priority Queue (sorted array) ---- */',
    'typedef struct {',
    '    Process items[MAX_PROCESSES];',
    '    int size;',
    '} PriorityQueue;',
    '',
    '/* ---- Initialize an empty queue ---- */',
    'void pq_init(PriorityQueue *pq) {',
    '    pq->size = 0;',
    '}',
    '',
    '/* ---- Check if queue is empty ---- */',
    'bool pq_is_empty(const PriorityQueue *pq) {',
    '    return pq->size == 0;',
    '}',
    '',
    '/* ---- Check if queue is full ---- */',
    'bool pq_is_full(const PriorityQueue *pq) {',
    '    return pq->size >= MAX_PROCESSES;',
    '}',
    '',
    '/* ---- Enqueue: insert maintaining priority order ---- */',
    'bool enqueue(PriorityQueue *pq, Process proc) {',
    '    if (pq_is_full(pq)) {',
    '        printf("Queue is full. Cannot enqueue PID %d.\\n", proc.pid);',
    '        return false;',
    '    }',
    '',
    '    /* Find correct position (sorted by priority, ascending) */',
    '    int pos = pq->size;',
    '    while (pos > 0 && pq->items[pos - 1].priority > proc.priority) {',
    '        pq->items[pos] = pq->items[pos - 1];',
    '        pos--;',
    '    }',
    '',
    '    pq->items[pos] = proc;',
    '    pq->size++;',
    '    return true;',
    '}',
    '',
    '/* ---- Dequeue: remove and return highest priority (index 0) ---- */',
    'Process dequeue(PriorityQueue *pq) {',
    '    if (pq_is_empty(pq)) {',
    '        printf("Queue is empty.\\n");',
    '        Process empty = {0, "", 0, 0};',
    '        return empty;',
    '    }',
    '',
    '    Process front = pq->items[0];',
    '',
    '    /* Shift all elements left */',
    '    for (int i = 1; i < pq->size; i++) {',
    '        pq->items[i - 1] = pq->items[i];',
    '    }',
    '    pq->size--;',
    '',
    '    return front;',
    '}',
    '',
    '/* ---- Display all waiting processes ---- */',
    'void display_queue(const PriorityQueue *pq) {',
    '    if (pq_is_empty(pq)) {',
    '        printf("  (queue is empty)\\n");',
    '        return;',
    '    }',
    '    printf("  %-6s %-15s %-10s %-12s\\n", "PID", "Name", "Priority", "Burst Time");',
    '    printf("  -----------------------------------------------\\n");',
    '    for (int i = 0; i < pq->size; i++) {',
    '        printf("  %-6d %-15s %-10d %-12d\\n",',
    '               pq->items[i].pid, pq->items[i].name,',
    '               pq->items[i].priority, pq->items[i].burst_time);',
    '    }',
    '}',
    '',
    '/* ---- Create a process ---- */',
    'Process make_process(int pid, const char *name, int priority, int burst) {',
    '    Process p;',
    '    p.pid = pid;',
    '    strncpy(p.name, name, sizeof(p.name) - 1);',
    '    p.name[sizeof(p.name) - 1] = \'\\0\';',
    '    p.priority = priority;',
    '    p.burst_time = burst;',
    '    return p;',
    '}',
    '',
    '/* ---- Main: schedule and execute 5 processes ---- */',
    'int main(void) {',
    '    PriorityQueue pq;',
    '    pq_init(&pq);',
    '',
    '    /* Create 5 processes with varying priorities */',
    '    enqueue(&pq, make_process(101, "Compiler",    3, 8));',
    '    enqueue(&pq, make_process(102, "Kernel",      1, 4));',
    '    enqueue(&pq, make_process(103, "Browser",     4, 10));',
    '    enqueue(&pq, make_process(104, "Antivirus",   2, 6));',
    '    enqueue(&pq, make_process(105, "TextEditor",  5, 3));',
    '',
    '    printf("=== Process Queue (sorted by priority) ===\\n");',
    '    display_queue(&pq);',
    '',
    '    printf("\\n=== Scheduling Simulation ===\\n\\n");',
    '',
    '    int time = 0;',
    '    int order = 1;',
    '',
    '    while (!pq_is_empty(&pq)) {',
    '        Process p = dequeue(&pq);',
    '        printf("  [T=%3d] Running: %-15s (PID %d, Priority %d, Burst %d)\\n",',
    '               time, p.name, p.pid, p.priority, p.burst_time);',
    '        time += p.burst_time;',
    '        printf("          Completed at T=%d  (Execution order: %d)\\n\\n", time, order);',
    '        order++;',
    '    }',
    '',
    '    printf("=== All processes completed. Total time: %d units ===\\n", time);',
    '',
    '    return 0;',
    '}',
  ].join('\n'),

  solutionExplanation: [
    'The Process struct holds pid, name, priority (lower number = higher priority), and burst_time. The PriorityQueue struct wraps a fixed-size array with a size counter.',
    '',
    'enqueue performs an insertion-sort-style operation: it shifts elements right to make room at the correct sorted position. This maintains the array in ascending priority order, so the highest-priority process is always at index 0. Insertion is O(n) in the worst case.',
    '',
    'dequeue removes the element at index 0 (highest priority) and shifts all remaining elements left by one position. This is also O(n). A heap-based implementation would reduce both operations to O(log n), but the sorted-array approach is simpler to understand.',
    '',
    'The simulation enqueues five processes with different priorities, then dequeues them one by one, simulating a non-preemptive priority scheduler. Each process runs for its full burst time before the next one starts. The output shows the execution order and timestamps.',
  ].join('\n'),

  vivaQuestions: [
    {
      id: 'lab8-vq1',
      question: 'What is a priority queue and how does it differ from a regular queue?',
      answer:
        'A regular queue follows FIFO (First In, First Out) order — elements are dequeued in the order they were enqueued. A priority queue dequeues elements based on priority, not insertion order. The highest-priority element is always removed first, regardless of when it was added.',
    },
    {
      id: 'lab8-vq2',
      question: 'What is the difference between FIFO ordering and priority ordering?',
      answer:
        'FIFO processes elements strictly in arrival order — fair but ignores urgency. Priority ordering processes the most important element first — efficient for time-sensitive tasks but can lead to starvation of low-priority items. Real systems often combine both (e.g., same-priority items follow FIFO).',
    },
    {
      id: 'lab8-vq3',
      question: 'What happens when two processes have equal priority in this implementation?',
      answer:
        'In our implementation, the while loop condition uses strict greater-than (pq->items[pos-1].priority > proc.priority). When priorities are equal, the new process is inserted after existing processes with the same priority. This gives FIFO behavior among equal-priority processes, which is fair.',
      followUp: 'How would you implement aging to prevent starvation of low-priority processes?',
    },
    {
      id: 'lab8-vq4',
      question: 'Name some real OS scheduling algorithms.',
      answer:
        'Round Robin (RR): each process gets a fixed time slice and then moves to the back of the queue. Shortest Job First (SJF): the process with the shortest burst time runs first. Priority Scheduling: processes are ordered by priority. Multilevel Feedback Queue: combines multiple algorithms across priority levels.',
    },
    {
      id: 'lab8-vq5',
      question: 'Why does the sorted-array implementation of a priority queue have O(n) insertion?',
      answer:
        'Inserting into a sorted array requires finding the correct position (O(n) scan) and then shifting all subsequent elements right by one position to make room (O(n) shifts in the worst case). Both operations are linear, giving O(n) overall. Dequeue is also O(n) because of the left-shift.',
    },
    {
      id: 'lab8-vq6',
      question: 'How would a heap-based priority queue improve performance?',
      answer:
        'A binary heap stores elements in a partially-ordered tree structure. Insertion adds at the end and "sifts up" in O(log n). Extraction removes the root (highest priority) and "sifts down" the replacement in O(log n). Both operations are logarithmic instead of linear, making heaps much faster for large queues.',
    },
    {
      id: 'lab8-vq7',
      question: 'What is the difference between preemptive and non-preemptive scheduling?',
      answer:
        'Non-preemptive: once a process starts running, it runs until completion (or until it voluntarily yields). Preemptive: the scheduler can interrupt a running process if a higher-priority process arrives, putting the interrupted process back in the queue. Preemptive scheduling provides better responsiveness.',
      followUp: 'Which type does our implementation use?',
    },
    {
      id: 'lab8-vq8',
      question: 'What is the starvation problem in priority scheduling?',
      answer:
        'Starvation occurs when low-priority processes wait indefinitely because higher-priority processes keep arriving and getting executed first. The low-priority process may never run. Solutions include aging (gradually increasing the priority of waiting processes) and time-slice guarantees.',
    },
  ],

  gdbWalkthrough: {
    id: 'lab8-gdb',
    title: 'Debugging the Enqueue Function — Watching Sorted Insertion',
    programFile: 'scheduler.c',
    breakpoints: [42, 47],
    watchedVariables: ['proc.name', 'proc.priority', 'pos', 'pq->size', 'pq->items[pos]'],
    steps: [
      {
        command: 'gcc -g -std=c11 -Wall scheduler.c -o scheduler',
        output: '(no output — compilation successful)',
        explanation:
          'Compile with debug symbols.',
      },
      {
        command: 'gdb ./scheduler',
        output: 'GNU gdb ...\nReading symbols from ./scheduler...done.',
        explanation:
          'Launch GDB with the scheduler program.',
      },
      {
        command: 'break enqueue',
        output: 'Breakpoint 1 at 0x...: file scheduler.c, line 42.',
        explanation:
          'Set a breakpoint at the enqueue function to watch each insertion.',
      },
      {
        command: 'run',
        output: 'Breakpoint 1, enqueue (pq=0x..., proc=...) at scheduler.c:42',
        explanation:
          'The first enqueue call fires. This is the Compiler process (priority 3).',
      },
      {
        command: 'print proc.name',
        output: '$1 = "Compiler"',
        explanation:
          'The first process to be inserted is the Compiler.',
      },
      {
        command: 'print proc.priority',
        output: '$2 = 3',
        explanation:
          'Compiler has priority 3.',
      },
      {
        command: 'print pq->size',
        output: '$3 = 0',
        explanation:
          'Queue is empty, so Compiler will be inserted at position 0.',
      },
      {
        command: 'continue',
        output: 'Breakpoint 1, enqueue (pq=0x..., proc=...) at scheduler.c:42',
        explanation:
          'Second enqueue call — the Kernel process (priority 1).',
      },
      {
        command: 'print proc.name',
        output: '$4 = "Kernel"',
        explanation:
          'Kernel is being inserted with priority 1 — the highest priority so far.',
      },
      {
        command: 'print proc.priority',
        output: '$5 = 1',
        explanation:
          'Priority 1 is higher (lower number = higher priority) than Compiler at priority 3.',
      },
      {
        command: 'break 47',
        output: 'Breakpoint 2 at 0x...: file scheduler.c, line 47.',
        explanation:
          'Set a breakpoint at the while loop body where elements are shifted right.',
      },
      {
        command: 'continue',
        output: 'Breakpoint 2, enqueue (pq=0x..., proc=...) at scheduler.c:47',
        explanation:
          'The loop fires because items[0] (Compiler, priority 3) > Kernel (priority 1). Compiler must shift right to make room.',
      },
      {
        command: 'print pos',
        output: '$6 = 1',
        explanation:
          'pos starts at pq->size (1). The loop will shift items[0] to items[1] and decrement pos to 0.',
      },
      {
        command: 'next 2',
        output: '',
        explanation:
          'Execute the shift and pos decrement. Compiler moved from position 0 to position 1.',
      },
      {
        command: 'print pos',
        output: '$7 = 0',
        explanation:
          'pos is now 0 — Kernel will be placed at the front of the array.',
      },
      {
        command: 'delete breakpoints',
        output: 'Delete all breakpoints? (y or n) y',
        explanation:
          'Remove breakpoints to let the remaining enqueues and the simulation run.',
      },
      {
        command: 'continue',
        output: '=== Process Queue (sorted by priority) ===\n  PID    Name            Priority   Burst Time\n  -----------------------------------------------\n  102    Kernel          1          4\n  104    Antivirus       2          6\n  101    Compiler        3          8\n  103    Browser         4          10\n  105    TextEditor      5          3\n\n=== Scheduling Simulation ===\n\n  [T=  0] Running: Kernel          (PID 102, Priority 1, Burst 4)\n          Completed at T=4  (Execution order: 1)\n\n  [T=  4] Running: Antivirus       (PID 104, Priority 2, Burst 6)\n          Completed at T=10  (Execution order: 2)\n\n  [T= 10] Running: Compiler        (PID 101, Priority 3, Burst 8)\n          Completed at T=18  (Execution order: 3)\n\n  [T= 18] Running: Browser         (PID 103, Priority 4, Burst 10)\n          Completed at T=28  (Execution order: 4)\n\n  [T= 28] Running: TextEditor      (PID 105, Priority 5, Burst 3)\n          Completed at T=31  (Execution order: 5)\n\n=== All processes completed. Total time: 31 units ===\n[Inferior 1 exited normally]',
        explanation:
          'All five processes executed in priority order: Kernel (1), Antivirus (2), Compiler (3), Browser (4), TextEditor (5). Total execution time is 31 units.',
      },
    ],
  },

  relatedTopicIds: ['u3-t15', 'u3-t14', 'u3-t7'],
};
