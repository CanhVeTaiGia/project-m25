import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getProducts: any = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res: AxiosResponse = await axios.get('https/localhost:8080/products')
    }
)