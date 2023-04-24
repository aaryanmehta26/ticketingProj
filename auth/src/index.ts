import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); // mongodb://auth-srv:27017/auth -> auth-mongo-srv is the service name, refer auth-mongo-depl.yaml
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Auth server listening on port 3000!!!!");
  });
};

start();
