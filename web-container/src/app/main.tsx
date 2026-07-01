import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import '@app/styles/global.css';
import App from '@/app/App.tsx';

async function enableMocking() {
  if (!import.meta.env.VITE_APP_RUN_LOCAL) {
    return;
  }

  const { worker } = await import('../__tests__/mocks/browser.ts');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
