import { Router } from "express";
const router = Router();

import {
  addAJournal,
  modifyAJournal,
  deleteAJournal,
  addAnArticleToJournal,
  deleteAnArticleFromJournal,
} from "../controllers/journals";

router.post("/", addAJournal);
router.patch("/:vol", modifyAJournal);
router.delete("/:vol", deleteAJournal);
router.post("/:vol/articles", addAnArticleToJournal);
router.post("/:vol", deleteAnArticleFromJournal);

export default router;
