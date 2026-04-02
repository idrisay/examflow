import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  BookOpenText,
  Mic
} from "lucide-react";

import { ExamCard } from "@/components/exam-card";
import { SectionTitle } from "@/components/section-title";
import { getSampleExams } from "@/lib/sample-data";
import { getTranslations } from "@/lib/i18n";

export default async function HomePage() {
  const { locale, messages } = await getTranslations();
  const sampleExams = getSampleExams(locale);

  return (
    <div className="paper-grid pb-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pt-24">
          <div>
            <p className="inline-flex rounded-full border border-[rgba(47,108,99,0.14)] bg-[rgba(47,108,99,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
              {messages.home.eyebrow}
            </p>
            <h1 className="mt-8 max-w-3xl text-5xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-6xl">
              {messages.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--ink-soft)]">
              {messages.home.description}
            </p>

            <div className="editorial-card mt-8 max-w-2xl rounded-[1.9rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--brand)]">
                {messages.home.panelEyebrow}
              </p>
              <p className="mt-3 text-base font-medium leading-7 text-[color:var(--foreground)]">
                {messages.home.panelText}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                {messages.home.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[var(--line)] bg-white/60 px-6 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                {messages.home.secondaryCta}
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {messages.home.highlights.map(([title, copy]) => (
                <div key={title} className="editorial-card rounded-[1.5rem] p-5">
                  <p className="text-sm font-semibold text-[color:var(--foreground)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="editorial-card rounded-[2.8rem] p-6">
              <div className="rounded-[2rem] border border-[var(--line)] bg-[rgba(255,255,255,0.66)] p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[color:var(--foreground)]">
                    {messages.home.mixTitle}
                  </p>
                  <span className="rounded-full bg-[rgba(47,108,99,0.08)] px-3 py-1 text-xs text-[color:var(--accent)]">
                    {messages.home.mixBadge}
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {messages.home.skills.map((label, index) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--ink-soft)]">
                        <span>{label}</span>
                        <span>{[78, 65, 88, 72][index]}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-[rgba(28,36,49,0.08)]">
                        <div
                          className="h-3 rounded-full bg-[linear-gradient(90deg,var(--brand),var(--brand-2))]"
                          style={{ width: `${[78, 65, 88, 72][index]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: BookOpenText,
                    title: "TELC",
                    copy: "Everyday communication tasks with level-based reading and listening drills."
                  },
                  {
                    icon: AudioLines,
                    title: "Goethe",
                    copy: "Sharper language and exam timing for structured listening and writing practice."
                  },
                  {
                    icon: Mic,
                    title: "fide",
                    copy: "Practical Swiss daily-life scenarios for spoken German and useful responses."
                  }
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-white/60 p-5"
                  >
                    <item.icon className="h-5 w-5 text-[color:var(--brand)]" />
                    <p className="mt-4 text-sm font-semibold text-[color:var(--foreground)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <SectionTitle
          eyebrow={messages.home.featuredEyebrow}
          title={messages.home.featuredTitle}
          description={messages.home.featuredDescription}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {sampleExams.map((exam) => (
            <ExamCard key={exam.slug} exam={exam} copy={messages.common} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-3 lg:px-8">
        {messages.home.cards.map((item, index) => (
          <Link
            key={item[0]}
            href={["/upload", "/support", "/practice"][index]}
            className="editorial-card rounded-[2rem] p-8 transition hover:-translate-y-1"
          >
            <p className="text-2xl font-semibold text-[color:var(--foreground)]">{item[0]}</p>
            <p className="mt-4 text-[color:var(--ink-soft)]">{item[1]}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
