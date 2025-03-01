import { create } from 'zustand';

interface UserInfo {
  id: string;
  username: string;
  email: string;
}

type UserState = {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
  userInfo: null,
  isLoggedIn: false,
  setUserInfo: (user) => set({ userInfo: user, isLoggedIn: true }),
  clearUserInfo: () => set({ userInfo: null, isLoggedIn: false }),
}));
