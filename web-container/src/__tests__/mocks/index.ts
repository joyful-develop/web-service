import { i18n } from './handlers/i18n.handlers.ts';
import { menuHandlers } from './handlers/menu.handlers.ts';
import { postHandlers } from './handlers/post.handlers.ts';
import { settingsHandlers } from './handlers/settings.handlers.ts';
import { todoHandlers } from './handlers/todo.handlers.ts';

export const handlers = [...i18n, ...menuHandlers, ...postHandlers, ...settingsHandlers, ...todoHandlers];
