import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Compass, PlusCircle, CalendarDays, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TopNavbar() {
  const user = useStore(state => state.user);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', icon: Home, label: 'Trang chủ' },
    { to: '/explore', icon: Compass, label: 'Khám phá' },
    { to: '/create', icon: PlusCircle, label: 'Tạo trận' },
    { to: '/my-matches', icon: CalendarDays, label: 'Trận của tôi' },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 h-16 bg-[#1E293B] border-b border-[#334155] z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white font-bold text-xl">S</div>
        <span className="font-bold text-xl text-[#F1F5F9] hidden sm:block">SportConnect</span>
      </div>
      
      <div className="flex-1 flex justify-center h-full">
        <ul className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <li key={item.to} className="h-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 h-full px-3 sm:px-4 text-sm font-medium transition-colors border-b-2',
                    isActive ? 'text-[#F97316] border-[#F97316]' : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9] hover:bg-[#334155]/50'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden md:block">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 hover:bg-[#334155] py-1 px-2 rounded-xl transition-colors">
            <span className="hidden sm:block text-sm font-medium text-[#F1F5F9]">{user.nickname}</span>
            <Avatar className="w-8 h-8 border border-[#334155]">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-[#334155] text-[#F1F5F9]">{user.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
          </button>
        ) : (
          <button onClick={() => navigate('/welcome')} className="text-sm font-medium text-[#F97316]">Đăng nhập</button>
        )}
      </div>
    </nav>
  );
}
