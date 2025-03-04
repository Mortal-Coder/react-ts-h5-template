import i18n from '../../../public/locales';
import { create } from 'zustand';
import { LocalStorageKey, LangEnum } from '@/constant/langEnum';
type LanguageState = {
  language: string;
  setLanguage: (language: string) => void;
};

const currentLanguage =
  window.localStorage.getItem(LocalStorageKey.LANGUAGE) || LangEnum.ZH;

export const useLanguageStore = create<LanguageState>((set) => ({
  language: currentLanguage,
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
    set({ language });
  },
}));
