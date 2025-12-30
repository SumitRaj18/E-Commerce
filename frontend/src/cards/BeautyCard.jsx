import React, { useContext} from 'react'
import './Card.css'
import CartContext from '../context/CartContext';
const Card = ({products}) => {
const {handleCart}= useContext(CartContext); 

  return (
    
      <div className="card">
 <div className="badge">HOT SALE</div>
 <div className="tilte">
  <div className="img">
    <img src={products.thumbnail} style={{height:'150px',width:'150px',objectFit:'cover'}}/>
    </div>
 </div>
 <div className="info">
  <h2 className="title">{products.title}</h2>
  <p className="desc">{products.desc}</p>
  <div className="feats">
   <span className="feat">{products.category}</span>
  </div>
  <div className="bottom">
   <div className="price">
    <span className="new">Price-{products.price}</span>
   </div>
   <button className="btn" onClick={()=>handleCart(products)} >
    <span >Add to Cart</span>
    <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="currentColor">
     <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4"/>
     <line x1="3" y1="6" x2="21" y2="6"/>
     <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
   </button>
  </div>
  <div className="meta">
   <div className="rating">
   <span className="rcount">
    Rating:
        <svg width="16" height="12" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
       {products.rating}/5
   </span>
   </div>
   <div className="stock">In Stock</div>
  </div>
 </div>
</div>
  )
}

export default Card
