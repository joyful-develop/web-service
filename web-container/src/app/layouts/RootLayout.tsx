import { useState } from 'react';

import { Group, Separator, usePanelRef } from 'react-resizable-panels';

import {
  LayoutGrid, // 🧭 메뉴/네비게이션 용
  FolderRoot, // 📁 파일/익스플로러 용
  Info, // 📋 정보/인스펙터 용
  History, // ⏳ 기록/타임라인 용
} from 'lucide-react';

import { Footer } from '@/app/layouts/components/Footer.tsx';
import { Header } from '@/app/layouts/components/Header.tsx';
import { PageFilterBar } from '@/features/filterBar/PageFilterBar.tsx';

import { CenterGroupComponent } from './CenterGroupComponent.tsx';
import { LeftSideBarComponent, RightSideBarComponent } from './SidePanels.tsx';

export type LeftTabType = 'nav' | 'files';
export type RightTabType = 'info' | 'history';
export type TopTabType = 'filters' | 'stats';
export type BottomTabType = 'logs' | 'terminal';

export function RootLayout() {
  const leftPanel = usePanelRef();
  const rightPanel = usePanelRef();
  const topPanel = usePanelRef();
  const bottomPanel = usePanelRef();

  // 현재 선택된 메뉴/탭 상태 관리
  const [leftTab, setLeftTab] = useState<LeftTabType>('nav');
  const [rightTab, setRightTab] = useState<RightTabType>('info');
  const [topTab, setTopTab] = useState<TopTabType>('filters');
  const [bottomTab, setBottomTab] = useState<BottomTabType>('logs');

  // 아이콘바 전용 토글 핸들러 (이미 열려있고 같은 탭을 누르면 닫음, 다른 탭이면 내용 바꾸고 열기)
  const handleLeftBarClick = (target: LeftTabType) => {
    if (leftPanel.current) {
      if (!leftPanel.current.isCollapsed() && leftTab === target) {
        leftPanel.current.collapse();
      } else {
        setLeftTab(target);
        leftPanel.current.expand();
      }
    }
  };

  const handleRightBarClick = (target: RightTabType) => {
    if (rightPanel.current) {
      if (!rightPanel.current.isCollapsed() && rightTab === target) {
        rightPanel.current.collapse();
      } else {
        setRightTab(target);
        rightPanel.current.expand();
      }
    }
  };

  const currentParentId = 11;

  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden bg-gray-50 text-gray-800 select-none'>
      <Header />
      <PageFilterBar parentRawId={currentParentId} key={currentParentId} />

      {/* 메인 작업 영역: [좌측 바] + [가로 분할 패널 그룹] + [우측 바] */}
      <div className='relative flex w-full flex-1 overflow-hidden'>
        {/* [1] 좌측 최외곽 얇은 아이콘 바 */}
        <div className='z-10 flex w-12 shrink-0 flex-col items-center gap-4 border-r border-gray-200 bg-white py-4'>
          <button
            onClick={() => handleLeftBarClick('nav')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              leftTab === 'nav' && !leftPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
            title='Navigation'>
            <LayoutGrid className='h-5 w-5' />
          </button>
          <button
            onClick={() => handleLeftBarClick('files')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              leftTab === 'files' && !leftPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
            title='Files'>
            <FolderRoot className='h-5 w-5' />
          </button>
        </div>

        {/* [2] 크기 조절 핵심 분할 그룹 */}
        <div className='h-full flex-1 overflow-hidden'>
          <Group>
            {/* 좌측 서브 콘텐츠 패널 */}
            <LeftSideBarComponent leftPanel={leftPanel} leftTab={leftTab} />
            <Separator className='z-20 w-0.5 cursor-col-resize bg-gray-200 hover:bg-blue-500' />

            {/* 중앙 상/하/메인 패널 */}
            <CenterGroupComponent
              topPanel={topPanel}
              bottomPanel={bottomPanel}
              topTab={topTab}
              setTopTab={setTopTab}
              bottomTab={bottomTab}
              setBottomTab={setBottomTab}
            />

            <Separator className='z-20 w-0.5 cursor-col-resize bg-gray-200 hover:bg-blue-500' />
            {/* 우측 서브 콘텐츠 패널 */}
            <RightSideBarComponent rightPanel={rightPanel} rightTab={rightTab} />
          </Group>
        </div>

        {/* [3] 우측 최외곽 얇은 아이콘 바 */}
        <div className='z-10 flex w-12 shrink-0 flex-col items-center gap-4 border-l border-gray-200 bg-white py-4'>
          <button
            onClick={() => handleRightBarClick('info')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              rightTab === 'info' && !rightPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
            title='Inspector'>
            <Info className='h-5 w-5' />
          </button>
          <button
            onClick={() => handleRightBarClick('history')}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
              rightTab === 'history' && !rightPanel.current?.isCollapsed()
                ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
            title='Timeline'>
            <History className='h-5 w-5' />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
