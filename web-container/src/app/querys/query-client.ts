import { handleGlobalError } from '@/app/querys/handle-global-error.tsx';
import { handleGlobalMutationSuccess } from '@/app/querys/handle-global-mutation-success.tsx';
import { handleGlobalMutationError } from '@/app/querys/handle-global-mutation.tsx';

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalMutationError,
  }),
  defaultOptions: {
    queries: {
      throwOnError: false,
      retry: false,
    },
    mutations: {
      throwOnError: false,
    },
  },
});

export const mutationCache = queryClient.getMutationCache();
mutationCache.config.onSuccess = (data, variables, context, mutation) => {
  handleGlobalMutationSuccess(data, variables, context, mutation, queryClient);
};
