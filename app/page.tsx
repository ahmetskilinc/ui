import { BlockDisplay } from "@/components/block-display";

const FEATURED_BLOCKS = ["dual-sidebar"];

export default function Home() {
  return (
    <div className="max-w-[100rem] mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">ui.ahmet.studio</h1>
        <p className="text-muted-foreground">um its a registry.</p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {FEATURED_BLOCKS.map((block) => (
          <div key={block} className="border-grid container border-b py-8 first:pt-6 last:border-b-0 md:py-12">
            <BlockDisplay name={block} />
          </div>
        ))}
      </main>
    </div>
  );
}
