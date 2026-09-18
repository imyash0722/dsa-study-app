import type { CodeExample, CommonMistake, InterviewCallout, RevisionCard, Checkpoint } from './content';
import type { TheoryQuestion, ProgrammingProblem } from './practice';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Subtopic {
  id: string;
  title: string;
  slug: string;
  description: string;
  keyPoints: string[];
  codeExamples: CodeExample[];
  commonMistakes: CommonMistake[];
  interviewCallouts: InterviewCallout[];
  checkpoints: Checkpoint[];
  revisionCards: RevisionCard[];
}

export interface Topic {
  id: string;
  unitId: string;
  title: string;
  slug: string;
  description: string;
  difficulty: DifficultyLevel;
  prerequisites: string[];
  estimatedMinutes: number;
  subtopics: Subtopic[];
  theoryQuestions: TheoryQuestion[];
  programmingProblems: ProgrammingProblem[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  slug: string;
  description: string;
  hours: number;
  topics: Topic[];
  labIds: string[];
}
