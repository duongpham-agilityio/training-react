import { StoreApi, UseBoundStore, create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface UserInfo {
  name: string;
  age: number;
  school: {
    name: string;
    address: string;
  };
}

export interface UseUpdateState {
  info: UserInfo;
  handleUpdateWithNormal: () => void;
  handleUpdateWithImmer: () => void;
  handleUpdateWithOpticsTS?: (payload: UserInfo) => void;
  handleUpdateWithRamda?: (payload: UserInfo) => void;
}

export const useUpdateState: UseBoundStore<StoreApi<UseUpdateState>> = create(
  immer<UseUpdateState>((set) => ({
    info: {
      name: "Pham Tan Duong",
      age: 20,
      school: {
        name: "Su Pham University",
        address: "Da Nang City",
      },
    },
    handleUpdateWithNormal: () => {
      const random = Math.floor(Math.random() * 100);

      set(({ info: { name, ...restInfo }, ...rest }: UseUpdateState) => ({
        info: { ...restInfo, name: `${name} ${random}` },
        ...rest,
      }));
    },
    handleUpdateWithImmer: () => {
      set((state) => {
        state.info.school.name = "New";

        return {};
      });
    },
    handleUpdateWithOpticsTS: (payload: UserInfo) => {
      console.log(payload);
    },
    handleUpdateWithRamda: (payload: UserInfo) => {
      console.log(payload);
    },
  }))
);
