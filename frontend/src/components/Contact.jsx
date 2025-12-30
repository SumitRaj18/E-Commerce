import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-sans text-gray-800">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Our Team</h1>
        <p className="text-lg text-gray-600">
          Have a question about an <span className="font-semibold">order</span>? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form 
          onSubmit={handleSubmit} 
          className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          >
            <option value="">Select a Subject</option>
            <option value="order">Order Status</option>
            <option value="return">Returns & Refunds</option>
            <option value="technical">Technical Issue</option>
          </select>

          <textarea 
            placeholder="How can we help?" 
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-lg transition-colors duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-900 mb-2">📦 Shipping & Tracking</h4>
            <p className="text-sm text-gray-600">Track your real-time status in your user dashboard.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-900">
            <h4 className="font-bold text-gray-900 mb-2">✉️ Email Us</h4>
            <p className="text-sm text-gray-600">sumitraj7162@gmail.com</p>
            <p className="text-xs text-gray-400 mt-2">Response time: &lt; 24 hours</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-gray-400">
            <h4 className="font-bold text-gray-900 mb-2">📍 Headquarters</h4>
            <p className="text-sm text-gray-600">Sector-37,Faridabad,Haryana --- India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;