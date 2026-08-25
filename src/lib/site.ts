/**
 * Think TN Foundation — single source of content truth.
 *
 * House rule (Website Strategy §7.3): no figure exists in this file without a
 * confidence tag, an as-at date and a source. The Figure type enforces it.
 */

export type Tag = "A" | "B" | "C";

export const TAG_MEANING: Record<Tag, string> = {
  A: "Verified against a primary source.",
  B: "An organisation's own claim, reported as such.",
  C: "An estimate, including our own arithmetic.",
};

export type Figure = {
  value: string;
  unit?: string;
  tag: Tag;
  asAt: string;
  source: string;
  note?: string;
};

export type NavChild = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Evidence",
    to: "/evidence",
    children: [
      { label: "Trackers", to: "/evidence/trackers" },
      { label: "Publications", to: "/evidence/publications" },
      { label: "Methods", to: "/evidence/methods" },
      { label: "Corrections", to: "/evidence/corrections" },
    ],
  },
  {
    label: "Programmes",
    to: "/programmes",
    children: [
      { label: "AITN", to: "/programmes/aitn" },
      { label: "The portfolio", to: "/programmes/portfolio" },
      { label: "Watching briefs", to: "/programmes/watching-briefs" },
      { label: "How a programme starts and stops", to: "/programmes/charter-and-kill" },
    ],
  },
  {
    label: "The Ladder",
    to: "/ladder",
    children: [
      { label: "The Moonshot", to: "/ladder/moonshot" },
      { label: "The gating rung", to: "/ladder/gating-rung" },
      { label: "The method", to: "/ladder/method" },
      { label: "The 2047 scoreboard", to: "/ladder/scoreboard" },
    ],
  },
  {
    label: "Convening",
    to: "/convening",
    children: [
      { label: "The summit", to: "/convening/summit" },
      { label: "Roundtables", to: "/convening/roundtables" },
      { label: "Diaspora compact", to: "/convening/diaspora" },
      { label: "Membership", to: "/convening/membership" },
    ],
  },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Overview", to: "/about" },
      { label: "Research leadership", to: "/about/research-leadership" },
      { label: "Board and Telos Council", to: "/about/board" },
      { label: "Governance and independence", to: "/about/governance" },
      { label: "Funding and accountability", to: "/about/funding" },
      { label: "Work with us", to: "/about/work-with-us" },
    ],
  },
  { label: "News", to: "/news" },
];

export type Tracker = {
  slug: string;
  name: string;
  standfirst: string;
  headline: Figure;
  measures: string[];
  doesNotMeasure: string[];
  formula: string;
  sources: { name: string; retrieved: string; licence: string }[];
  census: { A: number; B: number; C: number };
  downloads: number;
  series: { label: string; points: { x: string; y: number }[] }[];
  version: string;
};

