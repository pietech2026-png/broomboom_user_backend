const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000
    });

    console.log("Mongo Connected");
  } catch (error) {
    console.error("Mongo Error:", error);

    throw error;
  }
};

module.exports = connectDB;
