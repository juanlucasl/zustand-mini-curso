import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logger } from "../middlewares/logToConsole.middleware";
import { jsonSessionStorage } from "../storages/session.storage";

interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<PersonState, [["zustand/devtools", never]]> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value: string) => set({ firstName: value }, undefined, "setFirstName"),
  setLastName: (value: string) => set({ lastName: value }, undefined, "setLastName")
});

export const usePersonStore = create<PersonState>()(
  logger(
    devtools(
      persist(
        storeApi, {
          name: "person-info",
          storage: jsonSessionStorage
        }
      )
    )
  )
);
