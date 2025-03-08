import React from "react";
import { Category } from "../types";

interface Props {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
  deleteLoading: boolean;
}

const CategoryItem: React.FC<Props> = ({ category, onEdit, onDelete, deleteLoading }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        {category.name} ({category.type})
      </span>
      <div>
        <button className="btn btn-warning me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;