import axiosInstance from '@/services/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@/types/api.types.ts';

export interface UiSettings {
  rawId: number;
  themeColor: string;
}

export const uiSettingsService = {
  getUserUiSettings: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<UiSettings>>('uiSettings', request);
  },
};
