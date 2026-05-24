"use client";

import { useAtom } from "jotai";
import { IconSparkles } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ICON_LIBRARIES,
  iconLibraryAtom,
  type IconLibrary,
} from "@/lib/atoms/icon-library";

export function IconLibraryPicker() {
  const [lib, setLib] = useAtom(iconLibraryAtom);
  const current = ICON_LIBRARIES.find((l) => l.id === lib) ?? ICON_LIBRARIES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs sm:text-sm"
        >
          <IconSparkles className="h-[1.2rem] w-[1.2rem]" />
          <span className="hidden md:inline">Icons:</span>
          <span className="font-medium">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Preview icons with</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={lib}
          onValueChange={(v) => setLib(v as IconLibrary)}
        >
          {ICON_LIBRARIES.map((l) => (
            <DropdownMenuRadioItem key={l.id} value={l.id}>
              {l.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
