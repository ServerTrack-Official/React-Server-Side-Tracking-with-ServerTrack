import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import ProductView from './components/ProductView'
import Checkout from './components/Checkout'
import Success from './components/Success'
import { initServerTrack, trackEvent } from './utils/servertrack'

function App() {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])

  // Initialize ServerTrack on mount
  useEffect(() => {
    initServerTrack()
  }, [])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setPage('product')
    
    // Track ViewContent event
    trackEvent('ViewContent', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.name,
      content_category: product.category,
      value: product.price,
      currency: 'USD',
      price: product.originalPrice || product.price,
      discount: product.originalPrice ? product.originalPrice - product.price : 0,
      content_list: 'Product Catalog'
    })
  }

  const handleAddToCart = (product) => {
    setCart([...cart, product])
    
    // Track AddToCart event
    trackEvent('AddToCart', {
      content_ids: [product.id],
      content_type: 'product',
      content_name: product.name,
      value: product.price,
      currency: 'USD',
      content_list: 'Shopping Cart',
      num_items: 1,
      price: product.originalPrice || product.price,
      discount: product.originalPrice ? product.originalPrice - product.price : 0
    })
  }

  const handleCheckout = () => {
    setPage('checkout')
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    
    // Track InitiateCheckout event
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
  }

  const handlePurchase = (userData) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    const transactionId = 'ORD-' + Date.now()
    
    // Track Purchase event with user data for advanced matching
    trackEvent('Purchase', {
      currency: 'USD',
      value: total,
      transaction_id: transactionId,
      shipping: 10, // Example shipping cost
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
        discount: item.originalPrice ? item.originalPrice - item.price : 0
      }))
    }, userData)
    
    setPage('success')
  }

  return (
    <div className="container">
      <div className="header">
        <h1>React ServerTrack Demo</h1>
        <p>E-commerce tracking with ServerTrack.io</p>
      </div>

      {page === 'home' && (
        <ProductList 
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      )}

      {page === 'product' && (
        <ProductView 
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setPage('home')}
        />
      )}

      {page === 'checkout' && (
        <Checkout 
          cart={cart}
          onPurchase={handlePurchase}
          onBack={() => setPage('home')}
        />
      )}

      {page === 'success' && (
        <Success onContinue={() => {
          setCart([])
          setPage('home')
        }} />
      )}

      {cart.length > 0 && page !== 'checkout' && page !== 'success' && (
        <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
          <button className="btn btn-success" onClick={handleCheckout}>
            Checkout ({cart.length} items)
          </button>
        </div>
      )}
    </div>
  )
}

export default App
