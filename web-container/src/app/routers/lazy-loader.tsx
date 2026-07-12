import React from 'react';

import type { ActionFunction, LoaderFunction } from 'react-router';

import NotFound from '@/pages/NotFound.tsx';

import { init, loadRemote } from '@module-federation/runtime';

interface Pages {
  [key: string]: {
    default: React.ComponentType<object>;
    Component?: React.ComponentType<object>;
    loader?: LoaderFunction;
    action?: ActionFunction;
    ErrorBoundary?: React.ComponentType<object>;
  };
}

const localModules: Pages = import.meta.glob('../../pages/**/*.tsx', { eager: true });

const initializedRemotes = new Set<string>();

export function createDynamicComponent(
  type: 'local' | 'remote',
  path: string,
  localPath: string | null,
  remoteUrl: string | null
) {
  return async () => {
    // ------------------------------------------
    // [CASE 1] 로컬 컴포넌트 처리
    // ------------------------------------------
    if (type === 'local') {
      if (!localPath) throw new Error(`Path(${path})의 local path 가 누락 되었습니다.`);

      const module = localModules[`../../${localPath}.tsx`];
      if (!module) {
        return { Component: NotFound }; // element가 아닌 Component 타입으로 반환
      }

      return {
        Component: module.Component || module.default, // 규격 통일
        loader: module?.loader as LoaderFunction | undefined,
        action: module?.action as ActionFunction | undefined,
        ErrorBoundary: module?.ErrorBoundary,
      };
    }

    // ------------------------------------------
    // [CASE 2] 리모트 컴포넌트 (Module Federation) 처리
    // ------------------------------------------
    if (!remoteUrl) throw new Error(`Path(${path})의 Remote URL 이 누락 되었습니다.`);

    if (!initializedRemotes.has(remoteUrl)) {
      init({
        name: 'hostApp',
        remotes: [
          {
            name: 'remoteContainer',
            entry: remoteUrl,
          },
        ],
      });
      initializedRemotes.add(remoteUrl);
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const module = await loadRemote<any>(`remoteContainer/${localPath}`);
      if (!module) throw new Error(`모듈을 찾을 수 없습니다: ${localPath}`);

      return {
        Component: module?.Component || module.default,
        loader: module?.loader,
        action: module?.action,
        ErrorBoundary: module?.ErrorBoundary,
      };
    } catch (error) {
      console.error('Module Federation 로드 실패:', error);
      return {
        Component: () => <div>리모트 컴포넌트 로드 실패</div>,
        ErrorBoundary: () => <div>크래시 핸들러</div>,
      };
    }
  };
}
