const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const doctorSchema = new Schema(
  {
    userId: { type: String },
    firstName: { type: String, require: [true, "First Name is required"] },
    lastName: { type: String, require: [true, "Last Name is required"] },
    phoneNumber: { type: String, require: [true, "Phone Number is required"] },
    email: { type: String, require: [true, "Email is required"] },
    address: { type: String, require: [true, "Address is required"] },
    website: { type: String },
    specialazation: {
      type: String,
      require: [true, "Specialzation is required"],
    },
    experience: {
      type: String,
      require: [true, "Experience is required"],
    },
    timing: { type: Object, require: [true, "Work timing is required"] },
    status: { type: String, default: "Pending" },
    feesPerCunsaltation: { type: Number, require: [true, "Fees is required"] },
  },
  {
    timestamps: true, // Add timestamps to the schema - timestamp add 2 fields createdat and deletedat
  }
);

module.exports = mongoose.model("doctor", doctorSchema);
