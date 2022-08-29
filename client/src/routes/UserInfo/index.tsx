import React from "react";
import { Outlet } from "react-router-dom";
import { InteractButton } from "components/InteractButton";
import Main from "components/Main";
import TrainingModal from "modals/TrainingModal";
import WeightModal from "modals/WeightModal";
import { useModal } from "modals/useModal";

/**
 * Landing page after a user is successfuly logged in.
 */

import { useAppSelector } from "../../state/reduxHooks";
import { icons } from "../../utils/icons";
import WeightInformation from "../Weight/WeightInformation";
import RecentTraining from "../LogsPage/RecentTraining";

const UserInfo = () => {
  const [trainingModal, openTrainingModal, closeTrainingModal] = useModal();
  const [weightModal, openWeightModal, closeWeightModal] = useModal();
  const user = useAppSelector((state) => state.user?.username);
  return (
    <Main>
      <TrainingModal isModalOpen={trainingModal} onClose={closeTrainingModal} />
      <WeightModal isModalOpen={weightModal} onClose={closeWeightModal} />
      <div className="flex flex-row justify-center">
        <h1 className="p-6 text-3xl">
          Welcome <b>{user}</b>
        </h1>
      </div>
      <div className="mb-2 bg-slate-200 p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h1 className="pb-5 text-2xl">Recent training entries:</h1>
            <RecentTraining />
          </div>
          <div>
            <h1 className="pb-5 text-2xl">Recent weight entries:</h1>
            <WeightInformation displayMeasures={false} />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center">
        <InteractButton onClick={openTrainingModal}>
          {icons.penToSquare} Add new training entry
        </InteractButton>
        <InteractButton onClick={openWeightModal}>
          {icons.penToSquare} Add new weight entry
        </InteractButton>
      </div>
      <Outlet />
    </Main>
  );
};

export default UserInfo;
