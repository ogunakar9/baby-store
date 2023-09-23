// A mock function to mimic making an async request for data

import { ICardProps } from '../../components/Card/types';

//TODO: create cart getter from firebase
export function productsRequest() {
  return new Promise<any>(async (resolve) => {
    const res = await fetch('https://fakestoreapi.com/products');
    const json = await res.json();
    resolve(json);
  });
}
