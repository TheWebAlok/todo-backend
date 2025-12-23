import express from "express";
import cors from "cors";
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

//CORS 
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//MIDDLEWARE 
app.use(express.json());

//ROUTES 
app.get("/", (req, res) => {
  res.status(200).send("Todo Backend is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

//DB 
dbConnect();

//LOCAL SERVER 
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

//VERCEL EXPORT 
export default app;
