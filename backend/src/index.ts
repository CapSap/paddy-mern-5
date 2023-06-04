import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const app: Express = express();
const port = 3000;

async function mongoConnect() {
  if (!process.env.MONGO_URI) {
    throw new Error("no uri");
  }
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
}
mongoConnect();

// app.use(cors());
// enable cors (cross origin response)
app.use(express.json());
// json middleware gets the raw bytes and attatches to req.body
app.use(express.urlencoded({ extended: true }));
// allows us to use paramaters in url
app.use(morgan("dev"));
// logging middleware

app.use("/orders", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
