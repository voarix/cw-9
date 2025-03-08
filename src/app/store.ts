import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "../store/transaction/transactionSlice.ts";
import { categoriesReducer } from "../store/categories/categoriesSlice.ts";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
