import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import CloseIcon from '@mui/icons-material/Close';
import './styles.scss';
import { ICardProps } from './types';
import Button from '../Button';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCartItems,
  addItem,
  removeItem,
} from '../../features/cart/cartSlice';

const Card = (props: ICardProps) => {
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const { id, title, price, description, category, image, rating } = props;
  const { rate, count } = rating;

  //TODO: add tooltip to title

  const priceInt = price.toString().split('.')[0];
  let priceDigit = price.toString().split('.')[1];

  if (priceDigit) {
    priceDigit = '.' + priceDigit;
  }

  const addItemToCart = () => {
    //prevent adding same item
    if (items.includes(props)) {
      return;
    }
    dispatch(addItem(props));
  };

  const removeItemFromCart = () => {
    dispatch(removeItem(props));
  };

  const RemoveItemButton = () => {
    return items.includes(props) ? (
      <button className="card__image__close" onClick={removeItemFromCart}>
        <CloseIcon fontSize="small" />
      </button>
    ) : (
      <></>
    );
  };

  return (
    <div className="card">
      <div className="card__image">
        <RemoveItemButton />
        <img className="card__image__el" src={image} alt={title} />
        <div className="card__image__rating">
          <span className="card__image__rating__text">{rate}</span>
          <StarBorderPurple500Icon className="card__image__rating__icon" />
        </div>
      </div>
      <div className="card__title">
        <span className="card__title__text">{title}</span>
      </div>
      <div className="card__price">
        <span className="card__price__currency">$</span>
        <span className="card__price__int">{priceInt}</span>
        <span className="card__price__digit">{priceDigit}</span>
      </div>
      <Button handleClick={addItemToCart} />
    </div>
  );
};

export default Card;
