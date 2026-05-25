import { ComponentsPillList } from "@/components/home/components-pill-list";
import { Featured } from "@/components/home/featured";
import { Hero } from "@/components/home/hero";

const Page = () => {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Featured />
      <ComponentsPillList />
    </main>
  );
};

export default Page;
