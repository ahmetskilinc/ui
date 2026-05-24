"use client";

import { ComponentProps } from "react";
import { IconPlaceholder } from "@/components/icon-placeholder";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/registry/default/components/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <IconPlaceholder
          lucide="GalleryVerticalEndIcon"
          tabler="IconLayoutNavbarCollapse"
          hugeicons="Layout03Icon"
          phosphor="StackIcon"
          className="size-4"
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <IconPlaceholder
          lucide="AudioLinesIcon"
          tabler="IconWaveSine"
          hugeicons="AudioWave01Icon"
          phosphor="WaveSineIcon"
          className="size-4"
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <IconPlaceholder
          lucide="CommandIcon"
          tabler="IconCommand"
          hugeicons="CommandIcon"
          phosphor="CommandIcon"
          className="size-4"
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="SquareTerminalIcon"
          tabler="IconTerminal2"
          hugeicons="TerminalIcon"
          phosphor="TerminalWindowIcon"
        />
      ),
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="BotIcon"
          tabler="IconRobot"
          hugeicons="Robot01Icon"
          phosphor="RobotIcon"
        />
      ),
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="BookOpenIcon"
          tabler="IconBook"
          hugeicons="Book01Icon"
          phosphor="BookOpenIcon"
        />
      ),
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="Settings2Icon"
          tabler="IconAdjustments"
          hugeicons="Setting06Icon"
          phosphor="GearSixIcon"
        />
      ),
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="FrameIcon"
          tabler="IconFrame"
          hugeicons="Layout01Icon"
          phosphor="FrameCornersIcon"
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="PieChartIcon"
          tabler="IconChartPie"
          hugeicons="PieChart01Icon"
          phosphor="ChartPieIcon"
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <IconPlaceholder
          lucide="MapIcon"
          tabler="IconMap"
          hugeicons="MapsIcon"
          phosphor="MapTrifoldIcon"
        />
      ),
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
