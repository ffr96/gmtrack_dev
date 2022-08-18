import { icons } from "../../utils/icons";

const WelcomeBanner = () => {
  return (
    <div
      className="w-full animate-colorsPalette py-10 
     shadow-lg"
    >
      <h2 className="animate-fadeInSlow text-center font-raleway text-4xl font-bold">
        Welcome to Gmtrack!{" "}
        <span className="translate-x-20 animate-spin transition-all">
          {icons.dumbbell(true)}
        </span>
      </h2>
    </div>
  );
};

export default WelcomeBanner;
