import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;

    setSaving(true);
    try {
      await register(form.email, form.password, form.name || form.email);
      navigate("/"); // go to home after signup
    } catch (err) {
      alert(err.message || "Signup failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/80 p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 text-slate-200">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-200">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-sky-400 text-slate-950 py-2.5 rounded-md text-sm font-semibold hover:bg-sky-300 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Sign up"}
          </button>
        </form>
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-300 hover:text-sky-200">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
