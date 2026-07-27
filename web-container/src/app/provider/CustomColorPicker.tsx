'use client';

import { useUserTheme } from '../../features/user-config/theme/ThemeColorProviderContext.tsx';

export function CustomColorPicker() {
  const { userThemeColor, setUserThemeColor } = useUserTheme();

  return (
    <div className='bg-card max-w-sm space-y-3 rounded-xl border p-4'>
      <label className='text-card-foreground block text-sm font-medium'>나만의 하이라이트 색상 지정</label>
      <div className='flex items-center gap-3'>
        {/* 브라우저 순정 컬러피커 또는 커스텀 피커 연동 */}
        <input
          type='color'
          value={userThemeColor}
          onChange={(e) => setUserThemeColor(e.target.value)}
          className='h-10 w-10 cursor-pointer rounded border-none bg-transparent'
        />
        <span className='text-muted-foreground font-mono text-sm uppercase'>{userThemeColor}</span>
      </div>
    </div>
  );
}
