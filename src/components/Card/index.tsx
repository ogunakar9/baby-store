import { useMemo } from 'react';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import CloseIcon from '@mui/icons-material/Close';
import './styles.scss';
import { ICardProps } from './types';
import Button from '../Button';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  cartItems,
  products,
  addItem,
  removeItem,
} from '../../features/cart/cartSlice';

const Card = (props: ICardProps) => {
  const selectedItems = useAppSelector(cartItems);
  const allItems = useAppSelector(products);
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
    if (selectedItems.includes(props)) {
      return;
    }
    dispatch(addItem(props));
  };

  const removeItemFromCart = () => {
    dispatch(removeItem(props.id));
  };

  const isItemSelected = useMemo(
    () => selectedItems.includes(props),
    [props, selectedItems]
  );

  const RemoveItemButton = () => {
    return isItemSelected ? (
      <button className="card__image__close" onClick={removeItemFromCart}>
        <CloseIcon fontSize="small" />
      </button>
    ) : (
      <></>
    );
  };

  const ButtonSection = () => {
    return isItemSelected ? (
      <Button handleClick={removeItemFromCart} type="add" />
    ) : (
      <Button handleClick={addItemToCart} type="remove" />
    );
  };

  return (
    <div className={`card ${isItemSelected ? 'selected' : ''}`}>
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
      <ButtonSection />
    </div>
  );
};

export default Card;
