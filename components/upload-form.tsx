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
      className="editorial-card space-y-5 rounded-[2rem] p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Your name</label>
          <input
            name="name"
            required
            className="field-input px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Email</label>
          <input
            type="email"
            name="email"
            required
            className="field-input px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Document title</label>
        <input
          name="title"
          required
          className="field-input px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Notes</label>
        <textarea
          name="notes"
          rows={4}
          className="field-input px-4 py-3"
          placeholder="Tell us what this document helps with."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">File</label>
        <input
          type="file"
          name="file"
          required
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          className="block w-full rounded-2xl border border-dashed border-[var(--line)] bg-[color:var(--field-bg)] px-4 py-6 text-sm text-[color:var(--ink-soft)] file:mr-4 file:rounded-full file:border-0 file:bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] file:px-4 file:py-2 file:font-semibold file:text-[color:var(--foreground)]"
        />
      </div>

      {message ? <p className="text-sm text-[color:var(--status-success)]">{message}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] disabled:opacity-70"
      >
        {pending ? "Uploading..." : "Send document"}
      </button>
    </form>
  );
}
