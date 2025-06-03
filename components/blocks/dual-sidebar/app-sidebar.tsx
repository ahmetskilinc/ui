import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/registry/new-york/ui/dual-sidebar";
import React from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent className="relative overflow-hidden">
        <div>Hello</div>
      </SidebarContent>
      <SidebarFooter>
        <div>Hello</div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
