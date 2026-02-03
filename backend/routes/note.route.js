import { Router } from "express";
import {
  addNote,
  getAllNotes,
  getNoteById,
} from "../controllers/note.controller.js";
import { isAuthenticated } from "../middlewares/isAuth.middleware.js";

const router = Router();
router.get("/all", isAuthenticated, getAllNotes);
router.get("/:id", isAuthenticated, getNoteById);
router.post("/add", isAuthenticated, addNote);

export const noteRouter = router;
