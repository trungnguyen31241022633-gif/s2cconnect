import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { SPORTS } from '@/lib/constants';
import { ArrowLeft, Calendar, MapPin, Users, Star, AlertTriangle, ShieldCheck } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { matches, user, joinMatch, leaveMatch } = useStore();
  
  const [showJoinDialog, setShowJoinDialog] = useState(false);

  const match = matches.find(m => m.id === id);
  if (!match || !user) return <div className="p-4 text-center mt-10">Không tìm thấy trận đấu.</div>;

  const sportMeta = SPORTS.find(s => s.name === match.sport);
  const isMember = match.members.some(m => m.id === user.id);
  const isOrganizer = match.organizerId === user.id;
  const isFull = match.currentPlayers >= match.requiredPlayers;

  const handleJoin = () => {
    joinMatch(match.id, { id: user.id, nickname: user.nickname, reputation: user.reputation });
    setShowJoinDialog(false);
    toast.success('Đã tham gia trận! Vào box chat để làm quen nhé!');
    
    if (match.currentPlayers + 1 === match.requiredPlayers) {
        toast.info('Nhóm đã đủ người!', { duration: 5000 });
    }
  };

  const handleLeave = () => {
    // Basic logic for mock
    leaveMatch(match.id, user.id);
    toast('Đã rút khỏi trận.');
  };

  return (
    <div className="bg-[#0F172A] min-h-screen pb-24 relative w-full max-w-4xl mx-auto mt-4 rounded-3xl overflow-hidden border border-[#334155]">
      {/* Header Image/Banner */}
      <div className="relative h-48 bg-[#1E293B] overflow-hidden flex justify-center items-center border-b border-[#334155]">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-[#334155]/50 backdrop-blur-md rounded-full flex items-center justify-center text-[#F1F5F9] z-10 hover:bg-[#334155] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-8xl opacity-10 absolute -bottom-4 right-4 rotate-12 select-none">
          {sportMeta?.icon}
        </div>
        <div className="text-[#F1F5F9] text-center z-10 px-4">
          <Badge variant="outline" className="text-[#F97316] border-[#F97316]/30 mb-2 bg-[#FED7AA]/10">{match.purpose}</Badge>
          <h1 className="text-2xl font-bold font-sans tracking-tight">{match.sport}</h1>
        </div>
      </div>

      <div className="px-4 py-6 -mt-6 bg-[#0F172A] rounded-t-3xl relative z-10 border-t border-[#334155] shadow-[0_-10px_20px_rgba(0,0,0,0.2)]">
        {/* Ad integration requested in details */}
        {isMember && (
          <div className="mb-6 bg-[#1E293B] border border-[#334155] rounded-2xl p-3 flex gap-3 relative">
            <Badge className="absolute -top-2 -right-2 text-[8px] h-4 px-1 bg-[#F97316]/20 text-[#F97316] tracking-widest uppercase border-0">Quảng cáo</Badge>
            <div className="w-12 h-12 bg-[#334155] rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center">
              <span className="text-2xl px-1">👟</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#F1F5F9] leading-tight">Sale 30% Giày Cầu lông</p>
              <p className="text-xs text-[#94A3B8] mt-0.5">Tại shop ABC gần CS B</p>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 p-4 bg-[#1E293B] border border-[#334155] rounded-2xl">
            <Calendar className="w-5 h-5 text-[#94A3B8] mt-0.5" />
            <div>
              <p className="font-medium text-[#F1F5F9]">{format(parseISO(match.date), 'EEEE, dd/MM/yyyy', { locale: vi })}</p>
              <p className="text-sm text-[#94A3B8]">{format(parseISO(match.date), 'HH:mm')} - Khoảng 2 tiếng</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#1E293B] border border-[#334155] rounded-2xl">
            <MapPin className="w-5 h-5 text-[#94A3B8] mt-0.5" />
            <div>
              <p className="font-medium text-[#F1F5F9]">{match.location}</p>
              <button className="text-sm text-[#F97316] font-bold mt-0.5">Xem bản đồ</button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-[#F1F5F9]">Danh sách tham gia</h3>
            <span className="text-sm font-medium text-[#94A3B8]">{match.currentPlayers} / {match.requiredPlayers}</span>
          </div>

          <div className="space-y-3">
            {match.members.map(member => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-[#1E293B] border border-[#334155] rounded-2xl">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-[#334155] bg-[#334155]">
                    <AvatarFallback className="text-[#F1F5F9] bg-transparent">{member.nickname.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-[#F1F5F9]">
                      {member.nickname} {member.id === match.organizerId && <span className="text-xs font-normal text-[#F97316]">(Host)</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#EAB308]/10 px-2 py-1 rounded-md text-[#EAB308] font-bold text-xs border border-[#EAB308]/20">
                  <Star className="w-3 h-3 fill-current" />
                  {member.reputation.toFixed(1)}
                </div>
              </div>
            ))}
            
            {Array.from({ length: match.requiredPlayers - match.currentPlayers }).map((_, i) => (
              <div key={`empty-${i}`} className="flex items-center gap-3 p-3 border border-dashed border-[#334155] rounded-2xl bg-[#1E293B]/50">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#475569] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#475569]" />
                </div>
                <p className="text-sm text-[#94A3B8] font-medium italic">Đang tìm bạn...</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-4 left-0 right-0 w-full p-4 bg-[#1E293B] border-t border-[#334155] z-20 rounded-b-3xl">
        {isMember ? (
          <div className="flex gap-2">
            <Button variant="outline" className="w-1/3 h-12 rounded-xl text-[#EF4444] border-[#EF4444]/30 bg-transparent hover:bg-[#EF4444]/10 hover:text-[#EF4444] transition-colors" onClick={handleLeave}>
              Rút khỏi
            </Button>
            <Button 
              className="w-2/3 h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] font-bold text-[#F1F5F9] transition-colors"
              onClick={() => navigate(`/chat/${match.id}`)}
            >
              Vào nhóm Chat
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] font-bold text-[#F1F5F9] text-lg transition-transform active:scale-95 disabled:opacity-50 disabled:bg-[#334155]"            onClick={() => setShowJoinDialog(true)}
            disabled={isFull}
          >
            {isFull ? 'Nhóm đã đầy' : 'Tham gia ngay'}
          </Button>
        )}
      </div>

      {/* Join Confirmation Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-[340px] rounded-[2rem] mx-auto top-[45%] bg-[#1E293B] border border-[#334155] text-[#F1F5F9]">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-[#EAB308]/10 text-[#EAB308] flex items-center justify-center rounded-2xl mb-2 border border-[#EAB308]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <DialogTitle className="text-center text-xl pb-1 text-[#F1F5F9]">Cam kết tham gia</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-[#94A3B8] space-y-3 py-2">
            <p>S2C sử dụng điểm uy tín để đảm bảo chất lượng trận đấu.</p>
            <ul className="space-y-2 text-[#94A3B8]">
              <li className="flex gap-2 items-start">
                 <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5"/>
                 <span>Bùng kèo không báo trước <b className="text-[#EF4444]">bị trừ 2 điểm</b>.</span>
              </li>
              <li className="flex gap-2 items-start">
                 <AlertTriangle className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5"/>
                 <span>Rút lui sát giờ chơi (dưới 2h) bị <b className="text-[#EAB308]">trừ 1 điểm</b>.</span>
              </li>
            </ul>
            <p className="text-center font-bold mt-4 text-[#F1F5F9]">Điểm uy tín hiện tại của bạn: <span className="text-[#22C55E]">⭐ {user.reputation}</span></p>
          </div>
          <DialogFooter className="flex-col gap-2 mt-2">
            <Button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-[#F1F5F9] font-bold rounded-xl h-12" onClick={handleJoin}>
              Đồng ý, tôi sẽ tham gia
            </Button>
            <Button variant="ghost" className="w-full text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#334155]" onClick={() => setShowJoinDialog(false)}>
              Suy nghĩ lại
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
