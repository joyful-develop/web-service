import { http, HttpResponse } from 'msw';

import type { ApiRequest, ApiResponse } from '@/types/api.types';

export const settingsHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/uiSettings`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const menu: ApiResponse<{ themeColor: string | null }> = {
      success: !userId ? false : true,
      message: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId ? { themeColor: null } : { themeColor: '#8b00ff' },
    };
    return HttpResponse.json(menu, { status: !userId ? 400 : 201 });
  }),
];
