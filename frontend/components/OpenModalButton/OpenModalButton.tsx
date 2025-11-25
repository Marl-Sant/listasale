'use client';

import { ReactNode } from 'react';
import { useModal } from '../../context/Modal';

interface OpenModalButtonProps {
  modalComponent: ReactNode; // component to render inside the modal
  buttonText: string;        // text for the trigger button
  onButtonClick?: () => void;
  onModalClose?: () => void;
}

export default function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
}: OpenModalButtonProps) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === 'function') onButtonClick();
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}
