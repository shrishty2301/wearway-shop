import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { databases } from "../appwrite";

const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const productsCol = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    databases
      .listDocuments(dbId, productsCol)
      .then((res) => setProducts(res.documents))
      .catch(console.error);
  }, []);

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Tailor at work"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/85 to-sky-900/40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 grid gap-10 md:grid-cols-[1.3fr,1fr] items-center">
          {/* Left: headline */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-200">
              WearWay Studio • Custom
            </span>
            <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Elegant everyday pieces,
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                tailored around you
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm md:text-base text-slate-200/85">
              A quiet, minimal storefront for custom menswear and womenswear.
              Choose a base design, then refine it with your own sizes, colors,
              notes and reference images.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/35 hover:bg-sky-300 transition"
              >
                Explore the collection
              </Link>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-2.5 text-sm font-medium text-slate-100 hover:border-sky-300 hover:text-sky-200 transition"
              >
                View featured pieces
              </a>
            </div>

            <div className="mt-8 grid gap-4 text-xs md:text-sm text-slate-200/85 md:grid-cols-2">
              <div className="flex gap-3">
                <div className="mt-0.5 h-7 w-7 rounded-full bg-sky-300/20 text-sky-200 text-[11px] font-semibold flex items-center justify-center">
                  01
                </div>
                <div>
                  <p className="font-semibold text-slate-50">Refined basics</p>
                  <p>
                    Soft silhouettes and clean lines designed to layer into any
                    wardrobe.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 h-7 w-7 rounded-full bg-emerald-300/20 text-emerald-100 text-[11px] font-semibold flex items-center justify-center">
                  02
                </div>
                <div>
                  <p className="font-semibold text-slate-50">
                    Your exact details
                  </p>
                  <p>
                    Share notes, measurements and reference images—each order is
                    cut for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: layered preview card */}
          <div className="md:pl-4">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-10 rounded-[2.25rem] bg-gradient-to-tr from-sky-400/35 via-fuchsia-400/20 to-amber-300/35 blur-3xl opacity-70" />
              <div className="relative space-y-4">
                <div className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 backdrop-blur">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={
                        filtered[0]?.image_url ||
                        "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      alt={filtered[0]?.name || "Featured product"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                        Featured look
                      </p>
                      <h2 className="mt-1 text-sm font-semibold text-slate-50">
                        {filtered[0]?.name || "Soft tailored set"}
                      </h2>
                      <p className="mt-1 text-xs text-slate-300/85 line-clamp-2">
                        {filtered[0]?.description ||
                          "A relaxed, made‑to‑measure silhouette with subtle color accents and room for your own details."}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-sky-300">
                      {filtered[0]
                        ? `UGX ${filtered[0].price}`
                        : "From UGX 80,000"}
                    </p>
                  </div>
                </div>

                {/* <div className="flex gap-3 text-[11px] text-slate-300/80">
                  <div className="flex-1 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2">
                    <p className="font-semibold text-slate-50">
                      Gentle color, bold fit
                    </p>
                    <p className="mt-1">
                      Minimal UI, vivid accents only where it matters.
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="h-7 w-7 rounded-full bg-sky-400/90" />
                    <span className="h-7 w-7 rounded-full bg-amber-300/80" />
                    <span className="h-7 w-7 rounded-full bg-emerald-300/80" />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + product grid */}
      <section id="catalog" className="bg-slate-950 pb-18 pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">
                Featured pieces
              </h2>
              <p className="text-xs text-slate-400">
                Explore a small, curated collection ready for your adjustments.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "clothing", label: "Clothing" },
                { id: "shoes", label: "Shoes" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setFilter(btn.id)}
                  className={`rounded-full px-4 py-1.5 border text-xs font-medium transition ${
                    filter === btn.id
                      ? "bg-sky-400 text-slate-950 border-sky-400"
                      : "border-slate-700 text-slate-200 hover:border-sky-300 hover:text-sky-200"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-400">No products found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.$id}
                  to={`/product/${p.$id}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur hover:border-sky-300/80 hover:shadow-[0_18px_40px_rgba(15,23,42,0.75)] transition"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300/80">
                          {p.category || "Custom"}
                        </p>
                        <h3 className="text-sm font-semibold text-slate-50">
                          {p.name}
                        </h3>
                      </div>
                      <p className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-sky-300">
                        UGX {p.price}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between text-[11px] text-slate-300/80">
                    <span>Tap to refine details</span>
                    <span className="inline-flex items-center gap-1 text-sky-300">
                      View piece
                      <span aria-hidden>↗</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
