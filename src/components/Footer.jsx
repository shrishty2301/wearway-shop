// src/components/Footer.jsx
import { NavLink, Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-slate-800 font-semibold text-sm">
            WearWay
          </Link>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <nav className="flex flex-wrap items-center gap-4">
          <NavLink
            to="/"
            end
            className="hover:text-sky-600 transition-colors text-xs"
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="hover:text-sky-600 transition-colors text-xs"
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-sky-600 transition-colors text-xs"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="hover:text-sky-600 transition-colors text-xs"
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </footer>
  );
}
