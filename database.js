const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://amnaalrashid:2Moonq8_24@fullstack.t5trz.mongodb.net/"
  );
  console.log("Connected to MongoDB");
};

module.exports = connectDB;
