import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // Tying the order to your User collection
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  items: [
    {
      // FIX: Changed from ObjectId to String to support external API IDs
      productId: { type: String, required: true }, 
      title: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String }
    }
  ],
  shippingAddress: {
    street: String,
    city: String,
    zip: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'debit'],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Order = mongoose.model('Order', orderSchema);