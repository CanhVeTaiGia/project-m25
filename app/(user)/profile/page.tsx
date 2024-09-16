"use client";
import { url } from "@/baseUrl/url";
import { storage } from "@/config/firebase";
import { UserType } from "@/interface/userType";
import { RootType } from "@/redux/store";
import { editTheProduct } from "@/services/product.service";
import { getAllUser } from "@/services/user.service";
import { faCloudArrowUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile: React.FC = () => {
  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState<number | null>(() => {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id) : null;
  });
  const [image, setImage] = useState<{
    name: string | null;
    url: string | null;
    file: string | null | File;
  }>({
    name: null,
    url: null,
    file: null,
  });
  const [foundUser, setFoundUser] = useState<UserType>(() => {
    const found = users.find((item: any) => {
      return item.id === Number(currentId);
    });
    return (
      found || {
        id: 0,
        username: "",
        email: "",
        fullname: "",
        status: true,
        password: "",
        role: false,
        avatar: "",
        phone: "",
        carts: [],
        address: "",
      }
    );
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageRef = ref(storage, `products/${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImage({
            file,
            name: file.name,
            url,
          });
          setFoundUser({
            ...foundUser,
            avatar: url,
          });
        });
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "phone") {
      console.log(foundUser.phone);
      setFoundUser({
        ...foundUser,
        phone:
          "+84" +
          (value.startsWith("0")
            ? value.slice(1)
            : value.startsWith("+84")
            ? value.slice(0, 3)
            : value),
      });
      return;
    }
    console.log(foundUser);

    setFoundUser({
      ...foundUser,
      [name]: value,
    });
  };

  const handleClick = async () => {
    console.log(foundUser);

    if (foundUser) {
      const found = await axios.get(`${url}/users/${foundUser.id}`);
      if (found.data.length > 0) {
        return;
      }
    }
    dispatch(editTheProduct(foundUser));
  };

  useEffect(() => {
    dispatch(getAllUser({ search: "" }));
  }, [currentId]);
  useEffect(() => {
    const user = users.find((item: any) => item.id === currentId);
    setFoundUser({
      ...user,
    });
  }, [currentId, users]);
  return (
    <main className="bg-[#ccc] w-[100%] relative py-[10px] px-[150px]">
      <div className="p-[10px] w-[100%] flex flex-col bg-white">
        <h2 className="p-[5px] font-[600] border-b-[1px] border-b-[#444] text-[24px]">
          Thông tin cá nhân
        </h2>
        <div className="flex w-[100%] justify-evenly">
          <div className="flex w-[100%] flex-col items-center p-[10px] gap-[20px]">
            <h2 className="text-[20px] font-[600] text-center">Ảnh đại diện</h2>
            {foundUser.avatar ? (
              <Image
                alt=""
                src={foundUser.avatar}
                height={150}
                width={150}
                className="rounded-[50%] w-[150px] h-[150px]"
              ></Image>
            ) : (
              <FontAwesomeIcon
                className="w-[100px] h-[100px] text-[80px] p-[20px] border-[3px] border-black rounded-[50%]"
                icon={faUser}
              />
            )}
            <label
              htmlFor="file"
              className="w-[100px] text-[#444] cursor-pointer border-[#444] border-[2px] rounded-[5px] text-center p-[5px]"
            >
              <FontAwesomeIcon icon={faCloudArrowUp} />
              Tải ảnh
            </label>
            <input
              onChange={handleChangeImage}
              className="hidden"
              type="file"
              id="file"
            />
          </div>

          <div className="w-[100%] gap-[30px] pt-[20px] flex flex-col items-center">
            <input
              name="fullname"
              onChange={handleChange}
              className="border-[2px] outline-none w-[300px] h-[35px] pl-[10px]"
              type="text"
              placeholder="Họ và tên"
            />
            <input
              onChange={handleChange}
              name="username"
              className="border-[2px] outline-none w-[300px] h-[35px] pl-[10px]"
              type="text"
              placeholder="Tên người dùng"
            />
            <input
              onChange={handleChange}
              name="email"
              className="border-[2px] outline-none w-[300px] h-[35px] pl-[10px]"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="w-[100%] pt-[20px] gap-[30px] flex flex-col items-center">
            <input
              onChange={handleChange}
              name="address"
              className="border-[2px] outline-none w-[300px] h-[35px] pl-[10px]"
              type="text"
              placeholder="Địa chỉ"
            />
            <input
              onChange={handleChange}
              name="phone"
              className="border-[2px] outline-none w-[300px] h-[35px] pl-[10px]"
              type="text"
              placeholder="Số điện thoại"
            />
          </div>
        </div>
        <div className="w-[100%] h-[40px] mb-[10px] text-center">
          <button
            onClick={handleClick}
            className="w-[100px] h-[40px] border-black border-[1px]"
          >
            Lưu
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
