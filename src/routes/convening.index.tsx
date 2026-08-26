import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/convening/")({
  head: () => ({
    meta: [
      { title: "Convening — summit, roundtables, diaspora compact | Think TN" },
      {
        name: "description",
        content:
          "How Think TN Foundation convenes: an annual summit, closed roundtables with published notes, a diaspora compact and a membership with stated limits.",
      },
      { property: "og:title", content: "Convening — Think TN Foundation" },
      { property: "og:description", content: "Rooms with rules: no press, no photography, and a published note." },
    ],
  }),
  component: ConveningIndex,
});

function ConveningIndex() {
  return (
    <>
      <PageHeader
        label="Convening"
        title="Rooms with rules, and a note published afterwards."
        signature="Nothing attributed."
        standfirst="A convening that produces no record is a favour to whoever was in the room. Every gathering we run publishes a note of what was discussed, with nothing attributed to a named participant."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2">
          <LinkCard
            to="/convening/summit"
            eyebrow="Annual"
            title="The summit"
            body="One day, one question, a published programme and a published note. No sponsor logo appears beside a finding."
            meta="Next: February 2027"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/convening/roundtables"
            eyebrow="Quarterly"
            title="Roundtables"
            body="Twelve to sixteen people, no press, no photography, Chatham House by default and a note within ten working days."
            meta="4 held this year"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/convening/diaspora"
            eyebrow="Standing"
            title="Diaspora compact"
            body="A pooled, unrestricted funding and expertise compact with a published cap on any single member's share."
            meta="41 members"
            className="rounded-none border-0 bg-background"
          />
          <LinkCard
            to="/convening/membership"
            eyebrow="Limits first"
            title="Membership"
            body="What membership does buy — early access to data, a seat at roundtables — and what it can never buy."
            meta="Read the limits"
            className="rounded-none border-0 bg-background"
          />
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>What convening cannot buy</SectionLabel>
            <Prose className="mt-6">
              <p>Sight of a finding before publication.</p>
              <p>A name beside a tracker, on a page or on a slide.</p>
              <p>A delay, of any length, for any reason short of a factual error.</p>
            </Prose>
          </div>
          <div>
            <SectionLabel>Why there is no logo wall</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                A logo wall is an endorsement transaction: the institution borrows credibility and
                the logo borrows independence. We publish funder bands instead, which carries the
                same information without the trade.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="Attend"
        title="Roundtable seats are allocated by relevance, not by donation."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
