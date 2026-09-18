export interface VivaQuestion {
  id: string;
  question: string;
  answer: string;
  followUp?: string;
}

export interface GDBStep {
  command: string;
  output: string;
  explanation: string;
}

export interface GDBWalkthrough {
  id: string;
  title: string;
  programFile: string;
  steps: GDBStep[];
  breakpoints: number[];
  watchedVariables: string[];
}

export interface LabProgram {
  id: string;
  number: number;
  title: string;
  slug: string;
  unitIds: string[];
  objective: string;
  description: string;
  solution: string;
  solutionExplanation: string;
  vivaQuestions: VivaQuestion[];
  gdbWalkthrough: GDBWalkthrough;
  relatedTopicIds: string[];
}
