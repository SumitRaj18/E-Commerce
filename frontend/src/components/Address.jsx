import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const AddressForm = () => {
  const { user,saveAddress } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: user?.address || '',
    city: '',
    phone: user?.contact || '',
    zip: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveAddress(address);
    navigate('/payment');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border">
      <h2 className="text-2xl font-bold mb-6 text-center">Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Street Address" required
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#582CFF]"
          value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="City" required
            className="p-3 border rounded-lg"
            onChange={(e) => setAddress({...address, city: e.target.value})}
          />
          <input 
            placeholder="ZIP Code" required
            className="p-3 border rounded-lg"
            onChange={(e) => setAddress({...address, zip: e.target.value})}
          />
        </div>
        <input 
          placeholder="Phone Number" required
          className="w-full p-3 border rounded-lg"
          value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})}
        />
        <button type="submit" className="w-full bg-[#582CFF] text-white py-3 rounded-xl font-bold">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AddressForm;