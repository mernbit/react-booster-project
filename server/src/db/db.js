const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () =>
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("ERROR WHILE CONNECTING TO MONGODB", err);
    });

module.exports = connectDB;
