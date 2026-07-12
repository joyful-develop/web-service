import axiosInstance from '@/shared/lib/axios-instance.ts';
import type { ApiResponse } from '@/shared/types/api.types.ts';

export interface TodoRequest {
  title: string;
  description: string;
}

export interface TodoResponse {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export const todoService = async (todoData: TodoRequest): Promise<TodoResponse> => {
  const response = await axiosInstance.post<ApiResponse<TodoResponse>>('/todos', todoData);
  return (
    response.data || {
      id: -1,
      title: '',
      description: '',
      createdAt: '',
    }
  );
};
