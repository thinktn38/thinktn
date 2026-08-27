import { createFileRoute } from "@tanstack/react-router";
import { LinkCard, PageHeader, Prose, SectionLabel } from "@/components/tn/primitives";
import { CtaBand } from "@/components/tn/site-chrome";
import { TRACKERS } from "@/lib/site";

export const Route = createFileRoute("/ta")({
  head: () => ({
    meta: [
      { title: "தமிழ் — திங் TN அறக்கட்டளை | Think TN" },
      {
        name: "description",
        content:
          "திங் TN அறக்கட்டளை: தமிழ்நாடு பற்றிய சான்றுகள், ஒவ்வொரு எண்ணிக்கையும் நம்பிக்கைக் குறியுடன், தேதியுடன், மூலத்துடன்.",
      },
      { property: "og:title", content: "திங் TN அறக்கட்டளை — தமிழ்" },
      { property: "og:description", content: "சரிபார்க்கக்கூடிய சான்றுகள். ஒவ்வொரு எண்ணிக்கையும் குறி, தேதி, மூலம்." },
    ],
  }),
  component: TaPage,
});

function TaPage() {
  return (
    <div lang="ta">
      <PageHeader
        label="தமிழ்"
        title="சரிபார்க்கக்கூடிய சான்றுகள். வேறு எதுவும் இல்லை."
        signature="நன்றி."
        standfirst="திங் TN அறக்கட்டளை தமிழ்நாடு பற்றிய சான்றுகளை வெளியிடுகிறது — ஒவ்வொரு எண்ணிக்கையும் ஒரு நம்பிக்கைக் குறியுடன் [A] சரிபார்க்கப்பட்டது, [B] கூறப்பட்டது, [C] மதிப்பீடு — ஒரு தேதியுடன், ஒரு மூலத்துடன்."
      />

      <section className="surface-cream">
        <div className="u-container u-section grid gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel>நாங்கள் யார்</SectionLabel>
            <Prose className="mt-6">
              <p>
                சென்னையில் பதிவு செய்யப்பட்ட, பிரிவு 8 ஆராய்ச்சி நிறுவனம். மூன்று நிலையான
                கண்காணிப்புகள் (trackers), ஒரு வெளியீட்டுத் திட்டம், மற்றும் 2047-க்கான
                நீண்டகால கருவி — "ஏணி".
              </p>
              <p>
                ஒரு தவறைக் கண்டால், திருத்தம் பதிவு செய்யப்படும் — உங்கள் பெயருடன், உங்கள்
                ஒப்புதலுடன்.
              </p>
            </Prose>
          </div>
          <div>
            <SectionLabel>குறிகள்</SectionLabel>
            <Prose className="mt-6 text-muted-foreground">
              <p>[A] — முதன்மை மூலத்துடன் சரிபார்க்கப்பட்டது.</p>
              <p>[B] — ஒரு நிறுவனத்தின் சொந்தக் கூற்று, அப்படியே தெரிவிக்கப்படுகிறது.</p>
              <p>[C] — ஒரு மதிப்பீடு, எங்கள் கணக்கீடு உட்பட.</p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="surface-night">
        <div className="u-container u-section">
          <SectionLabel>கண்காணிப்புகள்</SectionLabel>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
            {TRACKERS.map((t) => (
              <LinkCard
                key={t.slug}
                to={`/evidence/trackers/${t.slug}`}
                eyebrow={t.version}
                title={t.name}
                body={t.headline.value}
                meta={`as at ${t.headline.asAt}`}
                className="rounded-none border-0 bg-background"
              />
            ))}
          </div>
          <p className="u-meta mt-6 text-muted-foreground" lang="en">
            Full tracker pages are published in English; Tamil summaries follow with each release.
          </p>
        </div>
      </section>

      <CtaBand
        label="தொடர்பு"
        title="கேள்விகள் தமிழிலும் வரவேற்கப்படுகின்றன."
        cta={{ label: "தொடர்பு கொள்ள", to: "/contact" }}
      />
    </div>
  );
}
