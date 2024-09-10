import { CategoryType } from "@/interface/categoryType";
import { RootType } from "@/redux/store";
import {
  getACategory,
  editCategory,
  addCategory,
} from "@/services/category.service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddAndEditCategoryProps {
  handleHideCategory: () => void;
  addOrEditCategory: {
    type: "add" | "edit" | "";
    isShowing: boolean;
    currentId: number | null | undefined;
  };
}

const AddAndEditCategory: React.FC<AddAndEditCategoryProps> = ({
  handleHideCategory,
  addOrEditCategory,
}) => {
  const dispatch = useDispatch();
  const { editCategory: editCategoryState }: any = useSelector(
    (state: RootType) => {
      return state.category;
    }
  );

  const [category, setCategory] = useState<CategoryType>({
    id: undefined,
    name: "",
    description: "",
    status: true,
  });

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (category.id) {
      dispatch(editCategory(category));
      handleHideCategory();
      setCategory({
        id: undefined,
        name: "",
        description: "",
        status: true,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category.name && !category.description) {
      return;
    }
    dispatch(addCategory(category));
    handleHideCategory();
  };

  useEffect(() => {
    if (addOrEditCategory.currentId) {
      dispatch(getACategory(addOrEditCategory.currentId));
    }
  }, [addOrEditCategory.currentId, dispatch]);

  useEffect(() => {
    if (editCategoryState) {
      setCategory(editCategoryState);
    }
  }, [editCategoryState]);

  return (
    <div className="w-[100%] absolute top-0 left-0 bg-[#0000004a] h-[100vh] flex justify-center items-center">
      <form
        onSubmit={
          addOrEditCategory.type === "edit"
            ? handleEditCategory
            : handleAddCategory
        }
        className="w-[600px] rounded-[10px] bg-white flex flex-col gap-[10px] p-[20px]"
      >
        <div className="flex justify-between">
          <h2 className="text-[24px]">
            {addOrEditCategory.type === "add"
              ? "Thêm"
              : addOrEditCategory.type === "edit"
              ? "Sửa"
              : null}{" "}
            Danh Mục
          </h2>
          <p
            onClick={handleHideCategory}
            className="text-[24px] cursor-pointer"
          >
            X
          </p>
        </div>

        <input
          onChange={handleChange}
          value={addOrEditCategory.type === "add" ? undefined : category.name}
          className="border-[1px] rounded-[5px] p-[10px] outline-none"
          type="text"
          name="name"
          placeholder="Nhập tên danh mục"
        />
        <textarea
          onChange={handleChange}
          value={
            addOrEditCategory.type === "add" ? undefined : category.description
          }
          placeholder="Nhập mô tả"
          name="description"
          className="rounded-[5px] outline-none p-[10px] resize-none h-[100px] border-[1px]"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[80px] text-black rounded-[5px] py-[10px] bg-[#5f5]"
          >
            {addOrEditCategory.type === "add"
              ? "Thêm"
              : addOrEditCategory.type === "edit"
              ? "Sửa"
              : null}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAndEditCategory;
