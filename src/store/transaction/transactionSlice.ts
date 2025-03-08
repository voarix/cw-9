import { Transaction } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transactionThunks.ts";
import { RootState } from "../../app/store.ts";

interface TransactionState {
  items: Transaction[];
  fetchLoading: boolean;
}

const initialState: TransactionState = {
  items: [],
  fetchLoading: false,
};

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectFetchLoading = (state: RootState) => state.transactions.fetchLoading;

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, { payload: transactions }, ) => {
        state.items = transactions;
        state.fetchLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const transactionsReducer = transactionSlice.reducer;