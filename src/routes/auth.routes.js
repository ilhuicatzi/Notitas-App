import Router from "express-promise-router";
import { signIn, signUp, signOut, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.post("/signout", signOut);

router.get("/profile",verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

//router.delete("/profile", deleteProfile);

export default router;