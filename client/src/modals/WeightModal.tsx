import React from "react";
import AddWeightForm from "../components/Forms/AddWeight";
import { Modal } from "../components/Modal";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

const WeightModal = ({ isModalOpen, onClose }: Props) => {
  return (
    (isModalOpen && (
      <Modal closeModal={onClose}>
        <div className="mb-12 flex flex-col items-center">
          <h3 className="pb-5 text-2xl">
            Add <b>new</b> weight log :
          </h3>
          <AddWeightForm />
        </div>
      </Modal>
    )) ||
    null
  );
};

export default WeightModal;
