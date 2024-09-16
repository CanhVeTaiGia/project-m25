"use client";
import { UserType } from "@/interface/userType";
import { RootType } from "@/redux/store";
import { getProduct } from "@/services/product.service";
import { addToCart, getAllUser, getUserById } from "@/services/user.service";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ProductDetailProps {
  params: {
    productId: number | string;
  };
}
const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const dispatch = useDispatch();
  const { productId }: any = params;
  // console.log(productId);
  const { editProduct }: any = useSelector((state: RootType) => {
    return state.products;
  });
  const [currentId, setCurrentId] = useState<number>(() => {
    const id = localStorage.getItem("userId");
    return id ? JSON.parse(id) : 0;
  });
  const { users }: any = useSelector((state: RootType) => {
    return state.users;
  });
  const [foundUser, setFoundUser] = useState<UserType>(() => {
    const found = users.find((item: any) => item.id === currentId);
    return found;
  });

  const [quantity, setQuantity] = useState<number>(0);

  const handleSetQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {};
  // const { carts } = foundUser || [];

  const handleAddToCart = () => {
    if (foundUser) {
      const { carts = [] } = foundUser;
      const foundIndex = carts.findIndex(
        (item: any) => item.productId === Number(productId)
      );

      if (foundIndex !== -1) {
        const updatedCarts = carts.map((cart: any, index: number) =>
          index === foundIndex ? { ...cart, quantity: cart.quantity + 1 } : cart
        );
        dispatch(addToCart({ ...foundUser, carts: updatedCarts }));
      } else {
        const newCart = {
          userId: currentId,
          productId: Number(productId),
          quantity: 1,
          price: Number(editProduct.price),
        };
        dispatch(addToCart({ ...foundUser, carts: [...carts, newCart] }));
      }
    }
  };

  // console.log(foundUser);
  useEffect(() => {
    dispatch(getAllUser({ search: null }));
  }, []);
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);
  useEffect(() => {
    setFoundUser(() => {
      const found = users.find((item: any) => item.id === currentId);
      return found;
    });
  }, [users]);
  return (
    <main className="w-[100%] px-[150px] py-[20px] bg-[#eee]">
      <div className="w-[100%] py-[20px] bg-[white]">
        <h2 className="w-[100%] px-[20px] border-b-[1px] text-[20px] font-[600] pb-[10px]">
          {editProduct.name}
        </h2>
        <div className="p-[20px] w-[100%] flex gap-[20px]">
          <Image
            className="border-[1px] border-[#f00] p-[5px] rounded-[5px]"
            alt=""
            src={editProduct.image || ""}
            width={600}
            height={600}
          ></Image>
          <div>
            <h2 className="text-[28px] justify-center italic text-[#f00]">
              Giá:{" "}
              {Number(editProduct.price).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </h2>
            <span className="flex gap-[10px] font-[700] text-[16px]">
              Tình trạng:{" "}
              <p className="font-[400]">
                {editProduct.stock ? " Còn hàng" : " Hết hàng"}
              </p>
            </span>
            <span className="flex gap-[10px] font-[700] text-[16px]">
              Số lượng: <p className="font-[400]">{editProduct.stock}</p>
            </span>
            <div className="flex flex-col w-[100%] mt-[150px] gap-[10px]">
              <button
                onClick={handleAddToCart}
                className="rounded-[5px] text-[red] w-[100%] cursor-pointer py-[20px] border-[red] border-[1px] bg-[#fff017]  text-[14px] flex justify-center items-center"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="rounded-[5px] text-white w-[100%] cursor-pointer py-[20px] bg-red-500 flex justify-center items-center">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
