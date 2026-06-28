import { setupWorker } from 'msw/browser';

import { handlers } from './index.ts';

export const worker = setupWorker(...handlers);
