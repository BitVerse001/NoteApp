import React, { useState } from "react";
import { useNote } from "../contexts/NoteContext";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const navigate = useNavigate();
  const { createNote } = useNote();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and Content are required");
      return;
    }

    await createNote(formData.title, formData.content);
    setFormData({ title: "", content: "" });
    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-600 shadow-md rounded-2xl p-6 max-w-xl mt-24  mx-auto mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-500 mb-4 flex items-center gap-2">
          <FiPlus className="text-purple-600" />
          Add a New Note
        </h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title..."
          className="w-full border border-gray-500 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-900"
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note content..."
          rows="4"
          className="w-full border border-gray-500 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-900"
        />

        <button
          type="submit"
          className="w-full bg-purple-900 hover:bg-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
