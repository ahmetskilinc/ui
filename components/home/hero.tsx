import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { ArrowRightIcon } from "lucide-react";
import { InstallCommand } from "@/components/home/install-command";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="section-soft relative overflow-hidden border-b border-grid">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-16 md:items-center md:py-24 md:text-center">
        <Link
          href="/docs"
          className="group inline-flex items-center gap-2 rounded-full border border-grid bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground opacity-40" />
            <span className="relative inline-flex size-1.5 rounded-full bg-foreground" />
          </span>
          A shadcn-compatible component registry
          <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <h1 className="text-balance text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          Components for shipping faster.
        </h1>

        <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
          An opinionated collection of components, blocks, and libraries I&apos;ve
          built along the way — copy-and-paste ready for any shadcn/ui project.
        </p>

        <div className="flex flex-row flex-wrap gap-2 md:justify-center">
          <Button asChild>
            <Link href="/docs/components">
              Browse components
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blocks">Browse blocks</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="https://l.ahmet.studio/gh">
              <IconBrandGithub className="size-4" />
              GitHub
            </Link>
          </Button>
        </div>

        <InstallCommand
          registryUrl="https://ui.ahmet.studio/r/multiselect-combobox"
          className="mt-2"
        />
      </div>
    </section>
  );
}
