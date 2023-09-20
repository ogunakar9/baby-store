import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  // incrementAsync,
  // incrementIfOdd,
  selectCartItems,
  addItem,
} from './cartSlice';
import styles from './Counter.module.css';

const Cart = () => {
  const value = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() =>
            dispatch(
              addItem({
                id: 0,
                title: '2',
                price: 2,
                description: '',
                category: 'string',
                image: '',
                rating: {
                  rate: 0,
                  count: 0,
                },
              })
            )
          }
        >
          -
        </button>
        <span className={styles.value}>{value[0].title}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          // onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          // onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          // onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          // onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};

export default Cart;
