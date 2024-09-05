'use client'
import React from "react";

const AdminSignIn = () => {
  // Hàm đăng nhập
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-center pt-[150px]">
      <form
        onSubmit={handleLogin}
        className="w-[500px] rounded-[10px] h-[400px] p-[20px] border-[1px]"
      >
        <h2 className="text-[32px] mt-[40px] font-[700]  text-center mb-[40px]">
          Đăng nhập Admin
        </h2>
        <div className="p-[5px] mt-[20px]">
          <label className="block text-[16px]">Email</label>
          <input
            type="email"
            className="w-[100%] h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
        </div>
        <div className="p-[5px] mt-[20px]">
          <label className="block text-[16px]">Mật khẩu</label>
          <input
            type="password"
            className="w-[100%] h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
        </div>
        <div className="w-[100%] mt-[20px] flex justify-center">
          <button className="px-[30px] h-[40px] text-white rounded-[5px] hover:bg-[#2793ff] bg-[#1482ff]">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSignIn;
