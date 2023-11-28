const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appoinmentSchema = new Schema(
  {
    userId: { type: String, require: true },
    // userInfo: { type: String, require: true },
    doctorId: { type: String, require: true },
    doctorInfo: { type: String, require: true },
    date: { type: String, require: true },
    startTime: { type: String, require: true },
    endTime: { type: String, require: true },
    status: { type: String, require: true, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appoinment", appoinmentSchema);
