import { Router } from "express";
import {
  addAnArticle,
  modifyAnArticle,
  deleteAnArticle,
  getFilteredArticles,
} from "../controllers/articles";

const router = Router();

router.get("/", getFilteredArticles);
router.post("/", addAnArticle);
router.patch("/:slug", modifyAnArticle);
router.delete("/:slug", deleteAnArticle);

export default router;
