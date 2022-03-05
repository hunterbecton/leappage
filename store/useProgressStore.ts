import create from 'zustand';
import { ProgressState } from './_model';

export const useProgressStore = create<ProgressState>((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
}));
