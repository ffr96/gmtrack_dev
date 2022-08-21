import DataChart from "../../components/DataChart";
import { useAppSelector } from "../../state/reduxHooks";
import { useGetWeightQuery } from "../../state/services/serverAPI";
import { Measures } from "../../types";
import TooltipContent from "./WeightLineTooltip";
import { getDate } from "../../utils/functionUtils";

const WeightGraph = () => {
  const user = useAppSelector((state) => state.user);
  const { data: weight, isLoading } = useGetWeightQuery(user?.id);
  let data: Array<{
    xvalue: string | number;
    yvalue: string | number;
    extra: Measures | undefined;
  }> = [];
  if (weight) {
    data = weight.map((wht) => {
      return {
        yvalue: wht.weight,
        xvalue: getDate(wht.date),
        extra: wht.measures,
      };
    });
  }

  if (isLoading) return <div>loading...</div>;
  return (
    <DataChart
      name="Recent Weight Data"
      data={data}
      tooltipContent={<TooltipContent />}
    />
  );
};

export default WeightGraph;
