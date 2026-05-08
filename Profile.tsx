import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Settings, LogOut, Star, Edit3 } from 'lucide-react';
import { SPORTS } from '@/lib/constants';

export default function Profile() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="bg-[#0F172A] min-h-screen relative">
       <div className="bg-[#1E293B] p-6 border-b border-[#334155] flex flex-col items-center pt-10 rounded-b-3xl relative z-10">
         <div className="relative mb-4">
           <Avatar className="w-24 h-24 border-4 border-[#334155] bg-[#334155]">
             <AvatarImage src={user.avatar} />
             <AvatarFallback className="text-3xl bg-transparent text-[#F1F5F9]">{user.nickname.charAt(0)}</AvatarFallback>
           </Avatar>
           <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F97316] hover:bg-[#EA580C] rounded-full flex items-center justify-center text-[#F1F5F9] border-2 border-[#1E293B] shadow-sm transition-colors">
             <Edit3 className="w-4 h-4" />
           </button>
         </div>
         
         <h1 className="text-2xl font-bold text-[#F1F5F9] mb-1">{user.nickname}</h1>
         
         <div className="flex items-center gap-2 mt-2">
           <Badge className="bg-[#FED7AA]/10 py-1 px-3 text-[#F97316] border border-[#F97316]/20 font-bold text-sm">
             <Star className="w-4 h-4 fill-current mr-1 -mt-0.5" />
             {user.reputation.toFixed(1)} Uy tín
           </Badge>
         </div>

         <div className="flex gap-4 mt-6 w-full text-center divide-x divide-[#334155] border-t border-[#334155] pt-6">
           <div className="flex-1">
             <p className="text-2xl font-bold text-[#F1F5F9]">{user.matchesPlayed}</p>
             <p className="text-[10px] text-[#94A3B8] uppercase font-bold mt-1 tracking-widest">Đã tham gia</p>
           </div>
           <div className="flex-1">
             <p className="text-2xl font-bold text-[#F1F5F9]">{user.matchesOrganized}</p>
             <p className="text-[10px] text-[#94A3B8] uppercase font-bold mt-1 tracking-widest">Đã tổ chức</p>
           </div>
         </div>
       </div>

       <div className="p-4 space-y-4 relative z-10">
          <div className="bg-[#1E293B] rounded-3xl p-5 border border-[#334155] shadow-sm">
             <h3 className="font-semibold text-[#F1F5F9] mb-3 flex items-center gap-2">
               <BarChart3 className="w-5 h-5 text-[#94A3B8]" />
               Môn thể thao
             </h3>
             <div className="flex flex-wrap gap-2">
               {user.sports.map(s => {
                 const m = SPORTS.find(sp => sp.id === s);
                 return (
                   <span key={s} className="px-3 py-1.5 bg-[#334155] border border-[#475569] rounded-lg text-sm font-medium text-[#F1F5F9] flex items-center gap-1">
                     {m?.icon} {m?.name}
                   </span>
                 )
               })}
             </div>
             
             <div className="mt-4 pt-4 border-t border-[#334155]">
               <p className="text-sm text-[#94A3B8] mb-1">Trình độ tự đánh giá</p>
               <p className="font-medium text-[#F1F5F9]">
                {user.level === 'beginner' ? 'Mới bắt đầu' : 
                 user.level === 'intermediate' ? 'Trung bình' : 
                 user.level === 'advanced' ? 'Khá' : 
                 user.level === 'professional' ? 'Chuyên nghiệp' : 'Chưa cập nhật'}
               </p>
             </div>
          </div>

          <div className="bg-[#1E293B] rounded-3xl border border-[#334155] shadow-sm overflow-hidden">
            <button className="w-full p-4 flex items-center gap-3 text-left border-b border-[#334155] hover:bg-[#334155] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#94A3B8]" />
              </div>
              <span className="font-semibold text-[#F1F5F9]">Cài đặt tài khoản</span>
            </button>
            <button 
              className="w-full p-4 flex items-center gap-3 text-left hover:bg-[#334155] transition-colors text-[#EF4444]"
              onClick={() => {
                setUser(null);
                navigate('/welcome');
              }}
            >
              <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-[#EF4444]" />
              </div>
              <span className="font-semibold">Đăng xuất</span>
            </button>
          </div>
       </div>
    </div>
  );
}
