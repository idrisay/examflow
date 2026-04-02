"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  mode: "login" | "register";
  copy: {
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    optional: string;
    lastNamePlaceholder: string;
    email: string;
    password: string;
    passwordPlaceholder: string;
    login: string;
    createAccount: string;
    genericError: string;
  };
};

export function AuthForm({ mode, copy }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError("");

    const payload = Object.fromEntries(formData.entries());
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || copy.genericError);
      setPending(false);
      return;
    }

    router.push("/practice");
    router.refresh();
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-5 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20"
    >
      {mode === "register" ? (
        <>
          <div>
            <label className="mb-2 block text-sm text-slate-300">{copy.firstName}</label>
            <input
              name="name"
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder={copy.firstNamePlaceholder}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              {copy.lastName} <span className="text-slate-500">({copy.optional})</span>
            </label>
            <input
              name="lastname"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder={copy.lastNamePlaceholder}
            />
          </div>
        </>
      ) : null}

      <div>
        <label className="mb-2 block text-sm text-slate-300">{copy.email}</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">{copy.password}</label>
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300"
          placeholder={copy.passwordPlaceholder}
        />
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending
          ? "..."
          : mode === "login"
            ? copy.login
            : copy.createAccount}
      </button>
    </form>
  );
}
