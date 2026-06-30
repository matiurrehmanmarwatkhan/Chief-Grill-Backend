import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cors from "cors";
import fs from "fs";

import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to ensure DB connection on every serverless invocation
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Standard Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "15mb" }));

// API Routes
app.use("/api", apiRoutes);

// Serve static frontend files in production if they exist
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "..", "Frontend", "dist");
  const indexPath = path.join(frontendDistPath, "index.html");
  
  if (fs.existsSync(indexPath)) {
    app.use(express.static(frontendDistPath));
    app.get("*", (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    app.get("*", (req, res) => {
      res.send("Chief Grill API server is running in production mode. (Frontend build files not found)");
    });
  }
} else {
  app.get("/", (req, res) => {
    res.send("Chief Grill API server is running in development mode.");
  });
}

// Global Error Handler Middleware
app.use(errorHandler);

// Listen only when not in serverless environments
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Chief Grill Backend] running on http://localhost:${PORT}`);
  });
}

export default app;
