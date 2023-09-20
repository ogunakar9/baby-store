import './styles.scss';
import { IButtonProps } from './types';

const Button = (props: IButtonProps) => {
  const { handleClick } = props;
  return (
    <button
      className="button"
      onClick={() => {
        handleClick();
      }}
    >
      Add to cart
    </button>
  );
};

export default Button;
