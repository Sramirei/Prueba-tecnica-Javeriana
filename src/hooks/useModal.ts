import { useCallback, useState } from 'react';

interface UseModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (initialState = false): UseModalResult => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};
