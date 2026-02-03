import { Note } from "../models/Note.model.js";
import { noteSchema } from "../validations/note.js";

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ owner: req.user._id })
      .populate({
        path: "owner",
        select: "-password",
      })
      .populate("folder")
      .populate("tags")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        msg: "Note not found",
      });
    }
    if (req.user._id.toString() !== note.owner.toString()) {
      return res.status(403).json({
        success: false,
        msg: "Unauthorized access",
      });
    }
    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const addNote = async (req, res, next) => {
  try {
    const { error, value } = noteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        msg: error.details[0].message,
      });
    }

    const { title, content, tags, folder, isPinned } = value;
    const note = await Note.create({
      title,
      content,
      tags,
      folder,
      isPinned,
      owner: req.user._id,
    });

    return res.status(201).json({
      success: true,
      msg: "Note added successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNoteById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteNoteById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
