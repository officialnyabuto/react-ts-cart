# React E-Commerce Cart & Checkout

A modern, production-ready e-commerce cart and checkout system built with React, TypeScript, and Tailwind CSS. This component provides a complete shopping cart experience with a seamless checkout flow.

## Features

- 🛒 **Cart Management**
  - Add/remove items
  - Update quantities
  - Real-time total calculation
  - Persistent cart state with Zustand

- 💳 **Checkout Flow**
  - Multi-step checkout process
  - Shipping information collection
  - Stripe payment integration
  - Form validation with React Hook Form

- 🏷️ **Discounts & Promotions**
  - Support for percentage and fixed-amount discounts
  - Easy-to-use discount code system
  - Real-time price updates

- 📱 **Responsive Design**
  - Mobile-first approach
  - Sliding cart sidebar
  - Optimized for all screen sizes

- 🎨 **Modern UI/UX**
  - Clean, minimal design
  - Smooth transitions
  - Clear visual feedback
  - Lucide icons integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Adding Items to Cart

```typescript
import { useCartStore } from './store/cartStore';

const { addItem } = useCartStore();

// Add an item
addItem({
  id: '1',
  name: 'Product Name',
  price: 29.99,
  quantity: 1,
  image: 'product-image-url'
});
```

### Applying Discounts

Demo discount codes available:
- `SAVE10`: 10% off
- `SAVE20`: 20% off
- `FLAT50`: $50 off

### Customizing Payment Integration

The project uses Stripe for payments. To configure your Stripe integration:

1. Create a `.env` file
2. Add your Stripe public key:
   ```
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

## Project Structure

```
src/
├── components/
│   ├── Cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── Checkout/
│   │   └── CheckoutForm.tsx
│   ├── Discount/
│   │   └── DiscountForm.tsx
│   └── Payment/
│       └── StripePayment.tsx
├── store/
│   └── cartStore.ts
├── types/
│   └── cart.ts
└── App.tsx
```

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Hook Form
- Stripe Payment Integration
- Lucide React Icons

## Best Practices

- ✅ Modular component architecture
- ✅ Type-safe with TypeScript
- ✅ Responsive design patterns
- ✅ Performance optimized
- ✅ Clean, maintainable code
- ✅ Proper error handling
- ✅ Form validation
- ✅ Accessibility features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.