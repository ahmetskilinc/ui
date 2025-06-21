"use client";

import { useState } from "react";
import { MultiSelect } from "@/registry/default/components/multiselect-combobox";

export default function MultiSelectComboboxPreview() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div>
      <MultiSelect
        options={[
          {
            label: "React",
            value: "react",
          },
          {
            label: "Vue",
            value: "vue",
          },
          {
            label: "Angular",
            value: "angular",
          },
          {
            label: "Svelte",
            value: "svelte",
          },
          {
            label: "Next.js",
            value: "nextjs",
          },
          {
            label: "Nuxt.js",
            value: "nuxtjs",
          },
        ]}
        selected={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
      />
    </div>
  );
}
