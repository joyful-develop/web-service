import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router';

import { Rocket, MessageSquare, UserCog, Copyright, ExternalLink, ShieldAlert, Info } from 'lucide-react';

import { cn } from '@/shared/utils/shadcn/utils.ts';

export function Footer() {
  const [activePopover, setActivePopover] = useState<'release' | 'manager' | null>(null);

  const releaseRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<HTMLDivElement>(null);

  const togglePopover = (type: 'release' | 'manager') => {
    setActivePopover((prev) => (prev === type ? null : type));
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activePopover === 'release' && releaseRef.current && !releaseRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
      if (activePopover === 'manager' && managerRef.current && !managerRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activePopover]);

  return (
    <footer className='border-border bg-background text-foreground z-30 flex h-12 shrink-0 items-center justify-between border-t px-6 text-xs font-light shadow-sm select-none'>
      {/* 카피라이트 및 릴리즈 정보 */}
      <div className='flex items-center gap-4'>
        <div className='text-muted-foreground flex items-center gap-1.5'>
          <Copyright className='h-3.5 w-3.5' />
          <span>2026 Flexibility Operations Core</span>
        </div>

        {/* Release Note 팝오버 */}
        <div className='relative flex items-center' ref={releaseRef}>
          <button
            onClick={() => togglePopover('release')}
            className={cn(
              'hover:text-accent-foreground hover:bg-accent flex h-8 cursor-pointer items-center gap-1.5 rounded px-3 py-2 transition-colors'
            )}>
            <Rocket className='h-3.5 w-3.5' />
            <span>Version 4.0.0</span>
          </button>

          {/* 패치 정보 팝오버 패널 */}
          {activePopover === 'release' && (
            <div className='animate-in fade-in slide-in-from-bottom-1 absolute bottom-full left-0 z-50 mb-2 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl duration-200'>
              <div className='mb-2 flex items-center justify-between border-b pb-2'>
                <h4 className='flex items-center gap-2 text-sm font-bold text-gray-800'>
                  <Info className='h-4 w-4 text-blue-500' /> 최근 릴리즈 노트
                </h4>
              </div>
              <ul className='space-y-2 font-sans text-xs text-gray-600'>
                <li className='flex items-start gap-2 leading-relaxed'>
                  <span className='shrink-0 font-bold text-green-500'>Fix</span>
                  <p>상단 패널 접힘 시 내부 레이아웃 오버플로우 마스킹 처리 완료</p>
                </li>
                <li className='flex items-start gap-2 leading-relaxed'>
                  <span className='shrink-0 font-bold text-blue-500'>New</span>
                  <p>모든 푸터 아이콘 Lucide-react 벡터 라이브러리 교체 적용</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 우측 세션: 고객 소통 및 운영 정보 */}
      <div className='flex items-center gap-6 font-medium'>
        {/* 문의하기 (Q&A) */}
        <button
          className={cn(
            'group/qna hover:text-accent-foreground hover:bg-accent flex h-8 cursor-pointer items-center gap-1.5 rounded px-3 py-2 transition-colors'
          )}>
          <Link to='/support/qna' className='flex items-center gap-1.5'>
            <MessageSquare className='h-3.5 w-3.5' />
            <span>문의하기 (Q&A)</span>
          </Link>
        </button>

        {/* 운영 담당자 정보 팝오버 (클릭 방식) */}
        <div className='relative flex items-center' ref={managerRef}>
          <button
            onClick={() => togglePopover('manager')}
            className={cn(
              'group/qna hover:text-accent-foreground hover:bg-accent flex h-8 cursor-pointer items-center gap-1.5 rounded px-3 py-2 transition-colors'
            )}>
            <UserCog className='h-3.5 w-3.5' />
            <span>운영 담당자 정보</span>
          </button>

          {/* 담당자 연락망 팝오버 패널 */}
          {activePopover === 'manager' && (
            <div className='animate-in fade-in slide-in-from-bottom-1 absolute right-0 bottom-full z-50 mb-2 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl duration-200'>
              <h4 className='mb-3 flex items-center gap-2 border-b pb-2 text-sm font-bold text-gray-800'>
                <ShieldAlert className='h-4 w-4 text-amber-500' /> 시스템 장애 대응 안내
              </h4>
              <div className='space-y-2.5 text-xs text-gray-600'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-400'>인프라/장애 핫라인</span>
                  <span className='font-semibold text-gray-800'>이몽룡 선임 (1105)</span>
                </div>
                <div className='flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-gray-500'>
                  <ExternalLink className='mt-0.5 h-3 w-3 shrink-0' />
                  <p className='leading-normal'>
                    비상 상황 발생 시 사내 Slack <strong>#infra-alert</strong> 채널을 우선 확인해주세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
