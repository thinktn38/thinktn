import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose, SectionLabel, StatTile } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { CORRECTIONS, CORRECTIONS_STAT } from "@/lib/site";

export const Route = createFileRoute("/evidence/corrections")({
  head: () => ({
    meta: [
      { title: "Corrections log — every error, dated | Think TN" },
      {
        name: "description",
        content:
          "Think TN Foundation publishes every correction: what was wrong, what it now says, the severity, and who found it. Median time to fix is six days.",
      },
      { property: "og:title", content: "Corrections log — Think TN Foundation" },
      { property: "og:description", content: "Every correction we have published, with dates, severities and finders." },
    ],
  }),
  component: CorrectionsPage,
});

const SEVERITY_TONE: Record<string, string> = {
  Material: "text-primary",
  Minor: "text-muted-foreground",
  Typographic: "text-muted-foreground",
};

function CorrectionsPage() {
  return (
    <>
      <PageHeader
        label="Evidence · Corrections"
        title="A log with nothing in it would mean nobody was checking."
        standfirst="Every correction is published with the date it was raised, the version bump it produced, and the name of whoever found it, where they consent to being named."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <StatTile value={String(CORRECTIONS_STAT.count)} label="Corrections published this year" tag="A" asAt={CORRECTIONS_STAT.asAt} tone="teal" />
            <StatTile value={`${CORRECTIONS_STAT.medianDays} days`} label="Median time from report to published fix" tag="A" asAt={CORRECTIONS_STAT.asAt} tone="indigo" />
            <StatTile value="3" label="Material corrections, the kind that move a headline figure" tag="A" asAt={CORRECTIONS_STAT.asAt} tone="outline" />
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <caption className="sr-only">Corrections log, newest first</caption>
              <thead>
                <tr className="border-y border-border">
                  <th scope="col" className="u-meta py-4 pr-6 font-normal text-muted-foreground">Date</th>
                  <th scope="col" className="u-meta py-4 pr-6 font-normal text-muted-foreground">Document</th>
                  <th scope="col" className="u-meta py-4 pr-6 font-normal text-muted-foreground">What was wrong</th>
                  <th scope="col" className="u-meta py-4 pr-6 font-normal text-muted-foreground">What it now says</th>
                  <th scope="col" className="u-meta py-4 font-normal text-muted-foreground">Found by</th>
                </tr>
              </thead>
              <tbody>
                {CORRECTIONS.map((c) => (
                  <tr key={c.date + c.document} className="border-b border-border align-top">
                    <td className="u-meta py-6 pr-6 whitespace-nowrap text-muted-foreground">
                      {c.date}
                      <span className={`mt-2 block ${SEVERITY_TONE[c.severity]}`}>{c.severity}</span>
                    </td>
                    <td className="u-body py-6 pr-6">
                      {c.document}
                      <span className="u-meta mt-1 block text-muted-foreground">{c.version}</span>
                    </td>
                    <td className="u-body py-6 pr-6 text-muted-foreground">{c.wasWrong}</td>
                    <td className="u-body py-6 pr-6">{c.nowSays}</td>
                    <td className="u-meta py-6 text-muted-foreground">{c.foundBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>The severity ladder</SectionLabel>
            <Prose className="mt-6">
              <p>
                <span className="text-primary">Material</span> — the correction changes a headline
                figure, a ranking, or a conclusion. It is announced, not only logged.
              </p>
              <p>
                <span className="text-primary">Minor</span> — the correction changes a supporting
                figure or a label without moving the argument.
              </p>
              <p>
                <span className="text-primary">Typographic</span> — spelling, a retrieval date, a
                broken reference. Logged anyway, because the boundary is not ours to draw quietly.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>How to report one</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Write to research@thinktn.org with the document, the version and the figure. You
                will get a named human, not an acknowledgement robot.
              </p>
              <p>
                We log the date you told us, not the date we agreed with you. If we disagree, that
                is logged too, with our reasoning, so the disagreement is public rather than
                private.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="Independence"
        title="Nobody outside this building may stop a correction."
        body="The independence clause is unamendable, and the head of methods can halt a publication without consulting the executive."
        cta={{ label: "Governance", to: "/about/governance" }}
      />
    </>
  );
}
