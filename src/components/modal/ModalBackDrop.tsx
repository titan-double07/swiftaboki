import React, { ReactNode } from "react";

interface IModalBackDrop {
  children: ReactNode;
  closeModal(): void;
}
export default function ModalBackDrop({
  children,
  closeModal,
}: IModalBackDrop) {
  function close(e: any) {
    e.target.classList.contains("modal-backdrop") && closeModal();
  }
  return (
    <div className="modal-backdrop w-full h-screen fixed z-[10] left-0 top-0 flex justify-end bg-[#00000053]" onClick={close}>
      {children}
    </div>
  );
}
