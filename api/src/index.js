const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/birdiz";
const corsOrigin = process.env.CORS_ORIGIN || "*";

let mongoClient;

app.use(
  cors({
    origin: corsOrigin
  })
);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/summary", async (_req, res) => {
  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(mongoUrl);
      await mongoClient.connect();
    }

    const db = mongoClient.db();
    const collections = await db.listCollections().toArray();

    res.json({
      message: "Birdiz API is running",
      database: db.databaseName,
      collections: collections.map((collection) => collection.name)
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to connect to MongoDB",
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Birdiz API listening on port ${port}`);
});
