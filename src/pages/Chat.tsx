import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Send, ShieldAlert, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

type Message = {
  id: string;
  senderId: string;
  senderNickname: string;
  text: string;
  timestamp: string;
};

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { matches, user } = useStore();
  const match = matches.find(m => m.id === id);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg1',
      senderId: 'system',
      senderNickname: 'Hệ thống',
      text: 'Nhóm đã đủ người! Các bạn có thể trao đổi để chốt sân, giờ giấc, hoặc lấy contact Zalo/SĐT để tiện liên lạc.',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!match || !user) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, {
      id: 'msg' + Date.now(),
      senderId: user.id,
      senderNickname: user.nickname,
      text: inputText.trim(),
      timestamp: new Date().toISOString()
    }]);
    setInputText('');

    // Simulate reply
    if (messages.length === 1) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'msg' + Date.now(),
          senderId: match.organizerId,
          senderNickname: match.organizerNickname,
          text: 'Hello mọi người! Mình đã đặt sân số 2 nhé. Add Zalo 0123456789 mình gửi định vị.',
          timestamp: new Date().toISOString()
        }]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] w-full max-w-4xl mx-auto bg-[#0F172A] relative overflow-hidden border border-[#334155] rounded-xl mt-4">
      {/* Header */}
      <div className="bg-[#1E293B] border-b border-[#334155] px-4 py-3 flex items-center justify-between shrink-0 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-bold text-[#F1F5F9] leading-tight truncate w-48">{match.sport} - {match.location}</h1>
            <p className="text-xs text-[#94A3B8]">{match.currentPlayers} thành viên</p>
          </div>
        </div>
        <button className="text-[#94A3B8] hover:text-[#F1F5F9] p-1 transition-colors"><MoreVertical className="w-5 h-5"/></button>
      </div>

      <div className="bg-[#EAB308]/10 border-b border-[#EAB308]/20 p-2 flex items-center justify-center gap-2 text-xs text-[#EAB308] font-bold shrink-0 z-10">
         <ShieldAlert className="w-4 h-4" />
         Nhóm chat sẽ tự đóng sau khi trận kết thúc.
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        {messages.map(msg => {
          const isSystem = msg.senderId === 'system';
          const isMe = msg.senderId === user.id;

          if (isSystem) {
            return (
              <div key={msg.id} className="text-center my-4">
                <span className="inline-block bg-[#334155] text-[#94A3B8] border border-[#475569] text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                  {msg.text}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && (
                <Avatar className="w-8 h-8 shrink-0 bg-[#334155] border border-[#475569] shadow-sm">
                  <AvatarFallback className="text-xs font-bold text-[#F1F5F9] bg-transparent">{msg.senderNickname.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col max-w-[75%] ${isMe ? 'items-end' : 'items-start'}`}>
                {!isMe && <span className="text-[10px] text-[#94A3B8] font-bold tracking-wide ml-1 mb-0.5">{msg.senderNickname}</span>}
                <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                  isMe 
                    ? 'bg-[#F97316] text-[#F1F5F9] font-medium rounded-tr-sm' 
                    : 'bg-[#1E293B] border border-[#334155] rounded-tl-sm text-[#F1F5F9]'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-[#1E293B] border-t border-[#334155] p-3 pb-safe shrink-0 relative z-10">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhắn tin cho nhóm..."
            className="rounded-[1.25rem] bg-[#334155] border-[#475569] text-[#F1F5F9] placeholder:text-[#475569] outline-none focus-visible:ring-[#F97316] h-11 px-4"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 bg-[#F97316] text-[#F1F5F9] hover:bg-[#EA580C] rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 transition-transform active:scale-95 disabled:active:scale-100"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
