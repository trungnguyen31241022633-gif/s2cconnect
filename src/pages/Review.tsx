import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export default function Review() {
  const navigate = useNavigate();

  const handleFinish = () => {
    toast.success('Cảm ơn bạn đã đánh giá!');
    navigate('/');
  };

  return (
    <div className="bg-[#0F172A] min-h-screen p-6 flex flex-col items-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-[#F97316]/10 text-[#F97316] rounded-full flex items-center justify-center mb-6 mt-12 border border-[#F97316]/30">
          <Star className="w-8 h-8 fill-current" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#F1F5F9] mb-2">Đánh giá trận đấu</h1>
        <p className="text-[#94A3B8] text-center mb-8">Trận Bóng đá ở Sân Chảo Lửa đã kết thúc. Bạn hãy đánh giá nhé!</p>

      <div className="w-full space-y-4 mb-8">
        <div className="bg-[#1E293B] p-4 rounded-3xl border border-[#334155]">
          <p className="font-semibold text-[#F1F5F9] mb-3">Buổi chơi có diễn ra không?</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-[#334155] border-[#475569] text-[#F1F5F9] hover:bg-[#475569]">Có diễn ra</Button>
            <Button variant="outline" className="flex-1 bg-[#334155] border-[#475569] text-[#F1F5F9] hover:bg-[#475569]">Bị hủy</Button>
          </div>
        </div>

        <div className="bg-[#1E293B] p-4 rounded-3xl border border-[#334155]">
          <p className="font-semibold text-[#F1F5F9] mb-1">Mọi người có đến đầy đủ không?</p>
          <p className="text-xs text-[#94A3B8] mb-3">Người vắng mặt không báo trước sẽ bị trừ điểm uy tín.</p>
          <div className="space-y-2">
             <div className="flex items-center justify-between bg-[#0F172A] p-3 border border-[#334155] rounded-2xl">
               <span className="font-medium text-sm text-[#F1F5F9]">Thích Đá Ngôn</span>
               <div className="flex gap-2">
                 <button className="text-xs px-2 py-1 bg-[#22C55E]/10 text-[#22C55E] font-bold rounded-lg border border-[#22C55E]/20">Đến</button>
                 <button className="text-xs px-2 py-1 bg-[#334155] text-[#94A3B8] font-semibold rounded-lg hover:bg-[#475569]">Vắng</button>
               </div>
             </div>
             <div className="flex items-center justify-between bg-[#0F172A] p-3 border border-[#334155] rounded-2xl">
               <span className="font-medium text-sm text-[#F1F5F9]">Chân Gỗ (Bạn)</span>
               <div className="flex gap-2">
                 <span className="text-xs font-bold text-[#22C55E]">Đã đến</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="mb-8 w-full bg-[#1E293B] border border-[#334155] rounded-3xl p-3 flex gap-3 relative">
        <div className="absolute -top-2 -right-2 bg-[#F97316]/20 text-[#F97316] text-[10px] px-1.5 uppercase tracking-wider font-bold rounded">Quảng cáo</div>
        <div className="w-12 h-12 bg-[#334155] rounded-xl flex items-center justify-center shrink-0">
           <span className="text-2xl">🥤</span>
        </div>
        <div>
          <p className="text-sm font-bold text-[#F1F5F9] leading-tight">Revive</p>
          <p className="text-xs text-[#94A3B8] mt-0.5">Khôi phục 100% sức lực ngay lập tức.</p>
        </div>
      </div>

      <Button className="w-full h-12 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-[#F1F5F9] font-bold text-base transition-transform active:scale-95" onClick={handleFinish}>
        Hoàn tất đánh giá
      </Button>
      <button className="mt-4 text-sm text-[#94A3B8] hover:text-[#F1F5F9] font-medium transition-colors" onClick={() => navigate('/')}>
        Bỏ qua (Để sau)
      </button>
      </div>
    </div>
  );
}
