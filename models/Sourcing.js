const { Schema, model } = require("mongoose");

const sourcingSchema = new Schema({
  customer: { id: String, fullName: String },
  prod_name: {
    type: String,
    required: true,
  },
  prod_image: [{ type: String, required: true }],
  prod_desc: { type: String, required: true },
  created_At: { type: Date },
  reply: {
    moq: { type: String },
    price: { type: String },
    weight: { type: String },
    charge: { type: String },
  },
});

module.exports = model("prodSourcing", sourcingSchema);
