import { Category } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  fetchOneCategoryById,
  fetchCategories,
  updateCategory,
} from "./categoriesThunks.ts";
import { RootState } from "../../app/store.ts";

interface CategoriesState {
  items: Category[];
  fetchLoading: boolean;
  addLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  oneCategory: Category | null;
}

const initialState: CategoriesState = {
  items: [],
  fetchLoading: false,
  addLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  deleteLoading: false,
  oneCategory: null,
};

export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchLoadingCat = (state: RootState) => state.categories.fetchLoading;
export const selectAddLoading = (state: RootState) => state.categories.addLoading;
export const selectFetchOneLoading = (state: RootState) => state.categories.fetchOneLoading;
export const selectUpdateLoading = (state: RootState) => state.categories.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.categories.deleteLoading;
export const selectOneCategory = (state: RootState) => state.categories.oneCategory;

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearOneCategory: (state) => {
      state.oneCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.items = categories;
        state.fetchLoading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(addCategory.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.addLoading = false;
      })
      .addCase(addCategory.rejected, (state) => {
        state.addLoading = false;
      })

      .addCase(fetchOneCategoryById.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneCategoryById.fulfilled, (state, { payload: category }) => {
        state.oneCategory = category;
        state.fetchOneLoading = false;
      })
      .addCase(fetchOneCategoryById.rejected, (state) => {
        state.fetchOneLoading = false;
      })

      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateLoading = false;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { clearOneCategory } = categoriesSlice.actions;