import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { selectFetchLoading, selectTransactions } from "../store/transaction/transactionSlice.ts";
import { useEffect } from "react";
import { fetchTransactions } from "../store/transaction/transactionThunks.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import TransactionItem from "../components/TransactionItem.tsx";
import { selectCategories } from "../store/categories/categoriesSlice.ts";
import { fetchCategories } from "../store/categories/categoriesThunks.ts";

const Home = () => {
  const transactions = useAppSelector(selectTransactions);
  const fetchLoading = useAppSelector(selectFetchLoading);

  const categories = useAppSelector(selectCategories);

  console.log(categories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
        {fetchLoading ? (
         <Spinner/>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} categories={categories} />
          ))
        )}
    </>
  );
};

export default Home;