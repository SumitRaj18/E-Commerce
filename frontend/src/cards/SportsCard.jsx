import React, { useContext } from 'react'
import './Card.css'
import CartContext from '../context/CartContext';

const SportsCard = ({ products }) => {
  const { handleCart } = useContext(CartContext);

  const onAddToCart = () => {
    const productToSync = {
      ...products,
      _id: products._id || products.id, 
      title: products.name,           
      image: products.image_url,        
      price: products.price
    };
    handleCart(productToSync);
  };

  return (
    <div className="card">
      <div className="badge">HOT SALE</div>
      <div className="tilte">
        <div className="img">
          <img 
            src={products.image_url} 
            alt={products.name}
            style={{ height: '150px', width: '150px', objectFit: 'contain', display: 'block', margin: 'auto' }} 
          />
        </div>
      </div>
      <div className="info">
        <h2 className="title">{products.name}</h2>
        <div className="bottom">
          <div className="price">
            <span className="new">Price - ${products.price}</span>
          </div>
          <button className="btn" onClick={onAddToCart}>
            <span>Add to Cart</span>
            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="currentColor">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </button>
        </div>
        <div className="meta">
          <div className="rating">
            <span className="rcount">
              Rating: 4.5/5
            </span>
          </div>
          <div className="stock">In Stock</div>
        </div>
      </div>
    </div>
  )
}

export default SportsCard;