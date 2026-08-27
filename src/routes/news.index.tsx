import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { NEWS } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@/components/tn/primitives";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — releases, corrections and convening notes | Think TN" },
      {
        name: "description",
        content:
          "What Think TN has published, corrected and convened — a dated ledger of releases, governance notices and roundtable notes.",
      },
      { property: "og:title", content: "News — Think TN Foundation" },
      { property: "og:description", content: "A dated ledger, not a press page." },
    ],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  return (
    <>
      <PageHeader
        label="News"
        title="A dated ledger, not a press page."
        standfirst="Releases, corrections and convening notes, in date order. Nothing here is a press release in the usual sense — everything links back to the figure, paper or log it refers to."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>2026</SectionLabel>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {NEWS.map((n) => (
              <li key={n.slug}>
                <Link
                  to="/news/$slug"
                  params={{ slug: n.slug }}
                  className="group grid gap-3 py-7 no-underline sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
                >
                  <span className="u-meta text-muted-foreground">
                    {n.date}
                    <span className="mt-1 block text-primary">{n.kind}</span>
                  </span>
                  <span>
                    <span className="u-h3 block pr-4">{n.title}</span>
                    <span className="u-body mt-2 block text-muted-foreground">{n.blurb}</span>
                  </span>
                  <span className="u-arrow-circle size-11 border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        label="Stay current"
        title="Tracker releases reach members forty-eight hours early."
        cta={{ label: "Membership", to: "/convening/membership" }}
      />
    </>
  );
}
