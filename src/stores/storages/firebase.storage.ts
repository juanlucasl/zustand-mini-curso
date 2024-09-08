import { createJSONStorage, type StateStorage } from "zustand/middleware";

const firebaseBaseUrl = "https://dev-elkbasilstub-default-rtdb.firebaseio.com";
const firebaseRealtimeDatabase = "/zmcrdb";
const firebaseUrl = `${firebaseBaseUrl}${firebaseRealtimeDatabase}/`;

const firebaseStorageApi: StateStorage = {
  getItem: async (name) => {
    try {
      return JSON.stringify(await fetch(`${firebaseUrl}/${name}.json`).then(response => response.json()));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  setItem: async (name, value): Promise<void> => {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, { method: "PUT", body: value }).then(response => response.json());
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
  removeItem: () => {
    throw new Error("Function not implemented.");
  }
};

export const jsonFirebaseStorage = createJSONStorage(() => firebaseStorageApi);
