import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Where the footer switch remembers the chosen theme. */
export const THEME_KEY = "comerz-theme";

/** Page gutter and width every section shares. */
export const WRAP = "mx-auto w-full max-w-[1320px] px-5 md:px-[clamp(20px,5vw,84px)]";

/** Small label over a section heading, with an optional "Nuevo"-style tag. */
export function Eyebrow({ children, tag }: { children: ReactNode; tag?: string }) {
  return (
    <span className="mb-4 inline-flex items-center text-[clamp(16px,1.2vw,18px)] font-light text-fg-muted">
      {children}
      {tag && (
        <span className="ml-2.5 rounded-full bg-(--color-brand-soft) px-2 py-0.75 text-[12px] font-semibold text-(--color-accent)">
          {tag}
        </span>
      )}
    </span>
  );
}

/** The orange "→" text link that closes a feature block. */
export function MoreLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex w-fit items-center gap-1.5 text-[17px] font-medium text-(--color-accent) no-underline transition-opacity hover:opacity-80",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        strokeWidth={2}
        className="size-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
      />
    </a>
  );
}
