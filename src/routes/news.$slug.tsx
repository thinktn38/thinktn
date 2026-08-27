import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { NEWS } from "@/lib/site";

const NEWS_BODY: Record<string, { sections: { heading: string; body: string[] }[]; link?: { label: string; to: string } }> = {
  "mou-v1-4": {
    sections: [
      {
        heading: "What happened",
        body: [
          "An external reader, R. Sundaramoorthy, wrote to the method inbox pointing out that two MoUs from the same counterparty, announced eleven months apart, appeared to be the same commitment restated. He was right.",
          "The second announcement superseded the first. The superseded MoU is excluded from v1.4, and the traced total falls by ₹18,400 crore. The announced total is unchanged — the announcement happened — but it no longer counts twice toward traced capital.",
        ],
      },
      {
        heading: "What we changed",
        body: [
          "The tracker now carries a supersession check: any counterparty with two announcements inside twenty-four months is flagged for manual review against the first instrument's terms.",
          "The correction is logged with the finder's name, with his consent, because that is the deal this institution makes with the people who check it.",
        ],
      },
    ],
    link: { label: "Read the MoU Tracker v1.4", to: "/evidence/trackers/mou" },
  },
  "disclosure-paper": {
    sections: [
      {
        heading: "What we checked",
        body: [
          "We asked a simple question of eighteen Indian policy institutions: what do you publish about your own funding? Four publish usable figures. Fourteen publish nothing an outside reader could work with.",
          "The paper does not argue the fourteen are compromised. It argues that nobody can tell, including the fourteen, and that quoting an institution's findings without its funding figures is quoting an advertisement without the small print.",
        ],
      },
      {
        heading: "Our own numbers, same page",
        body: [
          "The paper carries Think TN's own funding disclosure in the same format we ask of others: bands, caps, the cost of raising a rupee, and the refusal log. It would be an odd paper otherwise.",
        ],
      },
    ],
    link: { label: "Read the paper", to: "/evidence/publications/disclosure-eighteen" },
  },
  "roundtable-devolution": {
    sections: [
      {
        heading: "The room",
        body: [
          "Fourteen participants — officials, economists, two journalists writing in their own capacity, and one person who disagreed with everything — met in Chennai on 6 August to work through the arithmetic of fiscal devolution as it bears on the retained-income series.",
          "No press, no photography, Chatham House. The note of what was discussed, with nothing attributed, is published with the series.",
        ],
      },
      {
        heading: "What it changed",
        body: [
          "One argument from the room — that net Union outflow should be presented alongside gross devolution, not instead of it — is adopted in the next release of the retained-income series. The change log will say so.",
        ],
      },
    ],
    link: { label: "The retained-income series", to: "/evidence/trackers/retained-income" },
  },
  "independence-register": {
    sections: [
      {
        heading: "Three approaches, none successful",
        body: [
          "The first annual independence register records three approaches this year to review or delay a finding: a funder's request to preview, a counterparty's lawyer's letter, and a well-meaning query from inside our own governance. All three were declined. All three are logged.",
          "We publish this because the alternative reading of a clean register is not that nobody tries — it is that nobody records. Three entries is what a working defence looks like.",
        ],
      },
      {
        heading: "What the register does not name",
        body: [
          "Sources of approaches are recorded by class — funder, counterparty, internal — not by name. The purpose of the register is to prove the defence holds, not to shame the people who tested it.",
        ],
      },
    ],
    link: { label: "Governance and independence", to: "/about/governance" },
  },
};

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    const body = NEWS_BODY[params.slug];
    if (!item || !body) throw notFound();
    return { ...item, ...body };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "News"} | Think TN` },
      { name: "description", content: loaderData?.blurb ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "News"} — Think TN Foundation` },
      { property: "og:description", content: loaderData?.blurb ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <section className="surface-night">
      <div className="u-container u-section">
        <h1 className="u-h1">That item isn't in the ledger.</h1>
        <p className="u-body mt-4 text-muted-foreground">
          <Link to="/news" className="u-link-underline text-primary">
            Back to news
          </Link>
        </p>
      </div>
    </section>
  ),
  component: NewsDetail,
});

function NewsDetail() {
  const item = Route.useLoaderData();
  return (
    <>
      <PageHeader
        label={`News · ${item.kind} · ${item.date}`}
        title={item.title}
        standfirst={item.blurb}
      />

      <section className="surface-cream">
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
        {item.link ? (
          <div className="u-container pb-16">
            <Link to={item.link.to} className="u-ui u-link-underline text-primary no-underline">
              {item.link.label} →
            </Link>
          </div>
        ) : null}
      </section>

      <CtaBand
        label="The ledger"
        title="Everything we publish, correct or convene lands here, dated."
        cta={{ label: "All news", to: "/news" }}
      />
    </>
  );
}
