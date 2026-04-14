function Success({ onContinue }) {
  return (
    <div className="success-page">
      <div className="success-icon">✓</div>
      <h1 style={{ fontSize: '36px', marginBottom: '15px' }}>Purchase Complete!</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Thank you for your order. Your purchase has been tracked successfully.
      </p>
      <button 
        className="btn btn-primary"
        onClick={onContinue}
        style={{ maxWidth: '300px', margin: '0 auto' }}
      >
        Continue Shopping
      </button>
    </div>
  )
}

export default Success
