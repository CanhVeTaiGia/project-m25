"use client";
import { ProductType } from "@/interface/productType";
import { RootType } from "@/redux/store";
import { getProducts } from "@/services/product.service";
import { getUserById, updateUser } from "@/services/user.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const { user }: any = useSelector((state: RootType) => state.users);
  const { products }: any = useSelector((state: RootType) => state.products);
  const { carts } = user || { carts: [] };

  const [userId, setUserId] = useState<number | null>(() => {
    const id = localStorage.getItem("userId");
    return id ? parseInt(id) : null;
  });
  const [cart, setCart] = useState({
    userId: 0,
    productId: 0,
    quantity: 0,
    price: 0,
  });

  const handleIncrease = (productId: number) => {
    const updatedCarts = carts.map((cartItem: any) => {
      if (cartItem.productId === productId) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    const updatedUser = {
      ...user,
      carts: [...updatedCarts],
    };
    dispatch(updateUser(updatedUser));
    dispatch(getUserById(userId))
  };

  const handleDecrease = (productId: number) => {
    const updatedCarts = carts.map((cartItem: any) => {
      if (cartItem.productId === productId && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    const updatedUser = {
      ...user,
      carts: [...updatedCarts],
    };

    dispatch(updateUser(updatedUser));
    dispatch(getUserById(userId))
  };

  const handleDeleteCartItem = (productId: number) => {
    const updatedCarts = carts.filter(
      (cartItem: any) => cartItem.productId !== productId
    );

    const updatedUser = {
      ...user,
      carts: updatedCarts,
    };

    dispatch(updateUser(updatedUser));
  };

  console.log(carts);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId, dispatch]);
  useEffect(() => {
    dispatch(getUserById(userId))
  },[])

  useEffect(() => {
    dispatch(getProducts({ search: null }));
  }, [dispatch]);

  return (
    <main className="bg-[#ccc] relative py-[10px] px-[150px]">
      <div className="w-[100%] p-[10px] bg-white">
        <h2 className="text-[24px] font-[600] border-b-[1px] border-[#333]">
          Giỏ hàng của bạn
        </h2>
        <div className="py-[10px]">
          {carts ? (
            carts.length === 0 ? (
              <p>Giỏ hàng trống</p>
            ) : (
              carts.map((cartItem: any, index: number) => {
                const product = products.find(
                  (item: ProductType) => item.id === cartItem.productId
                );
                if (!product) return null;
                return (
                  <div
                    key={index}
                    className="p-[5px] w-[100%] flex justify-between items-center"
                  >
                    <div className="flex">
                      <Image
                        className="border-[1px] border-[#f00]"
                        alt={product.name}
                        src={product.image}
                        height={150}
                        width={150}
                      />
                      <div className="ml-[10px]">
                        <h3>{product.name}</h3>
                        <p>Số lượng: {cartItem.quantity}</p>
                        <p>Giá: {cartItem.price * cartItem.quantity}</p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDecrease(cartItem.productId)}
                        className="cursor-pointer w-[40px] py-[5px] border-[1px]"
                      >
                        {"<"}
                      </button>
                      <input
                        className="w-[40px] p-[5px] text-center border-[1px] outline-none"
                        min={1}
                        max={product.stock}
                        defaultValue={cartItem.quantity || 1}
                        type="text"
                      />
                      <button
                        onClick={() => handleIncrease(cartItem.productId)}
                        className="cursor-pointer w-[40px] py-[5px] border-[1px]"
                      >
                        {">"}
                      </button>
                      <button
                        onClick={() => handleDeleteCartItem(cartItem.productId)}
                        className="w-[80px] ml-[20px] bg-[#f00] text-white py-[5px]"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <p>Giỏ hàng trống</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
