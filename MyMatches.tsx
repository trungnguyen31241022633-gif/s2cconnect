import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { format, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight } from 'lucide-react';

export default function MyMatches() {
  const { matches, user } = useStore();
  const navigate = useNavigate();

  if (!user) return null;

  const myMatches = matches.filter(m => m.members.some(mem => mem.id === user.id));
  
  const upcoming = myMatches.filter(m => m.status === 'open' || m.status === 'full');
  const past = myMatches.filter(m => m.status === 'completed' || m.status === 'cancelled');

  return (
    <div className="bg-transparent min-h-screen relative w-full">
      <div className="bg-[#1E293B] px-6 py-6 rounded-2xl border border-[#334155] mb-6">
        <h1 className="text-2xl font-bold mb-4 text-[#F1F5F9]">Trận của tôi</h1>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0F172A] rounded-xl p-1 h-auto border border-[#334155]">
            <TabsTrigger value="upcoming" className="py-2.5 rounded-lg data-[state=active]:bg-[#334155] data-[state=active]:text-[#F1F5F9] data-[state=active]:font-bold text-[#94A3B8]">Sắp tới ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past" className="py-2.5 rounded-lg data-[state=active]:bg-[#334155] data-[state=active]:text-[#F1F5F9] data-[state=active]:font-bold text-[#94A3B8]">Đã kết thúc ({past.length})</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 pt-2 pb-6 relative z-10">
            <TabsContent value="upcoming" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0 outline-none">
              {upcoming.length === 0 ? (
                <EmptyState />
              ) : (
                upcoming.map(m => (
                  <MatchListItem key={m.id} match={m} onClick={() => navigate(`/match/${m.id}`)} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="past" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0 outline-none">
              {past.length === 0 ? (
                <EmptyState />
              ) : (
                past.map(m => (
                   <MatchListItem key={m.id} match={m} onClick={() => navigate(`/review/${m.id}`)} />
                ))
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4 text-[#94A3B8]">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E293B] border border-[#334155] mb-4">
        <Calendar className="h-8 w-8 text-[#475569]" />
      </div>
      <h3 className="font-semibold text-[#F1F5F9] mb-1">Chưa có trận nào</h3>
      <p className="text-sm">Hãy tìm trận đấu trên trang chủ để tham gia nhé.</p>
    </div>
  );
}

function MatchListItem({ match, onClick }: { match: any, onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-[#1E293B] border border-[#334155] rounded-3xl p-4 flex gap-4 items-center hover:bg-[#334155] transition-colors cursor-pointer">
       <div className="bg-[#FED7AA]/10 w-14 h-14 rounded-2xl flex flex-col justify-center items-center text-[#F97316] shrink-0 border border-[#F97316]/20">
         <span className="text-sm font-bold leading-none mb-1">{format(parseISO(match.date), 'dd')}</span>
         <span className="text-[10px] font-bold uppercase tracking-wider">{format(parseISO(match.date), 'MMM', { locale: vi })}</span>
       </div>
       <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-[#F1F5F9] truncate text-lg leading-tight">{match.sport}</h3>
            {match.status === 'full' && <Badge className="bg-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/30 border-none px-2 h-5 text-[10px] font-bold uppercase tracking-wider">ĐỦ NGƯỜI</Badge>}
          </div>
          <p className="text-sm text-[#94A3B8] truncate mb-1">{match.location}</p>
          <p className="text-xs text-[#475569] font-medium">{format(parseISO(match.date), 'HH:mm')} • {match.currentPlayers}/{match.requiredPlayers} người</p>
       </div>
       <ChevronRight className="text-[#334155] w-5 h-5 shrink-0" />
    </div>
  );
}
