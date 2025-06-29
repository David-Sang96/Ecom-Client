import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export enum Access {
  none = "none",
  success = "success",
  order = "order",
}

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  categories: [string];
  image: string;
  subCategories: string[];
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
  access: Access;
};

type Actions = {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setAccess: (value: Access) => void;
  increaseQuantity: (id: string, quantity?: number) => void;
  decreaseQuantity: (id: string, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const initialState: CartState = {
  totalPrice: 0,
  items: [],
  access: Access.none,
};

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
          const existing = state.items.find((item) => item._id === _id);
          if (existing) {
            state.totalPrice -= existing.quantity * existing.price;
            state.items = state.items.filter(
              (item) => item._id !== existing._id,
            );
          }
        }),
      increaseQuantity: (_id) =>
        set((state) => {
          const item = state.items.find((item) => item._id === _id);
          if (item) {
            item.quantity++;
            state.totalPrice += item.price;
          }
        }),
      decreaseQuantity: (_id) =>
        set((state) => {
          const existing = state.items.find((item) => item._id === _id);
          if (existing) {
            existing.quantity--;
            state.totalPrice -= existing.price;
          }
          if (existing?.quantity === 0) {
            state.items = state.items.filter(
              (item) => item._id !== existing._id,
            );
          }
          if (state.totalPrice < 0) state.totalPrice = 0;
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          state.items = state.items.map((item) =>
            item._id === id ? { ...item, quantity } : item,
          );
          state.totalPrice = state.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          );
        }),
      setAccess: (access) =>
        set((state) => {
          state.access = access;
        }),
      clear: () =>
        set((state) => {
          state.items = [];
          state.totalPrice = 0;
        }),
    })),
    { name: "cart-state", storage: createJSONStorage(() => localStorage) },
  ),
);
