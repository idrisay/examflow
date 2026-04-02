import Link from "next/link";

import { getSession } from "@/lib/auth";
import { Logo } from "@/components/logo";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/exams" className="transition hover:text-white">
            Exams
          </Link>
          <Link href="/practice" className="transition hover:text-white">
            Practice
          </Link>
          <Link href="/upload" className="transition hover:text-white">
            Upload Docs
          </Link>
          <Link href="/support" className="transition hover:text-white">
            Support Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="hidden text-sm text-slate-300 sm:inline">
                {session.name}
              </span>
              <form action="/api/auth/logout" method="post">
                <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-300 hover:text-amber-200">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-amber-300 hover:text-amber-200"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Start free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
