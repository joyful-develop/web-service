import React, { useState, useEffect, useRef } from 'react';

import { Menu } from 'lucide-react';

// import { Group, Panel, Separator, usePanelRef } from 'react-resizable-panels';
// import { Outlet } from 'react-router';

// ==========================================
// 1. TypeScript 인터페이스 & 리터럴 타입 정의
// ==========================================
export type LeftTabType = 'nav' | 'files';
export type RightTabType = 'info' | 'history';
export type BottomTabType = 'logs' | 'terminal';

interface RecentMenu {
  id: string;
  title: string;
  path: string;
  icon: string;
  category: string;
}

interface ChildMenu {
  title: string;
  path: string;
}

interface MainMenu {
  title: string;
  path?: string;
  children?: ChildMenu[];
}

interface MenuCategory {
  header: string;
  items: MainMenu[];
}

// ==========================================
// 2. 헤더 좌측 메가 메뉴 전용 서브 컴포넌트 (좌측 고정 및 전체 높이 확보 버전)
// ==========================================
export function HeaderLeftMenu({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 최근 사용한 메뉴 데이터 (아이콘과 설명이 없는 미니멀 스타일 유지)
  const recentMenus: Omit<RecentMenu, 'icon' | 'category'>[] = [
    { id: '1', title: '인프라 자원 모니터링', path: '/infra/monitor' },
    { id: '2', title: 'Core 스쿼드 칸반 보드', path: '/projects/core-squad' },
    { id: '3', title: '2026년 2분기 정산서', path: '/finance/settlement' },
    { id: '4', title: '글로벌 디자인 토큰 가이드', path: '/docs/design-tokens' },
  ];

  // 헤더별 분류 그룹 데이터 세트 (5개 배치로 다음 줄로 넘어가는 Row 개행 레이아웃 유지)
  const menuCategories: MenuCategory[] = [
    {
      header: '프로젝트 및 업무',
      items: [
        { title: '대시보드 종합 관리', path: '/dashboard' },
        {
          title: '스쿼드 프로젝트 관리',
          children: [
            { title: 'Core 스쿼드', path: '/projects/core' },
            { title: 'Next 플랫폼', path: '/projects/next' },
          ],
        },
        { title: '문서 및 전사 파일고', path: '/documents' },
      ],
    },
    {
      header: '경영 지원 및 관리',
      items: [
        {
          title: '인사 / 조직 관리',
          children: [
            { title: '조직도 조회', path: '/teams/chart' },
            { title: '근태 현황', path: '/teams/attendance' },
          ],
        },
        { title: '전사 재무 회계 시스템', path: '/finance' },
      ],
    },
    {
      header: '인프라 운영 개발',
      items: [
        { title: '서버 자원 대시보드', path: '/infra/servers' },
        { title: 'CI/CD 배포 파이프라인', path: '/infra/deploy' },
      ],
    },
    {
      header: '시스템 환경 설정',
      items: [
        { title: '전사 권한 보안 정책', path: '/settings/policy' },
        { title: '연동 API 토큰 마스터', path: '/settings/tokens' },
      ],
    },
    {
      header: '고객 지원 데이터 센터',
      items: [
        { title: '통합 Q&A 문의 접수창', path: '/support/qna' },
        { title: '시스템 전체 장애 공지', path: '/support/notice' },
      ],
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubMenu(null);
      }
    }
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
          setActiveSubMenu(null);
        }}
        className={`group/trigger flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-gray-800 ${
          isMenuOpen ? 'bg-gray-100 text-blue-600 hover:text-blue-600' : 'hover:bg-gray-100'
        }`}
        title='전체 서비스 메뉴 개방'>
        <Menu className={`h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-90 text-blue-600' : ''}`} />
      </button>

      {isMenuOpen && (
        <div className='animate-in fade-in slide-in-from-top-1 absolute top-full left-0 z-50 mt-2 flex overflow-visible rounded-2xl border border-gray-200 bg-white shadow-2xl duration-150'>
          {/* ⬅️ [좌측 구역 고정] 전체 세로 높이를 독립적으로 100% 차지하는 최근 사용 메뉴 단 */}
          <div className='flex w-[220px] shrink-0 flex-col justify-between rounded-l-2xl border-r border-gray-100 bg-gray-50/70 p-5'>
            <div>
              <div className='mb-3 px-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase'>
                🕒 최근 사용한 메뉴
              </div>
              <div className='space-y-0.5'>
                {recentMenus.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className='block truncate rounded-lg border border-transparent px-3 py-2 text-left text-xs font-medium text-gray-600 transition-all hover:border-gray-100/80 hover:bg-white hover:text-blue-600 hover:shadow-sm'>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            <div className='mt-4 border-t border-gray-200/60 pt-3'>
              <a href='/all-menus' className='block px-1 text-left text-[11px] font-bold text-blue-600 hover:underline'>
                전체 디렉토리 조회 →
              </a>
            </div>
          </div>

          {/* ➡️ [우측 구역] 카테고리 메뉴 그룹 (그룹 개수가 늘어나 2줄 이상이 되어도 좌측 단 높이가 함께 확장됨) */}
          <div
            className={`grid max-h-130 gap-x-6 gap-y-8 overflow-y-auto p-5 transition-all duration-200 ${
              menuCategories.length === 1
                ? 'w-65 grid-cols-1'
                : menuCategories.length === 2
                  ? 'w-125 grid-cols-2'
                  : menuCategories.length === 3
                    ? 'w-185 grid-cols-3'
                    : 'w-245 grid-cols-4'
            }`}>
            {menuCategories.map((category, catIdx) => (
              <div key={catIdx} className='flex min-w-52.5 flex-col gap-2'>
                <div className='mb-1 flex items-center justify-between border-b border-blue-50 pb-1.5 text-[11px] font-bold tracking-wider text-blue-600 uppercase'>
                  <span>{category.header}</span>
                  <span className='py-0.2 rounded bg-gray-100 px-1 font-mono text-[9px] text-gray-400'>
                    {category.items.length}
                  </span>
                </div>
                <div className='space-y-0.5'>
                  {category.items.map((item, itemIdx) => {
                    const uniqueKey = `${catIdx}-${itemIdx}`;
                    const hasChildren = !!item.children;
                    return (
                      <div
                        key={itemIdx}
                        className='relative'
                        onMouseEnter={() => hasChildren && setActiveSubMenu(uniqueKey)}
                        onMouseLeave={() => hasChildren && setActiveSubMenu(null)}>
                        {hasChildren ? (
                          <button
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${activeSubMenu === uniqueKey ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                            <span className='truncate pr-2'>{item.title}</span>
                            <span className='shrink-0 text-[9px] text-gray-400'>▶</span>
                          </button>
                        ) : (
                          <a
                            href={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className='block truncate rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600'>
                            {item.title}
                          </a>
                        )}
                        {hasChildren && activeSubMenu === uniqueKey && (
                          <div className='animate-in fade-in slide-in-from-left-1 absolute top-0 left-full z-50 ml-1 w-48 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl duration-100'>
                            {item.children?.map((child, childIdx) => (
                              <a
                                key={childIdx}
                                href={child.path}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setActiveSubMenu(null);
                                }}
                                className='block truncate px-4 py-2 text-left text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600'>
                                {child.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
