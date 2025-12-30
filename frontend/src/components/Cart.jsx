import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const { cart, remove, sum, cartValue, user } = useContext(CartContext);
    const navigate = useNavigate();

    // 1. Handle Empty Cart
    if (cartValue === 0) {
        return (
            <div className='flex flex-col items-center justify-center mt-20 h-64'>
                <h1 className='text-3xl font-semibold text-gray-700'>🛒 Your cart is empty</h1>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Back to Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            {user ? (
                <>
                    <h1 className="text-3xl font-bold text-center mb-8 border-b pb-4">
                        Your Shopping Cart
                    </h1>

                    <div className="flex flex-col gap-5">
                        {cart.map((item) => {
                            const displayId = item.productId?._id || item.productId; 
                            const displayImage = item.image || item.productId?.image || item.images?.[0];
                            const displayTitle = item.title || item.productId?.title || "Product";

                            return (
                                <div 
                                    key={displayId} 
                                    className="flex items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow gap-5"
                                >
                                    {/* 🖼️ Image */}
                                    <img 
                                        src={displayImage} 
                                        alt={displayTitle} 
                                        className="h-24 w-24 object-contain rounded-md "
                                    />
                                    
                                    {/* 📝 Details */}
                                    <div className="grow">
                                        <h3 className="text-lg font-bold text-gray-800">{displayTitle}</h3>
                                        <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
                                    </div>

                                    {/* 💲 Price & Remove */}
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900 mb-2">
                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                        </p>
                                        <button 
                                            onClick={() => remove(displayId)} 
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Total Summary */}
                    <div className="mt-10 border-t pt-6 text-right">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Cart Total: ${sum.toFixed(2)}
                        </h2>
                        
                        <div className="flex flex-col items-end gap-3 cursor-pointer">
                            <button 
                                onClick={() => navigate('/address')} 
                                className="w-full cursor-pointer md:w-64 bg-black text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all uppercase tracking-wider"
                            >
                                Proceed To Checkout
                            </button>
                            <button 
                                onClick={() => navigate('/')}
                                className="text-gray-600 hover:text-black text-sm underline cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='flex flex-col items-center justify-center mt-20 h-64'>
                    <h1 className='text-3xl font-bold text-red-500'>Please Login First</h1>
                    <button 
                        onClick={() => navigate('/login')}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Go to Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartItems;