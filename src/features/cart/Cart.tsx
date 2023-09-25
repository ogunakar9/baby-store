import React, { useEffect } from 'react';
import { useAppSelector, useOutSideClick } from '../../app/hooks';
import { cartItems } from './cartSlice';
import './styles.scss';
import CartItem from '../../components/CartItem';

const Cart = (props: IFormProps) => {
  const { formRef, setIsVisible } = props;
  const items = useAppSelector(cartItems);

  useOutSideClick(formRef, () => setIsVisible(false));

  useEffect(() => {
    if (!items.length) {
      setIsVisible(false);
    }
  }, [items, setIsVisible]);

  return (
    <div className="cart" ref={formRef}>
      <span className="cart__title">Products in your cart</span>
      {items.map(({ title, price, description, image, id }) => {
        const itemProps = { title, price, description, image, id };
        return <CartItem key={id} {...itemProps} />;
      })}
    </div>
  );
};

export default Cart;

interface IFormProps {
  formRef: React.RefObject<HTMLDivElement>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
