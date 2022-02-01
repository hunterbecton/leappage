import create from 'zustand';

export const useAlertStore = create((set) => ({
  title: 'Error',
  setTitle: (title) => set(() => ({ title })),
  message:
    'You have reached your quota limit for the month. Please upgrade your plan to continue.',
  setMessage: (message) => set(() => ({ message })),
}));
