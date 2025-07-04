/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {
  "index": {
    name: "index",
    description: "",
    type: "registry:style",
    registryDependencies: ["utils"],
    files: [],
    component: null,
    categories: undefined,
    meta: undefined,
  },
  "dual-sidebar": {
    name: "dual-sidebar",
    description: "A dual sidebar block",
    type: "registry:block",
    registryDependencies: ["button","input","separator","sheet","skeleton","tooltip","use-mobile","collapsible","avatar","dropdown-menu"],
    files: [{
      path: "registry/default/blocks/dual-sidebar/page.tsx",
      type: "registry:page",
      target: "app/page.tsx"
    },{
      path: "registry/default/components/sidebar.tsx",
      type: "registry:component",
      target: "components/ui/sidebar.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/index.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/index.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/app-sidebar.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/app-sidebar.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/right-sidebar.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/right-sidebar.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/header.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/header.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/nav-main.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/nav-main.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/nav-projects.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/nav-projects.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/nav-user.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/nav-user.tsx"
    },{
      path: "registry/default/blocks/dual-sidebar/dual-sidebar/team-switcher.tsx",
      type: "registry:component",
      target: "components/dual-sidebar/team-switcher.tsx"
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/blocks/dual-sidebar/page.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "sidebar": {
    name: "sidebar",
    description: "",
    type: "registry:component",
    registryDependencies: ["button","separator","sheet","tooltip","input","use-mobile","skeleton"],
    files: [{
      path: "registry/default/components/sidebar.tsx",
      type: "registry:component",
      target: "components/ui/sidebar.tsx"
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/components/sidebar.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "multiselect-combobox": {
    name: "multiselect-combobox",
    description: "",
    type: "registry:component",
    registryDependencies: ["button","popover","command","badge"],
    files: [{
      path: "registry/default/components/multiselect-combobox.tsx",
      type: "registry:component",
      target: "components/ui/multiselect-combobox.tsx"
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/components/multiselect-combobox.tsx")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  "better-auth-next": {
    name: "better-auth-next",
    description: "",
    type: "registry:lib",
    registryDependencies: undefined,
    files: [{
      path: "registry/default/better-auth/auth.ts",
      type: "registry:lib",
      target: "lib/auth.ts"
    },{
      path: "registry/default/better-auth/auth-client.ts",
      type: "registry:lib",
      target: "lib/auth-client.ts"
    },{
      path: "registry/default/better-auth/route.ts",
      type: "registry:lib",
      target: "app/api/auth/[...all]/route.ts"
    }],
    component: React.lazy(async () => {
      const mod = await import("@/registry/default/better-auth/auth.ts")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    }),
    categories: undefined,
    meta: undefined,
  },
  }