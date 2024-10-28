import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from './components/Cart/CartItem';
import { CartSummary } from './components/Cart/CartSummary';
import { CheckoutForm } from './components/Checkout/CheckoutForm';
import { StripePayment } from './components/Payment/StripePayment';
import { DiscountForm } from './components/Discount/DiscountForm';
import { useCartStore } from './store/cartStore';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment'>('cart');
  const { items, getOrderSummary } = useCartStore();
  const summary = getOrderSummary();

  const handleContinueToPayment = () => {
    setCheckoutStep('payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">E-Commerce Store</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                 onClick={() => setIsCartOpen(false)} />
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="ml-3 h-7 flex items-center"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-8">
                      {items.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                      ) : (
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {items.map((item) => (
                              <li key={item.id} className="py-6">
                                <CartItem item={item} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {items.length > 0 && <DiscountForm />}
                  </div>

                  {items.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4">
                      <CartSummary />
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            setCheckoutStep('shipping');
                            setIsCartOpen(false);
                          }}
                          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {checkoutStep === 'shipping' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Shipping Information</h2>
            <CheckoutForm onComplete={handleContinueToPayment} />
          </div>
        )}
        
        {checkoutStep === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Payment</h2>
            <StripePayment />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;