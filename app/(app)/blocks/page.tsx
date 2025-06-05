import { BlockDisplay } from "@/components/block-display";

const FEATURED_BLOCKS = ["dual-sidebar"];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-[100rem] flex-1 flex-col gap-8 p-4">
      {FEATURED_BLOCKS.map((block) => (
        <div
          key={block}
          className="border-b border-grid py-8 first:pt-6 last:border-b-0"
        >
          <BlockDisplay name={block} />
        </div>
      ))}
    </main>
  );
}
