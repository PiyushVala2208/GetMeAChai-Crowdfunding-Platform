import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI not found in .env.local");
    }

    if (mongoose.connections[0].readyState) return;

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Mongo error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
