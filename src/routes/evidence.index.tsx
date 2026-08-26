import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, TagCensus, TagChip } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { CORRECTIONS_STAT, PUBLICATIONS, TAG_MEANING, TRACKERS, type Tag } from "@/lib/site";

export const Route = createFileRoute("/evidence/")({
  head: () => ({
    meta: [
      { title: "Evidence — trackers, publications, methods, corrections | Think TN" },
      {
        name: "description",
        content:
          "The evidence base of Think TN Foundation: three standing trackers, published papers, the method behind every tag, and the full corrections log.",
      },
      { property: "og:title", content: "Evidence — Think TN Foundation" },
      {
        property: "og:description",
        content: "Trackers, publications, methods and every correction we have published.",
      },
    ],
  }),
  component: EvidenceIndex,
});

function EvidenceIndex() {
  return (
    <>
      <PageHeader
        label="Evidence"
        title="The evidence base, in four parts."
        signature="All of it checkable."
        standfirst="Trackers we maintain, papers we stand behind, the method that produced them, and the log of every time we got it wrong."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2">
          <LinkCard
            to="/evidence/trackers"
            eyebrow="Standing series"
            title="Trackers"
            body="Three series, maintained to one standard, with formulas, sources and retrieval dates published alongside every release."
            meta={`${TRACKERS.length} trackers`}
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/evidence/publications"
            eyebrow="Papers and notes"
            title="Publications"
            body="Working papers, method notes, reports and watching briefs — each with its own tag census on the cover."
            meta={`${PUBLICATIONS.length} published`}
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/evidence/methods"
            eyebrow="How we work"
            title="Methods"
            body="What earns an [A], what is only ever a [B], and why a [C] must never be laundered into either."
            meta="The tag standard"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/evidence/corrections"
            eyebrow="When we are wrong"
            title="Corrections"
            body="Every correction, dated, with what was wrong, what it now says, and who found it."
            meta={`${CORRECTIONS_STAT.count} this year · median ${CORRECTIONS_STAT.medianDays} days`}
            className="rounded-none border-0 bg-background"
          />
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <h2 className="u-h1 max-w-xl">Read the tag before you read the number.</h2>
            <p className="u-body u-measure mt-6 text-muted-foreground">
              The tag is not decoration. It tells you what kind of claim you are looking at,
              and therefore what you may safely do with it.
            </p>
          </div>
          <dl className="grid gap-px self-start bg-border">
            {(Object.keys(TAG_MEANING) as Tag[]).map((t) => (
              <div key={t} className="flex gap-5 bg-background p-6">
                <dt>
                  <TagChip tag={t} />
                </dt>
                <dd className="u-body text-muted-foreground">{TAG_MEANING[t]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section">
          <h2 className="u-h2">Tag census across the three trackers</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {TRACKERS.map((t) => (
              <div key={t.slug}>
                <p className="u-h3">{t.name}</p>
                <p className="u-meta mt-2 text-muted-foreground">{t.version}</p>
                <TagCensus census={t.census} className="mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        label="Disagree with us"
        title="Found something wrong?"
        signature="Tell us and we log it."
        body="Corrections are published with the finder's name, with consent, and with the date we were told rather than the date we fixed it."
        cta={{ label: "Corrections log", to: "/evidence/corrections" }}
      />
    </>
  );
}
