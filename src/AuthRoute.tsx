import useIsAuthenticated from '@hooks/useIsAuthenticated';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return <Navigate to="/landing/home" replace />;
  return <Outlet />;
}
