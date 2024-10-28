import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '../../store/cartStore';
import { CreditCard } from 'lucide-react';

// In a real application, you would use import.meta.env.VITE_STRIPE_PUBLIC_KEY
// and set it in your .env file
const STRIPE_PUBLIC_KEY = 'pk_test_demo_key';
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const StripePayment: React.FC = () => {
  const { getOrderSummary } = useCartStore();
  const summary = getOrderSummary();

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // Here you would typically make an API call to your backend
    // to create a payment intent and get the client secret
    // For demo purposes, we'll just show the UI
    console.log('Processing payment for:', summary.total);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium">Payment Details</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Pay ${summary.total.toFixed(2)}</span>
      </button>
    </div>
  );
};