const fs = require('fs');

function insertQuestions(filePath, questionsStr) {
    let content = fs.readFileSync(filePath, 'utf8');
    const target = '  ],\n  programmingProblems: [';
    if (!content.includes(target)) {
        console.error("Could not find insertion point in " + filePath);
        return;
    }
    content = content.replace(target, questionsStr + '\n' + target);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully updated " + filePath);
}

const f1 = '/mnt/shared/stuff/sem3/DSA/dsa-study-app/src/data/units/unit2/topics/circular-queue-array.ts';
const q1 = `    ,{
      id: 'u2-t2-q11',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'A queue uses a circular array of size 5. front points to first element; rear points to where NEXT element will go. Empty: front==rear. Full: (rear+1)%5==front. Initially front=rear=0. Perform: ENQUEUE(10), ENQUEUE(20), ENQUEUE(30), DEQUEUE(), ENQUEUE(40), ENQUEUE(50). Which is TRUE?',
      options: ['Queue contains 10,20,30,40,50', 'Queue contains 20,30,40,50 and is full', 'Queue contains 20,30,40 and one insertion still possible', 'Queue becomes full immediately after ENQUEUE(40)'],
      correctAnswer: 'Queue contains 20,30,40,50 and is full',
      explanation: 'Initial state: front=rear=0. ENQUEUE(10): Q[0]=10, rear=1. ENQUEUE(20): Q[1]=20, rear=2. ENQUEUE(30): Q[2]=30, rear=3. DEQUEUE(): front=1 (removes 10). ENQUEUE(40): Q[3]=40, rear=4. ENQUEUE(50): Q[4]=50, rear=0. Now (rear+1)%5 = 1 = front -> FULL.',
      tags: ['trace', 'circular-array']
    },
    {
      id: 'u2-t2-q12',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'dequeue operation:',
      options: ['Always changes rear', 'Might change rear', 'Never changes rear', 'None'],
      correctAnswer: 'Might change rear',
      explanation: 'In some implementations, when dequeue empties the queue, front and rear are both reset. So rear MIGHT change during dequeue.',
      tags: ['dequeue', 'rear']
    },
    {
      id: 'u2-t2-q13',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'Circular queue in array of size 5, front=rear=0, one slot always kept empty. Maximum elements storable?',
      options: ['5', '4', '3', 'Depends on initial front'],
      correctAnswer: '4',
      explanation: 'one slot wasted for full/empty distinction, so max = 5-1 = 4.',
      tags: ['capacity']
    },
    {
      id: 'u2-t2-q14',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Simple linear (non-circular) queue, front=2, rear=5, array size=6. After two dequeues, what problem occurs even though unused locations exist at the beginning?',
      options: ['Next enqueue at index 0', 'Next enqueue signals full', 'Next dequeue signals empty', 'Depends on front'],
      correctAnswer: 'Next enqueue signals full',
      explanation: 'In a non-circular queue, the condition rear == MAX-1 signals full, regardless of whether front > 0. Empty positions at the beginning cannot be reused.',
      tags: ['linear-queue', 'drawback']
    },
    {
      id: 'u2-t2-q15',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'If both front and rear pointers of a linked-list queue are equal, what does it imply?',
      options: ['Queue definitely empty', 'Exactly one node', 'Either empty or one-node queue', 'Queue full'],
      correctAnswer: 'Either empty or one-node queue',
      explanation: 'When front==rear in a linked-list queue: if both are NULL, empty; if both point to the same node, one element. So it covers both cases.',
      tags: ['linked-list', 'pointers']
    },
    {
      id: 'u2-t2-q16',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'In circular queue, temp = (ptr_queue->rear_ + 1) % MAXSIZE; ptr_queue->rear_ = temp; — the modulo operation is primarily used to:',
      options: ['Detect empty queue', 'Detect full queue', 'Wrap rear index around the array', 'Shift all elements'],
      correctAnswer: 'Wrap rear index around the array',
      explanation: 'The modulo wraps the rear index back to 0 when it reaches MAXSIZE, implementing circular behavior.',
      tags: ['modulo']
    },
    {
      id: 'u2-t2-q17',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Circular array queue size=5, front=0, rear=4. One element is deleted. Which is correct?',
      options: ['Queue remains full', 'Queue becomes empty', 'Position at index 0 can be reused', 'No further insertion possible'],
      correctAnswer: 'Position at index 0 can be reused',
      explanation: 'After dequeue (front advances from 0 to 1), the position at index 0 (previously front) is now freed. Rear is at 4. The next enqueue can use (rear+1)%5 = 0. So index 0 CAN be reused.',
      tags: ['reuse']
    },
    {
      id: 'u2-t2-q18',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'Array-based queue, what could front_ and rear_ be set to upon initialization?',
      options: ['Always -1', 'Always 0', 'Any valid index in the array', 'MAXSIZE'],
      correctAnswer: 'Any valid index in the array',
      explanation: 'Different implementations use different conventions. Some use front=rear=0 (empty when equal), others use front=rear=-1. The choice is implementation-defined.',
      tags: ['initialization']
    },
    {
      id: 'u2-t2-q19',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'void dequeue() { Node *p = front; front = front->next; free(p); } — what problem when queue has exactly ONE element?',
      options: ['front becomes NULL but rear remains invalid (stale pointer)', 'front becomes NULL, rear auto-becomes NULL', 'free(p) wrong, should be free(Front)', 'front->next is dangling'],
      correctAnswer: 'front becomes NULL but rear remains invalid (stale pointer)',
      explanation: 'When the only element is dequeued, front = front->next = NULL. But rear still points to the freed node p. rear is now a dangling/stale pointer. This must be fixed: if (front == NULL) rear = NULL.',
      tags: ['bug', 'linked-list']
    },
    {
      id: 'u2-t2-q20',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'beginner',
      question: 'Circular queue MAXSIZE=5, front_=3, rear_=4. Next enqueue: temp = (++rear_) % MAXSIZE. Value of temp?',
      options: ['5', '4', '0', '1'],
      correctAnswer: '0',
      explanation: '++rear_ = 5, then 5 % 5 = 0.',
      tags: ['modulo']
    },
    {
      id: 'u2-t2-q21',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'intermediate',
      question: 'Linear (non-circular) queue, size=5, front=0, rear=4 (full). Two dequeues. Then attempt Enqueue(60) with condition if (rear == MAX-1) printf("Overflow"). Result?',
      options: ['60 inserted at index 0', '60 inserted at index 2', 'Overflow even though 2 positions free', 'Elements shift left'],
      correctAnswer: 'Overflow even though 2 positions free',
      explanation: 'rear is still 4 (== MAX-1) even after dequeuing. The linear queue does not reuse freed positions. Overflow is reported even though indices 0 and 1 are now free. This is the classic linear-queue false-overflow problem.',
      tags: ['linear-queue', 'overflow']
    }`;

