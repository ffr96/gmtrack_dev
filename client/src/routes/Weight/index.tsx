import Main from "components/Main";
import WeightGraph from "./WeightGraph";
import WeightInformation from "./WeightInformation";

const WeightPage = () => {
  return (
    <Main>
      <div className="flex flex-row justify-center">
        <h1 className="p-6 text-3xl">
          Weight <b>Logs</b>
        </h1>
      </div>
      <div className="mb-2 flex flex-col bg-slate-200 p-6 shadow-md md:flex-row md:justify-around">
        <WeightGraph />
        <WeightInformation weightsToRender={0} />
      </div>
    </Main>
  );
};

export default WeightPage;
