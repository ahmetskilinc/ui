"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageComparisonProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  before: React.ReactNode;
  after: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  showHandle?: boolean;
  showLabels?: boolean;
  beforeLabel?: React.ReactNode;
  afterLabel?: React.ReactNode;
  step?: number;
  hoverToReveal?: boolean;
}

export function ImageComparison({
  before,
  after,
  defaultValue = 50,
  value,
  onValueChange,
  orientation = "horizontal",
  showHandle = true,
  showLabels = false,
  beforeLabel = "Before",
  afterLabel = "After",
  step = 0.1,
  hoverToReveal = false,
  className,
  ...props
}: ImageComparisonProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [internal, setInternal] = React.useState(defaultValue);
  const [dragging, setDragging] = React.useState(false);

  const isControlled = value !== undefined;
  const position = clamp(isControlled ? (value as number) : internal, 0, 100);

  const set = React.useCallback(
    (next: number) => {
      const v = clamp(next, 0, 100);
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );

  const updateFromPoint = React.useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct =
        orientation === "horizontal"
          ? ((clientX - rect.left) / rect.width) * 100
          : ((clientY - rect.top) / rect.height) * 100;
      set(pct);
    },
    [orientation, set],
  );

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromPoint(e.clientX, e.clientY);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, updateFromPoint]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const positiveKeys =
      orientation === "horizontal"
        ? ["ArrowRight", "ArrowUp"]
        : ["ArrowDown", "ArrowRight"];
    const negativeKeys =
      orientation === "horizontal"
        ? ["ArrowLeft", "ArrowDown"]
        : ["ArrowUp", "ArrowLeft"];
    if (positiveKeys.includes(e.key)) {
      e.preventDefault();
      set(position + (e.shiftKey ? step * 10 : step) * 10);
    } else if (negativeKeys.includes(e.key)) {
      e.preventDefault();
      set(position - (e.shiftKey ? step * 10 : step) * 10);
    } else if (e.key === "Home") {
      e.preventDefault();
      set(0);
    } else if (e.key === "End") {
      e.preventDefault();
      set(100);
    }
  };

  const isHorizontal = orientation === "horizontal";

  const clipStyle: React.CSSProperties = isHorizontal
    ? { clipPath: `inset(0 ${100 - position}% 0 0)` }
    : { clipPath: `inset(0 0 ${100 - position}% 0)` };

  const handleStyle: React.CSSProperties = isHorizontal
    ? { left: `${position}%` }
    : { top: `${position}%` };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-orientation={orientation}
      tabIndex={0}
      onPointerDown={(e) => {
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setDragging(true);
        updateFromPoint(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (!hoverToReveal || dragging) return;
        updateFromPoint(e.clientX, e.clientY);
      }}
      onKeyDown={handleKeyDown}
      data-orientation={orientation}
      data-dragging={dragging ? "true" : undefined}
      className={cn(
        "relative isolate select-none overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isHorizontal ? "cursor-ew-resize" : "cursor-ns-resize",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0">{after}</div>
      <div className="pointer-events-none absolute inset-0" style={clipStyle}>
        {before}
      </div>

      {showLabels && (
        <>
          <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {beforeLabel}
          </div>
          <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {afterLabel}
          </div>
        </>
      )}

      {showHandle && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-20 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]",
            isHorizontal
              ? "top-0 h-full w-px -translate-x-1/2"
              : "left-0 h-px w-full -translate-y-1/2",
          )}
          style={handleStyle}
        >
          <div
            className={cn(
              "absolute flex items-center justify-center rounded-full bg-white shadow-md",
              isHorizontal
                ? "top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2"
                : "left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className={cn(
                "size-5 text-foreground/70",
                !isHorizontal && "rotate-90",
              )}
            >
              <path
                d="M9 6l-5 6 5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 6l5 6-5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
