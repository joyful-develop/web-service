import axiosInstance from '@/shared/lib/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@/shared/types/api.types.ts';

export interface Post {
  id?: number;
  title?: string;
}

export const postService = {
  getPosts: async (request: ApiRequest) => {
    const { data } = await axiosInstance.post<ApiResponse<Post[]>>('getPosts', request);
    return data;
  },
  updatePosts: async (request: ApiRequest) => {
    const { data } = await axiosInstance.post<ApiResponse<number>>('updatePosts', request);
    return data;
  },
};
