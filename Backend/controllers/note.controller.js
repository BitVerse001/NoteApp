import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = await Note.create({
      title,
      content,
    });
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note Created Successfully", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(201).json({ message: " Notes fetched", notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
