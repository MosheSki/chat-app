import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Connection to DB failed", error.message);
  }
};

export default connectDB;
