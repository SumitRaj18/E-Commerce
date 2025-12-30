import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  items: [{
    productId: { type: String, required: true },
    title: { type: String },
    image: { type: String }, 
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true }); 

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;