import { useState } from "react";

const useModal = (
  initialState = false
): [isOpen: boolean, openModal: () => void, closeModal: () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return [isOpen, openModal, closeModal];
};

export { useModal };
