import { Router } from "express";
const router = Router();

import {
  getAJournal,
  getPaginatedJournals,
  addAJournal,
  modifyAJournal,
  deleteAJournal,
  addAnArticleToJournal,
  deleteAnArticleFromJournal,
} from "../controllers/journals";

router.get("/", getPaginatedJournals);
router.get("/:vol", getAJournal);
router.post("/", addAJournal);
router.patch("/:vol", modifyAJournal);
router.delete("/:vol", deleteAJournal);
router.post("/:vol/articles", addAnArticleToJournal);
router.post("/:vol", deleteAnArticleFromJournal);

export default router;
