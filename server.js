import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://toto-frontend.vercel.app",
    ],
    credentials: true,
  })
);

// JSON parsing
app.use(express.json());

// Root route
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

// Vercel serverless export
export default app;
