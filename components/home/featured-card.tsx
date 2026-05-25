import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeaturedCard({
  title,
  description,
  href,
  children,
  previewAlign = "center",
  previewPadding = true,
  previewClassName,
  className,
}: {
  title: string;
  description: string;
  href: string;
  children: ReactNode;
  previewAlign?: "start" | "center" | "end";
  previewPadding?: boolean;
  previewClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-grid bg-background transition-colors hover:border-foreground/20",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex min-h-[14rem] flex-1 justify-center overflow-hidden bg-gradient-to-b from-surface/40 to-surface/10 dark:from-surface/30 dark:to-surface/5",
          previewPadding && "p-6",
          previewAlign === "start" && "items-start",
          previewAlign === "center" && "items-center",
          previewAlign === "end" && "items-end",
          previewClassName,
        )}
      >
        {children}
      </div>
      <div className="flex flex-row items-start justify-between gap-3 border-t border-grid p-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-sm font-medium tracking-tight">
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </div>
  );
}
