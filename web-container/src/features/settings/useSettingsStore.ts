import { create } from 'zustand';

interface SettingsUIState {
  currentTab: string;
  searchQuery: string;
  setCurrentTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useSettingsStore = create<SettingsUIState>((set) => ({
  currentTab: 'profile',
  searchQuery: '',
  setCurrentTab: (tab) => set({ currentTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
