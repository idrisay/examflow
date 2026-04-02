import Link from "next/link";

import { getSession } from "@/lib/auth";
import { HeaderAnnouncement } from "@/components/header-announcement";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color:var(--panel)] backdrop-blur-xl">
      <HeaderAnnouncement />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[color:var(--ink-soft)] md:flex">
          <Link href="/exams" className="transition hover:text-[color:var(--foreground)]">
            Exams
          </Link>
          <Link href="/practice" className="transition hover:text-[color:var(--foreground)]">
            Practice
          </Link>
          <Link href="/upload" className="transition hover:text-[color:var(--foreground)]">
            Upload Docs
          </Link>
          <Link href="/support" className="transition hover:text-[color:var(--foreground)]">
            Support Us
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <>
              <span className="hidden text-sm text-[color:var(--ink-soft)] sm:inline">
                {session.name}
              </span>
              <form action="/api/auth/logout" method="post">
                <button className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[linear-gradient(135deg,var(--brand),var(--brand-2))] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Join free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
