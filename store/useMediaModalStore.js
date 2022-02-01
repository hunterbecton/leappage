import create from 'zustand';

export const useMediaModalStore = create((set) => ({
  isMediaModalOpen: false,
  setIsMediaModalOpen: (isMediaModalOpen) => set(() => ({ isMediaModalOpen })),
  activeImageName: null,
  setActiveImageName: (activeImageName) => set(() => ({ activeImageName })),
}));
