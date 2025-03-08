import React from "react";
import { Category, Transaction } from "../types";

interface Props {
  transaction: Transaction;
  categories: Category[];
  onEdit: (id: string) => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, categories, onEdit }) => {
  const category = categories.find(
    (categoryItem) => categoryItem.id === transaction.category,
  );
  const categoryAmount = category
    ? category.type === "income"
      ? "+"
      : "-"
    : null;
  const amountClass = category
    ? category.type === "income"
      ? "text-success fs-4"
      : "text-danger fs-4"
    : "";

  return (
    <div className="card mt-4 p-3">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-3">
          <span className="text-muted">
            {new Date(transaction.createdAt).toLocaleDateString()}{" "}
          </span>
          <h2 className="card-title mb-0">
            {category ? category.name : "Category not found"}
          </h2>
        </div>
        <div className="col-5 d-flex justify-content-between align-items-center">
          <span className={amountClass}>
            <strong>
              {categoryAmount}
              {transaction.amount}
            </strong>
          </span>
          <div>
            <button className="btn btn-primary me-3"  onClick={() => onEdit(transaction.id)}>Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
