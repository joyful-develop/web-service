import { create } from 'zustand';

export interface MenuState {
  selectedMenuId: string | null;
  isMenuPanelOpen: boolean;

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

  setSelectedMenuId: (menuId: string | null) => set({ selectedMenuId: menuId }),
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),
  toggleMenuPanel: () => set((state) => ({ isMenuPanelOpen: !state.isMenuPanelOpen })),
  reset: () => set(initialState),
}));
