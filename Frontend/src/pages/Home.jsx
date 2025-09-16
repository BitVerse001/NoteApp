import React, { useState } from "react";
import { useNote } from "../contexts/NoteContext";

const Home = () => {
  const { note, loading, updateNote, deleteNote } = useNote();
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
  });

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      title: item.title,
      content: item.content || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({ title: "", content: "" });
  };

  const handleSaveEdit = async (id) => {
    await updateNote(id, editForm.title, editForm.content);
    setEditingItem(null);
    setEditForm({ title: "", content: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center  text-gray-500 items-center mt-20 ">
        Loading...
      </div>
    );
  }

  if (note.length === 0) {
    return (
      <div className="flex justify-center text-gray-500 items-center mt-20">
        No notes available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {note.map((n) => (
        <div key={n._id} className="border border-gray-600 p-4 rounded shadow">
          {editingItem === n._id ? (
            <>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="border w-full p-2 mb-2 rounded"
              />
              <textarea
                value={editForm.content}
                onChange={(e) =>
                  setEditForm({ ...editForm, content: e.target.value })
                }
                className="border w-full p-2 mb-2 rounded"
              />
              <button
                onClick={() => handleSaveEdit(n._id)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">{n.title}</h2>
              <p className="mb-4">{n.content}</p>
              <button
                onClick={() => handleEdit(n)}
                className="bg-purple-800 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => deleteNote(n._id)}
                className="bg-red-800 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
