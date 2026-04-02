"use client";

import { useEffect, useState } from "react";

type HeaderAnnouncementProps = {
  text: string;
};

export function HeaderAnnouncement({ text }: HeaderAnnouncementProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsHidden(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`border-b border-[var(--line)] bg-[color:var(--accent-soft)] transition-all duration-200 ${
        isHidden ? "max-h-0 overflow-hidden border-b-0 opacity-0" : "max-h-16 opacity-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)] lg:px-8">
        {text}
      </div>
    </div>
  );
}
