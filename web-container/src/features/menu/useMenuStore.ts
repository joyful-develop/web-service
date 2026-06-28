import { create } from 'zustand';

import { menuService, type MenuItem } from '@/features/menu/menu-service.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

export interface MenuState {
  menus: MenuItem[];
  activeMenuId: string | null;
  isLoading: boolean;
  isLoaded: boolean;
  isMenuPanelOpen: boolean;
  fetchMenus: (request: ApiRequest) => Promise<void>;
  setActiveMenuId: (activeMenuId: string) => void;
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => void;
  reset: () => void;
}

const initialState = {
  menus: [],
  activeMenuId: null,
  isLoading: false,
  isLoaded: false,
  isMenuPanelOpen: false,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

  fetchMenus: async (request: ApiRequest) => {
    set({ menus: [], activeMenuId: null, isLoading: true, isLoaded: false, isMenuPanelOpen: false });

    const response = await menuService.getUserMenu(request);
    console.log('성공', response.data);
    set({
      menus: response.data,
      activeMenuId: null,
      isLoading: false,
      isLoaded: true,
      isMenuPanelOpen: false,
    });
  },

  setActiveMenuId: (activeMenuId: string) => set({ activeMenuId: activeMenuId }),

  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),

  reset: () => set(initialState),
}));
