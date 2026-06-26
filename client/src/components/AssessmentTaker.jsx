import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import AnswerInput from "./AnswerInput";
import { typeLabel } from "../constants";

export default function AssessmentTaker({ assessment }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (qId, value) =>
    setAnswers((prev) => ({ ...prev, [qId]: value }));

  const allQuestions = assessment.categories.flatMap((c) =>
    c.factors.flatMap((f) =>
      f.questions.map((q) => ({ category: c.name, factor: f.name, q }))
    )
  );

  const handleSubmit = async () => {
    const unanswered = allQuestions.filter(
      ({ q }) => answers[q._id] === undefined || answers[q._id] === ""
    );
    if (unanswered.length > 0) {
      setError(`Please answer all questions (${unanswered.length} remaining)`);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post("/responses", {
        assessmentId: assessment._id,
        answers: allQuestions.map(({ category, factor, q }) => ({
          category,
          factor,
          questionText: q.text,
          type: q.type,
          answer: answers[q._id],
        })),
      });
      navigate("/reports");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit response");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-1">
        {assessment.title}
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        {allQuestions.length} questions
      </p>

      <div className="space-y-6">
        {assessment.categories.map((category) => (
          <div key={category._id}>
            <h2 className="font-semibold text-slate-700 mb-2">
              {category.name}
            </h2>
            <div className="space-y-4">
              {category.factors.map((factor) => (
                <div
                  key={factor._id}
                  className="border border-slate-200 rounded-lg bg-white p-4"
                >
                  <h3 className="text-sm font-medium text-slate-500 mb-3">
                    {factor.name}
                  </h3>
                  <div className="space-y-5">
                    {factor.questions.map((q) => (
                      <div key={q._id}>
                        <p className="text-sm text-slate-700 mb-2">
                          {q.text}
                          <span className="text-xs text-slate-400 ml-2">
                            ({typeLabel(q.type)})
                          </span>
                        </p>
                        <AnswerInput
                          question={q}
                          value={answers[q._id]}
                          onChange={(v) => setAnswer(q._id, v)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-5 py-2 rounded bg-slate-800 text-white text-sm hover:bg-slate-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Responses"}
        </button>
      </div>
    </div>
  );
}
