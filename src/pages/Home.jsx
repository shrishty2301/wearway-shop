// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { databases } from "../appwrite";

const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const productsCol = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    databases
      .listDocuments(dbId, productsCol)
      .then((res) => setProducts(res.documents))
      .catch(console.error);
  }, []);

  const featured = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="max-w-6xl mx-auto px-4 pt-16 pb-20 space-y-14">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[1.1fr,1fr] items-center">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Tailored for you
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              Calm, custom clothing.  
              Built one piece at a time.
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              WearWay turns simple silhouettes into pieces shaped around your 
              body and preferences—sizes, colors, and details you actually control.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 hover:bg-sky-300"
              >
                Start with the collection
              </Link>
              <Link
                to="/about"
                className="text-sm text-slate-300 hover:text-sky-300"
              >
                How it works →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden">
              <div className="relative h-64 w-full bg-slate-900">
               <video
      className="w-full h-full object-cover"
      src="/media/about.mp4"   // put about.mp4 in public/media/about.mp4
      autoPlay
      loop
      muted
      playsInline
    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-100">
                  <p className="font-semibold">Made to measure</p>
                  <p className="text-[11px] text-slate-200">
                    A small studio focused on fit, fabric, and quiet details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works strip */}
        <section className="grid gap-4 md:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
              1 · Choose
            </p>
            <p className="mt-2 text-slate-200">
              Pick a base piece from a focused men’s and women’s collection—
              shirts, dresses, outerwear and more.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              2 · Adjust
            </p>
            <p className="mt-2 text-slate-200">
              Set your size, share custom measurements, choose colors and add
              clear notes or a reference image.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              3 · We craft
            </p>
            <p className="mt-2 text-slate-200">
              Your order becomes a detailed brief for the tailor, who cuts and
              finishes each piece one at a time.
            </p>
          </div>
        </section>

        {/* Featured products */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Featured pieces
              </p>
              <h2 className="text-lg font-semibold text-slate-50">
                A small starting wardrobe
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs text-sky-300 hover:text-sky-200"
            >
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="text-sm text-slate-400">
              Products will appear here once you add them in Appwrite.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.$id}
                  to={`/product/${p.$id}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden hover:border-sky-300/80 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)] transition"
                >
                  <div className="relative w-full bg-slate-900 overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300/85">
                          {p.category || (p.gender === "women" ? "Womenswear" : "Menswear")}
                        </p>
                        <p className="text-sm font-semibold text-slate-50">
                          {p.name}
                        </p>
                      </div>
                      <p className="rounded-full bg-slate-950/85 px-3 py-1 text-xs font-semibold text-sky-300">
                        INR {p.price}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-[11px] text-slate-300/85 flex items-center justify-between">
                    <span className="line-clamp-1">
                      {p.description || "Tap to customize fit and details."}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sky-300">
                      Open <span aria-hidden>↗</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
                {/* Style stories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Style stories
              </p>
              <h2 className="text-lg font-semibold text-slate-50">
                Outfits built from the same base
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3 text-sm">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.18em] text-sky-300">
                Studio morning
              </p>
              <p className="mt-2 text-slate-200">
                One white shirt, two tweaks: slightly shorter sleeves and a
                softer collar roll. Paired with relaxed trousers for long desk
                days.
              </p>
              <ul className="mt-3 text-[11px] text-slate-400 space-y-1">
                <li>• Base: men&apos;s/women&apos;s relaxed shirt</li>
                <li>• Notes: shorter cuff, no chest pocket</li>
                <li>• Color: off‑white or pale blue</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                Weekend walk
              </p>
              <p className="mt-2 text-slate-200">
                The same shirt, cut a bit longer to sit over leggings or straight
                jeans. Add a light coat in a muted color you pick.
              </p>
              <ul className="mt-3 text-[11px] text-slate-400 space-y-1">
                <li>• Base: long shirt or shirt‑dress</li>
                <li>• Notes: extra length, deeper pockets</li>
                <li>• Color: sage, sand, or charcoal</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.18em] text-amber-300">
                Small event
              </p>
              <p className="mt-2 text-slate-200">
                Swap fabric weight and buttons, keep the fit. Add a note for
                subtle embroidery or contrast stitching only you notice.
              </p>
              <ul className="mt-3 text-[11px] text-slate-400 space-y-1">
                <li>• Base: tailored shirt or dress</li>
                <li>• Notes: embroidery placement, button style</li>
                <li>• Color: deep navy, wine, or black</li>
              </ul>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
