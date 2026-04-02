import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { getDirection, getLocale } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";

const themeScript = `
(() => {
  const storageKey = "theme-preference";
  const savedTheme = localStorage.getItem(storageKey) || "system";
  const resolvedTheme =
    savedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : savedTheme;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
})();
`;

export const metadata: Metadata = {
  title: "FreeExamPrep",
  description:
    "A modern German exam practice platform for TELC, fide, Goethe, and more with free sample access, saved progress, and community support.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml", rel: "icon" }
    ]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getDirection(locale)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
