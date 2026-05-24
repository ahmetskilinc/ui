import nextConfig from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".source/**",
      "node_modules/**",
      "registry/__index__.tsx",
      "registry/output/**",
    ],
  },
  {
    rules: {
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default config;
