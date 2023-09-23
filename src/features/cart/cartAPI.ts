// A mock function to mimic making an async request for data

import { ICardProps } from '../../components/Card/types';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/';
const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';

//TODO: create cart getter from firebase
export async function productsRequest() {
  return await getterFunc(PRODUCTS_URL);
}

export async function categoriesRequest() {
  return await getterFunc<ICardProps>(CATEGORIES_URL);
}

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
