"use client";

import { useState } from "react";

export function UploadForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage("");

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setMessage(data.message || data.error || "Finished.");
    setPending(false);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Your name</label>
          <input
            name="name"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Document title</label>
        <input
          name="title"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Notes</label>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          placeholder="Tell us what this document helps with."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">File</label>
        <input
          type="file"
          name="file"
          required
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          className="block w-full rounded-2xl border border-dashed border-white/15 bg-slate-950/80 px-4 py-6 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-amber-300 file:px-4 file:py-2 file:font-semibold file:text-slate-950"
        />
      </div>

      {message ? <p className="text-sm text-amber-100">{message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-70"
      >
        {pending ? "Uploading..." : "Send document"}
      </button>
    </form>
  );
}
