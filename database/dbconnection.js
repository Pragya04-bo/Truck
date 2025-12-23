import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: "smart_truck_db", // project-specific DB
  })
  .then(() => {
    console.log("MongoDB connected ✅");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });
};