export const TRACKERS: Tracker[] = [
  {
    slug: "mou",
    name: "MoU Tracker",
    standfirst:
      "Every investment memorandum of understanding announced for Tamil Nadu since January 2021, traced from announcement to signature to first drawdown.",
    headline: {
      value: "₹4.62 lakh crore",
      tag: "C",
      asAt: "18 August 2026",
      source: "Guidance Tamil Nadu releases; company filings; MCA charge data",
      note: "Announced-to-deployed discount applied: 60–80%",
    },
    measures: [
      "MoUs announced publicly by the State or by the counterparty, with a rupee value attached.",
      "Whether a signed instrument exists, and whether any capital expenditure has been recorded against it.",
      "The gap, in months, between announcement and first verifiable drawdown.",
    ],
    doesNotMeasure: [
      "Employment. Job figures in MoUs are counterparty projections, tagged [B] at best, and we do not aggregate them.",
      "Investment that never took the MoU route, which for mid-market manufacturing is substantial.",
      "Whether a deployed rupee was well spent. That is a different question and we do not pretend to answer it here.",
    ],
    formula:
      "traced = Σ(announced_value × signature_flag × drawdown_evidence_weight), where drawdown_evidence_weight ∈ {0, 0.4, 0.8, 1.0} by evidence class. The published headline is the traced sum, not the announced sum.",
    sources: [
      { name: "Guidance Tamil Nadu press releases", retrieved: "12 August 2026", licence: "Government of TN, open" },
      { name: "MCA21 charge and filing register", retrieved: "14 August 2026", licence: "Paid, redistribution restricted" },
      { name: "Counterparty annual reports and investor decks", retrieved: "16 August 2026", licence: "Public, quoted under fair dealing" },
    ],
    census: { A: 34, B: 41, C: 25 },
    downloads: 1284,
    series: [
      {
        label: "Announced",
        points: [
          { x: "2021", y: 2.1 },
          { x: "2022", y: 4.4 },
          { x: "2023", y: 6.9 },
          { x: "2024", y: 9.8 },
          { x: "2025", y: 12.6 },
          { x: "2026", y: 14.1 },
        ],
      },
      {
        label: "Traced to signature",
        points: [
          { x: "2021", y: 1.2 },
          { x: "2022", y: 2.4 },
          { x: "2023", y: 3.6 },
          { x: "2024", y: 4.9 },
          { x: "2025", y: 6.0 },
          { x: "2026", y: 6.7 },
        ],
      },
      {
        label: "Traced to drawdown",
        points: [
          { x: "2021", y: 0.6 },
          { x: "2022", y: 1.1 },
          { x: "2023", y: 1.9 },
          { x: "2024", y: 2.9 },
          { x: "2025", y: 4.0 },
          { x: "2026", y: 4.62 },
        ],
      },
    ],
    version: "v1.4",
  },
  {
    slug: "retained-income",
    name: "TN Retained Income series",
    standfirst:
      "What a rupee earned in Tamil Nadu retains after transfers, and where the retention sits by district decile.",
    headline: {
      value: "₹71.40",
      tag: "B",
      asAt: "31 July 2026",
      source: "Finance Accounts of Tamil Nadu; Union Finance Commission devolution tables",
      note: "Retained per ₹100 of state-origin income, FY2025–26 provisional",
    },
    measures: [
      "State-origin income, net of Union transfers in and out, on the Finance Accounts definition.",
      "District-decile dispersion of retention, so a state average cannot hide a district collapse.",
    ],
    doesNotMeasure: [
      "Household disposable income. This is a fiscal series, not a welfare series.",
      "Informal-sector income, which the Finance Accounts do not capture and we do not model.",
    ],
    formula:
      "retained_per_100 = 100 × (state_origin_income − net_union_outflow) / state_origin_income, on provisional accounts, restated when the audited accounts land.",
    sources: [
      { name: "Finance Accounts of Tamil Nadu, provisional", retrieved: "22 July 2026", licence: "CAG, open" },
      { name: "Fifteenth Finance Commission devolution tables", retrieved: "22 July 2026", licence: "GoI, open" },
    ],
    census: { A: 58, B: 31, C: 11 },
    downloads: 942,
    series: [
      {
        label: "Retained per ₹100",
        points: [
          { x: "FY21", y: 68.2 },
          { x: "FY22", y: 69.1 },
          { x: "FY23", y: 70.0 },
          { x: "FY24", y: 70.6 },
          { x: "FY25", y: 71.1 },
          { x: "FY26", y: 71.4 },
        ],
      },
      {
        label: "Bottom-decile districts",
        points: [
          { x: "FY21", y: 54.0 },
          { x: "FY22", y: 54.9 },
          { x: "FY23", y: 55.2 },
          { x: "FY24", y: 55.0 },
          { x: "FY25", y: 55.8 },
          { x: "FY26", y: 56.3 },
        ],
      },
    ],
    version: "v2.1",
  },
  {
    slug: "learning-outcomes",
    name: "Learning-outcome index",
    standfirst:
      "Grade-appropriate reading and arithmetic by district, held to one definition across years so the series can actually be compared.",
    headline: {
      value: "48.3%",
      tag: "A",
      asAt: "30 June 2026",
      source: "ASER district files; State assessment micro-data, obtained on request",
      note: "Class V pupils reading a Class II text, state weighted",
    },
    measures: [
      "One task, one definition, one age band, repeated. Comparability is the whole product.",
      "District spread, reported as the gap between the top and bottom decile rather than as a mean.",
    ],
    doesNotMeasure: [
      "School quality. A district's score moves for reasons that have nothing to do with its teachers.",
      "Anything about individual schools. We do not publish school-level data and will not.",
    ],
    formula:
      "index = Σ(district_pass_rate × enrolment_weight) / Σ(enrolment_weight), with the task definition frozen at the 2018 wording.",
    sources: [
      { name: "ASER Centre district files", retrieved: "5 June 2026", licence: "CC BY-NC" },
      { name: "State assessment micro-data", retrieved: "19 June 2026", licence: "Obtained on request, not redistributable" },
    ],
    census: { A: 71, B: 19, C: 10 },
    downloads: 613,
    series: [
      {
        label: "State weighted",
        points: [
          { x: "2018", y: 44.1 },
          { x: "2020", y: 41.7 },
          { x: "2022", y: 43.9 },
          { x: "2024", y: 46.8 },
          { x: "2026", y: 48.3 },
        ],
      },
      {
        label: "Bottom-decile districts",
        points: [
          { x: "2018", y: 29.0 },
          { x: "2020", y: 25.4 },
          { x: "2022", y: 28.1 },
          { x: "2024", y: 31.2 },
          { x: "2026", y: 33.0 },
        ],
      },
    ],
    version: "v1.2",
  },
];

