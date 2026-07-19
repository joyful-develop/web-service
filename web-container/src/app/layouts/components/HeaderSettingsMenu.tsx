import React, { useState, useEffect, useRef } from 'react';

import {
  MoreVertical,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Languages,
  ChevronRight,
  Check,
  type LucideIcon,
} from 'lucide-react';

// --- 1. 타입 정의 (any 제거) ---
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: LucideIcon;
}

interface LanguageOption {
  code: string;
  label: string;
}

export function HeaderSettingsMenu() {
  // --- 2. 상태 관리 (명확한 타입 지정) ---
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<string>('한국어');

  // 테마 상태 초기화 로직
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as ThemeMode) || 'system';
    }
    return 'system';
  });

  const menuRef = useRef<HTMLDivElement>(null);

  // --- 3. 테마 적용 로직 ---
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      localStorage.setItem('theme', theme);
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      root.classList.toggle('dark', isDark);
    };

    applyTheme();

    // 시스템 테마 변경 실시간 감지 리스너
    const listener = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        root.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  // --- 4. 외부 클릭 감지 (Outside Click) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // event.target을 Node로 단언하여 안전하게 비교
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowLangMenu(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // --- 5. 데이터 명세 ---
  const themeOptions: ThemeOption[] = [
    { value: 'light', label: '라이트', icon: Sun },
    { value: 'dark', label: '다크', icon: Moon },
    { value: 'system', label: '시스템', icon: Monitor },
  ];

  const languages: LanguageOption[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '简体中文' },
  ];

  return (
    <div className='relative inline-block text-left' ref={menuRef}>
      {/* 크롬 스타일 버튼 (세로 점 3개) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          isOpen ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100'
        }`}
        aria-label='Settings menu'>
        <MoreVertical className='h-5 w-5' />
      </button>

      {/* 크롬 마테리얼 디자인 스타일 팝오버 패널 */}
      {isOpen && (
        <div className='animate-in fade-in slide-in-from-top-2 absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white py-2 shadow-2xl duration-200 dark:border-gray-800 dark:bg-gray-900'>
          {/* 다크모드 3단 선택 구역 */}
          <div className='mb-1 border-b border-gray-100 px-4 py-2 dark:border-gray-800'>
            <span className='text-[10px] font-bold tracking-wider text-gray-400 uppercase dark:text-gray-500'>
              테마 모드
            </span>
            <div className='mt-2 flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800'>
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1.5 transition-all ${
                      isActive
                        ? 'border border-gray-200/20 bg-white text-blue-600 shadow-sm dark:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}>
                    <Icon className='h-3.5 w-3.5' />
                    <span className='text-[10px] font-medium'>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 다국어 선택 (서브 메뉴 스타일) */}
          <div className='relative'>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className='flex w-full items-center justify-between px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'>
              <div className='flex items-center gap-3'>
                <Languages className='h-4 w-4 text-gray-400' />
                <span className='text-xs font-medium'>언어 (Language)</span>
              </div>
              <div className='flex items-center gap-1 font-mono text-[10px] text-gray-400'>
                <span>{currentLang}</span>
                <ChevronRight className={`h-3 w-3 transition-transform ${showLangMenu ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {/* 언어 리스트 펼침 영역 */}
            {showLangMenu && (
              <div className='border-y border-gray-100 bg-gray-50 py-1 dark:border-gray-800 dark:bg-gray-800/40'>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.label);
                      setShowLangMenu(false);
                    }}
                    className='flex w-full items-center justify-between px-11 py-2 text-xs text-gray-600 hover:bg-white dark:text-gray-400 dark:hover:bg-gray-800'>
                    <span>{lang.label}</span>
                    {currentLang === lang.label && <Check className='h-3 w-3 text-blue-600' />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='my-1 border-t border-gray-100 dark:border-gray-800' />

          {/* 시스템 환경 설정 */}
          <a
            href='/settings'
            className='group flex items-center gap-3 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'>
            <Settings className='h-4 w-4 text-gray-400 transition-transform duration-300 group-hover:rotate-45' />
            <span className='text-xs font-medium'>환경 설정</span>
          </a>

          {/* 로그아웃 (강조색 적용) */}
          <button className='group flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10'>
            <LogOut className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            <span className='text-xs font-bold'>로그아웃</span>
          </button>

          {/* 버전 정보 표시 (크롬 스타일) */}
          <div className='px-4 py-1 text-right font-mono text-[9px] text-gray-300 dark:text-gray-600'>
            Build 2026.07.19-stable
          </div>
        </div>
      )}
    </div>
  );
}
