import create from 'zustand';
import { MediaModalState } from './_model';

export const useMediaModalStore = create<MediaModalState>((set) => ({
  isMediaModalOpen: false,
  setIsMediaModalOpen: (isMediaModalOpen) => set(() => ({ isMediaModalOpen })),
  activeImageName: '',
  setActiveImageName: (activeImageName) => set(() => ({ activeImageName })),
  mediaSize: '500',
  setMediaSize: (mediaSize) => set(() => ({ mediaSize })),
}));
