import { useState } from "react";

export default function EditableTitle({ value, onChange, className }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) onChange(trimmed);
    else setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => e.key === "Enter" && save()}
        onClick={(e) => e.stopPropagation()}
        className="px-2 py-1 border border-slate-300 rounded text-sm"
      />
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span className={className}>{value}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDraft(value);
          setEditing(true);
        }}
        className="text-xs text-slate-400 hover:text-slate-700"
      >
        edit
      </button>
    </span>
  );
}
