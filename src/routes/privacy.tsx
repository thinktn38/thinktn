import { createFileRoute } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice — minimal by design | Think TN" },
      {
        name: "description",
        content:
          "What Think TN collects (very little), why, and for how long. No trackers, no advertising pixels, no sale of data.",
      },
      { property: "og:title", content: "Privacy notice — Think TN Foundation" },
      { property: "og:description", content: "Minimal by design." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Legal · Privacy notice"
        title="We measure Tamil Nadu. We do not measure you."
        standfirst="An institution that asks to be trusted with public data should be sparing with private data. This notice is short because the practice is."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The whole practice</SectionLabel>
          <div className="mt-10">
            <KeyValue
              rows={[
                { k: "Analytics", v: "Aggregate page counts only. No cookies, no fingerprinting, no cross-site identifiers." },
                { k: "Email", v: "If you write to us, we keep the correspondence for as long as the matter is live, then for the statutory record period." },
                { k: "Membership", v: "Name, contact and contribution records, held under the Companies Act 2013 and the Income-tax Act." },
                { k: "Corrections", v: "A finder's name is published only with written consent, and only beside the correction they found." },
                { k: "Sale or sharing", v: "Never. There is no advertising on this site and no data leaves the institution except under law." },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>Your rights</SectionLabel>
          <Prose className="mt-6 text-muted-foreground">
            <p>
              You may ask what we hold about you, ask us to correct it, or ask us to delete it
              where the law allows. Write to hello@thinktn.org; a named human answers within one
              working day, and the answer will tell you exactly which records exist.
            </p>
            <p>
              This notice was last amended on 1 July 2026. When it changes, the change is listed on
              this page with a date — the same versioning rule as everything else we publish.
            </p>
          </Prose>
        </div>
      </section>

      <CtaBand
        label="Questions"
        title="Privacy questions go to a human, not a form."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
