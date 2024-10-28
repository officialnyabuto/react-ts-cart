import React from 'react';
import { useCartStore } from '../../store/cartStore';

export const CartSummary: React.FC = () => {
  const { getOrderSummary } = useCartStore();
  const summary = getOrderSummary();

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-base text-gray-900">
        <p>Subtotal</p>
        <p>${summary.subtotal.toFixed(2)}</p>
      </div>
      {summary.discount > 0 && (
        <div className="flex justify-between text-base text-green-600">
          <p>Discount</p>
          <p>-${summary.discount.toFixed(2)}</p>
        </div>
      )}
      <div className="flex justify-between text-base text-gray-900">
        <p>Shipping</p>
        <p>${summary.shipping.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Total</p>
        <p>${summary.total.toFixed(2)}</p>
      </div>
    </div>
  );
};