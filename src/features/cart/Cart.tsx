import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  // incrementAsync,
  // incrementIfOdd,
  selectCartItems,
  addItem,
} from './cartSlice';
import './styles.scss';

const Cart = (props: IFormProps) => {
  const { formRef, setIsVisible } = props;
  const items = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  //TODO: extract to custom hook
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef && !formRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef, setIsVisible]);

  return (
    <div className="cart" ref={formRef}>
      {items.map((item) => {
        console.log(item);
        return <></>;
      })}
    </div>
  );
};

export default Cart;

interface IFormProps {
  formRef: React.RefObject<HTMLDivElement>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
