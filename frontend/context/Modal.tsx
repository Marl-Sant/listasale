'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  modalRef: React.RefObject<HTMLDivElement | null>;
  modalContent: ReactNode | null;
  setModalContent: (content: ReactNode | null) => void;
  setOnModalClose: (cb: (() => void) | null) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [onModalClose, setOnModalClose] = useState<(() => void) | null>(
    null
  );

  const closeModal = () => {
    setModalContent(null);
    if (typeof onModalClose === 'function') {
      const cb = onModalClose;
      setOnModalClose(null);
      cb();
    }
  };

  const contextValue: ModalContextType = {
    modalRef,
    modalContent,
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const ctx = useContext(ModalContext);
  if (!ctx) return null;

  const { modalRef, modalContent, closeModal } = ctx;

  if (!modalRef?.current || !modalContent) return null;

  return createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}
