export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
  sku: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variant: ProductVariant;
  quantity: number;
}

export interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'mpesa';
  details: Record<string, any>;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}