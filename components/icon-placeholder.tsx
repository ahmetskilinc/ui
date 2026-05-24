"use client";

import { lazy, Suspense, type SVGProps } from "react";
import { useAtomValue } from "jotai";
import { iconLibraryAtom } from "@/lib/atoms/icon-library";

const IconLucide = lazy(() => import("@/components/icon-libs/icon-lucide"));
const IconTabler = lazy(() => import("@/components/icon-libs/icon-tabler"));
const IconHugeicons = lazy(
  () => import("@/components/icon-libs/icon-hugeicons"),
);
const IconPhosphor = lazy(() => import("@/components/icon-libs/icon-phosphor"));

type Props = {
  lucide?: string;
  tabler?: string;
  hugeicons?: string;
  phosphor?: string;
} & SVGProps<SVGSVGElement>;

export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  className,
  ...rest
}: Props) {
  const lib = useAtomValue(iconLibraryAtom);
  const lookup = { lucide, tabler, hugeicons, phosphor };
  const name = lookup[lib] ?? lucide;
  if (!name) return null;
  const fallback = (
    <span
      className={className}
      style={{ display: "inline-block", width: "1em", height: "1em" }}
    />
  );
  return (
    <Suspense fallback={fallback}>
      {lib === "lucide" && (
        <IconLucide name={name} className={className} {...rest} />
      )}
      {lib === "tabler" && (
        <IconTabler name={name} className={className} {...rest} />
      )}
      {lib === "hugeicons" && (
        <IconHugeicons name={name} className={className} {...rest} />
      )}
      {lib === "phosphor" && (
        <IconPhosphor name={name} className={className} {...rest} />
      )}
    </Suspense>
  );
}
