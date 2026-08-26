import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PROGRAMMES } from "@/lib/site";

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Programmes — named owners, stated kill criteria | Think TN" },
      {
        name: "description",
        content:
          "Think TN Foundation programmes: AITN, the tracker portfolio and standing watching briefs. Each has a named owner and published kill criteria.",
      },
      { property: "og:title", content: "Programmes — Think TN Foundation" },
      { property: "og:description", content: "Every programme has a named owner and criteria for stopping it." },
    ],
  }),
  component: ProgrammesIndex,
});

function ProgrammesIndex() {
  return (
    <>
      <PageHeader
        label="Programmes"
        title="A programme with no named owner does not appear here."
        signature="Nor does one with no way to end."
        standfirst="Each programme states who owns it, what stage it is at, and the conditions under which it stops. The kill criteria are written before the work starts, not after it fails."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-px bg-border md:grid-cols-2">
          {PROGRAMMES.map((p) => (
            <LinkCard
              key={p.slug}
              to={`/programmes/${p.slug}`}
              eyebrow={`${p.stage} · owner: ${p.owner}`}
              title={p.name}
              body={p.summary}
              meta="Kill criteria published"
              className="rounded-none border-0 bg-background"
            />
          ))}
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 md:grid-cols-2">
          <div>
            <SectionLabel>The charter gate</SectionLabel>
            <Prose className="mt-6">
              <p>
                Nothing becomes a programme without a written charter: the question, the named
                owner, the data that would settle it, and the conditions under which we would
                admit the answer is no.
              </p>
              <p>The Telos Council holds a veto on any charter that cannot state its kill criteria.</p>
            </Prose>
          </div>
          <div>
            <SectionLabel>The kill gate</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Programmes are reviewed quarterly against their own criteria, not against how much
                has been spent on them so far.
              </p>
              <p>
                When one stops, we publish why. A closed programme is marked closed rather than
                left online to look alive.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="The long horizon"
        title="Programmes are one-year instruments serving a twenty-one-year question."
        cta={{ label: "The Ladder", to: "/ladder" }}
      />
    </>
  );
}
