import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { MenuItem } from '@/features/menu/menu.type.ts';

export interface MenuState {
  menus: MenuItem[];
  subMenus: MenuItem[];
  selectedMenu: string | null;
  recentMenus: MenuItem[];

  setMenus: (menus: MenuItem[] | null) => void;
  setSubMenus: (subMenus: MenuItem[] | null) => void;
  setSelectedMenu: (path: string | null) => void;
  setRecentMenu: (menu: MenuItem) => void;
  reset: () => void;
}

const initialState = {
  menus: [],
  subMenus: [],
  selectedMenu: null,
  recentMenus: [],
};

export const useMenuStore = create<MenuState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setMenus: (menus: MenuItem[] | null) => set({ menus: menus || [] }),

        setSubMenus: (subMenus: MenuItem[] | null) => set({ subMenus: subMenus || [] }),

        setSelectedMenu: (path: string | null) => set({ selectedMenu: path }),

        setRecentMenu: (menu: MenuItem) =>
          set((state) => {
            const filtered = state.recentMenus.filter((item) => item.path !== menu.path);
            const updated = [menu, ...filtered].slice(0, 10);
            return { recentMenus: updated };
          }),

        reset: () => set(initialState),
      }),
      {
        name: 'recent-menu', // 저장소에 저장될 키
        // 저장소에 저장될 상태
        partialize: (state) => ({
          recentMenus: state.recentMenus,
        }),
        storage: createJSONStorage(() => localStorage), // 저장소
      }
    )
  )
);
