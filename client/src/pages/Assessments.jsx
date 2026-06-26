import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const countQuestions = (assessment) =>
  assessment.categories.reduce(
    (sum, c) =>
      sum + c.factors.reduce((s, f) => s + f.questions.length, 0),
    0
  );

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/assessments")
      .then((res) => setAssessments(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load assessments")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-6">Assessments</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {assessments.length === 0 ? (
        <div className="text-center text-slate-400 border border-dashed border-slate-300 rounded-lg py-16">
          No assessments yet. Create one in the Builder.
        </div>
      ) : (
        <div className="space-y-3">
          {assessments.map((a) => (
            <div
              key={a._id}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3"
            >
              <div>
                <h2 className="font-medium text-slate-800">{a.title}</h2>
                <p className="text-xs text-slate-400">
                  {a.categories.length} categories · {countQuestions(a)} questions
                </p>
              </div>
              <Link
                to={`/launch-pad/${a._id}`}
                className="px-3 py-1.5 rounded bg-slate-800 text-white text-sm hover:bg-slate-700"
              >
                Take
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
