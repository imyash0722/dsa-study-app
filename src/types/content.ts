export interface LineAnnotation {
  lineNumber: number;
  code: string;
  explanation: string;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: 'c';
  explanation: string;
  expectedOutput: string;
  lineBreakdown: LineAnnotation[];
  relatedTopicIds: string[];
}

export interface CommonMistake {
  id: string;
  title: string;
  wrongCode: string;
  correctCode: string;
  explanation: string;
  consequence: string;
}

export interface InterviewCallout {
  id: string;
  title: string;
  content: string;
  relatedTopicIds: string[];
  frequency: 'common' | 'occasional' | 'rare';
}

export interface RevisionCard {
  id: string;
  front: string;
  back: string;
  topicId: string;
  tags: string[];
}

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  criteria: string[];
  topicId: string;
}
