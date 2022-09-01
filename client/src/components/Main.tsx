import clsx from "clsx";
import React from "react";

const Main = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={clsx(
        "flex min-h-screen flex-col overflow-x-scroll",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Main;
