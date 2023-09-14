import './styles.scss';
import { useState } from 'react';
import Modal from '../Modal';
import ContactForm from '../ContactForm';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleClick = () => toggleVisibility();

  return (
    <div className="footer">
      <span>lorem ipsum</span>
      <button onClick={handleClick} className="footer__button">
        Contact us
      </button>
      <Modal isVisible={isVisible}>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default Footer;
