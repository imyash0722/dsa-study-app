import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createProgressSlice, type ProgressSlice } from './progress-slice';
import { createBookmarkSlice, type BookmarkSlice } from './bookmark-slice';
import { createQuizSlice, type QuizSlice } from './quiz-slice';
import { createSettingsSlice, type SettingsSlice } from './settings-slice';

export type AppStore = ProgressSlice & BookmarkSlice & QuizSlice & SettingsSlice;

export const useAppStore = create<AppStore>()(
  persist(
    (...a) => ({
      ...createProgressSlice(...a),
      ...createBookmarkSlice(...a),
      ...createQuizSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: 'c-learning-app-store',
      partialize: (state) => ({
        topicProgress: state.topicProgress,
        quizAttempts: state.quizAttempts,
        streak: state.streak,
        totalTimeSpent: state.totalTimeSpent,
        bookmarks: state.bookmarks,
        fontSize: state.fontSize,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);
