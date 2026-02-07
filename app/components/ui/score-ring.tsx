import React from "react";
import { cn } from "../../../lib/utils";

const levelColor: Record<string, string> = {
  green: "stroke-emerald-500",
  yellow: "stroke-amber-500",
  red: "stroke-rose-500"
};

export function ScoreRing({
  score,
  level,
  className
}: {
  score: number;
  level: "green" | "yellow" | "red";
  className?: string;
}) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-slate-200"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className={levelColor[level]}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          className="fill-slate-700 text-xs font-semibold"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}
