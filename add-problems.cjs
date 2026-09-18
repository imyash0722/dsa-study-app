const fs = require('fs');
const path = require('path');

const units = ['unit1', 'unit2', 'unit3', 'unit4'];

const getProblems = (unit, topicId) => {
  if (unit === 'unit1') {
    return `
    {
      id: '${topicId}-new-easy',
      title: 'Armstrong Number Check',
      topicId: '${topicId}',
      difficulty: 'beginner',
      problemStatement: 'Read a 3-digit number. Determine if it is an Armstrong number (sum of cubes of its digits equals the number itself).',
      constraints: ['Must use mathematical operations'],
      sampleInput: '153',
      sampleOutput: '153 is an Armstrong number',
      hints: ['Extract each digit using % 10 and / 10', 'Cube each digit and sum them up'],
      solution: '#include <stdio.h>\\n\\nint main() {\\n    int n = 153, original, sum = 0, digit;\\n    original = n;\\n    while(n > 0) {\\n        digit = n % 10;\\n        sum += digit * digit * digit;\\n        n /= 10;\\n    }\\n    return 0;\\n}',
      solutionExplanation: 'Extracts digits, cubes them, sums them, checks against original.',
      dryRun: [],
      tags: ['number-theory']
    },
    {
      id: '${topicId}-new-med',
      title: 'Factorial Calculation',
      topicId: '${topicId}',
      difficulty: 'intermediate',
      problemStatement: 'Calculate the factorial of a given number n without using recursion.',
      constraints: ['Use an iterative loop'],
      sampleInput: '5',
      sampleOutput: '120',
      hints: ['Initialize result to 1, multiply by i in a loop from 1 to n'],
      solution: '#include <stdio.h>\\n\\nint main() {\\n    int n = 5, fact = 1;\\n    for(int i = 1; i <= n; i++) fact *= i;\\n    printf("%d\\\\n", fact);\\n    return 0;\\n}',
      solutionExplanation: 'Iteratively multiplies the accumulator by every number up to n.',
      dryRun: [],
      tags: ['math', 'loops']
    },
    {
      id: '${topicId}-new-hard',
      title: 'Diamond Pattern',
      topicId: '${topicId}',
      difficulty: 'advanced',
      problemStatement: 'Print a diamond pattern of stars for a given number of rows n.',
      constraints: ['Use nested loops'],
      sampleInput: '3',
      sampleOutput: '  *\\n ***\\n*****\\n ***\\n  *',
      hints: ['Divide into top half and bottom half loops'],
      solution: '/* Diamond pattern implementation */',
      solutionExplanation: 'Uses spaces and stars logic.',
      dryRun: [],
      tags: ['patterns']
    },`;
  } else if (unit === 'unit2') {
    return `
    {
      id: '${topicId}-new-easy',
      title: 'Array Reverse',
      topicId: '${topicId}',
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
      id: '${topicId}-new-med',
      title: 'Matrix Diagonal Sum',
      topicId: '${topicId}',
      difficulty: 'intermediate',
      problemStatement: 'Calculate the sum of the main diagonal of an NxN matrix.',
      constraints: ['Matrix is guaranteed to be square'],
      sampleInput: '1 2\\n3 4',
      sampleOutput: '5',
      hints: ['Main diagonal elements have index [i][i]'],
      solution: '/* Diagonal sum implementation */',
      solutionExplanation: 'Iterates and sums arr[i][i].',
      dryRun: [],
      tags: ['matrix']
    },
    {
      id: '${topicId}-new-hard',
      title: 'Recursive GCD',
      topicId: '${topicId}',
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
    },`;
  } else if (unit === 'unit3') {
    return `
    {
      id: '${topicId}-new-easy',
      title: 'String Length Manually',
      topicId: '${topicId}',
      difficulty: 'beginner',
      problemStatement: 'Find the length of a string without using strlen().',
      constraints: ['No string.h allowed'],
      sampleInput: 'hello',
      sampleOutput: '5',
      hints: ['Iterate until the null terminator is found'],
      solution: '/* String length implementation */',
      solutionExplanation: 'Loops through char array until \\\\0.',
      dryRun: [],
      tags: ['strings']
    },
    {
      id: '${topicId}-new-med',
      title: 'Bank Account Struct',
      topicId: '${topicId}',
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
      id: '${topicId}-new-hard',
      title: 'Linked List Middle',
      topicId: '${topicId}',
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
    },`;
  } else {
    return `
    {
      id: '${topicId}-new-easy',
      title: 'File Line Counter',
      topicId: '${topicId}',
      difficulty: 'beginner',
      problemStatement: 'Count the number of lines in a text file.',
      constraints: ['Use fgetc'],
      sampleInput: 'File with 3 lines',
      sampleOutput: '3',
      hints: ['Count occurrences of \\\\n'],
      solution: '/* Line count implementation */',
      solutionExplanation: 'Reads chars until EOF, counting newlines.',
      dryRun: [],
      tags: ['files']
    },
    {
      id: '${topicId}-new-med',
      title: 'MAX Macro',
      topicId: '${topicId}',
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
      id: '${topicId}-new-hard',
      title: 'Variadic Sum',
      topicId: '${topicId}',
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
    },`;
  }
};

units.forEach(unit => {
  const dir = path.join(__dirname, 'src', 'data', 'units', unit, 'topics');
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
    files.forEach(file => {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('-new-easy')) return; // already added

      // We need to extract the topicId. 
      const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
      const topicId = idMatch ? idMatch[1] : 'unknown';

      const insertion = getProblems(unit, topicId);
      
      // Look for programmingProblems: [
      content = content.replace(/programmingProblems:\s*\[/, `programmingProblems: [${insertion}`);
      
      fs.writeFileSync(filePath, content);
      console.log(`Added problems to ${file}`);
    });
  }
});
