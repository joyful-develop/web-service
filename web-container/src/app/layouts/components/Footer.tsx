import { Rocket, MessageSquare, UserCog, Copyright, ExternalLink, ShieldAlert, Info } from 'lucide-react';

export function Footer() {
  return (
    <footer className='z-30 flex h-12 shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 text-xs text-gray-500 shadow-[_-px_px_rgba()]'>
      {/* 좌측 세션: 카피라이트 및 릴리즈 정보 */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1.5 text-gray-400'>
          <Copyright className='h-3.5 w-3.5' />
          <span className='font-medium'>2026 Flexibility Operations Core</span>
        </div>

        <div className='h-3 w-[px] bg-gray-200' />

        {/* Release Note 팝오버 */}
        <div className='group/release relative'>
          <div className='flex cursor-help items-center gap-1.5 font-semibold text-gray-600 transition-colors hover:text-blue-600'>
            <Rocket className='h-3.5 w-3.5' />
            <span>Version 4.0.0</span>
          </div>

          {/* 패치 정보 팝오버 패널 */}
          <div className='animate-in fade-in slide-in-from-bottom-1 absolute bottom-full left-0 z-50 mb-2 hidden w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl duration-200 group-hover/release:block'>
            <div className='mb-2 flex items-center justify-between border-b pb-2'>
              <h4 className='flex items-center gap-2 text-sm font-bold text-gray-800'>
                <Info className='h-4 w-4 text-blue-500' /> 최근 릴리즈 노트
              </h4>
            </div>
            <ul className='space-y-2 font-sans text-[px] text-gray-600'>
              <li className='flex gap-2 leading-relaxed'>
                <span className='shrink-0 font-bold text-green-500'>Fix</span>
                <p>상단 패널 접힘 시 내부 레이아웃 오버플로우 마스킹 처리 완료</p>
              </li>
              <li className='flex gap-2 leading-relaxed'>
                <span className='shrink-0 font-bold text-blue-500'>New</span>
                <p>모든 푸터 아이콘 Lucide-react 벡터 라이브러리 교체 적용</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 우측 세션: 고객 소통 및 운영 정보 */}
      <div className='flex items-center gap-6 font-medium'>
        {/* 문의하기 (Q&A) */}
        <a
          href='/support/qna'
          className='group/qna flex items-center gap-1.5 text-gray-600 transition-colors hover:text-blue-600'>
          <MessageSquare className='h-3.5 w-3.5 transition-transform group-hover/qna:scale-110' />
          <span>문의하기 (Q&A)</span>
        </a>

        <div className='h-3 w-[px] bg-gray-200' />

        {/* 운영 담당자 정보 팝오버 */}
        <div className='group/manager relative'>
          <div className='flex cursor-pointer items-center gap-1.5 text-gray-600 transition-colors hover:text-blue-600'>
            <UserCog className='h-3.5 w-3.5' />
            <span>운영 담당자 정보</span>
          </div>

          {/* 담당자 연락망 팝오버 패널 */}
          <div className='animate-in fade-in slide-in-from-bottom-1 absolute right-0 bottom-full z-50 mb-2 hidden w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl duration-200 group-hover/manager:block'>
            <h4 className='mb-3 flex items-center gap-2 border-b pb-2 text-sm font-bold text-gray-800'>
              <ShieldAlert className='h-4 w-4 text-amber-500' /> 시스템 장애 대응 안내
            </h4>
            <div className='space-y-2.5 text-[px] text-gray-600'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-400'>인프라/장애 핫라인</span>
                <span className='font-semibold text-gray-800'>이몽룡 선임 (1105)</span>
              </div>
              <div className='flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-[px] text-gray-500'>
                <ExternalLink className='mt-0.5 h-3 w-3 shrink-0' />
                <p>
                  비상 상황 발생 시 사내 Slack <strong>#infra-alert</strong> 채널을 우선 확인해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
