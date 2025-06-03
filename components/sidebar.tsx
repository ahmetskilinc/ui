import { SidebarProvider } from "@/registry/new-york/ui/dual-sidebar";
import { SidebarInset } from "@/registry/new-york/ui/dual-sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { RightSidebar } from "./right-sidebar";
import { Header } from "./header";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar side="left" />
      <SidebarInset className="h-full overflow-hidden">
        <Header />
        <div>Hello</div>
      </SidebarInset>
      <RightSidebar side="right" />
    </SidebarProvider>
  );
};

export default Sidebar;
