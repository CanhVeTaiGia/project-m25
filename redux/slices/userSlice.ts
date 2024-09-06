import { getAllUser, getUserById } from "@/services/user.service";
import { UserType } from "@/interface/userType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserType[] = [];
const userSlice: any = createSlice({
    name: "users",
    initialState: {
        users: initialState,
        user: {}
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
    }
});
export default userSlice.reducer;