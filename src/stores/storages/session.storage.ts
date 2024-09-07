import { createJSONStorage, type StateStorage } from "zustand/middleware";

const sessionStorageApi: StateStorage = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: () => { throw new Error("Function not implemented.") }
};

export const jsonSessionStorage = createJSONStorage(() => sessionStorageApi)
