import type { Topic } from '../../../../types';

export const circularQueueArray: Topic = {
  id: 'u2-t2',
  unitId: 'unit-2',
  title: 'Circular Queue using Array',
  slug: 'circular-queue-array',
  description: `A fundamental issue with standard array-based queues is the "false full" condition. As elements are dequeued, the \`front\` index advances, leaving unused space at the beginning of the array. Even if the array has available slots, a standard linear queue might report that it is full because the \`rear\` index has reached the maximum size.
  
To solve this, we use a Circular Queue. By treating the array as a circular ring, the \`rear\` index wraps around to the beginning of the array using modular arithmetic when it reaches the end. This elegant approach reuses wasted space, ensuring that the queue is only considered full when every available slot is genuinely occupied.
  
In this implementation, we explore a specific design where \`front_\` points one position *before* the first element, and we leave one slot permanently empty to distinguish between full and empty states. This allows \`is_empty\` and \`is_full\` to share the exact same condition: \`front_ == rear_\`. The trick lies in *when* they are checked relative to advancing the indices.`,
  difficulty: 'intermediate',
  prerequisites: ['u2-t1'],
  estimatedMinutes: 50,
  subtopics: [
    {
      id: 'u2-t2-s1',
      title: 'Problem with Linear Array Queue',
      slug: 'linear-queue-problem',
      description: `In a naive linear array queue implementation, elements are enqueued at the \`rear\` and dequeued from the \`front\`. Over a series of operations, both \`front\` and \`rear\` continuously move towards the end of the array. 

Eventually, \`rear\` reaches \`MAXSIZE - 1\`. When this happens, an enqueue operation is rejected because the queue appears "full". However, if several dequeue operations have previously occurred, there are empty slots at the beginning of the array (indices \`0\` to \`front - 1\`).

We cannot simply reuse this space without either shifting all existing elements to the beginning (an $O(n)$ operation, ruining the $O(1)$ efficiency of queues) or finding a way to let \`rear\` wrap around. The circular queue chooses the wrap-around approach.`,
      keyPoints: [
        'Linear array queues suffer from a "false full" condition.',
        'Dequeuing elements leaves unusable empty space at the front of the array.',
        'Shifting elements to reclaim space takes $O(n)$ time, which is inefficient.',
        'The solution is to logically connect the end of the array to its beginning, forming a ring.'
      ],
      codeExamples: [
        {
          id: 'u2-t2-s1-ex1',
          title: 'The Linear Queue Problem',
          code: `#include <stdio.h>
#define MAXSIZE 5

struct linear_queue {
    int items[MAXSIZE];
    int front, rear;
};

void enqueue(struct linear_queue *q, int value) {
    if (q->rear == MAXSIZE - 1) {
        printf("Queue is full!\\n");
    } else {
        if (q->front == -1) q->front = 0;
        q->rear++;
        q->items[q->rear] = value;
    }
}

int main() {
    struct linear_queue q = { .front = -1, .rear = -1 };
    // Enqueue 5 elements
    enqueue(&q, 10); enqueue(&q, 20); enqueue(&q, 30);
    enqueue(&q, 40); enqueue(&q, 50);
    
    // Dequeue 2 elements (conceptually, front moves forward)
    q.front += 2; 
    
    // Try to enqueue again. Rear is 4 (MAXSIZE - 1), so it fails!
    // Even though indices 0 and 1 are free.
    enqueue(&q, 60);
    return 0;
}`,
          language: 'c',
          explanation: 'This code demonstrates the limitation of a standard linear queue. After enqueuing 5 items and dequeuing 2, there is space available, but the `rear` index has maxed out, causing the next enqueue to fail.',
          expectedOutput: 'Queue is full!\n',
          lineBreakdown: [
            { lineNumber: 10, code: 'if (q->rear == MAXSIZE - 1)', explanation: 'Condition for full linear queue. It triggers even if front > 0 (space at start).' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [],
      interviewCallouts: [],
      checkpoints: [
        {
          id: 'u2-t2-s1-cp1',
          title: 'Linear Queue Inefficiency',
          description: 'Why do we need a circular queue instead of a linear array queue?',
          criteria: ['Mention the false full condition', 'Mention that shifting elements is $O(n)$'],
          topicId: 'u2-t2'
        }
      ],
      revisionCards: []
    },
    {
      id: 'u2-t2-s2',
      title: 'Circular Array Design & Invariant',
      slug: 'circular-array-design',
      description: `A circular queue uses modular arithmetic (\`%\`) to wrap indices back to \`0\` when they exceed \`MAXSIZE - 1\`. For example, if \`rear_ = 4\` and \`MAXSIZE = 5\`, the next index is \`(4 + 1) % 5 = 0\`.

In our specific implementation, \`front_\` and \`rear_\` both start at \`0\`. A critical design choice is that \`front_\` points to the position *one slot before* the actual first element. The very first element enqueued will be placed at index \`1\` (or wrapped around).

To distinguish between a completely full queue and a completely empty queue, we sacrifice one array slot. Without this sacrificed slot, \`front_ == rear_\` would mean both "empty" and "full". With the sacrificed slot, a queue is full when the next position of \`rear_\` hits \`front_\`. Thus, an array of \`MAXSIZE = 5\` can only store a maximum of 4 elements.`,
      keyPoints: [
        'Modular arithmetic `(index + 1) % MAXSIZE` creates the circular behavior.',
        '`front_` points to the index exactly one step before the first element.',
        'One array slot is intentionally left empty (wasted) to simplify full/empty logic.',
        'Maximum capacity is `MAXSIZE - 1`. If `MAXSIZE = 5`, only 4 items can be stored.'
      ],
      codeExamples: [
        {
          id: 'u2-t2-s2-ex1',
          title: 'Queue Structure & Initialization',
          code: `#ifndef queue_H
#define queue_H 

#define MAXSIZE 5
struct queue 
{
	int key_[MAXSIZE];
	int front_;
	int rear_;
};
typedef struct queue queue_t;

void init_queue(queue_t *ptr_queue);
void deinit_queue(queue_t *ptr_queue);
void enque(queue_t *ptr_queue, int ch);
int deque(queue_t *ptr_queue);
int is_empty(queue_t *ptr_queue);
int is_full(queue_t *ptr_queue);

#endif`,
          language: 'c',
          explanation: 'The structure holds the array, and indices `front_` and `rear_`. Note that MAXSIZE is 5, but we can only store 4 elements due to the one wasted slot rule.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 4, code: '#define MAXSIZE 5', explanation: 'Total array size. Can store max 4 items.' },
            { lineNumber: 8, code: 'int front_;', explanation: 'Index one step behind the first valid element.' },
            { lineNumber: 9, code: 'int rear_;', explanation: 'Index of the last valid element.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t2-s2-cm1',
          title: 'Misunderstanding Capacity',
          wrongCode: `// Assuming a queue of MAXSIZE 5 can hold 5 elements
for(int i=0; i<5; i++) enque(&q, i);`,
          correctCode: `// A queue of MAXSIZE 5 holds 4 elements
for(int i=0; i<4; i++) enque(&q, i);`,
          explanation: 'One slot is wasted to differentiate between full and empty states. Enqueuing 5 elements will result in a queue full error on the 5th attempt.',
          consequence: 'Runtime "queue full" error.'
        }
      ],
      interviewCallouts: [
        {
          id: 'u2-t2-s2-ic1',
          title: 'Why waste a slot in a circular queue?',
          content: 'If you do not waste a slot, both an empty queue and a full queue have `front == rear`. To avoid wasting a slot, you must maintain a separate `count` variable. However, keeping a `count` variable adds overhead to every enqueue and dequeue operation. Wasting one slot is a classic time-space tradeoff that simplifies the logic.',
          relatedTopicIds: [],
          frequency: 'common'
        }
      ],
      checkpoints: [
        {
          id: 'u2-t2-s2-cp1',
          title: 'Circular Queue Capacity',
          description: 'If MAXSIZE is 10, how many elements can this circular queue hold?',
          criteria: ['9 elements'],
          topicId: 'u2-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t2-s2-rc1',
          front: 'In this implementation, where does `front_` point?',
          back: 'It points one position BEFORE the first element in the queue.',
          topicId: 'u2-t2',
          tags: ['design']
        },
        {
          id: 'u2-t2-s2-rc2',
          front: 'What is the formula to wrap around an index `i`?',
          back: '`(i + 1) % MAXSIZE`',
          topicId: 'u2-t2',
          tags: ['math']
        }
      ]
    },
    {
      id: 'u2-t2-s3',
      title: 'Init, Deinit & The Identity Trick',
      slug: 'init-deinit-identity',
      description: `In this elegant design, initializing the queue simply means setting both \`front_\` and \`rear_\` to \`0\`. Because we are using an array embedded in the struct (not dynamically allocated via \`malloc\` for the array itself), \`deinit_queue\` does not need to free memory. It operates in $O(1)$ time by just resetting the indices to \`0\`, conceptually clearing the queue.

The most fascinating aspect of this code is that \`is_empty()\` and \`is_full()\` have **identical code**: \`return ptr_queue->front_ == ptr_queue->rear_;\`. 

How can the same condition mean both full and empty? The trick relies entirely on **when** these functions are called:
- \`is_empty\` is called *before* we increment \`front_\` in \`deque()\`. If they are equal, it means no elements exist.
- \`is_full\` is called *after* we tentatively increment \`rear_\` in \`enque()\`. If they are equal after incrementing \`rear_\`, it means \`rear_\` has crashed into \`front_\`, meaning the queue is full.`,
      keyPoints: [
        '`init_queue` sets both `front_` and `rear_` to 0.',
        '`deinit_queue` is $O(1)$, merely resetting indices without loops.',
        '`is_empty` and `is_full` share the exact same logic: `front_ == rear_`.',
        'The meaning of `front_ == rear_` changes based on whether we check it before or after incrementing an index.'
      ],
      codeExamples: [
        {
          id: 'u2-t2-s3-ex1',
          title: 'Init, Deinit, Empty & Full',
          code: `#include "queue.h"

void init_queue(queue_t *ptr_queue)
{
	// could be any valid index in the array
	ptr_queue->rear_ = ptr_queue->front_ = 0; 
}

void deinit_queue(queue_t *ptr_queue)
{
    // O(1) conceptually clears the queue
	ptr_queue->rear_ = ptr_queue->front_ = 0;
}

// to be called before deque before incrementing
int is_empty(queue_t *ptr_queue)
{
	return ptr_queue->front_ == ptr_queue->rear_;
}

// to be called in enque after incrementing
int is_full(queue_t *ptr_queue)
{
	return ptr_queue->front_ == ptr_queue->rear_;
}`,
          language: 'c',
          explanation: 'The code is extremely concise. The identity between is_empty and is_full is a hallmark of this specific circular queue design.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 12, code: 'int deinit_queue', explanation: 'Notice how we don\'t loop to clear elements. Just resetting pointers is enough.' },
            { lineNumber: 18, code: 'return ptr_queue->front_ == ptr_queue->rear_;', explanation: 'is_empty check.' },
            { lineNumber: 24, code: 'return ptr_queue->front_ == ptr_queue->rear_;', explanation: 'is_full check. Identical to is_empty!' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [],
      interviewCallouts: [],
      checkpoints: [
        {
          id: 'u2-t2-s3-cp1',
          title: 'Identical Conditions',
          description: 'Explain why `is_empty` and `is_full` have identical code.',
          criteria: ['is_empty is called before incrementing', 'is_full is called after incrementing'],
          topicId: 'u2-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t2-s3-rc1',
          front: 'What is the time complexity of `deinit_queue` in this array implementation?',
          back: 'O(1). It simply resets `front_` and `rear_` to 0. No elements need to be explicitly zeroed or freed.',
          topicId: 'u2-t2',
          tags: ['complexity']
        }
      ]
    },
    {
      id: 'u2-t2-s4',
      title: 'Enque & Deque: Step-by-Step',
      slug: 'enque-deque-operations',
      description: `The operations for inserting (\`enque\`) and removing (\`deque\`) require precise sequencing.

In \`enque\`, we **first** tentatively advance \`rear_\` using modular arithmetic. Then we call \`is_full\`. If it returns true (meaning the new \`rear_\` crashed into \`front_\`), we realize we made a mistake! We cannot enqueue, so we rollback \`rear_\` to its previous position using \`(rear_ - 1 + MAXSIZE) % MAXSIZE\`. If it wasn't full, we store the item at the new \`rear_\`.

In \`deque\`, we **first** check if the queue is empty. If not, we advance \`front_\` using modular arithmetic, retrieve the item at the new \`front_\`, and update the struct. Note that we do not physically delete the item from the array; advancing \`front_\` means it is logically removed and will be overwritten later.`,
      keyPoints: [
        'Enque algorithm: Tentatively increment `rear_` -> Check `is_full` -> Write value (or rollback if full).',
        'Rollback formula: `(rear_ - 1 + MAXSIZE) % MAXSIZE` safely decrements modularly.',
        'Deque algorithm: Check `is_empty` -> Increment `front_` -> Read value.',
        'Items are never physically deleted, just logically ignored by advancing `front_`.'
      ],
      codeExamples: [
        {
          id: 'u2-t2-s4-ex1',
          title: 'Enqueue and Dequeue Implementation',
          code: `#include <stdio.h>
#include "queue.h"

void enque(queue_t *ptr_queue, int key)
{
	int temp;
    // 1. Tentatively advance rear
	temp = ++ptr_queue->rear_ % MAXSIZE;
	ptr_queue->rear_ = temp;
    
    // 2. Check if this caused a collision with front
	if(! is_full(ptr_queue))
	{
		ptr_queue->key_[temp] = key; // Safe to insert
	}	
	else 
	{
        // 3. Rollback! Queue was full
		ptr_queue->rear_ = (ptr_queue->rear_ - 1 + MAXSIZE) % MAXSIZE;
		printf("queue full; cannot push\\n");
	}
}

int deque(queue_t *ptr_queue)
{
    // 1. Check if empty BEFORE doing anything
	if(! is_empty(ptr_queue))
	{
		int key;  
        // 2. Advance front
        int temp = ++ptr_queue->front_ % MAXSIZE;
		key = ptr_queue->key_[temp];
		ptr_queue->front_ = temp;
		return key;
	}
	else 
	{
		printf("queue empty; cannot pop\\n");
		return '\\0';
	}
}`,
          language: 'c',
          explanation: 'This code illustrates the precise order of operations. The enque function\'s rollback mechanism is a unique and clever way to handle overflow checks without duplicating modular logic.',
          expectedOutput: '',
          lineBreakdown: [
            { lineNumber: 8, code: 'temp = ++ptr_queue->rear_ % MAXSIZE;', explanation: 'Pre-increment rear and wrap around using modulo.' },
            { lineNumber: 18, code: 'ptr_queue->rear_ = (ptr_queue->rear_ - 1 + MAXSIZE) % MAXSIZE;', explanation: 'Rollback formula. Adding MAXSIZE prevents negative modulo results in C.' }
          ],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [
        {
          id: 'u2-t2-s4-cm1',
          title: 'Incorrect Rollback Formula',
          wrongCode: `ptr_queue->rear_ = (ptr_queue->rear_ - 1) % MAXSIZE;`,
          correctCode: `ptr_queue->rear_ = (ptr_queue->rear_ - 1 + MAXSIZE) % MAXSIZE;`,
          explanation: 'In C, the `%` operator with negative numbers yields a negative result (e.g., `-1 % 5` is `-1`). Adding `MAXSIZE` ensures the dividend is positive, properly wrapping `-1` to `4`.',
          consequence: 'Negative array index access leading to undefined behavior or segfaults.'
        }
      ],
      interviewCallouts: [],
      checkpoints: [
        {
          id: 'u2-t2-s4-cp1',
          title: 'Enqueue Ordering',
          description: 'In this implementation, why is `is_full` called AFTER incrementing `rear_`?',
          criteria: ['Because is_full checks if the tentatively incremented rear_ equals front_'],
          topicId: 'u2-t2'
        }
      ],
      revisionCards: [
        {
          id: 'u2-t2-s4-rc1',
          front: 'How do you safely decrement a wrapped circular index `x`?',
          back: '`(x - 1 + MAXSIZE) % MAXSIZE`',
          topicId: 'u2-t2',
          tags: ['math']
        }
      ]
    },
    {
      id: 'u2-t2-s5',
      title: 'Tracing through MAXSIZE=5',
      slug: 'tracing-circular-queue',
      description: `Let's trace the state of our circular queue with \`MAXSIZE = 5\`.

1. **Init**: \`front_ = 0\`, \`rear_ = 0\`. Queue is empty.
2. **enque(10)**: \`rear_\` becomes \`(0+1)%5 = 1\`. \`1 != 0\` (\`is_full\` false). \`key_[1] = 10\`.
3. **enque(20), enque(30), enque(40)**: \`rear_\` progresses to \`2\`, \`3\`, \`4\`. Array at indices 1, 2, 3, 4 holds 10, 20, 30, 40.
4. **enque(50)**: Tentative \`rear_\` becomes \`(4+1)%5 = 0\`. Now \`is_full\` checks \`front_ == rear_\` -> \`0 == 0\`. This is TRUE! Rollback \`rear_\` to \`4\`. Queue full error prints.
5. **deque()**: \`is_empty\` (\`0 == 4\`) is false. \`front_\` becomes \`(0+1)%5 = 1\`. Returns \`10\`.
6. **enque(50)**: \`rear_\` becomes \`(4+1)%5 = 0\`. \`is_full\` (\`1 == 0\`) is false. \`key_[0] = 50\`. Wrap around successful!

Notice how index 0 was reused, and how \`front_\` is always one step behind the next element to dequeue.`,
      keyPoints: [
        'Initial state has both pointers at 0.',
        'Enqueueing increments `rear_`, filling indices 1, 2, 3, 4.',
        'Attempting to insert a 5th element forces `rear_` to 0, which equals `front_` (0), triggering a full state.',
        'Dequeueing advances `front_`, freeing up space.',
        'Subsequent enqueues wrap around to the freed space at index 0.'
      ],
      codeExamples: [
        {
          id: 'u2-t2-s5-ex1',
          title: 'Full Client Trace',
          code: `#include <stdio.h>
#include "queue.h" 

int main()
{
	queue_t q;
	init_queue(&q); // front=0, rear=0
	
    enque(&q, 10); // rear=1, q[1]=10
    enque(&q, 20); // rear=2, q[2]=20
    enque(&q, 30); // rear=3, q[3]=30
    enque(&q, 40); // rear=4, q[4]=40
    
    // Attempt 5th insert. tentative rear=0. 
    // is_full checks 0 == 0. TRUE. rear rolls back to 4.
    enque(&q, 50); 
    
    // Dequeue 2 items
    int val = deque(&q); // front=1, returns 10
    printf("deque %d\\n", val);
    val = deque(&q);     // front=2, returns 20
    printf("deque %d\\n", val);
    
    // Now there's space! Wrap around
    enque(&q, 50); // rear=0, q[0]=50
    enque(&q, 60); // rear=1, q[1]=60
    
    return 0;
}`,
          language: 'c',
          explanation: 'This client code matches the trace explained above, proving the circular reuse of space.',
          expectedOutput: `queue full; cannot push\ndeque 10\ndeque 20\n`,
          lineBreakdown: [],
          relatedTopicIds: []
        }
      ],
      commonMistakes: [],
      interviewCallouts: [],
      checkpoints: [
        {
          id: 'u2-t2-s5-cp1',
          title: 'State Tracing',
          description: 'If front_=2 and rear_=4, how many elements are currently in the queue?',
          criteria: ['2 elements (at indices 3 and 4)'],
          topicId: 'u2-t2'
        }
      ],
      revisionCards: []
    }
  ],
  theoryQuestions: [
    {
      id: 'u2-t2-q1',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'On deque, queue is empty if:',
      options: [
        'Front and rear are equal before incrementing front',
        'Front and rear are equal after incrementing front',
        'Rear is at MAXSIZE - 1',
        'Front is at -1'
      ],
      correctAnswer: 'Front and rear are equal before incrementing front',
      explanation: 'In our implementation, is_empty() is called *before* front is incremented during deque.',
      tags: ['concept']
    },
    {
      id: 'u2-t2-q2',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'In this implementation, deque need not consider this as a special case:',
      options: [
        'Queue with zero nodes',
        'Queue with one node',
        'Queue that is completely full',
        'Queue where front > rear'
      ],
      correctAnswer: 'Queue with one node',
      explanation: 'Because of the modular design, popping the last node gracefully leaves front == rear without needing special `if (front == rear)` resets as seen in linear queues.',
      tags: ['design']
    },
    {
      id: 'u2-t2-q3',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'To support a different type of component (e.g., float) in the queue:',
      options: [
        'The MAXSIZE must be changed',
        'The front and rear pointers must be floats',
        'The type of the array `key_` and parameters should change',
        'You cannot support different types in C'
      ],
      correctAnswer: 'The type of the array `key_` and parameters should change',
      explanation: 'To store floats, you would change `int key_[MAXSIZE];` to `float key_[MAXSIZE];` and update function signatures accordingly.',
      tags: ['c-programming']
    },
    {
      id: 'u2-t2-q4',
      type: 'fill-blank',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'If MAXSIZE is 5, the maximum number of elements the queue can store is ____.',
      correctAnswer: '4',
      explanation: 'One slot is wasted to distinguish between empty and full states.',
      tags: ['capacity']
    },
    {
      id: 'u2-t2-q5',
      type: 'spot-bug',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Identify the bug in this rollback logic for enque:',
      code: `ptr_queue->rear_ = (ptr_queue->rear_ - 1) % MAXSIZE;`,
      correctAnswer: 'It lacks + MAXSIZE before modulo.',
      explanation: 'In C, negative modulo yields a negative result. `(rear_ - 1 + MAXSIZE) % MAXSIZE` is required to wrap around correctly when decrementing.',
      tags: ['modulo', 'c-programming']
    },
    {
      id: 'u2-t2-q6',
      type: 'true-false',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'True or False: In a circular queue, shifting elements is required when dequeueing.',
      correctAnswer: false,
      explanation: 'Elements are never physically shifted. Instead, the `front` index logically advances.',
      tags: ['performance']
    },
    {
      id: 'u2-t2-q7',
      type: 'predict-output',
      topicId: 'u2-t2',
      difficulty: 'advanced',
      question: 'What is the state of `front_` and `rear_` after: init(), enque(1), deque() with MAXSIZE=5?',
      code: `// Initial: front_=0, rear_=0
enque(&q, 1);
deque(&q);`,
      correctAnswer: 'front_=1, rear_=1',
      explanation: 'enque advances rear_ to 1. deque advances front_ to 1. They are equal again, meaning the queue is empty.',
      tags: ['trace']
    },
    {
      id: 'u2-t2-q8',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'How is the `is_full` condition structurally identical to `is_empty`?',
      options: [
        'They both check if front == (rear + 1) % MAXSIZE',
        'They both check if front == rear',
        'They both check if a size counter equals MAXSIZE',
        'They are not structurally identical'
      ],
      correctAnswer: 'They both check if front == rear',
      explanation: 'Because of the clever sequencing, `is_full` checks `front == rear` *after* rear is tentatively incremented.',
      tags: ['design']
    },
    {
      id: 'u2-t2-q9',
      type: 'true-false',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'True or False: The `deinit_queue` function loops through the array to set all values to 0.',
      correctAnswer: false,
      explanation: 'deinit_queue operates in O(1) by simply setting front_ and rear_ to 0.',
      tags: ['efficiency']
    },
    {
      id: 'u2-t2-q10',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'If `front_` points to the position ONE SLOT BEFORE the first element, what is the index of the actual first element?',
      options: [
        'front_',
        'front_ + 1',
        '(front_ + 1) % MAXSIZE',
        'rear_'
      ],
      correctAnswer: '(front_ + 1) % MAXSIZE',
      explanation: 'Because of the circular wrap-around, you must add 1 and apply modulo to find the actual first element.',
      tags: ['design']
    },
    {
      id: 'u2-t2-q11',
      type: 'predict-output',
      topicId: 'u2-t2',
      difficulty: 'advanced',
      question: 'Circular array queue size=5. front=first element, rear=next insert position. Empty: front==rear. Full: (rear+1)%5==front. Initially front=rear=0. Perform: ENQUEUE(10), ENQUEUE(20), ENQUEUE(30), DEQUEUE(), ENQUEUE(40), ENQUEUE(50). Which is TRUE?',
      options: ['Queue contains 10,20,30,40,50', 'Queue contains 20,30,40,50 and is full', 'Queue contains 20,30,40 and one insertion still possible', 'Queue becomes full immediately after ENQUEUE(40)'],
      correctAnswer: 'Queue contains 20,30,40,50 and is full',
      explanation: 'Trace: ENQUEUE(10,20,30) -> rear=3. DEQUEUE() -> front=1. ENQUEUE(40) -> rear=4. ENQUEUE(50) -> rear=0. Now (0+1)%5=1=front -> FULL. Queue holds {20,30,40,50}.',
      tags: ['Trace', 'Circular-Queue']
    },
    {
      id: 'u2-t2-q12',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Does a dequeue operation ever change the rear pointer?',
      options: ['Always changes rear', 'Might change rear', 'Never changes rear', 'None of these'],
      correctAnswer: 'Might change rear',
      explanation: 'In most implementations rear does not change on dequeue. But in some implementations, when dequeue empties the queue, both front and rear are reset (e.g., to 0 or -1). So rear MIGHT change.',
      tags: ['Dequeue', 'Rear-Pointer']
    },
    {
      id: 'u2-t2-q13',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'Circular queue using array of size 5. front=rear=0. One slot always kept empty (wasted). Maximum number of elements storable?',
      options: ['5', '4', '3', 'Depends on initial front value'],
      correctAnswer: '4',
      explanation: 'One slot is sacrificed to distinguish full from empty (full: (rear+1)%N==front). Therefore max storable elements = N-1 = 5-1 = 4.',
      tags: ['Circular-Queue', 'Capacity']
    },
    {
      id: 'u2-t2-q14',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Simple (non-circular) linear queue, front=2, rear=5, array size=6. After two dequeues, what problem occurs even though unused positions exist at the beginning?',
      options: ['Next enqueue will go at index 0', 'Next enqueue will signal overflow', 'Next dequeue will signal empty', 'Next enqueue depends on front value'],
      correctAnswer: 'Next enqueue will signal overflow',
      explanation: 'In a linear non-circular queue, the condition is `rear == MAX-1`. After two dequeues, front=4 but rear is still 5 (==MAX-1). The queue signals overflow even though indices 0-3 are free. This is the false-overflow problem that circular queues solve.',
      tags: ['Linear-Queue', 'False-Overflow']
    },
    {
      id: 'u2-t2-q15',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'If both front and rear pointers of a linked-list queue are equal, what does this imply?',
      options: ['Queue is definitely empty', 'Queue definitely has exactly one node', 'Either empty queue or one-node queue', 'Queue is full'],
      correctAnswer: 'Either empty queue or one-node queue',
      explanation: 'When front==rear: if both are NULL, the queue is empty. If both point to the same node, the queue has exactly one element. Both cases are valid, so front==rear implies EITHER empty OR one-node queue.',
      tags: ['Front-Rear', 'Edge-Case']
    },
    {
      id: 'u2-t2-q16',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'In a circular queue, `temp = (ptr_queue->rear_ + 1) % MAXSIZE;` \u2014 the modulo operation is primarily used to:',
      options: ['Detect an empty queue', 'Detect a full queue', 'Wrap the rear index around the array', 'Shift all queue elements'],
      correctAnswer: 'Wrap the rear index around the array',
      explanation: 'The modulo operator implements circular behavior: when rear reaches MAXSIZE-1, adding 1 and taking modulo wraps it back to 0. This is the key to reusing freed positions.',
      tags: ['Modulo', 'Circular-Behavior']
    },
    {
      id: 'u2-t2-q17',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Circular array queue size=5, front=0, rear=4. One element is dequeued. Which statement is correct?',
      options: ['Queue remains full', 'Queue becomes empty', 'The position at index 0 can be reused', 'No further insertion is possible'],
      correctAnswer: 'The position at index 0 can be reused',
      explanation: 'After dequeue, front advances from 0 to 1 (freeing index 0). Rear is at 4. Next enqueue computes (4+1)%5=0, so index 0 IS reusable immediately. This is the circular advantage.',
      tags: ['Dequeue', 'Reuse', 'Circular-Queue']
    },
    {
      id: 'u2-t2-q18',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'In an array-based queue implementation, what could front_ and rear_ be set to upon initialization?',
      options: ['Always -1', 'Always 0', 'Any valid index in the array (implementation-dependent)', 'MAXSIZE'],
      correctAnswer: 'Any valid index in the array (implementation-dependent)',
      explanation: 'Different implementations use different conventions. Some use front=rear=0 (empty when equal, one slot wasted). Others use front=rear=-1 (empty means rear==-1). The choice is up to the implementer.',
      tags: ['Initialization', 'Convention']
    },
    {
      id: 'u2-t2-q19',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Circular queue MAXSIZE=5, front_=3, rear_=4. Next enqueue: temp = (++rear_) % MAXSIZE. What is the value of temp?',
      options: ['5', '4', '0', '1'],
      correctAnswer: '0',
      explanation: '++rear_ = 5. Then 5 % MAXSIZE = 5 % 5 = 0. The circular wrap puts the next element at index 0.',
      tags: ['Modulo', 'Trace']
    },
    {
      id: 'u2-t2-q20',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Linear (non-circular) queue size=5, front=0, rear=4 (full). Two DEQUEUE operations. Then Enqueue(60) with condition: `if (rear == MAX-1) printf("Overflow")`. What happens?',
      options: ['60 is inserted at index 0', '60 is inserted at index 2', 'Overflow occurs even though 2 positions are free', 'Elements automatically shift left'],
      correctAnswer: 'Overflow occurs even though 2 positions are free',
      explanation: 'After two dequeues, front=2 but rear is still 4 (==MAX-1). The naive condition rear==MAX-1 fires and reports overflow, wasting indices 0 and 1. This false overflow is the fundamental flaw of linear queues that circular queues solve.',
      tags: ['Linear-Queue', 'False-Overflow', 'Circular-Queue']
    },
    {
      id: 'u2-t2-q21',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'In a circular queue (array size N), the next position of rear after enqueue is calculated as:',
      options: ['rear + 1', 'rear - 1', '(rear + 1) % N', '(rear - 1) % N'],
      correctAnswer: '(rear + 1) % N',
      explanation: 'Adding 1 advances rear to the next slot. Taking modulo N wraps it around when it reaches N, back to 0. This is the standard circular queue advancement formula.',
      tags: ['Formula', 'Modulo']
    }
  ],
  programmingProblems: [
    {
      id: 'u2-t2-p1',
      title: 'Trace Circular Queue States',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      problemStatement: 'Trace the circular queue states for enque(10), enque(20), enque(30), enque(40), deque(), enque(50), enque(60) with MAXSIZE=5. Show the values returned or errors printed.',
      constraints: ['MAXSIZE = 5', 'Use the course implementation logic'],
      sampleInput: '10 20 30 40 pop 50 60',
      sampleOutput: 'deque 10\nqueue full; cannot push\n',
      hints: ['Remember that a MAXSIZE=5 queue only holds 4 elements.', 'Calculate (rear_+1)%5 manually for each step.'],
      solution: `// Trace Walkthrough:
// init: f=0, r=0
// enque(10): r=1, arr[1]=10
// enque(20): r=2, arr[2]=20
// enque(30): r=3, arr[3]=30
// enque(40): r=4, arr[4]=40
// deque(): f=1, returns arr[1] (10)
// enque(50): r=0, arr[0]=50
// enque(60): tentative r=1. is_full checks f==r (1==1). TRUE. Rollback r to 0. Prints "queue full".`,
      solutionExplanation: 'This traces the exact values of front and rear as they modulo wrap around the 5-element array. The 5th enqueue (60) fails because capacity is 4.',
      dryRun: [
        { step: 1, line: 0, variables: { f: '0', r: '0' }, output: '', explanation: 'Init' },
        { step: 2, line: 0, variables: { f: '0', r: '4' }, output: '', explanation: 'After 4 enqueues' },
        { step: 3, line: 0, variables: { f: '1', r: '4' }, output: 'deque 10', explanation: 'After deque' },
        { step: 4, line: 0, variables: { f: '1', r: '0' }, output: '', explanation: 'After enque(50) wrapping around' },
        { step: 5, line: 0, variables: { f: '1', r: '0' }, output: 'queue full; cannot push', explanation: 'enque(60) rejected' }
      ],
      tags: ['trace']
    },
    {
      id: 'u2-t2-p2',
      title: 'Circular Queue Display Function',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      problemStatement: 'Implement a `display(queue_t *q)` function that prints all current elements in the circular queue in FIFO order. It should print from the actual first element up to the rear.',
      constraints: ['Do not modify the queue during display', 'Handle the wrap-around correctly'],
      sampleInput: 'Queue has 20 at index 4, 30 at index 0, 40 at index 1. front=3, rear=1.',
      sampleOutput: '20 30 40',
      hints: ['Use a loop variable starting at (front + 1) % MAXSIZE', 'Keep advancing the loop variable using modulo until it equals (rear + 1) % MAXSIZE'],
      solution: `#include <stdio.h>
#include "queue.h"

void display(queue_t *q) {
    if (is_empty(q)) {
        printf("Queue is empty\\n");
        return;
    }
    
    int i = (q->front_ + 1) % MAXSIZE;
    while (i != (q->rear_ + 1) % MAXSIZE) {
        printf("%d ", q->key_[i]);
        i = (i + 1) % MAXSIZE;
    }
    printf("\\n");
}`,
      solutionExplanation: 'We start at `(front_ + 1) % MAXSIZE` which is the actual first element. We loop, advancing `i` with modulo, until `i` passes `rear_` (i.e., when `i` equals `(rear_ + 1) % MAXSIZE`).',
      dryRun: [
        { step: 1, line: 9, variables: { i: '4' }, output: '', explanation: 'Calculates starting point' },
        { step: 2, line: 11, variables: { i: '4' }, output: '20 ', explanation: 'Prints first item' },
        { step: 3, line: 12, variables: { i: '0' }, output: '', explanation: 'Wraps around' },
        { step: 4, line: 11, variables: { i: '0' }, output: '30 ', explanation: 'Prints second item' }
      ],
      tags: ['display', 'modulo']
    },
    {
      id: 'u2-t2-p3',
      title: 'Hot Potato Simulation',
      topicId: 'u2-t2',
      difficulty: 'advanced',
      problemStatement: 'Implement a hot potato simulation (Josephus problem) using the circular queue. Given `n` people (numbered 1 to n) and a pass count `k`, eliminate every `k`-th person until only one remains. Assume `MAXSIZE` is large enough to hold `n` people.',
      constraints: ['Use enque and deque functions provided', 'n <= MAXSIZE - 1'],
      sampleInput: 'n = 5, k = 2',
      sampleOutput: 'Eliminated: 2, 4, 1, 5. Winner: 3',
      hints: ['Enqueue all n people initially', 'Dequeue a person. If they are not the k-th person, enqueue them back. If they are, eliminate them.'],
      solution: `#include <stdio.h>
#include "queue.h"

void hot_potato(int n, int k) {
    queue_t q;
    init_queue(&q);
    
    // Enqueue all people
    for (int i = 1; i <= n; i++) {
        enque(&q, i);
    }
    
    printf("Eliminated: ");
    while (!is_empty(&q)) {
        // Pass the potato k-1 times
        for (int i = 0; i < k - 1; i++) {
            int person = deque(&q);
            enque(&q, person);
        }
        
        // Eliminate the k-th person
        int eliminated = deque(&q);
        
        // If queue is now empty, this was the winner
        if (is_empty(&q)) {
            printf("\\nWinner: %d\\n", eliminated);
        } else {
            printf("%d, ", eliminated);
        }
    }
}`,
      solutionExplanation: 'This simulates a circle of people. We dequeue a person and immediately enqueue them to the back, simulating passing the potato. The k-th person dequeued is permanently removed (not re-enqueued). This repeats until the queue is empty.',
      dryRun: [
        { step: 1, line: 9, variables: {}, output: '', explanation: 'Queue filled with 1,2,3,4,5' },
        { step: 2, line: 18, variables: { person: '1' }, output: '', explanation: '1 passes to back' },
        { step: 3, line: 23, variables: { eliminated: '2' }, output: '2, ', explanation: '2 is eliminated' }
      ],
      tags: ['simulation', 'josephus']
    }
  ]
};
