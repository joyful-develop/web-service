import { globalNotifier } from '@/shared/store/useMessageStore.tsx';

import { Mutation } from '@tanstack/react-query';

export const handleGlobalMutationError = (
  error: Error,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>
) => {
  if (mutation.meta?.preventGlobalError) {
    return;
  }

  globalNotifier.error(mutation.meta?.customErrorMessage, mutation.meta?.customErrorDescription, error);
};
