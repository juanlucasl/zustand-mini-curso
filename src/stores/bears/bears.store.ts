import { create } from 'zustand';

export const enum BearSpecies {
  Black = 'black',
  Panda = 'panda',
  Polar = 'polar'
}

type BearState = {
  [key in BearSpecies]: number;
} & {
  updateBears: (type: BearSpecies, by: number) => void; removeAllBears: () => void;
};

export const useBearStore = create<BearState>()((set) => ({
  [BearSpecies.Black]: 10,
  [BearSpecies.Panda]: 1,
  [BearSpecies.Polar]: 5,
  updateBears: (type, by) => set((state) => ({ [type]: state[type] + by })),
  removeAllBears: () => set({ [BearSpecies.Black]: 0, [BearSpecies.Panda]: 0, [BearSpecies.Polar]: 0 })
}));
