import { create } from 'zustand';

interface MenuState {
  data: string | null;
  error: Error | null;
  isLoading: boolean;
  fetchMenu: () => Promise<void>;
  resetStore: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  data: null,
  error: null,
  isLoading: false,
  fetchMenu: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('https://example.com');
      if (!res.ok) {
        throw new Error('메뉴 데이터 조회를 실패했습니다.');
      }
      const data = await res.json();
      set({ data: data.menu, isLoading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error('알 수 없는 오류'), isLoading: false });
    }
  },
  resetStore: () => set({ data: null, error: null, isLoading: false }),
}));
