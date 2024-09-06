"use client";
import { getAllUser } from "@/services/user.service";
import { UserType } from "@/interface/userType";
import { AdminHeaderUser } from "@/layouts/header/AdminHeader";
import { RootType } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserManager = () => {
  const dispatch = useDispatch();
  const data: any = useSelector((state: RootType) => {
    return state.users;
  });

  const users: UserType[] = Array.isArray(data.users)
    ? data.users
    : [...data.users];

  console.log(users);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <>
      <AdminHeaderUser />
      <div className="w-[100%] p-[20px] h-[100%] bg-[#ddd]">
        <div className="bg-[#fff] w-[100%] p-[20px] rounded-[5px]">
          <table className="w-[100%]">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserType, index: number) => {
                return (
                  <tr key={index}>
                    <td className="flex">{user.username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManager;
