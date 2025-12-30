
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Electronics from './components/Electronics'
import CartItems from './components/Cart'
import BeautyProducts from './components/BeautyProducts'
import { ToastBar, Toaster } from 'react-hot-toast'
import Banner from './components/Banner'
import Register from './components/Signup'
import Login from './components/Login'
import Sports from './components/Sports'
import Promos from './components/Promos'
import UserDetails from './components/UserDetails'
import Address from './components/Address'
import PaymentPage from './components/Payment'
import OrderHistory from './components/OrderHistory'
import ScrollToTop from './components/ScrollToTop'
function App() {


  return (
    <div style={{backgroundColor:'#f3f4ff'}}>
    <BrowserRouter>
   
     <Navbar/> 
     <ScrollToTop/>
     <Banner/> 
     {/* <Corousel/> */}
     <Toaster/>
      <Routes>

    <Route path='/' element={<Home/>} />
    <Route path='about' element={<About/>} />

    <Route path='/sports' element={<Sports/>} />
    <Route path='/DailyProducts' element={<BeautyProducts/>} />
    <Route path='/electronics' element={<Electronics/>} />
    <Route path='/userdetails' element={<UserDetails/>}/>
    <Route path='/address' element={<Address/>} />
    <Route path='/payment' element={<PaymentPage/>} />
    <Route path='/order-history' element={<OrderHistory/>} />
    <Route path='/cart' element={<CartItems/>} />
    <Route path='/signup' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/contact' element={<Contact/>} />


    </Routes>
           <Footer/>

    </BrowserRouter>
   </div>
    
  )
}

export default App
