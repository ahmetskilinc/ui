"use client";

import { ActivityHeatmap } from "@/registry/default/components/activity-heatmap";

function generateData() {
  const days = 365;
  const today = new Date();
  const out: { date: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const seed = (d.getDate() * 31 + d.getMonth() * 17 + d.getFullYear()) % 11;
    const value = seed > 7 ? seed * 2 - 6 : seed - 4 < 0 ? 0 : seed - 4;
    out.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      value: Math.max(0, value),
    });
  }
  return out;
}

export default function ActivityHeatmapPreview() {
  const data = generateData();
  return (
    <div className="w-full overflow-x-auto">
      <ActivityHeatmap
        data={data}
        formatTooltip={(d) =>
          `${d.value} ${d.value === 1 ? "contribution" : "contributions"} on ${d.date}`
        }
      />
    </div>
  );
}
