import mongoose from "mongoose";

export const connect = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is not defined");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connected");
  } catch (error) {
    console.log("connect -> error", error);
    process.exit(1);
  }
};
