import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import {
  clearOneCategory,
  selectAddLoading,
  selectCategories,
  selectDeleteLoading,
  selectFetchLoadingCat,
  selectFetchOneLoading,
  selectOneCategory,
  selectUpdateLoading,
} from "../store/categories/categoriesSlice.ts";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  fetchOneCategoryById,
  updateCategory,
} from "../store/categories/categoriesThunks.ts";
import Spinner from "../UI/Spinner/Spinner.tsx";
import { CategoryMutation } from "../types";
import CategoryForm from "../components/CategoryForm.tsx";
import Toolbar from "../components/ToolBar.tsx";
import CategoryItem from "../components/CategoryItem.tsx";

const Categories: React.FC = () => {
  const categories = useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectFetchLoadingCat);
  const addLoading = useAppSelector(selectAddLoading);
  const fetchOneLoading = useAppSelector(selectFetchOneLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const oneCategory = useAppSelector(selectOneCategory);

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [categoryId, setEditingCategoryId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onDeleteCategory = async (id: string) => {
    if (window.confirm("Are you want delete this category?")) {
      await dispatch(deleteCategory(id));
      dispatch(fetchCategories());
    }
  };

  const onSubmitForm = async (category: CategoryMutation) => {
    if (categoryId) {
      await dispatch(updateCategory({ id: categoryId, category }));
    } else {
      await dispatch(addCategory(category));
    }
    setShowModal(false);
    setEditingCategoryId(null);
    dispatch(fetchCategories());
  };

  const onShowModal = () => {
    setEditingCategoryId(null);
    dispatch(clearOneCategory());
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setEditingCategoryId(null);
    dispatch(clearOneCategory());
  };

  const onEditCategory = (id: string) => {
    setEditingCategoryId(id);
    setShowModal(true);
    dispatch(clearOneCategory());
  };

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchOneCategoryById(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <>
      <Toolbar onShowModal={onShowModal} />
      <div className="container mt-5">
        {fetchLoading ? (
          <Spinner />
        ) : (
          <>
            <ul className="list-group">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onEdit={() => onEditCategory(category.id)}
                  onDelete={() => onDeleteCategory(category.id)}
                  deleteLoading={deleteLoading}
                />
              ))}
            </ul>

            {showModal && (
              <CategoryForm
                onClose={onCloseModal}
                onSubmit={onSubmitForm}
                oneCategory={oneCategory}
                isLoading={addLoading || updateLoading || fetchOneLoading}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Categories;