import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/tn/site-chrome";
import {
  FigureBlock,
  GradientRule,
  LinkCard,
  Pill,
  SectionLabel,
  StatTile,
  TagCensus,
  TagChip,
} from "@/components/tn/primitives";
import { SeriesChart } from "@/components/tn/chart";
import {
  CORRECTIONS,
  CORRECTIONS_STAT,
  NEWS,
  PUBLICATIONS,
  TAG_MEANING,
  TRACKERS,
  type Tag,
} from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const lead = TRACKERS[0]!;

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="surface-night">
        <div className="u-container pt-14 pb-16 sm:pt-24 sm:pb-20">
          <SectionLabel>An independent Tamil Nadu policy institution</SectionLabel>
          <h1 className="u-display mt-8 max-w-5xl">
            Every figure on this website carries a tag, a date and a source.
            <span className="u-signature"> Including the ones about us.</span>
          </h1>
          <p className="u-lead u-measure mt-8 text-muted-foreground">
            We are new. That means we cannot ask to be trusted on reputation, so we do the
            other thing: we publish the working, we publish the corrections, and we publish
            who pays for it.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Pill to="/evidence/trackers" tone="primary">
              Start with the trackers
            </Pill>
            <Pill to="/evidence/methods" tone="outline">
              Read how we tag
            </Pill>
          </div>

          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              value={lead.headline.value}
              label="Traced MoU value, announced to drawdown"
              tag={lead.headline.tag}
              asAt={lead.headline.asAt}
              tone="teal"
            />
            <StatTile
              value="₹71.40"
              label="Retained per ₹100 of state-origin income"
              tag="B"
              asAt="31 July 2026"
              tone="indigo"
            />
            <StatTile
              value="48.3%"
              label="Class V pupils reading a Class II text"
              tag="A"
              asAt="30 June 2026"
              tone="outline"
            />
            <StatTile
              value={String(CORRECTIONS_STAT.count)}
              label={`Corrections published this year · median ${CORRECTIONS_STAT.medianDays} days to fix`}
              tag="A"
              asAt={CORRECTIONS_STAT.asAt}
              tone="outline"
            />
          </div>
        </div>
        <GradientRule />
      </section>

      {/* --------------------------------------------------------- tag legend */}
      <section className="surface-cream">
        <div className="u-container u-section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div>
              <SectionLabel>The tag standard</SectionLabel>
              <h2 className="u-h1 mt-6 max-w-xl">
                Three tags. No fourth.
                <span className="u-signature"> An estimate never becomes a fact by repetition.</span>
              </h2>
            </div>
            <dl className="grid gap-px self-start bg-border">
              {(Object.keys(TAG_MEANING) as Tag[]).map((t) => (
                <div key={t} className="flex gap-5 bg-background p-6">
                  <dt className="shrink-0">
                    <TagChip tag={t} />
                  </dt>
                  <dd className="u-body text-muted-foreground">{TAG_MEANING[t]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- lead tracker */}
      <section className="surface-night">
        <div className="u-container u-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>The lead tracker</SectionLabel>
              <h2 className="u-h1 mt-6 max-w-2xl">{lead.name}</h2>
            </div>
            <Pill to="/evidence/trackers" tone="outline">
              All three trackers
            </Pill>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
            <div className="flex flex-col gap-8">
              <FigureBlock figure={lead.headline} arithmetic={lead.formula} />
              <div>
                <p className="u-meta mb-3 text-muted-foreground">Tag census, this release</p>
                <TagCensus census={lead.census} />
              </div>
            </div>
            <SeriesChart series={lead.series} unit="₹ lakh crore" />
          </div>
        </div>
        <GradientRule />
      </section>

      {/* -------------------------------------------------------- publications */}
      <section className="surface-cream">
        <div className="u-container u-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Recent publications</SectionLabel>
              <h2 className="u-h1 mt-6">What we published, and what it costs us to say it.</h2>
            </div>
            <Pill to="/evidence/publications" tone="outline">
              All publications
            </Pill>
          </div>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {PUBLICATIONS.slice(0, 3).map((p) => (
              <LinkCard
                key={p.slug}
                to={`/evidence/publications/${p.slug}`}
                eyebrow={`${p.kind} · ${p.date}`}
                title={p.title}
                body={p.standfirst}
                meta={`${p.pages} pages · ${p.census.A}% [A]`}
                className="rounded-none border-0 bg-background"
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- corrections */}
      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>The corrections log</SectionLabel>
          <h2 className="u-h1 mt-6 max-w-3xl">
            We were wrong {CORRECTIONS_STAT.count} times this year.
            <span className="u-signature"> Here is each one, dated.</span>
          </h2>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {CORRECTIONS.slice(0, 3).map((c) => (
              <li key={c.date + c.document} className="grid gap-3 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                <div className="u-meta text-muted-foreground">
                  <p>{c.date}</p>
                  <p className="mt-1 text-primary">{c.severity}</p>
                </div>
                <div>
                  <p className="u-h3">
                    {c.document} <span className="u-meta text-muted-foreground">{c.version}</span>
                  </p>
                  <p className="u-body u-measure mt-3 text-muted-foreground">{c.wasWrong}</p>
                  <p className="u-body u-measure mt-2">{c.nowSays}</p>
                  <p className="u-meta mt-3 text-muted-foreground">Found by {c.foundBy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Pill to="/evidence/corrections" tone="outline">
              The full log
            </Pill>
          </div>
        </div>
        <GradientRule />
      </section>

      {/* --------------------------------------------------------------- news */}
      <section className="surface-cream">
        <div className="u-container u-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>News</SectionLabel>
              <h2 className="u-h1 mt-6">Latest from the institution</h2>
            </div>
            <Link to="/news" className="u-ui text-primary">
              All news →
            </Link>
          </div>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {NEWS.slice(0, 4).map((n) => (
              <li key={n.slug} className="grid gap-2 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                <p className="u-meta text-muted-foreground">
                  {n.date}
                  <span className="mt-1 block text-primary">{n.kind}</span>
                </p>
                <div>
                  <p className="u-h3">{n.title}</p>
                  <p className="u-body u-measure mt-2 text-muted-foreground">{n.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Do not take our word for any of this."
        signature="Check it."
        body="Every tracker ships its formula, its sources and its retrieval dates. If you find an error, it goes in the log with your name on it, with your consent."
      />
    </>
  );
}
