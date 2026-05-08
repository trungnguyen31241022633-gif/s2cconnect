import { NavLink } from 'react-router-dom';
import { Home, Compass, PlusCircle, CalendarDays, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Trang chủ' },
    { to: '/explore', icon: Compass, label: 'Khám phá' },
    { to: '/create', icon: PlusCircle, label: 'Tạo trận' },
    { to: '/my-matches', icon: CalendarDays, label: 'Trận của tôi' },
    { to: '/profile', icon: UserIcon, label: 'Hồ sơ' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#1E293B] border-t border-[#334155] h-16 px-4 flex items-center justify-between pb-safe z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center w-full h-full text-xs gap-1 transition-colors',
              isActive ? 'text-[#F97316] font-medium' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
