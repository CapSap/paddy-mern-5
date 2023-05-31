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

// app.use(cors());
// enable cors (cross origin response)
app.use(express.json());
// json middleware gets the raw bytes and attatches to req.body
app.use(express.urlencoded({ extended: true }));
// allows us to use paramaters in url
app.use(morgan("dev"));
// logging middleware

app.use("/orders", router);

const uri = `mongodb+srv://admin:${process.env.PASS}@cluster0.1ftxsem.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
