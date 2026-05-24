"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export type CronMode = "minute" | "hourly" | "daily" | "weekly" | "monthly" | "custom";

export interface CronValue {
  expression: string;
  mode: CronMode;
}

export interface CronBuilderProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: CronValue;
  defaultValue?: CronValue;
  onChange?: (value: CronValue) => void;
  showHumanReadable?: boolean;
  showExpression?: boolean;
  modes?: CronMode[];
}

const DEFAULT: CronValue = { expression: "0 * * * *", mode: "hourly" };

const DAYS_OF_WEEK = [
  { value: "0", label: "Sun" },
  { value: "1", label: "Mon" },
  { value: "2", label: "Tue" },
  { value: "3", label: "Wed" },
  { value: "4", label: "Thu" },
  { value: "5", label: "Fri" },
  { value: "6", label: "Sat" },
];

const MODE_LABELS: Record<CronMode, string> = {
  minute: "Every minute",
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  custom: "Custom",
};

interface ParsedCron {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

function parseCron(expr: string): ParsedCron | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

function buildCron(p: ParsedCron) {
  return `${p.minute} ${p.hour} ${p.dayOfMonth} ${p.month} ${p.dayOfWeek}`;
}

export function humanizeCron(expression: string): string {
  const parsed = parseCron(expression);
  if (!parsed) return "Invalid expression";
  const { minute, hour, dayOfMonth, month, dayOfWeek } = parsed;

  if (
    minute === "*" &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return "Every minute";
  }

  if (
    /^\d+$/.test(minute) &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return `At minute ${minute} of every hour`;
  }

  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return `Every day at ${formatTime(hour, minute)}`;
  }

  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    dayOfMonth === "*" &&
    month === "*" &&
    /^[\d,]+$/.test(dayOfWeek)
  ) {
    const days = dayOfWeek
      .split(",")
      .map((d) => DAYS_OF_WEEK[Number(d)]?.label ?? d)
      .join(", ");
    return `${days} at ${formatTime(hour, minute)}`;
  }

  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    /^\d+$/.test(dayOfMonth) &&
    month === "*" &&
    dayOfWeek === "*"
  ) {
    return `On day ${dayOfMonth} of every month at ${formatTime(hour, minute)}`;
  }

  return `Cron: ${expression}`;
}

