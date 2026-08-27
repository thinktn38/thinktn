import { createFileRoute, notFound } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel, StatTile } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

type Convening = {
  label: string;
  title: string;
  signature?: string;
  standfirst: string;
  facts: { k: string; v: string }[];
  sections: { heading: string; body: string[] }[];
};

const CONVENINGS: Record<string, Convening> = {
  summit: {
    label: "Convening · The summit",
    title: "One day, one question, and a published account of the answers.",
    signature: "No logo beside a finding.",
    standfirst:
      "The annual summit takes a single question the state is arguing about and gives it a full day. The programme is published in advance; the note of what was said is published within ten working days.",
    facts: [
      { k: "Cadence", v: "Annual, February, Chennai" },
      { k: "Next", v: "February 2027 — question announced November 2026" },
      { k: "Record", v: "Published programme and note; sessions not recorded" },
      { k: "Sponsorship", v: "Programme sponsorship only; no logo appears beside any finding" },
    ],
    sections: [
      {
        heading: "How the question is chosen",
        body: [
          "The question is the one where the state's public argument is loudest and its evidence base is thinnest. The Telos Council chooses it, and the choice is published with the arithmetic of why.",
          "A summit that picks a comfortable question is a conference. We are not running a conference.",
        ],
      },
      {
        heading: "What a speaker agrees to",
        body: [
          "Every speaker's slides are checked against the tag standard before the day. A claim on our stage carries the same [A]/[B]/[C] discipline as a claim on this website.",
          "Speakers who cannot source a figure are asked to say so from the stage. Several have. It is usually the best moment of the day.",
        ],
      },
    ],
  },
  roundtables: {
    label: "Convening · Roundtables",
    title: "Twelve to sixteen people, no press, and a note anyway.",
    signature: "Chatham House by default.",
    standfirst:
      "Roundtables are where a finding is stress-tested before publication, or where a question is worked on before it becomes a programme. Closed rooms — but never unrecorded rooms.",
    facts: [
      { k: "Size", v: "12–16 participants, allocated by relevance to the question" },
      { k: "Rule", v: "Chatham House; no press; no photography" },
      { k: "Record", v: "A note of what was discussed, nothing attributed, within ten working days" },
      { k: "Held this year", v: "4, including devolution arithmetic, 6 August 2026" },
    ],
    sections: [
      {
        heading: "Why a closed room still publishes",
        body: [
          "Chatham House protects the who, not the what. The note carries the arguments, the disagreements and the unresolved points — everything except the names.",
          "A closed room with no note is a favour to whoever was invited. We do not run those.",
        ],
      },
      {
        heading: "Getting a seat",
        body: [
          "Seats are allocated by relevance: who is working on the question, who will act on the answer, and who will disagree well. Donation history is not a criterion and is not consulted.",
          "To propose yourself, write with the question you would bring, not the title you hold.",
        ],
      },
    ],
  },
  diaspora: {
    label: "Convening · Diaspora compact",
    title: "A pooled compact, capped so no single member matters too much.",
    signature: "Forty-one members, one rule.",
    standfirst:
      "The diaspora compact pools funding and expertise from Tamils abroad under one restriction: every contribution is unrestricted, and every member's share is capped and published as a band.",
    facts: [
      { k: "Members", v: "41 individuals, as at 18 August 2026" },
      { k: "Pooled band", v: "₹25–50 lakh, unrestricted" },
      { k: "Cap", v: "No member exceeds 3% of the foundation's annual income" },
      { k: "In return", v: "Early access to tracker data and a standing invitation to roundtables" },
    ],
    sections: [
      {
        heading: "Why pooled, why capped",
        body: [
          "A single large diaspora donor would be a relationship to manage. Forty-one capped members are a constituency to answer to. The second is healthier for everyone, including the donor.",
          "The cap is arithmetic, not manners: below 3%, no member's departure can move a programme.",
        ],
      },
      {
        heading: "What members see first",
        body: [
          "Tracker releases reach members forty-eight hours early, complete with tag census and source list. Nothing about the content is negotiable in that window — only errors get fixed, and the fix is logged.",
        ],
      },
    ],
  },
  membership: {
    label: "Convening · Membership",
    title: "What membership buys, and what it can never buy.",
    signature: "The limits are the product.",
    standfirst:
      "Membership funds the institution's spine: the trackers, the corrections workflow, the long-horizon instrument. It buys proximity to the work. It does not buy influence over it.",
    facts: [
      { k: "Individual", v: "₹25,000 a year" },
      { k: "Institutional", v: "₹2,00,000 a year, subject to the concentration cap" },
      { k: "You get", v: "Early data, roundtable seats, the annual self-diagnosis in print" },
      { k: "You never get", v: "Pre-publication sight of findings, a logo beside a finding, a delay" },
    ],
    sections: [
      {
        heading: "The limits, stated before the benefits",
        body: [
          "Sight of a finding before publication. A name beside a tracker, on a page or on a slide. A delay, of any length, for any reason short of a factual error. These are not negotiating positions; they are the charter.",
          "Membership that could buy any of those would make the rest of this website worthless, so it doesn't.",
        ],
      },
      {
        heading: "What your fee actually funds",
        body: [
          "The unglamorous middle: retrieval fees for filings, the corrections workflow, and the forty-eight hours of checking that sits between a draft and a publication.",
          "Every member receives the funding page's figures each year, including what it cost to raise their own fee.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/convening/$slug")({
  loader: ({ params }) => {
    const item = CONVENINGS[params.slug];
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.label.split(" · ")[1] ?? "Convening"} | Think TN` },
      { name: "description", content: loaderData?.standfirst ?? "" },
      { property: "og:title", content: `${loaderData?.label.split(" · ")[1] ?? "Convening"} — Think TN Foundation` },
      { property: "og:description", content: loaderData?.standfirst ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <section className="surface-night">
      <div className="u-container u-section">
        <h1 className="u-h1">That gathering doesn't exist.</h1>
        <p className="u-body mt-4 text-muted-foreground">
          The convening pages are the summit, roundtables, diaspora compact and membership.
        </p>
      </div>
    </section>
  ),
  component: ConveningDetail,
});

function ConveningDetail() {
  const item = Route.useLoaderData();
  return (
    <>
      <PageHeader label={item.label} title={item.title} signature={item.signature} standfirst={item.standfirst} />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The facts, first</SectionLabel>
          <div className="mt-8">
            <KeyValue rows={item.facts} />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-14 md:grid-cols-2">
          {item.sections.map((s) => (
            <div key={s.heading}>
              <SectionLabel>{s.heading}</SectionLabel>
              <Prose className="mt-6 text-muted-foreground">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Prose>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        label="Attend"
        title="Seats follow relevance. Questions follow evidence."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
