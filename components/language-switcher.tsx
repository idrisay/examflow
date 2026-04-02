"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  options: Array<{ value: Locale; label: string }>;
};

export function LanguageSwitcher({
  currentLocale,
  label,
  options
}: LanguageSwitcherProps) {
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    document.cookie = `preferred-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm text-[color:var(--foreground)]">
      <Globe className="h-4 w-4 text-[color:var(--brand)]" />
      <span className="sr-only">{label}</span>
      <select
        value={currentLocale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        aria-label={label}
        className="max-w-24 bg-transparent text-sm font-medium text-[color:var(--foreground)] outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
