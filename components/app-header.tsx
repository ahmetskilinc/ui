import Link from "next/link";
import { ArrowUpRightIcon, GithubIcon } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex max-w-[100rem] flex-row items-center justify-between px-4 py-4">
        <div className="flex flex-row items-center md:gap-1">
          <Link href="/">
            <h1 className="mr-2 text-lg font-medium tracking-tight md:text-2xl">
              ui.ahmet.studio
            </h1>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs">Docs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/docs/components">Components</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blocks">Blocks</Link>
          </Button>
        </div>
        <div className="flex flex-row items-center md:gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://dub.sh/ahmet">
              Portfolio <ArrowUpRightIcon className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://l.ahmet.studio/gh">
              <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
