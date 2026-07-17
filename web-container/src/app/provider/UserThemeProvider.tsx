'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserThemeContextType {
  userThemeColor: string;
  setUserThemeColor: (color: string) => void;
}

const UserThemeContext = createContext<UserThemeContextType | undefined>(undefined);

export function UserThemeProvider({ children }: { children: React.ReactNode }) {
  // ✅ 해결책: useState의 초기값 함수(Lazy Initialization)를 사용합니다.
  // 이 함수는 컴포넌트가 처음 마운트될 때 딱 '한 번만' 실행되므로 동기적 재렌더링 에러가 발생하지 않습니다.
  const [userThemeColor, setUserThemeColorState] = useState<string>(() => {
    // SSR 환경(Next.js 서버 사이드) 에러 방지
    console.log('userThemeColor 1');
    if (typeof window !== 'undefined') {
      const savedColor = localStorage.getItem('user-theme-color');
      return savedColor || '#8b00ff'; // 저장된 값이 없으면 기본값 반환
    }
    return '#8b00ff';
  });

  // HTML attribute 주입은 화면 렌더링 이후에 안전하게 부수 효과(Effect)로 처리합니다.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--user-theme', userThemeColor);
    }
  }, [userThemeColor]);

  // 유저가 컬러피커로 색을 바꿀 때 호출하는 함수
  const setUserThemeColor = (color: string) => {
    setUserThemeColorState(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-theme-color', color);
    }
  };

  return (
    <UserThemeContext.Provider value={{ userThemeColor, setUserThemeColor }}>{children}</UserThemeContext.Provider>
  );
}

export const useUserTheme = () => {
  const context = useContext(UserThemeContext);
  if (!context) throw new Error('useDynamicHighlight must be used within DynamicHighlightProvider');
  return context;
};
