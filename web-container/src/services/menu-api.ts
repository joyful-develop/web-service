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
};
