import { AppHeader } from "@/components/app-header";
import { Analytics } from "@vercel/analytics/next";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppHeader />
      {children}
      <Analytics />
    </>
  );
};

export default AppLayout;
