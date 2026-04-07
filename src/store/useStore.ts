import { create } from "zustand";
import type { Equipment } from "@/data/equipment";
import { mockOrders, type LogisticsOrder } from "@/data/logistics";

export interface CartItem {
  equipment: Equipment;
  quantity: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  logisticsOrders: LogisticsOrder[];
  addToCart: (equipment: Equipment) => void;
  removeFromCart: (equipmentId: string) => void;
  updateCartItem: (equipmentId: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  updateOrderStatus: (orderId: string, status: LogisticsOrder["status"]) => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  isCartOpen: false,
  logisticsOrders: [...mockOrders],

  addToCart: (equipment) =>
    set((state) => {
      const existing = state.cart.find((i) => i.equipment.id === equipment.id);
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.equipment.id === equipment.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { equipment, quantity: 1, startDate: undefined, endDate: undefined }] };
    }),

  removeFromCart: (equipmentId) =>
    set((state) => ({ cart: state.cart.filter((i) => i.equipment.id !== equipmentId) })),

  updateCartItem: (equipmentId, updates) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.equipment.id === equipmentId ? { ...i, ...updates } : i)),
    })),

  clearCart: () => set({ cart: [] }),
  setCartOpen: (open) => set({ isCartOpen: open }),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      logisticsOrders: state.logisticsOrders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    })),
}));
