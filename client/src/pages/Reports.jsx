import { useEffect, useState } from "react";
import api from "../api/client";

const groupAnswers = (answers) => {
  const groups = {};
  answers.forEach((a) => {
    groups[a.category] = groups[a.category] || {};
    groups[a.category][a.factor] = groups[a.category][a.factor] || [];
    groups[a.category][a.factor].push(a);
  });
  return groups;
};

const formatDate = (value) =>
  new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function Reports() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/responses")
      .then((res) => setResponses(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load reports")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-6">Reports</h1>
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {responses.length === 0 ? (
        <div className="text-center text-slate-400 border border-dashed border-slate-300 rounded-lg py-16">
          No responses yet. Submit one from the Launch Pad.
        </div>
      ) : (
        <div className="space-y-5">
          {responses.map((response) => {
            const groups = groupAnswers(response.answers);
            return (
              <div
                key={response._id}
                className="bg-white border border-slate-200 rounded-lg p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-slate-800">
                    {response.assessmentTitle}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {formatDate(response.createdAt)}
                  </span>
                </div>
                <div className="space-y-4">
                  {Object.entries(groups).map(([category, factors]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-slate-600 mb-2">
                        {category}
                      </h3>
                      <div className="space-y-3 pl-3 border-l-2 border-slate-100">
                        {Object.entries(factors).map(([factor, items]) => (
                          <div key={factor}>
                            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                              {factor}
                            </p>
                            <ul className="space-y-1">
                              {items.map((a, i) => (
                                <li key={i} className="text-sm text-slate-700">
                                  <span className="text-slate-500">
                                    {a.questionText}:
                                  </span>{" "}
                                  <span className="font-medium">
                                    {String(a.answer)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
