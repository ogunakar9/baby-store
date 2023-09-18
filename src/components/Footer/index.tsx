import { useState, useRef, forwardRef } from 'react';
// import useOutSideClick from '../../hooks/useOutSideClick';
import './styles.scss';
import Modal from '../Modal';
import ContactForm from '../ContactForm';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);
  //TODO: implement custom hook
  // const isClickedOutside = useOutSideClick(formRef);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleClick = () => toggleVisibility();

  const InnerElement = forwardRef(() => {
    return <ContactForm formRef={formRef} setIsVisible={setIsVisible} />;
  });

  return (
    <div className="footer">
      <span>lorem ipsum</span>
      <button onClick={handleClick} className="footer__button">
        Contact us
      </button>
      <Modal isVisible={isVisible}>
        <InnerElement />
      </Modal>
    </div>
  );
};

export default Footer;
