import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { RESEARCH_LEADERSHIP } from "@/lib/site";

export const Route = createFileRoute("/about/research-leadership")({
  head: () => ({
    meta: [
      { title: "Research leadership — named owners, stated authority | Think TN" },
      {
        name: "description",
        content:
          "The four people who own Think TN's trackers, methods and corrections — named, with the series each one is accountable for.",
      },
      { property: "og:title", content: "Research leadership — Think TN Foundation" },
      { property: "og:description", content: "Named owners, stated authority." },
    ],
  }),
  component: ResearchLeadership,
});

function ResearchLeadership() {
  return (
    <>
      <PageHeader
        label="About · Research leadership"
        title="Every series has a named owner. The name is the accountability."
        standfirst="A finding you cannot attach to a person is a finding nobody is responsible for. Each of our trackers, methods and the corrections workflow has exactly one owner, listed here."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <ul className="divide-y divide-border border-y border-border">
            {RESEARCH_LEADERSHIP.map((p) => (
              <li key={p.name} className="grid gap-3 py-8 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-10">
                <div>
                  <h2 className="u-h3">{p.name}</h2>
                  <p className="u-meta mt-2 text-primary">{p.role}</p>
                </div>
                <p className="u-body text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>The stop authority</SectionLabel>
            <Prose className="mt-6">
              <p>
                The head of methods and corrections can stop any publication, at any stage, without
                giving a reason to anyone outside the research line. The authority has been used
                twice.
              </p>
              <p>
                Neither stopped paper was quietly shelved: both are listed in the methods appendix
                of the publication that eventually replaced them, with the reason for the stop.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>Why owners, not teams</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Committees write; individuals answer. When a reader finds an error in the MoU
                Tracker, the correction names the series owner as well as the finder. That is the
                entire mechanism, and it works because it is small.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="Disagree"
        title="Method questions and disagreements go to a named human."
        cta={{ label: "Contact research", to: "/contact" }}
      />
    </>
  );
}
