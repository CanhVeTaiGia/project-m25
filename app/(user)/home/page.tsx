"use client";
import Slider from "@/components/Slider";
import { RootType } from "@/redux/store";
import { getProducts } from "@/services/product.service";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { products }: any = useSelector((state: RootType) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <div className="bg-[#ccc] h-[500px] px-[150px]">
        <Slider products={products} />
        <div className="flex flex-wrap">
          {products.map((product: any) => (
           <div className="w"></div> 
          ))}
            
        </div>
      </div>
    </>
  );
};

export default Home;
