import { StoreApi, UseBoundStore, create } from "zustand";

// State
import { IThemes, createThemeSlice } from "./themes";
import { IUser, createUserSlice } from "./user";

export const useGlobalState: UseBoundStore<StoreApi<IThemes & IUser>> = create<
  IThemes & IUser
>((...args) => ({ ...createThemeSlice(...args), ...createUserSlice(...args) }));