function formatTime(hour: string, minute: string) {
  const h = Number(hour);
  const m = Number(minute);
  if (Number.isNaN(h) || Number.isNaN(m)) return `${hour}:${minute}`;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}`;
}

function inferMode(expr: string): CronMode {
  const p = parseCron(expr);
  if (!p) return "custom";
  const { minute, hour, dayOfMonth, month, dayOfWeek } = p;
  if (
    minute === "*" &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  )
    return "minute";
  if (
    /^\d+$/.test(minute) &&
    hour === "*" &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  )
    return "hourly";
  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    dayOfMonth === "*" &&
    month === "*" &&
    dayOfWeek === "*"
  )
    return "daily";
  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    dayOfMonth === "*" &&
    month === "*" &&
    /^[\d,]+$/.test(dayOfWeek)
  )
    return "weekly";
  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    /^\d+$/.test(dayOfMonth) &&
    month === "*" &&
    dayOfWeek === "*"
  )
    return "monthly";
  return "custom";
}

function isValidCron(expr: string): boolean {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  const ranges = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 6],
  ];
  return parts.every((part, i) => isValidField(part, ranges[i][0], ranges[i][1]));
}

function isValidField(field: string, min: number, max: number): boolean {
  if (field === "*") return true;
  return field.split(",").every((segment) => {
    const stepMatch = segment.match(/^(.*)\/(\d+)$/);
    const main = stepMatch ? stepMatch[1] : segment;
    if (stepMatch && Number(stepMatch[2]) <= 0) return false;
    if (main === "*") return true;
    if (main.includes("-")) {
      const [a, b] = main.split("-").map(Number);
      return (
        Number.isFinite(a) &&
        Number.isFinite(b) &&
        a >= min &&
        b <= max &&
        a <= b
      );
    }
    const n = Number(main);
    return Number.isFinite(n) && n >= min && n <= max;
  });
}

export function CronBuilder({
  value,
  defaultValue,
  onChange,
  showHumanReadable = true,
  showExpression = true,
  modes = ["minute", "hourly", "daily", "weekly", "monthly", "custom"],
  className,
  ...props
}: CronBuilderProps) {
  const [internal, setInternal] = React.useState<CronValue>(
    value ?? defaultValue ?? DEFAULT,
  );
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const update = React.useCallback(
    (next: CronValue) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const parsed = parseCron(current.expression) ?? {
    minute: "0",
    hour: "0",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  };

  const setMode = (mode: CronMode) => {
    let expr = current.expression;
    switch (mode) {
      case "minute":
        expr = "* * * * *";
        break;
      case "hourly":
        expr = "0 * * * *";
        break;
      case "daily":
        expr = "0 9 * * *";
        break;
      case "weekly":
        expr = "0 9 * * 1";
        break;
      case "monthly":
        expr = "0 9 1 * *";
        break;
      case "custom":
        break;
    }
    update({ expression: expr, mode });
  };

  const updateField = (field: keyof ParsedCron, val: string) => {
    const next = buildCron({ ...parsed, [field]: val });
    update({ expression: next, mode: inferMode(next) });
  };

  const valid = isValidCron(current.expression);
  const human = humanizeCron(current.expression);

  return (
    <div className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="cron-mode">Frequency</Label>
        <Select
          id="cron-mode"
          value={current.mode}
          onChange={(e) => setMode(e.target.value as CronMode)}
        >
          {modes.map((m) => (
            <option key={m} value={m}>
              {MODE_LABELS[m]}
            </option>
          ))}
        </Select>
      </div>

      {(current.mode === "daily" ||
        current.mode === "weekly" ||
        current.mode === "monthly") && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cron-hour">Hour</Label>
            <Select
              id="cron-hour"
              value={parsed.hour}
              onChange={(e) => updateField("hour", e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={String(i)}>
                  {String(i).padStart(2, "0")}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cron-minute">Minute</Label>
            <Select
              id="cron-minute"
              value={parsed.minute}
              onChange={(e) => updateField("minute", e.target.value)}
            >
              {[0, 5, 10, 15, 20, 30, 45].map((m) => (
                <option key={m} value={String(m)}>
                  {String(m).padStart(2, "0")}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}

      {current.mode === "hourly" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="cron-minute-hour">Minute of hour</Label>
          <Select
            id="cron-minute-hour"
            value={parsed.minute}
            onChange={(e) => updateField("minute", e.target.value)}
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={String(i)}>
                {String(i).padStart(2, "0")}
              </option>
            ))}
          </Select>
        </div>
      )}

      {current.mode === "weekly" && (
        <div className="flex flex-col gap-2">
          <Label>Days of week</Label>
          <ToggleGroup
            type="multiple"
            value={parsed.dayOfWeek === "*" ? [] : parsed.dayOfWeek.split(",")}
            onValueChange={(v) =>
              updateField("dayOfWeek", v.length === 0 ? "*" : v.sort().join(","))
            }
            className="justify-start"
          >
            {DAYS_OF_WEEK.map((d) => (
              <ToggleGroupItem
                key={d.value}
                value={d.value}
                aria-label={d.label}
                className="size-9 text-xs"
              >
                {d.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}

      {current.mode === "monthly" && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="cron-dom">Day of month</Label>
          <Select
            id="cron-dom"
            value={parsed.dayOfMonth}
            onChange={(e) => updateField("dayOfMonth", e.target.value)}
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1}
              </option>
            ))}
          </Select>
        </div>
      )}

      {(current.mode === "custom" || showExpression) && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="cron-expr">Expression</Label>
          <Input
            id="cron-expr"
            value={current.expression}
            onChange={(e) =>
              update({
                expression: e.target.value,
                mode: inferMode(e.target.value),
              })
            }
            spellCheck={false}
            data-error={!valid ? "true" : undefined}
            className="font-mono data-[error=true]:border-destructive data-[error=true]:focus-visible:ring-destructive/30"
          />
          {!valid && (
            <span className="text-xs text-destructive">
              Invalid cron expression
            </span>
          )}
        </div>
      )}

      {showHumanReadable && (
        <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
          <span className="text-muted-foreground">Runs:</span>{" "}
          <span className="font-medium">{human}</span>
        </div>
      )}
    </div>
  );
}
