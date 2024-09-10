import { ProductType } from "@/interface/productType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getProducts: any = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res: AxiosResponse = await axios.get(
      "http://localhost:8080/products"
    );

    return res.data;
  }
);

export const addProduct: any = createAsyncThunk(
  "products/addProducts",
  async (product: any) => {
    const res: AxiosResponse = await axios.post(
      "http://localhost:8080/products",
      product
    );
    return res.data;
  }
);

export const editTheProduct: any = createAsyncThunk(
  "products/editProduct",
  async (product: ProductType) => {
    const res: AxiosResponse = await axios.patch(
      `http://localhost:8080/products/${product.id}`,
      { ...product }
    );
    return res.data;
  }
);

export const deleteProduct: any = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    const res: AxiosResponse = await axios.get(
      "http://localhost:8080/products"
    );
    return res.data;
  }
);

export const getProduct: any = createAsyncThunk(
  "products/getProduct",
  async (id: number) => {
    const res: AxiosResponse = await axios.get(
      `http://localhost:8080/products/${id}`
    );
    return res.data;
  }
);
