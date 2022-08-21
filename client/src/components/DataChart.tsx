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
    extra?: any;
  }>;
};

const DataChart = (data: DataForChart) => {
  const mediaIsWide = getMediaWidth();
  return (
    <div>
      <h2 className="font-workSans text-xl">{data.name}</h2>
      <LineChart
        width={mediaIsWide ? 500 : 300}
        height={mediaIsWide ? 400 : 200}
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
