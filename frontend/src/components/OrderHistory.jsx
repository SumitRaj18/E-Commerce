import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CartContext from '../context/CartContext';
const API= import.meta.env.VITE_API_BASE_URL;

const OrderHistory = () => {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
        setLoading(false)
    }
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API}/api/user/${user._id}`,
          {
            headers:{
              'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center mt-20 animate-bounce">Loading your orders...</div>;
 if (!user) {
    return(
        <div className="text-center h-16 mt-16">
        <h2 className="text-3xl  text-black">You need to login first</h2>
      </div>
    )
 }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 mb-28">
        <h2 className="text-2xl">No orders found yet!</h2>
        <p className="text-2xl">Your shopping journey starts here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black text-gray-800 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="text-sm font-mono text-gray-600">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Placed</p>
                <p className="text-sm font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {order.status}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                <p className="text-lg font-black text-[#582CFF]">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="divide-y divide-gray-50">
                {order.items.map((item, index) => (
                  <div key={index} className="py-4 flex items-center gap-4">
                    <img 
                      src={item.image || item.images} 
                      alt={item.title} 
                      className="w-16 h-16 object-contain rounded-lg border border-gray-100" 
                    />
                    <div className="grow">
                      <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-700">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Shipping Snapshot */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-end gap-4">
                <div className="text-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping To</p>
                  <p className="text-gray-600 leading-tight">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.zip}
                  </p>
                </div>
                <button className="text-xs font-bold text-[#582CFF] hover:underline">
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;