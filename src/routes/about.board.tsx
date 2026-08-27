import { createFileRoute } from "@tanstack/react-router";
import { KeyValue, PageHeader, Prose, SectionLabel, TagChip } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { BOARD, TELOS_COUNCIL } from "@/lib/site";

export const Route = createFileRoute("/about/board")({
  head: () => ({
    meta: [
      { title: "Board and Telos Council — majority independent by charter | Think TN" },
      {
        name: "description",
        content:
          "Think TN's board is majority-independent with an independently chaired Audit & Risk Committee; the Telos Council holds the long-horizon question and a veto on programmes without kill criteria.",
      },
      { property: "og:title", content: "Board and Telos Council — Think TN Foundation" },
      { property: "og:description", content: "Majority independent, by charter rather than convention." },
    ],
  }),
  component: BoardPage,
});

function PersonList({
  people,
  showIndependent = false,
}: {
  people: { name: string; role: string; body: string; independent?: boolean }[];
  showIndependent?: boolean;
}) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {people.map((p) => (
        <li key={p.name} className="grid gap-3 py-8 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-10">
          <div>
            <h3 className="u-h3">{p.name}</h3>
            <p className="u-meta mt-2 flex flex-wrap items-center gap-2 text-primary">
              {p.role}
              {showIndependent && p.independent ? (
                <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">
                  independent
                </span>
              ) : null}
            </p>
          </div>
          <p className="u-body text-muted-foreground">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

function BoardPage() {
  return (
    <>
      <PageHeader
        label="About · Board and Telos Council"
        title="Oversight that is independent by charter, not by convention."
        standfirst="The board is majority-independent, Audit & Risk is chaired by an independent director, and the Telos Council holds a veto it is structurally unable to be lobbied out of."
      />

      <section className="surface-cream">
        <div className="u-container u-section">
          <SectionLabel>The Board</SectionLabel>
          <div className="mt-8">
            <PersonList people={BOARD} showIndependent />
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>The Telos Council</SectionLabel>
          <Prose className="u-measure mt-6 text-muted-foreground">
            <p>
              The Council owns the long-horizon question and runs nothing operational, by design. Its
              one hard power: a veto on any programme that cannot state its kill criteria.
            </p>
          </Prose>
          <div className="mt-8">
            <PersonList people={TELOS_COUNCIL} />
          </div>
        </div>
      </section>

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>How independence is tested</SectionLabel>
            <div className="mt-8">
              <KeyValue
                rows={[
                  { k: "Composition", v: "Three of four directors independent" },
                  { k: "Audit & Risk", v: "Chaired by an independent director — charter, not convention" },
                  { k: "Register", v: "Independence register reviewed quarterly and published" },
                  { k: "Funder relationship", v: "No director may hold one; the chair has none" },
                ]}
              />
            </div>
          </div>
          <div>
            <SectionLabel>What the Council's veto has done</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>
                One proposed programme — a state-skills index — was vetoed in its first quarter
                because its kill criteria were written as aspirations. It returned four months later
                with criteria a failure could actually trip, and was chartered.
              </p>
              <p className="flex items-center gap-2">
                The veto is the Council's only metric. Used once, respected ever since.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <CtaBand
        label="The rules"
        title="The independence clause is unamendable. Read what that means in practice."
        cta={{ label: "Governance and independence", to: "/about/governance" }}
      />
    </>
  );
}
