import './styles.scss';
import { createPortal } from 'react-dom';
import { IModalProps } from './types';
import { useEffect } from 'react';

const Modal: React.FC<IModalProps> = ({ children, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return createPortal(<div className="modal">{children}</div>, document.body);
};

export default Modal;
