const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, require: [true, "name is required"] },
  email: { type: String, require: [true, "email is required"] },
  password: { type: String, require: [true, "password is required"] },
  profileImage: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  notification: { type: Array, default: [] },
  seeNotification: { type: Array, default: [] },
});

module.exports = mongoose.model("users", userSchema);
