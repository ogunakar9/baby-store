import './styles.scss';
import { ICardProps } from './types';
import Button from '../Button';

const Card = (props: ICardProps) => {
  const { id, title, price, description, category, image, rating } = props;
  const { rate, count } = rating;

  //TODO: add tooltip to title

  const priceInt = price.toString().split('.')[0];
  let priceDigit = price.toString().split('.')[1];

  if (priceDigit) {
    priceDigit = '.' + priceDigit;
  }

  return (
    <div className="card">
      <div>
        <img className="card__image" src={image} alt={title} />
        <span className="card__image__rating">{rate}</span>
      </div>
      <div className="card__title">
        <span className="card__title__text">{title}</span>
      </div>
      <div className="card__price">
        <span className="card__price__currency">$</span>
        <span className="card__price__int">{priceInt}</span>
        <span className="card__price__digit">{priceDigit}</span>
      </div>
      <Button handleClick={() => {}} />
    </div>
  );
};

export default Card;
