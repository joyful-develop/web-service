import { redirect } from 'react-router';

import { globalNotifier } from '@/shared/store/useNotificationStore.tsx';
import { errorParser } from '@/shared/utils/error-parser.ts';

import { Mutation } from '@tanstack/react-query';

export const handleGlobalMutationError = (
  error: Error,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  const apiError = errorParser(error, mutation.meta?.customErrorMessage, mutation.meta?.customErrorDescription);

  if (apiError.status === 401) {
    return redirect('/login');
  }
  if (apiError.status === 403) {
    return redirect('/forbidden');
  }

  if (mutation.meta?.preventGlobalError) {
    return;
  }

  globalNotifier.error(apiError.message, apiError.description);
};
