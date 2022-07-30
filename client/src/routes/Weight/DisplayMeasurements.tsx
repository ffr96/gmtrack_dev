import { Measures } from "../../types";

/**
 * Displays measurement if present
 */

const DisplayMeasurements = ({ measures }: { measures: Measures }) => {
  const measureDisplay: Array<{ type: string; measure: number }> = [];

  for (const elem in measures) {
    measureDisplay.push({
      type: elem,
      measure: measures[elem as keyof Measures] as number,
    });
  }

  return (
    <div>
      {measureDisplay &&
        measureDisplay.map((display) => {
          return (
            <div key={display.type}>
              {display.type}: {display.measure}
            </div>
          );
        })}
    </div>
  );
};

export default DisplayMeasurements;
