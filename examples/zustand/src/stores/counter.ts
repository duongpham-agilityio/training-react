import { create, StateCreator } from "zustand";

export interface CountState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const storeHandler: StateCreator<CountState> = (set, get) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set({ count: get().count - 1 }),
});

export const useCount = create<CountState>(storeHandler);
