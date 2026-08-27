import { createFileRoute } from "@tanstack/react-router";
import { AccordionRow, KeyValue, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/about/work-with-us")({
  head: () => ({
    meta: [
      { title: "Work with us — hiring at Think TN | Think TN" },
      {
        name: "description",
        content:
          "How Think TN hires: paid trial work, salary bands published with each role, and the one question every candidate is asked.",
      },
      { property: "og:title", content: "Work with us — Think TN Foundation" },
      { property: "og:description", content: "Paid trial work, published salary bands, one hard question." },
    ],
  }),
  component: WorkWithUs,
});

function WorkWithUs() {
  return (
    <>
      <PageHeader
        label="About · Work with us"
        title="We hire people who would have checked our arithmetic anyway."
        standfirst="The work is retrieval, verification and writing that survives audit. If that sounds slow, it is — and the slowness is the job."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>How hiring works here</SectionLabel>
            <div className="mt-8">
              <KeyValue
                rows={[
                  { k: "Application", v: "A note and one piece of work you are proud of. No cover-letter theatre." },
                  { k: "Trial", v: "A paid half-day of real work, scored by two people who did not interview you." },
                  { k: "Salary", v: "The band is published with the role. The band is the band." },
                  { k: "Interview", v: "One question matters: tell us about a number you were wrong about." },
                ]}
              />
            </div>
          </div>
          <div>
            <SectionLabel>The one question</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Every candidate, for every role, is asked to describe a figure they once got wrong
                and how the error was found. Candidates who cannot produce one have either never
                done verifiable work or never checked it.
              </p>
              <p>
                Both are fine qualities for other institutions. Here, the corrections log is on the
                main navigation, and the people who thrive are the ones who find that comforting
                rather than threatening.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>Open roles</SectionLabel>
          <div className="mt-8">
            <AccordionRow title="Research associate — trackers" meta="R04">
              Retrieval-led work on the MoU Tracker and the announced-to-deployed discount.
              Chennai or remote within India. Band ₹9–14 lakh, published because we mean it.
            </AccordionRow>
            <AccordionRow title="Data engineer — series infrastructure" meta="R05">
              Owns the pipelines that keep three trackers reproducible from public sources.
              Remote within India. Band ₹18–26 lakh.
            </AccordionRow>
            <AccordionRow title="Convening producer" meta="R06">
              Runs the summit and the roundtable calendar, including the published notes.
              Chennai. Band ₹10–15 lakh.
            </AccordionRow>
          </div>
          <p className="u-meta mt-8 text-muted-foreground">
            No role fits? Write to hello@thinktn.org with the work, not the CV.
          </p>
        </div>
      </section>

      <CtaBand
        label="Apply"
        title="Send the work you are proud of. We will read it the way we read filings."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
