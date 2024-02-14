import { config } from "dotenv";
import mongoose from "mongoose";

config();

const uri: string = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_URI}/?retryWrites=true&w=majority`;
const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
export default dbConnect;
