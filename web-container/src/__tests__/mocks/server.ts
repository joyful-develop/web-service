import { setupServer } from 'msw/node';

import { handlers } from './index.ts';

export const server = setupServer(...handlers);
