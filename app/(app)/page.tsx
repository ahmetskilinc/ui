import { BlockDisplay } from "@/components/block-display";

const FEATURED_BLOCKS = ["dual-sidebar"];

export default function Home() {
  return (
    <div className="max-w-[100rem] mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <main className="flex flex-col flex-1 gap-8">
        {FEATURED_BLOCKS.map((block) => (
          <div key={block} className="border-grid border-b py-8 first:pt-6 last:border-b-0 md:py-12">
            <BlockDisplay name={block} />
          </div>
        ))}
      </main>
    </div>
  );
}
