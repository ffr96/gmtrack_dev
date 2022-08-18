import { ReactNode } from "react";
import { icons } from "../utils/icons";

const Footer = ({ children }: { children?: ReactNode }) => {
  return (
    <div
      className="mt-20 flex h-5 w-full 
    flex-row items-center bg-teal-300 p-5 font-workSans drop-shadow"
    >
      <div> Gm Track | 2022 </div>
      <a href="http://github.com/ffr96" className="px-1 pl-5">
        {icons.github}
      </a>
      <a href="http://simpleportf.vercel.app">{icons.web}</a>
    </div>
  );
};

export default Footer;
