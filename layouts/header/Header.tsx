"use client";
import { CategoryType } from "@/interface/categoryType";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import {
  editCategory,
  getACategory,
  getCategory,
} from "@/services/category.service";
import { getProduct, getProducts } from "@/services/product.service";
import { getUserById } from "@/services/user.service";
import {
  faCartShopping,
  faHouse,
  faLaptop,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface HeaderProps {}
const Header: React.FC = () => {
  const route = useRouter();
  const pathname = usePathname();
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getProducts({ id: null, search: e.target.value }));
  };
  const handleFindByCategory = (id: number | undefined) => {
    dispatch(getProducts({ id: id, search: null }));
    if (pathname === "/home") {
      return;
    }
    route.push("/home");
  };
  const handleSearchProduct = (search: "") => {};

  useEffect(() => {
    dispatch(getProducts({ search: "" }));
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    dispatch(getUserById(currentId));
  }, [currentId, dispatch]);
  useEffect(() => {
    dispatch(getUserById(currentId));
  }, []);

  return (
    <>
      <header className="w-[100%] flex flex-col p-[20px] bg-[#ccc]">
        <div className="w-[100%] px-[150px] items-center flex justify-between">
          <div
            onClick={() => route.push("/home")}
            className="flex cursor-pointer flex-col gap-[10px] items-center"
          >
            <Image
              className="rounded-[50%]"
              src="https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/logo%2FPC.png?alt=media&token=1e0a6997-a3d7-44f9-9781-0e3add488d45"
              alt=""
              width={80}
              height={80}
            ></Image>
            <h2 className="text-[20px] font-[700]">Minh Vỹ - Laptop</h2>
          </div>
          <div className="flex">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Bạn muốn tìm sản phẩm gì"
              className="w-[400px] py-[5px] px-[10px] border-[#08f] outline-none border-[1px]"
            />
            <button className="flex justify-center size-[40px] bg-[#08f] items-center">
              <FontAwesomeIcon
                className="text-[#fff]"
                icon={faMagnifyingGlass}
              />
            </button>
          </div>
          <div
            onClick={() => route.push("/cart")}
            className="w-[40px] cursor-pointer relative"
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-[32px]"
            ></FontAwesomeIcon>
            <div
              onClick={() => route.push("/carts")}
              className="size-[20px] rounded-[50%] flex justify-center items-center text-white absolute bg-[red] top-[-10px] right-[-10px]"
            >
              {user.carts
                ? user.carts.length !== 0
                  ? user.carts.length
                  : 0
                : 0}
            </div>
          </div>
          <div className="p-[5px] cursor-pointer relative group flex flex-col items-center">
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
              <li
                onClick={() => route.push("/profile")}
                className=" hover:bg-[#999] hover:text-white w-[100%] p-[10px]"
              >
                Trang cá nhân
              </li>
              {user.role && (
                <li
                  onClick={() => route.push("/dashboard")}
                  className="w-[100%] hover:bg-[#999] hover:text-white p-[10px]"
                >
                  Trang quản trị
                </li>
              )}
              <li
                onClick={handleLogout}
                className=" hover:text-white hover:bg-[#999] w-[100%] p-[10px]"
              >
                Đăng xuất
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="bg-[#08f] relative text-white px-[10px] flex justify-around">
        <div
          className="flex py-[10px] gap-[10px] cursor-pointer"
          onClick={() => route.push("/home")}
        >
          <FontAwesomeIcon icon={faHouse} />
          <p>Trang chủ</p>
        </div>
        <div className="group z-[999] flex py-[10px] cursor-pointer">
          <FontAwesomeIcon className="text-[20px]" icon={faLaptop} />{" "}
          <p className="ml-[10px]">Laptop mới</p>
          <ul className="absolute border-[1px] hover:inline top-[43px] left-[620px] text-black bg-white group-hover:inline hidden w-[200px]">
            {products
              .map((item: ProductType, index: number) => {
                return (
                  <li
                    onClick={() => route.push(`/${item.id}`)}
                    className={`
                      
                       p-[10px] hover:bg-[#999] hover:text-white`}
                    key={item.id}
                  >
                    {item.name}
                  </li>
                );
              })
              .reverse()
              .slice(0, 8)}
          </ul>
        </div>
        <div className="group flex py-[10px] cursor-pointer">
          <ul className="z-[2] absolute border-[1px] hover:inline hover:bg-[] top-[42px] right-[160px] text-black bg-white group-hover:inline hidden w-[200px]">
            {category.length > 0 ? (
              <li
                className=" hover:bg-[#999] hover:text-white p-[10px]"
                onClick={() => handleFindByCategory(0)}
              >
                Mặc đinh
              </li>
            ) : (
              ""
            )}
            {category.map((item: CategoryType, index: number) => (
              <li
                onClick={() => handleFindByCategory(item.id)}
                key={item.id}
                className={` p-[10px] border-x-0 hover:bg-[#999] hover:text-white`}
              >
                {item.name}
              </li>
            ))}
          </ul>
          <FontAwesomeIcon className="text-[20px]" icon={faLaptop} />{" "}
          <p className="pl-[10px]">Laptop các loại </p>
        </div>
      </div>
    </>
  );
};

export default Header;
