import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
        Not Found
      </p>
      <h1 className="mt-4 text-5xl font-semibold text-white">This exam page is missing</h1>
      <p className="mt-4 text-slate-300">
        The page you tried to open does not exist yet, but you can keep exploring
        the public exam library.
      </p>
      <Link
        href="/exams"
        className="mt-8 rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-5 py-3 text-sm font-semibold text-slate-950"
      >
        Browse exams
      </Link>
    </div>
  );
}
