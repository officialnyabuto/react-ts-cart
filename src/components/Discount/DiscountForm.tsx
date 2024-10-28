import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const DiscountForm: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { applyDiscount } = useCartStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo discount codes
    const discounts = {
      'SAVE10': { type: 'percentage' as const, value: 10 },
      'SAVE20': { type: 'percentage' as const, value: 20 },
      'FLAT50': { type: 'fixed' as const, value: 50 },
    };

    const discount = discounts[code as keyof typeof discounts];
    
    if (discount) {
      applyDiscount({ code, ...discount });
      setCode('');
    } else {
      setError('Invalid discount code');
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1">
          <label htmlFor="discount" className="sr-only">
            Discount Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="discount"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter discount code"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};