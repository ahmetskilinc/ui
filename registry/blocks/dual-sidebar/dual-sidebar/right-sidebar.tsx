import { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/registry/ui/dual-sidebar";

export function RightSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarRail />
      <SidebarContent>
        <div className="p-4">Hello</div>
      </SidebarContent>
    </Sidebar>
  );
}
