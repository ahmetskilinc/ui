import { type Registry } from "shadcn/registry";

export const components: Registry["items"] = [
  {
    name: "sidebar",
    description: "",
    type: "registry:ui",
    registryDependencies: [
      "button",
      "separator",
      "sheet",
      "tooltip",
      "input",
      "use-mobile",
      "skeleton",
    ],
    files: [
      {
        path: "default/components/sidebar.tsx",
        type: "registry:component",
        target: "components/ui/sidebar.tsx",
      },
    ],
    categories: undefined,
  },
];
