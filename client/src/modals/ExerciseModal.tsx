import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "state/reduxHooks";

import AddExerciseForm from "components/Forms/AddExercise";
import { Modal } from "components/Modal";
import { DisplayRoutine } from "components/DisplayRoutine";

import Button from "components/Button";
import { raiseNotification } from "state/notificationReducer";
import {
  useDeleteLogMutation,
  useGetLogByIdQuery,
} from "state/services/serverAPI";
import Spinner from "components/Spinner";

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
  const [deleteLog, { isSuccess, isError }] = useDeleteLogMutation();

  if (user) {
    const { data, isLoading } = useGetLogByIdQuery({
      userID: user.id,
      logID: logID,
    });
    tl = data;
  }

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(
        raiseNotification({
          type: "SUCCESS",
          message: "Success removing log!",
        })
      );
      navigate(-1);
    }
    if (isError) {
      dispatch(
        raiseNotification({
          type: "ERROR",
          message: "Error while removing log!",
        })
      );
    }
  }, [isSuccess, isError]);

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
