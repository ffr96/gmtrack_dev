import AddTrainingModal from "modals/TrainingModal";

import { useModal } from "modals/useModal";
import { InteractButton } from "components/InteractButton";
import Main from "components/Main";
import RecentTraining from "routes/LogsPage/RecentTraining";

const LogsPage = () => {
  const [trainingModal, openTrainingModal, closeTrainingModal] = useModal();

  return (
    <Main>
      <div>
        <h1 className="p-6 text-center text-3xl">
          Training <b>Logs</b>
        </h1>
        <div className="bg-slate-200 p-12">
          <RecentTraining logsToRender={0} />

          <AddTrainingModal
            isModalOpen={trainingModal}
            onClose={closeTrainingModal}
          />
        </div>
        <InteractButton onClick={openTrainingModal}>Add new log</InteractButton>
      </div>
    </Main>
  );
};

export default LogsPage;
