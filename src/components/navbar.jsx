// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";

const navLink =
  "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors";
const navActive = "text-sky-600";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, it) => sum + it.quantity, 0);
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          {/* Logo image */}
          <img
            src="/public/media/logo.png"               // put your logo file here (e.g. /wearway-logo.png or /img/wearway-logo.png)
            alt="WearWay logo"
            className="h-16 w-16 rounded-xl object-cover transform transition-transform duration-200 hover:scale-110"
          />
         
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLink} ${isActive ? navActive : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${navLink} ${isActive ? navActive : ""}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${navLink} ${isActive ? navActive : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${navLink} ${isActive ? navActive : ""}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right side: login/logout + cart */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="text-xs text-slate-700 hover:text-sky-600"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xs text-slate-700 hover:text-sky-600"
            >
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <span>Cart</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[11px] font-semibold text-white">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
