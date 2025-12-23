import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://toto-frontend.vercel.app",
];

/* 🔥 FIXED CORS (VERCEL SAFE) */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // VERY IMPORTANT FOR PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* MIDDLEWARE */
app.use(express.json());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Todo Backend is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

/* DB */
dbConnect();

/* LOCAL SERVER */
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, () => console.log("Server running on 5000"));
}

/* VERCEL */
export default app;
