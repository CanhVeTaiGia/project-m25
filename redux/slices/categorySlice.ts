import { CategoryType } from "@/interface/categoryType";
import {
  addCategory,
  changeCategoryStatus,
  deleteCategory,
  editCategory,
  getACategory,
  getCategory,
} from "@/services/category.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CategoryType[] = [];

const categorySlice: any = createSlice({
  name: "category",
  initialState: {
    category: initialState,
    editCategory: {
      id: 0,
      name: "",
      description: "",
      status: true,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = [...action.payload];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = [...action.payload];
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category = [...state.category, action.payload];
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.editCategory = action.payload;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const existingCategory = state.category.find((item: CategoryType) => {
          return item.id === action.payload.id;
        });
        if (existingCategory) {
          existingCategory.name = action.payload.name;
          existingCategory.description = action.payload.description;
        }
      });
  },
});

export default categorySlice.reducer;
