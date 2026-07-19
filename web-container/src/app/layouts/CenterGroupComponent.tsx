import { Group, Panel, Separator, usePanelRef } from 'react-resizable-panels';
import { Outlet } from 'react-router';

import { Filter, BarChart3, ScrollText, Terminal as TerminalIcon, ChevronUp, ChevronDown } from 'lucide-react';

import type { TopTabType, BottomTabType } from './RootLayout';

interface CenterProps {
  topPanel: ReturnType<typeof usePanelRef>;
  bottomPanel: ReturnType<typeof usePanelRef>;
  topTab: TopTabType;
  setTopTab: (tab: TopTabType) => void;
  bottomTab: BottomTabType;
  setBottomTab: (tab: BottomTabType) => void;
}

export function CenterGroupComponent({
  topPanel,
  bottomPanel,
  topTab,
  setTopTab,
  bottomTab,
  setBottomTab,
}: CenterProps) {
  // 상하단 패널 토글 및 탭 전환 핸들러 (RootLayout과 동일한 로직)
  const handleTopBarClick = (target: TopTabType) => {
    if (topPanel.current) {
      if (!topPanel.current.isCollapsed() && topTab === target) {
        topPanel.current.collapse();
      } else {
        setTopTab(target);
        topPanel.current.expand();
      }
    }
  };

  const handleBottomBarClick = (target: BottomTabType) => {
    if (bottomPanel.current) {
      if (!bottomPanel.current.isCollapsed() && bottomTab === target) {
        bottomPanel.current.collapse();
      } else {
        setBottomTab(target);
        bottomPanel.current.expand();
      }
    }
  };

  return (
    <Panel className='flex h-full flex-col overflow-hidden'>
      <Group orientation='vertical'>
        {/* [1] 상단 최외곽 얇은 아이콘 바 (Horizontal Activity Bar) */}
        <div className='z-10 flex h-10 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4'>
          <button
            onClick={() => handleTopBarClick('filters')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all ${
              topTab === 'filters' && !topPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
            <Filter className='h-3.5 w-3.5' />
            <span className='text-[10px] font-bold tracking-wider uppercase'>Filters</span>
          </button>
          <button
            onClick={() => handleTopBarClick('stats')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all ${
              topTab === 'stats' && !topPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
            <BarChart3 className='h-3.5 w-3.5' />
            <span className='text-[10px] font-bold tracking-wider uppercase'>Stats</span>
          </button>
          <div className='flex-1' /> {/* 스페이서 */}
          {/* 접기 전 전 전용 아이콘 */}
          {!topPanel.current?.isCollapsed() && (
            <button onClick={() => topPanel.current?.collapse()} className='text-gray-400 hover:text-gray-600'>
              <ChevronUp className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* 상단 서브 콘텐츠 패널 */}
        <Panel
          panelRef={topPanel}
          defaultSize={'20%'}
          minSize={'0%'}
          maxSize={'50%'}
          collapsible
          collapsedSize={0}
          className='overflow-hidden border-b border-gray-200 bg-white'>
          <div className='p-4 text-sm text-gray-600'>
            {topTab === 'filters' ? '필터 설정 영역입니다.' : '통계 요약 영역입니다.'}
          </div>
        </Panel>

        <Separator className='z-20 h-0.5 cursor-row-resize bg-gray-200 hover:bg-blue-500' />

        {/* [2] 중앙 메인 콘텐츠 영역 */}
        <Panel className='overflow-y-auto bg-gray-50'>
          <div className='mx-auto max-w-4xl p-6'>
            <Outlet />
          </div>
        </Panel>

        <Separator className='z-20 h-0.5 cursor-row-resize bg-gray-200 hover:bg-blue-500' />

        {/* 하단 서브 콘텐츠 패널 */}
        <Panel
          panelRef={bottomPanel}
          defaultSize={'20%'}
          minSize={'0%'}
          maxSize={'50%'}
          collapsible
          collapsedSize={0}
          className='overflow-hidden border-t border-gray-200 bg-white'>
          <div className='h-full overflow-y-auto bg-gray-900 p-3 font-mono text-xs text-gray-300'>
            {bottomTab === 'logs' ? '[INFO] 시스템 로그가 출력됩니다...' : 'workspace@root:~$ _'}
          </div>
        </Panel>

        {/* [3] 하단 최외곽 얇은 아이콘 바 (Horizontal Activity Bar) */}
        <div className='z-10 flex h-10 shrink-0 items-center gap-2 border-t border-gray-200 bg-white px-4'>
          <button
            onClick={() => handleBottomBarClick('logs')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all ${
              bottomTab === 'logs' && !bottomPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
            <ScrollText className='h-3.5 w-3.5' />
            <span className='text-[10px] font-bold tracking-wider uppercase'>Logs</span>
          </button>
          <button
            onClick={() => handleBottomBarClick('terminal')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1 transition-all ${
              bottomTab === 'terminal' && !bottomPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
            <TerminalIcon className='h-3.5 w-3.5' />
            <span className='text-[10px] font-bold tracking-wider uppercase'>Terminal</span>
          </button>

          <div className='flex-1' />

          {!bottomPanel.current?.isCollapsed() && (
            <button onClick={() => bottomPanel.current?.collapse()} className='text-gray-400 hover:text-gray-600'>
              <ChevronDown className='h-4 w-4' />
            </button>
          )}
        </div>
      </Group>
    </Panel>
  );
}
