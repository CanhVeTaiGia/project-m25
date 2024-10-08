import { url } from "@/baseUrl/url";
import { UserType } from "@/interface/userType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export const getAllUser: any = createAsyncThunk(
  "users/getAllUser",
  async ({
    sort,
    search,
  }: {
    sort: string | undefined | null;
    search: string | undefined | null;
  }) => {
    let query = "";

    if (search && search !== "") {
      query += `?username_like=${search}`;
    }
    if (sort && sort !== "") {
      query += `${query ? "&" : "?"}_sort=username&_order=${sort}`;
    }
    const response: AxiosResponse = await axios.get(`${url}/users${query}`);

    return response.data;
  }
);

export const getUserById: any = createAsyncThunk(
  "users/getUserById",
  async (id: number) => {
    const response: AxiosResponse = await axios.get(`${url}/users/${id}`);
    return response.data;
  }
);

export const changeUserStatus: any = createAsyncThunk(
  "users/changeUserStatus",
  async ({ id, status }: { id: number; status: boolean }) => {
    console.log(id);

    const response = await axios.patch(`${url}/users/${id}`, {
      status: !status,
    });
    return response.data;
  }
);

export const addUser: any = createAsyncThunk(
  "users/addUser",
  async (user: any) => {
    const res: AxiosResponse = await axios.post(`${url}/users`, user);
    return res.data;
  }
);

export const addToCart: any = createAsyncThunk(
  "cart/addToCart",
  async (user: UserType) => {
    const res: AxiosResponse = await axios.patch(
      `${url}/users/${user.id}`,
      user
    );
    return res.data;
  }
);

export const editTheUser: any = createAsyncThunk(
  "users/editTheUser",
  async (user: any) => {
    console.log(user);

    if (user) {
      const res: AxiosResponse = await axios.put(`${url}/users/${user.id}`);
      return res.data;
    }
  }
);

export const updateUser: any = createAsyncThunk(
  "users/updateUser",
  async (user: any) => {
    if (user) {
      const res: AxiosResponse = await axios.put(
        `${url}/users/${user.id}`,
        user
      );
      return res.data;
    }
  }
);
