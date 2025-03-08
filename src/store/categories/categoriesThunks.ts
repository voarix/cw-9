import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Category, CategoryApi } from "../../types";

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchCategories",
  async () => {
    const response = await axiosApi<CategoryApi | null>("categories.json");
    const categoriesListObject = response.data;

    if (!categoriesListObject) {
      return [];
    } else {
      return Object.keys(categoriesListObject).map((categoryId) => {
        const category = categoriesListObject[categoryId];
        return {
          ...category,
          id: categoryId,
        };
      });
    }
  },
);
