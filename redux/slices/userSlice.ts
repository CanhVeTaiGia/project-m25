import {
  addUser,
  changeUserStatus,
  getAllUser,
  getUserById,
} from "@/services/user.service";
import { UserType } from "@/interface/userType";
import { createSlice } from "@reduxjs/toolkit";


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
        state.users = action.payload;
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
      
  },
});
export default userSlice.reducer;
