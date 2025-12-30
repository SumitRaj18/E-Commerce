import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
const API= import.meta.env.VITE_API_BASE_URL;

const UserDetails = () => {
  const { user, setUser } = useContext(CartContext);
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    contact: user?.contact || "",
    address: user?.address || ""
  });

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put(`${API}/api/update`, {
      userId: user._id, 
      ...formData      
    });
    if (res.data.user) {
      setUser(res.data.user); 
      setIsEditing(false);
      toast.success("Successfully Changed Details")
    }
  } catch (err) {
    alert(err.response?.data?.message || "Update failed");
  }
};
  
  return (
    <div >
    <div className="max-w-md mx-auto mt-10 mb-10  rounded-2xl shadow-xl overflow-hidden border border-gray-100" >
      
      <div className="h-32 bg-[#582CFF] flex justify-center items-end relative">
        <div className="bg-white p-1.5 rounded-full transform translate-y-12 shadow-md">
          <img 
            src={`https://ui-avatars.com/api/?name=${formData.username}&background=random&size=128`} 
            alt="User" 
            className="w-24 h-24 rounded-full"
          />
        </div>
      </div>

      <div className="pt-16 pb-8 px-6">
        <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
          
          <div className="border-b border-gray-100 pb-2">
            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Username</label>
            {isEditing ? (
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-2 py-1 text-sm focus:border-[#582CFF] outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{user.username}</p>
            )}
          </div>

          <div className="border-b border-gray-100 pb-2">
            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Email</label>
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-2 py-1 text-sm focus:border-[#582CFF] outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{user.email}</p>
            )}
          </div>

          <div className="border-b border-gray-100 pb-2">
            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Contact</label>
            {isEditing ? (
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-2 py-1 text-sm focus:border-[#582CFF] outline-none"
              />
            ) : (
              <p className="text-gray-700 font-medium">{user.contact || "N/A"}</p>
            )}
          </div>

        </div>

        <div className="mt-8 flex gap-3">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="flex-1 bg-green-500 text-white font-bold py-2 rounded-lg">Save</button>
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 rounded-lg">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex-1 bg-[#582CFF] text-white font-bold py-2 rounded-lg">Edit Details</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserDetails;