import { Panel, usePanelRef } from 'react-resizable-panels';

import { LayoutDashboard, Files, Settings, Info, History, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';

import type { LeftTabType, RightTabType } from './RootLayout.tsx';

// --- [좌측 서브 패널 컴포넌트] ---
interface LeftProps {
  leftPanel: ReturnType<typeof usePanelRef>;
  leftTab: LeftTabType;
}

export function LeftSideBarComponent({ leftPanel, leftTab }: LeftProps) {
  return (
    <Panel
      panelRef={leftPanel}
      defaultSize={'20%'}
      minSize={'0%'}
      maxSize={'50%'}
      collapsible
      collapsedSize={0}
      // 배경색을 헤더와 동일한 bg-white로 설정
      className='flex h-full flex-col overflow-hidden border-r border-gray-200 bg-white'>
      <div className='flex h-12 shrink-0 items-center justify-between border-b border-gray-100 px-4'>
        <div className='flex items-center gap-2'>
          {leftTab === 'nav' ? (
            <LayoutDashboard className='h-3.5 w-3.5 text-blue-600' />
          ) : (
            <Files className='h-3.5 w-3.5 text-blue-600' />
          )}
          <span className='font-bold tracking-widest text-[px] text-gray-500 uppercase'>
            {leftTab === 'nav' ? 'Navigation' : 'Explorer'}
          </span>
        </div>
        <button
          onClick={() => leftPanel.current?.collapse()}
          className='rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'>
          <ChevronLeft className='h-4 w-4' />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto p-3 text-sm text-gray-600'>
        {leftTab === 'nav' ? (
          <ul className='space-y-1'>
            <li className='flex cursor-pointer items-center gap-2.5 rounded-lg bg-blue-50/50 p-2 font-semibold text-blue-600'>
              <LayoutDashboard className='h-4 w-4' />
              <span>Dashboard</span>
            </li>
            <li className='flex cursor-pointer items-center gap-2.5 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900'>
              <Settings className='h-4 w-4' />
              <span>Settings</span>
            </li>
          </ul>
        ) : (
          <div className='space-y-3 font-mono text-xs text-gray-500'>
            <div className='flex items-center gap-2 text-gray-700'>
              <FolderOpen className='h-4 w-4 text-amber-500' />
              <span>src/components</span>
            </div>
            <div className='flex items-center gap-2 pl-6'>
              <Files className='h-3.5 w-3.5' />
              <span className='text-gray-700'>RootLayout.tsx</span>
            </div>
            <div className='flex items-center gap-2 pl-6'>
              <Files className='h-3.5 w-3.5' />
              <span>SidePanels.tsx</span>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

// --- [우측 서브 패널 컴포넌트] ---
interface RightProps {
  rightPanel: ReturnType<typeof usePanelRef>;
  rightTab: RightTabType;
}

export function RightSideBarComponent({ rightPanel, rightTab }: RightProps) {
  return (
    <Panel
      panelRef={rightPanel}
      defaultSize={'20%'}
      minSize={'0%'}
      maxSize={'50%'}
      collapsible
      collapsedSize={0}
      // 배경색을 헤더와 동일한 bg-white로 설정
      className='flex h-full flex-col overflow-hidden border-l border-gray-200 bg-white'>
      <div className='flex h-12 shrink-0 items-center justify-between border-b border-gray-100 px-4'>
        <button
          onClick={() => rightPanel.current?.collapse()}
          className='rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'>
          <ChevronRight className='h-4 w-4' />
        </button>
        <div className='flex items-center gap-2'>
          <span className='font-bold tracking-widest text-[px] text-gray-500 uppercase'>
            {rightTab === 'info' ? 'Inspector' : 'Timeline'}
          </span>
          {rightTab === 'info' ? (
            <Info className='h-3.5 w-3.5 text-blue-600' />
          ) : (
            <History className='h-3.5 w-3.5 text-blue-600' />
          )}
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 text-xs text-gray-600'>
        {rightTab === 'info' ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-2 border-b border-gray-50 pb-2 font-bold text-gray-800'>
              <Info className='h-4 w-4 text-blue-500' />
              <span>Node Properties</span>
            </div>
            <div className='border-border bg-background text-foreground rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              background
            </div>
            <div className='text-secondary-foreground border-border bg-secondary rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              secondary secondary-foreground
            </div>
            <div className='text-accent-foreground border-border bg-accent rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              accent accent-foreground
            </div>
            <div className='text-foreground border-sub-border bg-sub-background rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              sub-background
            </div>
            <div className='text-secondary-foreground border-sub-border bg-sub-secondary rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              sub-secondary secondary-foreground
            </div>
            <div className='text-accent-foreground border-sub-border bg-sub-accent rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              sub-accent accent-foreground
            </div>
            <div className='text-muted-foreground border-sub-border bg-muted rounded-xl border p-3 leading-relaxed'>
              <span className='mb-1 block font-semibold text-gray-700'>Selected Element</span>
              muted muted-foreground
            </div>
          </div>
        ) : (
          <div className='space-y-3'>
            <div className='flex items-center gap-2 text-gray-400 italic'>
              <History className='h-3.5 w-3.5' />
              <span>No recent history found.</span>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
