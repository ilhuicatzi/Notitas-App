import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  res.json({ message: "POST signup" });
});

router.post("/signin", (req, res) => {
  res.json({ message: "POST signin" });
});

router.post("/signout", (req, res) => {
  res.json({ message: "POST signout" });
});

router.get("/profile", (req, res) => {
  res.json({ message: "GET profile" });
});

router.put("/profile", (req, res) => {
  res.json({ message: "PUT profile" });
});

router.delete("/profile", (req, res) => {
  res.json({ message: "DELETE profile" });
});

export default router;