const { Schema, model } = require("mongoose");

const ShipformeSchema = new Schema({
  customer: { id: String, fullName: String },
  status: { type: String, default: "pending" },
  prod_link: { type: String },
  prod_title: { type: String, required: true },
  prod_category: { type: String, required: true },
  prod_desc: { type: String, required: true },
  prod_price: { type: String, required: true },
  prod_quantity: { type: String, required: true },
  prod_ship_to: { type: Date, required: true },
  prod_ship_valid: { type: Date },
  prod_weight: { type: String, required: true },
  prod_origin: { type: String, required: true },
  prod_shipping: { type: String, required: true },
  imageLinks: [{ type: String }],
  created_At: { type: Date },
});

module.exports = model("shipforme", ShipformeSchema);
