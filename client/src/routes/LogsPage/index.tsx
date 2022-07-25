import { useState } from "react";
import AddTrainingModal from "../../modals/TrainingModal";
import AddExcModal from "../../modals/ExerciseModal";
import { useAppSelector } from "../../state/reduxHooks";
import { useModal } from "../../modals/useModal";

const LogsPage = () => {
  const trainingLog = useAppSelector((state) => state.training);
  const [trainingModal, openTrainingModal, closeTrainingModal] = useModal();
  const [isExcModalOpen, openExcModal, closeExcModal] = useModal();
  const [logID, setlogID] = useState<string>("");

  const handleExcModal = (id: string) => {
    setlogID(id);
    openExcModal();
  };

  return (
    <div>
      <div>
        {trainingLog &&
          trainingLog.map((tl) => {
            return (
              <div key={tl.date}>
                <div
                  onClick={() => {
                    if (tl.id) {
                      handleExcModal(tl.id);
                    }
                  }}
                >
                  <div>
                    <b>Training on day</b>: {tl.date}{" "}
                  </div>
                  <div>
                    <b>Comments </b> about the day: {tl.comments}{" "}
                  </div>
                  <div>
                    <b>Routine </b> performed: {tl.tags && tl.tags.toString()}{" "}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <AddTrainingModal
        isModalOpen={trainingModal}
        onClose={closeTrainingModal}
      />

      <AddExcModal
        isModalOpen={isExcModalOpen}
        onClose={closeExcModal}
        logID={logID}
      />

      <button onClick={openTrainingModal}>Add new log</button>
    </div>
  );
};

export default LogsPage;
