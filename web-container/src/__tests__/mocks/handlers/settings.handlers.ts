import { http, HttpResponse } from 'msw';

import type { UiSettings } from '@/features/settings/ui-settings-service.ts';
import type { ApiRequest, ApiResponse } from '@/shared/types/api.types.ts';

export const settingsHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/uiSettings`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const menu: ApiResponse<UiSettings> = {
      success: !userId ? false : true,
      message: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId ? {} : { rawId: 1, themeColor: '#8b00ff' },
      status: 0,
      description: '',
      error: null,
    };
    return HttpResponse.json(menu, { status: !userId ? 400 : 201 });
  }),
];
