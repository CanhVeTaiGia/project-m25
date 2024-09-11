import Footer from "@/layouts/footer/Footer";
import Header from "@/layouts/header/Header";
import React from "react";

interface UserLayout {
  children: React.ReactNode;
}
const userLayout: React.FC<UserLayout> = ({ children }) => {
  return (
    <div className="w-[100%] h-[100vh] flex flex-col">
      <Header />
      {children}
      <Footer/>
    </div>
  );
};

export default userLayout;
