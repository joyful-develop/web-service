import { globalNotifier } from '@/shared/store/useMessageStore.tsx';

import { Query } from '@tanstack/react-query';

export const handleGlobalError = (error: Error, query: Query<unknown, unknown, unknown, readonly unknown[]>) => {
  if (query.meta?.preventGlobalError) {
    return;
  }

  globalNotifier.error(query.meta?.customErrorMessage, query.meta?.customErrorDescription, error);
};
