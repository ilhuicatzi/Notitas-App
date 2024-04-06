import express from "express";
import morgan from "morgan";
import postsRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool } from "./db.js";
import { CORS_ORIGIN } from "./config.js";

const app = express();

app.use(cors(
  {
    origin: CORS_ORIGIN ,
    credentials: true,
  }
));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({  message: "Welcome to my API Z@o_Notas" });
});

app.get("/api/ping", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "pong", db: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use("/api", authRoutes);
app.use("/api", postsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
