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
              isLayout: false,
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
              isLayout: false,
              isDefault: false,
              order: 1,
              parentId: null,
              children: null,
              desc: null,
            },
            {
              rawId: 3,
              groupId: 'g3',
              id: '3',
              label: 'Settings',
              path: '/settings',
              type: 'local',
              localPath: 'pages/Settings/Layout',
              remoteUrl: null,
              icon: null,
              isLayout: true,
              isDefault: false,
              order: 1,
              parentId: null,
              children: [
                {
                  rawId: 4,
                  groupId: 'g4',
                  id: '4',
                  label: 'Profile',
                  path: '/settings',
                  type: 'local',
                  localPath: 'pages/Settings/Profile',
                  remoteUrl: null,
                  icon: null,
                  isLayout: false,
                  isDefault: true,
                  order: 1,
                  parentId: null,
                  children: null,
                  desc: null,
                },
                {
                  rawId: 5,
                  groupId: 'g5',
                  id: '5',
                  label: 'Appearance',
                  path: '/settings/appearance',
                  type: 'local',
                  localPath: 'pages/Settings/Appearance',
                  remoteUrl: null,
                  icon: null,
                  isLayout: false,
                  isDefault: false,
                  order: 1,
                  parentId: null,
                  children: null,
                  desc: null,
                },
                {
                  rawId: 6,
                  groupId: 'g6',
                  id: '6',
                  label: 'Security',
                  path: '/settings/security',
                  type: 'local',
                  localPath: 'pages/Settings/Security',
                  remoteUrl: null,
                  icon: null,
                  isLayout: false,
                  isDefault: false,
                  order: 1,
                  parentId: null,
                  children: null,
                  desc: null,
                },
              ],
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
