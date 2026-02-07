import React from "react";
import { cn } from "../../../lib/utils";

export function Toggle({
  pressed,
  onPressedChange,
  label
}: {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm",
        pressed && "border-brand-600 text-brand-700"
      )}
    >
      <span
        className={cn(
          "h-4 w-8 rounded-full bg-slate-200 p-0.5 transition",
          pressed && "bg-brand-600"
        )}
      >
        <span
          className={cn(
            "block h-3 w-3 rounded-full bg-white transition",
            pressed && "translate-x-4"
          )}
        />
      </span>
      {label}
    </button>
  );
}
