import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Plus, MessageCircle, Share2, ArrowRight } from 'lucide-react';
import { SPORTS } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MatchCard } from '@/components/MatchCard';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function Home() {
  const matches = useStore((state) => state.matches);
  const user = useStore((state) => state.user);
  
  const navigate = useNavigate();

  if (!user) return null;

  // Upcoming matches where I am a participant
  const myUpcomingMatches = matches.filter(m => 
    m.members.some(mem => mem.id === user.id) && 
    (m.status === 'open' || m.status === 'full')
  ).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const nextMatch = myUpcomingMatches[0];

  // Matches I organized that are waiting for players
  const myPendingMatches = matches.filter(m => 
    m.organizerId === user.id && 
    m.status === 'open'
  ).sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  // Suggestions for me
  const suggestions = matches.filter(m => 
    m.status === 'open' && 
    !m.members.some(mem => mem.id === user.id) &&
    user.sports.includes(SPORTS.find(s => s.name === m.sport)?.id || '')
  ).slice(0, 3);

  return (
    <div className="bg-transparent min-h-full pb-24">
      {/* Personalized Greeting */}
      <div className="bg-[#1E293B] px-6 py-6 sticky top-0 z-20 border-b border-[#334155] rounded-b-2xl shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#94A3B8] font-medium uppercase tracking-wider mb-1">Xin chào,</p>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-[#F1F5F9]">
              {user.nickname}
            </h1>
            <Badge variant="secondary" className="bg-[#FED7AA]/10 text-[#F97316] border border-[#F97316]/20 font-bold text-xs mt-2 px-2 py-1">
              ⭐ {user.reputation.toFixed(1)} Uy tín
            </Badge>
          </div>
          <Avatar className="w-16 h-16 border-2 border-[#334155] shadow-sm cursor-pointer hover:opacity-90 transition-opacity" onClick={() => navigate('/profile')}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-[#334155] text-[#F1F5F9] text-xl">{user.nickname.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-0">
        {/* Next upcoming match */}
        {nextMatch && (
          <section>
            <h2 className="text-lg font-bold text-[#F1F5F9] mb-3">🔥 Trận sắp diễn ra của bạn</h2>
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#334155] rounded-3xl p-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/5 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <Badge className="bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                  Diễn ra trong {formatDistanceToNow(parseISO(nextMatch.date), { locale: vi })}
                </Badge>
                <div className="text-xs text-[#94A3B8] font-medium">{nextMatch.currentPlayers}/{nextMatch.requiredPlayers} người</div>
              </div>
              
              <h3 className="text-xl font-bold text-[#F1F5F9] mb-1 relative z-10">{nextMatch.sport}</h3>
              <p className="text-[#94A3B8] text-sm mb-4 relative z-10 truncate">{nextMatch.location}</p>
              
              <div className="flex gap-2 relative z-10">
                <Button className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl h-10" onClick={() => navigate(`/chat/${nextMatch.id}`)}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Vào chat nhóm
                </Button>
                <Button variant="outline" className="bg-[#334155] hover:bg-[#475569] text-white border-none rounded-xl h-10" onClick={() => navigate(`/match/${nextMatch.id}`)}>
                  Chi tiết
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* My Pending Matches */}
        {myPendingMatches.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-[#F1F5F9] mb-3">⏳ Trận đang chờ đủ người</h2>
            <div className="space-y-3">
              {myPendingMatches.map(match => (
                <div key={match.id} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#334155]/50 transition-colors" onClick={() => navigate(`/match/${match.id}`)}>
                  <div>
                    <h3 className="font-bold text-[#F1F5F9] text-sm mb-1">{match.sport}</h3>
                    <p className="text-xs text-[#94A3B8]">
                      {match.currentPlayers}/{match.requiredPlayers} người · Còn cần {match.requiredPlayers - match.currentPlayers}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-[#334155]/50 hover:bg-[#334155] border-[#475569] text-[#F1F5F9] rounded-lg h-8" onClick={(e) => { e.stopPropagation(); /* mock share */ }}>
                    <Share2 className="w-3 h-3 mr-1" />
                    Chia sẻ
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Suggestions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-[#F1F5F9]">🎯 Gợi ý cho bạn</h2>
            <Button variant="ghost" size="sm" className="text-[#F97316] hover:bg-[#F97316]/10 px-2" onClick={() => navigate('/explore')}>
              Xem thêm <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map(match => (
                <MatchCard key={match.id} match={match} onClick={() => navigate(`/match/${match.id}`)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-[#1E293B] border border-[#334155] rounded-3xl">
              <p className="text-[#94A3B8] text-sm">Chưa có gợi ý phù hợp vào lúc này.</p>
            </div>
          )}
        </section>
      </div>

      {/* Floating Create Button */}
      <button 
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 flex items-center gap-2 bg-[#F97316] shadow-lg rounded-full text-[#F1F5F9] hover:bg-[#EA580C] hover:scale-105 active:scale-95 transition-all z-50 px-5 py-3 font-bold"
        onClick={() => navigate('/create')}
      >
        <Plus className="w-5 h-5" />
        Tạo trận mới
      </button>
    </div>
  );
}
