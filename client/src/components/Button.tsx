import React from "react";

const Button = ({
  action,
  ...props
}: { action?: "SEND" | "DELETE" } & React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={`m-4 rounded-md p-2 px-6 text-center font-workSans transition-colors hover:text-slate-200 md:w-fit ${
        action === "DELETE"
          ? "bg-red-400 hover:bg-red-500"
          : "bg-green-400 hover:bg-green-500"
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
