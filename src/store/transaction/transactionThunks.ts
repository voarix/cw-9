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

export const fetchOneTransactionById = createAsyncThunk<Transaction, string>(
  "transactions/fetchOneTransactionById",
  async (id) => {
    const response = await axiosApi.get<Transaction | null>(`transactions/${id}.json`);
    const transaction = response.data;

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return {
      ...transaction,
      id,
    };
  }
);

export const updateTransaction = createAsyncThunk<void, { id: string; transaction: TransactionMutation }>(
  "transactions/updateTransaction",
  async ({ id, transaction }) => {
    await axiosApi.put(`transactions/${id}.json`, transaction);
  }
);