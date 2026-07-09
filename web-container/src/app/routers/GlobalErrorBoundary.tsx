import { useRouteError, Navigate, useLocation } from 'react-router';

import ErrorBoundary from '@/shared/components/ErrorBoundary.tsx';
import { errorParser } from '@/shared/utils/error-parser.ts';

export default function GlobalErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();
  const apiError = errorParser(error);

  if (apiError.status === 401) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }
  if (apiError.status === 403) {
    return <Navigate to='/forbidden' replace />;
  }

  return (
    <ErrorBoundary
      message={apiError.message}
      description={apiError.description}
      isEnableRetry={true}
      isEnableGoToHome={true}
    />
  );
}
