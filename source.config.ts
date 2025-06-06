import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { transformers } from "@/lib/highlight-code";

export default defineConfig({
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
          code(node) {
            node.properties["data-line-numbers"] = "";
          },
          line(node) {
            node.properties["data-line"] = "";
          },
        },
      ],
    },
  },
});

export const docs = defineDocs({
  dir: "content/docs",
});
