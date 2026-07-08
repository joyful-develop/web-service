import { useEffect } from 'react';

import { menuService } from '@/features/menu/menu.api.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { useSuspenseQuery } from '@tanstack/react-query';

export function useMenuQuery(request: ApiRequest) {
  const setMenus = useMenuStore((state) => state.setMenus);

  const queryResult = useSuspenseQuery({
    queryKey: ['menus', request],
    queryFn: () => menuService.getUserMenu(request),
    staleTime: 10 * 60 * 1000, // 10분 동안 fresh 상태 유지
    gcTime: 15 * 60 * 1000,
  });

  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      setMenus(queryResult.data);
    }
  }, [queryResult.data, setMenus]);

  return queryResult;
}
