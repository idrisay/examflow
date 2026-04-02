import Link from "next/link";
import { getTranslations } from "@/lib/i18n";

export default async function NotFound() {
  const { messages } = await getTranslations();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--brand)]">
        {messages.notFound.eyebrow}
      </p>
      <h1 className="mt-4 text-5xl font-semibold text-[color:var(--foreground)]">{messages.notFound.title}</h1>
      <p className="mt-4 text-[color:var(--ink-soft)]">{messages.notFound.description}</p>
      <Link
        href="/exams"
        className="mt-8 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)]"
      >
        {messages.notFound.cta}
      </Link>
    </div>
  );
}
