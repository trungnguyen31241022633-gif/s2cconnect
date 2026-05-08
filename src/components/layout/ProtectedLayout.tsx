import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import TopNavbar from './TopNavbar';

export default function ProtectedLayout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] text-[#F1F5F9]">
      <TopNavbar />
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
