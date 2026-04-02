type LogoProps = {
  tagline: string;
};

export function Logo({ tagline }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="soft-ring flex h-12 w-12 items-center justify-center overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white">
        <img
          src="/icon.svg"
          alt="FreeExamPrep logo"
          className="h-10 w-10 object-contain object-center"
        />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
          FreeExamPrep
        </p>
        <p className="text-xs text-[color:var(--ink-soft)]">{tagline}</p>
      </div>
    </div>
  );
}
