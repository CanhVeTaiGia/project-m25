import { url } from "@/baseUrl/url";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getAllUser: any = createAsyncThunk(
    "users/getAllUser",
    async () => {
        const response: AxiosResponse = await axios.get(`${url}/users`);
        return response.data;
    }
);

export const getUserById: any = createAsyncThunk(
    'users/getUserById',
    async (id: number) => {
        const response: AxiosResponse = await axios.get(`${url}/users/${id}`);
        return response.data;
    }
)

export const changeUserStatus: any = createAsyncThunk(
    "users/changeUserStatus",
    async ({ id, status }: { id: number, status: boolean }) => {
        console.log(id);
        
        const response = await axios.patch(`${url}/users/${id}`, { status: !status });
        return response.data;
    }
)

export const addUser: any = createAsyncThunk(
    "users/addUser",
    async (user: any) => {
        const res: AxiosResponse = await axios.post(`${url}/users`, user);
        return res.data;
    }
)
