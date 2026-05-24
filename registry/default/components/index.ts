import { type Registry } from "shadcn/schema";

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
  {
    name: "video-player",
    description:
      "A composable custom video player with accessible controls and icon-library-agnostic icons.",
    type: "registry:component",
    dependencies: ["@radix-ui/react-slider"],
    registryDependencies: [
      "button",
      "slider",
      "tooltip",
      "dropdown-menu",
    ],
    files: [
      {
        path: "default/components/video-player.tsx",
        type: "registry:component",
        target: "components/ui/video-player.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "tags-input",
    description:
      "Versatile chip-style tag input with paste-splitting, validation, dedupe, max-tags, and keyboard editing.",
    type: "registry:component",
    files: [
      {
        path: "default/components/tags-input.tsx",
        type: "registry:component",
        target: "components/ui/tags-input.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "shortcut-recorder",
    description:
      "Records keyboard shortcuts (modifier+key combos) for hotkey settings UIs. Includes a useKeyboardShortcut hook and a shortcutMatches helper.",
    type: "registry:component",
    files: [
      {
        path: "default/components/shortcut-recorder.tsx",
        type: "registry:component",
        target: "components/ui/shortcut-recorder.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "image-comparison",
    description:
      "A draggable before/after image comparison slider with horizontal or vertical orientation, hover-to-reveal, and full keyboard support.",
    type: "registry:component",
    files: [
      {
        path: "default/components/image-comparison.tsx",
        type: "registry:component",
        target: "components/ui/image-comparison.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "activity-heatmap",
    description:
      "GitHub-style contribution heatmap. Supports custom date ranges, configurable thresholds, weekday/month labels, legend, and per-cell tooltips.",
    type: "registry:component",
    files: [
      {
        path: "default/components/activity-heatmap.tsx",
        type: "registry:component",
        target: "components/ui/activity-heatmap.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "cron-builder",
    description:
      "Visual builder for cron expressions with hourly/daily/weekly/monthly modes, raw expression editing, validation, and human-readable preview.",
    type: "registry:component",
    registryDependencies: ["input", "label", "toggle-group"],
    files: [
      {
        path: "default/components/cron-builder.tsx",
        type: "registry:component",
        target: "components/ui/cron-builder.tsx",
      },
    ],
    categories: undefined,
  },
  {
    name: "inline-edit",
    description:
      "Click-to-edit text field with optimistic save, escape-to-cancel, validation, async submit support, and multiline mode.",
    type: "registry:component",
    files: [
      {
        path: "default/components/inline-edit.tsx",
        type: "registry:component",
        target: "components/ui/inline-edit.tsx",
      },
    ],
    categories: undefined,
  },
];
