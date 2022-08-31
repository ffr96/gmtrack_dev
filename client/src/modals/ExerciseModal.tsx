import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "state/reduxHooks";

import AddExerciseForm from "components/Forms/AddExercise";
import { Modal } from "components/Modal";
import { DisplayRoutine } from "components/DisplayRoutine";

import Button from "components/Button";
import { deleteLog } from "async/deleteLog";
import { raiseNotification } from "state/notificationReducer";
import { useGetLogByIdQuery } from "state/services/serverAPI";

interface ExerciseModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  logID: string;
}

const ExerciseModal = ({ isModalOpen, onClose, logID }: ExerciseModalProps) => {
  const user = useAppSelector((state) => state.user);
  let tl;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (user) {
    const { data } = useGetLogByIdQuery({ userID: user.id, logID: logID });
    tl = data;
  }

  const handleDelete = () => {
    if (user) {
      void deleteLog(user, dispatch, navigate, logID);
    } else {
      dispatch(
        raiseNotification({
          type: "WARNING",
          message: "Unexpected error",
        })
      );
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
