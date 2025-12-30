import { useEffect, useState } from 'react';
import CartContext from './CartContext';
import { toast } from 'react-hot-toast';
const API= import.meta.env.VITE_API_BASE_URL;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [addressData, setAddressData] = useState(() => {
    const savedAddress = localStorage.getItem("shippingAddress");
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  useEffect(() => {
    const fetchUserCart = async () => {
      const token = localStorage.getItem('token');
      if (user && token) {
        try {
          const response = await fetch(`${API}/api/getCart`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setCart(data.items || []);
        } catch (err) {
          console.error("Failed to load user-specific cart");
        }
      } else {
        setCart([]); 
      }
    };
    fetchUserCart();
  }, [user]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (addressData) localStorage.setItem("shippingAddress", JSON.stringify(addressData));
    else localStorage.removeItem("shippingAddress");
  }, [addressData]);

  const handleCart = async (product) => {
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      return toast.error('Please Login first');
    }

    try {
      const response = await fetch(`${API}/api/addCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ensure this space is here
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity: 1,
          price: product.price,
          title:product.title,
          image: product.image || (product.images && product.images[0])
        })
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart.items);
        toast.success('Added To Cart');
      } else if (response.status === 401) {
        toast.error("Session expired. Please login again.");
      }
    } catch (err) {
      toast.error('Failed to sync with server');
    }
  };

  const remove = async (productId) => {
    if (user) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API}/api/removeCart/${productId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const updatedCart = await response.json();
          setCart(updatedCart.items);
          toast.success("Item removed");
        }
      } catch (err) {
        toast.error("Failed to remove item");
      }
    }
  };

  const saveAddress = (data) => setAddressData(data);

  const clearCart = () => {
    setCart([]);
    setAddressData(null);
  };

  const sum = cart.reduce((acc, item) => {
    const itemPrice = item.price || item.productId?.price || 0;
    return acc + (itemPrice * (item.quantity || 1));
  }, 0);

  const cartValue = cart.length;

  return (
    <CartContext.Provider value={{ 
      handleCart, 
      cartValue, 
      cart, 
      remove, 
      sum, 
      user, 
      setUser, 
      addressData, 
      saveAddress, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;