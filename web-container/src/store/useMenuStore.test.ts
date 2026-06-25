import { beforeEach, describe, expect, it } from 'vitest';

import { useMenuStore } from '@/store/useMenuStore.ts';
import type { ApiRequest } from '@/types/api.types.ts';

describe('Menu Store', () => {
  beforeEach(() => {
    useMenuStore.getState().reset();
  });

  it('초기 menus 는 빈 배열이어야 한다.', () => {
    const state = useMenuStore.getState();
    expect(state.menus.length).toBe(0);
  });

  it('fetchMenus 호출 시 사용자 메뉴 데이터를 성공적으로 가져와 상태를 변경해야 한다.', async () => {
    const request: ApiRequest = { userId: '123456' };
    await useMenuStore.getState().fetchMenus(request);

    expect(useMenuStore.getState().menus).toEqual([
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
    ]);
    expect(useMenuStore.getState().activeMenuId).toBe(null);
    expect(useMenuStore.getState().isLoading).toBe(false);
    expect(useMenuStore.getState().isLoaded).toBe(true);
    expect(useMenuStore.getState().isMenuPanelOpen).toBe(false);
  });
});
