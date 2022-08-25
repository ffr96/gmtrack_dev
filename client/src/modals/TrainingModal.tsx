import React from "react";
import AddTrainingForm from "components/Forms/AddTraining";
import { Modal } from "components/Modal";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

const TrainingModal = ({ isModalOpen, onClose }: Props) => {
  return (
    (isModalOpen && (
      <Modal closeModal={onClose}>
        <div className="mb-12 flex flex-col items-center">
          <h3 className="pb-5 text-2xl">
            Add <b>new</b> training log :
          </h3>
          <AddTrainingForm />
        </div>
      </Modal>
    )) ||
    null
  );
};

export default TrainingModal;
