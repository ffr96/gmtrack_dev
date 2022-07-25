import { icons } from "../../utils/icons";

const MessageBar = ({ type, message }: { type: string; message: string }) => {
  let bgColor = "bg-black";
  let icon = icons.ok;
  if (type === "SUCCESS") bgColor = "bg-green-300";
  if (type === "WARNING") {
    bgColor = "bg-orange-300";
    icon = icons.warning;
  }
  if (type === "ERROR") {
    bgColor = "bg-red-300";
    icon = icons.error;
  }
  return (
    <div
      className={`fixed right-[0%] left-[0%] top-[15%] z-50 m-auto w-fit animate-fadeIn flex-row rounded-lg p-2 text-center`}
    >
      <div
        className={`${bgColor} flex flex-row items-center justify-center p-2`}
      >
        <div className={`h-6 w-6`}>{icon}</div>
        <div className="px-2 underline">{message}</div>
      </div>
    </div>
  );
};

export default MessageBar;
