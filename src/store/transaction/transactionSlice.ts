import { Transaction } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchOneTransactionById,
  fetchTransactions,
  updateTransaction
} from "./transactionThunks.ts";
import { RootState } from "../../app/store.ts";

interface TransactionState {
  items: Transaction[];
  fetchLoading: boolean;
  addLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  oneTransaction: Transaction | null;
}

const initialState: TransactionState = {
  items: [],
  fetchLoading: false,
  addLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false,
  oneTransaction: null,
};

export const selectTransactions = (state: RootState) =>
  state.transactions.items;
export const selectFetchLoading = (state: RootState) =>
  state.transactions.fetchLoading;
export const selectAddLoading = (state: RootState) =>
  state.transactions.addLoading;
export const selectFetchOneLoading = (state: RootState) => state.transactions.fetchOneLoading;
export const selectUpdateLoading = (state: RootState) => state.transactions.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;


const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearOneTransaction: (state) => {
      state.oneTransaction = null;
    }
  },
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
      })

      .addCase(fetchOneTransactionById.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneTransactionById.fulfilled, (state, { payload: transaction }) => {
        state.oneTransaction = transaction;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneTransactionById.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(updateTransaction.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateTransaction.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateTransaction.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const transactionsReducer = transactionSlice.reducer;
export const {clearOneTransaction} = transactionSlice.actions;