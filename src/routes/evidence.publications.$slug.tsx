import { createFileRoute, notFound } from "@tanstack/react-router";
import { KeyValue, PageHeader, Pill, Prose, SectionLabel, TagCensus } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { PUBLICATIONS } from "@/lib/site";

export const Route = createFileRoute("/evidence/publications/$slug")({
  loader: ({ params }) => {
    const publication = PUBLICATIONS.find((p) => p.slug === params.slug);
    if (!publication) throw notFound();
    return { publication };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Publication unavailable | Think TN" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.publication;
    return {
      meta: [
        { title: `${p.title} | Think TN` },
        { name: "description", content: p.standfirst.slice(0, 155) },
        { property: "og:title", content: `${p.title} — Think TN Foundation` },
        { property: "og:description", content: p.standfirst.slice(0, 155) },
      ],
    };
  },
  component: PublicationDetail,
});

function PublicationDetail() {
  const { publication: p } = Route.useLoaderData();

  return (
    <>
      <PageHeader label={`${p.kind} · ${p.date}`} title={p.title} standfirst={p.standfirst} />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionLabel>Summary</SectionLabel>
            <Prose className="mt-6">
              <p>
                This document is published in full, with its data appendix, on the day it is
                announced. There is no embargoed version circulated to funders, and no version
                shown to a subject of the research before publication.
              </p>
              <p>
                Where the argument rests on an estimate, the estimate is tagged [C] in the running
                text, not only in a footnote. Where it rests on an organisation's own claim about
                itself, it is tagged [B] and attributed by name.
              </p>
              <p>
                If a figure in this paper is later corrected, the correction appears in the log
                with the version number, and this page will point to the superseding version. We
                do not amend silently.
              </p>
            </Prose>
            <div className="mt-10 flex flex-wrap gap-3">
              <Pill href="#" tone="primary">
                Download the PDF
              </Pill>
              <Pill to="/evidence/methods" tone="outline">
                Method note
              </Pill>
            </div>
          </div>
          <aside className="self-start">
            <p className="u-meta mb-3 text-muted-foreground">Tag census</p>
            <TagCensus census={p.census} />
            <div className="mt-10">
              <KeyValue
                rows={[
                  { k: "Kind", v: p.kind },
                  { k: "Published", v: p.date },
                  { k: "Extent", v: `${p.pages} pages` },
                  { k: "Licence", v: "CC BY 4.0, attribution to Think TN Foundation" },
                  { k: "Corrections", v: "Logged publicly, with the finder named on consent" },
                ]}
              />
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        label="Disagree"
        title="Tell us where this is wrong."
        body="Research correspondence goes to a named human, and material corrections are published with a median turnaround of six days."
        cta={{ label: "Contact research", to: "/contact" }}
      />
    </>
  );
}
