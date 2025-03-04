import i18n from '../../../public/locales';
import { create } from 'zustand';

type LanguageState = {
  language: string;
  setLanguage: (language: string) => void;
};

const currentLanguage = window.localStorage.getItem('i18nextLng') || 'zh';

export const useLanguageStore = create<LanguageState>((set) => ({
  language: currentLanguage,
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
    set({ language });
  },
}));
