import { ComponentsList } from "@/components/components-list";

const Page = () => {
  return (
    <main className="mx-auto flex max-w-[100rem] flex-1 flex-col gap-8 p-4">
      <div className="max-w-3xl">
        <ComponentsList />
      </div>
    </main>
  );
};

export default Page;
