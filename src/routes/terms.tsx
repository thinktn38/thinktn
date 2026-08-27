import { createFileRoute } from "@tanstack/react-router";
import { AccordionRow, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — quote us, with the tag attached | Think TN" },
      {
        name: "description",
        content:
          "The terms for using Think TN's published work: quote figures with their confidence tag and as-at date, link back, and respect the licences on underlying sources.",
      },
      { property: "og:title", content: "Terms of use — Think TN Foundation" },
      { property: "og:description", content: "Quote us — with the tag attached." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader
        label="Legal · Terms of use"
        title="Quote us. But quote the tag and the date too."
        standfirst="Our work is published to be used. These terms exist to make sure it is used the way it was measured — with its confidence, its date and its source attached."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The terms, in plain language</SectionLabel>
          <div className="mt-8">
            <AccordionRow title="Quoting figures" meta="T01">
              Any figure from this site may be quoted freely provided its confidence tag ([A], [B]
              or [C]) and as-at date travel with it. A figure stripped of its tag is a
              misquote, and we will say so publicly if we find one.
            </AccordionRow>
            <AccordionRow title="Attribution" meta="T02">
              Attribute to "Think TN Foundation" with a link to the page you drew from. The link
              matters more than the name — it carries the source list and the corrections.
            </AccordionRow>
            <AccordionRow title="Underlying sources" meta="T03">
              Some of our inputs carry their own licences (for example ASER Centre files under CC
              BY-NC, or paid registers we cannot redistribute). Quoting us does not transfer those
              rights; the source list on each tracker says what applies.
            </AccordionRow>
            <AccordionRow title="No warranty, no advice" meta="T04">
              Our work is evidence, not advice. We correct errors fast and in public, but decisions
              taken on our figures are yours. Where a figure is an estimate, it is tagged [C] —
              read the tag before you rely on the number.
            </AccordionRow>
            <AccordionRow title="The site itself" meta="T05">
              Do not scrape in a way that degrades the service, do not misrepresent this site's
              content as your own measurement, and do not use our name to imply endorsement. There
              is no logo wall and there are no testimonials; nothing here endorses anyone.
            </AccordionRow>
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>Governing</SectionLabel>
          <Prose className="mt-6 text-muted-foreground">
            <p>
              These terms are governed by the laws of India, with jurisdiction in Chennai. Last
              amended 1 July 2026; changes are listed on this page with dates, under the same
              versioning rule as our publications.
            </p>
          </Prose>
        </div>
      </section>

      <CtaBand
        label="Unsure?"
        title="If you want to use our work in a way these terms don't cover, ask."
        cta={{ label: "Contact us", to: "/contact" }}
      />
    </>
  );
}
