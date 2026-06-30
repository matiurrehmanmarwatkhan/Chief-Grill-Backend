import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Connect to MongoDB
  await connectDB();

  // Standard Middlewares
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }),
  );
  app.use(express.json({ limit: "15mb" }));

  // API Routes
  app.use("/api", apiRoutes);

  // Serve static frontend files in production
  if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.join(__dirname, "..", "Frontend", "dist");
    app.use(express.static(frontendDistPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendDistPath, "index.html"));
    });
  } else {
    app.get("/", (req, res) => {
      res.send("Chief Grill API server is running in development mode.");
    });
  }

  // Global Error Handler Middleware
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Chief Grill Backend] running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Backend Server Boot Failure", err);
});
