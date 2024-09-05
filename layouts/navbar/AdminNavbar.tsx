"use client";
import { UserType } from "@/interface/userType";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminNavbar = () => {
  // route
  const route = useRouter();
  const [user, setUser] = useState<UserType>();

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("userId");
    route.push("/sign-in");
  };
  return (
    <nav className="w-[200px] pt-[20px] text-white h-[100vh] bg-[#155bff]">
      {
        <h2 className="text-[32px] mt-[20px] text-center">PC-AZ</h2>
      }
      <ul className="flex pl-[20px] text-[20px] h-[90%] flex-col justify-evenly">
        <li onClick={() => route.push('/dashboard')} className="cursor-pointer">Trang chủ</li>
        <li onClick={() => route.push('/users')} className="cursor-pointer">Người dùng</li>
        <li onClick={() => route.push('/category')} className="cursor-pointer">Danh mục</li>
        <li onClick={() => route.push('/products')} className="cursor-pointer">Sản phẩm</li>
        <li onClick={() => route.push('/order')} className="cursor-pointer">Đơn hàng</li>
        <li onClick={() => route.push('/order-details')} className="cursor-pointer">Chi tiết đơn hàng</li>
        <li onClick={handleLogout} className="cursor-pointer">
          Đăng xuất
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
