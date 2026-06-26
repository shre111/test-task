import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/client";
import AssessmentTaker from "../components/AssessmentTaker";

export default function LaunchPad() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const request = id
      ? api.get(`/assessments/${id}`)
      : api.get("/assessments");
    request
      .then((res) => setData(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load")
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-slate-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  if (id) {
    return <AssessmentTaker assessment={data} />;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-800 mb-6">Launch Pad</h1>
      {data.length === 0 ? (
        <div className="text-center text-slate-400 border border-dashed border-slate-300 rounded-lg py-16">
          No assessments available. Create one in the Builder.
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((a) => (
            <Link
              key={a._id}
              to={`/launch-pad/${a._id}`}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-slate-400"
            >
              <span className="font-medium text-slate-800">{a.title}</span>
              <span className="text-sm text-slate-500">Take →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
