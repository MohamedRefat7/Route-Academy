import { MongoClient } from "mongodb";
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

export const db = client.db("route-mongodb-connection");

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to DB successfully");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
};
