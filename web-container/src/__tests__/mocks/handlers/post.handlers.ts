import { http, HttpResponse } from 'msw';

import type { Post } from '@/features/post/post-service.ts';
import type { ApiRequest, ApiResponse } from '@/shared/types/api.types.ts';

export const postHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/getPosts`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const menu: ApiResponse<Post[]> = {
      success: !userId ? false : true,
      message: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId
        ? []
        : [
            { id: 1, title: '타이틀 1' },
            { id: 2, title: '타이틀 2' },
            { id: 3, title: '타이틀 3' },
          ],
      status: 0,
      description: '',
      error: null,
    };
    return HttpResponse.json(menu, { status: !userId ? 400 : 201 });
  }),
  http.post(`${import.meta.env.VITE_API_BASE_URL}/updatePosts`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const menu: ApiResponse<number> = {
      success: !userId ? false : true,
      message: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId ? 0 : 1,
      status: 0,
      description: '',
      error: null,
    };
    return HttpResponse.json(menu, { status: !userId ? 400 : 201 });
  }),
];
