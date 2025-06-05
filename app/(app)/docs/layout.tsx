import { DocsSidebar } from "@/components/docs-sidebar";
import { source } from "@/lib/source";
import { SidebarProvider } from "@/registry/default/components/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full max-w-[100rem] flex-1 flex-col gap-8 px-4">
      <SidebarProvider className="min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3">
        <DocsSidebar tree={source.pageTree} />
        <div className="h-full w-full">{children}</div>
      </SidebarProvider>
    </div>
  );
}
