import DataChart from "../../components/DataChart";
import Main from "../../components/Main";
import WeightInformation from "./WeightInformation";
import WeightLineTooltip from "./WeightLineTooltip";

const WeightPage = () => {
  const data = [
    { yvalue: 65.6, xvalue: "20 abr", extra: { calves: 22, chest: 32 } },
    { yvalue: 64.5, xvalue: "21 abr" },
    { yvalue: 66, xvalue: "25 abr" },
    { yvalue: 66.2, xvalue: "27 abr" },
    { yvalue: 67, xvalue: "30 abr" },
    { yvalue: 69, xvalue: "5 may" },
    { yvalue: 71, xvalue: "25 jun" },
  ];
  return (
    <Main>
      <div className="flex flex-row justify-center">
        <h1 className="p-6 text-3xl">
          Weight <b>Logs</b>
        </h1>
      </div>
      <div className="mb-2 bg-slate-200 p-6 shadow-md md:flex-row">
        <DataChart
          name="Recent weight logs"
          data={data}
          tooltipContent={<WeightLineTooltip />}
        />
        <WeightInformation weightsToRender={0} />
      </div>
    </Main>
  );
};

export default WeightPage;
