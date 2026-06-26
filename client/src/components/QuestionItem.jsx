import { typeLabel } from "../constants";

export default function QuestionItem({ question, index, onChange, onRemove }) {
  const setText = (text) => onChange({ ...question, text });

  const setOption = (i, value) => {
    const options = question.options.map((o, idx) => (idx === i ? value : o));
    onChange({ ...question, options });
  };

  const addOption = () =>
    onChange({ ...question, options: [...question.options, ""] });

  const removeOption = (i) =>
    onChange({
      ...question,
      options: question.options.filter((_, idx) => idx !== i),
    });

  return (
    <div className="border border-slate-200 rounded p-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Q{index + 1} · {typeLabel(question.type)}
        </span>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <input
        value={question.text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Question text"
        className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
      />
      {question.type === "multiple_choice" && (
        <div className="mt-2 space-y-2 pl-2">
          {question.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={opt}
                onChange={(e) => setOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
              />
              {question.options.length > 2 && (
                <button
                  onClick={() => removeOption(i)}
                  className="text-xs text-slate-400 hover:text-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addOption}
            className="text-xs text-slate-600 hover:text-slate-800"
          >
            + Add option
          </button>
        </div>
      )}
    </div>
  );
}
