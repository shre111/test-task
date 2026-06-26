import { useState } from "react";
import Modal from "./Modal";
import { QUESTION_TYPES } from "../constants";

const newQuestion = (type) => ({
  id: crypto.randomUUID(),
  text: "",
  type,
  options: type === "multiple_choice" ? ["", ""] : [],
});

export default function QuestionSettingsModal({ onClose, onConfirm }) {
  const [counts, setCounts] = useState(
    QUESTION_TYPES.reduce((acc, t) => ({ ...acc, [t.value]: 0 }), {})
  );

  const setCount = (type, value) =>
    setCounts({ ...counts, [type]: Math.max(0, Number(value) || 0) });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleConfirm = () => {
    const questions = [];
    QUESTION_TYPES.forEach((t) => {
      for (let i = 0; i < counts[t.value]; i += 1) {
        questions.push(newQuestion(t.value));
      }
    });
    onConfirm(questions);
  };

  return (
    <Modal
      title="Question Settings"
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
            onClick={handleConfirm}
            disabled={total === 0}
            className="px-3 py-1.5 rounded bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 text-sm"
          >
            Add {total > 0 ? total : ""} Questions
          </button>
        </>
      }
    >
      <p className="text-sm text-slate-500 mb-4">
        Choose how many questions of each type to add.
      </p>
      <div className="space-y-3">
        {QUESTION_TYPES.map((t) => (
          <div key={t.value} className="flex items-center justify-between">
            <span className="text-sm text-slate-700">{t.label}</span>
            <input
              type="number"
              min="0"
              value={counts[t.value]}
              onChange={(e) => setCount(t.value, e.target.value)}
              className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
