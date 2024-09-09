import { CategoryType } from "@/interface/categoryType";
import {
  changeCategoryStatus,
  deleteCategory,
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
        state.category = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        const existingUser = state.category.find(
          (item: CategoryType) => item.id === action.payload.id
        );
      });
  },
});

export default categorySlice.reducer;
