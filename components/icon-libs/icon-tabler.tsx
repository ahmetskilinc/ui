import type { ComponentType, SVGProps } from "react";
import * as Icons from "@/registry/icons/__tabler__";

type IconRecord = Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>> | undefined
>;

export default function IconTabler({
  name,
  ...rest
}: { name: string } & SVGProps<SVGSVGElement>) {
  const Icon = (Icons as unknown as IconRecord)[name];
  if (!Icon) return null;
  return <Icon {...rest} />;
}
