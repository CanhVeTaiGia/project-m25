import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response: AxiosResponse = await axios.get("http://localhost:8080/users");
        return response.data;
    }
);

export const getUserById: any = createAsyncThunk(
    'users/getUserById',
    async (id: number) => {
        const response: AxiosResponse = await axios.get(`http://localhost:8080/users/${id}`);
        return response.data;
    }
)