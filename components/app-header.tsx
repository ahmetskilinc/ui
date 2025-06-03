import { ModeToggle } from "./theme-toggle";

export const AppHeader = () => {
  return (
    <header className="">
      <div className="max-w-[100rem] mx-auto flex flex-row px-4 py-8 justify-between items-center">
        <h1 className="text-3xl font-medium tracking-tight">ui.ahmet.studio</h1>
        <ModeToggle />
      </div>
    </header>
  );
};
