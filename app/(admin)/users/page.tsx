"use client";
import { changeUserStatus, getAllUser } from "@/services/user.service";
import { UserType } from "@/interface/userType";
import { AdminHeaderUser } from "@/layouts/header/AdminHeader";
import { RootType } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faLock,
  faLockOpen,
  faUnlock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import LockModal from "@/components/LockModal";

import { AdminFooter } from "@/layouts/footer/AdminFooter";
import AddUser from "@/components/AddUser";

const UserManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.users;
  });
  const users: UserType[] = Array.isArray(data.users)
    ? data.users
    : [...data.users];

  const [index, setIndex] = useState<{ first: number; last: number }>({
    first: 0,
    last: 6,
  });

  const [showAddAndEditModal, setShowAddAndEditModal] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  const hideLock = () => {
    setLock(false);
  };

  const [lock, setLock] = useState<boolean>(false);

  const handleShowAddUser = () => {
    setShowAddAndEditModal(true);
  };

  const handleHideAddUser = () => {
    setShowAddAndEditModal(false);
  };

  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(users.length / 6)
  );

  const handleNext = () => {
    return index.last >= users.length - 1
      ? null
      : setIndex((prev) => {
          return { first: prev.first + 6, last: prev.last + 6 };
        });
  };

  const [currentUser, setCurrentUser] = useState<UserType>({
    ...users[0],
  });

  const handlePrev = () => {
    console.log(index.first);

    return index.first <= 0
      ? null
      : setIndex((prev) => {
          return { first: prev.first - 6, last: prev.last - 6 };
        });
  };

  const handleSetPage = (page: number) => {
    setIndex((prev) => ({ first: page * 6, last: (page + 1) * 6 }));
  };
  // console.log(users);
  const handleShowLock = (user: UserType) => {
    setCurrentUser(user);
    setLock(true);
  };

  const handleChangeStatus = (user: UserType) => {
    setCurrentUser(user);
    const { id, status } = user;
    dispatch(changeUserStatus({ id, status }));
  };
  console.log(users);
  

  useEffect(() => {

    dispatch(getAllUser({sort: '', search: ''}));
    
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(users.length / 6));
  }, [dispatch, users.length]);
  return (
    <>
      {showAddAndEditModal && <AddUser handleHideAddUser={handleHideAddUser} />}
      <AdminHeaderUser handleShowAddUser={handleShowAddUser} />
      <div className="w-[100%] p-[20px] h-[100%] bg-[#ddd] ">
        <div className=" w-[100%] h-[600px]">
          <table className="w-[100%] rounded-[5px] p-[20px] bg-[#fff]">
            <thead className=" border-b-[1px]">
              <tr>
                <th className="text-start w-[40%] pl-[10px] py-[10px]">
                  Người dùng
                </th>
                <th className="text-start">Trạng thái</th>
                <th className="text-start">Quyền</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice(
                  index.first,
                  index.last > users.length ? users.length : index.last
                )
                .map((user: UserType, index: number) => {
                  return (
                    <>
                      {" "}
                      <tr
                        key={index}
                        className="w-[100%] bg-[#fff] rounded-[5px]"
                      >
                        <td className="pl-[10px] pt-[10px] flex gap-[10px]">
                          {user.avatar ? (
                            <Image
                              className="mt-[10px]"
                              src={user.avatar ? user.avatar : ""}
                              width={50}
                              height={50}
                              alt=""
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="border-[1px] mt-[10px] text-[24px] p-[10px] rounded-[50%]"
                              icon={faUser}
                            />
                          )}
                          <div className="">
                            <p className="text-[12px] font-[600]">
                              {user.username ? user.username : "Chưa có tên"}
                            </p>
                            <p className="text-[12px] font-[600]">
                              {user.fullname
                                ? user.fullname
                                : "Chưa có tên đầy đủ"}
                            </p>
                            <p className="text-[12px]">{user.email}</p>
                            <p className="text-[12px]">
                              {user.phone
                                ? user.phone
                                : "Chưa cung cấp số điện thoại"}
                            </p>
                          </div>
                        </td>
                        <td className="pl-[10px]">
                          {user.role ? (
                            <FontAwesomeIcon
                              className="text-[#0f0] border-[2px] p-[5px] size-[28px] rounded-[50%] border-[#0f0]"
                              icon={faCheck}
                            />
                          ) : user.status ? (
                            <FontAwesomeIcon
                              className="text-[#0f0] border-[2px] p-[5px] size-[28px] rounded-[50%] border-[#0f0]"
                              icon={faCheck}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className="text-[red] p-[5px] size-[28px]"
                              icon={faBan}
                            />
                          )}
                        </td>
                        <td>
                          {user.role ? (
                            <p className="text-[16px] text-[#1f1]">
                              Quản trị viên
                            </p>
                          ) : (
                            <p className="text-[16px]">Người dùng</p>
                          )}
                        </td>
                        <td className="text-center">
                          {user.role ? (
                            <FontAwesomeIcon
                              className="text-[#0f4] p-[5px] size-[28px]"
                              icon={faLockOpen}
                            />
                          ) : user.status ? (
                            <FontAwesomeIcon
                              onClick={() => handleShowLock(user)}
                              className="text-[#ffb618] cursor-pointer p-[5px] size-[28px]"
                              icon={faUnlock}
                            />
                          ) : (
                            <FontAwesomeIcon
                              onClick={() => handleChangeStatus(user)}
                              className="text-[#f00] cursor-pointer p-[5px] size-[28px]"
                              icon={faLock}
                            />
                          )}
                        </td>
                      </tr>
                      {lock && (
                        <LockModal hideLock={hideLock} user={currentUser} />
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
        {totalPage <= 1 || (
          <AdminFooter
            userLength={users.length}
            currentIndex={index}
            totalPage={totalPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleSetPage={handleSetPage}
          />
        )}
      </div>
    </>
  );
};

export default UserManager;
