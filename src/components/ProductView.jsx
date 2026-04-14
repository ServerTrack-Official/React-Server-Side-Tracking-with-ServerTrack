function ProductView({ product, onAddToCart, onBack }) {
  return (
    <div>
      <button className="btn btn-primary" onClick={onBack} style={{ marginBottom: '20px' }}>
        ← Back to Products
      </button>
      
      <div style={{ background: 'white', padding: '40px', borderRadius: '8px' }}>
        <div className="product-image" style={{ height: '300px', marginBottom: '30px' }}>
          {product.name}
        </div>
        
        <h2 className="product-title" style={{ fontSize: '32px', marginBottom: '15px' }}>
          {product.name}
        </h2>
        
        <div className="product-price" style={{ fontSize: '36px', marginBottom: '20px' }}>
          ${product.price}
        </div>
        
        <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
          This is a detailed description of {product.name}. It features high-quality materials 
          and excellent craftsmanship. Perfect for everyday use and built to last.
        </p>
        
        <button 
          className="btn btn-primary"
          onClick={() => onAddToCart(product)}
          style={{ maxWidth: '300px' }}
        >
          Add to Cart - ${product.price}
        </button>
      </div>
    </div>
  )
}

export default ProductView
