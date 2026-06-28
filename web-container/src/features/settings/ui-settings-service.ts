import axiosInstance from '@shared/lib/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@shared/types/api.types.ts';

export interface UiSettings {
  rawId?: number;
  themeColor?: string;
}

export const uiSettingsService = {
  getUserUiSettings: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<UiSettings>>('uiSettings', request);
  },
};
