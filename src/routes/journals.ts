import { Router } from "express";
const router = Router();

import {
  getAJournal,
  getPaginatedJournals,
  addAJournal,
  modifyAJournal,
  deleteAJournal,
} from "../controllers/journals";

router.get("/", getPaginatedJournals);
router.get("/:vol", getAJournal);
router.post("/", addAJournal);
router.patch("/:vol", modifyAJournal);
router.delete("/:vol", deleteAJournal);

export default router;
