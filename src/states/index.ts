import { create } from "zustand";

type States = {
  openAddDataForm?: boolean;
  openCard?: boolean;
  openUpdateDataForm?: boolean;
};

type Actions = {
  setOpenAddDataForm: (param: boolean) => void;
  setOpenCard: (param: boolean) => void;
  setOpenUpdateDataForm: (param: boolean) => void;
};

export const useGlobalStates = create<Actions & States>((set) => ({
  openAddDataForm: false,
  openCard: false,
  openUpdateDataForm: false,
  setOpenAddDataForm: (openAddDataForm: boolean) => set({ openAddDataForm }),
  setOpenCard: (openCard: boolean) => set({ openCard }),
  setOpenUpdateDataForm: (openUpdateDataForm: boolean) => set({ openUpdateDataForm }),
}));
