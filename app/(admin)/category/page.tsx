"use client";
import { CategoryType } from "@/interface/categoryType";
import { AdminHeaderCategory } from "@/layouts/header/AdminHeader";
import { RootType } from "@/redux/store";
import { getCategory } from "@/services/category.service";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryManager: React.FC = () => {
  const data: any = useSelector((state: RootType) => {
    return state.category;
  });
  const dispatch = useDispatch();
  const category = Array.isArray(data.category)
    ? data.category
    : [...data.category];

  useEffect(() => {
    dispatch(getCategory());
  }, []);
  return (
    <div className="w-[100%] p-[20px] h-[100%] bg-[#ddd] ">
      <AdminHeaderCategory />
      <div className=" w-[100%] h-[600px] mt-[20px]">
        <table className="w-[100%] rounded-[5px] p-[20px] bg-[#fff]">
          <thead className=" border-b-[1px] ">
            <tr>
              <th className="text-start pl-[10px] py-[10px] w-[5%]">STT</th>
              <th className="text-start pl-[10px]">Tên</th>
              <th className="text-start pl-[10px]">Mô tả</th>
              <th className="text-start pl-[10px]">Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item: CategoryType, index: number) => (
              <tr key={item.id} className="w-[100%] bg-[#fff] rounded-[5px]">
                <td className="pl-[10px] text-start">{index + 1}</td>
                <td className="pl-[10px] text-start">{item.name}</td>
                <td className="pl-[10px] text-start">{item.description}</td>
                <td className="pl-[10px] text-start">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManager;
