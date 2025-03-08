import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Transaction, TransactionApi, TransactionMutation } from "../../types";

export const fetchTransactions = createAsyncThunk<Transaction[], void>(
  "transactions/fetchTransactions",
  async () => {
    const response = await axiosApi<TransactionApi | null>("transactions.json");
    const transactionsListObject = response.data;

    if (!transactionsListObject) {
      return [];
    } else {
      return Object.keys(transactionsListObject).map((transactionId) => {
        const transaction = transactionsListObject[transactionId];
        return {
          ...transaction,
          id: transactionId,
        };
      });
    }
  },
);

export const addTransaction = createAsyncThunk<void, TransactionMutation>(
  "transactions/addTransaction",
  async (transaction) => {
    await axiosApi.post("transactions.json", transaction);
  },
);
