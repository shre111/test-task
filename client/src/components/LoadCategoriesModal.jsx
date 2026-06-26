import { useEffect, useState } from "react";
import Modal from "./Modal";
import api from "../api/client";

export default function LoadCategoriesModal({ onClose, onLoad }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load categories")
      )
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleLoad = () => {
    onLoad(categories.filter((c) => selected.includes(c._id)));
    onClose();
  };

  return (
    <Modal
      title="Load Categories"
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
            onClick={handleLoad}
            disabled={selected.length === 0}
            className="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 text-sm"
          >
            Add Selected ({selected.length})
          </button>
        </>
      }
    >
      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-slate-500">
          No saved categories yet. Categories are saved when you save an
          assessment.
        </p>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {categories.map((c) => (
            <label
              key={c._id}
              className="flex items-center gap-3 px-3 py-2 border border-slate-200 rounded cursor-pointer hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(c._id)}
                onChange={() => toggle(c._id)}
              />
              <span className="text-sm text-slate-700">{c.name}</span>
              <span className="text-xs text-slate-400 ml-auto">
                {c.factors.length} factor(s)
              </span>
            </label>
          ))}
        </div>
      )}
    </Modal>
  );
}
