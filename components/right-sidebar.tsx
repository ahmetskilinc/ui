import * as React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/registry/new-york/ui/dual-sidebar";

export function RightSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarRail />
      <SidebarHeader>
        <div>Hello</div>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
    </Sidebar>
  );
}
