import './styles.scss';
import { IFormProps } from './types';
import { useEffect } from 'react';

const Form = (props: IFormProps) => {
  const { formRef, setIsVisible } = props;

  //TODO: extract to custom hook
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef && !formRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef, setIsVisible]);

  return (
    <div className="form" ref={formRef}>
      <span className="form__title">
        Leave your information, we will contact you
      </span>
      <div className="form__input">
        <input className="form__input__item" type="text" />
      </div>
      <div className="form__input">
        <input className="form__input__item" type="text" />
      </div>
      <div className="form__input">
        <input className="form__input__item" type="text" />
      </div>
    </div>
  );
};

export default Form;
