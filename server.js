import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://toto-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Root route for testing
app.get("/", (req, res) => {
  res.send("Todo Backend is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");

    if (process.env.NODE_ENV !== "production") {
      app.listen(process.env.PORT || 5000, () =>
        console.log("Server running on Port", process.env.PORT || 5000)
      );
    }
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

export default app;
