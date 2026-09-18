import type { StateCreator } from 'zustand';
import type { Bookmark } from '../types';

export interface BookmarkSlice {
  bookmarks: Bookmark[];
  toggleBookmark: (bookmark: Omit<Bookmark, 'timestamp'>) => void;
  isBookmarked: (targetId: string) => boolean;
  getBookmarksByType: (type: Bookmark['type']) => Bookmark[];
  clearBookmarks: () => void;
}

export const createBookmarkSlice: StateCreator<BookmarkSlice> = (set, get) => ({
  bookmarks: [],

  toggleBookmark: (bookmark: Omit<Bookmark, 'timestamp'>) => {
    set((state) => {
      const exists = state.bookmarks.find((b) => b.targetId === bookmark.targetId);
      if (exists) {
        return {
          bookmarks: state.bookmarks.filter((b) => b.targetId !== bookmark.targetId),
        };
      }
      return {
        bookmarks: [...state.bookmarks, { ...bookmark, timestamp: Date.now() }],
      };
    });
  },

  isBookmarked: (targetId: string) => {
    return get().bookmarks.some((b) => b.targetId === targetId);
  },

  getBookmarksByType: (type: Bookmark['type']) => {
    return get().bookmarks.filter((b) => b.type === type);
  },

  clearBookmarks: () => set({ bookmarks: [] }),
});
