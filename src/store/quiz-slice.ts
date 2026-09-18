import type { StateCreator } from 'zustand';

export interface ActiveQuiz {
  sessionId: string;
  questions: string[];
  currentIndex: number;
  answers: Record<string, string | boolean>;
  startTime: number;
  topicIds: string[];
}

export interface QuizSlice {
  activeQuiz: ActiveQuiz | null;
  startQuiz: (sessionId: string, questionIds: string[], topicIds: string[]) => void;
  answerQuestion: (questionId: string, answer: string | boolean) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
}

export const createQuizSlice: StateCreator<QuizSlice> = (set) => ({
  activeQuiz: null,

  startQuiz: (sessionId: string, questionIds: string[], topicIds: string[]) => {
    set({
      activeQuiz: {
        sessionId,
        questions: questionIds,
        currentIndex: 0,
        answers: {},
        startTime: Date.now(),
        topicIds,
      },
    });
  },

  answerQuestion: (questionId: string, answer: string | boolean) => {
    set((state) => {
      if (!state.activeQuiz) return state;
      return {
        activeQuiz: {
          ...state.activeQuiz,
          answers: { ...state.activeQuiz.answers, [questionId]: answer },
        },
      };
    });
  },

  nextQuestion: () => {
    set((state) => {
      if (!state.activeQuiz) return state;
      const next = Math.min(
        state.activeQuiz.currentIndex + 1,
        state.activeQuiz.questions.length - 1
      );
      return {
        activeQuiz: { ...state.activeQuiz, currentIndex: next },
      };
    });
  },

  previousQuestion: () => {
    set((state) => {
      if (!state.activeQuiz) return state;
      const prev = Math.max(state.activeQuiz.currentIndex - 1, 0);
      return {
        activeQuiz: { ...state.activeQuiz, currentIndex: prev },
      };
    });
  },

  finishQuiz: () => set({ activeQuiz: null }),
});
