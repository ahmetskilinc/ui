import { type Registry } from "shadcn/registry";

export const betterAuth: Registry["items"] = [
  {
    name: "better-auth-next",
    description: "",
    type: "registry:lib",
    dependencies: ["better-auth", "better-sqlite3"],
    files: [
      {
        path: "default/better-auth/auth.ts",
        type: "registry:lib",
        target: "lib/auth.ts",
      },
      {
        path: "default/better-auth/auth-client.ts",
        type: "registry:lib",
        target: "lib/auth-client.ts",
      },
      {
        path: "default/better-auth/route.ts",
        type: "registry:lib",
        target: "app/api/auth/[...all]/route.ts",
      },
    ],
    categories: undefined,
  },
];
