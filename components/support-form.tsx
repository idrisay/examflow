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
      className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8"
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {presets.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setSelectedAmount(amount)}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              selectedAmount === amount
                ? "border-amber-300 bg-amber-300/10 text-amber-100"
                : "border-white/10 bg-slate-950/70 text-slate-300"
            }`}
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>

      <input type="hidden" name="amount" value={selectedAmount} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Name</label>
          <input
            name="name"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-amber-300"
          placeholder="Optional encouragement for the project."
        />
      </div>

      {message ? <p className="text-sm text-amber-100">{message}</p> : null}

      <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
        Support this free platform
      </button>
    </form>
  );
}