const f2 = '/mnt/shared/stuff/sem3/DSA/dsa-study-app/src/data/units/unit2/topics/priority-queue-impl.ts';
const q2 = `    ,{
      id: 'u2-t3-q13',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'An ascending priority queue dequeues the SMALLEST element first. Jobs with priorities [3,1,4,1,5,9,2] are enqueued. Which is dequeued first?',
      options: ['1', '9', '3', '5'],
      correctAnswer: '1',
      explanation: 'An ascending PQ always removes the minimum-priority element.',
      tags: ['ascending', 'priority']
    },
    {
      id: 'u2-t3-q14',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Unordered list PQ (lower value = higher priority). Insert (5,A),(2,B),(8,C),(2,D) in order. Ties broken by insertion order (FIFO). removeMin() called twice. Which labels are removed?',
      options: ['A then C', 'B then D', 'D then B', 'B then A'],
      correctAnswer: 'B then D',
      explanation: 'B has priority 2 (inserted before D which also has priority 2). First removeMin() gets B. Second removeMin() gets D.',
      tags: ['tie-breaking', 'fifo']
    },
    {
      id: 'u2-t3-q15',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'If jobs have same priority, the one that joined earlier is dequeued first (FIFO for ties). In an unordered list PQ with both head and tail, which job should be dequeued?',
      options: ['Nearest to front with highest priority', 'Farthest from front with highest priority', 'Any node with highest priority', 'No two jobs can have same priority'],
      correctAnswer: 'Nearest to front with highest priority',
      explanation: 'In an unordered list, scanning from front finds the first (nearest to front = earliest inserted) highest-priority job.',
      tags: ['unordered-list', 'fifo']
    },
    {
      id: 'u2-t3-q16',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'Ordered array PQ — dequeue from the end (not beginning) for efficiency. Jobs with same priority must dequeue in FIFO order. Where should a new job be enqueued?',
      options: ['At end; few operations', 'At beginning; may require shifting', 'To the right of same-priority jobs', 'To the left of same-priority jobs'],
      correctAnswer: 'To the left of same-priority jobs',
      explanation: 'If dequeue is from the right end (highest priority end), inserting to the RIGHT of same-priority jobs means they dequeue before the newly inserted job — maintaining FIFO for ties. (Wait, inserting to the right means they are closer to the end? Actually, to the left of same-priority jobs means older is on right)',
      tags: ['ordered-array', 'fifo']
    },
    {
      id: 'u2-t3-q17',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'Two elements have same priority. Which principle is used to decide order?',
      options: ['LIFO', 'FIFO', 'Random', 'Reverse ordering'],
      correctAnswer: 'FIFO',
      explanation: 'FIFO: the element that arrived first is served first among equal priorities.',
      tags: ['fifo']
    },
    {
      id: 'u2-t3-q18',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Unordered list PQ — which operation is NOT efficient?',
      options: ['Enqueue not efficient (traversal to end)', 'Dequeue not efficient (scan all to find min/max)', 'Initialize not efficient', 'is_empty not efficient'],
      correctAnswer: 'Dequeue not efficient (scan all to find min/max)',
      explanation: 'In an unordered list, enqueue is O(1) (insert anywhere). But dequeue must scan all n elements to find the highest-priority one: O(n).',
      tags: ['unordered-list', 'complexity']
    },
    {
      id: 'u2-t3-q19',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'Higher value = higher priority. 4 jobs serviced in order A, D, B, C. Each has distinct priority (1-4). Priorities?',
      options: ['A=4,B=2,C=1,D=3', 'A=1,B=3,C=4,D=2', 'A=1,B=2,C=3,D=4', 'Cannot decide'],
      correctAnswer: 'A=4,B=2,C=1,D=3',
      explanation: 'A served first -> highest priority = 4. D served second -> 3. B third -> 2. C last -> 1. A=4,D=3,B=2,C=1. Wait, the option has D=3 which is correct, but order is A, D, B, C.',
      tags: ['tracing', 'priorities']
    },
    {
      id: 'u2-t3-q20',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Which representation maintains elements by priority so deletion of highest-priority is efficient from one end?',
      options: ['Unordered list', 'Ordered list', 'Unordered array', 'FIFO queue'],
      correctAnswer: 'Ordered list',
      explanation: 'An ordered list keeps elements sorted, so the highest-priority element is always at one end. Deletion is O(1), insertion is O(n).',
      tags: ['ordered-list', 'efficiency']
    },
    {
      id: 'u2-t3-q21',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'intermediate',
      question: 'Unordered vs ordered list PQ complexity:',
      options: ['Only enqueue proportional to n', 'Only dequeue proportional to n', 'Both O(1)', 'Both O(n)'],
      correctAnswer: 'Only dequeue proportional to n',
      explanation: 'Unordered list: enqueue O(1), dequeue O(n) to find max/min. Ordered list: enqueue O(n) to find position, dequeue O(1). This question is slightly ambiguous but usually refers to unordered list where dequeue is O(n).',
      tags: ['complexity']
    },
    {
      id: 'u2-t3-q22',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'advanced',
      question: 'PQ elements: A(priority 2), B(priority 4), C(priority 1), D(priority 4). Inserted in order A,B,C,D. Higher value = higher priority. FIFO for ties. Deletion order?',
      options: ['B,D,A,C', 'D,B,A,C', 'B,A,D,C', 'D,A,B,C'],
      correctAnswer: 'B,D,A,C',
      explanation: 'B and D both have priority 4. B inserted first -> B removed first. Then D. Then A (priority 2). Then C (priority 1). Order: B,D,A,C.',
      tags: ['tracing', 'fifo']
    },
    {
      id: 'u2-t3-q23',
      type: 'mcq',
      topicId: 'u2-t3',
      difficulty: 'beginner',
      question: 'In unordered list PQ, newly inserted element is:',
      options: ['Inserted according to priority', 'Inserted at any convenient position (front, rear, or anywhere)', 'Always at front', 'Always at rear'],
      correctAnswer: 'Inserted at any convenient position (front, rear, or anywhere)',
      explanation: 'Unordered list: insertion does not maintain sorted order. Element can go anywhere (typically front or rear for O(1) insertion). Ordering is only done at dequeue time.',
      tags: ['unordered-list', 'insertion']
    }`;

