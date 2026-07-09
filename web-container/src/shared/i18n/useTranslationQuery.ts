import { useEffect } from 'react';

import { getAllTranslations } from '@/shared/i18n/translations.api.ts';
import { useI18nStore } from '@/shared/i18n/useI18nStore.ts';

import { useSuspenseQuery } from '@tanstack/react-query';

export function useTranslationQuery() {
  const syncTranslations = useI18nStore((state) => state.syncTranslations);

  const queryResult = useSuspenseQuery({
    queryKey: ['globalTranslations'],
    queryFn: () => getAllTranslations(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false, // 브라우저 창을 다시 포커스해도 재요청 안 함
    refetchOnReconnect: false, // 네트워크가 다시 연결되어도 재요청 안 함
  });

  useEffect(() => {
    if (queryResult.data) {
      syncTranslations(queryResult.data);
    }
  }, [queryResult.data, syncTranslations]);

  return queryResult;
}
