import { createFileRoute, notFound } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PROGRAMMES } from "@/lib/site";

export const Route = createFileRoute("/programmes/$slug")({
  loader: ({ params }) => {
    const programme = PROGRAMMES.find((p) => p.slug === params.slug);
    if (!programme) throw notFound();
    return { programme };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Programme unavailable | Think TN" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.programme;
    return {
      meta: [
        { title: `${p.name} — programme | Think TN` },
        { name: "description", content: p.summary.slice(0, 155) },
        { property: "og:title", content: `${p.name} — Think TN Foundation` },
        { property: "og:description", content: p.summary.slice(0, 155) },
      ],
    };
  },
  component: ProgrammeDetail,
});

function ProgrammeDetail() {
  const { programme: p } = Route.useLoaderData();

  return (
    <>
      <PageHeader label={`Programme · ${p.stage}`} title={p.name} standfirst={p.summary} />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>What it does</SectionLabel>
            <Prose className="mt-6">
              <p>
                The programme runs on published inputs only. Where privileged access would make
                the work easier, we note that it would, and we do not use it — because a finding
                that cannot be rebuilt by a critic is not a finding, it is an assertion.
              </p>
              <p>
                Outputs are released on a stated cadence rather than when they are convenient, and
                each release carries a tag census so a reader can see the evidence base shifting
                over time.
              </p>
            </Prose>
            <div className="mt-10 border-l-2 border-primary pl-6">
              <SectionLabel>Kill criteria</SectionLabel>
              <p className="u-lead mt-4">{p.killCriteria}</p>
            </div>
          </div>
          <aside className="self-start">
            <KeyValue
              rows={[
                { k: "Owner", v: p.owner },
                { k: "Stage", v: p.stage },
                { k: "Review", v: "Quarterly, by the Telos Council" },
                { k: "Inputs", v: "Public sources only" },
                { k: "Charter", v: "Published before work began" },
              ]}
            />
          </aside>
        </div>
      </section>

      <CtaBand
        label="Accountability"
        title="Ask us how this programme is doing against its own criteria."
        cta={{ label: "Contact research", to: "/contact" }}
      />
    </>
  );
}
