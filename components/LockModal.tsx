'use client'
import { UserType } from "@/interface/userType";
import { changeUserStatus } from "@/services/user.service";
import React from "react";
import { useDispatch } from "react-redux";

interface LockProps{
  hideLock: () => void
  user: UserType
}
const LockModal: React.FC<LockProps> = ({hideLock, user}) => {
  const dispatch = useDispatch();
  console.log(user.id);
  
  const handleLock = () => {
    dispatch(changeUserStatus({ id: user.id, status: user.status }));
    hideLock();
  };
  return (
    <div className="w-[100%] h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#00000099]">
      <div className="w-[500px] p-[20px] rounded-[10px] bg-[#fff]">
        <h2 className="text-[24px] mb-[40px] mt-[20px] text-center ">
          Bạn có chắc muốn khóa tài khoản này
        </h2>
        <div className="flex w-[100%] text-white mb-[20px] justify-evenly">
          <button onClick={handleLock} className="py-[10px] rounded-[5px] bg-[#1f1] w-[80px]">Có</button>
          <button onClick={hideLock} className="py-[10px] rounded-[5px] bg-[#f00] w-[80px]">Không</button>
        </div>
      </div>
    </div>
  );
};

export default LockModal;
