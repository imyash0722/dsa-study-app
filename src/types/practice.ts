import type { DifficultyLevel } from './curriculum';

export type QuestionType = 'mcq' | 'true-false' | 'fill-blank' | 'predict-output' | 'spot-bug';

export interface TheoryQuestion {
  id: string;
  type: QuestionType;
  topicId: string;
  difficulty: DifficultyLevel;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  tags: string[];
}

export interface DryRunStep {
  step: number;
  line: number;
  variables: Record<string, string>;
  output: string;
  explanation: string;
}

export interface ProgrammingProblem {
  id: string;
  title: string;
  topicId: string;
  difficulty: DifficultyLevel;
  problemStatement: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  hints: string[];
  solution: string;
  solutionExplanation: string;
  dryRun: DryRunStep[];
  tags: string[];
  leetcodeRef?: string;
}
