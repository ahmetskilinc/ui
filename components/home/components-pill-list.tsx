import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { source } from "@/lib/source";

export function ComponentsPillList() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components",
  );

  if (components?.type !== "folder") {
    return null;
  }

  const list = components.children.filter(
    (component) => component.type === "page",
  );

  return (
    <section className="border-b border-grid">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-6 px-4 py-12 md:py-16">
        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              All components
            </h2>
            <p className="text-muted-foreground">
              Everything currently in the library. More on the way.
            </p>
          </div>
          <Link
            href="/docs/components"
            className="group hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            View docs
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {list.map((component) => (
            <Link
              key={component.$id}
              href={component.url}
              className="inline-flex items-center gap-1.5 rounded-full border border-grid bg-background px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-foreground/20 hover:bg-accent hover:text-foreground"
            >
              {component.name}
              <ArrowUpRightIcon className="size-3 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
