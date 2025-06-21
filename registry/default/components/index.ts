import { type Registry } from "shadcn/registry";

export const components: Registry["items"] = [
  {
    name: "sidebar",
    description: "",
    type: "registry:component",
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
  {
    name: "multiselect-combobox",
    description: "",
    type: "registry:component",
    registryDependencies: ["button", "popover", "command", "badge"],
    files: [
      {
        path: "default/components/multiselect-combobox.tsx",
        type: "registry:component",
        target: "components/ui/multiselect-combobox.tsx",
      },
    ],
    categories: undefined,
  },
];
