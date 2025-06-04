import { type Registry } from "shadcn/registry";

export const components: Registry["items"] = [
  {
    name: "sidebar",
    type: "registry:component",
    title: "Sidebar",
    description: "A sidebar component",
    registryDependencies: [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip",
      "use-mobile",
    ],
    files: [
      {
        path: "components/sidebar.tsx",
        type: "registry:component",
        target: "components/ui/sidebar.tsx",
      },
    ],
  },
];
