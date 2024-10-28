import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../store/cartStore';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex space-x-4">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-md object-cover"
        />
      )}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center space-x-2">
          <button
            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="rounded-md p-1 text-gray-400 hover:text-gray-500"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-gray-600">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="rounded-md p-1 text-gray-400 hover:text-gray-500"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => removeItem(item.id)}
            className="ml-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};