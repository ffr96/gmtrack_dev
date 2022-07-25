type ButtonProps = {
  action: "SEND" | "DELETE";
  onClick?: () => void;
  children: string;
  type?: "submit" | "reset" | "button";
};

const Button = ({ action, type, onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`m-4 rounded-md p-2 px-6 text-center transition-colors hover:text-slate-200 md:w-fit ${
        action === "DELETE"
          ? "bg-red-400 hover:bg-red-500"
          : "bg-green-400 hover:bg-green-500"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
