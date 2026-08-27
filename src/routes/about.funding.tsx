import { createFileRoute } from "@tanstack/react-router";
import { FigureBlock, PageHeader, Prose, SectionLabel, TagChip } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { FUNDERS, FUNDING_STATS } from "@/lib/site";

export const Route = createFileRoute("/about/funding")({
  head: () => ({
    meta: [
      { title: "Funding and accountability — bands, caps, refusals | Think TN" },
      {
        name: "description",
        content:
          "Who funds Think TN, in bands: a 31% largest-funder share against a 35% cap, ₹0.19 spent to raise each rupee, and the grants we declined, published.",
      },
      { property: "og:title", content: "Funding and accountability — Think TN Foundation" },
      { property: "og:description", content: "Funder bands, concentration caps, and the money we said no to." },
    ],
  }),
  component: FundingPage,
});

function FundingPage() {
  return (
    <>
      <PageHeader
        label="About · Funding and accountability"
        title="Who funds us, in bands, with the refusals published too."
        signature="Audited, not asserted."
        standfirst="A funding page that lists only friends is marketing. This one lists bands, caps, the cost of raising a rupee, and the money we declined — all from the audited accounts, all tagged."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The three figures that matter</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-3">
            <FigureBlock figure={FUNDING_STATS.concentration} size="h1" />
            <FigureBlock figure={FUNDING_STATS.costToRaise} size="h1" />
            <FigureBlock figure={FUNDING_STATS.reserves} size="h1" />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>Funders, FY2025–26, in bands</SectionLabel>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {FUNDERS.map((f) => (
              <li key={f.name} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,1fr)] sm:gap-8">
                <span className="u-body">{f.name}</span>
                <span className="u-meta u-num text-primary">{f.band}</span>
                <span className="u-meta text-muted-foreground">{f.restricted}</span>
              </li>
            ))}
          </ul>
          <p className="u-meta mt-6 text-muted-foreground">
            Exact amounts within a band are withheld where a funder's privacy requires it; the band
            and the restriction status never are. <TagChip tag="A" /> audited accounts FY2025–26.
          </p>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>Money we declined</SectionLabel>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {FUNDING_STATS.declined.map((d) => (
              <li key={d.what} className="py-7">
                <p className="u-h3">{d.what}</p>
                <p className="u-body mt-3 text-muted-foreground">{d.why}</p>
              </li>
            ))}
          </ul>
          <Prose className="mt-10 text-muted-foreground">
            <p>
              The refusal log is the most important list on this page. An institution that has never
              declined money has either been lucky or quiet, and you cannot tell which from the
              outside. Now you can.
            </p>
          </Prose>
        </div>
      </section>

      <CtaBand
        label="Fund the work"
        title="Read this page first. Then write to development."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
