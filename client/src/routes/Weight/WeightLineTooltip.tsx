import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts";
import DisplayMeasurements from "components/DisplayMeasurements";
import { Measures } from "types";

/** Tooltip info to pass to DataChart component. It will display date, weight and, if present, measurement values.
 * TODO: type this correctly.
 */

const TooltipContent = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border-2 border-black/50 bg-slate-100/70 p-4">
        <h1 className="font-workSans text-lg">
          <b>{label}</b>: {payload[0].value}kg/lb
        </h1>

        {
          <DisplayMeasurements
            measures={payload[0].payload.extra as Measures}
          />
        }
      </div>
    );
  }
  return null;
};

export default TooltipContent;
