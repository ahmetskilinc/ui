import { createMDX } from "fumadocs-mdx/next";
import { transformers } from "@/lib/highlight-code";

const withMDX = createMDX({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...transformers,
        {
          pre(node) {
            node.properties["class"] =
              "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent";
          },
          line(node) {
            node.properties["data-line"] = "";
          },
        },
      ],
    },
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};
export default withMDX(config);
