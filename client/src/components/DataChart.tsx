import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getMediaWidth } from "../utils/functionUtils";

export type DataForChart = {
  name: string;
  tooltipContent?: JSX.Element;
  data: Array<{
    xvalue: string | number;
    yvalue: string | number;
    extra?: Record<string, string | number | undefined>;
  }>;
};

const DataChart = (data: DataForChart) => {
  const isMediaWide = getMediaWidth();
  return (
    <div id="datachart">
      <h2 className="font-workSans text-xl">{data.name}</h2>
      <LineChart
        width={isMediaWide ? 500 : 300}
        height={isMediaWide ? 400 : 200}
        data={data.data}
        margin={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        <XAxis dataKey={"xvalue"} />
        <CartesianGrid />
        <YAxis />
        <Tooltip
          content={data.tooltipContent ? data.tooltipContent : undefined}
        />
        <Line
          type="monotone"
          activeDot={{ r: 8 }}
          dataKey={"yvalue"}
          stroke="#000"
        />
      </LineChart>
    </div>
  );
};

export default DataChart;
