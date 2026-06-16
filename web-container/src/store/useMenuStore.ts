import axios from 'axios';

import { create } from 'zustand';

import type { MenuItem } from '@/types/menu.ts';
import type { PostRequestPayload } from '@/types/post-request-payload.ts';

interface MenuState {
  menus: MenuItem[];
  activeMenuId: string | null;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
  isMenuPanelOpen: boolean;
  fetchMenus: (userId: string) => Promise<void>;
  setActiveMenuId: (activeMenuId: string) => void;
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => void;
  reset: () => void;
}

interface ApiResponse {
  menus: MenuItem[];
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  activeMenuId: null,
  isLoading: false,
  isLoaded: false,
  error: null,
  isMenuPanelOpen: false,

  fetchMenus: async (userId: string) => {
    set({ menus: [], activeMenuId: null, isLoading: true, isLoaded: false, error: null, isMenuPanelOpen: false });
    try {
      const requestData: PostRequestPayload = { userId: userId };
      const response = await axios.post<ApiResponse>(`${import.meta.env.VITE_APP_API_URL}/userMenus`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('성공', response.data);
        set({
          menus: response.data.menus,
          activeMenuId: null,
          isLoading: false,
          isLoaded: true,
          error: null,
          isMenuPanelOpen: false,
        });
      }
    } catch (error) {
      let message: string;
      if (axios.isAxiosError(error)) {
        if (error.response) {
          message = `에러 발생: ${error.response?.status}`;
        } else {
          message = `네트워크 에러 발생: ${error.message}`;
        }
      } else {
        message = `에러 발생: ${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'}`;
      }
      console.log(message);
      set({ menus: [], activeMenuId: null, isLoading: false, isLoaded: false, error: message, isMenuPanelOpen: false });
    }
  },
  setActiveMenuId: (activeMenuId: string) => set({ activeMenuId: activeMenuId }),
  setIsMenuPanelOpen: (isMenuPanelOpen: boolean) => set({ isMenuPanelOpen: isMenuPanelOpen }),
  reset: () =>
    set({ menus: [], activeMenuId: null, isLoading: false, isLoaded: false, error: null, isMenuPanelOpen: false }),
}));
