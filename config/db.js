const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`DB is connected ${mongoose.connection.host}`);
  } catch (err) {
    console.log(`Mongodb connection error ${err}`);
  }
};

module.exports = connectDb;
