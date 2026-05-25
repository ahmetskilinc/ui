"use client";

import { useState } from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PACKAGE_MANAGERS = [
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "bun", label: "bun", prefix: "bunx --bun" },
  { id: "yarn", label: "yarn", prefix: "yarn" },
] as const;

type PackageManagerId = (typeof PACKAGE_MANAGERS)[number]["id"];

export function InstallCommand({
  registryUrl,
  className,
}: {
  registryUrl: string;
  className?: string;
}) {
  const [pm, setPm] = useState<PackageManagerId>("npm");
  const [copied, setCopied] = useState(false);

  const active = PACKAGE_MANAGERS.find((p) => p.id === pm) ?? PACKAGE_MANAGERS[0];
  const command = `${active.prefix} shadcn@latest add ${registryUrl}`;

  const onCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "w-full max-w-xl overflow-hidden rounded-lg border border-grid bg-code text-code-foreground",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-1 border-b border-grid px-2 py-1.5">
        {PACKAGE_MANAGERS.map((manager) => (
          <button
            key={manager.id}
            onClick={() => setPm(manager.id)}
            className={cn(
              "rounded-md px-2 py-1 font-mono text-xs transition-colors",
              pm === manager.id
                ? "bg-background text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {manager.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 px-4 py-3 text-left font-mono text-xs sm:text-sm">
        <span className="select-none text-muted-foreground">$</span>
        <code className="flex-1 overflow-x-auto whitespace-nowrap no-scrollbar">
          {command}
        </code>
        <Button
          size="icon"
          variant="ghost"
          className="size-7 shrink-0"
          onClick={onCopy}
          aria-label="Copy install command"
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <ClipboardIcon className="size-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}
