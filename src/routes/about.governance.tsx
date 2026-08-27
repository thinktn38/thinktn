import { createFileRoute } from "@tanstack/react-router";
import { AccordionRow, KeyValue, PageHeader, Prose, SectionLabel, StatTile } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PLAYBOOKS } from "@/lib/site";

export const Route = createFileRoute("/about/governance")({
  head: () => ({
    meta: [
      { title: "Governance and independence — the unamendable clause | Think TN" },
      {
        name: "description",
        content:
          "Think TN's independence clause is unamendable, its independence register is published quarterly, and every approach to review or delay a finding is logged. Three recorded; none succeeded.",
      },
      { property: "og:title", content: "Governance and independence — Think TN Foundation" },
      { property: "og:description", content: "The clause is unamendable; the register is public." },
    ],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <>
      <PageHeader
        label="About · Governance and independence"
        title="The clause is unamendable. The register is public. The log has three entries."
        signature="None succeeded."
        standfirst="Independence is not a value statement here; it is a set of mechanisms with a published failure log. A year in which nobody tries to move a finding would mean nobody was recording the attempts."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The mechanisms</SectionLabel>
          <div className="mt-10">
            <KeyValue
              rows={[
                {
                  k: "The unamendable clause",
                  v: "The charter's independence clause cannot be amended by any majority, of any body, ever. Changing it requires dissolving the institution.",
                },
                {
                  k: "The independence register",
                  v: "Every relationship that could touch a finding — funder, counterparty, family — is registered and reviewed quarterly by an independent director. Published.",
                },
                {
                  k: "The approaches log",
                  v: "Every approach to review, delay or soften a finding is logged with date, source class and outcome. Published annually.",
                },
                {
                  k: "The stop authority",
                  v: "The head of methods and corrections may halt any publication. Used twice. Both uses are on the record.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>The approaches log, summarised</SectionLabel>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-3">
            <StatTile value="3" label="Approaches recorded in 2026" tag="A" asAt="18 August 2026" />
            <StatTile value="0" label="Findings changed, reviewed or delayed as a result" tone="indigo" />
            <StatTile value="100%" label="Of approaches published in the annual register" tone="outline" />
          </div>
          <Prose className="u-measure mt-10 text-muted-foreground">
            <p>
              First independence register, published 24 July 2026: three approaches — one funder's
              request to preview a finding, one counterparty's lawyer's letter, one well-meaning
              board query. All declined. All logged. All published.
            </p>
          </Prose>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The playbooks</SectionLabel>
          <p className="u-body u-measure mt-5 text-muted-foreground">
            The written rules the institution runs on. Each is short, each is enforced, and each is
            summarised here in plain language.
          </p>
          <div className="mt-10">
            {PLAYBOOKS.map((p) => (
              <AccordionRow key={p.code} title={p.title} meta={p.code}>
                {p.summary}
              </AccordionRow>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        label="Money"
        title="Governance you can audit ends at the funding page."
        cta={{ label: "Funding and accountability", to: "/about/funding" }}
      />
    </>
  );
}
