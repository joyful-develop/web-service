import axiosInstance from '@shared/lib/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@shared/types/api.types.ts';

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

export const menuService = {
  getUserMenu: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<MenuItem[]>>('userMenus', request);
  },
};
