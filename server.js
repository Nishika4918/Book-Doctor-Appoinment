const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorRoute");
const multer = require("multer");
const path = require("path");

dotenv.config();

// creating rest object
const app = express();

// MIDDLEWARE
// to pares json object in the request

// TO SET THE IMAGE FILE PATH

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    const sanitizedDate = new Date().toISOString().replace(/:/g, "-");
    cb(null, sanitizedDate + "-" + file.originalname);
  },
});

app.use(multer({ storage: fileStorage }).single("image"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use(express.json());
app.use(morgan("dev"));

// MONGODB CONNECTION
connectDb();

// ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);

// PORT
const port = process.env.PORT || 8080;

//LISTEN PORT
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} Mode on port ${port}`
  );
});
