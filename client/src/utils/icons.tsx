import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export const icons = {
  book: <FontAwesomeIcon icon={solid("book")} />,
  penToSquare: <FontAwesomeIcon icon={solid("pen-to-square")} />,
  dumbbell: <FontAwesomeIcon icon={solid("dumbbell")} />,
  weightScale: <FontAwesomeIcon icon={solid("weight-scale")} />,
  arrowRight: <FontAwesomeIcon icon={solid("arrow-right-from-bracket")} />,
  close: <FontAwesomeIcon icon={solid("circle-xmark")} />,
  ok: <FontAwesomeIcon icon={solid("circle-check")} />,
  warning: <FontAwesomeIcon icon={solid("circle-exclamation")} />,
  error: <FontAwesomeIcon icon={solid("circle-xmark")} color="red" />,
};
