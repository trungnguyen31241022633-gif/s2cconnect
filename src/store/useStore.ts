import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  sports: string[];
  level: string;
  timePreference: string;
  locationPreference: string[];
  reputation: number;
  matchesPlayed: number;
  matchesOrganized: number;
};

export type MatchMember = {
  id: string;
  nickname: string;
  reputation: number;
};

export type Match = {
  id: string;
  sport: string;
  date: string; // ISO date string
  location: string;
  currentPlayers: number;
  requiredPlayers: number;
  purpose: string; // Giao lưu, Luyện tập, Thi đấu
  notes?: string;
  organizerId: string;
  organizerNickname: string;
  organizerReputation: number;
  members: MatchMember[];
  status: 'open' | 'full' | 'completed' | 'cancelled';
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
  createdAt: string;
};

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  isAuthenticated: boolean;
  matches: Match[];
  addMatch: (match: Match) => void;
  joinMatch: (matchId: string, member: MatchMember) => void;
  leaveMatch: (matchId: string, userId: string) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
}

const mockMatches: Match[] = [
  {
    id: 'm1',
    sport: 'Bóng đá',
    date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
    location: 'Sân Chảo Lửa, Tân Bình',
    currentPlayers: 8,
    requiredPlayers: 10,
    purpose: 'Giao lưu',
    organizerId: 'u2',
    organizerNickname: 'Thích Đá Ngôn',
    organizerReputation: 9.5,
    members: [
      { id: 'u2', nickname: 'Thích Đá Ngôn', reputation: 9.5 },
      { id: 'u3', nickname: 'Chân Gỗ', reputation: 8.0 },
    ],
    status: 'open',
  },
  {
    id: 'm2',
    sport: 'Bóng rổ',
    date: new Date(Date.now() + 3600000 * 5).toISOString(), // 5 hours later
    location: 'Sân UEH Nguyễn Văn Linh',
    currentPlayers: 4,
    requiredPlayers: 6,
    purpose: 'Luyện tập',
    organizerId: 'u4',
    organizerNickname: 'Kobe NVC',
    organizerReputation: 10,
    members: [{ id: 'u4', nickname: 'Kobe NVC', reputation: 10 }],
    status: 'open',
  },
    {
    id: 'm3',
    sport: 'Cầu lông',
    date: new Date(Date.now() + 3600000 * 24 * 2).toISOString(), // 2 days later
    location: 'Sân Kỳ Hòa',
    currentPlayers: 3,
    requiredPlayers: 4,
    purpose: 'Đánh đôi Nam/Nữ',
    organizerId: 'u5',
    organizerNickname: 'Lông Thủ',
    organizerReputation: 9.0,
    members: [{ id: 'u5', nickname: 'Lông Thủ', reputation: 9.0 }],
    status: 'open',
  }
];

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  matches: mockMatches,
  notifications: [],
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
  addMatch: (match) => set((state) => ({ matches: [match, ...state.matches] })),
  joinMatch: (matchId, member) =>
    set((state) => ({
      matches: state.matches.map((m) => {
        if (m.id === matchId) {
          const newMembers = [...m.members, member];
          return {
            ...m,
            members: newMembers,
            currentPlayers: newMembers.length,
            status: newMembers.length >= m.requiredPlayers ? 'full' : 'open',
          };
        }
        return m;
      }),
    })),
  leaveMatch: (matchId, userId) =>
    set((state) => ({
      matches: state.matches.map((m) => {
        if (m.id === matchId) {
          const newMembers = m.members.filter((mem) => mem.id !== userId);
          return {
             ...m, 
             members: newMembers,
             currentPlayers: newMembers.length,
             status: 'open' 
          };
        }
        return m;
      }),
    })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
}));
