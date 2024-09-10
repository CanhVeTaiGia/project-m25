"use client";
import AddOrEditProduct from "@/components/AddOrEditProduct";
import DeleteProduct from "@/components/DeleteProduct";
import { CategoryType } from "@/interface/categoryType";
import { ProductType } from "@/interface/productType";
import { AdminHeaderProduct } from "@/layouts/header/AdminHeader";
import { RootType } from "@/redux/store";
import { getCategory } from "@/services/category.service";
import { getProduct, getProducts } from "@/services/product.service";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { current } from "@reduxjs/toolkit";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductManager: React.FC = () => {
  const dispatch = useDispatch();
  const { products }: any = useSelector((state: RootType) => {
    return state.products;
  });
  const { category }: any = useSelector((state: RootType) => {
    return state.category;
  });

  const [showDeleteModal, setShowDeleteModal] = useState<{
    show: boolean;
    id: number | undefined;
  }>({
    show: false,
    id: 0,
  });
  const [showAddAndEditModal, setShowAddAndEditModal] = useState<{
    show: boolean;
    id: number | undefined;
    type: "add" | "edit";
  }>({
    show: false,
    id: 0,
    type: "add",
  });

  const handleShowDeleteForm = (id?: number) => {
    setShowDeleteModal({
      show: true,
      id: id,
    });
  };
  const handleHideDeleteForm = () => {
    setShowDeleteModal({
      show: false,
      id: 0,
    });
  };
  const handleShowAddOrEditForm = (type: "add" | "edit", id?: number) => {
    setShowAddAndEditModal({
      show: true,
      id: id === undefined ? 0 : id,
      type: type,
    });
  };
  const handleHideAddOrEditForm = () => {
    setShowAddAndEditModal({
      show: false,
      id: 0,
      type: "add",
    });
  };


  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <>
      {showDeleteModal.show && (
        <DeleteProduct
          showDeleteModal={showDeleteModal}
          handleHideDeleteForm={handleHideDeleteForm}
        />
      )}
      {showAddAndEditModal.show && (
        <AddOrEditProduct
          showAddOrEditModal={showAddAndEditModal}
          handleHideAddOrEditForm={handleHideAddOrEditForm}
        />
      )}
      <AdminHeaderProduct
        handleShowAddOrEditForm={handleShowAddOrEditForm}
        showAddAndEditModal={showAddAndEditModal}
      />
      <div className="w-[100%] p-[20px] h-[100%] bg-[#ddd] ">
        <div className=" w-[100%] rounded-[5px] p-[20px] bg-[#fff]">
          <table className="w-[100%] p-[20px]">
            <thead className="p-[10px] border-b-[1px]">
              <tr>
                <th className="text-start p-[10px]">Tên</th>
                <th className="text-start p-[10px]">Danh Mục</th>
                <th className="text-start p-[10px]">Giá</th>
                <th className="text-start p-[10px]">Số lượng</th>
                <th className="text-center p-[10px]">Ảnh</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody className="p-[10px]">
              {products.map((item: ProductType) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      {category.map((category: CategoryType) => {
                        return category.id === item.categoryId
                          ? category.name
                          : null;
                      })}
                    </td>
                    <td>
                      {Number(item.price).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>{item.stock}</td>
                    <td>
                      <Image src={item.image} alt="" width={50} height={50} />
                    </td>
                    <td className="text-center">
                      <FontAwesomeIcon
                        onClick={() => handleShowAddOrEditForm("edit", item.id)}
                        className="text-[24px] text-[orange] cursor-pointer"
                        icon={faPen}
                      />
                      <FontAwesomeIcon
                        onClick={() => handleShowDeleteForm(item.id)}
                        className="ml-[20px] text-[#f00] text-[24px] cursor-pointer"
                        icon={faTrash}
                      ></FontAwesomeIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductManager;
