import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Pillar dials — the brand motion element.
 *
 * Adapted from the masterbrand reference: radial tick dials with orbiting
 * points, re-read in the Think TN palette (mayil teal, manjal gold, cream on
 * night). Each dial is one part of the institution and links to it.
 * Pure SVG + CSS rotation: no canvas, no video, LCP-safe. Motion is decorative
 * and disabled under prefers-reduced-motion (see .tn-dial-rot in styles.css).
 */

type Orbit = {
  /** distance from centre, in viewBox units */
  r: number;
  /** dot radius */
  size: number;
  /** orbit period, seconds */
  dur: number;
  rev?: boolean;
  className: string;
  startAngle: number;
};

type DialSpec = {
  lines: string[];
  to: string;
  ticks: number;
  /** tick ring period, seconds */
  dur: number;
  rev?: boolean;
  orbits: Orbit[];
};

const VB = 220;
const C = VB / 2;
const TICK_R = 88;

const DIALS: DialSpec[] = [
  {
    lines: ["Evidence"],
    to: "/evidence",
    ticks: 44,
    dur: 90,
    orbits: [
      { r: 62, size: 5, dur: 14, className: "text-primary", startAngle: 20 },
      { r: 62, size: 5, dur: 14, className: "text-accent", startAngle: 200 },
      { r: 100, size: 4, dur: 26, rev: true, className: "text-foreground", startAngle: 120 },
    ],
  },
  {
    lines: ["Programmes"],
    to: "/programmes",
    ticks: 40,
    dur: 110,
    rev: true,
    orbits: [
      { r: 62, size: 5, dur: 18, rev: true, className: "text-accent", startAngle: 80 },
      { r: 100, size: 4, dur: 30, className: "text-primary", startAngle: 260 },
      { r: 100, size: 4, dur: 30, className: "text-foreground", startAngle: 40 },
    ],
  },
  {
    lines: ["The Ladder"],
    to: "/ladder",
    ticks: 48,
    dur: 130,
    orbits: [
      { r: 62, size: 5, dur: 22, className: "text-foreground", startAngle: 0 },
      { r: 62, size: 5, dur: 22, className: "text-primary", startAngle: 180 },
      { r: 100, size: 4, dur: 36, rev: true, className: "text-accent", startAngle: 300 },
    ],
  },
  {
    lines: ["Convening"],
    to: "/convening",
    ticks: 42,
    dur: 100,
    rev: true,
    orbits: [
      { r: 62, size: 5, dur: 16, className: "text-primary", startAngle: 140 },
      { r: 100, size: 4, dur: 24, className: "text-accent", startAngle: 20 },
      { r: 100, size: 4, dur: 24, className: "text-foreground", startAngle: 220 },
    ],
  },
  {
    lines: ["Governance"],
    to: "/about/governance",
    ticks: 46,
    dur: 120,
    orbits: [
      { r: 62, size: 5, dur: 20, rev: true, className: "text-accent", startAngle: 60 },
      { r: 62, size: 5, dur: 20, rev: true, className: "text-foreground", startAngle: 240 },
      { r: 100, size: 4, dur: 32, className: "text-primary", startAngle: 170 },
    ],
  },
];

function Ticks({ count, rev, dur }: { count: number; rev?: boolean | undefined; dur: number }) {
  const ticks = Array.from({ length: count }, (_, i) => (i * 360) / count);
  return (
    <g
      className={cn("tn-dial-rot", rev && "tn-dial-rot-rev")}
      style={{ animationDuration: `${dur}s` }}
    >
      {ticks.map((a) => {
        const rad = (a * Math.PI) / 180;
        const long = a % 45 === 0;
        const r1 = TICK_R - (long ? 14 : 9);
        return (
          <line
            key={a}
            x1={C + r1 * Math.cos(rad)}
            y1={C + r1 * Math.sin(rad)}
            x2={C + TICK_R * Math.cos(rad)}
            y2={C + TICK_R * Math.sin(rad)}
            stroke="currentColor"
            strokeOpacity={long ? 0.55 : 0.28}
            strokeWidth={long ? 1.6 : 1}
          />
        );
      })}
    </g>
  );
}

function OrbitDot({ orbit }: { orbit: Orbit }) {
  const rad = (orbit.startAngle * Math.PI) / 180;
  return (
    <g
      className={cn("tn-dial-rot", orbit.rev && "tn-dial-rot-rev")}
      style={{ animationDuration: `${orbit.dur}s` }}
    >
      <circle
        cx={C + orbit.r * Math.cos(rad)}
        cy={C + orbit.r * Math.sin(rad)}
        r={orbit.size}
        fill="currentColor"
        className={orbit.className}
      />
    </g>
  );
}

function Dial({ spec }: { spec: DialSpec }) {
  return (
    <Link
      to={spec.to}
      className="group flex flex-col items-center gap-5 no-underline"
      aria-label={spec.lines.join(" ")}
    >
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="w-full max-w-56 text-foreground transition-transform duration-500 group-hover:scale-[1.03]"
        role="img"
        aria-hidden="true"
      >
        <circle cx={C} cy={C} r={TICK_R + 14} fill="none" stroke="currentColor" strokeOpacity={0.08} />
        <Ticks count={spec.ticks} rev={spec.rev} dur={spec.dur} />
        {spec.orbits.map((o, i) => (
          <OrbitDot key={i} orbit={o} />
        ))}
        {spec.lines.map((line, i) => (
          <text
            key={line}
            x={C}
            y={C + (i - (spec.lines.length - 1) / 2) * 22 + 6}
            textAnchor="middle"
            className="fill-current font-display text-[19px] font-medium tracking-tight text-foreground"
          >
            {line}
          </text>
        ))}
      </svg>
      <span className="u-meta text-muted-foreground transition-colors group-hover:text-primary">
        {spec.lines.join(" ")} →
      </span>
    </Link>
  );
}

export function PillarDials({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {DIALS.map((d) => (
        <Dial key={d.to} spec={d} />
      ))}
    </div>
  );
}
