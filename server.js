import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://toto-frontend.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// JSON parsing
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Todo Backend is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Local development listener
if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
}

// Export for Vercel serverless
export default app;
