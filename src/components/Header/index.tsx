import { useState, useRef, forwardRef } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './styles.scss';
import Modal from '../Modal';
import Cart from '../../features/cart/Cart';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { cartItems } from '../../features/cart/cartSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(cartItems);

  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);

  const handleClick = () => setIsVisible(!isVisible);

  const InnerElement = forwardRef(() => {
    return <Cart formRef={formRef} setIsVisible={setIsVisible} />;
  });

  //TODO: add badge to shoppingcart icon
  return (
    <div className="header">
      <button
        className="header__button"
        onClick={handleClick}
        disabled={!items.length}
      >
        <ShoppingCartCheckoutIcon className="header__button__icon" />
      </button>
      <Modal isVisible={isVisible}>
        <InnerElement />
      </Modal>
    </div>
  );
};

export default Header;
