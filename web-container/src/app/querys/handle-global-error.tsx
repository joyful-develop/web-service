import { redirect } from 'react-router';

import { globalNotifier } from '@/shared/store/useNotificationStore.tsx';
import { errorParser } from '@/shared/utils/error-parser.ts';

import { Query } from '@tanstack/react-query';

export const handleGlobalError = (error: Error, query: Query<unknown, unknown, unknown, readonly unknown[]>) => {
  const apiError = errorParser(error, query.meta?.customErrorMessage, query.meta?.customErrorDescription);

  if (apiError.status === 401) {
    return redirect('/login');
  }
  if (apiError.status === 403) {
    return redirect('/forbidden');
  }

  if (query.meta?.preventGlobalError) {
    return;
  }

  globalNotifier.error(apiError.message, apiError.description);
};
