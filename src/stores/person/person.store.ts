import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { jsonSessionStorage } from "../storages/session.storage";

interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value })
});

export const usePersonStore = create<PersonState>()(
  persist(storeApi, {
    name: "person-info",
    storage: jsonSessionStorage
  })
);
