import { useState } from "react";
import EditableTitle from "./EditableTitle";
import FactorItem from "./FactorItem";

export default function CategoryItem({
  category,
  onRename,
  onRemove,
  onAddFactor,
  onRenameFactor,
  onRemoveFactor,
  onAddQuestions,
  onChangeQuestion,
  onRemoveQuestion,
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-slate-300 rounded-lg bg-white shadow-sm">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="text-slate-400">{open ? "▾" : "▸"}</span>
          <EditableTitle
            value={category.name}
            onChange={onRename}
            className="font-semibold text-slate-800"
          />
          <span className="text-xs text-slate-400">
            {category.factors.length} factor(s)
          </span>
        </div>
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onAddFactor}
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            + Factor
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
        <div className="px-4 pb-4 space-y-3">
          {category.factors.length === 0 ? (
            <p className="text-xs text-slate-400">
              No factors yet. Use “+ Factor” to add one.
            </p>
          ) : (
            category.factors.map((factor) => (
              <FactorItem
                key={factor.id}
                factor={factor}
                onRename={(name) => onRenameFactor(factor.id, name)}
                onRemove={() => onRemoveFactor(factor.id)}
                onAddQuestions={() => onAddQuestions(factor.id)}
                onChangeQuestion={(qId, updated) =>
                  onChangeQuestion(factor.id, qId, updated)
                }
                onRemoveQuestion={(qId) => onRemoveQuestion(factor.id, qId)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
