import { Router } from "express";
import {
  addNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";
import { isAuthenticated } from "../middlewares/isAuth.middleware.js";

const router = Router();
router.get("/all", isAuthenticated, getAllNotes);
router.get("/:id", isAuthenticated, getNoteById);
router.post("/add", isAuthenticated, addNote);
router.patch("/update/:id", isAuthenticated, updateNoteById);
router.delete("/delete/:id", isAuthenticated, deleteNoteById);

export const noteRouter = router;
