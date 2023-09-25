import { StateCreator } from "zustand";

export interface IUser {
  name: string;
  age: number;
  handleChangeName: () => void;
}

export const createUserSlice: StateCreator<IUser> = (set) => ({
  name: "Pham Tan Duong",
  age: 22,
  handleChangeName: () =>
    set((state: IUser) => ({
      ...state,
      name: state.name + Math.floor(Math.random() * 100),
    })),
});
