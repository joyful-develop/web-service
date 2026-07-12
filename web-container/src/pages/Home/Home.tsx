import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { RefreshCw } from 'lucide-react';

// import { updateMockDbData } from '@/services/translation.ts';
import { useUserConfigStore } from '@/features/user-config/useUserConfigStore.ts';

import { useQueryClient } from '@tanstack/react-query';

export default function Home() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const currentLang = useUserConfigStore((state) => state.language);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Mock DB의 값을 실시간으로 변경하는 시나리오 연출 (타임스탬프)
    // const timestamp = new Date().toLocaleTimeString();
    // updateMockDbData('ko', 'welcome', `Mock 실시간 갱신 완료! (${timestamp})`);
    // updateMockDbData('en', 'welcome', `Mock Live Synced! (${timestamp})`);

    // React Query v5: 기존 인피니티 캐시를 강제로 무시하고 백엔드 API 재호출 트리거
    // 이 처리가 종료되면 RootLayout의 useQuery data 레퍼런스가 갱신되며 Zustand 스토어가 연쇄 업데이트됩니다.
    await queryClient.refetchQueries({ queryKey: ['globalTranslations'] });

    setIsRefreshing(false);
  };

  return (
    <div className='bg-card mx-auto max-w-md space-y-6 rounded-xl border p-6 shadow-sm'>
      <div className='space-y-2'>
        <h1 className='text-foreground text-xl font-bold tracking-tight'>{t('welcome')}</h1>
        <p className='text-muted-foreground text-xs'>
          {t('current_lang')}:{' '}
          <span className='text-primary font-semibold tracking-wider uppercase'>{currentLang}</span>
        </p>
      </div>

      {/* shadcn Button 스타일 컴포넌트 마크업 */}
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className='focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'>
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {t('refresh_btn')}
      </button>
    </div>
  );
}
