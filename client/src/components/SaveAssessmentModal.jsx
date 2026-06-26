import { useState } from "react";
import Modal from "./Modal";

export default function SaveAssessmentModal({ onClose, onSave, saving }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSave(title.trim());
  };

  return (
    <Modal
      title="Save Assessment"
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-100 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 text-sm"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </>
      }
    >
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <label className="block text-sm text-slate-600 mb-1">
        Assessment title
      </label>
      <input
        autoFocus
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
      />
    </Modal>
  );
}
