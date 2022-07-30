import { ReactNode } from "react";

const Footer = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className="mt-20 flex h-5 w-full 
    flex-row items-center justify-start bg-teal-300 p-5 font-workSans drop-shadow"
    >
      <div> Gm Track // 2022 </div>
    </div>
  );
};

export default Footer;
