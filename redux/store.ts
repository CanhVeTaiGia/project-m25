import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    category: categorySlice,
    products: productSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export default store;
