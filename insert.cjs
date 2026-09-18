const fs = require('fs');

const path = '/mnt/shared/stuff/sem3/DSA/dsa-study-app/src/data/units/';

const updates = {
  'unit1/topics/stacks.ts': `
    {
      id: 'u1-t6-q99',
      type: 'mcq',
      topicId: 'u1-t6',
      difficulty: 'advanced',
      question: 'Which of the following string patterns can be recognized using a single stack?',
      options: ['a^n b^n c^n', 'a^n b^2n', 'ww', 'None of the above'],
      correctAnswer: 'a^n b^2n',
      explanation: 'A stack can be used to count and match characters. For every \\'a\\', we can push two tokens onto the stack, and for every \\'b\\', we pop one token. If the stack is empty at the end, it matches a^n b^2n.',
      tags: ['applications', 'recognition']
    },`,
  'unit1/topics/multilists-sparse-skip.ts': `
    {
      id: 'u1-t5-q99',
      type: 'true-false',
      topicId: 'u1-t5',
      difficulty: 'beginner',
      question: 'In a Skip List, the bottom-most level contains all the elements in the list.',
      correctAnswer: true,
      explanation: 'The bottom level of a Skip List is a standard sorted linked list containing every single element.',
      tags: ['skiplist', 'structure']
    },
    {
      id: 'u1-t5-q100',
      type: 'mcq',
      topicId: 'u1-t5',
      difficulty: 'intermediate',
      question: 'How is the height of a new node determined in a Skip List during insertion?',
      options: ['Based on the size of the list', 'Probabilistically (e.g., via coin flips)', 'It is always fixed to MAX_LEVEL', 'It depends on the value of the node'],
      correctAnswer: 'Probabilistically (e.g., via coin flips)',
      explanation: 'Skip lists use randomization to maintain balance. The level of a new node is determined probabilistically.',
      tags: ['skiplist', 'insertion']
    },`,
  'unit1/topics/intro-dma.ts': `
    {
      id: 'u1-t1-q99',
      type: 'predict-output',
      topicId: 'u1-t1',
      difficulty: 'advanced',
      question: 'What is the output of the following XOR-swap using pointers?',
      code: 'void swap(int *a, int *b) {\\n  *a ^= *b;\\n  *b ^= *a;\\n  *a ^= *b;\\n}\\nint main() {\\n  int x = 5, y = 10;\\n  swap(&x, &y);\\n  printf("%d %d", x, y);\\n}',
      correctAnswer: '10 5',
      explanation: 'The XOR swap algorithm safely swaps two integers without a temporary variable. Passing pointers ensures the original variables in main are modified.',
      tags: ['pointers', 'bitwise']
    },
    {
      id: 'u1-t1-q100',
      type: 'mcq',
      topicId: 'u1-t1',
      difficulty: 'intermediate',
      question: 'What does sizeof() return for a pointer variable on a typical 64-bit architecture?',
      options: ['4 bytes', '8 bytes', 'Depends on the type it points to', '1 byte'],
      correctAnswer: '8 bytes',
      explanation: 'On a 64-bit architecture, a memory address is 64 bits (8 bytes) long, regardless of whether it points to a char, int, or struct.',
      tags: ['pointers', 'sizeof']
    },`,
  'unit1/topics/singly-linked-list.ts': `
    {
      id: 'u1-t2-q99',
      type: 'mcq',
      topicId: 'u1-t2',
      difficulty: 'beginner',
      question: 'Which of the following is true about Traversing a linked list?',
      options: ['You can start from the middle if you know the index', 'You must always start from the head node', 'It is faster than traversing an array', 'It requires O(1) time complexity'],
      correctAnswer: 'You must always start from the head node',
      explanation: 'Linked lists do not have random access by index, so you must always begin traversal from the head pointer.',
      tags: ['traversal']
    },`,
  'unit2/topics/binary-search-tree.ts': `
    {
      id: 'u2-t7-q99',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'Trace the output: Insert [30, 20, 40, 10, 25, 35, 50] into an empty BST, then perform a Postorder traversal.',
      correctAnswer: '10 25 20 35 50 40 30',
      explanation: 'The tree is constructed with 30 as root. Postorder (Left, Right, Root) yields 10 25 20 35 50 40 30.',
      tags: ['trace', 'traversal']
    },
    {
      id: 'u2-t7-q100',
      type: 'predict-output',
      topicId: 'u2-t7',
      difficulty: 'advanced',
      question: 'Consider a BST with insertions [10, 5, 15, 2, 7, 12, 20]. What is the root of the left subtree of the node containing 15?',
      correctAnswer: '12',
      explanation: 'Node 15 is the right child of 10. Its left child is 12.',
      tags: ['trace', 'structure']
    },`,
  'unit2/topics/queue-using-list.ts': `
    {
      id: 'u2-t1-q99',
      type: 'mcq',
      topicId: 'u2-t1',
      difficulty: 'intermediate',
      question: 'In a linked list queue, what happens when a dequeue operation makes the queue empty?',
      options: ['Only the front pointer becomes NULL', 'Only the rear pointer becomes NULL', 'Both front and rear pointers must be updated to NULL', 'Neither pointer is updated'],
      correctAnswer: 'Both front and rear pointers must be updated to NULL',
      explanation: 'When the last element is dequeued, front naturally becomes NULL, but rear must also be manually set to NULL to prevent a dangling pointer.',
      tags: ['pointers', 'boundary-case']
    },`,
  'unit2/topics/circular-queue-array.ts': `
    {
      id: 'u2-t2-q99',
      type: 'mcq',
      topicId: 'u2-t2',
      difficulty: 'advanced',
      question: 'If a circular queue has MAXSIZE = 8 and currently front = 7 and rear = 2, how many elements are in the queue? (Assume front points to one slot before the first element)',
      options: ['3', '4', '5', '6'],
      correctAnswer: '3',
      explanation: 'The elements are at indices 0, 1, and 2. Thus, there are 3 elements.',
      tags: ['capacity', 'boundary-case']
    },`
};

for (const [file, content] of Object.entries(updates)) {
  const fullPath = path + file;
  let fileContent = fs.readFileSync(fullPath, 'utf8');
  
  // Find the closing bracket of theoryQuestions array
  const theoryQuestionsStr = 'theoryQuestions: [';
  const startIndex = fileContent.indexOf(theoryQuestionsStr);
  
  if (startIndex !== -1) {
    const endOfTheoryQuestions = startIndex + theoryQuestionsStr.length;
    fileContent = fileContent.substring(0, endOfTheoryQuestions) + content + fileContent.substring(endOfTheoryQuestions);
    fs.writeFileSync(fullPath, fileContent);
    console.log('Updated ' + file);
  } else {
    console.log('Could not find theoryQuestions in ' + file);
  }
}
