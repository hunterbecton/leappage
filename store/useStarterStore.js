import create from 'zustand';

export const useStarterStore = create((set) => ({
  isMobileFiltersOpen: false,
  setIsMobileFiltersOpen: (isMobileFiltersOpen) =>
    set(() => ({ isMobileFiltersOpen })),
  currentPage: 1,
  setCurrentPage: (currentPage) => set(() => ({ currentPage })),
  limit: 24,
  setLimit: (limit) => set(() => ({ limit })),
  totalPages: 1,
  setTotalPages: (totalPages) => set(() => ({ totalPages })),
  quantity: null,
  setQuantity: (quantity) => set(() => ({ quantity })),
}));
