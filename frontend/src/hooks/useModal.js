import { useState, useCallback } from 'react';

export default function useModal(initial = null) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const openWith = useCallback((payload) => {
    setData(payload);
    setIsOpen(true);
  }, []);

  return { isOpen, data, open, close, openWith };
}