"use client";
import { getUserById } from "@/config/user.service";
import { UserType } from "@/interface/userType";
import AdminHeader from "@/layouts/header/AdminHeader";
import AdminNavbar from "@/layouts/navbar/AdminNavbar";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [currentId, setCurrentId] = useState<number | undefined>(() => {
    localStorage.getItem("userId");
    return localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!)
      : undefined;
  });
  const data = useSelector((state: any) => {
    return state.userSlice;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById());
  }, []);
  return (
    <html lang="vi">
      <body>
        <main className="w-[100%] flex h-[100vh]">
          <AdminNavbar></AdminNavbar>
          <div className="flex flex-col w-[87%]">
            <AdminHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Admin;
