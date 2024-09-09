import { CategoryType } from "@/interface/categoryType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import React from "react";

export const getCategory: any = createAsyncThunk(
  "category/getCategory",
  async () => {
    const res: AxiosResponse = await axios.get(
      "http://localhost:8080/category"
    );
    return res.data;
  }
);

export const changeCategoryStatus: any = createAsyncThunk(
  "category/changeCategoryStatus",
  async ({ id, status }: { id: number; status: number }) => {
    const res: AxiosResponse = await axios.patch(
      `http://localhost:8080/category/${id}`,
      { status: status }
    );
    return res.data;
  }
);

export const addCategory: any = createAsyncThunk(
  "category/addCategory",
  async (category: CategoryType) => {
    const res: AxiosResponse = await axios.post(
      "http://localhost:8080/category",
      category
    );
    return res.data;
  }
);

export const deleteCategory: any = createAsyncThunk(
  "category/deleteCategory",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/category/${id}`);
    const res: AxiosResponse = await axios.get(
      `http://localhost:8080/category`
    );
    return res.data;
  }
);
