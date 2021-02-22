const { Schema, model } = require("mongoose");

const buyandshipSchema = new Schema({
  customer: { id: String, fullName: String },
  prod_link: { type: String, trim: true, required: true },
  prod_variant: { type: String, trim: true, required: true },
  prod_size: { type: String, trim: true, required: true },
  prod_quantity: { type: Number, required: true },
  prod_desc: { type: String, trim: true, required: true },
  created_At: { type: Date },
  reply: {
    status: { type: Boolean, default: false },
    prod_details: {
      title: String,
      variant: String,
      size: String,
      price: String,
      imgLinks: [{ type: String, trim: true }],
      moq: Number,
      shipping: String,
    },
    replied_by: { id: String, fullName: String },
  },
});

module.exports = model("buyandship", buyandshipSchema);

