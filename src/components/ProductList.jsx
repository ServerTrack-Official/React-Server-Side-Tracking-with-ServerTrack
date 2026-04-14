const products = [
  { id: 'P001', name: 'Wireless Headphones', price: 99.99, originalPrice: 129.99, category: 'Electronics' },
  { id: 'P002', name: 'Smart Watch', price: 249.99, originalPrice: 299.99, category: 'Electronics' },
  { id: 'P003', name: 'Laptop Stand', price: 49.99, originalPrice: 59.99, category: 'Accessories' },
  { id: 'P004', name: 'USB-C Hub', price: 79.99, originalPrice: 99.99, category: 'Accessories' },
  { id: 'P005', name: 'Mechanical Keyboard', price: 149.99, originalPrice: 179.99, category: 'Electronics' },
  { id: 'P006', name: 'Wireless Mouse', price: 59.99, originalPrice: 79.99, category: 'Electronics' }
]

function ProductList({ onProductClick, onAddToCart }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image" onClick={() => onProductClick(product)}>
              {product.name}
            </div>
            <h3 className="product-title">{product.name}</h3>
            <div className="product-price">${product.price}</div>
            <button 
              className="btn btn-primary"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
