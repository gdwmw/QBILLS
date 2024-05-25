import { create } from "zustand";

type States = {
  openAddDataForm?: boolean;
  openUpdateDataForm?: boolean;
};

type Actions = {
  setOpenAddDataForm: (param: boolean) => void;
  setOpenUpdateDataForm: (param: boolean) => void;
};

export const useGlobalStates = create<Actions & States>((set) => ({
  openAddDataForm: false,
  openUpdateDataForm: false,
  setOpenAddDataForm: (openAddDataForm: boolean) => set({ openAddDataForm }),
  setOpenUpdateDataForm: (openUpdateDataForm: boolean) => set({ openUpdateDataForm }),
}));
