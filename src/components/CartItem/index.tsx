import RemoveIcon from '@mui/icons-material/Remove';
import './styles.scss';
import { useAppDispatch } from '../../app/hooks';
import { removeItem } from '../../features/cart/cartSlice';

const CartItem = (props: IItemProps) => {
  const { title, price, description, image, id } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeItem(props));
  };

  return (
    <div className="cart__item">
      <div className="cart__item__info">
        <img
          className="cart__item__info__image"
          src={image}
          alt={description}
        />
        <span className="cart__item__info__title">{title}</span>
      </div>
      <div className="cart__item__active">
        <div className="cart__item__active__price">
          <span className="cart__item__active__price__currency">$</span>
          <span className="cart__item__active__price__int">{price}</span>
        </div>
        <button className="cart__item__active__icon" onClick={handleClick}>
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

interface IItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
