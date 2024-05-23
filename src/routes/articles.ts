import { Router } from "express";
import {
  addAnArticle,
  modifyAnArticle,
  deleteAnArticle,
  getFilteredArticles,
  getFilteredArticlesTotalPages,
} from "../controllers/articles";

const router = Router();

router.get("/", getFilteredArticles);
router.get("/pages", getFilteredArticlesTotalPages);
router.post("/", addAnArticle);
router.patch("/:slug", modifyAnArticle);
router.delete("/:slug", deleteAnArticle);

export default router;
