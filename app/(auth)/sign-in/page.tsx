"use client";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { UserSign } from "@/interface/inputValue";
import { UserType } from "@/interface/userType";
import bcrypt from "bcryptjs-react";
import { useRouter } from "next/navigation";
import { url } from "@/baseUrl/url";

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const AdminSignIn = () => {
  // Các state
  const route = useRouter();
  const [invaliteEmail, setInvalitEmail] = useState<boolean>(false);
  const [routeForm, setRouteForm] = useState<boolean>(false);
  const [wrong, setWrong] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });
  const [users, setUsers] = useState<UserType[]>([]);
  const [user, setUser] = useState<UserSign>({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });
  const [showpassword, setShowpassword] = useState<boolean>(false);

  // Reset Input
  const resetInput = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  // Hàm đăng nhập
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user.email);

    const res: AxiosResponse = await axios.get(
      `${url}/users?email_like=${user.email}`
    );
    // console.log(user.email);
    if (warning.email || warning.password) {
      return;
    }
    if (!validateEmail(user.email)) {
      setInvalitEmail(true);
      setTimeout(() => {
        setInvalitEmail(false);
      }, 1000);
      return;
    }

    if (res.data.length > 0) {
      let decryptedPass: boolean = bcrypt.compareSync(
        user.password,
        res.data[0].password
      );
      if (!res.data[0].email) {
        setWrong({
          ...wrong,
          email: true,
        });
      }
      if (!decryptedPass) {
        setWrong({ ...wrong, password: true });
      }
      setTimeout(() => {
        setWrong({
          email: false,
          password: false,
        });
      }, 1000);
      if (wrong.email || warning.password) {
        return;
      }
      if (res.data[0].email === user.email && decryptedPass) {
        if (res.data[0].role) {
          localStorage.setItem("role", res.data[0].role);
          localStorage.setItem("userId", res.data[0].id);
          setRouteForm(true);
        } else {
          localStorage.setItem("role", res.data[0].role);
          localStorage.setItem("userId", res.data[0].id);
          route.push("/home");
        }
      }
    } else {
      setWrong({
        ...wrong,
        email: true,
        password: true,
      });
    }
  };

  // Chuyển hướng sang trang admin hoặc không
  const handleRouteHome = () => {
    route.push("/home");
  };
  const handleRouteAdmin = () => {
    route.push("/dashboard");
  };

  // Hàm đưa input vào state
  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Kiểm tra để không được để trống mật khẩu và email
    setWarning((prev) => ({
      ...prev,
      [name]: value === "",
    }));

    setUser({ ...user, [name]: value });
  };

  return (
    <div className="w-[100%] relative h-[100vh] flex justify-center pt-[150px]">
      {routeForm && (
        <div className="z-[100] bg-[#000000bb] w-[100%] flex justify-center items-center h-[100vh] top-0 left-0 absolute">
          <div className="w-[500px] text-white px-[20px] rounded-[5px] py-[40px] p-[10px] border-[1px] bg-[#111111cd]">
            <h2 className="text-center text-[32px] pb-[20px]">
              Chuyển đến trang
            </h2>
            <div className="flex justify-between w-[100%] z-[100] py-[20px] px-[80px]">
              <button
                onClick={handleRouteHome}
                className="h-[40px] bg-[#0af] rounded-[5px] border-[1px] p-[10px]"
              >
                Trang Chủ
              </button>
              <button
                onClick={handleRouteAdmin}
                className="h-[40px] bg-[red] rounded-[5px] border-[1px] p-[10px]"
              >
                Trang Quản lí
              </button>
            </div>
          </div>
        </div>
      )}
      <Image
        className="absolute w-[100%] top-0 bottom-0 z-[-1] h-[100vh]"
        layout="fill"
        src="https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/AdminLoginBackgroound%2FadminBackground.png?alt=media&token=875b86b4-c8f8-438f-9562-b36d818e6832"
        alt="Admin Background"
        objectFit="cover"
      />
      <form
        onSubmit={handleLogin}
        className="w-[500px] relative text-white bg-[#ffffff20] rounded-[10px] pt-[100px] h-[450px] p-[20px] border-[1px]"
      >
        <div className="absolute flex justify-center items-center size-[200px] rounded-[50%] top-[-100px] left-[150px] bg-[#00aeff] border-[2px]">
          <FontAwesomeIcon className="text-[100px]" icon={faUser} />
        </div>

        <div className="p-[5px] h-[100px] mt-[20px]">
          <label className="block text-[16px]">Email</label>
          <input
            name="email"
            onChange={handleSetUser}
            type="text"
            className="w-[100%] mt-[5px] bg-transparent h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
          {warning.email && (
            <p className="text-[#f00] mt-[5px]">Email không được để trống</p>
          )}
          {invaliteEmail && (
            <p className="text-[#f00] mt-[5px]">Email không đúng định dạng</p>
          )}
          {wrong.email && (
            <p className="text-[#f00] mt-[5px]">Email không đúng</p>
          )}
        </div>
        <div className="p-[5px] w-[100%] relative h-[100px] mt-[15px]">
          <label className="block text-[16px]">Mật khẩu</label>
          <input
            name="password"
            onChange={handleSetUser}
            type={showpassword ? "text" : "password"}
            className="w-[100%] mt-[5px] bg-transparent h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
          {warning.password && (
            <p className="text-[#f00] mt-[5px]">Mật khẩu không được để trống</p>
          )}
          {wrong.password && (
            <p className="text-[#f00] mt-[5px]">Mật khẩu không đúng</p>
          )}
          {showpassword ? (
            <FontAwesomeIcon
              onClick={() => setShowpassword(false)}
              className="text-[24px] absolute top-[40px] right-[19px] cursor-pointer"
              icon={faEye}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowpassword(true)}
              className="text-[24px] absolute top-[40px] right-[20px] cursor-pointer"
              icon={faEyeSlash}
            />
          )}
        </div>
        <div className="flex justify-end px-[10px] cursor-pointer">
          <p
            onClick={() => route.push("sign-up")}
            className="underline text-[#08f]"
          >
            Đăng ký
          </p>
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
