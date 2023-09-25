import { create, createStore } from "zustand";

export interface IUser {
  name: string;
  age: number;
  handleChangeName: (name: string) => void;
}

export const useUserCreate = create<IUser>(() => ({
  name: "Duong",
  age: 22,
  handleChangeName: (name: string) => console.log(name),
}));

export const useUserCreateStore = createStore<IUser>(() => ({
  age: 22,
  name: "Pham",
  handleChangeName: (name: string) => console.log(name),
}));
