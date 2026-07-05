/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, loadRemote } from '@module-federation/runtime';

const localModules = import.meta.glob('../../pages/**/*.tsx');

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

      const importFunc = localModules[`../../${localPath}.tsx`];
      if (!importFunc) {
        const notFound = (await import('../../pages/NotFound.tsx')) as any;
        return { Component: notFound.Component || notFound.default };
      }

      const module = (await importFunc()) as any;

      return {
        // export function Component가 없으면 기본 export(default)를 사용
        Component: module?.Component || module.default,
        loader: module?.loader,
        action: module?.action,
        ErrorBoundary: module?.ErrorBoundary,
      };
    }

    // ------------------------------------------
    // [CASE 2] 리모트 컴포넌트 (Module Federation) 처리
    // ------------------------------------------
    if (!remoteUrl) throw new Error(`Path(${path})의 Remote URL 이 누락 되었습니다.`);

    init({
      name: 'hostApp',
      remotes: [
        {
          name: 'remoteContainer', // 고유 네임스페이스
          entry: remoteUrl,
        },
      ],
    });

    try {
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { lazy, type ComponentType } from 'react';

// import { init, loadRemote } from '@module-federation/runtime';

// // Vite 환경 기준 dynamic-import-vars 역할 (relative path 필수)
// const localModules = import.meta.glob('../../pages/**/*.tsx');

// export function createDynamicComponent(
//   type: 'local' | 'remote',
//   path: string,
//   localPath: string | null,
//   remoteUrl: string | null
// ) {
//   if (type === 'local') {
//     if (!localPath) throw new Error(`Path(${path})의 local path 가 누락 되었습니다.`);

//     const importFunc = localModules[`../../${localPath}.tsx`];
//     if (!importFunc) {
//       return lazy(() => import('../../pages/NotFound.tsx'));
//     }
//     return lazy(importFunc as () => Promise<{ default: ComponentType<any> }>);
//   }

//   // Remote 컴포넌트 로딩 (@module-federation/runtime)
//   return lazy(async () => {
//     if (!remoteUrl) throw new Error(`Path(${path})의 Remote URL 이 누락 되었습니다`);

//     // 1. 런타임에 리모트 컨테이너 초기화 및 등록
//     init({
//       name: 'hostApp',
//       remotes: [
//         {
//           name: 'remoteContainer', // 고유 네임스페이스
//           entry: remoteUrl,
//         },
//       ],
//     });

//     // 2. 리모트 앱에서 모듈 로드 (포맷: 'containerName/exposedModule')
//     try {
//       const module = await loadRemote<{ default: ComponentType<any> }>(`remoteContainer/${localPath}`);
//       if (!module) throw new Error(`모듈을 찾을 수 없습니다: ${localPath}`);
//       return { default: module.default };
//     } catch (error) {
//       console.error('Module Federation 로드 실패:', error);
//       return { default: () => <div>리모트 컴포넌트를 불러오는 중 오류가 발생했습니다.</div> };
//     }
//   });
// }
