import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {
  selectFetchLoading,
  selectTransactions,
} from "../store/transaction/transactionSlice.ts";
import { useEffect, useState } from "react";
import {
  addTransaction,
  fetchTransactions,
} from "../store/transaction/transactionThunks.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import TransactionItem from "../components/TransactionItem.tsx";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../store/categories/categoriesSlice.ts";
import { fetchCategories } from "../store/categories/categoriesThunks.ts";
import ToolBar from "../components/ToolBar.tsx";
import { TransactionMutation } from "../types";
import TransactionForm from "../components/TransactionForm.tsx";

const Home = () => {
  const transactions = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectFetchLoading);

  const [showModal, setShowModal] = useState(false);

  const categories = useAppSelector(selectCategories);
  const categoryFetchLoading = useAppSelector(selectCategoriesLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const incomeArr = transactions.filter((transaction) => {
    const category = categories.find(
      (item) => item.id === transaction.category,
    );
    if (category) {
      return category.type === "income";
    } else {
      return [];
    }
  });

  const expenseArr = transactions.filter((transaction) => {
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
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onSubmitForm = async (newTran: TransactionMutation) => {
    await dispatch(addTransaction(newTran));
    await dispatch(fetchTransactions());
    setShowModal(false);
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

            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                categories={categories}
              />
            ))}

            {showModal && (
              <TransactionForm
                onSubmitFormToAdd={onSubmitForm}
                onClose={onCloseModal}
                isLoading={false}
                categories={categories}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
