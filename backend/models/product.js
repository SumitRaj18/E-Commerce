import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Essential for Cart calculations
  category: { type: String, required: true }, // Helps in filtering
  image: { type: String, required: true }, // URL to the image
  countInStock: { type: Number, required: true, default: 0 } // Prevents overselling
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;