// src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databases } from "../appwrite";

const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const productsCol = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("men");

  useEffect(() => {
    databases
      .listDocuments(dbId, productsCol)
      .then((res) => setProducts(res.documents))
      .catch(console.error);
  }, []);

  const filtered = products.filter((p) => (p.gender || "men") === tab);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-18">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              WearWay collection
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
              Shop tailored pieces
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              A focused selection for men and women. Choose a base silhouette,
              then refine it with your own measurements, colors and design
              notes.
            </p>
          </div>

          <div className="inline-flex rounded-full bg-slate-900/90 border border-slate-700 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setTab("men")}
              className={`px-4 py-1.5 rounded-full transition ${
                tab === "men"
                  ? "bg-sky-400 text-slate-950 shadow-sm"
                  : "text-slate-200 hover:text-sky-200"
              }`}
            >
              Men
            </button>
            <button
              type="button"
              onClick={() => setTab("women")}
              className={`px-4 py-1.5 rounded-full transition ${
                tab === "women"
                  ? "bg-sky-400 text-slate-950 shadow-sm"
                  : "text-slate-200 hover:text-sky-200"
              }`}
            >
              Women
            </button>
          </div>
        </header>

        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400">
            No pieces in this category yet.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link
                key={p.$id}
                to={`/product/${p.$id}`}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur hover:border-sky-300/80 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition"
              >
                <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300/85">
                        {p.category ||
                          (tab === "men" ? "Menswear" : "Womenswear")}
                      </p>
                      <h2 className="text-sm font-semibold text-slate-50">
                        {p.name}
                      </h2>
                    </div>
                    <p className="rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-sky-300">
                      INR {p.price}
                    </p>
                  </div>
                </div>
                <div className="p-3 text-[11px] text-slate-300/85 flex items-center justify-between">
                  <span className="line-clamp-1">
                    {p.description || "Tap to customize fit and details."}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sky-300">
                    Open
                    <span aria-hidden>↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
