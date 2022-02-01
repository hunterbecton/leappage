import create from 'zustand';

export const useSubscriptionStore = create((set) => ({
  processing: false,
  setProcessing: (processing) => set(() => ({ processing })),
  succeeded: false,
  setSucceeded: (succeeded) => set(() => ({ succeeded })),
  error: null,
  setError: (error) => set(() => ({ error })),
  disabled: true,
  setDisabled: (disabled) => set(() => ({ disabled })),
  isUpdating: false,
  setIsUpdating: (isUpdating) => set(() => ({ isUpdating })),
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen })),
  clientSecret: '',
  setClientSecret: (clientSecret) => set(() => ({ clientSecret })),
  paymentNow: 100,
  setPaymentNow: (paymentNow) => set(() => ({ paymentNow })),
  paymentMonthly: 100,
  setPaymentMonthly: (paymentMonthly) => set(() => ({ paymentMonthly })),
  product: {
    title: 'Test Product',
    exportAmount: 1000,
  },
  setProduct: (product) => set(() => ({ product })),
}));
