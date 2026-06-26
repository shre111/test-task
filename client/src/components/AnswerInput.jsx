export default function AnswerInput({ question, value, onChange }) {
  if (question.type === "multiple_choice") {
    return (
      <div className="space-y-1.5">
        {question.options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "rating") {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded border text-sm ${
              value === n
                ? "bg-slate-800 text-white border-slate-800"
                : "border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === "boolean") {
    return (
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-1.5 rounded border text-sm ${
              value === opt
                ? "bg-slate-800 text-white border-slate-800"
                : "border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      placeholder="Your answer"
      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
    />
  );
}
