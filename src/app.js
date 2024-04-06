import express from "express";
import morgan from "morgan";
import postsRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173",
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

app.use("/api", authRoutes);
app.use("/api", postsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
