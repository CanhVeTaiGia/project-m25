import React from "react";

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
  return (
    <div className="w-[100%] absolute top-0 left-0 bg-[#0000004a] h-[100vh] flex justify-center items-center">
      <form className="w-[600px] rounded-[10px] bg-white flex flex-col gap-[10px] p-[20px]">
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
          className=" border-[1px] rounded-[5px] p-[10px] outline-none"
          type="text"
          placeholder="Nhập tên danh mục"
        />
        <textarea
          placeholder="Nhập mô tả"
          className="rounded-[5px] outline-none p-[10px] resize-none h-[100px] border-[1px]"
        />
        <div className="flex justify-center">
          <button className="w-[80px] text-black rounded-[5px] py-[10px] bg-[#5f5]">
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAndEditCategory;
