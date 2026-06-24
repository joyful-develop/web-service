import { menuHandlers } from './__menu-handlers.ts';
import { settingsHandlers } from './__settings-handlers.ts';

export const handlers = [...menuHandlers, ...settingsHandlers];
