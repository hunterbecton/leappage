import create from 'zustand';
import { ComponentPanelState } from './_model';

export const useComponentPanelStore = create<ComponentPanelState>((set) => ({
  isComponentPanelOpen: false,
  setIsComponentPanelOpen: (isComponentPanelOpen) =>
    set(() => ({ isComponentPanelOpen })),
  title: 'Panel title',
  setTitle: (title) => set(() => ({ title })),
  activeComponent: 'logos',
  setActiveComponent: (activeComponent) => set(() => ({ activeComponent })),
}));
