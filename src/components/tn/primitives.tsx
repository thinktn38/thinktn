import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TAG_MEANING, type Figure, type Tag } from "@/lib/site";

/* ------------------------------------------------------------ section label */

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("u-label", className)}>{children}</span>;
}

/* --------------------------------------------------------------- gradient rule */

export function GradientRule({ className }: { className?: string }) {
  return <hr className={cn("u-gradient-rule", className)} aria-hidden="true" />;
}

/* --------------------------------------------------------- confidence tag chip */

const TAG_CLASS: Record<Tag, string> = {
  A: "u-tag-a",
  B: "u-tag-b",
  C: "u-tag-c",
};

export function TagChip({ tag, className }: { tag: Tag; className?: string }) {
  return (
    <abbr
      title={`[${tag}] ${TAG_MEANING[tag]}`}
      tabIndex={0}
      className={cn("u-tag no-underline", TAG_CLASS[tag], className)}
    >
      [{tag}]
    </abbr>
  );
}

/* ---------------------------------------------------------------- tag census */

export function TagCensus({
  census,
  className,
  compact = false,
}: {
  census: { A: number; B: number; C: number };
  className?: string;
  compact?: boolean;
}) {
  const total = census.A + census.B + census.C || 1;
  const rows: { tag: Tag; pct: number; bg: string }[] = [
    { tag: "A", pct: (census.A / total) * 100, bg: "bg-mayil" },
    { tag: "B", pct: (census.B / total) * 100, bg: "bg-indigo" },
    { tag: "C", pct: (census.C / total) * 100, bg: "bg-manjal" },
  ];
  return (
    <div className={cn("w-full", className)}>
      <div
        className="flex h-2 w-full overflow-hidden rounded-full border border-border"
        role="img"
        aria-label={`Tag census: ${census.A}% verified, ${census.B}% claimed, ${census.C}% estimated`}
      >
        {rows.map((r) => (
          <span key={r.tag} className={r.bg} style={{ width: `${r.pct}%` }} />
        ))}
      </div>
      {!compact && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {rows.map((r) => (
            <span key={r.tag} className="u-meta flex items-center gap-2 text-muted-foreground">
              <TagChip tag={r.tag} />
              {Math.round(r.pct)}%
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------- pill button */

type PillProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  tone?: "solid" | "outline" | "primary";
  className?: string;
} & Omit<ComponentProps<"button">, "children" | "tone" | "className">;

export function Pill({ children, to, href, tone = "solid", className, ...rest }: PillProps) {
  const base =
    "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 u-ui no-underline transition-colors duration-300 min-h-11";
  const tones = {
    solid: "bg-foreground text-background hover:bg-primary hover:text-primary-foreground",
    primary: "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
    outline: "border border-current text-foreground hover:bg-foreground hover:text-background",
  } as const;
  const inner = (
    <>
      <span>{children}</span>
      <span
        className="u-arrow-circle size-9 border-current/40 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        <ArrowUpRight />
      </span>
    </>
  );
  const cls = cn(base, tones[tone], className);
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5" strokeLinecap="round" />
      <path d="M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- figure block */

export function FigureBlock({
  figure,
  size = "display",
  arithmetic,
  className,
}: {
  figure: Figure;
  size?: "display" | "h1" | "h2";
  arithmetic?: string;
  className?: string;
}) {
  const sizeClass = size === "display" ? "u-display" : size === "h1" ? "u-h1" : "u-h2";
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className={cn(sizeClass, "u-num")}>
        {figure.value}
        {figure.unit ? <span className="u-h3 ml-2 text-muted-foreground">{figure.unit}</span> : null}
      </p>
      <div className="u-meta flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
        <TagChip tag={figure.tag} />
        <span>as at {figure.asAt}</span>
        {figure.note ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="text-foreground">{figure.note}</span>
          </>
        ) : null}
      </div>
      <p className="u-meta text-muted-foreground">Source: {figure.source}</p>
      {arithmetic ? (
        <details className="group border-t border-border pt-3">
          <summary className="u-meta cursor-pointer list-none text-primary">
            <span className="group-open:hidden">Show the arithmetic +</span>
            <span className="hidden group-open:inline">Hide the arithmetic −</span>
          </summary>
          <p className="u-meta mt-3 leading-relaxed text-muted-foreground">{arithmetic}</p>
        </details>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------------- card */

export function LinkCard({
  to,
  eyebrow,
  title,
  body,
  meta,
  children,
  className,
}: {
  to: string;
  eyebrow?: ReactNode;
  title: string;
  body?: string;
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("u-card group p-6 no-underline sm:p-8", className)}>
      {eyebrow ? <div className="u-meta mb-5 text-muted-foreground">{eyebrow}</div> : null}
      <h3 className="u-h3 pr-10">{title}</h3>
      {body ? <p className="u-body mt-3 text-muted-foreground">{body}</p> : null}
      {children}
      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <div className="u-meta text-muted-foreground">{meta}</div>
        <span className="u-arrow-circle size-11 border-border text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------- accordion */

export function AccordionRow({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <span className="u-meta w-14 shrink-0 text-primary">{meta}</span>
        <span className="u-h3 min-w-0 flex-1">{title}</span>
        <span className="u-meta shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90">
          →
        </span>
      </summary>
      <div className="u-body u-measure pb-6 pl-0 text-muted-foreground sm:pl-18">{children}</div>
    </details>
  );
}

/* ------------------------------------------------------------------ page header */

export function PageHeader({
  label,
  title,
  signature,
  standfirst,
  children,
}: {
  label: string;
  title: ReactNode;
  signature?: ReactNode;
  standfirst?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="surface-night">
      <div className="u-container pt-14 pb-16 sm:pt-20 sm:pb-20">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="u-display mt-7 max-w-4xl">
          {title}
          {signature ? <span className="u-signature"> {signature}</span> : null}
        </h1>
        {standfirst ? (
          <p className="u-lead u-measure mt-7 text-muted-foreground">{standfirst}</p>
        ) : null}
        {children}
      </div>
      <GradientRule />
    </header>
  );
}

/* ------------------------------------------------------------------- stat tile */

export function StatTile({
  value,
  label,
  tag,
  asAt,
  tone = "teal",
}: {
  value: string;
  label: string;
  tag?: Tag;
  asAt?: string;
  tone?: "teal" | "indigo" | "outline";
}) {
  const tones = {
    teal: "surface-teal",
    indigo: "surface-indigo",
    outline: "border border-border",
  } as const;
  return (
    <div className={cn("flex min-h-52 flex-col justify-between p-6 sm:p-7", tones[tone])}>
      <p className="u-h1 u-num">{value}</p>
      <div className="mt-8">
        <p className="u-ui">{label}</p>
        {(tag || asAt) && (
          <p className="u-meta mt-2 flex items-center gap-2 text-muted-foreground">
            {tag ? <TagChip tag={tag} /> : null}
            {asAt ? <span>as at {asAt}</span> : null}
          </p>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- prose helpers */

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("u-body u-measure flex flex-col gap-5", className)}>{children}</div>;
}

export function KeyValue({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {rows.map((r) => (
        <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8">
          <dt className="u-meta text-muted-foreground">{r.k}</dt>
          <dd className="u-body">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
