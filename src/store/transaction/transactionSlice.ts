import { Transaction } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, fetchTransactions } from "./transactionThunks.ts";
import { RootState } from "../../app/store.ts";

interface TransactionState {
  items: Transaction[];
  fetchLoading: boolean;
  addLoading: boolean;
}

const initialState: TransactionState = {
  items: [],
  fetchLoading: false,
  addLoading: false,
};

export const selectTransactions = (state: RootState) =>
  state.transactions.items;
export const selectFetchLoading = (state: RootState) =>
  state.transactions.fetchLoading;
export const selectAddLoading = (state: RootState) =>
  state.transactions.addLoading;

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, { payload: transactions }) => {
          state.items = transactions;
          state.fetchLoading = false;
        },
      )
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(addTransaction.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addTransaction.rejected, (state) => {
        state.addLoading = false;
      });
  },
});

export const transactionsReducer = transactionSlice.reducer;
