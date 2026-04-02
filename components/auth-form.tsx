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
      className="editorial-card space-y-5 rounded-[2rem] p-8"
    >
      {mode === "register" ? (
        <>
          <div>
            <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">{copy.firstName}</label>
            <input
              name="name"
              required
              className="field-input px-4 py-3"
              placeholder={copy.firstNamePlaceholder}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">
              {copy.lastName} <span className="text-[color:var(--field-placeholder)]">({copy.optional})</span>
            </label>
            <input
              name="lastname"
              className="field-input px-4 py-3"
              placeholder={copy.lastNamePlaceholder}
            />
          </div>
        </>
      ) : null}

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">{copy.email}</label>
        <input
          type="email"
          name="email"
          required
          className="field-input px-4 py-3"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[color:var(--ink-soft)]">{copy.password}</label>
        <input
          type="password"
          name="password"
          required
          className="field-input px-4 py-3"
          placeholder={copy.passwordPlaceholder}
        />
      </div>

      {error ? <p className="text-sm text-[color:var(--status-danger)]">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
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
