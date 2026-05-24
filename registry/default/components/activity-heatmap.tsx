"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ActivityHeatmapDay {
  date: string;
  value: number;
  label?: string;
}

export interface ActivityHeatmapProps
  extends Omit<React.ComponentProps<"div">, "onClick"> {
  data: ActivityHeatmapDay[];
  startDate?: Date | string;
  endDate?: Date | string;
  weeks?: number;
  weekStartsOn?: 0 | 1;
  levels?: number;
  thresholds?: number[];
  cellSize?: number;
  cellGap?: number;
  cellRadius?: number;
  showWeekdayLabels?: boolean;
  showMonthLabels?: boolean;
  showLegend?: boolean;
  legendLabels?: { less?: string; more?: string };
  formatTooltip?: (day: ActivityHeatmapDay) => React.ReactNode;
  onCellClick?: (day: ActivityHeatmapDay, event: React.MouseEvent) => void;
  emptyColorClass?: string;
  colorScale?: string[];
  ariaLabel?: string;
}

const DEFAULT_SCALE = [
  "bg-emerald-200 dark:bg-emerald-900/40",
  "bg-emerald-300 dark:bg-emerald-700/60",
  "bg-emerald-400 dark:bg-emerald-600/80",
  "bg-emerald-500 dark:bg-emerald-500",
];

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseDate(d: Date | string): Date {
  if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, day ?? 1);
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function defaultThresholds(values: number[], levels: number): number[] {
  const positives = values.filter((v) => v > 0).sort((a, b) => a - b);
  if (positives.length === 0) return Array.from({ length: levels - 1 }, () => 0);
  const result: number[] = [];
  for (let i = 1; i < levels; i++) {
    const idx = Math.floor((i / levels) * positives.length);
    result.push(positives[Math.min(idx, positives.length - 1)] ?? 0);
  }
  return result;
}

function bucketize(value: number, thresholds: number[]): number {
  if (value <= 0) return 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (value <= thresholds[i]) return i + 1;
  }
  return thresholds.length;
}

