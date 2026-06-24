import { create } from 'zustand';

import { uiSettingsService } from '@/services/ui-settings-service.ts';
import type { ApiRequest } from '@/types/api.types';

export interface UiSettingsState {
  themeColor: string | null;
  fetchUiSettings: (request: ApiRequest) => Promise<void>;
  reset: () => void;
}

const initialState = {
  themeColor: null,
};

export const useUiSettingsStore = create<UiSettingsState>((set) => ({
  ...initialState,

  fetchUiSettings: async (request: ApiRequest) => {
    set({ themeColor: null });

    const response = await uiSettingsService.getUserUiSettings(request);
    console.log('성공', response.data);
    set({
      themeColor: response.data.themeColor,
    });
  },

  reset: () => set(initialState),
}));
