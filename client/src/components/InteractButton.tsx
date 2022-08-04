import { ReactNode } from "react";

const InteractButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  const rand = Math.round(Math.random());
  return (
    <div
      className={`mt-8 ml-12 w-60 cursor-pointer rounded-lg 
    bg-slate-200 p-1 shadow-md transition-all hover:translate-x-2 hover:scale-110 
    hover:border-2 ${rand ? "hover:border-teal-300" : "hover:border-pink-300"}`}
      onClick={onClick}
    >
      <h1 className="p-2 text-center text-xl">{children}</h1>
    </div>
  );
};

export { InteractButton };
