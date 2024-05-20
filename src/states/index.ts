import { create } from "zustand";

type States = {
  openAddData?: boolean;
  openUpdateData?: boolean;
};

type Actions = {
  setOpenAddData: (param: boolean) => void;
  setOpenUpdateData: (param: boolean) => void;
};

export const useGlobalStates = create<Actions & States>((set) => ({
  openAddData: false,
  openUpdateData: false,
  setOpenAddData: (openAddData: boolean) => set({ openAddData }),
  setOpenUpdateData: (openUpdateData: boolean) => set({ openUpdateData }),
}));
