import { Router } from "express";
import {
  addAnArticle,
  modifyAnArticle,
  deleteAnArticle,
  getArticles,
} from "../controllers/articles";

const router = Router();

router.get("/", getArticles);
router.post("/", addAnArticle);
router.patch("/:slug", modifyAnArticle);
router.delete("/:slug", deleteAnArticle);

export default router;
