// import { StrictMode } from 'react';

// import { createRoot } from 'react-dom/client';

// import App from '@/app/App.tsx';
// import '@/app/styles/global.css';

// import { init } from '@module-federation/enhanced/runtime';

// async function enableMocking() {
//   if (!import.meta.env.VITE_APP_RUN_LOCAL) {
//     return;
//   }

//   const { worker } = await import('../__tests__/mocks/browser.ts');

//   return worker.start({
//     onUnhandledRequest: 'bypass',
//   });
// }

// // 1. 실무에서 DB/API로 가져오는 리모트 인프라 정보
// const remoteModulesFromDB = [
//   { name: 'remoteUserModule', entry: 'http://localhost:5001/mf-manifest.json' },
//   { name: 'remoteLogModule', entry: 'http://localhost:5002/mf-manifest.json' },
// ];

// // 2. 10분 주기 분기형 캐시 버스팅 처리
// function getCacheBustUrl(originalUrl: string): string {
//   const url = new URL(originalUrl);
//   const tenMinutesChunk = Math.floor(new Date().getTime() / 600000);
//   url.searchParams.set('cb', tenMinutesChunk.toString());
//   return url.toString();
// }

// // 3. 모듈 페더레이션 2.0 엔진 초기화 실행 (any 배제)
// init({
//   name: 'host-admin',
//   remotes: remoteModulesFromDB.map((remote) => ({
//     name: remote.name,
//     alias: remote.name,
//     type: 'module' as const,
//     entry: getCacheBustUrl(remote.entry),
//   })),
// });

// enableMocking().then(() => {
//   createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// });
