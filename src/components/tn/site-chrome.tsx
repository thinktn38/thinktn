import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV, CONTACTS, type NavItem } from "@/lib/site";
import { ArrowUpRight, GradientRule, Pill, SectionLabel } from "./primitives";
import logoWhite from "@/assets/thinktn-logo-white.png.asset.json";
import logoBlack from "@/assets/thinktn-logo-black.png.asset.json";

export function Wordmark({ tone = "cream", className }: { tone?: "cream" | "ink"; className?: string }) {
  return (
    <img
      src={tone === "cream" ? logoWhite.url : logoBlack.url}
      alt="Think TN Foundation"
      width={514}
      height={195}
      className={cn("h-7 w-auto sm:h-8", className)}
    />
  );
}

/* ------------------------------------------------------------------- header */

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (item: NavItem) =>
    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

  const active = PRIMARY_NAV.find(isActive);

  return (
    <>
      <a
        href="#main"
        className="u-meta u-noprint sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "u-noprint sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md transition-[padding] duration-300",
          condensed ? "py-2" : "py-3.5",
        )}
      >
        <div className="u-container flex items-center gap-6">
          <Link to="/" className="shrink-0" aria-label="Think TN Foundation, home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "u-ui relative rounded-full px-3 py-2 text-foreground/80 no-underline transition-colors hover:text-foreground",
                  isActive(item) && "text-foreground",
                )}
              >
                {item.label}
                {isActive(item) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-primary" aria-hidden="true" />
                )}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <Link
              to="/ta"
              lang="ta"
              className="u-ui hidden rounded-full border border-border px-3.5 py-1.5 no-underline transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            >
              தமிழ்
            </Link>
            <Link
              to="/contact"
              className="u-ui hidden rounded-full bg-foreground px-4 py-2 text-background no-underline transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-border lg:hidden"
            >
              <span className="relative block h-3 w-4.5">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                    open && "-translate-y-1.5 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Secondary pill row — the wayfinding for any section with children */}
      {active?.children && (
        <div className="u-noprint sticky top-[57px] z-40 border-b border-border bg-background/92 backdrop-blur-md">
          <nav
            aria-label={`${active.label} sections`}
            className="u-container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {active.children.map((child) => {
              const current = pathname === child.to;
              return (
                <Link
                  key={child.to}
                  to={child.to}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "u-ui shrink-0 rounded-full border px-4 py-1.5 no-underline transition-colors",
                    current
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                  )}
                >
                  {child.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile overlay */}
      <div
        className={cn(
          "u-noprint fixed inset-0 z-45 flex flex-col bg-background transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="h-[57px] shrink-0" />
        <nav aria-label="Mobile" className="u-container flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="u-h2 border-b border-border py-3 no-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="u-container flex items-center gap-3 pb-10">
          <Link
            to="/ta"
            lang="ta"
            className="u-ui rounded-full border border-border px-4 py-2 no-underline"
          >
            தமிழ்
          </Link>
          <Link to="/contact" className="u-ui rounded-full bg-foreground px-4 py-2 text-background no-underline">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ CTA band */

export function CtaBand({
  label = "Check us",
  title,
  signature,
  body,
  cta = { label: "Start with the trackers", to: "/evidence/trackers" },
}: {
  label?: string;
  title: string;
  signature?: string;
  body?: string;
  cta?: { label: string; to: string };
}) {
  return (
    <section className="surface-teal u-noprint">
      <div className="u-container u-section grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <SectionLabel>{label}</SectionLabel>
          <h2 className="u-h1 mt-6 max-w-2xl">
            {title}
            {signature ? <span className="u-signature"> {signature}</span> : null}
          </h2>
        </div>
        <div className="flex flex-col gap-7">
          {body ? <p className="u-lead text-muted-foreground">{body}</p> : null}
          <Pill to={cta.to} tone="primary" className="self-start">
            {cta.label}
          </Pill>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- footer */

const FOOTER_COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: "Evidence",
    links: [
      { label: "Trackers", to: "/evidence/trackers" },
      { label: "Publications", to: "/evidence/publications" },
      { label: "Methods", to: "/evidence/methods" },
      { label: "Corrections", to: "/evidence/corrections" },
    ],
  },
  {
    heading: "Programmes",
    links: [
      { label: "AITN", to: "/programmes/aitn" },
      { label: "The portfolio", to: "/programmes/portfolio" },
      { label: "Watching briefs", to: "/programmes/watching-briefs" },
      { label: "Charter and kill", to: "/programmes/charter-and-kill" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Overview", to: "/about" },
      { label: "Leadership", to: "/about/research-leadership" },
      { label: "Governance", to: "/about/governance" },
      { label: "Funding", to: "/about/funding" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy notice", to: "/privacy" },
      { label: "Terms of use", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Corrections policy", to: "/evidence/corrections" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="surface-indigo">
      <GradientRule />
      <div className="u-container pt-16 pb-12 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
          <div>
            <p className="u-h2" lang="ta">
              நன்றி
              <span className="u-signature" lang="en">
                {" "}
                — thank you for checking.
              </span>
            </p>
            <p className="u-body u-measure mt-5 text-muted-foreground">
              Every figure on this site carries a confidence tag and a date. If you find one that
              does not, or one that is wrong, tell us and we will log the correction with your name.
            </p>
            <Pill to="/evidence/corrections" tone="outline" className="mt-8">
              The corrections log
            </Pill>
          </div>

          <div>
            <h2 className="u-meta text-muted-foreground">Contact</h2>
            <ul className="mt-5 space-y-3">
              {CONTACTS.map((c) => (
                <li key={c.email} className="u-ui">
                  <span className="text-muted-foreground">{c.label} · </span>
                  <a href={`mailto:${c.email}`} className="u-link-underline">
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="u-meta text-muted-foreground">Follow</h2>
            <ul className="mt-5 space-y-3">
              {["LinkedIn", "X", "YouTube"].map((s) => (
                <li key={s}>
                  <a
                    href="/"
                    className="u-ui inline-flex items-center gap-1.5 no-underline hover:text-primary"
                  >
                    {s}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="u-meta text-muted-foreground">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="u-ui no-underline hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 lg:flex-row lg:items-end lg:justify-between">
          <Wordmark className="h-8 sm:h-9" />
          <p className="u-meta max-w-xl text-muted-foreground">
            © 2026 Think TN Foundation. A company licensed under Section 8 of the Companies Act 2013.
            CIN [pending] · Registered office, Chennai. Founded 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
