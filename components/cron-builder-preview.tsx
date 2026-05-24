"use client";

import { useState } from "react";
import {
  CronBuilder,
  type CronValue,
} from "@/registry/default/components/cron-builder";

export default function CronBuilderPreview() {
  const [value, setValue] = useState<CronValue>({
    expression: "0 9 * * 1",
    mode: "weekly",
  });
  return (
    <div className="w-full max-w-sm">
      <CronBuilder value={value} onChange={setValue} />
    </div>
  );
}
