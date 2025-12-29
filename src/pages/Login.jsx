import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { useLocation } from "react-router-dom";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [saving, setSaving] = useState(false);
  
const location = useLocation();
const params = new URLSearchParams(location.search);
const next = params.get("next") || "/";


  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
  setSaving(true);
  try {
    await login(form.email, form.password);
    navigate(next);
  } catch (err) {
    alert(err.message || "Login failed");
  } finally {
    setSaving(false);
  }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-slate-800 rounded-2xl bg-slate-900/80 p-6 space-y-4">
        <h1 className="text-xl font-semibold">Log in</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-sky-400 text-slate-950 py-2.5 rounded-md text-sm font-semibold hover:bg-sky-300 disabled:opacity-60"
          >
            {saving ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="text-xs text-slate-400">
          New to WearWay?{" "}
          <Link to="/signup" className="text-sky-300 hover:text-sky-200">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
