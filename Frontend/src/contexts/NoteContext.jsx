import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/notes`);
        setNote(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setNote([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const createNote = async (title, content) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/notes/create`, {
        title,
        content,
      });
      setNote((prevNotes) => [response.data.note, ...prevNotes]);
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, title, content) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BACKEND_URL}/api/notes/update/${id}`,
        { title, content }
      );
      setNote((prevNotes) =>
        prevNotes.map((n) => (n._id === id ? response.data.note : n))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BACKEND_URL}/api/notes/delete/${id}`);
      setNote((prevNotes) => prevNotes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{ note, loading, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export function useNote() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
}
