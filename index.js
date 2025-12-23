import express from "express";
import cors from "cors";

const app = express();

// Allow all origins
app.use(cors());

// OR allow only your frontend domain
app.use(cors({
  origin: "https://toto-frontend.vercel.app",
  credentials: true
}));

app.use(express.json());
