import { StateCreator } from "zustand";

export interface IThemes {
  theme: "light" | "dark";
  changeTheme: () => void;
}

export const createThemeSlice: StateCreator<IThemes> = (set): IThemes => ({
  theme: "light",
  changeTheme: () =>
    set((state) => {
      const theme: {
        dark: "light";
        light: "dark";
      } = {
        dark: "light",
        light: "dark",
      };

      return {
        ...state,
        theme: theme[state.theme],
      };
    }),
});
