import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, TagCensus } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { TRACKERS } from "@/lib/site";

export const Route = createFileRoute("/evidence/trackers/")({
  head: () => ({
    meta: [
      { title: "Trackers — MoU, retained income, learning outcomes | Think TN" },
      {
        name: "description",
        content:
          "Three standing Tamil Nadu data series maintained to one standard: the MoU Tracker, the TN Retained Income series and the Learning-outcome index.",
      },
      { property: "og:title", content: "Trackers — Think TN Foundation" },
      {
        property: "og:description",
        content: "Three Tamil Nadu series with published formulas, sources and retrieval dates.",
      },
    ],
  }),
  component: TrackersIndex,
});

function TrackersIndex() {
  return (
    <>
      <PageHeader
        label="Evidence · Trackers"
        title="Three series we keep, so somebody keeps them."
        standfirst="Each tracker ships with a formula, a source list with retrieval dates, a licence note and a tag census. If we cannot publish those, we do not publish the number."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {TRACKERS.map((t) => (
            <LinkCard
              key={t.slug}
              to={`/evidence/trackers/${t.slug}`}
              eyebrow={`${t.version} · as at ${t.headline.asAt}`}
              title={t.name}
              body={t.standfirst}
              meta={`${t.downloads.toLocaleString("en-IN")} downloads`}
              className="rounded-none border-0 bg-background"
            >
              <div className="mt-6">
                <p className="u-num u-h2">{t.headline.value}</p>
                <TagCensus census={t.census} className="mt-5" compact />
              </div>
            </LinkCard>
          ))}
        </div>
      </section>

      <CtaBand
        label="Use them"
        title="Every tracker downloads as data, not as a picture."
        body="CSV with the same column names as the formula, plus a source sheet carrying retrieval dates and licence terms."
        cta={{ label: "Read the method", to: "/evidence/methods" }}
      />
    </>
  );
}
