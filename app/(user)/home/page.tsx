"use client";
import Slider from "@/components/Slider";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import { getACategory } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { products }: any = useSelector((state: RootType) => {
    return state.products;
  });
  const { editCategory }: any = useSelector((state: RootType) => {
    return state.category;
  });

  useEffect(() => {
    dispatch(getACategory())
  }, [])
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <main className="bg-[#ccc] pb-[10px] px-[150px]">
        <Slider />
        <div className="flex flex-wrap mt-[10px] gap-[18px]">
          {products.map((product: ProductType) => (
            <div
              onClick={() => route.push(`/${product.id}`)}
              className="w-[280px] hover:border-[1px] cursor-pointer hover:border-[#f00] h-[400px] bg-white p-[5px]"
            >
              <img className="w-[100%] h-[280px]" src={product.image} />
              <h2 className="text-center text-[16px] font-[700] mt-[10px]">
                {product.name}
              </h2>
              <p className="text-center text-[red] font-[600]">
                {Number(product.price).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="text-center">Còn lại: {product.stock}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
