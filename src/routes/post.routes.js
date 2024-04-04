import Router from "express-promise-router";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/posts.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/posts", verifyToken, getPosts);

router.get("/posts/:id", verifyToken, getPost);

router.post("/posts", verifyToken, createPost);

router.put("/posts/:id", verifyToken, updatePost);

router.delete("/posts/:id",verifyToken,  deletePost);

export default router;