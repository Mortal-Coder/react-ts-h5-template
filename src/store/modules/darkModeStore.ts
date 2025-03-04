import { LocalStorageKey } from '@/constant/langEnum';
import { create } from 'zustand';

interface DarkModeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const isDarkMode = () => {
  const darkMode = localStorage.getItem(LocalStorageKey.DARK_MODE);
  if (darkMode) {
    return darkMode === 'true';
  }
  return false;
};

const applyDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-prefers-color-scheme');
  }
};

export const useDarkModeStore = create<DarkModeState>((set) => {
  const currentMode = isDarkMode();
  applyDarkMode(currentMode);

  return {
    isDarkMode: currentMode,
    toggleTheme: () => {
      const newDarkMode = !isDarkMode();
      localStorage.setItem(LocalStorageKey.DARK_MODE, newDarkMode.toString());
      applyDarkMode(newDarkMode);
      set({ isDarkMode: newDarkMode });
    },
  };
});
