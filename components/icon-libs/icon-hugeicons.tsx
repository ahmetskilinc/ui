import type { SVGProps } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@/registry/icons/__hugeicons__";

type HugeProps = React.ComponentProps<typeof HugeiconsIcon>;
type IconRecord = Record<string, HugeProps["icon"] | undefined>;

export default function IconHugeicons({
  name,
  ...rest
}: { name: string } & SVGProps<SVGSVGElement>) {
  const icon = (Icons as unknown as IconRecord)[name];
  if (!icon) return null;
  const { strokeWidth: _strokeWidth, ...safeRest } = rest;
  void _strokeWidth;
  return (
    <HugeiconsIcon
      {...(safeRest as Omit<HugeProps, "icon">)}
      icon={icon}
    />
  );
}
