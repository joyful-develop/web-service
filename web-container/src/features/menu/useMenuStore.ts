import { create } from 'zustand';

import type { MenuItem } from '@/features/menu/menu.type.ts';

export interface MenuState {
  menus: MenuItem[];
  subMenus: MenuItem[];
  selectedMenuId: string | null;
  isMenuPanelOpen: boolean;

  setMenus: (menus: MenuItem[] | null) => void;
  setSubMenus: (subMenus: MenuItem[] | null) => void;
  setSelectedMenuId: (menuId: string | null) => void;
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => void;
  toggleMenuPanel: () => void;
  reset: () => void;
}

const initialState = {
  menus: [],
  subMenus: [],
  selectedMenuId: null,
  isMenuPanelOpen: false,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

  setMenus: (menus: MenuItem[] | null) => set({ menus: menus || [] }),
  setSubMenus: (subMenus: MenuItem[] | null) => set({ subMenus: subMenus || [] }),
  setSelectedMenuId: (menuId: string | null) => set({ selectedMenuId: menuId }),
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),
  toggleMenuPanel: () => set((state) => ({ isMenuPanelOpen: !state.isMenuPanelOpen })),
  reset: () => set(initialState),
}));
