import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { CONTACTS } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — a named human within one working day | Think TN" },
      {
        name: "description",
        content:
          "Reach Think TN Foundation: press, research, funding and general inboxes, with who answers each and how fast.",
      },
      { property: "og:title", content: "Contact — Think TN Foundation" },
      { property: "og:description", content: "Four inboxes, each with a named human behind it." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Four inboxes. Each has a named human behind it."
        standfirst="Press gets an answer within one working day. Research disagreements get a better one: an answer that engages with the arithmetic, however long that takes."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <ul className="divide-y divide-border border-y border-border">
            {CONTACTS.map((c) => (
              <li
                key={c.email}
                className="grid gap-3 py-8 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-10"
              >
                <h2 className="u-h3">{c.label}</h2>
                <div>
                  <a href={`mailto:${c.email}`} className="u-h3 u-link-underline text-primary no-underline">
                    {c.email}
                  </a>
                  <p className="u-body mt-2 text-muted-foreground">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>Found an error?</SectionLabel>
            <Prose className="mt-6">
              <p>
                Write to research@thinktn.org with the figure, the page and what you believe is
                wrong. If you are right, the correction is logged with your name — with your
                consent — and the median time to publication is six days.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>Visiting</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                Registered office: Chennai, Tamil Nadu. We do not list a street address because we
                do not receive visitors without an appointment — write first and we will make one.
              </p>
              <p>
                Think TN Foundation is a company licensed under Section 8 of the Companies Act 2013.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="Before you fund"
        title="Read the funding page first. Then write to development."
        cta={{ label: "Funding and accountability", to: "/about/funding" }}
      />
    </>
  );
}
