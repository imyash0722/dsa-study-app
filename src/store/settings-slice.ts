import type { StateCreator } from 'zustand';

export interface SettingsSlice {
  fontSize: 'sm' | 'md' | 'lg';
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  setFontSize: (size: 'sm' | 'md' | 'lg') => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  fontSize: 'md',
  sidebarCollapsed: false,
  mobileSidebarOpen: false,

  setFontSize: (size: 'sm' | 'md' | 'lg') => set({ fontSize: size }),

  toggleSidebar: () => {
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    }));
  },

  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
});
