import { validateEmail } from "@/app/(auth)/sign-in/page";
import { UserSign } from "@/interface/inputValue";
import { UserType } from "@/interface/userType";
import { addUser } from "@/services/user.service";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import bcrypt from 'bcryptjs-react'

interface AddEditUserProps {
  handleHideAddUser: () => void;
}
const AddUser: React.FC<AddEditUserProps> = ({ handleHideAddUser }) => {
  const [user, setUser] = useState<UserSign>({
    email: "",
    password: "",
    repassword: "",
  });

  const dispatch = useDispatch();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, repassword } = user;
    if (
      password !== repassword ||
      email === "" ||
      password === "" ||
      repassword === "" ||
      !validateEmail(email)
    ) {
      return;
    }
    console.log(user);
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const newUser: UserType = {
      email: email,
      password: cryptedPassword,
      username: "",
      phone: "",
      address: "",
      status: true,
      role: true,
      fullname: "",
    };
    dispatch(addUser(newUser));
    handleHideAddUser();
  };

  const handleSignUpAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-[100%] h-[100vh] absolute top-0 left-0 flex justify-center items-center bg-[#00000099]">
      <form
        onSubmit={handleSignUp}
        className="w-[500px] p-[20px] rounded-[10px] bg-[#fff]"
      >
        <div className="flex justify-between">
          <h2 className="w-[100%] text-[24px]">Thêm người dùng</h2>
          <p onClick={handleHideAddUser} className="text-[24px] cursor-pointer">
            X
          </p>
        </div>
        <div className="w-[100%] flex flex-col mt-[10px]">
          <label>Email</label>
          <input
            className="border-[1px] rounded-[5px] p-[5px] outline-none"
            name="email"
            onChange={handleSignUpAdmin}
            type="text"
          />
        </div>
        <div className="w-[100%] flex flex-col mt-[10px]">
          <label>Mật khẩu</label>
          <input
            className="border-[1px] rounded-[5px] p-[5px] outline-none"
            name="password"
            onChange={handleSignUpAdmin}
            type="password"
          />
        </div>
        <div className="w-[100%] flex flex-col mt-[10px]">
          <label>Xác nhận lại mật khẩu</label>
          <input
            className="border-[1px] rounded-[5px] p-[5px] outline-none"
            name="repassword"
            onChange={handleSignUpAdmin}
            type="password"
          />
        </div>
        <div className="w-[100%] justify-center items-center flex mt-[10px]">
          <button className="w-[120px] border-[1px] rounded-[5px] py-[8px] text-white cursor-pointer bg-[#05f]">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