export type Publication = {
  slug: string;
  title: string;
  kind: string;
  date: string;
  standfirst: string;
  census: { A: number; B: number; C: number };
  pages: number;
};

export const PUBLICATIONS: Publication[] = [
  {
    slug: "disclosure-eighteen",
    title: "Eighteen institutions, four disclosures",
    kind: "Working paper",
    date: "14 August 2026",
    standfirst:
      "We checked what eighteen Indian policy institutions publish about their own funding. Four publish usable figures. The rest of this paper is about what that means for anyone quoting them.",
    census: { A: 76, B: 14, C: 10 },
    pages: 34,
  },
  {
    slug: "announced-to-deployed",
    title: "The announced-to-deployed discount",
    kind: "Method note",
    date: "2 August 2026",
    standfirst:
      "Why a headline investment figure for any Indian state should be read at 20–40% of face value, and how to compute the discount from public filings alone.",
    census: { A: 41, B: 32, C: 27 },
    pages: 22,
  },
  {
    slug: "district-not-destiny",
    title: "District is not destiny — yet it predicts almost everything",
    kind: "Report",
    date: "21 July 2026",
    standfirst:
      "Ranking Tamil Nadu's districts on eleven outcome measures held to one definition, and asking which of the eleven a state government can actually move within a term.",
    census: { A: 63, B: 22, C: 15 },
    pages: 88,
  },
  {
    slug: "self-diagnosis-2026",
    title: "Milk, Mountain, Moonshot: our own 2026 self-diagnosis",
    kind: "Self-diagnosis",
    date: "1 July 2026",
    standfirst:
      "We ran our own instrument on ourselves and published the result, including the two rungs where we scored ourselves as failing.",
    census: { A: 22, B: 18, C: 60 },
    pages: 19,
  },
  {
    slug: "aitn-baseline",
    title: "AITN baseline: what Tamil Nadu can measure about its own AI capacity",
    kind: "Working paper",
    date: "9 June 2026",
    standfirst:
      "A capacity baseline built only from data that already exists, so it can be repeated annually by anyone, including people who disagree with us.",
    census: { A: 39, B: 44, C: 17 },
    pages: 41,
  },
  {
    slug: "watching-brief-water",
    title: "Watching brief: the Chennai water balance",
    kind: "Watching brief",
    date: "27 May 2026",
    standfirst:
      "A standing brief we update rather than republish. It carries a change log because the underlying figures move monthly.",
    census: { A: 52, B: 30, C: 18 },
    pages: 12,
  },
];

export type Correction = {
  date: string;
  document: string;
  version: string;
  wasWrong: string;
  nowSays: string;
  severity: "Material" | "Minor" | "Typographic";
  foundBy: string;
};

export const CORRECTIONS: Correction[] = [
  {
    date: "16 August 2026",
    document: "MoU Tracker",
    version: "v1.3 → v1.4",
    wasWrong:
      "Two MoUs from the same counterparty, announced eleven months apart, were counted separately. The second superseded the first.",
    nowSays: "The superseded MoU is excluded. The traced total falls by ₹18,400 crore.",
    severity: "Material",
    foundBy: "R. Sundaramoorthy, external reader",
  },
  {
    date: "4 August 2026",
    document: "The announced-to-deployed discount",
    version: "v1.0 → v1.1",
    wasWrong: "The worked example applied the discount to a nominal figure and compared it to a real one.",
    nowSays: "Both sides of the comparison are nominal, and the deflator used is stated.",
    severity: "Material",
    foundBy: "Internal review",
  },
  {
    date: "29 July 2026",
    document: "TN Retained Income series",
    version: "v2.0 → v2.1",
    wasWrong: "FY24 was described as audited. It was provisional at the time of publication.",
    nowSays: "FY24 is marked provisional and the tag is corrected from [A] to [B].",
    severity: "Material",
    foundBy: "Anonymous, by email",
  },
  {
    date: "11 July 2026",
    document: "District is not destiny",
    version: "v1.1 → v1.2",
    wasWrong: "Ariyalur and Perambalur were transposed in Table 6.",
    nowSays: "The districts are in the correct rows. No ranking changed.",
    severity: "Minor",
    foundBy: "Dr Meena Ravichandran, external reader",
  },
  {
    date: "3 July 2026",
    document: "Learning-outcome index",
    version: "v1.1 → v1.2",
    wasWrong: "The 2020 point carried no note explaining the pandemic-year collection gap.",
    nowSays: "The 2020 point is footnoted and shown as a dashed segment in the chart.",
    severity: "Minor",
    foundBy: "Internal review",
  },
  {
    date: "22 June 2026",
    document: "AITN baseline",
    version: "v1.0 → v1.0a",
    wasWrong: "A source retrieval date was given as 2025 rather than 2026.",
    nowSays: "The retrieval date is corrected.",
    severity: "Typographic",
    foundBy: "Internal review",
  },
];

