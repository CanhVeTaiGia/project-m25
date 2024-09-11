"use client";
import { url } from "@/baseUrl/url";
import { UserSign } from "@/interface/inputValue";
import { RootType } from "@/redux/store";
import { addUser, getAllUser } from "@/services/user.service";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs-react";
import { UserType } from "@/interface/userType";

const SignUp: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const [showPassword, setShowPassowrd] = useState<boolean>(false);
  const [user, setUser] = useState<UserSign>({
    email: "",
    password: "",
    repassword: "",
  });
  const [warning, setWarning] = useState<{
    email: boolean;
    password: boolean;
    repassword: boolean;
  }>({
    email: false,
    password: false,
    repassword: false,
  });
  const [wrong, setWrong] = useState<{
    email: boolean;
    password: boolean;
    repassword: boolean;
  }>({
    email: false,
    password: false,
    repassword: false,
  });
  const [showRepassword, setShowRepassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res: AxiosResponse = await axios.get(`${url}/users`);
    const existingUser = res.data[0];

    if (!user.email) {
      setWarning((prev) => ({
        ...prev,
        email: true,
      }));
      setTimeout(
        () =>
          setWarning((prev) => ({
            ...prev,
            email: false,
          })),
        2000
      );
    }
    if (!user.password) {
      setWarning((prev) => ({
        ...prev,
        password: true,
      }));
      setTimeout(() => {
        setWarning((prev) => ({ ...prev, password: false }));
      }, 2000);
    }
    if (!user.repassword) {
      setWarning((prev) => ({
        ...prev,
        repassword: true,
      }));
    }
    if (warning.email || warning.password || warning.repassword) {
      return;
    }
    const emailExists = existingUser.email === user.email;
    const passwordsMatch = user.password === user.repassword;

    if (emailExists) {
      setWrong((prev) => ({ ...prev, email: true }));
      setTimeout(() => {
        setWrong((prev) => ({ ...prev, email: false }));
      }, 2000);
      return;
    }

    if (!passwordsMatch) {
      setWrong((prev) => ({ ...prev, repassword: true }));
      setTimeout(() => {
        setWrong((prev) => ({ ...prev, repassword: false }));
      }, 2000);
      return;
    }

    const cryptedPassword = bcrypt.hashSync(user.password, 10);

    const newUser: UserType = {
      email: user.email,
      password: cryptedPassword,
      role: false,
      fullname: "",
      status: true,
      phone: "",
      address: "",
      username: "",
      carts: []
    };

    dispatch(addUser(newUser));
    route.push("/sign-in");
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  return (
    <div className="w-[100%] relative h-[100vh] flex justify-center pt-[150px]">
      <Image
        className="absolute w-[100%] top-0 bottom-0 z-[-1] h-[100vh]"
        layout="fill"
        src="https://firebasestorage.googleapis.com/v0/b/m25-project.appspot.com/o/AdminLoginBackgroound%2FadminBackground.png?alt=media&token=875b86b4-c8f8-438f-9562-b36d818e6832"
        alt="Admin Background"
        objectFit="cover"
      />
      <form
        onSubmit={handleSignUp}
        className="w-[500px] relative text-white bg-[#ffffff20] rounded-[10px] pt-[100px] h-[540px] p-[20px] border-[1px]"
      >
        <div className="absolute flex justify-center items-center size-[200px] rounded-[50%] top-[-100px] left-[150px] bg-[#00aeff] border-[2px]">
          <FontAwesomeIcon className="text-[100px]" icon={faUser} />
        </div>
        <div className="p-[5px] h-[80px] mt-[20px]">
          <label className="block text-[16px]">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            className="w-[100%] mt-[5px] bg-transparent h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
          {wrong.email && (
            <p className="text-[#f00] mt-[5px] text-[14px]">Email không đúng</p>
          )}
          {warning.email && (
            <p className="text-[#f00] mt-[5px] text-[14px]">
              Email không được để trống
            </p>
          )}
        </div>
        <div className="p-[5px] w-[100%] relative h-[100px] mt-[15px]">
          <label className="block text-[16px]">Mật khẩu</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="w-[100%] mt-[5px] bg-transparent h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />

          {warning.password && (
            <p className="text-[#f00] mt-[5px] text-[14px]">
              Mật khẩu không được để trống
            </p>
          )}
          {showPassword ? (
            <FontAwesomeIcon
              className="text-[24px] absolute top-[40px] right-[19px] cursor-pointer"
              onClick={() => setShowPassowrd(false)}
              icon={faEye}
            />
          ) : (
            <FontAwesomeIcon
              className="text-[24px] absolute top-[40px] right-[19px] cursor-pointer"
              onClick={() => setShowPassowrd(true)}
              icon={faEyeSlash}
            />
          )}
        </div>
        <div className="p-[5px] w-[100%] relative h-[80px] mt-[10px]">
          <label className="block text-[16px]">Nhập lại mật khẩu</label>
          <input
            onChange={handleChange}
            name="repassword"
            type="password"
            className="w-[100%] mt-[5px] bg-transparent h-[40px] p-[10px] rounded-[5px] border-[1px] outline-none"
          />
          {showRepassword ? (
            <FontAwesomeIcon
              className="text-[24px] absolute top-[40px] right-[19px] cursor-pointer"
              onClick={() => setShowRepassword(false)}
              icon={faEye}
            />
          ) : (
            <FontAwesomeIcon
              className="text-[24px] absolute top-[40px] right-[19px] cursor-pointer"
              onClick={() => setShowRepassword(true)}
              icon={faEyeSlash}
            />
          )}
          {wrong.repassword && (
            <p className="text-[#f00] mt-[5px] text-[14px]">
              Mật khẩu phải khớp với mật khẩu vừa nhập
            </p>
          )}
          {warning.repassword && (
            <p className="text-[#f00] mt-[5px] text-[14px]">
              Mật khẩu không được để trống
            </p>
          )}
        </div>
        <div className="flex justify-end px-[10px] mt-[5px] cursor-pointer">
          <p
            onClick={() => route.push("sign-in")}
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

export default SignUp;
