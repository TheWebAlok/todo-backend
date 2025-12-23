import cors from "cors";

app.use(cors({
  origin: "https://toto-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
