import { safeAwait } from '#utils/safe-await.ts';

import axiosInstance from '@/services/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@/types/api.ts';

export interface MenuItem {
  rawId: number;
  groupId: string;
  id: string;
  label: string;
  path: string;
  file: string;
  icon?: string;
  isDefault: boolean;
  order: number;
  parentId?: string;
  children?: MenuItem[];
  desc?: string;
}

export const menuApi = {
  getUserMenu: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<MenuItem[]>>('userMenus', request);
  },
  getUserMenu2: async (request: ApiRequest) => {
    const [response, error] = await safeAwait(axiosInstance.post<ApiResponse<MenuItem[]>>('userMenus', request));
    if (error || !response) return; // 공통 토스트는 인터셉터가 띄워줬으므로, 여기서는 컴포넌트 조기 종료만 처리
    return response;
  },
};
