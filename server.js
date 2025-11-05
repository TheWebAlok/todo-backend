import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// Allow both localhost (development) and your frontend (production)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://toto-frontend.vercel.app/", // Replace with your deployed frontend URL
    ],
    credentials: true,
  })
);

app.use(express.json());

// Root route for testing (Vercel /)
app.get("/", (req, res) => {
  res.send("Todo Backend is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // On Vercel, we don’t use app.listen (handled automatically)
    if (process.env.NODE_ENV !== "production") {
      app.listen(process.env.PORT || 5000, () =>
        console.log("Server running on Port", process.env.PORT || 5000)
      );
    }
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Export app for Vercel
export default app;
