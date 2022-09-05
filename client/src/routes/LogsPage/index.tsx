import AddTrainingModal from "modals/TrainingModal";
import { useState } from "react";

import { useModal } from "modals/useModal";
import { InteractButton } from "components/InteractButton";
import Main from "components/Main";
import RecentTraining from "routes/LogsPage/RecentTraining";
import FilterOptions from "components/FilterOptions";

const LogsPage = () => {
  const [trainingModal, openTrainingModal, closeTrainingModal] = useModal();
  const [name, setName] = useState<string>("");
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();

  return (
    <Main>
      <AddTrainingModal
        isModalOpen={trainingModal}
        onClose={closeTrainingModal}
      />
      <div>
        <h1 className="p-6 text-center text-3xl">
          Training <b>Logs</b>
        </h1>
        <div className="bg-slate-200 p-12 shadow-md">
          <div className="flex flex-col items-center justify-center">
            <h1 className="p-1 text-2xl">Filter by:</h1>
            <FilterOptions
              name={name}
              from={from}
              to={to}
              setName={setName}
              setFrom={setFrom}
              setTo={setTo}
            />
          </div>
          <RecentTraining logsToRender={0} filter={{ name, from, to }} />
        </div>
      </div>
      <InteractButton onClick={openTrainingModal}>Add new log</InteractButton>
    </Main>
  );
};

export default LogsPage;
