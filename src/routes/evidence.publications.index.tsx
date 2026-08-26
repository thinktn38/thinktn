import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, TagCensus } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PUBLICATIONS } from "@/lib/site";

export const Route = createFileRoute("/evidence/publications/")({
  head: () => ({
    meta: [
      { title: "Publications — papers, method notes, briefs | Think TN" },
      {
        name: "description",
        content:
          "Working papers, method notes, reports and watching briefs from Think TN Foundation. Each carries a tag census on the cover.",
      },
      { property: "og:title", content: "Publications — Think TN Foundation" },
      { property: "og:description", content: "Papers and notes, each with a tag census on the cover." },
    ],
  }),
  component: PublicationsIndex,
});

function PublicationsIndex() {
  return (
    <>
      <PageHeader
        label="Evidence · Publications"
        title="Papers that carry their own census."
        signature="On the cover, not in an appendix."
        standfirst="Each publication states how much of it is verified, how much is somebody's claim and how much is our estimate — before you read a word of the argument."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {PUBLICATIONS.map((p) => (
            <LinkCard
              key={p.slug}
              to={`/evidence/publications/${p.slug}`}
              eyebrow={`${p.kind} · ${p.date}`}
              title={p.title}
              body={p.standfirst}
              meta={`${p.pages} pages`}
              className="rounded-none border-0 bg-background"
            >
              <TagCensus census={p.census} className="mt-6" compact />
            </LinkCard>
          ))}
        </div>
      </section>

      <CtaBand
        label="Method first"
        title="If the method is not published, the finding is not published."
        cta={{ label: "Read the methods", to: "/evidence/methods" }}
      />
    </>
  );
}
