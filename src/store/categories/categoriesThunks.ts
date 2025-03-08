import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Category, CategoryApi, CategoryMutation } from "../../types";

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

export const addCategory = createAsyncThunk<void, CategoryMutation>(
  "categories/addCategory",
  async (category) => {
    await axiosApi.post("categories.json", category);
  },
);

export const fetchOneCategoryById = createAsyncThunk<Category, string>(
  "categories/fetchOneCategoryById",
  async (id) => {
    const response = await axiosApi.get<Category | null>(`categories/${id}.json`);
    const category = response.data;

    if (!category) {
      throw new Error("Category not found");
    }

    return {
      ...category,
      id,
    };
  }
);

export const updateCategory = createAsyncThunk<void, { id: string; category: CategoryMutation }>(
  "categories/updateCategory",
  async ({ id, category }) => {
    await axiosApi.put(`categories/${id}.json`, category);
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  "categories/deleteCategory",
  async (id) => {
    await axiosApi.delete(`categories/${id}.json`);
  }
);