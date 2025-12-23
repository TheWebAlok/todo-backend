import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dbConnect from "./utils/dbConnect.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://toto-frontend.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
