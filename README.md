# React ServerTrack Demo

A complete e-commerce demo application built with React and Vite, showcasing server-side tracking integration with ServerTrack.io.

## Features

- 🛍️ Product listing and detail pages
- 🛒 Shopping cart functionality
- 💳 Checkout flow
- 📊 Complete e-commerce event tracking:
  - `view_item` - Product view tracking
  - `add_to_cart` - Add to cart events
  - `begin_checkout` - Checkout initiation
  - `purchase` - Transaction completion

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **ServerTrack.io** - Server-side tracking

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Configure ServerTrack in `src/utils/servertrack.js`:
```javascript
const SERVERTRACK_CONFIG = {
  endpoint: 'some.website.com', // Replace with your ServerTrack endpoint
  authKey: 'AUTHENTICATION_KEY' // Replace with your authentication key
}
```

## Usage

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
React-ServerTrack-Demo/
├── src/
│   ├── components/
│   │   ├── ProductList.jsx    # Product grid display
│   │   ├── ProductView.jsx    # Single product detail
│   │   ├── Checkout.jsx       # Checkout page
│   │   └── Success.jsx        # Order confirmation
│   ├── utils/
│   │   └── servertrack.js     # ServerTrack integration
│   ├── App.jsx                # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## ServerTrack Integration

The demo uses the ServerTrack.io SDK and tracks the following e-commerce events:

### SDK Initialization
The SDK is initialized on app load using the standard ServerTrack snippet:
```javascript
initServerTrack()
```

### ViewContent
Triggered when a user clicks on a product:
```javascript
trackEvent('ViewContent', {
  content_ids: [product.id],
  content_type: 'product',
  content_name: product.name,
  content_category: product.category,
  value: product.price,
  currency: 'USD',
  price: product.originalPrice,
  discount: product.originalPrice - product.price,
  content_list: 'Product Catalog'
})
```

### AddToCart
Triggered when a user adds a product to cart:
```javascript
trackEvent('AddToCart', {
  content_ids: [product.id],
  content_type: 'product',
  content_name: product.name,
  value: product.price,
  currency: 'USD',
  content_list: 'Shopping Cart',
  num_items: 1,
  price: product.originalPrice,
  discount: product.originalPrice - product.price
})
```

### InitiateCheckout
Triggered when checkout is initiated:
```javascript
trackEvent('InitiateCheckout', {
  value: total,
  currency: 'USD',
  content_type: 'product',
  num_items: cart.length,
  content_list: 'Shopping Cart',
  content_ids: cart.map(item => item.id),
  contents: cart.map(item => ({
    id: item.id,
    quantity: 1,
    item_price: item.price
  }))
})
```

### Purchase (with Advanced Matching)
Triggered on successful purchase with user data:
```javascript
const userData = {
  em: email,      // Email
  ph: phone,      // Phone
  fn: firstName,  // First Name
  ln: lastName,   // Last Name
  ct: city,       // City
  st: state,      // State
  zp: zip,        // ZIP Code
  country: 'US'   // Country
}

trackEvent('Purchase', {
  transaction_id: transactionId,
  currency: 'USD',
  value: total,
  shipping: 10,
  content_type: 'product',
  content_ids: cart.map(item => item.id),
  contents: cart.map(item => ({
    id: item.id,
    quantity: 1,
    item_price: item.price
  })),
  items: cart.map(item => ({
    item_id: item.id,
    item_name: item.name,
    item_category: item.category,
    price: item.price,
    quantity: 1,
    discount: item.originalPrice - item.price
  }))
}, userData)
```

## Customization

- Modify products in `src/components/ProductList.jsx`
- Adjust styling in `src/index.css`
- Add more tracking events in `src/utils/servertrack.js`

## License

MIT
