import { create } from 'zustand';

interface AtelierState {
  theme: 'dark' | 'light';
  isLoaded: boolean;
  activeSection: string;
  
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setLoaded: (loaded: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useStore = create<AtelierState>((set) => ({
  theme: 'dark',
  isLoaded: false,
  activeSection: 'home',

  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setTheme: (theme) => set({ theme }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setActiveSection: (section) => set({ activeSection: section }),
}));

