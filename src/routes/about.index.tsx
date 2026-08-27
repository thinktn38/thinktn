import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, Prose, SectionLabel, StatTile } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { CORRECTIONS_STAT } from "@/lib/site";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About — an institution built to be checked | Think TN" },
      {
        name: "description",
        content:
          "Think TN Foundation is a Section 8 research institution in Chennai that publishes evidence about Tamil Nadu with confidence tags, sources and a public corrections log.",
      },
      { property: "og:title", content: "About Think TN Foundation" },
      { property: "og:description", content: "An institution built to be checked." },
    ],
  }),
  component: AboutIndex,
});

function AboutIndex() {
  return (
    <>
      <PageHeader
        label="About"
        title="An institution built to be checked."
        signature="நன்றி."
        standfirst="Think TN Foundation publishes evidence about Tamil Nadu that survives being audited: every figure tagged, every source dated, every error corrected in public. The institution is the method, repeated."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The institution in four figures</SectionLabel>
          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            <StatTile value="3" label="Standing trackers, one standard" tag="A" asAt="18 August 2026" />
            <StatTile
              value={String(CORRECTIONS_STAT.count)}
              label={`Corrections logged, median ${CORRECTIONS_STAT.medianDays} days to publish`}
              tone="indigo"
            />
            <StatTile value="31%" label="Largest funder as a share of income — cap is 35%" tone="outline" tag="A" asAt="31 March 2026" />
            <StatTile value="0" label="Findings delayed at anyone's request" tone="outline" />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>What we are</SectionLabel>
            <Prose className="mt-6">
              <p>
                A Section 8 research institution, founded 2026, registered in Chennai. We run three
                standing trackers, a publications programme, a long-horizon instrument called the
                Ladder, and a convening calendar.
              </p>
              <p>
                Everything we publish carries a confidence tag — [A] verified, [B] claimed, [C]
                estimated — an as-at date and a source. A figure without those three things does
                not go on this website.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>What we are not</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Not a consultancy: we take no contract whose client is named in our trackers. Not an
                advocacy shop: we publish the arithmetic and let others argue. Not a newsroom: we
                update series rather than chase days.
              </p>
              <p>
                And not infallible — which is why the corrections log is on the main navigation, not
                in a footer.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The people and the rules</SectionLabel>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            <LinkCard
              to="/about/research-leadership"
              eyebrow="Research"
              title="Research leadership"
              body="The four people who own the trackers, the methods and the authority to stop a publication."
              meta="Named, with ownership"
              className="rounded-none border-0 bg-background"
            />
            <LinkCard
              to="/about/board"
              eyebrow="Oversight"
              title="Board and Telos Council"
              body="A majority-independent board, an audit chair by charter, and a council that asks the twenty-one-year question."
              meta="Independence stated"
              className="rounded-none border-0 bg-background"
            />
            <LinkCard
              to="/about/governance"
              eyebrow="Rules"
              title="Governance and independence"
              body="The unamendable clause, the independence register, and the approaches log."
              meta="3 approaches recorded, none succeeded"
              className="rounded-none border-0 bg-background"
            />
            <LinkCard
              to="/about/funding"
              eyebrow="Money"
              title="Funding and accountability"
              body="Funder bands, concentration caps, the cost of raising a rupee, and the money we declined."
              meta="₹0.19 to raise a rupee"
              className="rounded-none border-0 bg-background"
            />
            <LinkCard
              to="/about/work-with-us"
              eyebrow="Join"
              title="Work with us"
              body="How we hire, what we pay, and the one question every candidate is asked."
              meta="Open roles"
              className="rounded-none border-0 bg-background"
            />
            <LinkCard
              to="/contact"
              eyebrow="Reach us"
              title="Contact"
              body="A named human within one working day on press; the method inbox for disagreements."
              meta="Four inboxes"
              className="rounded-none border-0 bg-background"
            />
          </div>
        </div>
      </section>

      <CtaBand
        label="Check us"
        title="The fastest way to judge an institution is to read its corrections log."
        cta={{ label: "Read the corrections", to: "/evidence/corrections" }}
      />
    </>
  );
}
