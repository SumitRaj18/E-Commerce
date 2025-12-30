import { Order } from '../models/orders.js';
import Cart from '../models/cart.js'; 

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const newOrder = new Order({
            user: userId,
            items,
            shippingAddress,
            paymentMethod,
            totalAmount
        });

        const savedOrder = await newOrder.save();

        if (savedOrder) {
               await Cart.findOneAndDelete({ userId });

            res.status(201).json({
                success: true,
                message: "Order placed successfully and cart cleared",
                order: savedOrder
            });
        }
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; 
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};