import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">{children}</div>
  );
};

export default Main;
