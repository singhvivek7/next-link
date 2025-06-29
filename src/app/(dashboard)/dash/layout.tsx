import DashHeader from "@/components/dash-header";
import { PropsWithChildren } from "react";

export default ({ children }: PropsWithChildren) => {
  return (
    <main>
      <DashHeader />
      {children}
      <footer>Footer</footer>
    </main>
  );
};
