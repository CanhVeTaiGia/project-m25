"use client";
import { deleteCategory } from "@/services/category.service";
import React from "react";
import { useDispatch } from "react-redux";

interface DeleteCategoryProps {
  id: null | number | undefined;
  hideForm: () => void;
}
const DeleteCategory: React.FC<DeleteCategoryProps> = ({ id, hideForm }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteCategory(id));
    hideForm();
  };
  return (
    <div className="absolute top-0 left-0 w-[100%] text-white h-[100vh] flex items-center justify-center bg-[#000000aa]">
      <div className="w-[500px] py-[40px] px-[20px] bg-white rounded-[10px]">
        <h2 className="text-center text-[24px] text-black mb-[40px]">Bạn có chắc muốn xóa danh mục này</h2>
        <div className="flex justify-center gap-[10px]">
          <button
            onClick={handleDelete}
            className="w-[80px] py-[10px] rounded-[5px] border-[1px] bg-[#f00]"
          >
            Có
          </button>
          <button onClick={hideForm} className="w-[80px] rounded-[5px] border-[1px] py-[10px] bg-[#5f5]">
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
