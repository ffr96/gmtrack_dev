import { useState } from "react";
import Main from "components/Main";
import PageNavigation from "components/PageNavigation";
import WeightGraph from "./WeightGraph";
import WeightInformation from "./WeightInformation";
import FilterOptions from "components/FilterOptions";

const WeightPage = () => {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<
    { name?: string; to?: string; from?: string } | undefined
  >();
  return (
    <Main>
      <div className="flex flex-row justify-center">
        <h1 className="p-6 text-3xl">
          Weight <b>Logs</b>
        </h1>
      </div>
      <div className="flex flex-col items-center bg-slate-200 p-6 shadow-md">
        <PageNavigation currentPage={page} changePage={setPage} />
        <FilterOptions filter={filter} setFilter={setFilter} />
        <div className="mb-2 flex w-full flex-col pt-5 md:flex-row md:justify-around">
          <WeightGraph />
          <WeightInformation page={page} filter={filter} />
        </div>
      </div>
    </Main>
  );
};

export default WeightPage;
