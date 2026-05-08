import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { SPORTS, LOCATIONS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export default function CreateMatch() {
  const navigate = useNavigate();
  const { user, addMatch } = useStore();
  
  const [step, setStep] = useState(1);
  
  // Form State
  const [sport, setSport] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [requiredPlayers, setRequiredPlayers] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('Giao lưu');
  const [notes, setNotes] = useState<string>('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if(!user) return;
    
    // Combine date and time
    const dateTimeIso = `${date}T${time}:00`;
    
    addMatch({
      id: 'm_' + Date.now(),
      sport,
      date: new Date(dateTimeIso).toISOString(),
      location,
      currentPlayers: 1,
      requiredPlayers: parseInt(requiredPlayers),
      purpose,
      notes,
      organizerId: user.id,
      organizerNickname: user.nickname,
      organizerReputation: user.reputation,
      members: [{ id: user.id, nickname: user.nickname, reputation: user.reputation }],
      status: 'open'
    });
    
    toast.success('Đã tạo trận thành công!');
    navigate('/');
  };

  return (
    <div className="bg-transparent min-h-screen relative flex flex-col w-full max-w-2xl mx-auto">
      <div className="bg-[#1E293B] flex items-center px-4 h-14 border-b border-[#334155] shrink-0 sticky top-0 z-10">
        <button onClick={() => step === 1 ? navigate('/') : prevStep()} className="p-2 -ml-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
          <X className="w-6 h-6" />
        </button>
        <span className="font-semibold mx-auto truncate pr-8 text-[#F1F5F9]">Tạo trận mới ({step}/2)</span>
      </div>

      <div className="p-4 flex-1 pb-24 space-y-6 relative z-10">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base text-[#F1F5F9]">Môn thể thao</Label>
              <Select onValueChange={setSport} value={sport}>
                <SelectTrigger className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus:ring-[#F97316]">
                  <SelectValue placeholder="Chọn môn" />
                </SelectTrigger>
                <SelectContent className="max-w-2xl h-64 bg-[#1E293B] border-[#334155] text-[#F1F5F9]">
                  {SPORTS.map(s => (
                    <SelectItem key={s.id} value={s.name} className="focus:bg-[#334155] focus:text-[#F1F5F9]">{s.icon} {s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-3">
                 <Label className="text-base text-[#F1F5F9]">Ngày</Label>
                 <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus-visible:ring-[#F97316]" />
               </div>
               <div className="space-y-3">
                 <Label className="text-base text-[#F1F5F9]">Giờ</Label>
                 <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus-visible:ring-[#F97316]" />
               </div>
             </div>

             <div className="space-y-3">
               <Label className="text-base text-[#F1F5F9]">Địa điểm</Label>
               <Select onValueChange={setLocation} value={location}>
                <SelectTrigger className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus:ring-[#F97316]">
                  <SelectValue placeholder="Chọn khu vực" />
                </SelectTrigger>
                <SelectContent className="max-w-2xl bg-[#1E293B] border-[#334155] text-[#F1F5F9]">
                  {LOCATIONS.map(s => (
                    <SelectItem key={s.id} value={s.name} className="focus:bg-[#334155] focus:text-[#F1F5F9]">{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <p className="text-xs text-[#EAB308] italic mt-1 font-medium bg-[#EAB308]/10 p-2 rounded inline-block">💡 Gợi ý: Có thể đặt sân đối tác qua app (Comming soon)</p>
             </div>
             
             <Button 
               className="w-full h-12 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-bold mt-6 text-base transition-colors" 
               disabled={!sport || !date || !time || !location}
               onClick={nextStep}
             >
               Tiếp tục
             </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base text-[#F1F5F9]">Tổng số người cần (bao gồm bạn)</Label>
              <Input type="number" min="2" max="20" placeholder="VD: 5" value={requiredPlayers} onChange={e => setRequiredPlayers(e.target.value)} className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus-visible:ring-[#F97316]" />
            </div>

            <div className="space-y-3">
              <Label className="text-base text-[#F1F5F9]">Mục đích trận đấu</Label>
              <RadioGroup value={purpose} onValueChange={setPurpose} className="gap-3">
                {['Giao lưu', 'Luyện tập', 'Thi đấu'].map(p => (
                   <div key={p} className="flex items-center space-x-2 border border-[#334155] bg-[#1E293B] p-3 rounded-xl hover:bg-[#334155] transition-colors">
                     <RadioGroupItem value={p} id={p} className="border-[#475569] text-[#F97316] [&_svg]:fill-[#F97316]" />
                     <Label htmlFor={p} className="flex-1 text-base font-normal text-[#F1F5F9]">{p}</Label>
                   </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base text-[#F1F5F9]">Ghi chú thêm (Tùy chọn)</Label>
              <Input placeholder="VD: Mọi người mang theo bóng nhé" value={notes} onChange={e => setNotes(e.target.value)} className="h-12 rounded-xl text-base bg-[#334155] border-[#475569] text-[#F1F5F9] focus-visible:ring-[#F97316] placeholder:text-[#475569]" />
            </div>

            <div className="bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-xl p-4 mt-6 text-sm text-[#EAB308]">
               Bài đăng sẽ chỉ hiển thị <b>Nickname</b> và <b>Điểm uy tín</b> của bạn. Mọi người không biết danh tính thật cho đến khi họ vào nhóm chat tạm thời.
            </div>

            <Button 
               className="w-full h-12 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-[#F1F5F9] text-base font-bold transition-transform active:scale-95" 
               disabled={!requiredPlayers}
               onClick={handleSubmit}
             >
               Đăng lên
             </Button>
          </div>
        )}
      </div>
    </div>
  );
}
