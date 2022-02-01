import create from 'zustand';

export const useComponentPanelStore = create((set) => ({
  isComponentPanelOpen: false,
  setIsComponentPanelOpen: (isComponentPanelOpen) =>
    set(() => ({ isComponentPanelOpen })),
  title: 'Panel title',
  setTitle: (title) => set(() => ({ title })),
  activeComponent: 'logos',
  setActiveComponent: (activeComponent) => set(() => ({ activeComponent })),
}));
