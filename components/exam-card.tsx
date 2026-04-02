import Link from "next/link";
import { Clock3, LockKeyhole, Sparkles } from "lucide-react";

type ExamCardProps = {
  exam: {
    title: string;
    slug: string;
    level: string;
    category: string;
    description: string;
    durationMinutes: number;
    questionCount: number;
    isPremium: boolean;
  };
};

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/7">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
          {exam.level}
        </span>
        {exam.isPremium ? (
          <span className="inline-flex items-center gap-2 text-xs text-rose-200">
            <LockKeyhole className="h-4 w-4" />
            Premium support tools
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs text-emerald-200">
            <Sparkles className="h-4 w-4" />
            Free access
          </span>
        )}
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-white">{exam.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{exam.description}</p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
        <span className="rounded-full border border-white/10 px-3 py-1">
          {exam.category}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
          <Clock3 className="h-4 w-4 text-amber-300" />
          {exam.durationMinutes} min
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1">
          {exam.questionCount} questions
        </span>
      </div>

      <Link
        href={`/exams/${exam.slug}`}
        className="mt-8 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition group-hover:bg-amber-200"
      >
        Open exam
      </Link>
    </article>
  );
}
