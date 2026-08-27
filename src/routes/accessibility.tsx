import { createFileRoute } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — WCAG 2.2 AA, tested and logged | Think TN" },
      {
        name: "description",
        content:
          "Think TN's accessibility statement: WCAG 2.2 AA target, keyboard and screen-reader support, shape-encoded charts, and how to report a barrier.",
      },
      { property: "og:title", content: "Accessibility — Think TN Foundation" },
      { property: "og:description", content: "An evidence site that some people cannot read is a failed experiment." },
    ],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <>
      <PageHeader
        label="Legal · Accessibility"
        title="An evidence site some people cannot read is a failed experiment."
        standfirst="We build to WCAG 2.2 AA and test against it. This page states what we do, what we know is imperfect, and how to report a barrier — the report route is a named human, not a form."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>What we do</SectionLabel>
          <div className="mt-10">
            <KeyValue
              rows={[
                { k: "Standard", v: "WCAG 2.2 AA, audited each release against the pages that changed" },
                { k: "Keyboard", v: "Every interactive element reachable and operable; a visible skip link on every page" },
                { k: "Contrast", v: "Text meets 4.5:1 or better; the gold accent never carries text on light surfaces" },
                { k: "Charts", v: "Series differ by shape and dash, never by colour alone; every chart has a text equivalent" },
                { k: "Motion", v: "Animation is decorative only and respects prefers-reduced-motion" },
                { k: "Print", v: "Tracker and publication pages print clean — chrome is removed, sources and tags remain" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Known limits</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Tamil typesetting on older Android browsers can clip diacritics at large text sizes;
                the Tamil landing page compensates with increased line height.
              </p>
              <p>
                Some third-party PDFs we link to are not themselves accessible. Where we quote them,
                the quoted figures appear as text on our pages.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>Report a barrier</SectionLabel>
            <Prose className="mt-6">
              <p>
                Write to hello@thinktn.org with the page and what went wrong. Accessibility defects
                are treated as corrections: logged, dated, and fixed on the same clock as a data
                error — median six days.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="Report"
        title="A barrier is a bug. Bugs get logged and fixed."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
