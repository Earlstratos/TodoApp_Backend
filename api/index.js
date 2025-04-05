// api/index.js

const express = require('express');
const serverless = require('serverless-http');
const cors = require("cors");
require("dotenv").config();

// Create app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "https://your-frontend-name.vercel.app", // ✅ must be exact
    credentials: true
  }));

// Connect to DB
const dbConnect = require("../Config/database");
dbConnect();

// Import routes
const auth = require("../Routes/auth");
const list = require("../Routes/list");

// Mount routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Default route
app.get("/", (req, res) => {
    res.send(`<h1>This is my Homepage baby</h1>`);
});

// ❌ DO NOT use app.listen() in Vercel

// ✅ Export as a serverless function
module.exports = app;
module.exports.handler = serverless(app);
