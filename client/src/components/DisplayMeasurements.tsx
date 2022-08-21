import { Measures } from "../types";
import { capitalizeFirstLetter } from "../utils/functionUtils";

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
    <div className="pt-5">
      {measureDisplay &&
        measureDisplay.map((display, i) => {
          return (
            <table key={display.type} className="w-full">
              <tbody>
                <tr className={`${i % 2 ? "bg-slate-300" : ""}`}>
                  <td className="text-left">
                    {capitalizeFirstLetter(display.type)}:
                  </td>
                  <td className="text-right">{display.measure}cm/inch</td>
                </tr>
              </tbody>
            </table>
          );
        })}
    </div>
  );
};

export default DisplayMeasurements;
