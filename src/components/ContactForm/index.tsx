import './styles.scss';
import { IFormProps } from './types';

const Form = (props: IFormProps) => {
  return (
    <div className="form">
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
