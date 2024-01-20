//import mongoose from "mongoose";
import mongoose from "mongoose";
//import config from "config";
import logger from "../utils/logger";

export async function dbConnect() {
  //const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}
export async function dbDisconnect() {
  try {
    await mongoose.disconnect();
    logger.info("DB disconnected");
  } catch (error) {
    logger.error("Could not disconnect to db");
    console.log("Could not disconnect to db");
  }
}
