'use client';

import React, { createContext, useContext, useEffect } from 'react';

import { useUserConfigStore } from '@/features/user-config/useUserConfigStore.ts';

type ThemeColorProviderState = {
  themeColor: string;
  setThemeColor: (color: string) => void;
};

const initialState: ThemeColorProviderState = {
  themeColor: '#0055ff',
  setThemeColor: () => null,
};

const ThemeColorContext = createContext<ThemeColorProviderState>(initialState);

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const themeColor = useUserConfigStore((state) => state.themeColor);
  const setThemeColor = useUserConfigStore((state) => state.setThemeColor);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--user-theme-color', themeColor);
    }
  }, [themeColor]);

  const value = {
    themeColor,
    setThemeColor: (color: string) => {
      setThemeColor(color);
    },
  };

  return <ThemeColorContext.Provider value={value}>{children}</ThemeColorContext.Provider>;
}

export const useUserTheme = () => {
  const context = useContext(ThemeColorContext);
  if (!context) throw new Error('useDynamicHighlight must be used within DynamicHighlightProvider');
  return context;
};
