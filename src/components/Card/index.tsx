import './styles.scss';
import { ICardProps } from './types';

const Card = (props: ICardProps) => {
  const { id, title, price, description, category, image, rating } = props;
  const { rate, count } = rating;

  return (
    <div className="card">
      <img className="card__image" src={image} alt={title} />
      <span className="card__title">{title}</span>
      <span>{price}</span>
      <button>add to cart</button>
    </div>
  );
};

export default Card;
