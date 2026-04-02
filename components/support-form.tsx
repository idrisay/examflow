"use client";

import { useState } from "react";

import { formatCurrency } from "@/lib/utils";

const presets = [5, 15, 30, 50];

export function SupportForm() {
  const [selectedAmount, setSelectedAmount] = useState(15);
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      amount: Number(formData.get("amount")),
      message: formData.get("message")
    };

    const response = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json()) as { message?: string; error?: string };
    setMessage(data.message || data.error || "Finished.");
  }

  return (
    <form
      action={handleSubmit}
      className="editorial-card space-y-5 rounded-[2rem] p-8"
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {presets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setSelectedAmount(amount)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selectedAmount === amount
                ? "border-[color:var(--brand)] bg-[color:var(--status-success-soft)] text-[color:var(--foreground)]"
                : "border-[var(--line)] bg-[color:var(--surface-muted)] text-[color:var(--ink-soft)]"
            }`}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      <input type="hidden" name="amount" value={selectedAmount} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Name</label>
          <input
            name="name"
            required
            className="field-input px-4 py-3"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Email</label>
          <input
            name="email"
            type="email"
            required
            className="field-input px-4 py-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">Message</label>
        <textarea
          name="message"
          rows={4}
          className="field-input px-4 py-3"
          placeholder="Optional encouragement for the project."
        />
      </div>

      {message ? <p className="text-sm text-[color:var(--status-success)]">{message}</p> : null}

      <button className="rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--panel-strong)] transition hover:bg-[color:var(--brand)] hover:text-white">
        Support this free platform
      </button>
    </form>
  );
}
