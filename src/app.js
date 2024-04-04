import express from "express";
import morgan from "morgan";
import postsRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(morgan("dev"));
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
