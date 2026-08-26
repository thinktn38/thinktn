import { createFileRoute } from "@tanstack/react-router";
import { AccordionRow, KeyValue, PageHeader, Prose, SectionLabel, TagChip } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PLAYBOOKS, TAG_MEANING, type Tag } from "@/lib/site";

export const Route = createFileRoute("/evidence/methods")({
  head: () => ({
    meta: [
      { title: "Methods — the confidence-tag standard | Think TN" },
      {
        name: "description",
        content:
          "How Think TN Foundation tags evidence: what earns an [A], what is only ever a [B], why a [C] is never laundered, and the playbooks behind each rule.",
      },
      { property: "og:title", content: "Methods — Think TN Foundation" },
      { property: "og:description", content: "The confidence-tag standard, written down and open to challenge." },
    ],
  }),
  component: MethodsPage,
});

const RULES: { tag: Tag; earns: string; never: string }[] = [
  {
    tag: "A",
    earns:
      "A primary source we can name, retrieve and cite with a date: a statute, an audited account, a filing, a micro-data file we hold.",
    never:
      "A number reported by a newspaper quoting an official. That is a [B] about the newspaper's sourcing, not an [A].",
  },
  {
    tag: "B",
    earns:
      "An organisation's own claim about itself, reported as such and attributed by name — company projections, ministry press releases, investor decks.",
    never:
      "Aggregation into a headline total without the tag travelling with it. A sum of [B]s is a [B], never an [A].",
  },
  {
    tag: "C",
    earns:
      "An estimate, including our own arithmetic, with the formula shown inline and the assumptions stated in the same paragraph.",
    never:
      "Rounding into a cleaner number, or reappearing in a later paper as an input without its tag. That is laundering, and it is the failure mode this standard exists to prevent.",
  },
];

function MethodsPage() {
  return (
    <>
      <PageHeader
        label="Evidence · Methods"
        title="The method is the product."
        signature="The findings are downstream of it."
        standfirst="Anyone can publish a number. The question a reader should be able to answer in ten seconds is: what kind of claim is this, who says so, and when was it true?"
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The three tags</SectionLabel>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {RULES.map((r) => (
              <div key={r.tag} className="bg-background p-7">
                <TagChip tag={r.tag} />
                <p className="u-h3 mt-5">{TAG_MEANING[r.tag]}</p>
                <p className="u-body mt-5 text-muted-foreground">
                  <span className="text-foreground">Earns the tag: </span>
                  {r.earns}
                </p>
                <p className="u-body mt-4 text-muted-foreground">
                  <span className="text-foreground">Never: </span>
                  {r.never}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <SectionLabel>Standing rules</SectionLabel>
            <h2 className="u-h1 mt-6">Six rules that outrank any deadline.</h2>
          </div>
          <div>
            <AccordionRow title="No figure without a tag, a date and a source" meta="01">
              A number that cannot carry all three does not appear on this website, in a paper, or
              in a slide shown at a convening. There is no verbal exception for launches.
            </AccordionRow>
            <AccordionRow title="No silent amendment" meta="02">
              Every change to a published figure produces a version bump and a log entry stating
              what was wrong and what it now says. The previous version stays retrievable.
            </AccordionRow>
            <AccordionRow title="The tag travels with the number" meta="03">
              When a figure is reused in a later publication, its original tag comes with it. A
              [C] cannot become an [A] by changing document.
            </AccordionRow>
            <AccordionRow title="One definition, frozen across years" meta="04">
              A comparable series is worth more than a precise one. Where a definition must change,
              the whole series is restated and the break is marked in the chart.
            </AccordionRow>
            <AccordionRow title="Colour never carries meaning alone" meta="05">
              Every chart series is distinguished by shape and dash pattern as well as colour, and
              every tag has a text label, so the evidence survives being printed in greyscale.
            </AccordionRow>
            <AccordionRow title="Methods publish before findings" meta="06">
              If we cannot describe how a number was produced well enough for a critic to rebuild
              it, the finding waits. This has delayed two publications so far.
            </AccordionRow>
          </div>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <SectionLabel>Playbooks</SectionLabel>
            <h2 className="u-h2 mt-6">The rules exist as documents, not as culture.</h2>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Culture leaves with the person who held it. Each rule above traces to a numbered
                playbook with an owner, a review date and a change history.
              </p>
            </Prose>
          </div>
          <KeyValue
            rows={PLAYBOOKS.map((p) => ({
              k: `${p.code} · ${p.title}`,
              v: p.summary,
            }))}
          />
        </div>
      </section>

      <CtaBand
        label="Test it"
        title="The standard is only worth what a critic can do with it."
        body="If you can rebuild one of our series and get a different answer, we want the working. It goes in the log either way."
        cta={{ label: "Corrections log", to: "/evidence/corrections" }}
      />
    </>
  );
}
