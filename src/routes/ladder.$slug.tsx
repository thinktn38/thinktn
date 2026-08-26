import { createFileRoute, notFound } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel, TagChip } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

type Rung = {
  label: string;
  title: string;
  signature?: string;
  standfirst: string;
  body: string[];
  rows: { k: string; v: string }[];
};

const RUNGS: Record<string, Rung> = {
  moonshot: {
    label: "The Ladder · Rung one",
    title: "The Moonshot",
    signature: "One sentence, scored annually.",
    standfirst:
      "By 2047, a child in the bottom-decile district of Tamil Nadu should reach the same measured learning and earning band as a child in the top decile reached in 2026.",
    body: [
      "That sentence is deliberately narrow. It names a population, a comparison, a measure and a date, which means it can be scored against and, eventually, failed against.",
      "We chose a within-state comparison rather than a national or global one because a state government can act on district dispersion. A moonshot nobody in the room can move is a mood, not a target.",
      "The moonshot is restated verbatim in every annual review. If it changes, the change is logged as a material correction to the institution's own record, not quietly reworded.",
    ],
    rows: [
      { k: "Horizon", v: "2047, stated as a year" },
      { k: "Measure", v: "Learning-outcome index and district earning band" },
      { k: "Current score", v: "Rung not yet reachable — see the gating rung" },
      { k: "Reviewed", v: "Annually, published" },
    ],
  },
  "gating-rung": {
    label: "The Ladder · Rung two",
    title: "The gating rung",
    signature: "We currently score this as failing.",
    standfirst:
      "Without comparable district-level data published on a fixed annual cadence, the moonshot cannot be scored at all — so this rung gates every rung above it.",
    body: [
      "A target you cannot measure annually is not a target. Tamil Nadu publishes a great deal, but not on a frozen definition and not on a predictable date, so any series built on it breaks the moment a definition moves.",
      "We score this rung as failing, in public, and we score our own contribution to fixing it as partial: our learning-outcome index holds one definition across eight years, but it covers one task, not the eleven that would be needed.",
      "The honest consequence is that every rung above this one carries a [C] until the data cadence exists. We would rather publish that than imply a precision the inputs cannot support.",
    ],
    rows: [
      { k: "Status", v: "Failing, as at 1 July 2026" },
      { k: "Owner", v: "Dr Surya Prakash, lead on learning outcomes" },
      { k: "What would change it", v: "Eleven measures, one frozen definition, one fixed annual release date" },
      { k: "Our contribution", v: "One measure of the eleven, held stable since 2018" },
    ],
  },
  method: {
    label: "The Ladder · Method",
    title: "Milk, Mountain, Moonshot",
    standfirst:
      "Three horizons scored on the same scale: what the work yields this year, the structural climb it is part of, and the outcome it is ultimately for.",
    body: [
      "Milk is the near-term yield — the tracker release, the correction, the roundtable note. It is the part that keeps an institution honest about being useful now.",
      "Mountain is the structural climb: the definitions, the cadence, the data rights, the boring infrastructure that determines whether anyone can score anything in twenty years.",
      "Moonshot is the horizon outcome. It never justifies skipping the other two. A programme that claims only moonshot value and produces no milk is, in our experience, a programme that has stopped being measured.",
      "Every programme is scored on all three, quarterly, and the scores are published alongside the programme's kill criteria.",
    ],
    rows: [
      { k: "Scale", v: "0–3 on each horizon, with the evidence cited" },
      { k: "Cadence", v: "Quarterly, by the Telos Council" },
      { k: "Applied to", v: "Every programme, including the portfolio itself" },
      { k: "Published", v: "In the annual self-diagnosis, in full" },
    ],
  },
  scoreboard: {
    label: "The Ladder · Scoreboard",
    title: "The 2047 scoreboard",
    standfirst:
      "Eleven rungs, each with a current score, a date and the evidence behind it. Six are adequate, three are thin, two are failing.",
    body: [
      "The scoreboard is not a dashboard. It carries no gauges, no traffic lights and no aggregate index, because an aggregate would let a failing rung hide behind five comfortable ones.",
      "Each rung is scored against its own stated condition, and the tag on the underlying evidence is shown beside the score. A rung scored well on [C] evidence is reported as exactly that.",
      "Where a score improves, we state whether it improved because the world changed or because our measurement did. Those are different events and conflating them is the most common way a scoreboard becomes propaganda.",
    ],
    rows: [
      { k: "Rungs", v: "11" },
      { k: "Adequate", v: "6, as at 1 July 2026" },
      { k: "Thin", v: "3, evidence base below the [A]+[B] floor" },
      { k: "Failing", v: "2, including the gating rung" },
    ],
  },
};

export const Route = createFileRoute("/ladder/$slug")({
  loader: ({ params }) => {
    const rung = RUNGS[params.slug];
    if (!rung) throw notFound();
    return { rung };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable | Think TN" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.rung;
    return {
      meta: [
        { title: `${r.title} — The Ladder | Think TN` },
        { name: "description", content: r.standfirst.slice(0, 155) },
        { property: "og:title", content: `${r.title} — Think TN Foundation` },
        { property: "og:description", content: r.standfirst.slice(0, 155) },
      ],
    };
  },
  component: RungPage,
});

function RungPage() {
  const { rung } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        label={rung.label}
        title={rung.title}
        signature={rung.signature}
        standfirst={rung.standfirst}
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>In detail</SectionLabel>
            <Prose className="mt-6">
              {rung.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </Prose>
            <p className="u-meta mt-8 flex items-center gap-3 text-muted-foreground">
              <TagChip tag="C" />
              Long-horizon scores are estimates, and are tagged as such wherever they appear.
            </p>
          </div>
          <aside className="self-start">
            <KeyValue rows={rung.rows} />
          </aside>
        </div>
      </section>

      <CtaBand
        label="The whole ladder"
        title="A rung only means something in sequence."
        cta={{ label: "Back to the Ladder", to: "/ladder" }}
      />
    </>
  );
}
