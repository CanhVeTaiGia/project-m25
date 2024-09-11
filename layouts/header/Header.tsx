"use client";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import { getCategory } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import { getUserById } from "@/services/user.service";
import { faCartShopping, faLaptop, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HeaderProps {}
const Header: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { user }: any = useSelector((state: RootType) => {
    return state.users;
  });
  const { category }: any = useSelector((state: RootType) => {
    return state.category;
  });
  const { products }: any = useSelector((state: RootType) => {
    return state.products;
  });

  const [currentId, setCurrentId] = useState<number>(() => {
    const id = localStorage.getItem("userId");
    return id ? JSON.parse(id) : 0;
  });
  

  const handleLogout = () => {
    localStorage.removeItem("userId");
    route.push("/sign-in");
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  useEffect(() => {
    dispatch(getUserById(currentId));
  }, [currentId, dispatch]);
  
  return (
    <>
      <header className="w-[100%] flex flex-col p-[20px] bg-[#ccc]">
        <div className="w-[100%] px-[150px] items-center flex justify-between">
          <div className="flex flex-col gap-[10px] items-center">
            <Image
              className="rounded-[50%]"
              src="https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/logo%2FPC.png?alt=media&token=1e0a6997-a3d7-44f9-9781-0e3add488d45"
              alt=""
              width={80}
              height={80}
            ></Image>
            <h2 className="text-[20px] font-[700]">Minh Vỹ - Laptop</h2>
          </div>
          <div>
            <input
              type="text"
              className="w-[400px] p-[5px] border-[#08f] outline-none border-[1px]"
            />
          </div>
          <div className="w-[40px] relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-[32px]"></FontAwesomeIcon>
            <div className="size-[20px] rounded-[50%] flex justify-center items-center text-white absolute bg-[red] top-0">
              {0 && user.carts.length}
            </div>
          </div>
          <div className="p-[5px] relative group flex flex-col items-center">
            {user.avatar ? (
              <Image src={user.avtar} width={120} height={120} alt=""></Image>
            ) : (
              <FontAwesomeIcon
                className="p-[10px] border-black border-[2px] size-[20px] rounded-[50%]"
                icon={faUser}
              />
            )}
            {user.email ? <p className="text-[12px]">{user.username}</p> : null}
            <ul className="w-[120px] text-[14px] flex-col bg-white top-[60px] border-[1px] z-[999] absolute hidden group-hover:flex hover:flex">
              <li className="border-[1px] w-[100%] p-[5px]">Trang cá nhân</li>
              {user.role && (
                <li onClick={() => route.push('/')} className="border-[1px] w-[100%] p-[5px]">
                  Trang quản trị
                </li>
              )}
              <li className="border-[1px] w-[100%] p-[5px]">Đăng xuất</li>
            </ul>
          </div>
        </div>
      </header>
      <div className="bg-[#08f] relative text-white px-[10px] flex justify-around">
        <div className="group flex py-[10px] cursor-pointer">
          <FontAwesomeIcon className="text-[20px]" icon={faLaptop} />{" "}
          <p className="ml-[10px]">Laptop mới</p>
          <ul className="absolute border-[1px] hover:inline top-[43px] rounded-[5px] left-[270px] text-black bg-white group-hover:inline hidden w-[200px]">
            {products.map((item: ProductType) => {
              return (
                <li className="border-[1px] p-[10px]" key={item.id}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="group flex py-[10px] cursor-pointer">
          <FontAwesomeIcon className="text-[20px]" icon={faLaptop} />{" "}
          <p onClick={handleLogout} className="pl-[10px]">Laptop các loại </p>
        </div>
      </div>
    </>
  );
};

export default Header;
