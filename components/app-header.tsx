"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, GithubIcon } from "lucide-react";
import { MenuIcon } from "@/components/ui/menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto flex max-w-[100rem] flex-row items-center justify-between px-4 py-4">
        <div className="flex flex-row items-center gap-2 sm:gap-1">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon isOpen={menuOpen} className="!px-2" />
          </Button>
          <Link href="/">
            <h1 className="mr-2 text-lg font-medium tracking-tight md:text-2xl">
              ui.ahmet.studio
            </h1>
          </Link>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/docs/components">Components</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/blocks">Blocks</Link>
          </Button>
        </div>
        <div className="flex flex-row items-center md:gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="https://dub.sh/ahmet" className="text-xs sm:text-sm">
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
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};

const MobileMenu = ({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) => {
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="left" className="bg-background">
        <SheetHeader>
          <SheetTitle>ui.ahmet.studio</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/docs/components" onClick={() => setMenuOpen(false)}>
            Components
          </Link>
          <Link href="/blocks" onClick={() => setMenuOpen(false)}>
            Blocks
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
