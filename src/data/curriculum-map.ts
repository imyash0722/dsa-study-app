import type { Unit } from '../types';
import { introDma } from './units/unit1/topics/intro-dma';
import { singlyLinkedList } from './units/unit1/topics/singly-linked-list';
import { doublyLinkedList } from './units/unit1/topics/doubly-linked-list';
import { circularLinkedList } from './units/unit1/topics/circular-linked-list';
import { multilistsSparseSkip } from './units/unit1/topics/multilists-sparse-skip';
import { stacks } from './units/unit1/topics/stacks';
import { orderedListHeader } from './units/unit1/topics/ordered-list-header';
import { polynomialAdt } from './units/unit1/topics/polynomial-adt';

import { queueUsingList } from './units/unit2/topics/queue-using-list';
import { circularQueueArray } from './units/unit2/topics/circular-queue-array';
import { priorityQueueImpl } from './units/unit2/topics/priority-queue-impl';
import { queueApplications } from './units/unit2/topics/queue-applications';
import { dequeStackDll } from './units/unit2/topics/deque-stack-dll';
import { generalBinaryTree } from './units/unit2/topics/general-binary-tree';
import { binarySearchTree } from './units/unit2/topics/binary-search-tree';
import { strings as cStrings } from './units/unit3/topics/strings';
import { stringManipulation } from './units/unit3/topics/string-manipulation';
import { commandLineArgs } from './units/unit3/topics/command-line-args';
import { dynamicMemory } from './units/unit3/topics/dynamic-memory';
import { structures } from './units/unit3/topics/structures';
import { pragma } from './units/unit3/topics/pragma';
import { arrayOfStructures } from './units/unit3/topics/array-of-structures';
import { pointerToStructures } from './units/unit3/topics/pointer-to-structures';
import { bitFields } from './units/unit3/topics/bit-fields';
import { unions } from './units/unit3/topics/unions';
import { enums } from './units/unit3/topics/enums';
import { lists } from './units/unit3/topics/lists';
import { stack } from './units/unit3/topics/stack';
import { queue } from './units/unit3/topics/queue';
import { priorityQueue } from './units/unit3/topics/priority-queue';
import { fileIoRedirection } from './units/unit4/topics/file-io-redirection';
import { fileHandlingFunctions } from './units/unit4/topics/file-handling-functions';
import { fileSearchingSorting } from './units/unit4/topics/file-searching-sorting';
import { headerFiles } from './units/unit4/topics/header-files';
import { variableLengthArgs } from './units/unit4/topics/variable-length-args';
import { environmentVariables } from './units/unit4/topics/environment-variables';
import { preprocessorDirectives } from './units/unit4/topics/preprocessor-directives';
import { conditionalCompilation } from './units/unit4/topics/conditional-compilation';

export const curriculumMap: Unit[] = [
  {
    id: 'unit-1',
    number: 1,
    title: 'Linear Data Structures, Lists, Stacks & Polynomial ADT',
    slug: 'unit-1',
    description: 'Dynamic memory management, Singly/Doubly/Circular Linked Lists, Ordered List with Header Node, Multilists, Stacks with applications (brackets, infix-to-postfix, expression evaluation), and Polynomial ADT (construct, eval, copy, differentiate).',
    hours: 15,
    labIds: ['lab-1'],
    topics: [
      introDma,
      singlyLinkedList,
      doublyLinkedList,
      circularLinkedList,
      multilistsSparseSkip,
      stacks,
      orderedListHeader,
      polynomialAdt,
    ],
  },
  {
    id: 'unit-2',
    number: 2,
    title: 'Queues, Trees & Binary Search Trees',
    slug: 'unit-2',
    description: 'Queue ADT (linked list & circular array), Deque, Priority Queue (4 implementations), Josephus Problem, General & Binary Trees, and Binary Search Trees with recursive operations.',
    hours: 14,
    labIds: ['lab-2'],
    topics: [
      queueUsingList,
      circularQueueArray,
      priorityQueueImpl,
      queueApplications,
      dequeStackDll,
      generalBinaryTree,
      binarySearchTree,
    ],
  },
  {
    id: 'unit-3',
    number: 3,
    title: 'Unit 3: Advanced Data Structures & Memory',
    slug: 'unit-3',
    description: 'Master manual memory management, structures, strings, and fundamental data structures like linked lists, stacks, and queues.',
    hours: 14,
    labIds: ['lab-3', 'lab-4', 'lab-7', 'lab-8', 'lab-9'],
    topics: [
      cStrings,
      stringManipulation,
      commandLineArgs,
      dynamicMemory,
      structures,
      pragma,
      arrayOfStructures,
      pointerToStructures,
      bitFields,
      unions,
      enums,
      lists,
      stack,
      queue,
      priorityQueue,
    ],
  },
  {
    id: 'unit-4',
    number: 4,
    title: 'Unit 4: File I/O & Preprocessor',
    slug: 'unit-4',
    description: 'Interact with the operating system through file streams, redirection, environment variables, and master the C preprocessor.',
    hours: 14,
    labIds: ['lab-5', 'lab-6'],
    topics: [
      fileIoRedirection,
      fileHandlingFunctions,
      fileSearchingSorting,
      headerFiles,
      variableLengthArgs,
      environmentVariables,
      preprocessorDirectives,
      conditionalCompilation,
    ],
  },
];
