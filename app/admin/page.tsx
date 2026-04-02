import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck, Users, WalletCards, Files } from "lucide-react";

import { getProfile } from "@/lib/auth";

export default async function AdminPage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "admin" && profile.role !== "super_admin") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <div className="rounded-[2.5rem] border border-[color:var(--accent)]/20 bg-[color:var(--status-success-soft)] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--status-success)]">
          Admin Area
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">
          Welcome back, {profile.name}
        </h1>
        <p className="mt-4 max-w-2xl text-[color:var(--ink-soft)]">
          This page is protected and only visible to users whose profile role is
          set to `admin` in Supabase.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--foreground)]">
          <span className="rounded-full border border-[var(--line)] px-4 py-2">
            {profile.email}
          </span>
          <span className="rounded-full border border-[color:var(--accent)]/20 bg-[color:var(--status-success-soft)] px-4 py-2 text-[color:var(--status-success)]">
            Role: {profile.role}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: Users,
            title: "Users",
            copy: "Manage learner accounts and promote trusted moderators."
          },
          {
            icon: Files,
            title: "Uploads",
            copy: "Review submitted documents before approving them for use."
          },
          {
            icon: WalletCards,
            title: "Support",
            copy: "Track PayPal contributions that help keep the platform free."
          },
          {
            icon: ShieldCheck,
            title: "Security",
            copy: "Use this area for future admin-only tools and monitoring."
          }
        ].map((item) => (
          <div
            key={item.title}
            className="editorial-card rounded-[2rem] p-6"
          >
            <item.icon className="h-6 w-6 text-[color:var(--brand)]" />
            <h2 className="mt-4 text-xl font-semibold text-[color:var(--foreground)]">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--ink-soft)]">{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="editorial-card mt-10 rounded-[2rem] p-8">
        <p className="text-lg font-semibold text-[color:var(--foreground)]">Next setup steps</p>
        <p className="mt-3 text-[color:var(--ink-soft)]">
          Run the SQL in `supabase/schema.sql`, set your service role key in
          `.env.local`, then run `npm run create:admin` to ensure your admin user
          and profile row exist.
        </p>
        <Link
          href="/support"
          className="mt-6 inline-flex rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--panel-strong)] transition hover:bg-[color:var(--brand)] hover:text-white"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
