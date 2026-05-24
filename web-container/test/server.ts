import { setupServer } from 'msw/node';

import { authHandlers } from '../src/features/mockHandlers.ts';

export const server = setupServer(...authHandlers);
