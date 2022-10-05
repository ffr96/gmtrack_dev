import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "state/reduxHooks";

import AddExerciseForm from "components/Forms/AddExercise";
import { Modal } from "components/Modal";
import { DisplayRoutine } from "components/DisplayRoutine";

import Button from "components/Elements/Button";
import {
  useDeleteLogMutation,
  useGetLogByIdQuery,
} from "state/services/serverAPI";

interface ExerciseModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  logID: string;
}

const ExerciseModal = ({ isModalOpen, onClose, logID }: ExerciseModalProps) => {
  const user = useAppSelector((state) => state.user);
  let tl;
  const navigate = useNavigate();
  const [deleteLog, { isSuccess }] = useDeleteLogMutation();

  if (user) {
    const { data } = useGetLogByIdQuery({
      userID: user.id,
      logID: logID,
    });
    tl = data;
  }

  React.useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  const handleDelete = () => {
    if (user) {
      void deleteLog({ userId: user.id, id: logID });
    }
  };

  return (
    (isModalOpen && (
      <Modal closeModal={onClose}>
        <div className="flex flex-col justify-evenly md:flex-row">
          <div>
            <h1>Add exercise to current log:</h1>
            <AddExerciseForm id={logID} />
          </div>
          <div className="relative">
            {tl && (
              <div>
                <DisplayRoutine tl={tl} />
              </div>
            )}
            <div className="flex flex-row justify-end">
              <Button onClick={handleDelete} action="DELETE">
                Delete log
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    )) ||
    null
  );
};

export default ExerciseModal;
