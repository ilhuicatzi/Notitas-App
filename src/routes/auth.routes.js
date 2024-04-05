import Router from "express-promise-router";
import { signIn, signUp, signOut, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signup", validateSchema(signUpSchema) ,signUp);

router.post("/signin",validateSchema(signInSchema), signIn);

router.post("/signout", signOut);

router.get("/profile",verifyToken, getProfile);

router.put("/profile", verifyToken, updateProfile);

//router.delete("/profile", deleteProfile);

export default router;