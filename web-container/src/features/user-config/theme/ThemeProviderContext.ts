import { createContext, useContext } from 'react';

import type { Theme } from '@/features/user-config/theme/theme.types';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  return useContext(ThemeProviderContext);
};
