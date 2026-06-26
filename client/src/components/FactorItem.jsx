import { useState } from "react";
import EditableTitle from "./EditableTitle";
import QuestionItem from "./QuestionItem";

export default function FactorItem({
  factor,
  onRename,
  onRemove,
  onAddQuestions,
  onChangeQuestion,
  onRemoveQuestion,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-slate-200 rounded-md">
      <div
        className="flex items-center justify-between px-3 py-2 bg-slate-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">{open ? "▾" : "▸"}</span>
          <EditableTitle
            value={factor.name}
            onChange={onRename}
            className="text-sm font-medium text-slate-700"
          />
          <span className="text-xs text-slate-400">
            ({factor.questions.length})
          </span>
        </div>
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onAddQuestions}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            + Questions
          </button>
          <button
            onClick={onRemove}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-2">
          {factor.questions.length === 0 ? (
            <p className="text-xs text-slate-400">
              No questions yet. Use “+ Questions” to configure and add them.
            </p>
          ) : (
            factor.questions.map((q, i) => (
              <QuestionItem
                key={q.id}
                question={q}
                index={i}
                onChange={(updated) => onChangeQuestion(q.id, updated)}
                onRemove={() => onRemoveQuestion(q.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
