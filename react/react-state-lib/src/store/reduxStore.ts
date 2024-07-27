import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// createSlice:  createReducer, createAction 역할을 동시에 수행
export const counterSlice = createSlice({
  name: 'couter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
