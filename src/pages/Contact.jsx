// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-18">
        <header className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Contact
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
            Tell us what you have in mind
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-xl">
            Use this form to ask about sizing, fabric options, bulk orders or a
            specific design idea. We usually reply within one working day.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr]">
          {/* Form */}
          <form className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/90 px-5 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.85)]">
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Message
              </label>
              <textarea
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 h-28 resize-y focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="Share your idea, sizing questions, or reference links."
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-400/40 hover:bg-sky-300 transition"
            >
              Send message
            </button>
          </form>

          {/* Side info */}
          <aside className="space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.18em]">
                Email
              </p>
              <p className="mt-1 text-sm text-slate-50">
                support@wearway.studio
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Send reference images or moodboards as attachments.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.18em]">
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-slate-50">+91‑00000‑00000</p>
              <p className="mt-1 text-xs text-slate-400">
                Quick questions, order updates, or clarifying measurements.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
