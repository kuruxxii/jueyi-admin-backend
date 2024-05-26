import { Router } from "express";
import { addAUser } from "../controllers/users";

const router = Router();

router.post("/", addAUser);

export default router;
