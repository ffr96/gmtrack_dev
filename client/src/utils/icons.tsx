import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const icons = {
  home: <FontAwesomeIcon icon={solid("home")} />,
  book: <FontAwesomeIcon icon={solid("book")} />,
  penToSquare: <FontAwesomeIcon icon={solid("pen-to-square")} />,
  dumbbell: (bounce?: boolean) => (
    <FontAwesomeIcon icon={solid("dumbbell")} bounce={bounce} />
  ),
  spinner: <FontAwesomeIcon icon={solid("spinner")} spin />,
  weightScale: <FontAwesomeIcon icon={solid("weight-scale")} />,
  arrowRight: <FontAwesomeIcon icon={solid("arrow-right-from-bracket")} />,
  close: <FontAwesomeIcon icon={solid("circle-xmark")} />,
  ok: <FontAwesomeIcon icon={solid("circle-check")} />,
  warning: <FontAwesomeIcon icon={solid("circle-exclamation")} />,
  error: <FontAwesomeIcon icon={solid("circle-xmark")} color="red" />,
  github: <FontAwesomeIcon icon={brands("github")} />,
  web: <FontAwesomeIcon icon={solid("globe")} />,
};
