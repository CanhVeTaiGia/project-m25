"use client";
import Page from "@/components/Page";
import Slider from "@/components/Slider";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import { getACategory } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const { products }: any = useSelector((state: RootType) => {
    return state.products;
  });

  const [index, setIndex] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(products.length / 8)
  );

  const handleNext = () => {
    if (index + 8 >= products.length - 1) return;
    setIndex((prev) => prev + 8);
  };
  const handlePrev = () => {
    if (index <= 0) return;
    setIndex((prev) => prev - 8);
  };

  const handleChangePage = (page: number) => {
    setIndex(page);
  };

  useEffect(() => {
    setTotalPage(Math.ceil(products.length / 8));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(getProducts({ id: 0, search: null }));
  }, []);

  return (
    <>
      <main className="bg-[#ccc] relative pb-[10px] px-[150px]">
        <Slider />
        <div className="flex flex-wrap mt-[10px] gap-[18px]">
          {products
            .slice(
              index,
              index + 8 < products.length ? index + 8 : products.length
            )
            .map((product: ProductType) => (
              <div
                key={product.id}
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
          {products.length === 0 ? <p>Không có sản phẩm</p> : ""}
        </div>
        {totalPage > 1 ? (
          <Page
            setPage={handleChangePage}
            length={products.length}
            theIndex={index}
            totalPage={totalPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
          ></Page>
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
