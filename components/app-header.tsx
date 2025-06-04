import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export const AppHeader = () => {
  return (
    <header className="">
      <div className="mx-auto flex max-w-[100rem] flex-row items-center justify-between px-4 py-8">
        <h1 className="text-3xl font-medium tracking-tight">ui.ahmet.studio</h1>
        <div>
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
