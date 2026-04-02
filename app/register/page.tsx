import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { getTranslations } from "@/lib/i18n";

export default async function RegisterPage() {
  const { messages } = await getTranslations();

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="editorial-card rounded-[2.5rem] p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]">
          {messages.registerPage.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
          {messages.registerPage.title}
        </h1>
        <p className="mt-4 text-[color:var(--ink-soft)]">{messages.registerPage.description}</p>
        <p className="mt-8 text-sm text-[color:var(--ink-soft)]">
          {messages.registerPage.haveAccount}{" "}
          <Link href="/login" className="text-[color:var(--brand)]">
            {messages.registerPage.login}
          </Link>
        </p>
      </div>

      <AuthForm mode="register" copy={messages.authForm} />
    </div>
  );
}
