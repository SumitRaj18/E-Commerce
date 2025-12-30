import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaUser } from 'react-icons/fa'
import CartContext from '../context/CartContext';
import toast from 'react-hot-toast';
import Logo from '../images/Logo.png'

const Navbar = () => {
    const navigate = useNavigate();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }, 
        { name: 'Contact', path: '/contact' },
        { name: 'My Orders', path: '/order-history' },
    ];
    const {user,cart,setUser}= useContext(CartContext)

    const [isScrolled, setIsScrolled] = useState(false);
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
   const Logout=(e)=>{
       e.preventDefault();
       setUser(null);
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       navigate('/login');
       toast.success("Logged out Successfully")
   }
    return (
        <>
           <nav className={`fixed top-0 left-0 w-full flex items-center justify-start px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-100 
    ${isScrolled 
        ? "bg-white/90 shadow-md text-gray-700 backdrop-blur-lg py-3" 
        : "bg-indigo-600 text-white py-5"}`}>

    <Link to="/" className="flex items-center gap-2 mr-12"> {/* Added margin-right */}
       <Link to="/" className="flex items-center gap-2 mr-12 shrink-0"> 
    {/* <img 
        src={Logo} 
        alt="E-comm Hub Logo" 
        className={`transition-all duration-500 object-contain ${
            isScrolled 
              ? "h-10 brightness-0 opacity-80" // Smaller height when scrolled
              : "h-14"                        // Larger height when at top
        }`} 
    /> */}
    <h1 className='font-bold'>E-comm Hub</h1>
</Link>
    </Link>

    <div className="hidden md:flex items-center gap-8 font-medium">
        {navLinks.map((link, i) => (
            <Link 
                key={i} 
                to={link.path} 
                className="group flex flex-col gap-0.5 relative"
            >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-indigo-600" : "bg-white"}`} />
            </Link>
        ))}
        {
            user ?
            <Link to="/cart">
            <button className={`border cursor-pointer px-5 py-1.5 text-sm rounded-full transition-all hover:bg-opacity-10 hover:bg-gray-400 ${isScrolled ? 'border-gray-300 text-gray-700' : 'border-white/50 text-white'}`}>
                Cart {cart.length}
            </button>
        </Link> : ''
        }
        
    </div>

    <div className="ml-auto hidden md:flex items-center gap-4">
        {user ? (
            <>
            
                <Link to="/userdetails">
                    <button className={`px-5 py-2.5 cursor-pointer flex items-center gap-2 rounded-full font-semibold transition-all duration-300 shadow-sm
                        ${isScrolled ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-indigo-600 hover:bg-gray-100"}`}>
                        <FaUser />
                        {user.username}
                    </button>
                </Link>
                <button onClick={Logout} className={`px-6 cursor-pointer py-2.5 rounded-full font-semibold transition-all duration-300 shadow-sm
                    ${isScrolled ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-red-600 hover:bg-gray-100"}`}>
                    Logout
                </button>
            </>
        ) : (
            <Link to="/login">
                <button className={`px-8 py-2.5  cursor-pointer rounded-full font-semibold transition-all duration-300 shadow-sm
                    ${isScrolled ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-indigo-600 hover:bg-gray-100"}`}>
                    Login
                </button>
            </Link>
        )}
    </div>
</nav>
            <div className="h-20" /> 
        </>
    );
};

export default Navbar;