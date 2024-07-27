import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { decrement, increment } from '../store/reduxStore';

interface IProp {}

const ReduxView: FC<IProp> = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const onClickIncrement = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const onClickDecrement = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  return (
    <div>
      <h2>Redux</h2>
      <div>state: {count} </div>
      <button onClick={onClickIncrement}>+</button>
      <button onClick={onClickDecrement}>-</button>
    </div>
  );
};

export default ReduxView;
