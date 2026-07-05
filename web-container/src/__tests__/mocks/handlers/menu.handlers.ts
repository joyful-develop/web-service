import { http, HttpResponse } from 'msw';

import type { MenuItem } from '@/features/menu/menu.type.ts';
import type { ApiRequest, ApiResponse } from '@/shared/types/api.types.ts';

export const menuHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/userMenus`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const response: ApiResponse<MenuItem[]> = {
      success: !userId ? false : true,
      status: !userId ? 400 : 200,
      message: !userId ? '메뉴 조회 실패' : '',
      description: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId
        ? null
        : [
            {
              rawId: 1,
              groupId: 'g1',
              id: '1',
              label: 'Home',
              path: '/',
              type: 'local',
              localPath: 'pages/Home/Home',
              remoteUrl: null,
              icon: null,
              isDefault: true,
              order: 1,
              parentId: null,
              children: null,
              desc: null,
            },
            {
              rawId: 2,
              groupId: 'g2',
              id: '2',
              label: 'About',
              path: '/about',
              type: 'local',
              localPath: 'pages/About/About',
              remoteUrl: null,
              icon: null,
              isDefault: true,
              order: 1,
              parentId: null,
              children: null,
              desc: null,
            },
          ],
      error: !userId
        ? {
            type: 'error',
            status: 400,
            code: 'INVALID_USER_ID',
            message: '메뉴 조회 실패',
            description: '필수 조건인 userId 가 없습니다.',
          }
        : null,
    };
    return HttpResponse.json(response, { status: !userId ? 400 : 200 });
  }),
];
