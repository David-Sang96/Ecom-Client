import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type FavoriteItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  image: string;
  subCategories: string[];
};

type Favorite = {
  items: FavoriteItem[];
};

type Actions = {
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  addOrRemove: (item: FavoriteItem) => void;
  clear: () => void;
};

const initialState: Favorite = {
  items: [],
};

export const useFavoriteStore = create<Favorite & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      addOrRemove: (favItem) =>
        set((state) => {
          const isExisting = state.items.find(
            (item) => item._id === favItem._id,
          );
          if (isExisting) {
            state.items = state.items.filter(
              (item) => item._id !== isExisting._id,
            );
          } else {
            state.items.push(favItem);
          }
        }),
      addItem: (newItem) =>
        set((state) => {
          state.items.push(newItem);
        }),
      removeItem: (_id) =>
        set((state) => {
          state.items = state.items.filter((item) => item._id !== _id);
        }),
      clear: () => set({ ...initialState }),
    })),
    {
      name: "favorite-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