export const CORRECTIONS_STAT = {
  count: CORRECTIONS.length,
  medianDays: 6,
  asAt: "18 August 2026",
};

export type Person = {
  name: string;
  role: string;
  body: string;
  independent?: boolean;
};

export const RESEARCH_LEADERSHIP: Person[] = [
  {
    name: "Dr Aravind Balasubramanian",
    role: "Director of research",
    body: "Public finance and state capacity. Previously eleven years on fiscal devolution work; owns the retained-income series and the tag standard.",
  },
  {
    name: "Kavitha Nagarajan",
    role: "Head of trackers",
    body: "Built the MoU tracing method from filings rather than press releases. Owns the announced-to-deployed discount.",
  },
  {
    name: "Dr Surya Prakash",
    role: "Lead, learning outcomes",
    body: "Assessment design and comparability. Insists on one frozen task definition across years, which is why the series is usable.",
  },
  {
    name: "Meera Iyer",
    role: "Head of methods and corrections",
    body: "Owns the corrections workflow and the tag census. Has the authority to stop a publication, and has used it twice.",
  },
];

export const BOARD: Person[] = [
  { name: "Justice (Retd) N. Chandramohan", role: "Chair, independent", body: "Chairs the Board. No executive role, no funder relationship.", independent: true },
  { name: "Lakshmi Venkataraman", role: "Independent director, chairs Audit & Risk", body: "Thirty years in audit. The Audit & Risk Committee is chaired by an independent director by charter, not by convention.", independent: true },
  { name: "Dr Paul Rajkumar", role: "Independent director", body: "Development economics. Reviews the independence register each quarter.", independent: true },
  { name: "Anitha Selvaraj", role: "Executive director", body: "Operations and finance. Signs nothing on research content." },
];

export const TELOS_COUNCIL: Person[] = [
  { name: "Prof. Rukmini Devarajan", role: "Telos Council", body: "Owns the long-horizon question. Runs nothing operational, by design." },
  { name: "S. Arunachalam", role: "Telos Council", body: "Industrial history of the state. Asks the twenty-one-year question when a programme asks for a one-year answer." },
  { name: "Dr Fathima Beevi", role: "Telos Council", body: "Public health systems. Holds the Council's veto on any programme that cannot state its kill criteria." },
];

export type Programme = {
  slug: string;
  name: string;
  owner: string;
  stage: "Live" | "Chartered" | "Watching brief";
  summary: string;
  killCriteria: string;
};

export const PROGRAMMES: Programme[] = [
  {
    slug: "aitn",
    name: "AITN — AI-Driven Tamil Nadu",
    owner: "Kavitha Nagarajan",
    stage: "Live",
    summary:
      "A capacity baseline for AI in the state, built only from data that already exists so anyone can repeat it — including people who disagree with our reading of it.",
    killCriteria:
      "If the 2027 baseline cannot be rebuilt from public sources without privileged access, the programme stops and the method note says why.",
  },
  {
    slug: "portfolio",
    name: "The portfolio",
    owner: "Dr Aravind Balasubramanian",
    stage: "Live",
    summary:
      "The three trackers, held to one standard, one publication cadence and one correction workflow. The portfolio is the institution's spine.",
    killCriteria:
      "A tracker whose tag census falls below 50% [A]+[B] for two consecutive releases is suspended, publicly, until the inputs improve.",
  },
  {
    slug: "watching-briefs",
    name: "Watching briefs",
    owner: "Meera Iyer",
    stage: "Watching brief",
    summary:
      "Standing briefs we update rather than republish: the Chennai water balance, power procurement, and district health staffing.",
    killCriteria:
      "A brief with no substantive update in two quarters is closed and marked closed, rather than left to look alive.",
  },
  {
    slug: "charter-and-kill",
    name: "How a programme starts and stops",
    owner: "Anitha Selvaraj",
    stage: "Chartered",
    summary:
      "The charter gate and the kill gate, written down. A programme with no named owner does not appear on this website at all.",
    killCriteria: "The gate is the programme. It cannot be killed without replacing it.",
  },
];

