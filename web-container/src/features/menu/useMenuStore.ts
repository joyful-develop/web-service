import { create } from 'zustand';

import { menuService } from '@/features/menu/menu.api.ts';
import type { MenuItem } from '@/features/menu/menu.type.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

export interface MenuState {
  menus: MenuItem[] | null;
  subMenus: MenuItem[] | null;
  isLoading: boolean;
  isLoaded: boolean;
  selectedMenuId: string | null;
  isMenuPanelOpen: boolean;

  getMenus: (request: ApiRequest) => void;
  setSelectedMenuId: (menuId: string | null) => void;
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => void;
  toggleMenuPanel: () => void;
  reset: () => void;
}

const initialState = {
  menus: null,
  subMenus: null,
  isLoading: false,
  isLoaded: false,
  selectedMenuId: null,
  isMenuPanelOpen: false,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

  getMenus: async (request: ApiRequest) => {
    set({ menus: [], selectedMenuId: null, isLoading: true, isLoaded: false, isMenuPanelOpen: false });

    const response = await menuService.getUserMenu(request);
    console.log('성공', response.data);
    set({
      menus: response.data,
      selectedMenuId: null,
      isLoading: false,
      isLoaded: true,
      isMenuPanelOpen: false,
    });
    return response.data;
  },

  setSelectedMenuId: (menuId: string | null) => set({ selectedMenuId: menuId }),

  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),

  toggleMenuPanel: () => set((state) => ({ isMenuPanelOpen: !state.isMenuPanelOpen })),

  reset: () => set(initialState),
}));
