/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { wixClientServer } from "@/lib/wixClientServer";
import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],
  isLoading: true,
  counter: 0,

  getCart: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      set({
        cart: data || [],
        counter: data?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  addItem: async (productId, variantId, quantity) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, variantId, quantity }),
      });
      const data = await res.json();
      set({
        cart: data,
        counter: data?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  removeItem: async (itemId) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      set({
        cart: data,
        counter: data?.lineItems?.length || 0,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
