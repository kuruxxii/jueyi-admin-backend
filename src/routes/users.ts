import { Router } from "express";
import {
  addAUser,
  getAUser,
  modifyAUser,
  deleteAUser,
  getFilteredUsersTotalPages,
  getFilteredUsers,
} from "../controllers/users";

const router = Router();

router.get("/", getFilteredUsers);
router.get("/pages", getFilteredUsersTotalPages);
router.get("/:email", getAUser);
router.post("/", addAUser);
router.patch("/:email", modifyAUser);
router.delete("/:email", deleteAUser);

export default router;
