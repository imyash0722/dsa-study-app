export type CompletionStatus = 'not-started' | 'in-progress' | 'completed';

export interface TopicProgress {
  topicId: string;
  status: CompletionStatus;
  theoryScore: number | null;
  problemsSolved: string[];
  lastVisited: number;
}

export interface QuizAttempt {
  quizId: string;
  topicIds: string[];
  score: number;
  total: number;
  timestamp: number;
  answers: Record<string, string | boolean>;
}

export interface Bookmark {
  id: string;
  type: 'topic' | 'example' | 'problem' | 'lab' | 'question' | 'revision-card';
  targetId: string;
  title: string;
  timestamp: number;
}

export interface UserProgress {
  topicProgress: Record<string, TopicProgress>;
  quizAttempts: QuizAttempt[];
  bookmarks: Bookmark[];
  streak: { current: number; lastDate: string };
  totalTimeSpent: number;
}
