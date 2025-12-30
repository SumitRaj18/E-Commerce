import React, { useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
const API= import.meta.env.VITE_API_BASE_URL;

const PaymentPage = () => {
  const { sum, user, cart, clearCart, addressData} = useContext(CartContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // 2. Retrieve addressData passed from the AddressForm page

  const [method, setMethod] = useState('card');

  const handleFinalPay = async () => {
    if (!user) {
      alert("Session expired. Please login again.");
      navigate('/login');
      return;
    }

    if (!addressData) {
      alert("Shipping address missing. Please go back.");
      navigate('/address');
      return;
    }

    const orderData = {
      userId: user._id || user.id,
      items: cart, 
      shippingAddress: addressData, 
      paymentMethod: method, 
      totalAmount: sum
    };

    try {
      const res = await axios.post(`${API}/api/place`, orderData,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (res.data.success) {
        if(clearCart) clearCart(); // Ensure this function exists in your Context
        navigate('/order-history');
        toast.success("Order Placed Successfully")
      }
    } catch (err) {
      console.error(err);
      alert("Payment Failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (!user) return <div className="text-center mt-20">Loading secure checkout...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-2xl rounded-3xl overflow-hidden border">
      <div className="bg-[#582CFF] p-6 text-white text-center">
        <p className="text-xs uppercase opacity-80 font-bold tracking-widest">Total Payable</p>
        <h2 className="text-3xl font-black">${sum}</h2>
      </div>

      <div className="p-6">
        <label className="text-xs font-bold text-gray-400 uppercase">Select Method</label>
        <div className="flex flex-col gap-3 mt-3">
          {['card', 'upi', 'debit'].map((m) => (
            <button 
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`p-4 border-2 rounded-xl text-left font-bold capitalize transition-all ${
                method === m ? 'border-[#582CFF] bg-indigo-50 text-[#582CFF]' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {m === 'card' ? '💳 Credit / Debit Card' : m === 'upi' ? '📱 UPI (G-Pay/PhonePe)' : '🏦 Net Banking'}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl min-h-[120px] flex flex-col justify-center">
          {method === 'card' && (
            <div className="space-y-2">
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-[#582CFF]" />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" className="p-2 border rounded" />
                <input type="text" placeholder="CVV" className="p-2 border rounded" />
              </div>
            </div>
          )}
          {method === 'upi' && (
            <input type="text" placeholder="yourname@upi" className="w-full p-3 border-2 rounded-lg border-[#582CFF] text-center font-bold outline-none" />
          )}
          {method === 'debit' && (
             <p className="text-center text-sm text-gray-500 italic">Redirecting to Secure Bank Portal...</p>
          )}
        </div>

        <button 
          onClick={handleFinalPay} 
          className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-bold shadow-lg transition-transform active:scale-95"
        >
          Confirm & Pay ${sum}
        </button>
        
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-tighter">
          🔒 Secure SSL Encrypted Payment
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;