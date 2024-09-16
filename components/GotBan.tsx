import { useRouter } from "next/navigation";
import React from "react";

const GotBan: React.FC = () => {
  const route = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    route.push("/sign-in");
  };
  return (
    <div className="absolute border-[1px] w-[100%] h-[100vh] flex justify-center items-center">
      <div className="bg-white text-black w-[500px] h-[400px]">
        <h2 className="text-[20px]">Tài khoản của bạn đã bị khóa</h2>
        <button className="p-[5px] bg-[red]" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default GotBan;
