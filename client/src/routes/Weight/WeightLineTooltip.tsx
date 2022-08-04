import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { TooltipProps } from "recharts";
import DisplayMeasurements from "../../components/DisplayMeasurements";

const TooltipContent = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-2 border-black/50 bg-slate-100/50 p-4">
        <p>
          {label}: {payload[0].value}
        </p>
        {<DisplayMeasurements measures={payload[0].payload.extra} />}
      </div>
    );
  }
  return null;
};

export default TooltipContent;
