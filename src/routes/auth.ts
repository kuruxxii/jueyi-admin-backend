import { Router } from "express";
import { signup, login, logout } from "../controllers/auth";
import passport from "passport";

const router = Router();

router.post("/signup", signup);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

export default router;
