import { ProductType } from "@/interface/productType";
import {
  addProduct,
  deleteProduct,
  editTheProduct,
  getProduct,
  getProducts,
} from "@/services/product.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductType[] = [];
const productSlice: any = createSlice({
  name: "products",
  initialState: {
    products: initialState,
    editProduct: {
      id: 0,
      categoryId: 0,
      name: "",
      price: 0,
      image: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = [...action.payload];
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = [...action.payload];
      })
      .addCase(editTheProduct.fulfilled, (state, action) => {
        const existingProduct = state.products.findIndex(
          (item: ProductType) => {
            return item.id === action.payload.id;
          }
        );
        if (existingProduct !== -1) {
          state.products[existingProduct] = action.payload;
        }
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.editProduct = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
