import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeriesChart } from "@/components/tn/chart";
import {
  FigureBlock,
  KeyValue,
  PageHeader,
  Pill,
  Prose,
  SectionLabel,
  TagCensus,
} from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { TRACKERS } from "@/lib/site";

export const Route = createFileRoute("/evidence/trackers/$slug")({
  loader: ({ params }) => {
    const tracker = TRACKERS.find((t) => t.slug === params.slug);
    if (!tracker) throw notFound();
    return { tracker };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tracker unavailable | Think TN" }, { name: "robots", content: "noindex" }] };
    }
    const t = loaderData.tracker;
    return {
      meta: [
        { title: `${t.name} — ${t.version} | Think TN` },
        { name: "description", content: t.standfirst.slice(0, 155) },
        { property: "og:title", content: `${t.name} — Think TN Foundation` },
        { property: "og:description", content: t.standfirst.slice(0, 155) },
      ],
    };
  },
  component: TrackerDetail,
});

function TrackerDetail() {
  const { tracker: t } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        label={`Tracker · ${t.version}`}
        title={t.name}
        standfirst={t.standfirst}
      />

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div className="flex flex-col gap-10">
            <FigureBlock figure={t.headline} arithmetic={t.formula} />
            <div>
              <p className="u-meta mb-3 text-muted-foreground">Tag census, this release</p>
              <TagCensus census={t.census} />
            </div>
          </div>
          <SeriesChart series={t.series} unit={t.headline.unit ?? "index"} />
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>What it measures</SectionLabel>
            <Prose className="mt-6">
              {t.measures.map((m) => (
                <p key={m}>{m}</p>
              ))}
            </Prose>
          </div>
          <div>
            <SectionLabel>What it does not measure</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              {t.doesNotMeasure.map((m) => (
                <p key={m}>{m}</p>
              ))}
            </Prose>
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>Sources and licences</SectionLabel>
          <h2 className="u-h2 mt-6">Where every input came from, and when we took it.</h2>
          <div className="mt-10">
            <KeyValue
              rows={t.sources.map((s) => ({
                k: s.name,
                v: (
                  <span>
                    Retrieved {s.retrieved}
                    <span className="u-meta block text-muted-foreground">Licence: {s.licence}</span>
                  </span>
                ),
              }))}
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Pill to="/evidence/methods" tone="outline">
              How we tag
            </Pill>
            <Pill to="/evidence/corrections" tone="outline">
              Corrections to this tracker
            </Pill>
          </div>
        </div>
      </section>

      <CtaBand
        label="Kill criteria"
        title="This tracker can be suspended, publicly."
        body="A tracker whose census falls below 50% [A]+[B] for two consecutive releases is suspended until the inputs improve. That rule is not negotiable by a funder."
        cta={{ label: "Programme charters", to: "/programmes/charter-and-kill" }}
      />
    </>
  );
}
