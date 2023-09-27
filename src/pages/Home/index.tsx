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
  status,
  products,
} from '../../features/cart/cartSlice';
// import { db } from '../../firebase.config';
// import { collection, getDocs, collectionGroup } from 'firebase/firestore';
// import {
//   collectionGroup,
//   query,
//   where,
//   getDocs,
//   collection,
//   Firestore,
// } from 'firebase/firestore';

const Home = () => {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector(status);
  const productItems = useAppSelector(products);

  // console.log('productItems', productItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const items = useAppSelector(filteredProducts);

  //TODO: check out collectionGroup to retrive nested collections
  // useEffect(() => {
  //   const getter = async () => {
  //     const museums = query(collectionGroup(db, 'products'));
  //     const querySnapshot = await getDocs(museums);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  //   };

  //   getter();
  // }, []);

  // useEffect(() => {
  //   // Get a list of cities from your database
  //   async function getCities(db: Firestore) {
  //     const citiesCol = collection(db, 'products');
  //     const citySnapshot = await getDocs(citiesCol);
  //     const cityList = citySnapshot.docs.map((doc) => doc.data());
  //     return cityList;
  //   }

  //   getCities(db).then((data) => {
  //     console.log('data', data);
  //   });
  // }, [items]);

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
      {fetchStatus === 'loading' && (
        <CircularProgress className="container__loader" />
      )}
      <Footer />
    </div>
  );
};

export default Home;
