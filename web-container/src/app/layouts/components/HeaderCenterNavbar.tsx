import { useEffect, useRef, useState } from 'react';

interface CenterNavItem {
  title: string;
  path?: string;
  subMenus?: {
    groupTitle: string;
    links: { title: string; path: string; description?: string }[];
  }[];
}

// ==========================================
// 3. 헤더 중앙 계층형 네비게이션 컴포넌트 (실시간 URL 경로 감지 버전)
// ==========================================
export function HeaderCenterNavbar() {
  const [openNavIdx, setOpenNavIdx] = useState<number | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // 현재 브라우저의 실제 URL 패스(Path) 상태 관리
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  const navItems: CenterNavItem[] = [
    { title: '대시보드', path: '/dashboard' },
    {
      title: '프로젝트',
      subMenus: [
        {
          groupTitle: '활성 워크스페이스',
          links: [
            { title: 'Core 솔루션 개발', path: '/projects/core', description: 'Vite 인프라 아키텍처' },
            { title: 'Next 차세대 플랫폼', path: '/projects/next', description: '대용량 모듈 패키징 연구' },
          ],
        },
        {
          groupTitle: '관리 도구',
          links: [
            { title: '전사 칸반 대시보드', path: '/projects/kanban' },
            { title: '종료 보관소 (아카이브)', path: '/projects/archive' },
          ],
        },
      ],
    },
    {
      title: '조직 관리',
      subMenus: [
        {
          groupTitle: '인사 행정',
          links: [
            { title: '전사 조직도 연동', path: '/teams/chart' },
            { title: '근태 현황 추적기', path: '/teams/attendance' },
          ],
        },
      ],
    },
  ];

  // 바깥 클릭 시 메뉴 닫기 및 정기적인 경로 동기화 리스너
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenNavIdx(null);
      }
    }

    // 일반적인 <a> 태그 이동 시 경로 감지를 위한 네이티브 이벤트 핸들링 보완
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    if (openNavIdx !== null) document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [openNavIdx]);

  // 메뉴 클릭 시 상태 변경 및 경로 갱신용 공통 래퍼 함수
  const handleMenuClick = (path?: string) => {
    setOpenNavIdx(null);
    if (path) {
      setCurrentPath(path);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className='relative hidden items-center gap-1 rounded-xl border border-gray-200/60 bg-gray-50 p-1 lg:flex'>
      {navItems.map((item, idx) => {
        const hasSub = !!item.subMenus;
        const isOpen = openNavIdx === idx;

        // 🔥 하드코딩 대신 현재 브라우저 경로와 대치하여 정확하게 매핑합니다.
        // 자식 메뉴 중 하나라도 활성화되어 있다면 부모 대메뉴도 활성화 상태로 유추합니다.
        const isChildActive = item.subMenus?.some((sub) => sub.links.some((link) => link.path === currentPath));
        const isCurrentRoute = item.path === currentPath || isChildActive;

        // 통합 공통 CSS 디자인 토큰 클래스
        const commonButtonClass = `px-4 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all duration-150 ${
          isOpen || isCurrentRoute
            ? 'bg-white text-blue-600 shadow-sm border border-gray-200/50'
            : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
        }`;

        return (
          <div key={idx} className='relative'>
            {hasSub ? (
              <button
                onClick={() => setOpenNavIdx((prev) => (prev === idx ? null : idx))}
                className={commonButtonClass}>
                <span>{item.title}</span>
                <span
                  className={`text-[8px] text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}>
                  ▼
                </span>
              </button>
            ) : (
              <a href={item.path} onClick={() => handleMenuClick(item.path)} className={commonButtonClass}>
                {item.title}
              </a>
            )}

            {/* Depth 2 팝오버 렌더링 구역 */}
            {hasSub && isOpen && (
              <div className='animate-in fade-in slide-in-from-top-1 absolute top-full left-1/2 z-50 mt-1.5 flex min-w-[380px] -translate-x-1/2 gap-6 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xl duration-150'>
                {item.subMenus?.map((subGroup, gIdx) => (
                  <div key={gIdx} className='flex min-w-[160px] flex-col gap-2 text-left'>
                    <span className='mb-1 block border-b border-blue-50 pb-1 text-[10px] font-bold tracking-wider text-blue-600 uppercase'>
                      {subGroup.groupTitle}
                    </span>
                    <div className='space-y-0.5'>
                      {subGroup.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.path}
                          onClick={() => handleMenuClick(link.path)}
                          className={`group/link block rounded-lg p-2 transition-colors ${
                            currentPath === link.path ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                          }`}>
                          <div
                            className={`text-xs font-semibold transition-colors ${
                              currentPath === link.path
                                ? 'text-blue-600'
                                : 'text-gray-700 group-hover/link:text-blue-600'
                            }`}>
                            {link.title}
                          </div>
                          {link.description && (
                            <div className='mt-0.5 text-[10px] leading-tight font-medium text-gray-400'>
                              {link.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
