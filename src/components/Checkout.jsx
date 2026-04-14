import { useState } from 'react'

function Checkout({ cart, onPurchase, onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  })

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const shipping = 10

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Prepare user data for advanced matching
    const userData = {
      em: formData.email,
      ph: formData.phone,
      fn: formData.firstName,
      ln: formData.lastName,
      ct: formData.city,
      st: formData.state,
      zp: formData.zip,
      country: formData.country
    }
    
    onPurchase(userData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={onBack} style={{ marginBottom: '20px' }}>
        ← Back to Shopping
      </button>
      
      <div className="cart">
        <h2 style={{ marginBottom: '20px' }}>Checkout</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>Customer Information</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
            </div>
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', marginBottom: '15px' }}
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', marginBottom: '15px' }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP"
                value={formData.zip}
                onChange={handleChange}
                required
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
            </div>
          </div>

          <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>Order Summary</h3>
          
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div>
                <div style={{ fontWeight: '600' }}>{item.name}</div>
                <div style={{ color: '#666', fontSize: '14px' }}>ID: {item.id}</div>
              </div>
              <div style={{ fontWeight: '700', color: '#2563eb' }}>
                ${item.price}
              </div>
            </div>
          ))}
          
          <div style={{ padding: '15px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <span>Shipping</span>
            <span style={{ fontWeight: '600' }}>${shipping.toFixed(2)}</span>
          </div>
          
          <div className="cart-total">
            Total: ${(total + shipping).toFixed(2)}
          </div>
          
          <button 
            type="submit"
            className="btn btn-success"
          >
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout
