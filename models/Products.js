const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, trim: true },
  categoryId: String,
  productId: String,
  totalAvailableQuantity: Number,
  orders: Number,
  images: Array,
  variants: Object,
  specs: Array,
  currency: String,
  originalPrice: { min: Number, max: Number },
  salePrice: Object,
});

module.exports = model("products", productSchema);
