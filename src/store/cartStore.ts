import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}

interface CartStore {
  items: CartItem[];
  shippingAddress: ShippingAddress | null;
  discount: Discount | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  applyDiscount: (discount: Discount) => void;
  removeDiscount: () => void;
  getOrderSummary: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  shippingAddress: null,
  discount: null,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  setShippingAddress: (address) =>
    set({ shippingAddress: address }),

  applyDiscount: (discount) =>
    set({ discount }),

  removeDiscount: () =>
    set({ discount: null }),

  getOrderSummary: () => {
    const state = get();
    const subtotal = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discountAmount = 0;
    if (state.discount) {
      discountAmount =
        state.discount.type === 'percentage'
          ? (subtotal * state.discount.value) / 100
          : state.discount.value;
    }

    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal - discountAmount + shipping;

    return {
      subtotal,
      discount: discountAmount,
      shipping,
      total,
    };
  },
}));