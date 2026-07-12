import type { MenuItem } from '@/features/menu/menu.type.ts';
import axiosInstance from '@/shared/lib/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@/shared/types/api.types.ts';

export const menuService = {
  getUserMenu: async (request: ApiRequest) => {
    const response = await axiosInstance.post<ApiResponse<MenuItem[]>>('userMenus', request);
    return response.data;
  },
};
