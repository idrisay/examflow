import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
          Start free
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white">
          Create an account for smarter practice
        </h1>
        <p className="mt-4 text-slate-300">
          Public users can browse questions, but members can save attempts, build
          history, and study with more structure.
        </p>
        <p className="mt-8 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-200">
            Log in
          </Link>
        </p>
      </div>

      <AuthForm mode="register" />
    </div>
  );
}
