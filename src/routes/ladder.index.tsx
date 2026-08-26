import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, Prose, SectionLabel, StatTile } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/ladder/")({
  head: () => ({
    meta: [
      { title: "The Ladder — Milk, Mountain, Moonshot | Think TN" },
      {
        name: "description",
        content:
          "The Ladder is how Think TN Foundation reasons about a twenty-one-year question: the moonshot at the top, the gating rung below it, and an instrument for scoring both.",
      },
      { property: "og:title", content: "The Ladder — Think TN Foundation" },
      { property: "og:description", content: "The long-horizon instrument: moonshot, gating rung, method, scoreboard." },
    ],
  }),
  component: LadderIndex,
});

function LadderIndex() {
  return (
    <>
      <PageHeader
        label="The Ladder"
        title="A twenty-one-year question, held in public."
        signature="With the rungs where we are failing marked as failing."
        standfirst="The Ladder is the instrument we use to reason about long horizons: what would have to be true, in what order, for Tamil Nadu to be somewhere specific by 2047."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2">
          <LinkCard
            to="/ladder/moonshot"
            eyebrow="Rung one"
            title="The Moonshot"
            body="The single stated outcome for 2047, written narrowly enough that it can be scored rather than admired."
            meta="Stated, dated, falsifiable"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/ladder/gating-rung"
            eyebrow="Rung two"
            title="The gating rung"
            body="The one condition without which the moonshot is arithmetic fiction. Everything else is sequencing."
            meta="Currently scored: failing"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/ladder/method"
            eyebrow="How it works"
            title="The method"
            body="Milk, Mountain, Moonshot: near-term yield, the structural climb, and the horizon outcome, scored on the same scale."
            meta="Applied to ourselves first"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/ladder/scoreboard"
            eyebrow="Where we are"
            title="The 2047 scoreboard"
            body="Each rung, its current score, the date of the score, and the evidence that produced it."
            meta="Updated each quarter"
            className="rounded-none border-0 bg-background"
          />
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>The instrument, run on ourselves</SectionLabel>
          <h2 className="u-h1 mt-6 max-w-3xl">
            We scored ourselves before we scored anybody else.
          </h2>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
            <StatTile value="6 / 11" label="Rungs where our own evidence is adequate" tag="C" asAt="1 July 2026" tone="teal" />
            <StatTile value="2" label="Rungs we scored as failing, published in full" tag="C" asAt="1 July 2026" tone="indigo" />
            <StatTile value="21 yrs" label="Horizon of the question, stated as a date not a mood" tag="A" asAt="1 July 2026" tone="outline" />
          </div>
          <Prose className="mt-12">
            <p>
              A long-horizon claim is easy to make and impossible to be held to, which is why most
              of them are made. The Ladder exists to convert a horizon into a sequence of
              conditions that can each be scored this year.
            </p>
          </Prose>
        </div>
      </section>

      <CtaBand
        label="Self-diagnosis"
        title="Read the two rungs where we marked ourselves as failing."
        cta={{ label: "The 2026 self-diagnosis", to: "/evidence/publications/self-diagnosis-2026" }}
      />
    </>
  );
}
