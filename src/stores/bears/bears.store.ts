import { create } from "zustand";

export const enum BearSpecies {
  Black = "black",
  Panda = "panda",
  Polar = "polar"
}

interface Bear {
  id: number;
  name: string;
}

type BearState = {
  [key in BearSpecies]: number;
} & {
  bears: Bear[],
  computed: {
    totalBears: number;
  }
  updateBears: (type: BearSpecies, by: number) => void;
  resetBearsCount: () => void;
  addBear: () => void;
  clearBears: () => void;
};

export const useBearStore = create<BearState>()((set, get) => ({
  [BearSpecies.Black]: 10,
  [BearSpecies.Panda]: 1,
  [BearSpecies.Polar]: 5,
  bears: [{ id: 1, name: "Bear #1" }],

  computed: {
    get totalBears(): number {
      return get()[BearSpecies.Black] + get()[BearSpecies.Panda] + get()[BearSpecies.Polar] + get().bears.length
    }
  },

  updateBears: (type, by) => set((state) => ({ [type]: state[type] + by })),
  resetBearsCount: () => set({ [BearSpecies.Black]: 0, [BearSpecies.Panda]: 0, [BearSpecies.Polar]: 0 }),
  addBear: () => set(state => {
    const nextBearId = state.bears.length + 1;
    return ({
      bears: [...state.bears, {
        id: nextBearId,
        name: `Bear #${nextBearId}`
      }]
    });
  }),
  clearBears: () => set({ bears: [] })
}));
