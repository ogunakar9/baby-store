import './styles.scss';
import { IButtonProps } from './types';

const Button = (props: IButtonProps) => {
  const { handleClick, type } = props;

  return (
    <button
      className={`button ${type === 'add' ? 'remove' : 'add'}`}
      onClick={() => {
        handleClick();
      }}
    >
      {type === 'add' ? 'Remove from cart' : 'Add to cart'}
    </button>
  );
};

export default Button;
