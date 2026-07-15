import { create } from 'zustand';

import type { MenuItem } from '@/features/menu/menu.type.ts';

export interface MenuState {
  menus: MenuItem[];
  subMenus: MenuItem[];
  selectedMenuRawId: number | null;
  isMenuPanelOpen: boolean;

  setMenus: (menus: MenuItem[] | null) => void;
  setSubMenus: (subMenus: MenuItem[] | null) => void;
  setSelectedMenuRawId: (menuRawId: number | null) => void;
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => void;
  toggleMenuPanel: () => void;
  reset: () => void;
}

const initialState = {
  menus: [],
  subMenus: [],
  selectedMenuRawId: null,
  isMenuPanelOpen: false,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

  setMenus: (menus: MenuItem[] | null) => set({ menus: menus || [] }),
  setSubMenus: (subMenus: MenuItem[] | null) => set({ subMenus: subMenus || [] }),
  setSelectedMenuRawId: (menuRawId: number | null) => set({ selectedMenuRawId: menuRawId }),
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),
  toggleMenuPanel: () => set((state) => ({ isMenuPanelOpen: !state.isMenuPanelOpen })),
  reset: () => set(initialState),
}));
