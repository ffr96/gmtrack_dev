import React from "react";
import { Outlet } from "react-router-dom";
import { InteractButton } from "../../components/InteractButton";
import Main from "../../components/Main";
import TrainingModal from "../../modals/TrainingModal";
import { useModal } from "../../modals/useModal";

/**
 * Landing page after a user is successfuly logged in.
 */

import { useAppSelector } from "../../state/reduxHooks";
import { icons } from "../../utils/icons";
import RecentTraining from "./RecentTraining";

const UserInfo = () => {
  const [trainingModal, openTrainingModal, closeTrainingModal] = useModal();
  const user = useAppSelector((state) => state.user?.name);
  return (
    <Main>
      <TrainingModal isModalOpen={trainingModal} onClose={closeTrainingModal} />
      <div className="flex flex-row justify-center">
        <h1 className="p-6 text-3xl">
          Welcome <b>{user}</b>
        </h1>
      </div>
      <div className="mb-2 bg-slate-200 p-6 shadow-md">
        <h1 className="pb-5 text-2xl">Recent training entries:</h1>
        <RecentTraining />
      </div>
      <InteractButton onClick={openTrainingModal}>
        {icons.penToSquare} Add new training entry
      </InteractButton>
      <Outlet />
    </Main>
  );
};

export default UserInfo;
