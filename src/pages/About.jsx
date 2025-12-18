// src/pages/About.jsx
export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-18 space-y-12">
        {/* Intro */}
        <header>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            About WearWay
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            A calmer way to shop custom clothing
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            WearWay is a small studio that focuses on refined basics and clear,
            honest customization. No noise, no infinite catalog—just a few
            pieces you can make entirely your own.
          </p>
        </header>

        {/* Three pillars */}
        <section className="grid gap-5 md:grid-cols-3 text-sm text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-xs font-semibold text-sky-300 uppercase tracking-[0.18em]">
              Why we built this
            </p>
            <p className="mt-2 text-sm">
              Most online stores expect you to adapt to fixed sizes and styles.
              WearWay flips that—our base designs are starting points for your
              ideas.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-[0.18em]">
              How it works
            </p>
            <p className="mt-2 text-sm">
              Share your measurements, color preferences, and reference images.
              Our tailors interpret these details and cut each piece to order.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <p className="text-xs font-semibold text-amber-300 uppercase tracking-[0.18em]">
              What we value
            </p>
            <p className="mt-2 text-sm">
              Timeless silhouettes, good fabrics, and respectful communication.
              We want every order to feel like an ongoing conversation, not a
              one‑off transaction.
            </p>
          </div>
        </section>

        {/* Story + image */}
        <section className="grid gap-6 md:grid-cols-[1.1fr,1fr] items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              From measurements to a finished piece
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Each order goes through a quiet, simple process. You choose a
              base, tell us how you like your clothes to sit on your body, and
              attach any reference photos. Our team translates that into clear
              specs for cutting and stitching.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Instead of chasing trends, we refine a small set of silhouettes
              that work in many contexts—office, weekends, small events. Your
              notes shape the details, not an algorithmic “recommended for you”
              section.
            </p>
          </div>
       <div className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden">
  <div className="relative w-full h-72 bg-slate-800">
    <video
      className="w-full h-full object-cover"
      src="/media/about.mp4"   // put about.mp4 in public/media/about.mp4
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
    <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-100">
      <p className="font-semibold">Inside the studio</p>
      <p className="text-[11px] text-slate-200">
        Natural light, measured cuts and calm, deliberate work.
      </p>
    </div>
  </div>
</div>

        </section>

        {/* Small stats row */}
        <section className="grid gap-4 md:grid-cols-3 text-xs text-slate-300">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3">
            <p className="text-2xl font-semibold text-sky-300">3</p>
            <p className="mt-1">base categories: shirts, outerwear and shoes.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3">
            <p className="text-2xl font-semibold text-emerald-300">7+</p>
            <p className="mt-1">measurements you can share for a closer fit.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3">
            <p className="text-2xl font-semibold text-amber-300">1</p>
            <p className="mt-1">piece at a time, made for a real person.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