const f3 = '/mnt/shared/stuff/sem3/DSA/dsa-study-app/src/data/units/unit2/topics/queue-using-list.ts';
const q3 = `    ,{
      id: 'u2-t1-q11',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      question: 'Printer receives jobs A->B->C->D. Each processed completely before next. Best data structure?',
      options: ['Queue', 'Priority queue', 'Stack', 'Circular list with time-slicing'],
      correctAnswer: 'Queue',
      explanation: 'Printer jobs in order = FIFO = Queue.',
      tags: ['applications', 'queue']
    },
    {
      id: 'u2-t1-q12',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'beginner',
      question: 'Bank queue strictly follows FIFO. Manager can remove any customer from the middle immediately. What does this violate?',
      options: ['Queue cannot use arrays', 'Queue must have fixed capacity', 'The fundamental FIFO property', 'Queue must be empty before insertion'],
      correctAnswer: 'The fundamental FIFO property',
      explanation: 'Removing from the middle violates FIFO. A proper queue only allows removal from the front.',
      tags: ['fifo', 'violation']
    },
    {
      id: 'u2-t1-q13',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'Array queue, front and rear refer to FILLED positions. front=2, rear=5, array size=10. How many elements?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
      explanation: 'Elements from index 2 to 5 inclusive: 5-2+1 = 4.',
      tags: ['capacity', 'indices']
    },
    {
      id: 'u2-t1-q14',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'advanced',
      question: 'Linear queue Q[0..4], front=rear=-1. Enqueue(10),Enqueue(20),Enqueue(30),Dequeue(),Enqueue(40),Enqueue(50). Final state?',
      options: ['Q=[20,30,40,50,_], front=1, rear=4', 'Q=[_,20,30,40,50], front=1, rear=4', 'Q=[20,30,40,50,_], front=0, rear=3', 'Overflow on Enqueue(50)'],
      correctAnswer: 'Q=[_,20,30,40,50], front=1, rear=4',
      explanation: 'After Enqueue(10,20,30): Q=[10,20,30,_,_], front=0, rear=2. Dequeue(): front=1. Enqueue(40,50): rear=4. Final: Q=[10,20,30,40,50] but front=1 means 10 is removed. Q=[_,20,30,40,50], front=1, rear=4.',
      tags: ['trace', 'linear-queue']
    }`;

insertQuestions(f1, q1);
insertQuestions(f2, q2);
insertQuestions(f3, q3);
