import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
};

type Actions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string, quantity: number) => void;
  decreaseQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const initialState: CartState = { totalPrice: 0, items: [] };

export const useCartStore = create<Actions & CartState>()(
  persist(
    immer((set) => ({
      ...initialState,
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((item) => item._id === newItem._id);
          if (existing) {
            existing.quantity += newItem.quantity;
          } else {
            state.items.push(newItem);
          }
          state.totalPrice += newItem.price * newItem.quantity;
        }),
      removeItem: (_id) =>
        set((state) => {
          const item = state.items.find((item) => item._id === _id);
          if (item) {
            state.totalPrice -= item.quantity * item.price;
            state.items.filter((item) => item._id !== item._id);
          }
        }),
      increaseQuantity: (_id, quantity) =>
        set((state) => {
          const item = state.items.find((item) => item._id === _id);
          if (item) {
            item.quantity += quantity;
            state.totalPrice += item.price * quantity;
          }
        }),
      decreaseQuantity: (_id, quantity) =>
        set((state) => {
          const item = state.items.find((item) => item._id === _id);
          if (item) {
            item.quantity -= quantity;
            state.totalPrice -= item.price * quantity;
          }
          if (item?.quantity === 0) {
            state.items = state.items.filter((item) => item._id !== _id);
          }
          if (state.totalPrice < 0) state.totalPrice = 0;
        }),
      clear: () => set(initialState),
    })),
    { name: "cart-state", storage: createJSONStorage(() => sessionStorage) },
  ),
);
