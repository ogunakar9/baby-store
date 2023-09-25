import { IFormProps } from './types';
import LockIcon from '@mui/icons-material/Lock';
import './styles.scss';
import { useOutSideClick } from '../../app/hooks';

const Form = (props: IFormProps) => {
  const { formRef, setIsVisible } = props;
  useOutSideClick(formRef, () => setIsVisible(false));

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
      <div>
        <input type="checkbox" />
        <span>I accept my information to be used in commercial purposes.</span>
      </div>
      <div>
        <LockIcon />
        <span>
          Your personal information is being processed in accordance with law
        </span>
      </div>
      <div>
        <button>SEND</button>
      </div>
    </div>
  );
};

export default Form;
