import { registryItemSchema, type Registry } from "shadcn/registry";
import { z } from "zod";
import { blocks } from "@/registry/default/blocks";
import { components } from "@/registry/default/components";

export const registry = {
  name: "ahmetskilinc/ui",
  homepage: "https://ui.ahmet.studio",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      type: "registry:style",
      dependencies: ["class-variance-authority", "lucide-react"],
      devDependencies: ["tw-animate-css"],
      registryDependencies: ["utils"],
      cssVars: {},
      files: [],
    },
    ...blocks,
    ...components,
  ]),
} satisfies Registry;
