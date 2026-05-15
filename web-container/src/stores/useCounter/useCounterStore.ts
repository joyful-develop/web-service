import { create } from 'zustand';

interface CounterState {
  count: number;
  increase: (by: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: (by) => set((state) => ({ count: state.count + by })),
}));
