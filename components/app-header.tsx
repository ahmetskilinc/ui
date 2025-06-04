import { ModeToggle } from "./theme-toggle";

export const AppHeader = () => {
  return (
    <header className="">
      <div className="mx-auto flex max-w-[100rem] flex-row items-center justify-between px-4 py-8">
        <h1 className="text-3xl font-medium tracking-tight">ui.ahmet.studio</h1>
        <ModeToggle />
      </div>
    </header>
  );
};
