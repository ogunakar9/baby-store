import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.scss';
import Card from '../../components/Card';
import Filters from '../../components/Filters';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchProducts,
  fetchCategories,
  filteredProducts,
} from '../../features/cart/cartSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const items = useAppSelector(filteredProducts);

  // {
  //     "id": 1,
  //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "price": 109.95,
  //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //     "rating": {
  //         "rate": 3.9,
  //         "count": 120
  //     }
  // }

  // useEffect(() => {
  //   const response = await fetch("", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //     body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   });
  // }, [products]);

  return (
    <div className="container">
      <Header />
      <div className="container__items">
        <Filters />
        <div className="container__items__cards">
          {items?.map((product) => (
            <Card {...product} key={product.id} />
          ))}
        </div>
      </div>
      {!items?.length && <CircularProgress className="container__loader" />}
      <Footer />
    </div>
  );
};

export default Home;
