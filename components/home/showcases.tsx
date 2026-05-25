"use client";

import { useState } from "react";
import { MultiSelect } from "@/registry/default/components/multiselect-combobox";

const FRAMEWORKS = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "Astro", value: "astro" },
  { label: "Remix", value: "remix" },
];

export function MultiSelectShowcase() {
  const [primary, setPrimary] = useState<string[]>(["react", "nextjs"]);
  const [secondary, setSecondary] = useState<string[]>(["svelte"]);

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3">
      <MultiSelect
        options={FRAMEWORKS}
        selected={primary}
        onChange={setPrimary}
        placeholder="Pick your stack..."
      />
      <MultiSelect
        options={FRAMEWORKS}
        selected={secondary}
        onChange={setSecondary}
        disabled
      />
    </div>
  );
}
