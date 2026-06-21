import axios from 'axios';

import { create } from 'zustand';

import { menuApi, type MenuItem } from '@/services/menu-api.ts';
import type { ApiErrorResponse, ApiRequest } from '@/types/api.ts';

export interface MenuState {
  menus: MenuItem[];
  activeMenuId: string | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
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
  error: null,
  isMenuPanelOpen: false,
};

export const useMenuStore = create<MenuState>((set) => ({
  ...initialState,

  fetchMenus: async (request: ApiRequest) => {
    set({ menus: [], activeMenuId: null, isLoading: true, isLoaded: false, error: null, isMenuPanelOpen: false });
    try {
      const response = await menuApi.getUserMenu(request);

      if (response.success) {
        console.log('성공', response.data);
        set({
          menus: response.data,
          activeMenuId: null,
          isLoading: false,
          isLoaded: true,
          error: null,
          isMenuPanelOpen: false,
        });
      }
    } catch (error: unknown) {
      let message: string;
      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiErrorResponse).message;
      } else {
        message = (error as Error).message;
      }
      console.log(message);
      set({ menus: [], activeMenuId: null, isLoading: false, isLoaded: false, error: message, isMenuPanelOpen: false });
    }
  },

  setActiveMenuId: (activeMenuId: string) => set({ activeMenuId: activeMenuId }),

  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),

  reset: () => set(initialState),
}));
