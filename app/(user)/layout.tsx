'use client'
import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import React from "react";

interface UserLayout {
  children: React.ReactNode;
}
const userLayout: React.FC<UserLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default userLayout;
