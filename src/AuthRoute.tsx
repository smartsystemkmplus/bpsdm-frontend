import useIsAuthenticated from '@hooks/useIsAuthenticated';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRoute() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return <Outlet />;
}
