import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AppHeader } from "@/components/app-header";

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
