import { useId } from "react";
import { cn } from "@/lib/utils";

type Series = { label: string; points: { x: string; y: number }[] };

/**
 * Series chart. Every series is distinguished by shape AND dash, never by
 * colour alone (Website Strategy §5.5). Axes are labelled and dated.
 */
export function SeriesChart({
  series,
  unit,
  className,
}: {
  series: Series[];
  unit: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const W = 720;
  const H = 320;
  const pad = { t: 16, r: 16, b: 40, l: 56 };
  const xs = series[0]?.points.map((p) => p.x) ?? [];
  const allY = series.flatMap((s) => s.points.map((p) => p.y));
  const maxY = Math.ceil(Math.max(...allY, 1) * 1.12);
  const minY = 0;

  const x = (i: number) =>
    pad.l + (i * (W - pad.l - pad.r)) / Math.max(xs.length - 1, 1);
  const y = (v: number) =>
    H - pad.b - ((v - minY) / (maxY - minY)) * (H - pad.t - pad.b);

  const strokes = ["var(--chart-1)", "var(--chart-3)", "var(--chart-2)", "var(--chart-4)"];
  const dashes = ["0", "6 4", "2 4", "10 4"];
  const ticks = 4;

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`Chart: ${series.map((s) => s.label).join(", ")}, in ${unit}`}
      >
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const v = minY + ((maxY - minY) * i) / ticks;
          return (
            <g key={i}>
              <line
                x1={pad.l}
                x2={W - pad.r}
                y1={y(v)}
                y2={y(v)}
                stroke="var(--color-border)"
                strokeWidth="1"
              />
              <text
                x={pad.l - 10}
                y={y(v) + 4}
                textAnchor="end"
                fill="var(--color-muted-foreground)"
                style={{ font: "400 11px var(--font-mono)" }}
              >
                {v % 1 === 0 ? v : v.toFixed(1)}
              </text>
            </g>
          );
        })}

        {xs.map((label, i) => (
          <text
            key={label}
            x={x(i)}
            y={H - pad.b + 20}
            textAnchor="middle"
            fill="var(--color-muted-foreground)"
            style={{ font: "400 11px var(--font-mono)" }}
          >
            {label}
          </text>
        ))}

        {series.map((s, si) => (
          <g key={s.label}>
            <polyline
              points={s.points.map((p, i) => `${x(i)},${y(p.y)}`).join(" ")}
              fill="none"
              stroke={strokes[si % strokes.length]}
              strokeWidth="2"
              strokeDasharray={dashes[si % dashes.length]}
              strokeLinejoin="round"
            />
            {s.points.map((p, i) =>
              si % 3 === 0 ? (
                <circle
                  key={p.x}
                  cx={x(i)}
                  cy={y(p.y)}
                  r="3.5"
                  fill="var(--color-background)"
                  stroke={strokes[si % strokes.length]}
                  strokeWidth="2"
                />
              ) : si % 3 === 1 ? (
                <rect
                  key={p.x}
                  x={x(i) - 3.5}
                  y={y(p.y) - 3.5}
                  width="7"
                  height="7"
                  fill="var(--color-background)"
                  stroke={strokes[si % strokes.length]}
                  strokeWidth="2"
                />
              ) : (
                <polygon
                  key={p.x}
                  points={`${x(i)},${y(p.y) - 4.5} ${x(i) + 4.5},${y(p.y) + 3.5} ${x(i) - 4.5},${y(p.y) + 3.5}`}
                  fill="var(--color-background)"
                  stroke={strokes[si % strokes.length]}
                  strokeWidth="2"
                />
              ),
            )}
          </g>
        ))}
        <title id={uid}>{unit}</title>
      </svg>
      <figcaption className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {series.map((s, si) => (
          <span key={s.label} className="u-meta flex items-center gap-2 text-muted-foreground">
            <svg viewBox="0 0 24 8" className="h-2 w-6" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                stroke={strokes[si % strokes.length]}
                strokeWidth="2"
                strokeDasharray={dashes[si % dashes.length]}
              />
            </svg>
            {s.label}
          </span>
        ))}
        <span className="u-meta text-muted-foreground">Unit: {unit}</span>
      </figcaption>
    </figure>
  );
}
