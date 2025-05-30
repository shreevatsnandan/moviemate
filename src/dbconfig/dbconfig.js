// src/dbconfig/dbconfig.js
import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    console.log("Connected to MongoDB");
    return connection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err; // Important to throw the error so you can catch it elsewhere
  }
};