import { useEffect, useState, RefObject } from 'react';

const useOutSideClick = (ref: RefObject<HTMLDivElement>) => {
  const [isOutSideClicked, setIsOutSideClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref && !ref.current?.contains(e.target as Node)) {
        setIsOutSideClicked(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, isOutSideClicked]);

  return isOutSideClicked;
};

export default useOutSideClick;
