import axiosInstance from '@shared/lib/axios-instance.ts';
import type { ApiRequest, ApiResponse } from '@shared/types/api.types.ts';

export interface Post {
  id?: number;
  title?: string;
}

export const postService = {
  getPosts: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<Post[]>>('getPosts', request);
  },
  updatePosts: async (request: ApiRequest) => {
    return axiosInstance.post<ApiResponse<number>>('updatePosts', request);
  },
};
