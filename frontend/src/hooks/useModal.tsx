import { useState } from 'react';

/**
 * UseModal is a function that returns an array of three
 * elements: isOpen, open, and close. isOpen is a boolean
 * that is set to false by default. open is a function that
 * sets isOpen to true. close is a function that sets isOpen to false.
 * @returns An array of three elements.
 */
const useModal = (initialValue = false) => {
  const [isOpen, setOpen] = useState(initialValue);

  const open = () => setOpen(true);

  const close = () => setOpen(false);

  return [isOpen, open, close] as const;
};

export default useModal;
