import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dbConnect from "./utils/dbConnect.js";

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
dbConnect();

// Local development listener
if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
}

export default app;
