import type { StateCreator } from 'zustand';
import type { TopicProgress, QuizAttempt, CompletionStatus } from '../types';

export interface ProgressSlice {
  topicProgress: Record<string, TopicProgress>;
  quizAttempts: QuizAttempt[];
  streak: { current: number; lastDate: string };
  totalTimeSpent: number;
  markTopicVisited: (topicId: string) => void;
  markTopicStatus: (topicId: string, status: CompletionStatus) => void;
  updateTheoryScore: (topicId: string, score: number) => void;
  addSolvedProblem: (topicId: string, problemId: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  updateStreak: () => void;
  addTimeSpent: (minutes: number) => void;
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export const createProgressSlice: StateCreator<ProgressSlice> = (set, _get) => ({
  topicProgress: {},
  quizAttempts: [],
  streak: { current: 0, lastDate: '' },
  totalTimeSpent: 0,

  markTopicVisited: (topicId: string) => {
    set((state) => {
      const existing = state.topicProgress[topicId];
      return {
        topicProgress: {
          ...state.topicProgress,
          [topicId]: {
            topicId,
            status: existing?.status === 'completed' ? 'completed' : 'in-progress',
            theoryScore: existing?.theoryScore ?? null,
            problemsSolved: existing?.problemsSolved ?? [],
            lastVisited: Date.now(),
          },
        },
      };
    });
  },

  markTopicStatus: (topicId: string, status: CompletionStatus) => {
    set((state) => {
      const existing = state.topicProgress[topicId];
      return {
        topicProgress: {
          ...state.topicProgress,
          [topicId]: {
            topicId,
            status,
            theoryScore: existing?.theoryScore ?? null,
            problemsSolved: existing?.problemsSolved ?? [],
            lastVisited: Date.now(),
          },
        },
      };
    });
  },

  updateTheoryScore: (topicId: string, score: number) => {
    set((state) => {
      const existing = state.topicProgress[topicId];
      return {
        topicProgress: {
          ...state.topicProgress,
          [topicId]: {
            ...existing,
            topicId,
            status: existing?.status ?? 'in-progress',
            theoryScore: score,
            problemsSolved: existing?.problemsSolved ?? [],
            lastVisited: Date.now(),
          },
        },
      };
    });
  },

  addSolvedProblem: (topicId: string, problemId: string) => {
    set((state) => {
      const existing = state.topicProgress[topicId];
      const solved = existing?.problemsSolved ?? [];
      if (solved.includes(problemId)) return state;
      return {
        topicProgress: {
          ...state.topicProgress,
          [topicId]: {
            ...existing,
            topicId,
            status: existing?.status ?? 'in-progress',
            theoryScore: existing?.theoryScore ?? null,
            problemsSolved: [...solved, problemId],
            lastVisited: Date.now(),
          },
        },
      };
    });
  },

  recordQuizAttempt: (attempt: QuizAttempt) => {
    set((state) => ({
      quizAttempts: [...state.quizAttempts, attempt],
    }));
  },

  updateStreak: () => {
    set((state) => {
      const today = getTodayDateString();
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      if (state.streak.lastDate === today) return state;

      const newCurrent =
        state.streak.lastDate === yesterday
          ? state.streak.current + 1
          : 1;

      return { streak: { current: newCurrent, lastDate: today } };
    });
  },

  addTimeSpent: (minutes: number) => {
    set((state) => ({
      totalTimeSpent: state.totalTimeSpent + minutes,
    }));
  },
});
