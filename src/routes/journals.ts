import { Router } from "express";
const router = Router();

import { addAJournal } from "../controllers/journals";

router.post("/", addAJournal);

export default router;
