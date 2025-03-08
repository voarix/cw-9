import React, { useEffect, useState } from "react";
import { Category, CategoryMutation } from "../types";

interface Props {
  onClose: () => void;
  onSubmit: (category: CategoryMutation) => void;
  oneCategory?: Category | null;
  isLoading?: boolean;
}

const CategoryForm: React.FC<Props> = ({ onClose, onSubmit, oneCategory, isLoading }) => {
  const [name, setName] = useState(oneCategory?.name || "");
  const [type, setType] = useState<string>(oneCategory?.type || "income");

  useEffect(() => {
    setName(oneCategory?.name || "");
    setType(oneCategory?.type || "income");
  }, [oneCategory]);

  const onSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type });
  };

  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{oneCategory ? "Edit" : "Add"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmitAdd}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  id="type"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  disabled={isLoading}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Saving..." : oneCategory ? "Edit" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;