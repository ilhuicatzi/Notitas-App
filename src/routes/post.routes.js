import { Router } from "express";

const router = Router();

router.get("/posts", (req, res) => {
  res.json({ message: "GET all posts" });
});

router.get("/posts/:id", (req, res) => {
  res.json({ message: `GET post with id ${req.params.id}` });
});

router.post("/posts", (req, res) => {
  res.json({ message: "POST a new post" });
});

router.put("/posts/:id", (req, res) => {
  res.json({ message: `PUT post with id ${req.params.id}` });
});

router.delete("/posts/:id", (req, res) => {
  res.json({ message: `DELETE post with id ${req.params.id}` });
});

export default router;