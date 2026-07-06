import { MemoryRouter, Route, Routes } from 'react-router';

import { beforeEach, describe, expect, it } from 'vitest';

import { createWrapper } from '@/__tests__/test-utils.tsx';
import { MenuPopover } from '@/features/menu/MenuPopover.tsx';
import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// 확인용 스파이 메뉴 컴포넌트
const LocationDisplay = () => {
  return <div data-testid='location-display'>about</div>;
};

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('Menu 통합 테스트', () => {
  beforeEach(() => {
    useMenuStore.getState().reset();
  });

  it('MenuPopover 의 render 되면 menus 가 조회/설정되고, store 가 초기화 되어야 한다. Menu 클릭에 따라 store 설정이 변경되어야 하고, MenuPopover 가 닫혀야 한다.', async () => {
    const user = userEvent.setup();
    const queryClient = createTestQueryClient();

    // 1.Menu 조회해서 store 에 저장 확인인
    const request: ApiRequest = { userId: '123456' };
    const { result } = renderHook(() => useMenuQuery(request), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });

    // 2. Router, QueryClient를 모두 감싸서 렌더링
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <MenuPopover />
          <Routes>
            <Route path='/' element={null} />
            <Route path='/about' element={<LocationDisplay />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 3. render 후 store 확인
    await waitFor(() => {
      const state = useMenuStore.getState();
      expect(state.isMenuPanelOpen).toEqual(false);
      expect(state.selectedMenuId).toEqual('1');
      expect(state.menus).toEqual([
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
      ]);
    });

    // 4. PopoverTrigger 버튼 확인 및 클릭
    const triggerButton = await screen.findByTestId('menu-trigger');
    expect(triggerButton).toBeInTheDocument();
    await user.click(triggerButton);

    // 5. PopoverContent 열림 검증
    const popoverContent = await screen.findByTestId('menu-popover');
    expect(popoverContent).toBeInTheDocument();

    // 6. PopoverContent 에 설정된 메뉴 아이템 확인
    const aboutItem = await screen.findByTestId('menu-item-2');
    expect(aboutItem).toHaveTextContent('About');

    // 7. store 의 Menu Panel 열림 검증
    const state = useMenuStore.getState();
    expect(state.isMenuPanelOpen).toEqual(true);

    // 8. 메뉴 클릭 수행
    await user.click(aboutItem);

    // 9. store 의 Menu Panel 열림 검증
    await waitFor(() => {
      const state = useMenuStore.getState();
      expect(state.selectedMenuId).toEqual('2');
    });

    // 10. 스파이 메뉴 컴포넌트 열림 검증
    const locationDisplay = await screen.findByTestId('location-display');
    expect(locationDisplay).toHaveTextContent('about');

    // 11. 메뉴 클릭 후 PopoverContent 닫힘 확인
    await waitFor(() => {
      expect(screen.queryByTestId('menu-popover')).not.toBeInTheDocument();

      const state = useMenuStore.getState();
      expect(state.isMenuPanelOpen).toEqual(false);
    });
  });
});
