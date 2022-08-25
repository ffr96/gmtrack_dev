import { ReactNode, useEffect, useRef, useState } from "react";
import { icons } from "utils/icons";

export const Modal = ({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) => {
  const [closing, setClosing] = useState(false);
  const modalref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalref) {
      if (modalref.current) {
        modalref.current.focus();
      }
    }
  });

  const handleClose = () => {
    setClosing(!closing);
    setTimeout(() => {
      closeModal();
    }, 350);
  };

  return (
    <div>
      <div
        className="fixed top-0 z-10 h-full w-full bg-gray-500/50"
        onClick={handleClose}
      ></div>
      <div
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeModal();
        }}
        ref={modalref}
        className={`${
          closing ? "animate-fadeOut" : "animate-fadeIn"
        } absolute inset-x-10 top-10 z-20 max-h-[80vh] overflow-y-scroll rounded-sm bg-white p-6 outline-none`}
      >
        <div
          className="fixed top-8 right-8 cursor-pointer"
          onClick={handleClose}
        >
          <div className="flex h-8 w-8 flex-col justify-center rounded-full bg-slate-200 text-center font-semibold shadow-md">
            {icons.close}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
