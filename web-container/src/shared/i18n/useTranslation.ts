import { useEffect } from 'react';

import { getAllTranslations } from '@/shared/i18n/translations.api.ts';
import { useI18nStore } from '@/shared/i18n/useI18nStore.ts';

import { useQuery } from '@tanstack/react-query';

export function useTranslation() {
  const syncTranslations = useI18nStore((state) => state.syncTranslations);

  const queryResult = useQuery({
    queryKey: ['globalTranslations'],
    queryFn: () => getAllTranslations(),
    staleTime: Infinity, // 최초 1회만 호출 후 캐싱
    gcTime: Infinity, // 메모리 캐시 영구 보존
  });

  // 쿼리가 성공하여 새로운 데이터를 반환할 때마다 자동으로 Zustand 스토어와 동기화
  useEffect(() => {
    if (queryResult.data) {
      syncTranslations(queryResult.data);
    }
  }, [queryResult.data, syncTranslations]);

  return queryResult;
}
