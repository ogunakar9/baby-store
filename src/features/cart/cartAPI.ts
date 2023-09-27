import { db } from '../../firebase.config';
import {
  collectionGroup,
  query,
  where,
  getDocs,
  collection,
} from 'firebase/firestore';
import { ICardProps } from '../../components/Card/types';
import { Firestore } from 'firebase/firestore';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/';
const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';

const PRODUCTS = 'products';

//TODO: create cart getter from firebase
export async function productsRequest() {
  return await getterFunc(PRODUCTS_URL);
}

export async function categoriesRequest() {
  return await getterFunc<ICardProps>(CATEGORIES_URL);
}

export const productGet = async () => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      // const res = await fetch(url);
      // const json = await res.json();
      // resolve(json);

      const productsCol = collection(db, PRODUCTS);
      const productsSnapshot = await getDocs(productsCol);
      const productList = productsSnapshot.docs.map((doc) => doc.data());
      resolve(productList);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const getterFunc = async <T>(url: string) => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      resolve(json);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

// async function getCities(db: Firestore) {
//   const citiesCol = collection(db, 'products');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

// getCities(db).then((data) => {
//   console.log('data', data);
// });
