import { Router } from "express";
import { getNews, modifyNews } from "../controllers/news";

const router = Router();

router.get("/", getNews);
router.patch("/", modifyNews);

export default router;
