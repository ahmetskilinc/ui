import { BlockDisplay } from "@/components/block-display";

const FEATURED_BLOCKS = ["dual-sidebar"];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[100rem] flex-col gap-8 px-4 py-8">
      <main className="flex flex-1 flex-col gap-8">
        {FEATURED_BLOCKS.map((block) => (
          <div
            key={block}
            className="border-b border-grid py-8 first:pt-6 last:border-b-0 md:py-12"
          >
            <BlockDisplay name={block} />
          </div>
        ))}
      </main>
    </div>
  );
}
