import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {
  clearOneTransaction,
  selectAddLoading,
  selectDeleteLoading,
  selectFetchLoading,
  selectFetchOneLoading,
  selectOneTransaction,
  selectTransactions,
  selectUpdateLoading,
} from "../store/transaction/transactionSlice.ts";
import { useEffect, useState } from "react";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from "../store/transaction/transactionThunks.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import TransactionItem from "../components/TransactionItem.tsx";
import { selectCategories, selectFetchLoadingCat, } from "../store/categories/categoriesSlice.ts";
import { fetchCategories } from "../store/categories/categoriesThunks.ts";
import ToolBar from "../components/ToolBar.tsx";
import { TransactionMutation } from "../types";
import TransactionForm from "../components/TransactionForm.tsx";

const Home = () => {
  const transactions = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const addLoading = useAppSelector(selectAddLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const oneTransaction = useAppSelector(selectOneTransaction);
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const categories = useAppSelector(selectCategories);
  const categoryFetchLoading = useAppSelector(selectFetchLoadingCat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const newTransactions = [...transactions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const incomeArr = newTransactions.filter((transaction) => {
    const category = categories.find(
      (item) => item.id === transaction.category,
    );
    if (category) {
      return category.type === "income";
    } else {
      return [];
    }
  });

  const expenseArr = newTransactions.filter((transaction) => {
    const category = categories.find(
      (item) => item.id === transaction.category,
    );
    if (category) {
      return category.type === "expense";
    } else {
      return [];
    }
  });

  const incomeTotal = incomeArr.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  const expenseTotal = expenseArr.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );

  const total = incomeTotal - expenseTotal;

  const onShowModal = () => {
    setTransactionId(null);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setTransactionId(null);
    dispatch(clearOneTransaction());
  };

  const onSubmitForm = async (newTran: TransactionMutation) => {
    if (transactionId) {
      await dispatch(updateTransaction({ id: transactionId, transaction: newTran }));
    } else {
      await dispatch(addTransaction(newTran));
    }
    await dispatch(fetchTransactions());
    setShowModal(false);
    dispatch(clearOneTransaction());
  };

  const onEditTransaction = (id: string) => {
    setTransactionId(id);
    setShowModal(true);
  };

  const onDeleteTransaction = async (id: string) => {
    if (window.confirm("Are you want delete this transaction?")) {
      await dispatch(deleteTransaction(id));
      await dispatch(fetchTransactions());
    }
  };

  return (
    <>
      <ToolBar onShowModal={onShowModal} />
      <div className="container">
        {fetchLoading || categoryFetchLoading ? (
          <Spinner />
        ) : (
          <>
            <div
              className="border p-3 mb-5 mt-5 rounded"
              style={{ maxWidth: "300px" }}
            >
              <h5>Total: {total} KGS</h5>
            </div>

            {newTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                categories={categories}
                onEdit={onEditTransaction}
                onDelete={onDeleteTransaction}
                deleteLoading={deleteLoading}
              />
            ))}

            {showModal && (
              <TransactionForm
                onSubmitFormToAdd={onSubmitForm}
                onClose={onCloseModal}
                isLoading={addLoading || updateLoading || fetchOneLoading}
                categories={categories}
                idTran={transactionId}
                isEdit={Boolean(transactionId)}
                oneTransaction={oneTransaction}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
