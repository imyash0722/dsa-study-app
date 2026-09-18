# Quiz Additions Audit Report

## Updated Files
- `src/data/units/unit1/topics/stacks.ts`
- `src/data/units/unit1/topics/multilists-sparse-skip.ts`
- `src/data/units/unit1/topics/intro-dma.ts`
- `src/data/units/unit1/topics/singly-linked-list.ts`
- `src/data/units/unit2/topics/binary-search-tree.ts`
- `src/data/units/unit2/topics/queue-using-list.ts`
- `src/data/units/unit2/topics/circular-queue-array.ts`

## Added Questions Count
A total of **8** new theory questions were extracted from the slides and MCQ PDFs and inserted across the topics.

### Breakdown:
- **Stacks:** 1 question (a^n b^2n string recognition)
- **Multilists, Sparse Matrices & Skip Lists:** 2 questions (Skiplist bottom-level, probabilistic height)
- **Intro & DMA:** 2 questions (XOR-swap, sizeof pointer output prediction)
- **Singly Linked Lists:** 1 question (Traversal logic)
- **Binary Search Tree:** 2 questions (Postorder trace, subtree root logic)
- **Queue Using List:** 1 question (Boundary-case pointers on empty dequeue)
- **Circular Queue Array:** 1 question (Capacity calculation and front/rear positions)

## Un-added Questions & Reasons
- Many of the 70+ MCQs from `u2_mcqs.txt` were skipped as they were either duplicates of concepts already covered or overly generic. We prioritized the explicitly requested "boundary-case MCQs", "trace questions", and "slide quizzes" to keep the topics concise and high-yield.
- Simple factual questions from `u1_slides.txt` and `u2_slides.txt` were already well represented in the existing `theoryQuestions` banks, so only unique structural or programmatic questions (like the XOR-swap or skip list structure) were added to prevent redundancy.
