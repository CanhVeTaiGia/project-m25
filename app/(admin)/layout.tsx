"use client";
import { getUserById } from "@/config/user.service";
import { UserType } from "@/interface/userType";
import { AdminHeaderUser } from "@/layouts/header/AdminHeader";

import AdminNavbar from "@/layouts/navbar/AdminNavbar";
import { RootType } from "@/redux/store";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const route = useRouter();
  const [currentId, setCurrentId] = useState<number | undefined>(() => {
    localStorage.getItem("userId");
    return localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!)
      : undefined;
  });
  const data = useSelector((state: RootType) => {
    return state.users;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById());
  }, []);

  useEffect(() => {
    if (!data) {
      route.push("/sign-in");
    }
  }, [currentId, dispatch]);
  return (
    <main className="w-[100%] flex h-[100vh]">
      <AdminNavbar></AdminNavbar>
      <div className="flex flex-col w-[87%]">{children}</div>
    </main>
  );
};

export default Admin;
