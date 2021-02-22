// order model
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  customer: { id: String, name: String },
  address: {
    district: String,
    upazilla: String,
    area: String,
    zipcode: String,
    street: String,
    contactNum: String,
    setDefault: { type: Boolean, default: false },
  },
  order: [
    {
      productId: String,
      title: String,
      variant: String,
      size: String,
      price: String,
      quantity: Number,
      shipping: String,
      trxID: String,
      paid: {
        type: Boolean,
        default: false,
      },
      confirmed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  orderedAt: { type: Date },
});

module.exports = model("orders", orderSchema);
