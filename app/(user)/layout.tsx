"use client";
import GotBan from "@/components/GotBan";
import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import { RootType } from "@/redux/store";
import { getUserById } from "@/services/user.service";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface UserLayout {
  children: React.ReactNode;
}
const userLayout: React.FC<UserLayout> = ({ children }) => {
  const [currentId, setCurrentId] = useState<number | null>(() => {
    const id = localStorage.getItem("id");
    return id ? parseInt(id) : null;
  });
  const { user }: any = useSelector((state: RootType) => {
    return state.users;
  });

  useEffect(() => {
    if (currentId) {
      getUserById(currentId);
    }
  }, []);
  return (
    <>
    {user.status || <GotBan/>}
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default userLayout;
