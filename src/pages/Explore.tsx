import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { SPORTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MatchCard } from '@/components/MatchCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Explore() {
  const matches = useStore((state) => state.matches);
  const [filterSport, setFilterSport] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const upcomingMatches = [...matches]
    .filter(m => m.status === 'open')
    .filter(m => filterSport ? m.sport.toLowerCase() === filterSport : true)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="bg-transparent min-h-full">
      <div className="bg-[#1E293B] px-4 py-4 sticky top-0 z-20 border-b border-[#334155] rounded-b-2xl mb-4">
        <h1 className="text-xl font-bold text-[#F1F5F9] mb-4">Khám phá trận đấu</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <Input 
            placeholder="Tìm kiếm môn thể thao, địa điểm..."
            className="pl-10 h-12 bg-[#0F172A] border-[#334155] text-[#F1F5F9] rounded-xl focus-visible:ring-[#F97316]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilterSport(null)}
            className={cn(
              "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
              filterSport === null ? "bg-[#F1F5F9] text-[#0F172A] border-[#F1F5F9]" : "bg-[#1E293B] text-[#94A3B8] border-[#334155] hover:bg-[#334155]"
            )}
          >
            Tất cả
          </button>
          {SPORTS.map(sport => (
            <button
              key={sport.id}
              onClick={() => setFilterSport(sport.name.toLowerCase())}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border flex items-center gap-1",
                filterSport === sport.name.toLowerCase() ? "bg-[#FED7AA]/20 text-[#F97316] border-[#F97316]/30" : "bg-[#1E293B] text-[#94A3B8] border-[#334155] hover:bg-[#334155]"
              )}
            >
              <span>{sport.icon}</span>
              {sport.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {upcomingMatches.map(match => (
          <MatchCard key={match.id} match={match} onClick={() => navigate(`/match/${match.id}`)}/>
        ))}
        {upcomingMatches.length === 0 && (
           <div className="text-center py-12 px-4 text-[#94A3B8] col-span-full">
             <h3 className="font-semibold text-[#F1F5F9] mb-1">Không có trận nào</h3>
             <p className="text-sm border-none">Thử thay đổi bộ lọc hoặc tìm kiếm khác.</p>
           </div>
        )}
      </div>
    </div>
  );
}
