// A mock function to mimic making an async request for data

import { ICardProps } from '../../components/Card/types';

const PRODUCTS_URL = 'https://fakestoreapi.com/products/';
const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';

//TODO: create cart getter from firebase
export function productsRequest() {
  getterFunc<ICardProps>(PRODUCTS_URL);
}

export function categoriesRequest() {
  getterFunc(CATEGORIES_URL);
}

const getterFunc = <T>(url: string) => {
  return new Promise<T>(async (resolve) => {
    const res = await fetch(url);
    const json = await res.json();
    resolve(json);
  });
};
