import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    category: categorySlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export default store;
