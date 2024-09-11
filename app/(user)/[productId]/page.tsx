"use client";
import { RootType } from "@/redux/store";
import { getProduct } from "@/services/product.service";
import { getUserById } from "@/services/user.service";
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
  const { user }: any = useSelector((state: RootType) => {
    return state.users;
  });

  const [quantity, setQuantity] = useState<number>(0);

  const handleSetQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  const handleAddToCart = () => {
    const { carts } = user;
    console.log(carts);
    const newOrder = {
      userId: currentId,
      productId: productId,
      quantity: 1,
    };
    carts.push(newOrder);
  };

  useEffect(() => {
    dispatch(getUserById(currentId));
  }, [currentId]);
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);
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
            <p className="flex gap-[10px] font-[700] text-[16px]">
              Số lượng: <p className="font-[400]">{editProduct.stock}</p>
            </p>
            <div className="flex flex-col w-[100%] mt-[150px] gap-[10px]">
              <button onClick={handleAddToCart} className="rounded-[5px] text-[red] w-[100%] cursor-pointer py-[20px] border-[red] border-[1px] bg-[#fff017]  text-[14px] flex justify-center items-center">
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
