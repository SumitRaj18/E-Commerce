import express from 'express';
import Cart from '../models/cart.js'; // Ensure the path and extension are correct
import { verifyToken } from '../middleware/auth.js'; // Use the actual name of your middleware

const router = express.Router();

router.get('/getCart', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart || { items: [], totalPrice: 0 });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post('/addCart', verifyToken, async (req, res) => {
  try {
    const { productId, quantity, price,title,image,images } = req.body;
    const finalImage= image || (images && images[0])
    // DEBUG LOGS: Check your terminal to see if these appear
    console.log("Product ID:", productId);
    console.log("User from Token:", req.user);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User ID missing from token" });
    }

    const userId = req.user.id;
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price,title, image:finalImage });
      }
      
      cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity, price }],
        totalPrice: price * quantity
      });
    }

    // Populate the product details before sending back to frontend
    const populatedCart = await cart.populate('items.productId');
    res.status(201).json(populatedCart);

  } catch (err) {
    // THIS LOG IS CRITICAL: Look at your backend terminal for this output
    console.error("ADD TO CART ERROR:", err); 
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});
router.delete('/removeCart/:productId', verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    
    cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

router.put('/updateQuantity', verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating quantity" });
  }
});

export default router; // Use export default instead of module.exports