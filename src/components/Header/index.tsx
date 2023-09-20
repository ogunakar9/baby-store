import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './styles.scss';

const Header = () => {
  return (
    <div className="header">
      <button className="header__button">
        <ShoppingCartCheckoutIcon className="header__button__icon" />
      </button>
    </div>
  );
};

export default Header;
