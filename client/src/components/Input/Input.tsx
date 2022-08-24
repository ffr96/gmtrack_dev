import { ComponentPropsWithoutRef } from "react";

const Input = ({ ...props }: ComponentPropsWithoutRef<"input">) => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <span className="pr-2">{props.name}:</span>
      <input
        className={`m-2 h-4 border-b-4 ${
          props.disabled ? "border-teal-200" : "border-teal-400"
        } bg-slate-50 p-4 transition-colors duration-500 focus:border-violet-400 focus:outline-none`}
        {...props}
      />
    </div>
  );
};

export default Input;
