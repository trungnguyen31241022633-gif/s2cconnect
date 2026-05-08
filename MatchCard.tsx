import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { SPORTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function formatDate(isoString: string) {
  const date = parseISO(isoString);
  if (isToday(date)) return `Hôm nay, ${format(date, 'HH:mm')}`;
  if (isTomorrow(date)) return `Ngày mai, ${format(date, 'HH:mm')}`;
  return format(date, 'dd/MM, HH:mm', { locale: vi });
}

export function MatchCard({ match, onClick }: { match: any, onClick: () => void }) {
  const sportMeta = SPORTS.find(s => s.name === match.sport);
  return (
    <div 
      onClick={onClick}
      className="bg-[#1E293B] border border-[#334155] rounded-3xl p-5 hover:bg-[#334155] transition-colors cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center justify-center w-12 h-12 bg-[#22C55E]/10 text-[#22C55E] rounded-2xl text-2xl">
          {sportMeta?.icon || '🏅'}
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
          match.purpose === 'Thi đấu' ? "bg-[#EF4444]/10 text-[#EF4444]" : "bg-[#FED7AA]/10 text-[#F97316]"
        )}>
          {match.purpose}
        </span>
      </div>

      <h3 className="font-bold text-[#F1F5F9] text-lg leading-tight mb-3">
        {match.sport} - Cần thêm {match.requiredPlayers - match.currentPlayers} người
      </h3>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-[#94A3B8] mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#475569]" />
          <span className="truncate">{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#475569]" />
          <span className="truncate">{match.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#475569]" />
          <span className="truncate">{match.currentPlayers}/{match.requiredPlayers} người</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-[#334155]">
        <Avatar className="w-6 h-6 border border-[#334155]">
          <AvatarFallback className="text-[10px] bg-[#334155] text-[#94A3B8]">{match.organizerNickname.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[#94A3B8] font-medium truncate flex-1">
          {match.organizerNickname}
        </span>
        <div className="flex items-center gap-1 text-xs font-semibold text-[#F97316]">
          <Star className="w-3 h-3 fill-current" />
          {match.organizerReputation}
        </div>
      </div>
    </div>
  );
}
