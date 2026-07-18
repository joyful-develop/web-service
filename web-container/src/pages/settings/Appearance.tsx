import React, { useState, useEffect } from 'react';

// 1. Tailwind 공식 색상표 기반 톤 세트 정의
interface ColorShades {
  50: string;
  100: string;
  300: string;
  500: string;
  700: string;
  900: string;
}

interface ThemeColor {
  id: string;
  name: string;
  shades: ColorShades;
}

const PALETTE: ThemeColor[] = [
  {
    id: 'blue',
    name: '로얄 블루',
    shades: { 50: '#eff6ff', 100: '#dbeafe', 300: '#93c5fd', 500: '#3b82f6', 700: '#1d4ed8', 900: '#1e3a8a' },
  },
  {
    id: 'emerald',
    name: '에메랄드 그린',
    shades: { 50: '#ecfdf5', 100: '#d1fae5', 300: '#6ee7b7', 500: '#10b981', 700: '#047857', 900: '#064e3b' },
  },
  {
    id: 'violet',
    name: '네온 바이올렛',
    shades: { 50: '#f5f3ff', 100: '#ede9fe', 300: '#c4b5fd', 500: '#8b5cf6', 700: '#6d28d9', 900: '#4c1d95' },
  },
  {
    id: 'red',
    name: '크림슨 레드',
    shades: { 50: '#fef2f2', 100: '#fee2e2', 300: '#fca5a5', 500: '#ef4444', 700: '#b91c1c', 900: '#7f1d1d' },
  },
];

export default function ThemeStudio() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(PALETTE[0]);

  // 테마 변경 시 모든 톤의 CSS 변수를 DOM에 주입
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme.shades).forEach(([shade, hex]) => {
      root.style.setProperty(`--primary-${shade}`, hex);
    });
  }, [currentTheme]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-950 p-8 font-sans text-gray-100'>
      <div className='grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* 왼쪽 섹션: 색상 및 톤 컨트롤러 (4레벨) */}
        <div className='space-y-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl lg:col-span-5'>
          <div>
            <span className='text-primary-500 text-xs font-bold tracking-widest uppercase'>Design System</span>
            <h1 className='mt-1 text-2xl font-black'>테마 컬러 스튜디오</h1>
            <p className='mt-1 text-xs text-gray-400'>팔레트를 선택하고 컴포넌트 변화를 확인하세요.</p>
          </div>

          {/* 메인 색상 선택 */}
          <div className='space-y-2'>
            <label className='text-xs font-semibold text-gray-400'>대표 색상 레이블</label>
            <div className='grid grid-cols-2 gap-2'>
              {PALETTE.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    currentTheme.id === theme.id
                      ? 'border-primary-500 bg-gray-800 shadow-[0_0_15px_rgba(var(--primary-500),0.15)]'
                      : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                  }`}>
                  <span className='h-4 w-4 rounded-full' style={{ backgroundColor: theme.shades[500] }} />
                  <span className='text-xs font-bold'>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 현재 색상의 톤 상세 표 */}
          <div className='space-y-2'>
            <label className='text-xs font-semibold text-gray-400'>주입된 톤 스펙트럼 (Shades)</label>
            <div className='space-y-1.5'>
              {Object.entries(currentTheme.shades).map(([shade, hex]) => {
                const isLight = parseInt(shade) <= 300;
                return (
                  <div
                    key={shade}
                    className='flex items-center justify-between rounded-lg p-2.5 font-mono text-xs font-medium transition-all'
                    style={{ backgroundColor: hex, color: isLight ? '#0f172a' : '#ffffff' }}>
                    <span>primary-{shade}</span>
                    <span className='uppercase opacity-80'>{hex}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 오른쪽 섹션: 실시간 UI 컴포넌트 쇼케이스 (7레벨) */}
        <div className='space-y-6 lg:col-span-7'>
          {/* 배너 카드 (Shade 900, 700, 50, 300 조합) */}
          <div className='bg-primary-900 border-primary-700/50 relative overflow-hidden rounded-2xl border p-6 shadow-xl'>
            <div className='bg-primary-500 absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-3xl' />
            <div className='relative z-10 space-y-4'>
              <span className='bg-primary-50 text-primary-700 rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider uppercase'>
                Live Preview
              </span>
              <h2 className='text-xl font-bold tracking-tight text-white'>
                선택하신 색상 톤이 대시보드에 즉시 반영됩니다.
              </h2>
              <p className='text-primary-100/80 max-w-md text-xs leading-relaxed'>
                주입된 토큰 클래스를 활용하여 서비스 전반의 아이덴티티를 유지하고 유연한 UX 다크모드/라이트모드를 구축할
                수 있습니다.
              </p>
            </div>
          </div>

          {/* 컴포넌트 그리드 예시 */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* 1. 인터랙티브 위젯 */}
            <div className='space-y-4 rounded-2xl border border-gray-800 bg-gray-900 p-5'>
              <h3 className='text-xs font-bold text-gray-400'>폼 컴포넌트 & 제어</h3>
              <div className='space-y-3'>
                {/* 포커스 링 & 텍스트 컬러 적용 */}
                <input
                  type='text'
                  placeholder='포커스 시 테마 컬러 테두리...'
                  className='focus:border-primary-500 focus:ring-primary-500 w-full rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-xs text-white placeholder-gray-600 transition-all focus:ring-1 focus:outline-none'
                />
                {/* 체크박스 / 토글 스위치 디자인 */}
                <div className='flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-2'>
                  <span className='text-xs text-gray-400'>알림 활성화</span>
                  <div className='bg-primary-500 flex h-5 w-9 cursor-pointer items-center justify-end rounded-full p-0.5 transition-all'>
                    <div className='h-4 w-4 rounded-full bg-white shadow-md' />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 통계 / 배지 위젯 */}
            <div className='flex flex-col justify-between rounded-2xl border border-gray-800 bg-gray-900 p-5'>
              <h3 className='text-xs font-bold text-gray-400'>데이터 및 배치 점수</h3>
              <div className='my-3 flex items-baseline gap-2'>
                <span className='text-3xl font-black tracking-tight text-white'>94.2%</span>
                <span className='text-primary-500 bg-primary-100/10 rounded-full px-2 py-0.5 text-xs font-bold'>
                  ▲ 12.8%
                </span>
              </div>
              {/* 테마 진행바 그래프 */}
              <div className='space-y-1'>
                <div className='flex justify-between text-[10px] font-medium text-gray-500'>
                  <span>목표 달성률</span>
                  <span className='text-primary-300 font-bold'>94%</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full border border-gray-800 bg-gray-950 p-0.5'>
                  <div
                    className='bg-primary-500 h-full rounded-full shadow-[0_0_10px_rgba(var(--primary-500),0.5)]'
                    style={{ width: '94%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. 액션 버튼 스펙트럼 */}
          <div className='space-y-3 rounded-2xl border border-gray-800 bg-gray-900 p-5'>
            <h3 className='text-xs font-bold text-gray-400'>버튼 계층 구조 (Button Hierarchy)</h3>
            <div className='flex flex-wrap gap-2'>
              <button className='bg-primary-500 hover:bg-primary-700 shadow-primary-500/10 flex-1 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-colors'>
                Primary Solid
              </button>
              <button className='bg-primary-100 hover:bg-primary-300 text-primary-900 flex-1 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors'>
                Primary Soft
              </button>
              <button className='hover:bg-primary-50/5 border-primary-500 text-primary-500 flex-1 rounded-xl border bg-transparent px-4 py-2.5 text-xs font-bold transition-colors'>
                Outline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
