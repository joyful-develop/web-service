import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuthStore } from '@/features/user-auth/authStore';
import type { Permission } from '@/features/user-auth/user';

interface ProtectedRouteProps {
  requiredPermission?: Permission;
}

export function ProtectedRoute({ requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트 (현재 위치 저장)
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    // 권한이 없는 경우 403 페이지로 이동
    return <Navigate to='/403' replace />;
  }

  return <Outlet />;
}
