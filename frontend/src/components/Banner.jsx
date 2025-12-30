import { Link } from 'react-router-dom';
import './Banner.css'
import electronics from '../images/e.jpg'
import beauty from '../images/beauty.webp'
import fas from '../images/images.jpg'
import basket from '../images/basket.webp'
import sports from '../images/sports.jpg'
import Promos from './Promos';




const Banner = () => {
 const Mystyle={
    borderLeft:'2px solid black',
    height:'50px'
  }

  return (
    <div  >
    <div className="category-nav">
  <Link to='/' div className="category-item">
    <img src={basket} alt="Minutes"/>
    <span>All Products</span>
  </Link>

  <Link to='/electronics' div className="category-item">
    <img src={electronics} alt="Mobiles"/>
    <span>Mobiles & Tablets</span>
  </Link>

  <Link to='/' div className="category-item">
    <img src={fas} alt="Fashion"/>
    <div className="label-with-arrow">
      <span>Fashion</span>
    </div>
  </Link>
  <Link to='/DailyProducts' div className="category-item">
    <img src={beauty} alt="Fashion"/>
    <div className="label-with-arrow">
      <span>Beauty Products</span>
    </div>
  </Link>
  <Link to='/sports' div className="category-item">
    <img src={sports} alt="Fashion"/>
    <div className="label-with-arrow">
      <span>Sports</span>
    </div>
  </Link>

  </div>
          </div>
  )
}

export default Banner