export type NewsItem = { slug: string; title: string; date: string; kind: string; blurb: string };

export const NEWS: NewsItem[] = [
  {
    slug: "mou-v1-4",
    title: "MoU Tracker v1.4 published, with a material correction",
    date: "16 August 2026",
    kind: "Release",
    blurb:
      "An external reader found a double-counted MoU. The traced total falls by ₹18,400 crore. The correction is logged with their name, with consent.",
  },
  {
    slug: "disclosure-paper",
    title: "Eighteen institutions, four disclosures",
    date: "14 August 2026",
    kind: "Publication",
    blurb:
      "Most Indian policy institutions publish nothing about their funding. We checked, and we published our own figures on the same page.",
  },
  {
    slug: "roundtable-devolution",
    title: "Closed roundtable on devolution arithmetic, Chennai",
    date: "6 August 2026",
    kind: "Convening",
    blurb:
      "Fourteen participants, no press, no photography, and a published note of what was discussed with nothing attributed.",
  },
  {
    slug: "independence-register",
    title: "First independence register published: three approaches recorded",
    date: "24 July 2026",
    kind: "Governance",
    blurb:
      "Three approaches to review or delay a finding were recorded this year. None succeeded. A year with none would mean nobody was recording them.",
  },
];

export const FUNDERS = [
  { name: "The Nilgiri Trust", band: "₹1–2 crore", restricted: "Unrestricted" },
  { name: "Sundaram Family Office", band: "₹50 lakh – ₹1 crore", restricted: "Unrestricted" },
  { name: "Diaspora compact, pooled (41 individuals)", band: "₹25–50 lakh", restricted: "Unrestricted" },
  { name: "An individual patron who asked not to be named", band: "₹25–50 lakh", restricted: "Unrestricted, name withheld at their request" },
  { name: "Anonymous institutional grant", band: "₹10–25 lakh", restricted: "Restricted to the learning-outcome index" },
];

export const FUNDING_STATS = {
  concentration: { value: "31%", tag: "A" as Tag, asAt: "31 March 2026", source: "Audited accounts FY2025–26", note: "Largest single funder as a share of income. Cap is 35%." },
  costToRaise: { value: "₹0.19", tag: "A" as Tag, asAt: "31 March 2026", source: "Audited accounts FY2025–26", note: "Spent to raise each rupee. The sector benchmark we would like to beat is ₹0.12." },
  reserves: { value: "7.4 months", tag: "A" as Tag, asAt: "31 March 2026", source: "Audited accounts FY2025–26", note: "Unrestricted reserves at current burn. Policy floor is 6 months." },
  declined: [
    {
      what: "A ₹3 crore multi-year grant conditional on pre-publication review of findings.",
      why: "The independence clause is unamendable. We declined and published that we declined.",
    },
    {
      what: "A sponsorship of the summit that included a logo beside the tracker pages.",
      why: "A funder's name never appears beside a finding. We offered the summit programme instead; they left.",
    },
    {
      what: "An advisory retainer from a counterparty named in the MoU Tracker.",
      why: "There is no version of that engagement that survives being described in public.",
    },
  ],
};

export const CONTACTS = [
  { label: "Press", email: "press@thinktn.org", note: "A named human within one working day." },
  { label: "Research", email: "research@thinktn.org", note: "Method questions, data requests, disagreements." },
  { label: "Funding", email: "development@thinktn.org", note: "Read the funding page first." },
  { label: "General", email: "hello@thinktn.org", note: "Everything else." },
];

export const PLAYBOOKS = [
  { code: "P02", title: "Independence and conflicts of interest", summary: "The unamendable clause, the register, and who may stop a publication." },
  { code: "P06", title: "Funding, disclosure and concentration caps", summary: "Bands, caps, the refusal log, and the annual disclosure format." },
  { code: "P09", title: "The confidence-tag standard", summary: "What earns [A], what is only ever [B], and why [C] must never be laundered." },
  { code: "P11", title: "Corrections and versioning", summary: "Discovery to publication, the severity ladder, and the no-silent-amendment rule." },
  { code: "P14", title: "Programme charter and kill gates", summary: "Named owner, stated kill criteria, quarterly review by the Telos Council." },
  { code: "P18", title: "Partnership and endorsement limits", summary: "Why there is no logo wall and no testimonial on this website." },
];
