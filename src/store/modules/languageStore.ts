import i18n from '../../../public/locales';
import { create } from 'zustand';

type LanguageState = {
  language: string;
  setLanguage: (language: string) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'zh',
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
    set({ language });
  },
}));