export function ActivityHeatmap({
  data,
  startDate,
  endDate,
  weeks,
  weekStartsOn = 0,
  levels = 5,
  thresholds,
  cellSize = 12,
  cellGap = 3,
  cellRadius = 2,
  showWeekdayLabels = true,
  showMonthLabels = true,
  showLegend = true,
  legendLabels = { less: "Less", more: "More" },
  formatTooltip,
  onCellClick,
  emptyColorClass = "bg-muted",
  colorScale = DEFAULT_SCALE,
  ariaLabel = "Activity heatmap",
  className,
  ...props
}: ActivityHeatmapProps) {
  const dataMap = React.useMemo(() => {
    const map = new Map<string, ActivityHeatmapDay>();
    for (const d of data) map.set(d.date, d);
    return map;
  }, [data]);

  const { end, start } = React.useMemo(() => {
    const end = endDate ? parseDate(endDate) : new Date();
    end.setHours(0, 0, 0, 0);

    let start: Date;
    if (startDate) {
      start = parseDate(startDate);
    } else {
      const w = weeks ?? 53;
      start = addDays(end, -(w * 7 - 1));
    }
    const startWeekday = start.getDay();
    const offset = (startWeekday - weekStartsOn + 7) % 7;
    start = addDays(start, -offset);
    return { start, end };
  }, [startDate, endDate, weeks, weekStartsOn]);

  const grid = React.useMemo(() => {
    const cols: ActivityHeatmapDay[][] = [];
    let cursor = new Date(start);
    let weekCol: ActivityHeatmapDay[] = [];
    while (cursor <= end) {
      const key = toDateKey(cursor);
      const existing = dataMap.get(key);
      weekCol.push(
        existing ?? {
          date: key,
          value: 0,
        },
      );
      const dayIndex = (cursor.getDay() - weekStartsOn + 7) % 7;
      if (dayIndex === 6) {
        cols.push(weekCol);
        weekCol = [];
      }
      cursor = addDays(cursor, 1);
    }
    if (weekCol.length > 0) {
      while (weekCol.length < 7) {
        const last = weekCol[weekCol.length - 1];
        const lastDate = parseDate(last.date);
        const next = addDays(lastDate, 1);
        weekCol.push({ date: toDateKey(next), value: 0 });
      }
      cols.push(weekCol);
    }
    return cols;
  }, [start, end, dataMap, weekStartsOn]);

  const buckets = React.useMemo(() => {
    if (thresholds) return thresholds;
    return defaultThresholds(
      data.map((d) => d.value),
      levels,
    );
  }, [thresholds, data, levels]);

  const monthHeader = React.useMemo(() => {
    const result: Array<{ col: number; label: string }> = [];
    let lastMonth = -1;
    grid.forEach((week, i) => {
      const first = week[0];
      if (!first) return;
      const month = parseDate(first.date).getMonth();
      if (month !== lastMonth) {
        if (i === 0 || result.length === 0 || i - (result.at(-1)?.col ?? 0) >= 2) {
          result.push({ col: i, label: MONTH_LABELS[month] });
        }
        lastMonth = month;
      }
    });
    return result;
  }, [grid]);

  const totalValue = React.useMemo(
    () => data.reduce((acc, d) => acc + (d.value ?? 0), 0),
    [data],
  );

  const orderedWeekdays = React.useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => WEEKDAY_LABELS[(i + weekStartsOn) % 7]);
  }, [weekStartsOn]);

  return (
    <div
      role="img"
      aria-label={`${ariaLabel}, ${totalValue} total contributions`}
      className={cn("inline-flex flex-col gap-2 text-xs", className)}
      {...props}
    >
      <div className="flex">
        {showWeekdayLabels && (
          <div
            className="mr-2 flex shrink-0 flex-col text-muted-foreground"
            style={{ paddingTop: showMonthLabels ? 18 : 0, gap: cellGap }}
          >
            {orderedWeekdays.map((d, i) => (
              <div
                key={d}
                style={{
                  height: cellSize,
                  fontSize: 10,
                  visibility: i % 2 === 1 ? "visible" : "hidden",
                }}
                className="leading-none"
              >
                {d}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {showMonthLabels && (
            <div
              className="relative mb-1 h-4 text-muted-foreground"
              style={{ width: grid.length * (cellSize + cellGap) }}
            >
              {monthHeader.map(({ col, label }) => (
                <span
                  key={`${col}-${label}`}
                  className="absolute text-[10px] leading-none"
                  style={{ left: col * (cellSize + cellGap) }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          <div className="flex" style={{ gap: cellGap }}>
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: cellGap }}>
                {week.map((day, di) => {
                  const bucket = bucketize(day.value, buckets);
                  const colorClass =
                    bucket === 0 ? emptyColorClass : colorScale[bucket - 1];
                  const tooltip = formatTooltip
                    ? formatTooltip(day)
                    : `${day.value} on ${day.date}`;
                  return (
                    <button
                      key={`${wi}-${di}`}
                      type="button"
                      title={typeof tooltip === "string" ? tooltip : undefined}
                      aria-label={
                        typeof tooltip === "string" ? tooltip : `${day.date}`
                      }
                      data-level={bucket}
                      onClick={(e) => onCellClick?.(day, e)}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: cellRadius,
                      }}
                      className={cn(
                        "transition-[outline] outline outline-1 -outline-offset-1 outline-foreground/5 hover:outline-foreground/40",
                        colorClass,
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showLegend && (
        <div
          className={cn(
            "flex items-center gap-2 self-end text-muted-foreground",
            showWeekdayLabels && "pr-0",
          )}
        >
          <span className="text-[10px]">{legendLabels.less}</span>
          <div className="flex items-center" style={{ gap: cellGap }}>
            <span
              className={cn("inline-block", emptyColorClass)}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: cellRadius,
              }}
            />
            {colorScale.map((c, i) => (
              <span
                key={i}
                className={cn("inline-block", c)}
                style={{
                  width: cellSize,
                  height: cellSize,
                  borderRadius: cellRadius,
                }}
              />
            ))}
          </div>
          <span className="text-[10px]">{legendLabels.more}</span>
        </div>
      )}
    </div>
  );
}
