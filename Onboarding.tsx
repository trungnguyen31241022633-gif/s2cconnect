import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { SPORTS, LOCATIONS, LEVELS, AVATARS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const TIME_PREFS = [
  { id: 'mon', label: 'Thứ 2' },
  { id: 'tue', label: 'Thứ 3' },
  { id: 'wed', label: 'Thứ 4' },
  { id: 'thu', label: 'Thứ 5' },
  { id: 'fri', label: 'Thứ 6' },
  { id: 'sat', label: 'Thứ 7' },
  { id: 'sun', label: 'Chủ nhật' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [sports, setSports] = useState<string[]>([]);
  const [timePref, setTimePref] = useState<string>('');
  const [locations, setLocations] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);

  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinish = () => {
    if (!nickname.trim()) {
      toast.error('Vui lòng nhập nickname');
      return;
    }
    setUser({
      id: 'u_me_' + Date.now(),
      email: 'student@st.ueh.edu.vn',
      nickname,
      avatar,
      sports,
      level,
      timePreference: timePref,
      locationPreference: locations,
      reputation: 10,
      matchesPlayed: 0,
      matchesOrganized: 0,
    });
    navigate('/', { replace: true });
  };

  const currentProgress = (step / 5) * 100;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0F172A] overflow-hidden relative">
      {/* Progress */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#1E293B] z-10">
        <motion.div 
          className="h-full bg-[#F97316]" 
          initial={{ width: 0 }} 
          animate={{ width: `${currentProgress}%` }} 
        />
      </div>

      {step > 1 && (
        <button onClick={prevStep} className="absolute top-4 left-4 p-2 text-[#94A3B8] hover:text-[#F1F5F9] z-20">
          Back
        </button>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-16 w-full max-w-2xl mx-auto scrollbar-hide relative z-10 text-[#F1F5F9]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-2 text-[#F1F5F9]">Bạn chơi môn thể thao nào?</h2>
              <p className="text-[#94A3B8] mb-8">Có thể chọn nhiều môn.</p>
              <div className="grid grid-cols-2 gap-3">
                {SPORTS.map((sport) => {
                  const isSelected = sports.includes(sport.id);
                  return (
                    <button
                      key={sport.id}
                      onClick={() => {
                        if (isSelected) setSports(sports.filter((id) => id !== sport.id));
                        else setSports([...sports, sport.id]);
                      }}
                      className={cn(
                        'flex flex-col items-center justify-center p-4 rounded-3xl border transition-all',
                        isSelected ? 'border-[#F97316] bg-[#FED7AA]/10 text-[#F97316]' : 'border-[#334155] bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8]'
                      )}
                    >
                      <span className="text-3xl mb-2">{sport.icon}</span>
                      <span className="font-medium text-sm">{sport.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button className="w-full h-12 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-bold disabled:opacity-50" onClick={nextStep} disabled={sports.length === 0}>Tiếp tục</Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-2 text-[#F1F5F9]">Bạn muốn chơi thể thao vào các thứ nào trong tuần?</h2>
              <p className="text-[#94A3B8] mb-8">Chọn các ngày bạn thường tham gia hoạt động thể thao.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIME_PREFS.map((time) => {
                  const isSelected = timePref.includes(time.id);
                  return (
                  <button
                    key={time.id}
                    onClick={() => {
                      let currentPrefs = timePref ? timePref.split(',') : [];
                      if (isSelected) currentPrefs = currentPrefs.filter(id => id !== time.id);
                      else currentPrefs.push(time.id);
                      setTimePref(currentPrefs.join(','));
                    }}
                    className={cn(
                      'p-4 rounded-3xl border text-center transition-all',
                      isSelected ? 'border-[#F97316] bg-[#FED7AA]/10 text-[#F97316]' : 'border-[#334155] bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9]'
                    )}
                  >
                    <span className="font-medium">{time.label}</span>
                  </button>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button className="w-full h-12 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-bold disabled:opacity-50" onClick={nextStep} disabled={!timePref}>Tiếp tục</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-2 text-[#F1F5F9]">Khu vực ưu tiên?</h2>
              <p className="text-[#94A3B8] mb-8">Bạn thường chơi ở đâu?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LOCATIONS.map((loc) => {
                  const isSelected = locations.includes(loc.id);
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        if (isSelected) setLocations(locations.filter((id) => id !== loc.id));
                        else setLocations([...locations, loc.id]);
                      }}
                      className={cn(
                        'p-4 rounded-3xl border text-left transition-all',
                        isSelected ? 'border-[#F97316] bg-[#FED7AA]/10 text-[#F97316]' : 'border-[#334155] bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9]'
                      )}
                    >
                      <span className="font-medium">{loc.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8">
                <Button className="w-full h-12 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-bold disabled:opacity-50" onClick={nextStep} disabled={locations.length === 0}>Tiếp tục</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-2 text-[#F1F5F9]">Trình độ của bạn?</h2>
              <p className="text-[#94A3B8] mb-8">Để tìm người phù hợp.</p>
              <div className="flex flex-col gap-3">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setLevel(lvl.id)}
                    className={cn(
                      'p-4 rounded-3xl border text-left transition-all',
                      level === lvl.id ? 'border-[#F97316] bg-[#FED7AA]/10 text-[#F97316]' : 'border-[#334155] bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155] hover:text-[#F1F5F9]'
                    )}
                  >
                    <span className="font-medium">{lvl.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8">
                <Button className="w-full h-12 rounded-full bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-bold disabled:opacity-50" onClick={nextStep} disabled={!level}>Tiếp tục</Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold mb-2 text-[#F1F5F9]">Hồ sơ ẩn danh</h2>
              <p className="text-[#94A3B8] mb-8">Tạo nhân vật của bạn. Không cần tên thật.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Chọn Avatar</label>
                <div className="flex flex-wrap gap-3">
                  {AVATARS.map((avUrl) => (
                    <button
                      key={avUrl}
                      onClick={() => setAvatar(avUrl)}
                      className={cn(
                        'w-16 h-16 rounded-full overflow-hidden border-2 transition-all bg-[#1E293B]',
                        avatar === avUrl ? 'border-[#F97316] ring-4 ring-[#FED7AA]/20' : 'border-[#334155]'
                      )}
                    >
                      <img src={avUrl} alt="avatar" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-[#94A3B8] mb-2">Nickname</label>
                <Input 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Ví dụ: Ronaldo Quận 10" 
                  className="h-12 rounded-xl bg-[#1E293B] border border-[#334155] text-[#F1F5F9] placeholder:text-[#475569] focus-visible:ring-[#F97316]"
                />
              </div>

              <div className="mt-8">
                <Button className="w-full h-12 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-[#F1F5F9] font-bold text-base transition-colors" onClick={handleFinish}>Vào S2C 🔥</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
