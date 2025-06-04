import { type Registry } from "shadcn/registry";

export const blocks: Registry["items"] = [
  {
    name: "dual-sidebar",
    type: "registry:block",
    title: "Dual Sidebar",
    description: "A dual sidebar block",
    registryDependencies: [
      "button",
      "input",
      "separator",
      "sheet",
      "skeleton",
      "tooltip",
      "use-mobile",
      "collapsible",
      "avatar",
      "dropdown-menu",
    ],
    files: [
      {
        path: "blocks/dual-sidebar/page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
      {
        path: "components/sidebar.tsx",
        type: "registry:component",
        target: "components/ui/sidebar.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/index.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/index.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/app-sidebar.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/app-sidebar.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/right-sidebar.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/right-sidebar.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/header.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/header.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/nav-main.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/nav-main.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/nav-projects.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/nav-projects.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/nav-user.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/nav-user.tsx",
      },
      {
        path: "blocks/dual-sidebar/dual-sidebar/team-switcher.tsx",
        type: "registry:component",
        target: "components/dual-sidebar/team-switcher.tsx",
      },
    ],
  },
];
