import {
  addToCart,
  addUser,
  changeUserStatus,
  editTheUser,
  getAllUser,
  getUserById,
  updateUser,
} from "@/services/user.service";
import { UserType } from "@/interface/userType";
import { createSlice } from "@reduxjs/toolkit";
import { editCategory } from "@/services/category.service";

const initialState: UserType[] = [];
const userSlice: any = createSlice({
  name: "users",
  initialState: {
    users: initialState,
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.users = [...action.payload];
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const existingUser = state.users.find(
          (item: UserType) => item.id === action.payload.id
        );
        if (existingUser) {
          existingUser.status = action.payload.status;
        }
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addToCart.fulfilled, (state: any, action: any) => {
        const foundUser = state.users.findIndex((item: UserType) => {
          return item.id === action.payload.userId;
        });
        if (foundUser !== -1) {
          state.users[foundUser] = [...action.payload];
        }
      })
      .addCase(editTheUser.fulfilled, (state: any, action) => {
        const existingUserIndex = state.users.findIndex(
          (item: UserType) => item.id === action.payload.id
        );
        if (existingUserIndex !== -1) {
          state.users = [
            ...state.users.slice(0, existingUserIndex),
            { ...state.users[existingUserIndex], ...action.payload },
            ...state.users.slice(existingUserIndex + 1),
          ];
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const existingUserIndex = state.users.findIndex(
          (item: UserType) => item.id === action.payload.id
        );
        if (existingUserIndex !== -1) {
          state.users = [
            ...state.users.slice(0, existingUserIndex),
            { ...state.users[existingUserIndex], ...action.payload },
            ...state.users.slice(existingUserIndex + 1),
          ];
        }
      });
  },
});
export default userSlice.reducer;
