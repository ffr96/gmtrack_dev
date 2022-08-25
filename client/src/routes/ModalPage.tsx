import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "modals/useModal";
import ExerciseModal from "modals/ExerciseModal";

const ModalPage = () => {
  const { id } = useParams();
  const [isOpen] = useModal(true);
  const navigate = useNavigate();

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div>
      {id && (
        <ExerciseModal logID={id} isModalOpen={isOpen} onClose={onCloseModal} />
      )}
    </div>
  );
};

export default ModalPage;
