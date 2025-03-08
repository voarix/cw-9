import {
  Category,
  TransactionFormMutation,
  TransactionMutation,
} from "../types";
import React, { useState } from "react";
import ButtonSpinner from "../UI/Spinner/ButtonSpinner/ButtonSpinner.tsx";

interface Props {
  onSubmitFormToAdd: (newTran: TransactionMutation) => void;
  // idTran?: string;
  isEdit?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  categories: Category[];
}

const initialForm: TransactionFormMutation = {
  type: "expense",
  category: "",
  amount: 0,
};

const TransactionForm: React.FC<Props> = ({
  onSubmitFormToAdd,
  isEdit = false,
  isLoading = false,
  onClose,
  categories,
}) => {
  const [form, setForm] = useState<TransactionFormMutation>(initialForm);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.category && form.amount) {
      const selectedCategory = categories.find(
        (category) => category.name === form.category,
      );
      if (!selectedCategory) {
        alert("Категрия не найдена");
      } else {
        const transactionToSend = {
          category: selectedCategory.id,
          amount: Number(form.amount),
          createdAt: new Date().toISOString(),
        };

        onSubmitFormToAdd(transactionToSend);
      }
    } else {
      alert("Заполните все поля!");
    }
  };

  const newCategories = categories.filter(
    (category) => category.type === form.type,
  );

  return (
    <>
      <div
        className="modal show"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7  )" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitFormHandler}>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={form.type}
                    onChange={inputChangeHandler}
                    disabled={isLoading}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={form.category}
                    onChange={inputChangeHandler}
                    disabled={isLoading}
                  >
                    {newCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="form-control"
                    value={form.amount}
                    onChange={inputChangeHandler}
                    disabled={isLoading}
                    min={0}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <ButtonSpinner /> : isEdit ? "Save" : "Add"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
