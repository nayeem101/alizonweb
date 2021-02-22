const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  googleId: { type: "string", required: true },
  fullName: { type: "string", required: true },
  email: { type: "string", required: true },
  imgUrl: { type: "string" },
});

module.exports = model("guser", userSchema);
