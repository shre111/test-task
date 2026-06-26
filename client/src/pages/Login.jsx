import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate("/builder");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-slate-800 mb-6">Sign in</h1>
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {error}
          </p>
        )}
        <label className="block text-sm text-slate-600 mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <label className="block text-sm text-slate-600 mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700 disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
        <p className="mt-4 text-sm text-slate-500 text-center">
          No account?{" "}
          <Link to="/register" className="text-slate-800 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
