import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import './styles.scss';

const Header = () => {
  return (
    <div className="header">
      <button>
        <ShoppingCartCheckoutIcon className="header__icon" />
      </button>
    </div>
  );
};

export default Header;
