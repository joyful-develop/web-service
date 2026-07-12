import React, { useEffect } from 'react';

import type { Theme } from '@/features/user-config/theme/theme.types.ts';
import { ThemeProviderContext } from '@/features/user-config/theme/ThemeProviderContext.ts';
import { useUserConfigStore } from '@/features/user-config/useUserConfigStore.ts';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const theme = useUserConfigStore((state) => state.theme);
  const setTheme = useUserConfigStore((state) => state.setTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
