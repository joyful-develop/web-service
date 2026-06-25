import { http, HttpResponse } from 'msw';

import type { MenuItem } from '@/services/menu-service.ts';
import type { ApiRequest, ApiResponse } from '@/types/api.types.ts';

export const menuHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/userMenus`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    const menu: ApiResponse<MenuItem[]> = {
      success: !userId ? false : true,
      message: !userId ? '필수 조건인 userId 가 없습니다.' : '',
      data: !userId
        ? []
        : [
            {
              rawId: 1,
              groupId: 'g1',
              id: '1',
              label: 'Home',
              path: '',
              file: 'pages/Home/Home.tsx',
              icon: '',
              isDefault: true,
              order: 1,
              parentId: '',
              children: [],
              desc: '',
            },
            {
              rawId: 2,
              groupId: 'g2',
              id: '2',
              label: 'About',
              path: '/about',
              file: 'pages/About/About.tsx',
              icon: '',
              isDefault: false,
              order: 2,
              parentId: '',
              children: [],
              desc: '',
            },
          ],
    };
    return HttpResponse.json(menu, { status: !userId ? 400 : 201 });
  }),
];
